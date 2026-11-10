# Sweet Order App

PROMPT COMPLETO PARA DESENVOLVIMENTO DO APLICATIVO "DERCIBS DOCES"

Quero que você desenvolva um aplicativo mobile completo, moderno, bonito, responsivo e funcional para uma empresa de doces chamada Dercibs Doces.

O objetivo é criar um cardápio digital interativo, no qual o cliente possa entrar, informar seu nome, visualizar os produtos, escolher sabores, tamanhos e quantidades, montar seu carrinho e, no final, enviar o pedido automaticamente pelo WhatsApp da Dercibs Doces.

IMPORTANTE: não quero apenas um protótipo visual ou telas estáticas. Quero uma aplicação funcional, com navegação real, estados funcionando, carrinho funcionando, cálculo automático dos valores, persistência dos dados e integração com WhatsApp.

1. OBJETIVO PRINCIPAL

O aplicativo deve funcionar como um cardápio digital + sistema simples de montagem de pedidos.

O fluxo principal deve ser:

Abrir aplicativo → Identificar cliente → Entrar no cardápio → Escolher produtos → Escolher sabor → Escolher tamanho → Escolher quantidade → Adicionar ao carrinho → Revisar pedido → Enviar pelo WhatsApp.

A experiência deve ser extremamente simples para qualquer cliente conseguir fazer um pedido sem precisar de explicações.

2. IDENTIDADE DA MARCA

Nome

Dercibs Doces

Estilo visual

Criar uma identidade visual:

Delicada

Feminina

Artesanal

Acolhedora

Elegante

Alegre

Apetitosa

Moderna

Profissional

O aplicativo deve transmitir a sensação de uma confeitaria artesanal e cuidadosa.

Não criar uma interface genérica de aplicativo de delivery.

Quero que o design tenha personalidade própria da Dercibs Doces.

3. PALETA DE CORES

Utilizar principalmente:

Rosa pastel

#FDF0F2

Usar como cor principal de fundo.

Rosa destaque

#E05275

Usar em:

Botões

Preços

Elementos selecionados

Ícones importantes

Chamadas para ação

Indicadores

Marrom chocolate

#4A2C21

Usar em:

Títulos

Textos principais

Bordas

Detalhes

Elementos decorativos

Branco

#FFFFFF

Usar nos cards, áreas de conteúdo e componentes para criar contraste.

As cores devem ser equilibradas.

Não exagerar no rosa.

O resultado precisa parecer sofisticado e profissional, e não infantil.

4. ELEMENTOS VISUAIS

Utilizar elementos que remetam a doces artesanais:

Corações pequenos

Linhas onduladas

Pequenas estrelas

Detalhes de confeitaria

Formas arredondadas

Sombras suaves

Bordas delicadas

Elementos decorativos discretos

Adicionar uma abelhinha simpática como mascote da marca.

A abelhinha pode aparecer:

Na tela inicial

Próxima ao logo

Em pequenas animações

Durante carregamentos

Próxima a mensagens de sucesso

A abelhinha deve ser delicada e combinar com a identidade da marca.

5. ANIMAÇÕES

Adicionar microanimações suaves.

Exemplos:

Fade-in ao abrir uma tela

Cards aparecendo suavemente

Botões com pequena animação ao tocar

Produtos deslizando suavemente

Carrinho atualizando com animação

Coração aparecendo ao adicionar produto

Abelhinha voando suavemente pela interface

Transições entre telas

As animações devem ser leves.

Não utilizar animações exageradas que deixem o aplicativo pesado ou lento.

A interface deve continuar rápida mesmo em celulares mais simples.

6. TELA INICIAL / LOGIN

Criar uma primeira tela extremamente bonita.

Estrutura

No topo:

Logo da Dercibs Doces

Abaixo:

Uma ilustração delicada da abelhinha.

Texto:

"Que bom ter você aqui! 💕"

Subtexto:

"Vamos preparar seu pedido?"

Depois criar o campo:

"Como gostaria de ser chamado?"

Placeholder:

"Digite seu nome"

Criar também um campo opcional:

"WhatsApp"

Placeholder:

"(00) 00000-0000"

