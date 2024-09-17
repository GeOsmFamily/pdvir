<?php

namespace App\State\Processor;

use App\Entity\User;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

/**
 * @implements ProcessorInterface<User, User|void>
 */
final readonly class UserProcessor implements ProcessorInterface
{
    public function __construct(
        private ProcessorInterface $processor,
        private UserPasswordHasherInterface $passwordHasher,
        private RequestStack $requestStack
    )
    {
    }

    /**
     * @param User $data
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): User
    {
        if (!$data->getPlainPassword()) {
            return $this->processor->process($data, $operation, $uriVariables, $context);
        }

        $hashedPassword = $this->passwordHasher->hashPassword(
            $data,
            $data->getPlainPassword()
        );
        $data->setPassword($hashedPassword);
        $data->eraseCredentials();

        // User is validated and roles are set after inscription by admin
        if ($this->requestStack->getCurrentRequest()->getMethod() === 'POST') {
            $data->setRoles(['ROLE_USER']);
            $data->setValidated(false);
        }

        // Admin can change user roles
        if ($this->requestStack->getCurrentRequest()->getMethod() === 'PATCH') {
            if (isset($context['item_operation_name']) && $context['item_operation_name'] === 'set_user_roles') {
                $data->setRoles(['FLOUCK']);
            }
        }

        return $this->processor->process($data, $operation, $uriVariables, $context);
    }
}