<?php

namespace App\Repository;

use App\Entity\HighlightedItem;
use App\Enum\ItemType;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Gedmo\Sortable\Entity\Repository\SortableRepository;

/**
 * @extends ServiceEntityRepository<HighlightedItem>
 */
class HighlightedItemRepository extends SortableRepository
{
    public function __construct(
        EntityManagerInterface $em
    )
    {
        parent::__construct($em);
    }

    public function findAllHighlighted(): array
    {
        $partialHighlightedItems = $this->findAll();
        $ids = [
            ItemType::PROJECT->value => [],
            ItemType::ACTOR->value => [],
            ItemType::RESOURCE->value => []
        ];
        foreach ($partialHighlightedItems as $highlightedItem) {
            if ($highlightedItem->getIsHighlighted()) {
                $ids[$highlightedItem->getItemType()->value][] = $highlightedItem->getItemId();
            }
        }

        $highlightedProjects = $this->projectRepository->findBy(['id' => $ids[ItemType::PROJECT->value]]);
        $highlightedActors = $this->actorRepository->findBy(['id' => $ids[ItemType::ACTOR->value]]);
        $highlightedResources = $this->resourceRepository->findBy(['id' => $ids[ItemType::RESOURCE->value]]);

        $highlightedItems = array_merge($highlightedProjects, $highlightedActors, $highlightedResources);
        foreach ($partialHighlightedItems as $key => $highlightedItem) {
            $name = null;
            foreach ($highlightedItems as $item) {
                if ($item->getId() === $highlightedItem->getItemId()) {
                    $name = $item->getName();
                    break;
                }
            }
            $partialHighlightedItems[$key]->setName($name);
        }
        return $partialHighlightedItems;
    }

    public function getMaxPosition(): int
    {
        return $this->createQueryBuilder('h')
            ->select('MAX(h.position)')
            ->getQuery()
            ->getSingleScalarResult() ?? 0;
    }

    //    /**
    //     * @return HighlightedItem[] Returns an array of HighlightedItem objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('h')
    //            ->andWhere('h.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('h.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?HighlightedItem
    //    {
    //        return $this->createQueryBuilder('h')
    //            ->andWhere('h.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
