<?php

namespace App\Entity;

use App\Enum\Status;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Enum\AdministrativeScopes;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProjectRepository;
use App\Entity\Trait\TimestampableEntity;
use Doctrine\Common\Collections\Collection;
use Jsor\Doctrine\PostGIS\Types\PostGISType;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: ProjectRepository::class)]
#[ApiResource]
class Project
{
    use TimestampableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups([Actor::ACTOR_READ_ITEM])]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    private ?string $location = null;

    #[ORM\Column(
        type: PostGISType::GEOMETRY, 
        options: ['geometry_type' => 'POINT'],
    )]
    private ?string $coords = null;

    #[ORM\Column(enumType: Status::class)]
    private ?Status $status = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(type: Types::JSON, nullable: true)]
    private ?array $images = null;

    #[ORM\Column(type: Types::JSON, nullable: true)]
    private ?array $partners = null;

    #[ORM\Column(enumType: AdministrativeScopes::class)]
    private ?AdministrativeScopes $interventionZone = null;

    /**
     * @var Collection<int, Thematic>
     */
    #[ORM\ManyToMany(targetEntity: Thematic::class, inversedBy: 'projects')]
    private Collection $thematics;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $projectManagerName = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $projectManagerPosition = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $projectManagerEmail = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $projectManagerTel = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $projectManagerPhoto = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $website = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $logo = null;

    /**
     * @var Collection<int, Actor>
     */
    #[ORM\JoinTable(name: 'financed_projects_actors')]
    #[ORM\ManyToMany(targetEntity: Actor::class)]
    private Collection $financialActors;

    /**
     * @var Collection<int, Actor>
     */
    
    #[ORM\JoinTable(name: 'contracted_projects_actors')]
    #[ORM\ManyToMany(targetEntity: Actor::class)]
    private Collection $contractingActors;

    #[ORM\ManyToOne(inversedBy: 'projects')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Actor $actor = null;

    public function __construct()
    {
        $this->thematics = new ArrayCollection();
        $this->financialActors = new ArrayCollection();
        $this->contractingActors = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): static
    {
        $this->location = $location;

        return $this;
    }

    public function getCoords(): ?string
    {
        return $this->coords;
    }

    public function setCoords(string $coords): static
    {
        $this->coords = $coords;

        return $this;
    }

    public function getStatus(): ?Status
    {
        return $this->status;
    }

    public function setStatus(Status $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getImages(): ?array
    {
        return $this->images;
    }

    public function setImages(?array $images): static
    {
        $this->images = $images;

        return $this;
    }

    public function getPartners(): ?array
    {
        return $this->partners;
    }

    public function setPartners(?array $partners): static
    {
        $this->partners = $partners;

        return $this;
    }

    public function getInterventionZone(): ?AdministrativeScopes
    {
        return $this->interventionZone;
    }

    public function setInterventionZone(AdministrativeScopes $interventionZone): static
    {
        $this->interventionZone = $interventionZone;

        return $this;
    }

    /**
     * @return Collection<int, Thematic>
     */
    public function getThematics(): Collection
    {
        return $this->thematics;
    }

    public function addThematic(Thematic $thematic): static
    {
        if (!$this->thematics->contains($thematic)) {
            $this->thematics->add($thematic);
        }

        return $this;
    }

    public function removeThematic(Thematic $thematic): static
    {
        $this->thematics->removeElement($thematic);

        return $this;
    }

    public function getProjectManagerName(): ?string
    {
        return $this->projectManagerName;
    }

    public function setProjectManagerName(?string $projectManagerName): static
    {
        $this->projectManagerName = $projectManagerName;

        return $this;
    }

    public function getProjectManagerPosition(): ?string
    {
        return $this->projectManagerPosition;
    }

    public function setProjectManagerPosition(?string $projectManagerPosition): static
    {
        $this->projectManagerPosition = $projectManagerPosition;

        return $this;
    }

    public function getProjectManagerEmail(): ?string
    {
        return $this->projectManagerEmail;
    }

    public function setProjectManagerEmail(?string $projectManagerEmail): static
    {
        $this->projectManagerEmail = $projectManagerEmail;

        return $this;
    }

    public function getProjectManagerTel(): ?string
    {
        return $this->projectManagerTel;
    }

    public function setProjectManagerTel(?string $projectManagerTel): static
    {
        $this->projectManagerTel = $projectManagerTel;

        return $this;
    }

    public function getProjectManagerPhoto(): ?string
    {
        return $this->projectManagerPhoto;
    }

    public function setProjectManagerPhoto(?string $projectManagerPhoto): static
    {
        $this->projectManagerPhoto = $projectManagerPhoto;

        return $this;
    }

    public function getWebsite(): ?string
    {
        return $this->website;
    }

    public function setWebsite(?string $website): static
    {
        $this->website = $website;

        return $this;
    }

    public function getLogo(): ?string
    {
        return $this->logo;
    }

    public function setLogo(?string $logo): static
    {
        $this->logo = $logo;

        return $this;
    }

    /**
     * @return Collection<int, Actor>
     */
    public function getFinancialActors(): Collection
    {
        return $this->financialActors;
    }

    public function addFinancialActor(Actor $financialActor): static
    {
        if (!$this->financialActors->contains($financialActor)) {
            $this->financialActors->add($financialActor);
        }

        return $this;
    }

    public function removeFinancialActor(Actor $financialActor): static
    {
        $this->financialActors->removeElement($financialActor);

        return $this;
    }

    /**
     * @return Collection<int, Actor>
     */
    public function getContractingActors(): Collection
    {
        return $this->contractingActors;
    }

    public function addContractingActor(Actor $contractingActor): static
    {
        if (!$this->contractingActors->contains($contractingActor)) {
            $this->contractingActors->add($contractingActor);
        }

        return $this;
    }

    public function removeContractingActor(Actor $contractingActor): static
    {
        $this->contractingActors->removeElement($contractingActor);

        return $this;
    }

    public function getActor(): ?Actor
    {
        return $this->actor;
    }

    public function setActor(?Actor $actor): static
    {
        $this->actor = $actor;

        return $this;
    }
}
