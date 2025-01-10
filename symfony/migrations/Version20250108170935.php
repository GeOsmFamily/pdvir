<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250108170935 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX uniq_1be98136c9cbe4c9');
        $this->addSql('ALTER TABLE highlighted_item RENAME COLUMN order_key TO position');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1BE98136462CE4F5 ON highlighted_item (position)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP INDEX UNIQ_1BE98136462CE4F5');
        $this->addSql('ALTER TABLE highlighted_item RENAME COLUMN position TO order_key');
        $this->addSql('CREATE UNIQUE INDEX uniq_1be98136c9cbe4c9 ON highlighted_item (order_key)');
    }
}
