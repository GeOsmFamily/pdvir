<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241015161520 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE actor_media_object (actor_id UUID NOT NULL, media_object_id INT NOT NULL, PRIMARY KEY(actor_id, media_object_id))');
        $this->addSql('CREATE INDEX IDX_18E6A66710DAF24A ON actor_media_object (actor_id)');
        $this->addSql('CREATE INDEX IDX_18E6A66764DE5A5 ON actor_media_object (media_object_id)');
        $this->addSql('COMMENT ON COLUMN actor_media_object.actor_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE actor_media_object ADD CONSTRAINT FK_18E6A66710DAF24A FOREIGN KEY (actor_id) REFERENCES actor (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE actor_media_object ADD CONSTRAINT FK_18E6A66764DE5A5 FOREIGN KEY (media_object_id) REFERENCES media_object (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE actor_media_object DROP CONSTRAINT FK_18E6A66710DAF24A');
        $this->addSql('ALTER TABLE actor_media_object DROP CONSTRAINT FK_18E6A66764DE5A5');
        $this->addSql('DROP TABLE actor_media_object');
    }
}
