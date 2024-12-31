<?php

namespace App\Entity;

use App\Entity\QgisMap;
use App\Enum\AtlasGroup;
use App\Entity\QgisProject;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\AtlasRepository;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: AtlasRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(security: 'is_granted("ROLE_ADMIN")'),
        new Post(
            security: 'is_granted("ROLE_ADMIN")',
        ),
        new Patch(
            security: 'is_granted("ROLE_ADMIN")',
        ),
        new Delete(
            security: 'is_granted("ROLE_ADMIN")',
        ),
    ],
    normalizationContext: ['groups' => [self::GET_FULL]],
    denormalizationContext: ['groups' => [self::WRITE]],
)]
class Atlas
{
    public const GET_FULL = 'atlas:get:full';
    public const WRITE = 'atlas:write';

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups([self::GET_FULL, self::WRITE])]
    private ?string $name = null;

    #[ORM\Column(enumType: AtlasGroup::class)]
    #[Groups([self::GET_FULL, self::WRITE])]
    private ?AtlasGroup $atlasGroup = null;

    #[ORM\Column]    
    #[Groups([self::GET_FULL, self::WRITE])]
    private ?int $position = null;

    /**
     * @var Collection<int, QgisMap>
     */
    #[ORM\ManyToMany(targetEntity: QgisMap::class, inversedBy: 'atlases')]
    #[Groups([self::GET_FULL, self::WRITE])]
    private Collection $maps;

    public function __construct()
    {
        $this->maps = new ArrayCollection();
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

    public function getAtlasGroup(): ?AtlasGroup
    {
        return $this->atlasGroup;
    }

    public function setAtlasGroup(AtlasGroup $atlasGroup): static
    {
        $this->atlasGroup = $atlasGroup;

        return $this;
    }

    public function getPosition(): ?int
    {
        return $this->position;
    }

    public function setPosition(int $position): static
    {
        $this->position = $position;

        return $this;
    }

    /**
     * @return Collection<int, QgisMap>
     */
    public function getMaps(): Collection
    {
        return $this->maps;
    }

    public function addMap(QgisMap $map): static
    {
        if (!$this->maps->contains($map)) {
            $this->maps->add($map);
        }

        return $this;
    }

    public function removeMap(QgisMap $map): static
    {
        $this->maps->removeElement($map);

        return $this;
    }
}
