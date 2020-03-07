# Checklist

## Planejamento
- [ ] Defininir do publico alvo
- [ ] Defininir escopo do projeto
- [ ] Desenhar Protótipo da Tela
- [ ] Validar telas com possiveis usuarios

## Infraestrutura
- [ ] Desenhar a arquitetura do sistema
- [ ] Definir banco de dados
- [ ] Definir tecnologias a serem utilizadas
- [ ] Definir onde será hospedado o backend e o frotend
- [ ] Definir ferrramnentas de desenvolvimento
- [ ] Definir ferramenta de organização a equipe

## Pré-Desenvolvimento
- [  ] Desenhar modelo de entidade relacionamento
- [ ] Desenhar fluxo e casos de uso da aplicação
- [ ] Preparar ambiente de desenvolvimento
- [ ] Configurar o cd e ci da aplicação dentro github
- [ ] Estabelecer fluxo de desenvolvimento
- [ ] Estabelecer divisão das responsabilidades de cada membro

## Desenvolvimento

Integracões
=======
- [ ] Integrar com S3
- [ ] Integrar com serviço de envio de Email
- [ ] Integrar com serviço de Geolocalização do Navegador
- [ ] Integrar com serviço de oauth(Ainda estamos pensando se iremos colocar isso)
- [ ] Integrar ferramenta de logs
- [ ] Criar Testes

Registro Usuario
=======
- [ ] Coletar as informações de email e senha 
- [ ] Enviar e-mail de confirmação
- [ ] Após confirmação,coletar dados :
    1. Interesses do usuario
    2. Nome
    3. Cpf
    4. Data de nascimento
    5. telefone e Whatsapp
- [ ] Pedir aprovção dos termos de uso
- [ ] Criar Testes

Autenticação do Usuario
======
- [ ] Logar usuario com e-mail e senha
- [ ] Esqueci minha senha ,enviar email com a token para recuperação

Listagem de Serviços
=======
- [ ] Listar serviços cadastrados conforme a localização e interesses do usuario
- [ ] Permitir fazer buscas na lista por preço tipo de serviço,disponibilidade
- [ ] Ver classificação do Serviço
- [ ] Criar Testes

Cadastro de Serviços
======
- [ ] Coletar informações:
    1. Imagens do serviço(Portifólio)
    2. Tipo
    3. Localidade
    4. Descrição
    5. Agenda de disponibilidade(Em estudo)
    6. Forma de cobrança e valor
- [ ] Inativar Serviço 
- [ ] Reativar Serviço
- [ ] Criar Testes

Contratação de Serviços
======
- [ ] Visualizar informações detalhadas do serviço na listagem
- [ ] Informar data desejada para a execução
- [ ] Enviar proposta ao Prestador
- [ ] Notificar o Prestador por e-mail
- [ ] Prestador podera aceitar ou não a proposta
- [ ] Informar ao Consumidor quando o a contração foi confirmada ou não
- [ ] Após a execução o consumidor podera avaliar o serviço
- [ ] Histórico de Contratação
- [ ] Criar Testes

## Deploy
- [ ] Fazer deploy do backend dentro do heroku
- [ ] Fazer deploy do frontend dentro do netlify