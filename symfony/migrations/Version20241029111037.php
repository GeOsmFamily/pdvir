<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241029111037 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE actor DROP new_submission_message');
        $this->addSql('ALTER TABLE "user" ADD logo_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD description TEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD CONSTRAINT FK_8D93D649F98F144A FOREIGN KEY (logo_id) REFERENCES media_object (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649F98F144A ON "user" (logo_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE actor ADD new_submission_message TEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" DROP CONSTRAINT FK_8D93D649F98F144A');
        $this->addSql('DROP INDEX UNIQ_8D93D649F98F144A');
        $this->addSql('ALTER TABLE "user" DROP logo_id');
        $this->addSql('ALTER TABLE "user" DROP description');
    }
}
