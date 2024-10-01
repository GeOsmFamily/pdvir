<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241001085053 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE actors_categories_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE actors_expertises_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE administratives_scopes_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE thematics_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE actor_actors_categories (actor_id UUID NOT NULL, actors_categories_id INT NOT NULL, PRIMARY KEY(actor_id, actors_categories_id))');
        $this->addSql('CREATE INDEX IDX_9B31AAF610DAF24A ON actor_actors_categories (actor_id)');
        $this->addSql('CREATE INDEX IDX_9B31AAF669D56027 ON actor_actors_categories (actors_categories_id)');
        $this->addSql('COMMENT ON COLUMN actor_actors_categories.actor_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE actor_actors_expertises (actor_id UUID NOT NULL, actors_expertises_id INT NOT NULL, PRIMARY KEY(actor_id, actors_expertises_id))');
        $this->addSql('CREATE INDEX IDX_C084E3E210DAF24A ON actor_actors_expertises (actor_id)');
        $this->addSql('CREATE INDEX IDX_C084E3E2E84AD89F ON actor_actors_expertises (actors_expertises_id)');
        $this->addSql('COMMENT ON COLUMN actor_actors_expertises.actor_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE actor_thematics (actor_id UUID NOT NULL, thematics_id INT NOT NULL, PRIMARY KEY(actor_id, thematics_id))');
        $this->addSql('CREATE INDEX IDX_510033E810DAF24A ON actor_thematics (actor_id)');
        $this->addSql('CREATE INDEX IDX_510033E839E9B61C ON actor_thematics (thematics_id)');
        $this->addSql('COMMENT ON COLUMN actor_thematics.actor_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE actor_administratives_scopes (actor_id UUID NOT NULL, administratives_scopes_id INT NOT NULL, PRIMARY KEY(actor_id, administratives_scopes_id))');
        $this->addSql('CREATE INDEX IDX_BC660EC910DAF24A ON actor_administratives_scopes (actor_id)');
        $this->addSql('CREATE INDEX IDX_BC660EC9A4B57C02 ON actor_administratives_scopes (administratives_scopes_id)');
        $this->addSql('COMMENT ON COLUMN actor_administratives_scopes.actor_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE actors_categories (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE actors_expertises (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE administratives_scopes (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE thematics (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE actor_actors_categories ADD CONSTRAINT FK_9B31AAF610DAF24A FOREIGN KEY (actor_id) REFERENCES actor (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE actor_actors_categories ADD CONSTRAINT FK_9B31AAF669D56027 FOREIGN KEY (actors_categories_id) REFERENCES actors_categories (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE actor_actors_expertises ADD CONSTRAINT FK_C084E3E210DAF24A FOREIGN KEY (actor_id) REFERENCES actor (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE actor_actors_expertises ADD CONSTRAINT FK_C084E3E2E84AD89F FOREIGN KEY (actors_expertises_id) REFERENCES actors_expertises (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE actor_thematics ADD CONSTRAINT FK_510033E810DAF24A FOREIGN KEY (actor_id) REFERENCES actor (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE actor_thematics ADD CONSTRAINT FK_510033E839E9B61C FOREIGN KEY (thematics_id) REFERENCES thematics (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE actor_administratives_scopes ADD CONSTRAINT FK_BC660EC910DAF24A FOREIGN KEY (actor_id) REFERENCES actor (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE actor_administratives_scopes ADD CONSTRAINT FK_BC660EC9A4B57C02 FOREIGN KEY (administratives_scopes_id) REFERENCES administratives_scopes (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE actor ADD creation_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL');
        $this->addSql('ALTER TABLE actor ADD last_update TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL');
        $this->addSql('ALTER TABLE actor ADD description TEXT NOT NULL');
        $this->addSql('ALTER TABLE actor ADD office_name VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE actor ADD office_adress VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE actor ADD contact_name VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE actor ADD contact_position VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE actor ADD website VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE actor ADD phone VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE actor ADD email VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE actors_categories_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE actors_expertises_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE administratives_scopes_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE thematics_id_seq CASCADE');
        $this->addSql('ALTER TABLE actor_actors_categories DROP CONSTRAINT FK_9B31AAF610DAF24A');
        $this->addSql('ALTER TABLE actor_actors_categories DROP CONSTRAINT FK_9B31AAF669D56027');
        $this->addSql('ALTER TABLE actor_actors_expertises DROP CONSTRAINT FK_C084E3E210DAF24A');
        $this->addSql('ALTER TABLE actor_actors_expertises DROP CONSTRAINT FK_C084E3E2E84AD89F');
        $this->addSql('ALTER TABLE actor_thematics DROP CONSTRAINT FK_510033E810DAF24A');
        $this->addSql('ALTER TABLE actor_thematics DROP CONSTRAINT FK_510033E839E9B61C');
        $this->addSql('ALTER TABLE actor_administratives_scopes DROP CONSTRAINT FK_BC660EC910DAF24A');
        $this->addSql('ALTER TABLE actor_administratives_scopes DROP CONSTRAINT FK_BC660EC9A4B57C02');
        $this->addSql('DROP TABLE actor_actors_categories');
        $this->addSql('DROP TABLE actor_actors_expertises');
        $this->addSql('DROP TABLE actor_thematics');
        $this->addSql('DROP TABLE actor_administratives_scopes');
        $this->addSql('DROP TABLE actors_categories');
        $this->addSql('DROP TABLE actors_expertises');
        $this->addSql('DROP TABLE administratives_scopes');
        $this->addSql('DROP TABLE thematics');
        $this->addSql('ALTER TABLE actor DROP creation_date');
        $this->addSql('ALTER TABLE actor DROP last_update');
        $this->addSql('ALTER TABLE actor DROP description');
        $this->addSql('ALTER TABLE actor DROP office_name');
        $this->addSql('ALTER TABLE actor DROP office_adress');
        $this->addSql('ALTER TABLE actor DROP contact_name');
        $this->addSql('ALTER TABLE actor DROP contact_position');
        $this->addSql('ALTER TABLE actor DROP website');
        $this->addSql('ALTER TABLE actor DROP phone');
        $this->addSql('ALTER TABLE actor DROP email');
    }
}
