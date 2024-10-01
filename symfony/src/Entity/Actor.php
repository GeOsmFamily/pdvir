<?php

namespace App\Entity;

use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use App\Model\Enums\UserRoles;
use ApiPlatform\Metadata\Patch;
use Symfony\Component\Uid\Uuid;
use Doctrine\ORM\Mapping as ORM;
use App\Security\Voter\ActorVoter;
use App\Repository\ActorRepository;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Services\State\Provider\ActorProvider;
use App\Services\State\Processor\ActorProcessor;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ActorRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            provider: ActorProvider::class
        ),
        new Post(
            processor: ActorProcessor::class,
            security: "is_granted('".UserRoles::ROLE_EDITOR_ACTORS."')"
        ),
        new Patch(
            security: 'is_granted("'.ActorVoter::EDIT.'", object)'
        ),
        new Put(
            processor: ActorProcessor::class,
            security: 'is_granted("'.ActorVoter::EDIT.'", object)'
        )
    ],
    normalizationContext: ['groups' => [self::GROUP_READ]],
    denormalizationContext: ['groups' => [self::GROUP_WRITE]],
)]
class Actor
{
    private const GROUP_READ = 'actor:read';
    private const GROUP_WRITE = 'actor:write';
    #[ORM\Id]
    #[ORM\Column(type: 'uuid')]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator('doctrine.uuid_generator')]
    #[Groups([self::GROUP_READ])]
    private ?Uuid $id = null;

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

    #[ORM\Column]
    #[Groups([self::GROUP_READ])]
    private ?bool $isValidated = null;

    public function getId(): ?Uuid {
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

    public function isValidated(): ?bool
    {
        return $this->isValidated;
    }

    public function setValidated(bool $isValidated): static
    {
        $this->isValidated = $isValidated;

        return $this;
    }
}
