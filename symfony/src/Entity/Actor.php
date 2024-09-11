<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use Doctrine\ORM\Mapping as ORM;
use App\Security\Voter\ActorVoter;
use App\Repository\ActorRepository;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use App\State\Processor\ActorProcessor;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ActorRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => [self::GROUP_READ]]
        ),
        new Post(
            denormalizationContext: ['groups' => [self::GROUP_WRITE]],
            processor: ActorProcessor::class,
            security: "is_granted('ROLE_EDITOR')"
        ),
        new Patch(
            denormalizationContext: ['groups' => [self::GROUP_WRITE]],
            security: 'is_granted("'.ActorVoter::EDIT.'", object)'
        ),
        new Put(
            denormalizationContext: ['groups' => [self::GROUP_WRITE]],
            processor: ActorProcessor::class,
            security: 'is_granted("'.ActorVoter::EDIT.'", object)'
        )
    ],
)]
class Actor
{
    private const GROUP_READ = 'actor:read';
    private const GROUP_WRITE = 'actor:write';
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([self::GROUP_READ])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups([self::GROUP_READ, self::GROUP_WRITE])]
    private ?string $name = null;

    #[ORM\Column(length: 10)]
    #[Groups([self::GROUP_READ, self::GROUP_WRITE])]
    private ?string $acronym = null;

    #[ORM\ManyToOne(inversedBy: 'actorsCreated')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups([self::GROUP_READ])]
    private ?User $createdBy = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getAcronym(): ?string
    {
        return $this->acronym;
    }

    public function setAcronym(string $acronym): static
    {
        $this->acronym = $acronym;

        return $this;
    }

    public function getCreatedBy(): ?User
    {
        return $this->createdBy;
    }

    public function setCreatedBy(?User $createdBy): static
    {
        $this->createdBy = $createdBy;

        return $this;
    }
}
