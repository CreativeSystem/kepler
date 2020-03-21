# Checklist
O que temos que ter : 
1	Iniciação
2	Planejamento
3	Execução
4	Monitoramento e Controle
5	Fechamento

## Iniciação

### Problema
    Nos dias de hoje com a grande carga de trabalho, 
    as pessoas não tem mais tempo para executar tarefas routineiras,
    como fazer faxina e cortar a grama, ou pessoas com maior poder 
    aquisitivo preferem pagar uma alguém para executar o trabalho, o que muitas 
    vezes é um dificil processo de seleção,sendo necessário buscar recomendações 
    com conhecidos.

### Solução
    Visando solucionar o problema da seleção de um fornecedor,a aplicação 
    disponibilizará um lista de serviços cadastrados com avaliações dos últimos
    contratantes, o que agilizará o processo de pesquisa por recomendações e 
    conectara um unico meio os contratantes e forncedores.

### Público Alvo
    Fornecedor - pessoas 18 - 40, com routina maleável,e quem tem um ganho
    abaixo de 1500/mês.

    Contratante - pessoas de 22 - 40 anos,com uma routina pouco maleável 
    e que ganham de 2500 a 6000 mês.

### Quem é o meu cliente?
    São os usuarios do sistema,fornecedore e contratantes.

### Objetivo
    O objetivo do sistema é criar uma ponte entre forncedores e contratantes,
    de forma a agilizar o processo de procura e contração.

### Planejamento
- [ ] Pesquisa para validação da idéia
- [ ] Protatipação das telas
- [ ] Validação com possíveis usuários
- [ ] Desenhar estrutura
- [ ] Desenvolvimento
- [ ] Homologação(interna e externa)
- [ ] Deploy
- [ ] Melhoria Continua

### Execucao

#### Infraestrutura
- [ ] Desenhar a arquitetura do sistema
- [ ] Definir banco de dados
- [ ] Definir tecnologias a serem utilizadas
- [ ] Definir onde será hospedado o backend e o frotend
- [ ] Definir ferrramnentas de desenvolvimento
- [ ] Definir ferramenta de organização a equipe

#### Pré-Desenvolvimento
- [ ] Desenhar modelo de entidade relacionamento
- [ ] Desenhar fluxo e casos de uso da aplicação
- [ ] Preparar ambiente de desenvolvimento
- [ ] Configurar o cd e ci da aplicação dentro github
- [ ] Estabelecer fluxo de desenvolvimento
- [ ] Estabelecer divisão das responsabilidades de cada membro

#### Desenvolvimento

Integracões
-----
- [ ] Integrar com S3
- [ ] Integrar com serviço de envio de Email
- [ ] Integrar com serviço de Geolocalização do Navegador
- [ ] Integrar com serviço de oauth(Ainda estamos pensando se iremos colocar isso)
- [ ] Integrar ferramenta de logs
- [ ] Criar Testes

Registro Usuario
-----
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
-------
- [ ] Logar usuario com e-mail e senha
- [ ] Esqueci minha senha ,enviar email com a token para recuperação

Listagem de Serviços
-------
- [ ] Listar serviços cadastrados conforme a localização e interesses do usuario
- [ ] Permitir fazer buscas na lista por preço tipo de serviço,disponibilidade
- [ ] Ver classificação do Serviço
- [ ] Criar Testes

Cadastro de Serviços
-------
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
-------
- [ ] Visualizar informações detalhadas do serviço na listagem
- [ ] Informar data desejada para a execução
- [ ] Enviar proposta ao Prestador
- [ ] Notificar o Prestador por e-mail
- [ ] Prestador podera aceitar ou não a proposta
- [ ] Informar ao Consumidor quando o a contração foi confirmada ou não
- [ ] Após a execução o consumidor podera avaliar o serviço
- [ ] Histórico de Contratação
- [ ] Criar Testes
#### Homologação
- [ ] Validações de regras e funcionamento
- [ ] Validações de utilização com os usuarios final
#### Deploy
- [ ] Fazer deploy do backend dentro do heroku
- [ ] Fazer deploy do frontend dentro do netlify