Adicionar:

☐ Lembrar meu nome neste dispositivo

Quando marcado, salvar o nome localmente.

Utilizar armazenamento local apropriado para a tecnologia escolhida.

7. VALIDAÇÃO DO LOGIN

O botão principal deve ser:

"Entrar no Cardápio"

Ao clicar:

Se o nome estiver vazio:

Mostrar:

"Digite seu nome para continuar 💕"

Se estiver preenchido:

Salvar os dados localmente quando a opção de lembrar estiver ativada.

Depois navegar para o cardápio.

Não permitir que o usuário avance com o nome vazio.

8. PERSISTÊNCIA

O aplicativo deve lembrar o cliente.

Se o usuário selecionar:

"Lembrar meu nome neste dispositivo"

Na próxima vez que abrir o aplicativo:

Recuperar o nome

Preencher automaticamente

Permitir entrar rapidamente no cardápio

Também preservar o carrinho durante a sessão.

Não perder produtos quando o usuário navegar entre telas.

9. TELA PRINCIPAL — CARDÁPIO

A tela principal deve possuir um cabeçalho bonito.

No topo:

Dercibs Doces

Mensagem:

"Olá, [Nome]! 💕"

Texto:

"Escolha seus doces favoritos."

Adicionar um pequeno ícone de carrinho no canto superior direito.

O ícone deve mostrar a quantidade de itens no carrinho.

Exemplo:

🛒 3

10. CATEGORIAS DO CARDÁPIO

Criar categorias visualmente separadas.

BOLO NO POTE 🍰

Produtos:

Chocolate

Ninho

Casadinho

Maracujá

Abacaxi com Coco

TORTA NO POTE 🥧

Produtos:

Limão

Maracujá

Abacaxi

Morango

Oreo

ESPECIAIS 💕

Produto:

Surpresa de Uva

11. CARDS DOS PRODUTOS

Cada produto deve aparecer em um card moderno.

Cada card deve possuir:

Imagem do produto

Nome

Categoria

Pequena descrição

Preços

Botão para adicionar

Botão para escolher detalhes

Exemplo:

Bolo no Pote — Chocolate

"Delicioso bolo de chocolate preparado com carinho."

Tamanhos:

200ml — R$ 10,00

250ml — R$ 12,00

O design deve priorizar as imagens dos doces.

As imagens devem possuir:

Cantos arredondados

Boa qualidade

Proporção consistente

Carregamento otimizado

Placeholder durante carregamento

12. SELEÇÃO DO PRODUTO

Quando o cliente tocar em um produto, abrir uma área/modal de detalhes.

Mostrar:

Produto

Bolo no Pote

Sabor

Chocolate

Tamanho

Escolher entre:

200ml

250ml

Quantidade

Criar controle:

− 1 +

A quantidade nunca pode ser menor que 1.

13. PREÇOS

Utilizar exatamente:

200ml

R$ 10,00

250ml

R$ 12,00

O sistema deve calcular automaticamente.

Exemplo:

1 × 200ml = R$ 10,00

2 × 200ml = R$ 20,00

3 × 250ml = R$ 36,00

2 × 200ml + 1 × 250ml = R$ 32,00

Não deixar valores fixos no frontend de maneira que possam causar inconsistências.

Centralizar a configuração dos produtos e preços em uma estrutura de dados única.

14. BOTÃO ADICIONAR AO CARRINHO

Criar botão:

"Adicionar ao Carrinho"

Ao adicionar:

Mostrar pequena animação

Atualizar contador do carrinho

Atualizar total

Mostrar feedback visual

Fechar o modal ou permitir continuar comprando

Mensagem opcional:

"Adicionado ao carrinho! 💕"

15. CARRINHO

Criar uma tela exclusiva para o carrinho.

Título:

"Seu Pedido 🛒"

Mostrar todos os produtos selecionados.

Cada item deve mostrar:

Nome

Sabor

Tamanho

Quantidade

Preço unitário

Subtotal

Botão +

Botão -

Botão remover

Exemplo:

Bolo no Pote

Chocolate — 200ml

− 2 +

R$ 20,00

