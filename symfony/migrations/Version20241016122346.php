<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241016122346 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE project ADD deliverables TEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE project ADD calendar TEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE project ADD created_by VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE project ADD updated_by VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE project ADD slug VARCHAR(128) DEFAULT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_2FB3D0EE989D9B62 ON project (slug)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP INDEX UNIQ_2FB3D0EE989D9B62');
        $this->addSql('ALTER TABLE project DROP deliverables');
        $this->addSql('ALTER TABLE project DROP calendar');
        $this->addSql('ALTER TABLE project DROP created_by');
        $this->addSql('ALTER TABLE project DROP updated_by');
        $this->addSql('ALTER TABLE project DROP slug');
    }
}
