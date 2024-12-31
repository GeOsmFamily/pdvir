<?php

namespace App\Enum;

use App\Enum\Trait\ToArray;

enum AtlasGroup: string
{
    use ToArray;
    case THEMATIC_DATA = 'Données thématiques';
    case PREDEFINED_MAP = 'Cartes prédéfinies';
}