<?php

namespace App\Command\AdminBoundaries;

use App\Entity\Admin1Boundaries;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:import:admin-boundaries',
    description: 'Import geographic admin data from files',
)]
class ImportAdminBoundariesDataCommand extends Command
{

    public function __construct(private readonly EntityManagerInterface $entityManager, private readonly string $projectDir)
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $filesystem = new Filesystem();

        try {
            $admin1File = $this->projectDir . '/src/Command/AdminBoundaries/admin1.geojson';
            
            // Vérification de l'existence du fichier
            if (!$filesystem->exists($admin1File)) {
                $io->error("Fichier non trouvé : $admin1File");
                return Command::FAILURE;
            }
            // $departementFile = '/path/to/departements.geojson';
            // $communeFile = '/path/to/communes.geojson';

            $this->importAdmin1($admin1File);
            // $this->importDepartements($departementFile);
            // $this->importCommunes($communeFile);

            $io->success('Admin data imported successfully');
            return Command::SUCCESS;
        } catch (\Exception $e) {
            $io->error('Error on admin data import: ' . $e->getMessage());
            return Command::FAILURE;
        }
    }

    private function importAdmin1(string $file)
    {
        $geoData = json_decode(file_get_contents($file), true);
        
        foreach ($geoData['features'] as $feature) {
            $admin1 = new Admin1Boundaries();
            $admin1->setAdm1Name($feature['properties']['adm1_name']);
            $admin1->setAdm1Pcode($feature['properties']['adm1_pcode']);
            $admin1->setGeometry(json_encode($feature['geometry']));
            
            $this->entityManager->persist($admin1);
        }
        
        $this->entityManager->flush();
    }

    // Méthodes similaires pour importDepartements() et importCommunes()
}