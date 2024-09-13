<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use App\Security\Voter\UserVoter;
use App\Repository\UserRepository;
use App\State\Provider\UserProvider;
use ApiPlatform\Metadata\ApiResource;
use App\State\Processor\UserProcessor;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
#[ApiResource(
    operations: [
        new GetCollection(
            provider: UserProvider::class
        ),
        new Post(processor: UserProcessor::class),
        new Get(),
        new Put(
            processor: UserProcessor::class,
            security: 'is_granted("'.UserVoter::EDIT.'", object)'
        ),
        new Patch(
            processor: UserProcessor::class,
            security: 'is_granted("'.UserVoter::EDIT.'", object)'
        ),
        new Delete(),
    ],
    normalizationContext: ['groups' => [self::GROUP_READ]],
    denormalizationContext: ['groups' => [self::GROUP_WRITE]],
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    private const GROUP_READ = 'user:read';
    private const GROUP_WRITE = 'user:write';
    
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([self::GROUP_READ])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(groups: [self::GROUP_WRITE])]
    #[Groups([self::GROUP_READ, self::GROUP_WRITE])]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(groups: [self::GROUP_WRITE])]
    #[Groups([self::GROUP_READ, self::GROUP_WRITE])]
    private ?string $lastName = null;

    #[ORM\Column(length: 180)]
    #[Assert\NotBlank(groups: [self::GROUP_WRITE])]
    #[Groups([self::GROUP_READ, self::GROUP_WRITE])]
    private ?string $email = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[Assert\NotBlank(groups: [self::GROUP_WRITE])]
    #[Groups([self::GROUP_WRITE])]
    private ?string $plainPassword = null;

    /**
     * @var Collection<int, Actor>
     */
    #[ORM\OneToMany(targetEntity: Actor::class, mappedBy: 'createdBy', orphanRemoval: true)]
    private Collection $actorsCreated;

    #[ORM\Column]
    private ?bool $isValidated = null;

    public function __construct()
    {
        $this->actorsCreated = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     *
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        $this->plainPassword = null;
    }

    /**
     * @return Collection<int, Actor>
     */
    public function getActorsCreated(): Collection
    {
        return $this->actorsCreated;
    }

    public function addActorsCreated(Actor $actorsCreated): static
    {
        if (!$this->actorsCreated->contains($actorsCreated)) {
            $this->actorsCreated->add($actorsCreated);
            $actorsCreated->setCreatedBy($this);
        }

        return $this;
    }

    public function removeActorsCreated(Actor $actorsCreated): static
    {
        if ($this->actorsCreated->removeElement($actorsCreated)) {
            // set the owning side to null (unless already changed)
            if ($actorsCreated->getCreatedBy() === $this) {
                $actorsCreated->setCreatedBy(null);
            }
        }

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): static
    {
        $this->lastName = $lastName;

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
