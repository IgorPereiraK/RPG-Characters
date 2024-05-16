import { Ability } from "../types/Ability"

export const passivasVlad: Ability[] = [
    {
        name: 'transformação',
        image: './image/morcegoV.png',
        description: `Vlad pode se transformar em Morcego por tempo ilimitado, mas 
        nessa forma Vlad fica com 1 de hp. Vlad também pode se transformar em Névoa e 
        pode percorrer cerca de 100 metros nessa formar.`
    },
    {
        name: 'Garras e Mordida',
        image: './image/garrasV.png',
        description: `Como vampiro, você tem um conjunto de garras para armas naturais, 
        que você pode usar para fazer ataques desarmados. Se você acertar com eles, você 
        causa um dano de corte igual a 2d8+const. Como vampiro, você tem um par de presas 
        para armas naturais, que você pode usar para fazer ataques desarmados. Se você acertar com eles, 
        você causa dano perfurante igual a 2d8+const.`
    },
    {
        name: 'Blood Armor',
        image: './image/armorV.png',
        description: `Ao controlar seu próprio sangue, você forma uma armadura feita inteiramente de sangue. Esta
         armadura é considerada leve e você ganha +2 de CA .O lançador deve receber 1d6 de dano para formar a armadura.`
    },
    {
        name: 'Combate Hemocinético',
        image: './image/VladimirP.png',
        description: `Você é capaz de usar seu próprio sangue em combate, aprimorando suas habilidades e criando 
        armas que só você pode usar. As armas que você faz podem tomar a forma e estatísticas de qualquer arma. O lançador 
        deve receber 1d6 de dano para formar a arma ou usar 1 unidade de sangue. Manifestar uma arma de sangue é considerado 
        uma ação bônus da mesma forma que você desembainha uma arma. A arma mantém o seu tempo enquanto você permanece consciente 
        e mantém a concentração.`
    },
    {
        name: 'Sangue de Ferro',
        image: './image/ferroV.png',
        description: `Vlad ganha resistência a dano. Ou seja Vlad pode jogar 1d12+const e Vlad ganha imunidade a condição envenenado 
        de grande parte dos venenos. Essa passiva carrega a cada 3 rodadas.`
    },
    {
        name: 'Foco de Força',
        image: './image/forçaV.png',
        description: `Com o foco de força segunda etapa ativado você ganha resistência a ataques físicos evitando 1d6 de dano físico 
        que recebeu. E tem uma habilidade passiva que cancela o dado de um erro crítico.`
    },
]

export const habilidadesVlad: Ability[] = [
    {
        name: 'Transfusão Sanguínea',
        image: './image/VladimirQ.png',
        description: `Vladimir rouba vida do inimigo causando 2d8+const de dano e cura metade do dano que causou no inimigo, na 
        terceira vez que ele acerta o Transfusão Sanguínea ele curar por completo do dano que ele deu.`,
        mana: '6-Mana'
    },
    {
        name: 'Reflexo Sanquíneo',
        image: './image/ReflexoV.png',
        description: `Quando Vlad conseguir uma jogada de ataque com uma arma de sangue o sangue ficará presente na criatura. Com 
        isso conforme todo golpe que o Vlad leva ele ganha um stack de 1d6 de dano para devolver parte do dano que ele tomou. Vlad, para 
        acertar o reflexo sanguíneo precisar jogar 1d20+const.`,
        mana: '6-Mana',
        table:  (
                <table className="table-auto mt-4 border-red-800">
                    <thead>
                    <tr className="bg-yellow-100 text-gray-900"> 
                        <th className="px-4 border border-red-400">Dano a Você</th>
                        <th className="px-4 border border-red-400">Dano ao inimigo</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="bg-yellow-200 text-gray-900">
                        <td className="border px-10 border-red-400">1d</td>
                        <td className="border px-10 border-red-400">1d6</td>
                    </tr>
                    <tr className="bg-yellow-100 text-gray-900">
                        <td className="border px-10 border-red-400">2d</td>
                        <td className="border px-10 border-red-400">2d6</td>
                    </tr>
                    <tr className="bg-yellow-200 text-gray-900">
                        <td className="border px-10 border-red-400">3d</td>
                        <td className="border px-10 border-red-400">3d6</td>
                    </tr>
                    <tr className="bg-yellow-100 text-gray-900">
                        <td className="border px-10 border-red-400">4d</td>
                        <td className="border px-10 border-red-400">4d6</td>
                    </tr>
                    <tr className="bg-yellow-200 text-gray-900">
                        <td className="border px-10 border-red-400">5d</td>
                        <td className="border px-10 border-red-400">5d6</td>
                    </tr>
                    </tbody>
                </table>
            ),
    },
    {
        name: 'Marca de Sangue',
        image: './image/MarcaV2.png',
        description: `Todos que tem minha marca ganham vantagem e seu modificador de Proficiência é adicionado em teste de Força, 
        Destreza, Constituição e Ataque extra.`,
        mana: '4-Mana'
    },
    {
        name: 'Agulhas de Sangue',
        image: './image/agulhasV.png',
        description: `Vlad ao controlar o sangue de um cadáver são feitas uma quantidade de agulhas de sangue, cada cadáver gerar uma 
        Agulha de Sangue que dar 1d8 de dano, uma criatura sangrando levará 1d8 para cada modificador de constituição (formando agulhas). Se o 
        alvo tiver a marca do Vlad as agulhas irão seguir a marca então não é necessário jogar dado de ataque, se não tiver a marca aí sim precisa jogar 1d20+const.`,
        mana: '8-Mana'
    },
    {
        name: 'Pinguins Imperiais',
        image: './image/pinguimV.png',
        description: `Caçadores de vítimas rápidas com suas táticas e contornam os sábios com sua fúria e desordem, o caos na tática, o pinguim império 
        é a combinação perfeita de habilidades criada por Moisés e readaptada por Gimper. O adversário dará (o multiplicador de destreza e sabedoria 
        dividida por dois)d6, o adversário terá de jogar uma constituição para não ficar preso pelos pinguins.`,
        mana: '6-Mana'
    },
    {
        name: 'Cães Infernais',
        image: './image/caesVL.png',
        description: `Vlad pode invocar Blood Minios. A quantidade que ele pode invocar e de acordo com seu modificador de constituição.
        Essa é a ultimate de Vlad, a ultimate precisar se carregada e para ser carregada Vlad precisa ter tomado 5 golpes de algum adversário.`,
        table: (
            <div className="mt-6">
              <img src="/image/minios.PNG" alt="Cães Infernais status" />
            </div>
          ),
    },
]

