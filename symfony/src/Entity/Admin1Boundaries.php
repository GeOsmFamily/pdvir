<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\Admin1BoundariesRepository;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: Admin1BoundariesRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/admin1_boundaries',
            normalizationContext: ['groups' => [self::GET_WITHOUT_GEOM]],
        ),
    ],

)]
class Admin1Boundaries
{
    private const GET_WITHOUT_GEOM = 'admin1_boundaries:get_without_geom';
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([Actor::ACTOR_READ_ITEM, self::GET_WITHOUT_GEOM])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups([Actor::ACTOR_READ_ITEM, self::GET_WITHOUT_GEOM])]
    private ?string $adm1_name = null;

    #[ORM\Column(length: 255)]
    #[Groups([Actor::ACTOR_READ_ITEM, self::GET_WITHOUT_GEOM])]
    private ?string $adm1_pcode = null;

    #[ORM\Column(type: 'geometry')]
    #[Groups([Actor::ACTOR_READ_ITEM])]
    private $geometry;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAdm1Name(): ?string
    {
        return $this->adm1_name;
    }

    public function setAdm1Name(string $adm1_name): static
    {
        $this->adm1_name = $adm1_name;

        return $this;
    }

    public function getAdm1Pcode(): ?string
    {
        return $this->adm1_pcode;
    }

    public function setAdm1Pcode(string $adm1_pcode): static
    {
        $this->adm1_pcode = $adm1_pcode;

        return $this;
    }

    public function getGeometry()
    {
        return $this->geometry;
    }

    public function setGeometry($geometry): static
    {
        $this->geometry = $geometry;

        return $this;
    }
}
