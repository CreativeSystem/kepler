## usuario
  email,
  senha
  ativo

## pessoas
  nome,
  cpf,
  whatsapp,
  telefone,
  data nascimento
  interesses collection table(Array de string)
  usuario
  ativo

## servicos
  imagem(url)[galeria se der tempo]
  pessoa
  titulo
  descricao
  preço
  acombinar
  região (moovit)
  linkFacebook
  instagram
  ativo

  [] O preço ou a combinar é obrigatório
  [] Upload de imagens - S3

## servicos contratados
  servico
  pessoa
  avaliacao
  contato
  comentarios[obs: se der tempo]
  aceito

  [] uma avaliação por pessoa
