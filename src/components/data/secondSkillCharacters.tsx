import { Skills } from "../types/Skills";

export const secondSkillsVlad: Skills[] = [
  {
    name: "Transformação Vampírica",
    image: "./image/transformacaoIcon.png",
    magic: "Magia de Transformação",
    description: (
      <div>
        <p>
          Nessa transformação Vlad ganha{" "}
          <span className="text-yellow-300">+1 em todos os seus atributos</span>{" "}
          e <span className="text-yellow-300">curar 1/4 do dano</span> que ele
          causa em seus inimigos, mas nessa forma Vlad não tem controle de si
          mesmo, então ele não consegue usar suas armas, somente suas{" "}
          <span className="text-yellow-300">garras e mordidas de vampiro</span>.
        </p>
      </div>
    ),
    type: (
      <div>
        <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-1"></span>
        <span>Ação Bônus</span>
      </div>
    ),
  },
  {
    name: "Garras Vampírica",
    image: "./image/garrasVam.png",
    magic: "Ação de Vampiro",
    description: (
      <div>
        <p>
          Com Vlad transformado em sua forma vampírica ele tem suas garras mais
          afiadas que podem servir para machucar seus inimigos com{" "}
          <span className="text-yellow-300">2d10+const de dano</span> e com esse
          dano causado ele{" "}
          <span className="text-yellow-300">recupera 1/4 desse dano</span>, um
          ataque acertado com essas garras deixa o seu{" "}
          <span className="text-yellow-300">inimigo marcado com a marca</span>{" "}
          de sangue de Vlad.
        </p>
      </div>
    ),
    type: (
      <div>
        <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
        <span>Ação</span>
      </div>
    ),
  },
  {
    name: "Mordida Vampírica",
    image: "./image/mordidaVam.png",
    magic: "Ação de Vampiro",
    description: (
      <div>
        <p>
          Vlad estando transformado em sua forma vampírica ele tem seus dentes
          mais afiados e ferozes para comer tudo que estive em sua frente, uma
          mordida dessa causa{" "}
          <span className="text-yellow-300">1d20+const de dano</span> e{" "}
          <span className="text-yellow-300">curar metade do dano causado </span>
          no inimigo, também{" "}
          <span className="text-yellow-300">deixando a marca de sangue</span> de
          Vlad em seu inimigo.
        </p>
      </div>
    ),
    type: (
      <div>
        <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
        <span>Ação</span>
      </div>
    ),
  },
  {
    name: "Marca de Sangue",
    image: "./image/MarcaV2.png",
    magic: "Magia de Hemomancia",
    description: (
      <div>
        <p>
          Está é a habilidade da marca de sangue de Vlad, onde o usuário pode
          escolher em{" "}
          <span className="text-yellow-300">
            adicionar seu bônus de proficiência
          </span>{" "}
          em um dos seus
          <span className="text-yellow-300"> atributos</span> ou escolher ter{" "}
          <span className="text-yellow-300">um ataque extra</span>, lembrando
          que essa habilidade só pode ser usada{" "}
          <span className="text-yellow-300">1 vez por dia.</span>
        </p>
      </div>
    ),
    type: (
      <div>
        <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-1"></span>
        <span>Ação Bônus</span>
      </div>
    ),
    mana: (
      <div>
        <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
        <span>4-Mana</span>
      </div>
    ),
  },
  {
    name: "Armadura Neutral",
    image: "./image/armaduraPassivaV.png",
    magic: "Passiva de Proteção",
    description: (
      <div>
        <p>
          Essa é uma armadura que Vlad ganho do vampiro Azir, ela trás muito
          benefícios para o usuário, como o ganho de{" "}
          <span className="text-yellow-300">+90 de sobrevida</span>,{" "}
          <span className="text-yellow-300">
            1d10 para bloquear ataque físico
          </span>{" "}
          e 1 vez por batalha{" "}
          <span className="text-yellow-300">bloqueia 1 crítico</span>.
        </p>
      </div>
    ),
    type: (
      <div>
        <span className="inline-block w-3 h-3 bg-red-600 rounded-full mr-1"></span>
        <span>Passiva</span>
      </div>
    ),
  },
];

export const secondSkillsAlexia: Skills[] = [
  {
    name: "Defesa Hightec",
    image: "./image/armorPassiva.png",
    magic: "Passiva de Proteção",
    description: (
      <div>
        <p>
          Por causa da armadura hightec de Alexia, todo ataque que Alexia leva
          sua armadura tira{" "}
          <span className="text-yellow-300">1d6 de dado global</span>.
        </p>
      </div>
    ),
    type: (
      <div>
        <span className="inline-block w-3 h-3 bg-red-600 rounded-full mr-1"></span>
        <span>Passiva</span>
      </div>
    ),
  },
  {
    name: "Marca de Sangue",
    image: "./image/MarcaV2.png",
    magic: "Magia de Hemomancia",
    description: (
      <div>
        <p>
          Está é a habilidade da marca de sangue de Vlad, onde o usuário pode
          escolher em{" "}
          <span className="text-yellow-300">
            adicionar seu bônus de proficiência
          </span>{" "}
          em um dos seus
          <span className="text-yellow-300"> atributos</span> ou escolher ter{" "}
          <span className="text-yellow-300">um ataque extra</span>, lembrando
          que essa habilidade só pode ser usada{" "}
          <span className="text-yellow-300">1 vez por dia.</span>
        </p>
      </div>
    ),
    type: (
      <div>
        <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-1"></span>
        <span>Ação Bônus</span>
      </div>
    ),
    mana: (
      <div>
        <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
        <span>4-Mana</span>
      </div>
    ),
  },
];

export const secondSkillsRiven: Skills[] = [
  {
    name: "Marca de Sangue",
    image: "./image/MarcaV2.png",
    magic: "Magia de Hemomancia",
    description: (
      <div>
        <p>
          Está é a habilidade da marca de sangue de Vlad, onde o usuário pode
          escolher em{" "}
          <span className="text-yellow-300">
            adicionar seu bônus de proficiência
          </span>{" "}
          em um dos seus
          <span className="text-yellow-300"> atributos</span> ou escolher ter{" "}
          <span className="text-yellow-300">um ataque extra</span>, lembrando
          que essa habilidade só pode ser usada{" "}
          <span className="text-yellow-300">1 vez por dia.</span>
        </p>
      </div>
    ),
    type: (
      <div>
        <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-1"></span>
        <span>Ação Bônus</span>
      </div>
    ),
    mana: (
      <div>
        <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
        <span>4-Mana</span>
      </div>
    ),
  },
  {
    name: "Psy Bean",
    image: "./image/psybeanR.png",
    magic: "Magia de Neuromancia",
    description: (
      <div>
        <p>
          Um feixe psíquico é lançado{" "}
          <span className="text-yellow-300">4d8+int de dano</span>, na próxima
          rodada o adversário terá{" "}
          <span className="text-yellow-300">-2 de acerto</span>.
        </p>
      </div>
    ),
    type: (
      <div>
        <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
        <span>Ação</span>
      </div>
    ),
    mana: (
      <div>
        <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
        <span>5-Mana</span>
      </div>
    ),
  },
];
