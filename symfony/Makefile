
## 
## --------------------------------------------------------------------------------
##  🎵  Symfony commands
## --------------------------------------------------------------------------------

sf:			## List all Symfony commands or pass the parameter "c=" to run a given command, example: make sf c=about
	@$(eval c ?=)
	@$(SYMFONY) $(c)

cc:			## Clear the cache
	@$(SYMFONY) c=c:c

init-jwt-keypair:	## Generate a new JWT keypair
	@$(SYMFONY) lexik:jwt:generate-keypair --overwrite

## 
## --------------------------------------------------------------------------------
##  🧙  Composer
## --------------------------------------------------------------------------------

composer:		## Run composer, pass the parameter "c=" to run a given command, example: make composer c='req symfony/orm-pack'
	@$(eval c ?=)
	@$(COMPOSER) $(c)

composer-install:	## Run composer install
	@$(COMPOSER) install

composer-update:	## Run composer update
	@$(COMPOSER) update

composer-dump-env:	## Run composer dump-env
ifdef APP_ENV
	@$(COMPOSER) dump-env ${APP_ENV}:
else
	@$(COMPOSER) dump-env dev:
endif

vendor:			## Install vendors according to the current composer.lock file
	@$(COMPOSER) install --prefer-dist --no-dev --no-progress --no-scripts --no-interaction


## 
## --------------------------------------------------------------------------------
##  🛢️  Database - Doctrine
## --------------------------------------------------------------------------------

recreate-database:	## Recreate the database
	restart-db drop-database create-database configure-database

drop-database:		## Drop the database
	@$(SYMFONY) do:da:dr -f --if-exists

create-database:	## Create the database
	@$(SYMFONY) do:da:cr --if-not-exists

run-migration:		## Run migrations
	@$(SYMFONY) do:mi:mi -n --allow-no-migration

run-fixtures:		## Run fixtures
	@$(SYMFONY) ha:fi:lo -n -vvv

make-migration:		## Create a new migration
	@$(SYMFONY) make:migration

make-entity:		## Create a new entity
	@$(SYMFONY) make:entity

regenerate-entity:	## Regenerate entities
	@$(SYMFONY) make:entity --regenerate

enable-postgis:		## Enable postgis
	@$(SYMFONY) dbal:run-sql 'CREATE extension postgis;'

make-run-migration:	## Create and run a new migration
	make-migration run-migration

reset-database:		## Reset the database (recreate and run migrations)
	recreate-database run-migration

rerun-database:		## Reset the database (recreate, run migrations and run fixtures)
	reset-database run-fixtures

configure-database:	## Configure the database
	enable-postgis

create-short-migration: ## Create a small migration
	reset-database make-migration run-migration run-fixtures


## 
## --------------------------------------------------------------------------------
##  🛠️  Tools
## --------------------------------------------------------------------------------

run-php-cs-fixer:	## Run php-cs-fixer
	@$(DOCKER_EXEC_PHP) php vendor/bin/php-cs-fixer fix --config=.php-cs-fixer.dist.php
