<?php

namespace App\Controller\Map;

use App\Services\Service\PdfGenerator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MapPdfController extends AbstractController
{
    #[Route('/api/export-map', name: 'export_map', methods: ['POST'])]
    public function exportMap(Request $request, PdfGenerator $pdfGenerator): Response
    {
        $data = json_decode($request->getContent(), true);
        $mapImage = $data['mapImage'] ?? null;

        if (!$mapImage) {
            return new Response('No image provided', 400);
        }

        $pdfContent = $pdfGenerator->generate('pdf/map.html.twig', [
            'map_url' => $mapImage
        ]);

        return new Response($pdfContent, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="map.pdf"',
        ]);
    }
}