16. CÁLCULO DO CARRINHO

O total deve ser atualizado instantaneamente.

Exemplo:

Chocolate 200ml × 2
R$ 20,00

Ninho 250ml × 1
R$ 12,00

Oreo 200ml × 1
R$ 10,00

Total: R$ 42,00

Não utilizar cálculos manuais.

O total deve ser calculado automaticamente a partir dos itens existentes no carrinho.

17. CARRINHO VAZIO

Quando não houver produtos:

Mostrar uma tela bonita:

"Seu carrinho está vazio 💕"

Texto:

"Escolha seus doces favoritos para começar seu pedido."

Botão:

"Ver Cardápio"

Adicionar uma pequena ilustração da abelhinha.

18. FINALIZAÇÃO DO PEDIDO

No final do carrinho criar:

"Fazer Pedido pelo WhatsApp"

O botão deve ser extremamente visível.

Pode utilizar:

Ícone do WhatsApp

Rosa da marca

Verde apenas como pequeno detalhe do ícone

Não criar checkout com pagamento online.

O objetivo é enviar o pedido diretamente para o WhatsApp.

19. INTEGRAÇÃO COM WHATSAPP

Preparar a integração utilizando:

https://wa.me/55NUMERO

O número real deverá ser configurado em uma constante/configuração separada.

NÃO deixar o número espalhado pelo código.

Criar uma variável como:

WHATSAPP_NUMBER

Assim será fácil alterar posteriormente.

20. MENSAGEM AUTOMÁTICA DO WHATSAPP

Ao clicar no botão, gerar automaticamente uma mensagem baseada no carrinho atual.

Formato:

Olá, Dercibs Doces! 💕

Me chamo [Nome do cliente].

Gostaria de fazer o seguinte pedido:

[Quantidade]x [Categoria] — [Sabor] — [Tamanho] — R$ [Subtotal]

Total do Pedido: R$ [Total]

Aguardando a confirmação do pedido! 🍰💕

21. EXEMPLO REAL

Se o cliente chamado Maria selecionar:

2 Chocolate 200ml

1 Ninho 250ml

A mensagem deve ficar aproximadamente:

Olá, Dercibs Doces! 💕

Me chamo Maria.

Gostaria de fazer o seguinte pedido:

2x Bolo no Pote — Chocolate — 200ml — R$ 20,00

1x Bolo no Pote — Ninho — 250ml — R$ 12,00

Total do Pedido: R$ 32,00

Aguardando a confirmação do pedido! 🍰💕

O texto deve ser codificado corretamente para funcionar no link do WhatsApp.

22. EXPERIÊNCIA MOBILE

O aplicativo deve ser desenvolvido prioritariamente pensando em celulares.

Deve funcionar muito bem em:

Android

iPhone

Telas pequenas

Telas grandes

Não deixar:

Texto cortado

Botões fora da tela

Cards quebrados

Elementos sobrepostos

Scroll horizontal

Imagens deformadas

Teclado cobrindo campos

Botões inacessíveis

23. RESPONSIVIDADE

Apesar de ser mobile-first, a interface deve ser responsiva.

Também deve funcionar corretamente em:

Celulares

Tablets

Desktop

Em telas maiores, aumentar o número de cards por linha.

Exemplo:

Celular:

1 card por linha.

Tablet:

2 cards por linha.

Desktop:

3 ou 4 cards por linha.

24. NAVEGAÇÃO

Criar navegação simples.

Possíveis áreas:

Início

Cardápio

Carrinho

O usuário deve conseguir retornar ao cardápio sem perder o pedido.

O carrinho deve permanecer disponível durante toda a navegação.

25. ACESSIBILIDADE

Implementar:

Contraste adequado

Textos legíveis

Botões grandes o suficiente

Áreas de toque confortáveis

Labels nos campos

Feedback visual

Estados de foco

Compatibilidade com leitores de tela quando possível

Não depender somente de cores para indicar seleção.

26. ESTADOS DA INTERFACE

Criar estados completos para:

Carregando

Mostrar skeleton ou loading delicado.

Sucesso

Mostrar feedback quando produto for adicionado.

Erro