export const passivasAlexia: Ability[] = [
    {
        name: 'transformação',
        image: './image/morcegoV.png',
        description: `Alexia pode se transformar em Morcego por tempo ilimitado, mas nessa forma Alexia fica com 
        1 de hp. Alexia também pode se transformar em Névoa e pode percorrer cerca de 100 metros nessa formar.`
    },
    {
        name: 'Garras e Mordida',
        image: './image/mordidaA.png',
        description: `Como vampiro, você tem um conjunto de garras para armas naturais, 
        que você pode usar para fazer ataques desarmados. Se você acertar com eles, você 
        causa um dano de corte igual a 2d8+const. Como vampiro, você tem um par de presas 
        para armas naturais, que você pode usar para fazer ataques desarmados. Se você acertar com eles, 
        você causa dano perfurante igual a 2d8+const.`
    },
    {
        name: 'Olhar da Coruja',
        image: './image/olhoA.png',
        description: `Ao ativar essa habilidade Você gasta 4 de mana por rodada com ela ativa, ela anula críticos inimigos, aumenta 2 em bônus para o acerto.`
    },
    {
        name: 'Drone Auxiliar',
        image: './image/droneA.png',
        description: `Alexia ativa um drone que implica 1d8 bônus de dano em cada acerto dela, o robô gasta 1 carga elétrica por rodada.`
    },
    {
        name: 'Tiro Perfurante',
        image: './image/perfuranteA.png',
        description: `No terceiro ataque de Alexia a armadura do inimigo é desconsiderada, se o inimigo não ter armadura, ela ganha um dado de dano a mais.`
    },
]

export const habilidadesAlexia: Ability[] = [
    {
        name: 'Trincamento sobre Existente',
        image: './image/zhonyaA.webp',
        description: `Ela usa o Zonhyas, e bloqueia qualquer dano, mas não ataca na próxima rodada e só pode usar essa skill depois de 3 rodadas.`,
        mana: '6-Mana'
    },
    {
        name: 'Corvos Fabulosos',
        image: './image/corvosA.png',
        description: `Ela invoca 5 corvos que podem causar 1d10 cada um, seu diferencial e o fato que caso o oponente 
        tenha invocado uma criatura com menos 70hp, os corvos selam a criatura, e fazem ela desaparecer junto com eles.`,
        mana: '5-Mana'
    },
    {
        name: 'Marca de Sangue',
        image: './image/MarcaV2.png',
        description: `Todos que tem minha marca ganham vantagem e seu modificador de Proficiência é adicionado em teste de Força, 
        Destreza, Constituição e Ataque extra.`,
        mana: '4-Mana'
    },
    {
        name: 'Repulsão Elétrica',
        image: './image/eletricaA.png',
        description: `Uma explosão de 2d10+int em todos a sua volta, e paralisa inimigos que estão em contato físico com ela, agora ela também pode jogar a pokebola.`,
        mana: '2-Cargas'
    },
    {
        name: 'Adagas Elétrica',
        image: './image/adagasA.png',
        description: `Alexia joga adagas que causam 4d12+int se bater a CA do oponente mais 3 (exemplo, se ela tirar 18 contra um rival de 15 de CA), 3d12+int em caso de acerto normal.`,
        mana: '3-Cargas'
    },
    {
        name: 'Anjo Vampírico',
        image: './image/anjoA.png',
        description: `Tomada por luz e o vermelho do sangue, duas asas de sangue surgem, seus atributos sobem 2 diretamente no dado cada, sua vida dobra 
        seu auto ataque e habilidades recebem um dado de dano a mais, a transformação dura 4 turnos.`
    },
    {
        name: 'Míssil Tecnoarcano',
        image: './image/missilA.png',
        description: `Míssil TecnoArcano de poeira de runa global: 8d12 em todos que estão próximos do raio da explosão 
        (inimigos com ⅕ da vida são executados, sem necessidade de dado).`
    },
]

