<?php

namespace App\Entity;

use App\Enum\AppComment;
use ApiPlatform\Metadata\Post;
use Doctrine\DBAL\Types\Types;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Trait\BlameableEntity;
use ApiPlatform\Metadata\GetCollection;
use App\Entity\Trait\TimestampableEntity;
use Jsor\Doctrine\PostGIS\Types\PostGISType;
use App\Repository\AppContentCommentRepository;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: AppContentCommentRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(security: 'is_granted("ROLE_ADMIN")'),
        new Patch(
            security: 'is_granted("ROLE_ADMIN")'
        ),
        new Post(security: 'is_granted("IS_AUTHENTICATED_FULLY")'),
        new Delete(
            security: 'is_granted("ROLE_ADMIN")'
        ),
    ],
    normalizationContext: ['groups' => [self::COMMENT_READ]],
    denormalizationContext: ['groups' => [self::COMMENT_WRITE]],
)]
class AppContentComment
{
    use TimestampableEntity;
    use BlameableEntity;
    public const COMMENT_READ = 'comment_read';
    private const COMMENT_WRITE = 'comment_write';

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([self::COMMENT_READ])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups([self::COMMENT_READ, self::COMMENT_WRITE])]
    private ?bool $readByAdmin = false;

    #[ORM\Column(enumType: AppComment::class)]
    #[Groups([self::COMMENT_READ, self::COMMENT_WRITE])]
    private ?AppComment $origin = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups([self::COMMENT_READ, self::COMMENT_WRITE])]
    private ?string $message = null;

    #[ORM\Column(
        type: PostGISType::GEOMETRY,
        options: ['geometry_type' => 'POINT'],
        nullable: true
    )]
    #[Groups([self::COMMENT_READ, self::COMMENT_WRITE])]
    private ?string $location = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups([self::COMMENT_READ, self::COMMENT_WRITE])]
    private ?string $originURL = null;

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

    public function getOrigin(): ?AppComment
    {
        return $this->origin;
    }

    public function setOrigin(AppComment $origin): static
    {
        $this->origin = $origin;

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

    public function getLocation(): ?string
    {
        if (preg_match('/POINT\(([-\d\.]+) ([-\d\.]+)\)/', $this->location, $matches)) {
            return $matches[1].','.$matches[2];
        }

        return null;
    }

    public function setLocation(string $coords): static
    {
        // Convert lat/lng string into postgis point geometry
        if (preg_match('/^\s*(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)\s*$/', $coords, $matches)) {
            $lat = (float) $matches[1];
            $lng = (float) $matches[3];

            $this->location = sprintf('POINT(%f %f)', $lng, $lat);
        } else {
            throw new \InvalidArgumentException('Invalid coordinates format. Expected "lat, lng".');
        }

        return $this;
    }

    public function getOriginURL(): ?string
    {
        return $this->originURL;
    }

    public function setOriginURL(?string $originURL): static
    {
        $this->originURL = $originURL;

        return $this;
    }
}
