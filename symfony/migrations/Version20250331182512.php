<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250331182512 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE resource ADD other_type VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE resource ADD other_thematic VARCHAR(255) DEFAULT NULL');
        $this->addSql("INSERT INTO actor_expertise (name) VALUES ('Autre')");
        $this->addSql("delete from organisation where name LIKE 'Deutsche Gesellschaft für Internationale Zusammenarbeit'");
        $this->addSql("delete from organisation where name LIKE 'Association Humanitaire de Solidarité Internationale'");
        $this->addSql("delete from organisation where name LIKE 'ONU-Habitat'");
        $this->addSql("delete from organisation where name LIKE 'Bundesministerium für wirtschaftliche Zusammenarbeit und Entwicklung'");
        $this->addSql("delete from organisation where name LIKE 'Crédit Foncier du Cameroun'");
        $this->addSql("delete from organisation where name LIKE 'Union Européenne'");
        $this->addSql("insert into organisation (name, acronym, contracting, donor) values ('Autre', 'Others', true, true)");
        $this->addSql("insert into organisation (name, acronym, contracting, donor) values ('Fonds propres', 'FP', true, true)");
        $this->addSql("insert into organisation (name, acronym, contracting, donor) values ('Subvention publique', 'SP', true, true)");
        $this->addSql("insert into organisation (name, acronym, contracting, donor) values ('Prêt bancaire', 'PB', true, true)");
        $this->addSql("insert into organisation (name, acronym, contracting, donor) values ('Investissement privé', 'IP', true, true)");
        $this->addSql("insert into organisation (name, acronym, contracting, donor) values ('Crowdfunding (financement participatif)', 'CF', true, true)");
        $this->addSql("insert into organisation (name, acronym, contracting, donor) values ('Partenariat public-privé', 'PPP', true, true)");
        $this->addSql("insert into organisation (name, acronym, contracting, donor) values ('Mécénat', 'MC', true, true)");
        $this->addSql("insert into thematic (name) values ('Autre')");
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE resource DROP other_type');
        $this->addSql('ALTER TABLE resource DROP other_thematic');
    }
}
