<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241104153432 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE project ADD focal_point_name VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE project ADD focal_point_position VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE project ADD focal_point_email VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE project ADD focal_point_tel VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE project ADD focal_point_photo VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE project DROP project_manager_name');
        $this->addSql('ALTER TABLE project DROP project_manager_position');
        $this->addSql('ALTER TABLE project DROP project_manager_email');
        $this->addSql('ALTER TABLE project DROP project_manager_tel');
        $this->addSql('ALTER TABLE project DROP project_manager_photo');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE project ADD project_manager_name VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE project ADD project_manager_position VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE project ADD project_manager_email VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE project ADD project_manager_tel VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE project ADD project_manager_photo VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE project DROP focal_point_name');
        $this->addSql('ALTER TABLE project DROP focal_point_position');
        $this->addSql('ALTER TABLE project DROP focal_point_email');
        $this->addSql('ALTER TABLE project DROP focal_point_tel');
        $this->addSql('ALTER TABLE project DROP focal_point_photo');
    }
}
