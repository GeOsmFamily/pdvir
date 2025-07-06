<?php

namespace App\Entity\File;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model;
use App\Entity\Atlas;
use App\Entity\QgisMap;
use App\Entity\Resource;
use App\Entity\User\User;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[Vich\Uploadable]
#[ORM\Entity]
#[ApiResource(
    normalizationContext: ['groups' => [self::READ]],
    types: ['https://schema.org/MediaObject'],
    outputFormats: ['jsonld' => ['application/ld+json']],
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            inputFormats: ['multipart' => ['multipart/form-data']],
            openapi: new Model\Operation(
                requestBody: new Model\RequestBody(
                    content: new \ArrayObject([
                        'multipart/form-data' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'file' => [
                                        'type' => 'string',
                                        'format' => 'binary',
                                    ],
                                ],
                            ],
                        ],
                    ])
                )
            )
        ),
    ]
)]
class FileObject extends AbstractObject
{
    private const READ = 'file_object:read';

    #[ApiProperty(types: ['https://schema.org/contentUrl'], writable: false)]
    #[Groups([self::READ, User::GROUP_GETME, Resource::GET_FULL, Atlas::GET_FULL, QgisMap::GET_FULL])]
    public ?string $contentUrl = null;

    #[ApiProperty(types: ['https://schema.org/contentUrl'], writable: false)]
    #[Groups([self::READ, User::GROUP_GETME, Resource::GET_FULL, Atlas::GET_FULL, QgisMap::GET_FULL])]
    public ?array $contentsUrl = null;

    #[Vich\UploadableField(
        mapping: 'file_object',
        fileNameProperty: 'filePath',
        originalName: 'originalName',
        mimeType: 'mimeType',
        dimensions: 'dimensions',
        size: 'size'
    )]
    #[Assert\NotNull]
    #[Assert\File(
        maxSize: '20M',
        extensions: ['pdf', 'xlsx', 'jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'],
        extensionsMessage: 'Please upload a valid file (pdf, xlsx, jpg, jpeg, png, webp, gif, svg)',
    )]
    public ?File $file = null;
}
