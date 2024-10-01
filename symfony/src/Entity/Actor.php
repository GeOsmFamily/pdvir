<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ActorRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ActorRepository::class)]
#[ApiResource]
class Actor
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    /**
     * @var Collection<int, Project>
     */
    #[ORM\ManyToMany(targetEntity: Project::class, mappedBy: 'financialActors')]
    private Collection $financedProjects;

    /**
     * @var Collection<int, Project>
     */
    #[ORM\ManyToMany(targetEntity: Project::class, mappedBy: 'contractingActors')]
    private Collection $contractedProjects;

    /**
     * @var Collection<int, Project>
     */
    #[ORM\OneToMany(targetEntity: Project::class, mappedBy: 'actor')]
    private Collection $projects;

    public function __construct()
    {
        $this->financedProjects = new ArrayCollection();
        $this->contractedProjects = new ArrayCollection();
        $this->projects = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, Project>
     */
    public function getFinancedProjects(): Collection
    {
        return $this->financedProjects;
    }

    public function addFinancedProject(Project $financedProject): static
    {
        if (!$this->financedProjects->contains($financedProject)) {
            $this->financedProjects->add($financedProject);
            $financedProject->addFinancialActor($this);
        }

        return $this;
    }

    public function removeFinancedProject(Project $financedProject): static
    {
        if ($this->financedProjects->removeElement($financedProject)) {
            $financedProject->removeFinancialActor($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Project>
     */
    public function getContractedProjects(): Collection
    {
        return $this->contractedProjects;
    }

    public function addContractedProject(Project $contractedProject): static
    {
        if (!$this->contractedProjects->contains($contractedProject)) {
            $this->contractedProjects->add($contractedProject);
            $contractedProject->addContractingActor($this);
        }

        return $this;
    }

    public function removeContractedProject(Project $contractedProject): static
    {
        if ($this->contractedProjects->removeElement($contractedProject)) {
            $contractedProject->removeContractingActor($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Project>
     */
    public function getProjects(): Collection
    {
        return $this->projects;
    }

    public function addProject(Project $project): static
    {
        if (!$this->projects->contains($project)) {
            $this->projects->add($project);
            $project->setActor($this);
        }

        return $this;
    }

    public function removeProject(Project $project): static
    {
        if ($this->projects->removeElement($project)) {
            // set the owning side to null (unless already changed)
            if ($project->getActor() === $this) {
                $project->setActor(null);
            }
        }

        return $this;
    }
}
