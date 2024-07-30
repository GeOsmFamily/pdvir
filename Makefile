include vue/Makefile
include symfony/Makefile

-include .env.local

DOCKER_COMP = docker compose

DOCKER_EXEC_VUE = $(DOCKER_COMP) exec vue
DOCKER_EXEC_PHP = $(DOCKER_COMP) exec php

VUE = $(DOCKER_EXEC_VUE)
SYMFONY = $(DOCKER_EXEC_PHP) php bin/console
COMPOSER = $(DOCKER_EXEC_PHP) composer

dev: up show-urls
stop: down
init: build init-hosts

up:
	$(DOCKER_COMP) up --build -d --remove-orphans

down:
	$(DOCKER_COMP) down

build:
	$(DOCKER_COMP) build


show-urls:
	@echo ""
	@printf "\033[1;34m+--------------------------------------------------+\033[0m\n"
	@printf "\033[1;34m| Cameroon Urban Platform                          |\033[0m\n"
	@printf "\033[1;34m+--------------------------------------------------+\033[0m\n"
	@printf "\033[1;34m| \033[0m\033[1;32m%-30s \033[0m\033[1;34m| \033[0m\033[1;36m%-15s\033[0m\033[1;34m |\033[0m\n" "https://puc.local" "Main website"
	@printf "\033[1;34m| \033[0m\033[1;32m%-30s \033[0m\033[1;34m| \033[0m\033[1;36m%-15s\033[0m\033[1;34m |\033[0m\n" "https://qgis.puc.local" "QGIS server"
	@printf "\033[1;34m| \033[0m\033[1;32m%-30s \033[0m\033[1;34m| \033[0m\033[1;36m%-15s\033[0m\033[1;34m |\033[0m\n" "https://docs.puc.local" "Documentation"
	@printf "\033[1;34m| \033[0m\033[1;32m%-30s \033[0m\033[1;34m| \033[0m\033[1;36m%-15s\033[0m\033[1;34m |\033[0m\n" "https://api.puc.local" "API server"
	@printf "\033[1;34m| \033[0m\033[1;32m%-30s \033[0m\033[1;34m| \033[0m\033[1;36m%-15s\033[0m\033[1;34m |\033[0m\n" "https://mail.puc.local" "SMTP server"
	@printf "\033[1;34m+--------------------------------------------------+\033[0m\n"
	@printf ""

HOST_ENTRIES = \
  "127.0.0.1     puc.local"\
  "127.0.0.1     qgis.puc.local"\
  "127.0.0.1     docs.puc.local"\
  "127.0.0.1     api.puc.local"\
  "127.0.0.1     mail.puc.local"

init-hosts:
	@echo "Detecting OS..."
	@OS=`uname | cut -d'_' -f1` ; \
	if [ "$$OS" = "Linux" ] || [ "$$OS" = "Darwin" ]; then \
		HOSTS_FILE="/etc/hosts"; \
		for ENTRY in $(HOST_ENTRIES); do \
			if ! grep -qF "$$ENTRY" "$$HOSTS_FILE"; then \
				echo "Adding entry '$$ENTRY'"; \
				echo "$$ENTRY" | sudo tee -a "$$HOSTS_FILE"; \
			else \
				echo "Entry '$$ENTRY' already exists"; \
			fi; \
		done; \
	elif [ "$$OS" = "MINGW32" -o "$$OS" = "MINGW64" -o "$$OS" = "MSYS" ]; then \
		HOSTS_FILE="C:\\Windows\\System32\\drivers\\etc\\hosts"; \
		for ENTRY in $(HOST_ENTRIES); do \
			powershell -Command "if (!(Select-String -Path '$$HOSTS_FILE' -Pattern '$$ENTRY' -Quiet)) { Start-Process cmd -Verb runAs -ArgumentList '/c echo $$ENTRY >> $$HOSTS_FILE' } else { Write-Output 'Entry already exists for Windows : $$ENTRY' }"; \
		done; \
	else \
		echo "Unsupported OS"; \
	fi