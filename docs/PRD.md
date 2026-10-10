# PRD — RPG Characters

Documento de referência do projeto. Serve para lembrar o que o site faz hoje, como o código está organizado e o que vamos melhorar. Não é um plano de produto comercial: é uma ficha de mesa para um hobby de RPG.

Última leitura do código: outubro de 2026.

## 1. Para que serve

Ferramenta pessoal para jogar RPG de mesa com mais facilidade. Há muita informação por personagem (história, atributos, habilidades, itens, anotações) e, na hora da luta, dá trabalho acompanhar vida, mana, CA, cargas e efeitos.

O site tem duas funções:

1. **Apresentação.** Ficha visual dos personagens: arte, história, status, habilidades, inventário e anotações.
2. **Simulador de batalha.** Painel de combate para usar na sessão: barras de vida e mana, botões de dano/cura/mana, habilidades com mecânica própria, controle de rodada, armas e armaduras equipadas.

Quem usa: o dono do projeto, na mesa (computador hoje; celular é o próximo alvo). Não há login, multijogador nem mestre remoto.

## 2. O que este projeto não é

- Sem backend e sem banco de dados. Continua assim.
- Sem editor genérico de habilidades. Cada habilidade nova entra no código, com a mecânica escrita à mão. Um “criador de magia” seria mais complexo do que o uso real pede.
- Sem campanha, fichas de inimigos ou rolagem completa de D&D. O simulador apoia os três personagens do grupo, não substitui a mesa.

## 3. Personagens

Três personagens de nível 10, todos vampiros, da mesma história.

| Apelido no código | Nome | Classe | Alinhamento | Papel |
| --- | --- | --- | --- | --- |
| Vlad | Vlad Alucard | Hemomante | Mal e Leal | Caçador que virou vampiro. Combate e hemomancia. |
| Alexia | Alexia Volier | Tecnomante | Neutro e Leal | Tecnologia, armas e magia. Tem recurso extra de carga. |
| Riven | Riven Alucard | Druida e Hemomante | Bom e Leal | Clone de Vlad. Natureza + hemomancia. Compartilha várias habilidades com ele. |

Histórias curtas ficam em `src/components/data/characterInfo.ts`.

### Números que não batem

A ficha de apresentação e a ficha de batalha guardam vida e mana em lugares diferentes, com valores diferentes.

| Personagem | Apresentação (`characterInfo.ts`) | Batalha (`characterStatus.ts`) |
| --- | --- | --- |
| Vlad | 212 HP / 74 MP / CA 17 | 234 HP / 82 MP / CA 17 |
| Alexia | 126 HP / 76 MP / CA 18 | 139 HP / 83 MP / CA 18 |
| Riven | 230 HP / 90 MP / CA 24 | 258 HP / 101 MP / CA 24 |

Na hora de atualizar ficha, decidir qual fonte é a oficial e alinhar as duas. Hoje a batalha usa só `characterStatus.ts`.

## 4. Telas e rotas

Definidas em `src/main.tsx`.

| Rota | Arquivo | O que é |
| --- | --- | --- |
| `/` | `src/pages/Home.tsx` | Tela principal. Arte em tela cheia, texto, avatares na lateral para trocar de personagem, e abas Status / Habilidades / Inventário / Anotações. O ícone de espada abre a batalha em outra aba. |
| `/battleSimulator` | `src/pages/Battle.tsx` | Simulador original. Fundo marrom estilo Baldur, altura fixa de 1400px, os três personagens empilhados. É esta rota que a Home abre. |
| `/battleSimulatorRPG` | `src/pages/BattleSimulatorRPG.tsx` | Mesmos componentes de personagem, com uma moldura visual nova (CSS em `BattleSimulatorRPG.css`). A moldura tenta ser responsiva; o conteúdo interno não acompanha. |
| `/characterInfo` | `src/pages/CharacterInfo.tsx` | Galeria “Guardiões do Destino”. Quase uma vitrine, separada da ficha completa da Home. |

