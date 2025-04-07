<?php

namespace App\Enum;

use App\Enum\Trait\ToArray;

enum ProjectFinancingType: string
{
    use ToArray;
    case OTHER = 'Autre';
    case OWN_FUNDS = 'Fonds propres';
    case PUBLIC_GRANT = 'Subvention publique';
    case BANK_LOAN = 'Prêt bancaire';
    case PRIVATE_INVESTMENT = 'Investissement privé';
    case CROWDFUNDING = 'Crowdfunding (financement participatif)';
    case PUBLIC_PRIVATE_PARTNERSHIP = 'Partenariat public-privé';
    case SPONSORSHIP = 'Mécénat';
}
