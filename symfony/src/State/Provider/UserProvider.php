<?php

namespace App\State\Provider;
use ApiPlatform\Metadata\Operation;
use App\Repository\UserRepository;
use ApiPlatform\State\ProviderInterface;
use Symfony\Bundle\SecurityBundle\Security;

final class UserProvider implements ProviderInterface
{
    public function __construct(
        private UserRepository $userRepository,
        private Security $security
    ) {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): array
    {
        if ($this->security->isGranted('ROLE_ADMIN')) {
            return $this->userRepository->findAll();
        }

        return $this->userRepository->findBy(['isValidated' => true]);
    }
}