Stack: React 18, TypeScript, Vite, React Router 6, Tailwind, alguns componentes Radix (dialog, tooltip, avatar). Deploy pensado para Vercel (`vercel.json` só faz rewrite de SPA).

## 5. Como o código está organizado

```
src/
  pages/                  telas (Home, Battle, BattleSimulatorRPG, CharacterInfo)
  components/
    charactersBattle/     um arquivo grande por personagem na luta
    charactersCards/      cards da aba Status na Home
    charactersInfo/       galeria da rota /characterInfo
    data/                 textos, status, habilidades, itens (fonte da verdade hoje)
    selectItensCharacters/ arma e armadura equipadas na luta (um arquivo por personagem)
    buttons/              rodada e proficiências
    container/            rodada, inventário, anotações
    ui/                   avatar, dialog, tooltip
    types/                tipos TypeScript
```

Padrão atual: cada personagem é um componente próprio, com estado e funções copiados. Funciona, e foi feito à mão de propósito. O custo é que Vlad, Alexia e Riven repetem a mesma lógica de vida, mana, barras e botões.

Arquivos centrais da luta:

- `characterbattleVlad.tsx` (~730 linhas)
- `characterBattleAlexia.tsx` (~620 linhas)
- `characterBattleRiven.tsx` (~670 linhas)
- `skillBattle.tsx` — ícone da habilidade + tooltip. Também recebe contadores e cores de borda de cada personagem.
- `containerTurn.tsx` — rodada anterior / próxima.

Dados:

- `characterInfo.ts` — ficha da Home.
- `characterStatus.ts` — números da batalha.
- `abilityCharacters.tsx` — habilidades da aba de apresentação.
- `skillsCharacters.tsx` e `secondSkillCharacters.tsx` — habilidades clicáveis da batalha.
- `itensCharacters.ts` — inventário da ficha.
- `itensBattleCharacters.ts` e `armorBattleCharacters.ts` — armas e armaduras escolhidas na luta.
- `textoCharacters.ts` — anotações fixas.

## 6. Simulador de batalha — o que acontece de verdade

Cada personagem começa com HP, MP e CA vindos de `characterStatus.ts`. Tudo vive em `useState`. Recarregar a página zera a luta.

### Controles manuais (os três)

- Campo + botão **dano**: subtrai da vida.
- Campo + botão **cura**: soma na vida.
- Campo + botão **mana**: soma mana.
- Vida e mana ficam limitadas entre 0 e o máximo.
- Não existe botão para gastar mana na mão, nem para reduzir CA na mão. Isso só acontece dentro de habilidades.

### Rodada

`ContainerTurn` mostra “Rodada N”.

- **Próximo** soma 1 na rodada e chama `updateSkillVlad` e `updateSkillRiven`.
- Isso avança a passiva de carga do Vlad (Sangue de Ferro) e da Riven (Onipresença).
- **Anterior** só diminui o número da rodada. Não desfaz passiva, cura, dano nem mana.
- A passiva da Alexia (Tiro Perfurante) não está ligada à rodada. Só avança se o ícone for clicado.

### Tipos de efeito que as habilidades já fazem

Não existe um motor genérico. O clique cai num `switch (skill.name)` e chama uma função daquele personagem.

