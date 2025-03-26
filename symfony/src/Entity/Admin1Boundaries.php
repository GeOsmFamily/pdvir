<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\Admin1BoundariesRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: Admin1BoundariesRepository::class)]
#[ApiResource]
class Admin1Boundaries
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $adm1_name = null;

    #[ORM\Column(length: 255)]
    private ?string $adm1_pcode = null;

    #[ORM\Column(type: 'geometry')]
    private $geometry;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAdm1Name(): ?string
    {
        return $this->adm1_name;
    }

    public function setAdm1Name(string $adm1_name): static
    {
        $this->adm1_name = $adm1_name;

        return $this;
    }

    public function getAdm1Pcode(): ?string
    {
        return $this->adm1_pcode;
    }

    public function setAdm1Pcode(string $adm1_pcode): static
    {
        $this->adm1_pcode = $adm1_pcode;

        return $this;
    }

    public function getGeometry()
    {
        return $this->geometry;
    }

    public function setGeometry($geometry): static
    {
        $this->geometry = $geometry;

        return $this;
    }
}
