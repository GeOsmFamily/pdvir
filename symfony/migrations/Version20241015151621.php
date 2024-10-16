<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241015151621 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE actor ADD logo_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE actor DROP logo');
        $this->addSql('ALTER TABLE actor ADD CONSTRAINT FK_447556F9F98F144A FOREIGN KEY (logo_id) REFERENCES media_object (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_447556F9F98F144A ON actor (logo_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE actor DROP CONSTRAINT FK_447556F9F98F144A');
        $this->addSql('DROP INDEX IDX_447556F9F98F144A');
        $this->addSql('ALTER TABLE actor ADD logo VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE actor DROP logo_id');
    }
}