export const passivasRiven: Ability[] = [
    {
        name: 'Fotossíntese',
        image: './image/fotossinteseR.png',
        description: `Não e necessário que o personagem coma, ao lutar no sol/lua cheia, ela recupera 1d2 por rodada, em sol intenso 1d4.`
    },
    {
        name: 'Adaptação',
        image: './image/adaptacaoR.png',
        description: `1 seg ou 3, e o tempo que levará para que ela se adapte ao ambiente, seja o frio abaixo de zero ou até mesmo o espaço.`
    },
    {
        name: 'Evolução',
        image: './image/evolucaoR.png',
        description: `Ao observar animais ela pode além de aprender sua língua, adquirir uma habilidade corporal deles(exemplo: alfato de lobo, asa de águia, veneno de escorpião).`
    },
    {
        name: 'Sistema Imune Aperfeiçoado',
        image: './image/imuneR.png',
        description: `Imune a qualquer doença, veneno e infecção, o veneno só causara efeito se for mágico, mas será neutralizado em 1d4 pq 
        seu sistema irá adaptar e burlar o vírus.`
    },
    {
        name: 'Conversão Química de Elementos',
        image: './image/conversaoR.png',
        description: `Ao comer algo ela pode transformar em outra coisa, exemplo, se ela comer um pedaço de terra ela pode excretar um alimento para seus aliados.`
    },
    {
        name: '300 de QI',
        image: './image/qiR.png',
        description: `Descobrir planos, passivas e habilidades ocultas, seja de armários ou soldados. Capacidade de resolver qualquer raciocínio lógico.`
    },
    {
        name: 'Onipresença',
        image: './image/onipresencaR.png',
        description: `A cada 3 rodadas Riven ganha uma ação extra.`
    },
]

