<?php

namespace App\Services\State\Processor\Common;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\GeoData;
use App\Services\Service\NominatimService;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class GeoDataProcessor implements ProcessorInterface
{
    private const COUNTRY_CODE = 'cm';

    public function __construct(
        #[Autowire(service: 'api_platform.doctrine.orm.state.persist_processor')]
        private ProcessorInterface $persistProcessor,
        private NominatimService $nominatimService,
    ) {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [], bool $nullable = false): mixed
    {
        if (!$nullable && null !== $data->getGeoData()) {
            if (null !== $data->getGeoData()->getOsmIdentifier()) {
                $geoData = $this->nominatimService->fetchOsmPlace($data->getGeoData());
                if (null !== $geoData) {
                    $data->setGeoData($geoData);
                } else {
                    throw new \Exception('Place not found');
                }
            } elseif (null !== $data->getGeoData()->getLatitude() && null !== $data->getGeoData()->getLongitude()) {
                if (!$this->areCoordsInCameroon($data->getGeoData())) {
                    throw new \Exception('Given coordinates are not in Cameroon', 400);
                } else {
                    $data->setGeoData($data->getGeoData());
                }
            }
        }

        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }

    public function areCoordsInCameroon(GeoData $geoData): bool
    {
        $data = $this->nominatimService->fetchOsmPlaceByCoords($geoData->getLatitude(), $geoData->getLongitude());

        return isset($data['address']) && self::COUNTRY_CODE === $data['address']['country_code'];
    }
}