Mostrar mensagens amigáveis.

Carrinho vazio

Mostrar estado vazio.

Produto selecionado

Mostrar visualmente o estado selecionado.

WhatsApp

Se o dispositivo não conseguir abrir o WhatsApp, apresentar uma alternativa adequada ou mensagem informativa.

27. PERFORMANCE

O aplicativo precisa ser rápido.

Evitar:

Bibliotecas desnecessárias

Imagens extremamente pesadas

Animações excessivas

Re-renderizações desnecessárias

Código duplicado

O carregamento inicial deve ser rápido.

O código precisa ser organizado e fácil de manter.

28. ESTRUTURA DO PROJETO

Organizar o projeto de forma profissional.

Separar:

Componentes

Telas

Dados dos produtos

Configurações

Estilos

Funções do carrinho

Integração WhatsApp

Armazenamento local

Assets

Ícones

Imagens

Não colocar toda a aplicação em um único arquivo.

29. DADOS DOS PRODUTOS

Criar uma estrutura centralizada para os produtos.

Exemplo conceitual:

Produto:

id

categoria

nome

descrição

imagem

tamanhos

preços

Isso permitirá adicionar novos doces futuramente sem precisar reconstruir toda a interface.

30. REGRAS IMPORTANTES

O sistema deve:

Não permitir quantidade zero.

Não permitir quantidade negativa.

Não permitir adicionar produto sem tamanho selecionado.

Atualizar subtotal automaticamente.

Atualizar total automaticamente.

Atualizar contador do carrinho automaticamente.

Permitir remover produtos.

Permitir alterar quantidade.

Preservar o carrinho durante a navegação.

Gerar a mensagem do WhatsApp automaticamente.

Usar o nome informado pelo cliente.

Formatar corretamente os valores em reais.

Não perder os dados ao mudar de tela.

Evitar duplicação desnecessária de itens.

Tratar corretamente produtos iguais com tamanhos diferentes.

31. DESIGN DOS BOTÕES

Botões principais devem ter:

Cantos arredondados

Boa altura para toque

Tipografia forte

Animação de toque

Contraste adequado

Sombra suave

Exemplos:

Entrar no Cardápio

Adicionar ao Carrinho

Ver Carrinho

Fazer Pedido pelo WhatsApp

32. TIPOGRAFIA

Utilizar uma fonte moderna, elegante e extremamente legível.

Os títulos podem ter uma personalidade mais artesanal.

O texto deve continuar fácil de ler em telas pequenas.

Criar hierarquia visual:

Título grande

Subtítulo

Nome do produto

Descrição

Preço

Informações secundárias

33. LOGO

Utilizar a logo oficial da Dercibs Doces fornecida posteriormente.

Não recriar uma logo diferente se uma logo oficial for disponibilizada.

Respeitar:

Proporção

Cores

Espaçamento

Qualidade

Área de proteção

34. IMAGENS DOS DOCES

Preparar o sistema para receber imagens reais dos produtos.

Cada produto deve poder ter sua própria imagem.

Não utilizar imagens deformadas.

Utilizar:

object-fit: cover

ou comportamento equivalente, dependendo da tecnologia.

Criar fallback caso uma imagem não carregue.

35. SEGURANÇA E CONFIGURAÇÃO

Não deixar informações importantes espalhadas pelo código.

Criar uma área de configuração para:

Número do WhatsApp

Nome da loja

Preços

Configurações gerais

Não armazenar informações sensíveis desnecessariamente.

36. EXPERIÊNCIA DO USUÁRIO

O cliente deve conseguir realizar um pedido em poucos passos.

A experiência ideal:

1. Digitar nome

↓

2. Entrar no cardápio

↓

3. Escolher doce

↓

4. Escolher tamanho

↓

5. Escolher quantidade

↓

6. Adicionar ao carrinho

↓

7. Conferir pedido

↓

8. Clicar em WhatsApp

↓

9. WhatsApp abrir com a mensagem pronta

O processo precisa ser simples, rápido e intuitivo.

37. DETALHES VISUAIS EXTRAS

Adicionar pequenos detalhes que deixem o aplicativo mais premium:

Sombras suaves

