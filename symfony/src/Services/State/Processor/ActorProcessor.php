<?php

namespace App\Services\State\Processor;

use App\Entity\Actor;
use App\Model\Enums\UserRoles;
use ApiPlatform\Metadata\Operation;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\State\ProcessorInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\RequestStack;

class ActorProcessor implements ProcessorInterface
{
    

    public function __construct(
        private EntityManagerInterface $entityManager,
        private Security $security,
        private RequestStack $requestStack
    )
    {
    }

    /**
     * @param Actor $data
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        if ($this->requestStack->getCurrentRequest()->getMethod() === 'POST') {
            if ($this->security->isGranted(UserRoles::ROLE_ADMIN)) {
                $data->setValidated(true);
            } else {
                $data->setValidated(false);
            }
        }

        $user = $this->security->getUser();
        if ($data instanceof Actor && null !== $user) {
            $data->setCreatedBy($user);
        }
        $this->entityManager->persist($data);
        $this->entityManager->flush();
        

        return $data;
    }
}

