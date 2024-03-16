# Documentação do Projeto: Sistema de Gestão de Projetos

## Introdução
O Sistema de Gestão de Projetos é uma aplicação web projetada para facilitar a criação, organização e distribuição de tarefas em projetos. Ele permite aos gestores criar projetos, adicionar funcionários e gestores, atribuir tarefas aos funcionários e monitorar o progresso do projeto.

## Objetivo
O objetivo deste sistema é otimizar a gestão de projetos, melhorando a distribuição de tarefas entre os funcionários e permitindo uma visão clara do progresso do projeto para todas as partes envolvidas.

## Funcionalidades

### 1. Gestão de Projetos
- **Criar Projeto:** Os gestores podem criar novos projetos especificando seu nome, descrição e prazo.
- **Editar Projeto:** Os gestores têm a capacidade de editar as informações do projeto, como nome, descrição e prazo.
- **Excluir Projeto:** Os gestores podem excluir projetos que não são mais necessários.

### 2. Gestão de Pessoal
- **Adicionar Funcionários:** Os gestores podem adicionar novos funcionários ao sistema, especificando seu nome, cargo e habilidades.
- **Adicionar Gestores:** Além dos funcionários regulares, os gestores podem designar outros usuários como gestores, dando-lhes permissões adicionais para gerenciar projetos e atribuir tarefas.
- **Editar Informações de Funcionários:** Os gestores podem editar as informações dos funcionários, como nome, cargo e habilidades.
- **Remover Funcionários:** Os gestores podem remover funcionários do sistema.

### 3. Gestão de Tarefas
- **Adicionar Tarefas:** Os gestores podem adicionar novas tarefas aos projetos, especificando seu nome, descrição, prazo e complexidade.
- **Atribuir Tarefas:** Os gestores podem atribuir tarefas aos funcionários disponíveis, levando em consideração suas habilidades e carga de trabalho atual.
- **Editar Tarefas:** Os gestores têm a capacidade de editar as informações das tarefas, como nome, descrição, prazo e responsável.
- **Remover Tarefas:** Os gestores podem remover tarefas do projeto quando necessário.

### 4. Monitoramento de Progresso
- **Visualizar Progresso:** Funcionários e gestores podem visualizar o progresso geral do projeto e o status de cada tarefa atribuída.
- **Atualizar Status:** Os funcionários podem atualizar o status de suas tarefas conforme avançam no trabalho.

## Tecnologias Utilizadas
- **Backend:** Java com Spring Framework
- **Banco de Dados:** MySQL
- **Autenticação:** JSON Web Tokens (JWT)

## Considerações de Segurança
- Todos os dados confidenciais são armazenados de forma segura no banco de dados, utilizando técnicas de criptografia, se necessário.
- A autenticação é necessária para acessar as funcionalidades do sistema, garantindo que apenas usuários autorizados possam interagir com os projetos e tarefas.
- As permissões de acesso são cuidadosamente gerenciadas para garantir que cada usuário tenha acesso apenas às funcionalidades e informações relevantes ao seu papel.

## Considerações Finais
O Sistema de Gestão de Projetos foi projetado para oferecer uma solução abrangente e intuitiva para a gestão eficiente de projetos. Com sua interface fácil de usar e conjunto robusto de funcionalidades, ele visa melhorar a colaboração entre os membros da equipe, aumentar a transparência do projeto e garantir o cumprimento dos prazos.
