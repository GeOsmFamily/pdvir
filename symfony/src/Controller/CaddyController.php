<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;


#[Route('/caddy')]
class CaddyController extends AbstractController
{
    #[Route('/allowed-domain', name: 'allowed_domain', methods: ['GET'])]
    #[IsGranted('PUBLIC_ACCESS')]
    public function tlsChecker(
      #[MapQueryParameter()] string $domain
    ): Response
    {
      $allowedDomain = $this->getParameter('domain');
      $allowedDomainsRegex = "/^([a-z]*\.)?$allowedDomain$/";
      return new Response(null, preg_match($allowedDomainsRegex, $domain) ? 200 : 403);
    }
}