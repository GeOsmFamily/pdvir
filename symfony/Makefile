## —— Composer 🧙 ——————————————————————————————————————————————————————————————
composer: ## Run composer, pass the parameter "c=" to run a given command, example: make composer c='req symfony/orm-pack'
	@$(eval c ?=)
	@$(COMPOSER) $(c)

composer-install:
	@$(COMPOSER) install

composer-update:
	@$(COMPOSER) update

composer-dump-env:
ifdef APP_ENV
	@$(COMPOSER) dump-env ${APP_ENV}:
else
	@$(COMPOSER) dump-env dev:
endif

vendor: ## Install vendors according to the current composer.lock file
vendor: c=install --prefer-dist --no-dev --no-progress --no-scripts --no-interaction
vendor: composer

## —— Symfony 🎵 ———————————————————————————————————————————————————————————————
sf: ## List all Symfony commands or pass the parameter "c=" to run a given command, example: make sf c=about
	@$(eval c ?=)
	@$(SYMFONY) $(c)

cc: c=c:c ## Clear the cache
cc: sf

reset-database-schema:
	@$(SYMFONY) do:s:u -f

recreate-database: restart-db-container drop-database create-database

drop-database:
	@$(SYMFONY) do:da:dr -f --if-exists 

create-database:
	@$(SYMFONY) do:da:cr --if-not-exists

run-migration rerun-migration:
	@$(SYMFONY) do:mi:mi -n --allow-no-migration

run-fixtures:
	@$(SYMFONY) ha:fi:lo -n -vvv

make-migration:
	@$(SYMFONY) make:migration

make-entity:
	@$(SYMFONY) make:entity

regenerate-entity:
	@$(SYMFONY) make:entity --regenerate

make-run-migration: make-migration run-migration
reset-database: create-database run-migration
rerun-database: reset-database run-fixtures
create-short-migration: create-database run-migration make-migration rerun-migration

init-jwt-keypair:
	@$(SYMFONY) lexik:jwt:generate-keypair