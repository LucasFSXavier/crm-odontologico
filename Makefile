# Makefile para CRM Odontológico
# Sistema de gestão para clínicas dentárias

.PHONY: help install dev build start lint clean format type-check test setup

# Variáveis
PNPM := pnpm
NODE_VERSION := 18
PORT := 3000

# Cores para output (funciona no Windows com Git Bash ou WSL)
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

# Comando padrão
.DEFAULT_GOAL := help

##@ Geral

help: ## Mostra esta mensagem de ajuda
	@echo "$(GREEN)CRM Odontológico - Comandos Disponíveis$(NC)"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"; printf "\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2 } /^##@/ { printf "\n$(GREEN)%s$(NC)\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
	@echo ""

##@ Setup

setup: ## Configura o ambiente do projeto (instala dependências)
	@echo "$(GREEN)Configurando ambiente...$(NC)"
	@$(PNPM) install
	@echo "$(GREEN)✓ Ambiente configurado com sucesso!$(NC)"

install: setup ## Alias para setup - instala dependências

##@ Desenvolvimento

dev: ## Inicia o servidor de desenvolvimento
	@echo "$(GREEN)Iniciando servidor de desenvolvimento...$(NC)"
	@$(PNPM) dev

serve: dev ## Alias para dev

##@ Build

build: ## Cria o build de produção
	@echo "$(GREEN)Gerando build de produção...$(NC)"
	@$(PNPM) build
	@echo "$(GREEN)✓ Build concluído com sucesso!$(NC)"

start: ## Inicia o servidor de produção (após build)
	@echo "$(GREEN)Iniciando servidor de produção...$(NC)"
	@$(PNPM) start

##@ Qualidade de Código

lint: ## Executa o linter (ESLint)
	@echo "$(GREEN)Executando linter...$(NC)"
	@$(PNPM) lint

lint-fix: ## Executa o linter e corrige problemas automaticamente
	@echo "$(GREEN)Corrigindo problemas do linter...$(NC)"
	@$(PNPM) lint --fix

type-check: ## Verifica tipos TypeScript
	@echo "$(GREEN)Verificando tipos TypeScript...$(NC)"
	@$(PNPM) exec tsc --noEmit
	@echo "$(GREEN)✓ Tipos verificados!$(NC)"

check: type-check lint ## Executa todas as verificações (types + lint)

format: ## Formata o código (se tiver prettier configurado)
	@echo "$(YELLOW)Formatação de código não configurada$(NC)"
	@echo "Para adicionar, instale: $(PNPM) add -D prettier"

##@ Testes

test: ## Executa os testes (se configurado)
	@echo "$(YELLOW)Testes não configurados$(NC)"
	@echo "Para adicionar, instale: $(PNPM) add -D jest @testing-library/react"

test-watch: ## Executa testes em modo watch
	@echo "$(YELLOW)Testes não configurados$(NC)"

##@ Limpeza

clean: ## Remove arquivos gerados (node_modules, .next, etc)
	@echo "$(YELLOW)Removendo arquivos gerados...$(NC)"
	@if exist .next (rmdir /s /q .next 2>nul) || true
	@if exist node_modules (rmdir /s /q node_modules 2>nul) || true
	@if exist .turbo (rmdir /s /q .turbo 2>nul) || true
	@if exist dist (rmdir /s /q dist 2>nul) || true
	@if exist build (rmdir /s /q build 2>nul) || true
	@if exist coverage (rmdir /s /q coverage 2>nul) || true
	@echo "$(GREEN)✓ Limpeza concluída!$(NC)"

clean-all: clean ## Remove tudo incluindo cache do pnpm
	@echo "$(YELLOW)Removendo cache do pnpm...$(NC)"
	@$(PNPM) store prune
	@echo "$(GREEN)✓ Limpeza completa concluída!$(NC)"

##@ Dependências

deps-update: ## Atualiza todas as dependências
	@echo "$(GREEN)Atualizando dependências...$(NC)"
	@$(PNPM) update --latest
	@echo "$(GREEN)✓ Dependências atualizadas!$(NC)"

deps-audit: ## Verifica vulnerabilidades nas dependências
	@echo "$(GREEN)Verificando vulnerabilidades...$(NC)"
	@$(PNPM) audit
	@echo "$(GREEN)✓ Auditoria concluída!$(NC)"

deps-fix: ## Corrige vulnerabilidades automaticamente
	@echo "$(GREEN)Corrigindo vulnerabilidades...$(NC)"
	@$(PNPM) audit --fix
	@echo "$(GREEN)✓ Vulnerabilidades corrigidas!$(NC)"

##@ Git

git-status: ## Mostra o status do Git
	@git status

git-add: ## Adiciona todas as mudanças ao Git
	@git add .

git-commit: ## Faz commit (use: make git-commit MESSAGE="sua mensagem")
	@if "$(MESSAGE)"=="" ( \
		echo "$(RED)Erro: Forneça uma mensagem. Use: make git-commit MESSAGE=\"sua mensagem\"$(NC)" && \
		exit /b 1 \
	) else ( \
		git commit -m "$(MESSAGE)" \
	)

git-push: ## Faz push para o repositório remoto
	@git push origin main

git-pull: ## Faz pull do repositório remoto
	@git pull origin main

##@ Docker (opcional)

docker-build: ## Constrói a imagem Docker (se Dockerfile existir)
	@if exist Dockerfile ( \
		echo "$(GREEN)Construindo imagem Docker...$(NC)" && \
		docker build -t crm-odontologico . && \
		echo "$(GREEN)✓ Imagem construída!$(NC)" \
	) else ( \
		echo "$(YELLOW)Dockerfile não encontrado$(NC)" \
	)

docker-run: ## Executa o container Docker
	@if exist Dockerfile ( \
		echo "$(GREEN)Executando container...$(NC)" && \
		docker run -p $(PORT):3000 crm-odontologico \
	) else ( \
		echo "$(YELLOW)Dockerfile não encontrado$(NC)" \
	)

##@ Utilitários

info: ## Mostra informações do projeto
	@echo "$(GREEN)=== Informações do Projeto ===$(NC)"
	@echo "Nome: CRM Odontológico"
	@node -p "require('./package.json').version" | findstr /V "^$" && echo Versão: || echo Versão: 0.1.0
	@node --version
	@$(PNPM) --version
	@echo "Porta: $(PORT)"
	@echo ""

logs: ## Mostra logs (se houver arquivo de log)
	@if exist *.log ( \
		type *.log \
	) else ( \
		echo "$(YELLOW)Nenhum arquivo de log encontrado$(NC)" \
	)

version: ## Mostra versões das principais dependências
	@echo "$(GREEN)=== Versões ===$(NC)"
	@node --version
	@$(PNPM) --version
	@$(PNPM) list next --depth=0 2>nul | findstr next || echo Next.js: não encontrado
	@$(PNPM) list react --depth=0 2>nul | findstr react || echo React: não encontrado
	@$(PNPM) list typescript --depth=0 2>nul | findstr typescript || echo TypeScript: não encontrado
	@echo ""

##@ Produção

deploy-check: build type-check lint ## Verifica se está pronto para deploy
	@echo "$(GREEN)✓ Projeto verificado e pronto para deploy!$(NC)"

production: build start ## Build e inicia em modo produção