| Tipo | Exemplos | O que o código faz |
| --- | --- | --- |
| Carga por rodada ou clique | Sangue de Ferro, Onipresença, Tiro Perfurante | Sobe um contador. No 3º passo avisa que está pronta e pinta a borda. Outro clique reseta. |
| Ultimate em 5 passos | Cães Infernais, Anjo/Míssil, Demon Back | Igual à passiva, com limite 5. Avisa com `alert` quando carrega. |
| Toggle de CA | Blood Armor, Blood Shield (Vlad); Blood Armor (Riven) | Liga/desliga +2 de CA e pinta a borda. |
| Toggle de atributos | Transformação Vampírica (Vlad); Armadura Hightec (Alexia) | Liga/desliga bônus em modificadores, CA e ataque (+4 Vlad, +2 Alexia). |
| Gasto de recurso | Maioria das magias | Subtrai MP fixo. Alexia também gasta **carga** (Drone, Repulsão, Adagas). |
| Dado de cura | Regeneração 1d4, Gladiador Imortal 1d6, Fotossíntese 1d2 | Rola no código e mostra o resultado em `alert`. |
| Dano com resistência | Foco de Força (Vlad, físico), Foco de Força (Riven, mágico), Defesa Hightec (Alexia) | `prompt` pede o dano, rola 1d6 de redução, aplica o resto na vida, explica em `alert`. |
| Roubo de vida | Transfusão Sanguínea (Vlad e Riven) | Gasta 6 de MP, pede o dano causado, cura metade. Na 3ª aplicação cura o dano inteiro e o contador zera. |
| Contador de usos | Anti-Atirador (talento, dentro do perfil) | Começa em 5 e desce a cada clique. |

Habilidades que só gastam mana (sem outro efeito automático): Reflexo Sanguíneo, Agulhas, Pinguins, Marca de Sangue, Olhar da Coruja, Corvos, Trincamento, Músculo, Erupção, Trovão, Confusão, Psy Bean, entre outras. O dano dessas ainda é resolvido na mesa; o site só desconta o recurso.

### O que usa janela do navegador

`alert` e `prompt` aparecem nas três fichas de batalha. É o ponto que mais atrapalha no celular: `prompt` é ruim de usar no mobile, bloqueia a tela e o visual não combina com o resto.

Onde:

- Aviso de passiva/ultimate pronta.
- Resultado de dados de cura.
- Pedido de dano (Foco de Força, Defesa Hightec, Transfusão) e o resumo depois.

Dialog e tooltip (Radix) já existem para perfil, arma, armadura e descrição de habilidade. Dá para usar o mesmo tipo de painel no lugar de `alert`/`prompt`.

### Bug conhecido na Transfusão

O contador da terceira aplicação lê `promptCount` antes do `setState` atualizar. O “terceiro acerto cura tudo” pode disparar no momento errado. Corrigir quando formos mexer nessa habilidade.

### Arma, armadura e perfil

Cada personagem tem um botão de arma e um de armadura. Abre um dialog, troca o ícone equipado e mostra dano/texto. A escolha não altera CA, ataque nem dano automaticamente.

O retrato abre um dialog com nome, nível, classe, alinhamento e talentos.

## 7. Apresentação (Home)

- Hero em `h-screen` com a arte do personagem, logo, nome e parágrafo.
- Coluna fixa à direita (`w-44`, `h-screen`) com os três avatares e o ícone da batalha.
- Abaixo, `PageInfos` com quatro abas. O fundo muda por personagem em Status e Anotações.
- Status monta um card específico (`characterCardVlad` etc.) mais `StatusCard`.
- Habilidades vêm de `abilityCharacters.tsx` (texto de ficha, sem mecânica de luta).
- Inventário e anotações são listas estáticas. Não dá para escrever uma nota nova na sessão.

A rota `/characterInfo` é outra apresentação, mais curta, e não substitui a Home.

## 8. Persistência (salvar no próprio navegador)

Dá para fazer, e não precisa de servidor.

`localStorage` guarda texto no navegador deste computador ou celular. Sobrevive a atualizar a página e a fechar a aba. Não sincroniza entre aparelhos. Se limpar os dados do site, perde.

O que vale salvar da batalha:

- HP, MP, CA, ataque e modificadores alterados
- carga da Alexia
- rodada atual
- contadores (passiva, ultimate, transfusão, anti-atirador)
- toggles ligados (Blood Armor, transformação, armadura hightec)
- arma e armadura selecionadas

