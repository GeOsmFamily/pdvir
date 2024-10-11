<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241001151351 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE actor (id UUID NOT NULL, created_by_id INT NOT NULL, name VARCHAR(255) NOT NULL, acronym VARCHAR(10) NOT NULL, is_validated BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_447556F9B03A8386 ON actor (created_by_id)');
        $this->addSql('COMMENT ON COLUMN actor.id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, is_validated BOOLEAN NOT NULL, requested_roles JSON DEFAULT NULL, organisation VARCHAR(255) DEFAULT NULL, position VARCHAR(255) DEFAULT NULL, phone VARCHAR(20) DEFAULT NULL, sign_up_message TEXT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE actor ADD CONSTRAINT FK_447556F9B03A8386 FOREIGN KEY (created_by_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('ALTER TABLE actor DROP CONSTRAINT FK_447556F9B03A8386');
        $this->addSql('DROP TABLE actor');
        $this->addSql('DROP TABLE "user"');
    }
}
