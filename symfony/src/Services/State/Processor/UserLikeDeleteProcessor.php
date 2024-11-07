<?php

namespace App\Services\State\Processor;

use App\Repository\UserRepository;
use ApiPlatform\Metadata\Operation;
use App\Repository\UserLikeRepository;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\State\ProcessorInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class UserLikeDeleteProcessor implements ProcessorInterface
{
    private UserLikeRepository $userLikeRepository;
    private UserRepository $userRepository;
    private Security $security;
    private EntityManagerInterface $entityManager;

    public function __construct(UserLikeRepository $userLikeRepository, UserRepository $userRepository, Security $security,
    EntityManagerInterface $entityManager)
    {
        $this->userLikeRepository = $userLikeRepository;
        $this->userRepository = $userRepository;
        $this->security = $security;
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): void
    {
        // Vérifier que l'operation est un DELETE (optionnel)
        if ($operation->getName() !== 'delete') {
            return;
        }

        // Récupérer l'utilisateur authentifié
        $user = $this->security->getUser();
        if (!$user) {
            throw new BadRequestException('User not authenticated.');
        }

        // Récupérer l'ID du contenu (contentId) depuis les variables de l'URL
        $contentId = $uriVariables['contentId'] ?? null;
        if (!$contentId) {
            throw new BadRequestException('Content ID is missing.');
        }

        // Récupérer l'ID de l'utilisateur
        $userEmail = $user->getUserIdentifier();
        $userEntity = $this->userRepository->findOneBy(['email' => $userEmail]);
        $userId = $userEntity ? $userEntity->getId() : null;

        // Trouver le like dans la base de données
        // $like = $this->userLikeRepository->findOneByContentAndUserId($contentId, $userId);
        $userLike = $this->userLikeRepository->findOneBy([
            'userId' => $userId,
            'contentId' => $contentId,
        ]);

        dump($userLike);

        if (!$userLike) {
            throw new BadRequestException('Like not found for the given content ID and user');
        }

        // Supprime l'entité UserLike
        $this->entityManager->remove($userLike);
        $this->entityManager->flush();

        // if (!$like) {
        //     throw new BadRequestException('Like not found.');
        // }

        // // Supprimer le like
        // $this->userLikeRepository->remove($like);

        // Vous pouvez ajouter une validation ou une autre action après la suppression si nécessaire
    }
}
