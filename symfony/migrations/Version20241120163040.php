<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241120163040 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE resource (id UUID NOT NULL, created_by INT DEFAULT NULL, updated_by INT DEFAULT NULL, name VARCHAR(255) NOT NULL, description TEXT NOT NULL, type VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, is_validated BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_BC91F416DE12AB56 ON resource (created_by)');
        $this->addSql('CREATE INDEX IDX_BC91F41616FE72E1 ON resource (updated_by)');
        $this->addSql('COMMENT ON COLUMN resource.id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE resource ADD CONSTRAINT FK_BC91F416DE12AB56 FOREIGN KEY (created_by) REFERENCES "user" (id) ON DELETE SET NULL NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE resource ADD CONSTRAINT FK_BC91F41616FE72E1 FOREIGN KEY (updated_by) REFERENCES "user" (id) ON DELETE SET NULL NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE resource DROP CONSTRAINT FK_BC91F416DE12AB56');
        $this->addSql('ALTER TABLE resource DROP CONSTRAINT FK_BC91F41616FE72E1');
        $this->addSql('DROP TABLE resource');
    }
}
