<?php

namespace App\Event\EventListener;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;

class UserListener
{
    public function __invoke(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();
        $response = new Response();
        $response->setContent($exception->getMessage());
        
        if ($exception instanceof UniqueConstraintViolationException) {
            $message = 'This email is already used';
            $response->setContent($message);
            $response->setStatusCode(Response::HTTP_CONFLICT);
        } else {
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
        $event->setResponse($response);
    }
}
