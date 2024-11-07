<?php

namespace App\Repository;

use App\Entity\UserLike;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<UserLike>
 */
class UserLikeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserLike::class);
    }

    public function findContentLikesWithCountAndUserLike(?int $userId): array
    {
        $qb = $this->createQueryBuilder('ul')
            ->select('ul.contentId, COUNT(ul.id) as likeCount, 
                MAX(CASE WHEN ul.userId = :userId THEN 1 ELSE 0 END) as userLiked')
            ->setParameter('userId', $userId)
            ->groupBy('ul.contentId');

        return $qb->getQuery()->getResult();
    }



    //    /**
    //     * @return UserLike[] Returns an array of UserLike objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('u.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?UserLike
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
