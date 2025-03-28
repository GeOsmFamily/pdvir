<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\Admin2BoundariesRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: Admin2BoundariesRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/admin2_boundaries',
            normalizationContext: ['groups' => [self::GET_WITHOUT_GEOM]],
        ),
    ],
)]
class Admin2Boundaries
{
    private const GET_WITHOUT_GEOM = 'admin2_boundaries:get_without_geom';
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([Actor::ACTOR_READ_ITEM, self::GET_WITHOUT_GEOM])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups([Actor::ACTOR_READ_ITEM, self::GET_WITHOUT_GEOM])]
    private ?string $adm2_name = null;

    #[ORM\Column(length: 255)]
    #[Groups([Actor::ACTOR_READ_ITEM, self::GET_WITHOUT_GEOM])]
    private ?string $adm2_pcode = null;

    #[ORM\Column(length: 255)]
    private ?string $adm1_name = null;

    #[ORM\Column(length: 255)]
    private ?string $adm1_pcode = null;

    #[ORM\Column(type: 'geometry')]
    private $geometry;

    #[Groups([Actor::ACTOR_READ_ITEM])]
    public function getGeometryGeoJson(): ?string
    {
        if (!$this->geometry) {
            return null;
        }
        
        $geom = \geoPHP::load($this->geometry, 'wkt');
        return $geom ? $geom->out('json') : null;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAdm2Name(): ?string
    {
        return $this->adm2_name;
    }

    public function setAdm2Name(string $adm2_name): static
    {
        $this->adm2_name = $adm2_name;

        return $this;
    }

    public function getAdm2Pcode(): ?string
    {
        return $this->adm2_pcode;
    }

    public function setAdm2Pcode(string $adm2_pcode): static
    {
        $this->adm2_pcode = $adm2_pcode;

        return $this;
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