O que pode ficar de fora no primeiro passo: histórico de cada rolagem. Um botão **Nova luta** limpa o save e volta aos valores de `characterStatus.ts`.

Implementação sugerida, quando formos fazer: um objeto único por luta (ou por personagem) e um hook que lê ao abrir e grava quando o estado muda. A ficha de apresentação não precisa entrar nisso, porque aqueles dados já estão no código.

## 9. Problemas para atacar

Ordem pensada para uso na mesa, não para reescrever o projeto inteiro.

### Agora (batalha)

1. **Layout da luta no celular.** O painel de cada personagem é `grid-cols-10` com `px-10`, barra larga, tabela de atributos ao lado e ícones de 64px em fileira. Isso só cabe em monitor. O CSS de `BattleSimulatorRPG` muda a moldura, mas o miolo continua de desktop. No celular a luta precisa empilhar: retrato e nome, barras, dano/cura/mana, habilidades em grade que quebra linha, atributos escondidos ou num painel, CA e ataque sempre visíveis.
2. **Trocar `alert` e `prompt` por interface própria.** Um painel pequeno para digitar dano e um aviso na própria tela para resultado de dado, passiva pronta e cura. Tem que funcionar com o teclado numérico do celular.
3. **Salvar a luta no `localStorage`**, com botão para recomeçar.

### Em seguida (visual e ficha)

4. Escolher uma tela de batalha só. Hoje existem `/battleSimulator` e `/battleSimulatorRPG` com os mesmos componentes. A Home aponta para a antiga.
5. Home no celular: hero, menu lateral fixo e abas com `px-24` / `grid-cols-2` estouram a largura.
6. Unificar HP/MP entre ficha e batalha.
7. Feedback visual contínuo (borda, selo “pronta”, “+2 CA”) no lugar de depender do alerta.

### Quando der (código, sem pressa)

8. Extrair a lógica repetida de HP/MP/limite, que hoje está copiada três vezes. Sem transformar isso num framework de habilidades.
9. O tipo `Skills` carrega estado de UI dos três personagens (bordas, contadores). Isso dificulta cada habilidade nova. Separar “dados da habilidade” de “estado da luta” deixa o `switch` mais legível, e a mecânica continua manual.
10. Nomes de arquivo misturam maiúsculas (`characterbattleVlad.tsx`). Não quebra no Windows; quebra se o projeto for para um sistema que diferencia maiúsculas.

## 10. Fora de escopo (por enquanto)

- Backend, login, banco, sincronizar celular com PC.
- Criador visual de habilidades ou de personagens.
- Inimigos, iniciativa de todo o grupo, mapa.
- Reescrever todas as magias numa engine genérica de dados.
- App nativo. O alvo é o site abrir bem no navegador do celular.

## 11. Como adicionar uma habilidade nova (combinado)

Continua manual:

1. Incluir o texto na ficha em `abilityCharacters.tsx`, se ela deve aparecer na apresentação.
2. Incluir o ícone e a descrição em `skillsCharacters.tsx` ou `secondSkillCharacters.tsx`.
3. Escrever a função no componente daquele personagem (gasto de mana, toggle, dado, prompt).
4. Ligar o `case` do `switch` ao nome exato da habilidade.

Quando o painel de input existir, o passo 3 usa esse painel em vez de `prompt`.

## 12. Ordem sugerida das próximas sessões

1. Layout responsivo do simulador (uma rota só, usável no celular na mesa).
2. Substituir `alert`/`prompt` por componentes na própria página.
3. `localStorage` + botão de reset da luta.
4. Ajustes finos de visual (Baldur já é a referência de cor: dourado `#c9b87c`, fundos escuros, texto `#E4DDC8`).
5. Home responsiva e alinhamento dos números da ficha.
6. Mecânicas novas ou corrigidas, uma por vez (começar pela Transfusão, se quiser).

Cada passo desses pode ser feito sem os outros, mas 1 e 2 são o que mais muda o uso na sessão.
