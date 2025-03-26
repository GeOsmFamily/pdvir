<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\Admin3BoundariesRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: Admin3BoundariesRepository::class)]
#[ApiResource]
class Admin3Boundaries
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $adm3_name = null;

    #[ORM\Column(length: 255)]
    private ?string $adm3_pcode = null;

    #[ORM\Column(length: 255)]
    private ?string $adm2_name = null;

    #[ORM\Column(length: 255)]
    private ?string $adm2_pcode = null;

    #[ORM\Column(length: 255)]
    private ?string $adm1_name = null;

    #[ORM\Column(length: 255)]
    private ?string $adm1_pcode = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAdm3Name(): ?string
    {
        return $this->adm3_name;
    }

    public function setAdm3Name(string $adm3_name): static
    {
        $this->adm3_name = $adm3_name;

        return $this;
    }

    public function getAdm3Pcode(): ?string
    {
        return $this->adm3_pcode;
    }

    public function setAdm3Pcode(string $adm3_pcode): static
    {
        $this->adm3_pcode = $adm3_pcode;

        return $this;
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
}
