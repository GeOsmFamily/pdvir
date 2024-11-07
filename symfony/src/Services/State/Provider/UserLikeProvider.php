<?php

namespace App\Services\State\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Repository\UserLikeRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\SecurityBundle\Security;

class UserLikeProvider implements ProviderInterface
{
    private UserLikeRepository $userLikeRepository;
    private UserRepository $userRepository;
    private Security $security;

    public function __construct(UserLikeRepository $userLikeRepository, UserRepository $userRepository, Security $security)
    {
        $this->userLikeRepository = $userLikeRepository;
        $this->userRepository = $userRepository;
        $this->security = $security;
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $user = $this->security->getUser();

        // Get User ID
        $userId = null;
        if ($user) {
            $userEmail = $user->getUserIdentifier();
            $userEntity = $this->userRepository->findOneBy(['email' => $userEmail]);
            $userId = $userEntity ? $userEntity->getId() : null;
        }

        // Get Like list with liked by user status
        $results = $this->userLikeRepository->findContentLikesWithCountAndUserLike($userId);

        $output = [];
        foreach ($results as $result) {
            $output[$result['contentId']->toRfc4122()] = [
                'count' => $result['likeCount'],
                'liked' => (bool) $result['userLiked'],
            ];
        }

        return $output;
    }
}
