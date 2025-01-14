<?php

namespace App\Services\State\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Repository\ActorRepository;
use App\Repository\HighlightedItemRepository;
use App\Repository\ProjectRepository;
use App\Repository\ResourceRepository;

class HighlightedItemProvider implements ProviderInterface
{
    public function __construct(
        private HighlightedItemRepository $highlightedItemRepository
    ) {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        return $this->highlightedItemRepository->findAllHighlighted();
    }
}
