<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241001101921 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE actor_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE project_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE thematic_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE actor (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE project (id INT NOT NULL, actor_id INT NOT NULL, title VARCHAR(255) NOT NULL, location VARCHAR(255) NOT NULL, coords geometry(POINT, 0) NOT NULL, status VARCHAR(255) NOT NULL, description TEXT DEFAULT NULL, images JSON DEFAULT NULL, partners JSON DEFAULT NULL, intervention_zone VARCHAR(255) NOT NULL, project_manager_name VARCHAR(255) DEFAULT NULL, project_manager_position VARCHAR(255) DEFAULT NULL, project_manager_email VARCHAR(255) DEFAULT NULL, project_manager_tel VARCHAR(255) DEFAULT NULL, project_manager_photo VARCHAR(255) DEFAULT NULL, website VARCHAR(255) DEFAULT NULL, logo VARCHAR(255) DEFAULT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_2FB3D0EE10DAF24A ON project (actor_id)');
        $this->addSql('COMMENT ON COLUMN project.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN project.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE project_thematic (project_id INT NOT NULL, thematic_id INT NOT NULL, PRIMARY KEY(project_id, thematic_id))');
        $this->addSql('CREATE INDEX IDX_415254A9166D1F9C ON project_thematic (project_id)');
        $this->addSql('CREATE INDEX IDX_415254A92395FCED ON project_thematic (thematic_id)');
        $this->addSql('CREATE TABLE financed_projects_actors (project_id INT NOT NULL, actor_id INT NOT NULL, PRIMARY KEY(project_id, actor_id))');
        $this->addSql('CREATE INDEX IDX_50C6B8EC166D1F9C ON financed_projects_actors (project_id)');
        $this->addSql('CREATE INDEX IDX_50C6B8EC10DAF24A ON financed_projects_actors (actor_id)');
        $this->addSql('CREATE TABLE contracted_projects_actors (project_id INT NOT NULL, actor_id INT NOT NULL, PRIMARY KEY(project_id, actor_id))');
        $this->addSql('CREATE INDEX IDX_E73AB790166D1F9C ON contracted_projects_actors (project_id)');
        $this->addSql('CREATE INDEX IDX_E73AB79010DAF24A ON contracted_projects_actors (actor_id)');
        $this->addSql('CREATE TABLE thematic (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE project ADD CONSTRAINT FK_2FB3D0EE10DAF24A FOREIGN KEY (actor_id) REFERENCES actor (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE project_thematic ADD CONSTRAINT FK_415254A9166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE project_thematic ADD CONSTRAINT FK_415254A92395FCED FOREIGN KEY (thematic_id) REFERENCES thematic (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE financed_projects_actors ADD CONSTRAINT FK_50C6B8EC166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE financed_projects_actors ADD CONSTRAINT FK_50C6B8EC10DAF24A FOREIGN KEY (actor_id) REFERENCES actor (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE contracted_projects_actors ADD CONSTRAINT FK_E73AB790166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE contracted_projects_actors ADD CONSTRAINT FK_E73AB79010DAF24A FOREIGN KEY (actor_id) REFERENCES actor (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE actor_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE project_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE thematic_id_seq CASCADE');
        $this->addSql('ALTER TABLE project DROP CONSTRAINT FK_2FB3D0EE10DAF24A');
        $this->addSql('ALTER TABLE project_thematic DROP CONSTRAINT FK_415254A9166D1F9C');
        $this->addSql('ALTER TABLE project_thematic DROP CONSTRAINT FK_415254A92395FCED');
        $this->addSql('ALTER TABLE financed_projects_actors DROP CONSTRAINT FK_50C6B8EC166D1F9C');
        $this->addSql('ALTER TABLE financed_projects_actors DROP CONSTRAINT FK_50C6B8EC10DAF24A');
        $this->addSql('ALTER TABLE contracted_projects_actors DROP CONSTRAINT FK_E73AB790166D1F9C');
        $this->addSql('ALTER TABLE contracted_projects_actors DROP CONSTRAINT FK_E73AB79010DAF24A');
        $this->addSql('DROP TABLE actor');
        $this->addSql('DROP TABLE project');
        $this->addSql('DROP TABLE project_thematic');
        $this->addSql('DROP TABLE financed_projects_actors');
        $this->addSql('DROP TABLE contracted_projects_actors');
        $this->addSql('DROP TABLE thematic');
    }
}