export const habilidadesRiven: Ability[] = [
    {
        name: 'Hemomancia',
        image: './image/MarcaV2.png',
        description: `Riven aprendeu todas as habilidades de hemomancia que Vlad sabe usar:`,
        table: (
            <div className="ml-4 mt-4">
                <div>
                    <h3 className="uppercase text-base font-semibold text-gray-100">Transformação</h3>
                    <p>Riven pode se transformar em Morcego por tempo ilimitado, mas nessa forma Riven fica com 1 de hp. 
                        Riven também pode se transformar em Névoa e pode percorrer cerca de 100 metros nessa formar.</p>
                </div>
                <div className="mt-4">
                    <h3 className="uppercase text-base font-semibold text-gray-100">Garras e Mordida</h3>
                    <p>Como vampiro, você tem um conjunto de garras para armas naturais, que você pode usar para fazer ataques desarmados. 
                        Se você acertar com eles, você causa um dano de corte igual a 2d8+const. Como vampiro, você tem um par de presas 
                        para armas naturais, que você pode usar para fazer ataques desarmados. Se você acertar com eles, você causa dano perfurante igual a 2d8+const.</p>
                </div>
                <div className="mt-4">
                    <h3 className="uppercase text-base font-semibold text-gray-100">Blood Armor</h3>
                    <p>Ao controlar seu próprio sangue, você forma uma armadura feita inteiramente de sangue. Esta armadura é considerada leve e 
                        você ganha +2 de CA .O lançador deve receber 1d6 de dano para formar a armadura.</p>
                </div>
                <div className="mt-4">
                    <h3 className="uppercase text-base font-semibold text-gray-100">Combate Hemocinético</h3>
                    <p>Você é capaz de usar seu próprio sangue em combate, aprimorando suas habilidades e criando armas que só você pode usar. 
                        As armas que você faz podem tomar a forma e estatísticas de qualquer arma. O lançador deve receber 1d6 de dano para formar 
                        a arma ou usar 1 unidade de sangue. Manifestar uma arma de sangue é considerado uma ação bônus da mesma forma que você desembainha 
                        uma arma. A arma mantém o seu tempo enquanto você permanece consciente e mantém a concentração.</p>
                </div>
                <div className="mt-4">
                    <h3 className="uppercase text-base font-semibold text-gray-100">Foco de Força</h3>
                    <p>Com o foco de força segunda etapa ativado você ganha resistência a ataques mágico evitando 1d6 de dano mágico que recebeu. 
                        E tem uma habilidade passiva que cancela o dado de de um erro crítico.</p>
                </div>
                <div className="mt-4">
                    <h3 className="uppercase text-base font-semibold text-gray-100">Transfusão Sanguínea</h3>
                    <p>Riven rouba vida do inimigo causando 2d8 de dano e cura metade do dano que causei no inimigo.</p>
                    <span className="text-blue-600">6-Mana</span>
                </div>
                <div className="mt-4">
                    <h3 className="uppercase text-base font-semibold text-gray-100">Marca de Sangue</h3>
                    <p>Todos que tem minha marca ganham vantagem e seu modificador de Proficiência é adicionado em teste de Força, Destreza, Constituição e Ataque extra.</p>
                    <span className="text-blue-600">4-Mana</span>
                </div>
                <div className="mt-4">
                    <h3 className="uppercase text-base font-semibold text-gray-100">Agulhas de Sangue</h3>
                    <p>Riven ao controlar o sangue de um cadáver são feitas uma quantidade de agulhas de sangue, cada cadáver gerar uma Agulha de Sangue que dar 
                        1d8 de dano, uma criatura sangrando levará 1d8 para cada modificador de constituição (formando agulhas). Se o alvo tiver a marca do Riven 
                        as agulhas irão seguir a marca então não é necessário jogar dado de ataque, se não tiver a marca aí sim precisa jogar 1d20+const.</p>
                    <span className="text-blue-600">8-Mana</span>
                </div>
                <div className="mt-4">
                    <h3 className="uppercase text-base font-semibold text-gray-100">Cães Infernais</h3>
                    <p>Riven pode invocar Blood Minios. A quantidade que ele pode invocar e de acordo com seu modificador de constituição.
                        Essa é a ultimate de Riven, a ultimate precisar se carregada e para ser carregada Riven precisa ter tomado 5 golpes de algum adversário.</p>
                    <div className="mt-6">
                        <img src="/image/minios.PNG" alt="Cães Infernais status" />
                    </div>
                </div>
            </div>
            
        )
    },
    {
        name: 'Fibromancia',
        image: './image/fibromanciaR.png',
        description: ``,
        table: (
            <div className="ml-4">
                <div>
                    <h3 className="uppercase text-base font-semibold text-gray-100">Músculo Tonificar</h3>
                    <p>A resistência fibrosa faz o com que o músculo reduza as habilidades inimigas em 1d8, <span className="text-blue-600">4-Mana</span> por rodada ativa</p>
                </div>
                <div className="mt-4">
                    <h3 className="uppercase text-base font-semibold text-gray-100">Músculo Ampliar</h3>
                    <p>Todo dano desferidos contra os adversários terá a força somada e 1d8 a mais, rodada ativa <span className="text-blue-600">4-Mana</span></p>
                </div>
            </div>
            
        )
    },
    {
        name: 'Erupção Plasmática',
        image: './image/cloneR.png',
        description: `Todo sangue e mandado para fora, criando um clone que na rodada seguinte poderá atacar também, inclusive com habilidades e dano, 2 rodadas de duração.`,
        mana: '7-Mana'
    },
    {
        name: 'Trovão de Contração',
        image: './image/trovaoR.png',
        description: `Um impulso pula de seu cérebro energizando todo seu corpo, riven desfere 2d16, o adversário terá de tacar um constituição, se 
        falhar estará com medo é com apenas metade do dano na próxima rodada.`,
        mana: '6-Mana'
    },
    {
        name: 'Confusão',
        image: './image/confusaoR.png',
        description: `Feixe psíquicos mandados pelo ar confundem os adversários por 2 rodadas onde ele terá que fazer um teste de constituição para manter o controle.`,
        mana: '5-Mana'
    },
    {
        name: 'Psy Bean',
        image: './image/psybeanR.png',
        description: `Um feixe psíquico é lançado 4d8+int, na próxima rodada o adversário terá -2 de acerto.`,
        mana: '5-Mana'
    },
    {
        name: 'Demon Back',
        image: './image/DemonR.png',
        description: `Sua força e somada a sua Ca durante 4 rodadas Todo seu dano físico e dobrado, e cura 1d8 por rodada.`
    },
]