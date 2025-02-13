<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Entity\Trait\BlameableEntity;
use App\Entity\Trait\TimestampableEntity;
use App\Repository\AppContentCommentRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AppContentCommentRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(security: 'is_granted("ROLE_ADMIN")'),
        new Post(),
        new Delete(
            security: 'is_granted("ROLE_ADMIN")'
        ),
    ]
)]
class AppContentComment
{
    use TimestampableEntity;
    use BlameableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?bool $readByAdmin = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $message = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function isReadByAdmin(): ?bool
    {
        return $this->readByAdmin;
    }

    public function setReadByAdmin(bool $readByAdmin): static
    {
        $this->readByAdmin = $readByAdmin;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): static
    {
        $this->message = $message;

        return $this;
    }
}
