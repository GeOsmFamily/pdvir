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


YELLOW=\033[1;33m
GREEN=\033[1;32m
BLUE=\033[0;34m
LIGHT_BLUE=\033[1;36m
NC=\033[0m # No Color

show-urls:
	@echo ""
	@printf "${BLUE}+---------------------------------------------+\n"
	@printf "${BLUE}| Cameroon Urban Platform                     |\n"
	@printf "${BLUE}+---------------------------------------------+\n"
	@printf "${BLUE}| ${BLUE}%-19s ${BLUE}| ${LIGHT_BLUE}%-23s${BLUE} |\n" "🚀  Main website" 	"https://puc.local"     
	@printf "${BLUE}| ${BLUE}%-19s ${BLUE}| ${LIGHT_BLUE}%-23s${BLUE} |\n" "🔒  REST API" 			"https://api.puc.local" 
	@printf "${BLUE}| ${BLUE}%-19s ${BLUE}| ${LIGHT_BLUE}%-23s${BLUE} |\n" "🌍  QGIS server" 	 	"https://qgis.puc.local"
	@printf "${BLUE}| ${BLUE}%-19s ${BLUE}| ${LIGHT_BLUE}%-23s${BLUE} |\n" "📨  SMTP server" 		"https://mail.puc.local"
	@printf "${BLUE}| ${BLUE}%-19s ${BLUE}| ${LIGHT_BLUE}%-23s${BLUE} |\n" "💡  Documentation" 	"https://docs.puc.local"
	@printf "${BLUE}+---------------------------------------------+${NC}\n"
	@echo ""

HOST_ENTRIES = \
  "127.0.0.1     puc.local"\
  "127.0.0.1     qgis.puc.local"\
  "127.0.0.1     docs.puc.local"\
  "127.0.0.1     api.puc.local"\
  "127.0.0.1     mail.puc.local"

init-hosts:
	@printf "${YELLOW}----------------------------------------------------${NC}\n"
	@printf "${YELLOW}  We will just add entries to your hosts file       ${NC}\n"
	@printf "${YELLOW}  Note : You might be asked to enter your password  ${NC}\n"
	@printf "${YELLOW}----------------------------------------------------${NC}\n"
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