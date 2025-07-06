<?php

namespace App\Model\Enums;

class UserRoles
{
    public const ROLE_USER = 'ROLE_USER';
    public const ROLE_EDITOR_ACTORS = 'ROLE_EDITOR_ACTORS';
    public const ROLE_EDITOR_PROJECTS = 'ROLE_EDITOR_PROJECTS';
    public const ROLE_EDITOR_RESSOURCES = 'ROLE_EDITOR_RESSOURCES';
    public const ROLE_ADMIN = 'ROLE_ADMIN';

    public const IS_GRANTED_EDITOR_ACTORS = "is_granted('".UserRoles::ROLE_EDITOR_ACTORS."')";
    public const IS_GRANTED_EDITOR_PROJECTS = "is_granted('".UserRoles::ROLE_EDITOR_PROJECTS."')";
    public const IS_GRANTED_EDITOR_RESSOURCES = "is_granted('".UserRoles::ROLE_EDITOR_RESSOURCES."')";
}