Cards com profundidade

Bordas delicadas

Divisórias onduladas

Pequenos corações

Mascote de abelhinha

Animação suave de voo

Feedback visual ao adicionar produtos

Transições suaves

Espaçamento consistente

Porém, não exagerar.

A prioridade é:

elegância + usabilidade + velocidade.

38. DESKTOP

Quando aberto em computador, o aplicativo deve continuar bonito.

Criar um container central com largura máxima.

Não deixar o conteúdo ocupar uma largura exagerada.

Exemplo conceitual:

max-width: 1200px

O cardápio pode aparecer em múltiplas colunas.

O carrinho pode ser exibido em uma área lateral ou como tela dedicada, dependendo da estrutura escolhida.

39. MOBILE

No celular:

Menu simples

Cards empilhados

Botão de carrinho sempre acessível

Botão de WhatsApp facilmente encontrado

Elementos grandes para toque

Nenhum overflow horizontal

O botão principal de pedido pode ficar fixo na parte inferior quando fizer sentido.

40. MICROCOPY

Usar textos amigáveis.

Exemplos:

"Escolha seu doce favorito 💕"

"Humm... esse é uma delícia! 🍰"

"Adicionado ao seu pedido!"

"Seu pedido está quase pronto!"

"Confira tudo antes de enviar."

Evitar textos técnicos para o cliente.

41. NÃO FAZER

Não quero:

Interface genérica

Design sem personalidade

Botões pequenos

Cores neon

Excesso de gradientes

Excesso de sombras

Layout quebrado

Informações fictícias desnecessárias

Checkout complicado

Sistema de pagamento

Login com senha

Cadastro complexo

Elementos que não possuem função

Telas vazias sem propósito

Código todo concentrado em um arquivo

42. RESULTADO ESPERADO

Quero que o resultado final pareça um aplicativo profissional de uma confeitaria real, e não um projeto de demonstração.

A primeira impressão deve ser:

"Esse é o aplicativo oficial da Dercibs Doces."

O usuário deve sentir que está navegando em uma marca de doces artesanal, bonita, confiável e profissional.

43. TESTES OBRIGATÓRIOS

Antes de considerar o projeto concluído, testar:

Login

Nome vazio

Nome preenchido

Persistência do nome

Cardápio

Todas as categorias

Todos os produtos

Seleção de sabores

Seleção de tamanho

Carrinho

Adicionar produto

Adicionar vários produtos

Alterar quantidade

Remover produto

Carrinho vazio

Cálculo correto

Valores

Verificar:

200ml = R$ 10,00

250ml = R$ 12,00

WhatsApp

Verificar:

Nome correto

Produtos corretos

Quantidades corretas

Tamanhos corretos

Subtotais corretos

Total correto

Mensagem corretamente codificada

Responsividade

Testar em:

Celular pequeno

Celular grande

Tablet

Desktop

44. IMPORTANTE SOBRE O DESENVOLVIMENTO

Não simplesmente gere uma interface visual sem lógica.

Primeiro pense na arquitetura da aplicação.

Depois implemente:

Estrutura

Componentes

Dados dos produtos

Estado do carrinho

Persistência

Navegação

Interface

Responsividade

Integração WhatsApp

Validações

Estados de erro

Testes finais

Se alguma informação estiver faltando, utilize uma estrutura preparada para configuração posterior, sem inventar dados importantes da empresa.

45. REGRA FINAL

Quero um aplicativo completo, funcional, bonito, responsivo e pronto para evolução.

Priorize nesta ordem:

FUNCIONALIDADE → EXPERIÊNCIA DO USUÁRIO → DESIGN → PERFORMANCE → ORGANIZAÇÃO DO CÓDIGO.

Não entregue somente um mockup.

Não entregue telas sem funcionamento.

Todos os botões principais precisam executar suas respectivas funções.

O cliente precisa conseguir:

entrar → escolher doces → montar pedido → visualizar total → enviar pedido pelo WhatsApp.

Esse é o fluxo principal e deve funcionar perfeitamente.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://dercibs-sweet-whisper.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6603032a-2504-49ca-a116-eb7517af3a65).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
