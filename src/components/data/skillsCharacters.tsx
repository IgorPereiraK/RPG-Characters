import { Skills } from "../types/Skills";


export const skillsVlad: Skills[] = [
    {
        name: 'Sangue de Ferro',
        image: './image/ferroV.png',
        magic: 'Passiva de Proteção',
        description: (
            <div>
                <p>Vlad ganha resistência a dano. Ou seja Vlad pode jogar <span className="text-yellow-300">1d12+const</span> e Vlad 
                ganha <span className="text-yellow-300">imunidade a condição envenenado</span> de grande parte dos venenos.</p>
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
        name: 'Foco de Força',
        image: './image/forçaV.png',
        magic: 'Passiva de Proteção',
        description: (
            <div>
                <p>Com o foco de força segunda etapa ativado você ganha resistência a <span className="text-yellow-300">ataques físicos </span> 
                evitando <span className="text-yellow-300">1d6 de dano físico</span> que recebeu. E tem uma habilidade passiva que cancela o <span className="text-yellow-300">dado de um erro crítico</span>.</p>
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
        name: 'Regeneração',
        image: './image/regeneracaoTalento.png',
        magic: 'Passiva de Gigante',
        description: (
            <div>
                <p>Por causa do talento de um gigante, Vlad sempre que nenhum dos seus <span className="text-yellow-300">inimigos focarem</span> ele em uma rodada Vlad <span className="text-yellow-300">recuperar 1d4 de vida</span>.</p>
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
        name: 'Gladiador Imortal',
        image: './image/duelistaVlad.png',
        magic: 'Passiva de Duelista',
        description: (
            <div>
                <p>Por causa de seu talento de duelista em batalhas Vlad <span className="text-yellow-300">curar 1d6 por golpe acertado</span> no seus adversário</p>
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
        name: 'Blood Armor',
        image: './image/armorV.png',
        magic: 'Magia de Hemomancia',
        description: (
            <div>
                <p>Ao controlar seu próprio sangue, você forma uma armadura feita inteiramente de sangue. Esta armadura é considerada leve e você ganha <span className="text-yellow-300">+2 de CA</span> .
                    O lançador deve receber <span className="text-yellow-300">1d6 de dano</span> para formar a armadura.</p>
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
        name: 'Blood Shield',
        image: './image/blood-shield.png',
        magic: 'Magia de Hemomancia',
        description: (
            <div>
                <p>Ao controlar seu próprio sangue, você forma uma escudo feito inteiramente de sangue. Com esse escudo você ganha <span className="text-yellow-300">+2 de CA</span>.
                    O lançador deve receber <span className="text-yellow-300">1d6 de dano</span> para formar o escudo.</p>
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
        name: 'Transfusão Sanguínea',
        image: './image/VladimirQ.png',
        magic: 'Magia de Hemomancia',
        description: (
            <div>
                <p>Vlad rouba vida do inimigo causando <span className="text-yellow-300">2d8 de dano</span> e <span className="text-yellow-300">cura metade do dano</span> que causou no inimigo, na 
                <span className="text-yellow-300"> terceira vez</span> que ele acerta o Transfusão Sanguínea ele <span className="text-yellow-300">curar por completo</span> do dano que ele deu.</p>
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
                <span>6-Mana</span>
            </div>
        ),
    },
    {
        name: 'Reflexo Sanquíneo',
        image: './image/ReflexoV.png',
        magic: 'Magia de Hemomancia',
        description: (
            <div>
                <p>Quando Vlad conseguir uma jogada de ataque com uma arma de sangue o sangue ficará presente na criatura. Com 
                isso conforme <span className="text-yellow-300">todo golpe que o Vlad leva ele ganha um stack de 1d6 de dano</span> para devolver parte do dano que ele tomou. Vlad, para 
                acertar o reflexo sanguíneo precisar jogar 1d20+const.</p>
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
                <span>6-Mana</span>
            </div>
        ),
    },
    {
        name: 'Agulhas de Sangue',
        image: './image/agulhasV.png',
        magic: 'Magia de Hemomancia',
        description: (
            <div>
                <p>Vlad ao controlar o sangue de um cadáver são feitas uma quantidade de agulhas de sangue, <span className="text-yellow-300">cada cadáver gerar uma 
                Agulha de Sangue que dar 1d8 de dano</span>, uma <span className="text-yellow-300">criatura sangrando levará 1d8 para cada modificador de constituição</span> (formando agulhas). Se o 
                alvo tiver a marca do Vlad as agulhas irão seguir a marca então não é necessário jogar dado de ataque, se não tiver a marca aí sim precisa jogar 1d20+const.</p>
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
                <span>8-Mana</span>
            </div>
        ),
    },
    {
        name: 'Pinguins Imperiais',
        image: './image/pinguimV.png',
        magic: 'Magia de Evocação',
        description: (
            <div>
                <p>Caçadores de vítimas rápidas com suas táticas e contornam os sábios com sua fúria e desordem, o caos na tática, o pinguim império 
        é a combinação perfeita de habilidades criada por Moisés e readaptada por Gimper. O adversário dará <span className="text-yellow-300">(o multiplicador de destreza e sabedoria 
        dividida por dois)d6</span>, o adversário terá de jogar um <span className="text-yellow-300">teste de constituição</span> para não ficar preso pelos pinguins.</p>
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
                <span>6-Mana</span>
            </div>
        ),
    },
    {
        name: 'Cães Infernais',
        image: './image/caesVL.png',
        magic: 'Magia de Evocação',
        description: (
            <div>
                <p>Vlad pode invocar <a className="text-yellow-300 underline underline-offset-4" href="/image/minios.PNG" target="_blank">Blood Minios</a>. A quantidade que ele pode invocar e de acordo com seu modificador de constituição.
                Essa é a ultimate de Vlad, a ultimate precisar se carregada e para ser carregada Vlad precisa ter tomado <span className="text-yellow-300">5 golpes</span> de algum adversário.</p>
            </div>
        ),
        type: (
            <div>
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                <span>Ação</span>
            </div>
        ),
    },
]

export const skillsAlexia: Skills[] = [
    {
        name: 'Tiro Perfurante',
        image: './image/perfuranteA.png',
        magic: 'Passiva de Precisão',
        description: (
            <div>
                <p>No <span className="text-yellow-300">terceiro ataque</span> de Alexia a <span className="text-yellow-300">armadura do inimigo 
                é desconsiderada</span>, se o inimigo não ter armadura, ela ganha <span className="text-yellow-300">um dado de dano</span> a mais.</p>
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
        name: 'Olhar da Coruja',
        image: './image/olhoA.png',
        magic: 'Magia de Transmutação',
        description: (
            <div>
                <p>Ao ativar essa habilidade Você gasta <span className="text-blue-500">4 de mana por rodada</span> com ela ativa, ela anula críticos 
                inimigos, e <span className="text-yellow-300">aumenta 2 em bônus</span> para o ataque.</p>
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
        name: 'Drone Auxiliar',
        image: './image/droneA.png',
        magic: 'Ação de Armamento',
        description: (
            <div>
                <p>Alexia ativa um drone que implica <span className="text-yellow-300">1d8 bônus de dano</span> em cada acerto dela, o robô 
                gasta <span className="text-yellow-300">1 carga elétrica</span> por rodada.</p>
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
                <span className="inline-block w-3 h-3 bg-yellow-300 rounded-full mr-1"></span>
                <span>1-Carga Elétrica</span>
            </div>
        ),
    },
    {
        name: 'Trincamento sobre Existente',
        image: './image/zhonyaA.webp',
        magic: 'Magia de Proteção',
        description: (
            <div>
                <p>Ela usa o Zonhyas, e <span className="text-yellow-300">bloqueia qualquer dano</span>, mas não ataca na próxima rodada e só pode 
                usar essa skill depois de 3 rodadas.</p>
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
                <span>6-Mana</span>
            </div>
        ),
    },
    {
        name: 'Corvos Fabulosos',
        image: './image/corvosA.png',
        magic: 'Magia de Evocação',
        description: (
            <div>
                <p>Ela <span className="text-yellow-300">invoca 5 corvos</span> que podem causar <span className="text-yellow-300">1d10 cada um</span>, seu diferencial e o fato que caso o oponente 
                tenha invocado uma criatura com menos 70hp, os <span className="text-yellow-300">corvos selam a criatura</span>, e fazem ela desaparecer junto com eles.</p>
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
    {
        name: 'Repulsão Elétrica',
        image: './image/eletricaA.png',
        magic: 'Ação de Armamento',
        description: (
            <div>
                <p>Uma explosão de <span className="text-yellow-300">2d10+int em todos a sua volta</span>, e <span className="text-yellow-300">paralisa inimigos </span> 
                que estão em contato físico com ela, agora ela também pode <span className="text-yellow-300">jogar a pokebola</span>.</p>
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
                <span className="inline-block w-3 h-3 bg-yellow-300 rounded-full mr-1"></span>
                <span>2-Carga Elétrica</span>
            </div>
        ),
    },
    {
        name: 'Adagas Elétrica',
        image: './image/adagasA.png',
        magic: 'Ação de Armamento',
        description: (
            <div>
                <p>Alexia joga adagas que causam <span className="text-yellow-300">4d12+int se bater a CA do oponente mais 3 </span> 
                (exemplo, se ela tirar 18 contra um rival de 15 de CA), <span className="text-yellow-300">3d12 + int em caso de acerto normal</span>.</p>
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
                <span className="inline-block w-3 h-3 bg-yellow-300 rounded-full mr-1"></span>
                <span>3-Carga Elétrica</span>
            </div>
        ),
    },
    {
        name: 'Anjo Vampírico',
        image: './image/anjoA.png',
        magic: 'Magia de Transformação',
        description: (
            <div>
                <p>Tomada por luz e o vermelho do sangue, duas asas de sangue surgem, seus <span className="text-yellow-300">atributos sobem 2 diretamente no dado cada</span>, sua <span className="text-yellow-300">vida dobra </span>
                seu <span className="text-yellow-300">auto ataque e habilidades recebem um dado de dano a mais</span>, a transformação dura <span className="text-yellow-300">4 turnos</span>.</p>
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
        name: 'Míssil Tecnoarcano',
        image: './image/missilA.png',
        magic: 'Magia de Evocação',
        description: (
            <div>
                <p>Míssil TecnoArcano de poeira de runa global: <span className="text-yellow-300">8d12 em todos que estão próximos</span> do raio da explosão 
                (inimigos com <span className="text-yellow-300">1/5 da vida são executados</span>, sem necessidade de dado).</p>
            </div>
        ),
        type: (
            <div>
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                <span>Ação</span>
            </div>
        ),
    },
]

export const skillsRiven: Skills[] = [  
    {
        name: 'Fotossíntese',
        image: './image/fotossinteseR.png',
        magic: 'Passiva de Natureza',
        description: (
            <div>
                <p>Não e necessário que o personagem coma, ao lutar no <span className="text-yellow-300">sol/lua cheia</span>, ela <span className="text-yellow-300">recupera 
                1d2 de vida por rodada</span>, em <span className="text-yellow-300">sol intenso 1d4</span>.</p>
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
        name: 'Onipresença',
        image: './image/onipresencaR.png',
        magic: 'Passiva de Transmutação',
        description: (
            <div>
                <p>A cada <span className="text-yellow-300">3 rodadas</span> Riven ganha uma <span className="text-yellow-300">ação extra</span>.</p>
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
        name: 'Foco de Força',
        image: './image/forçaV.png',
        magic: 'Passiva de Proteção',
        description: (
            <div>
                <p>Com o foco de força segunda etapa ativado você ganha resistência a <span className="text-yellow-300">ataques físicos </span> 
                evitando <span className="text-yellow-300">1d6 de dano mágico</span> que recebeu. E tem uma habilidade passiva que cancela o <span className="text-yellow-300">dado de um erro crítico</span>.</p>
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
        name: 'Blood Armor R',
        image: './image/armorV.png',
        magic: 'Magia de Hemomancia',
        description: (
            <div>
                <p>Ao controlar seu próprio sangue, você forma uma armadura feita inteiramente de sangue. Esta armadura é considerada leve e você ganha <span className="text-yellow-300">+2 de CA</span> .
                    O lançador deve receber <span className="text-yellow-300">1d6 de dano</span> para formar a armadura.</p>
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
        name: 'Transfusão Sanguínea',
        image: './image/VladimirQ.png',
        magic: 'Magia de Hemomancia',
        description: (
            <div>
                <p>Riven rouba vida do inimigo causando <span className="text-yellow-300">2d8 de dano</span> e <span className="text-yellow-300">cura metade do dano</span> que causou no inimigo, na 
                <span className="text-yellow-300"> terceira vez</span> que ele acerta o Transfusão Sanguínea ele <span className="text-yellow-300">curar por completo</span> do dano que ele deu.</p>
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
                <span>6-Mana</span>
            </div>
        ),
    }, 
    {
        name: 'Agulhas de Sangue',
        image: './image/agulhasV.png',
        magic: 'Magia de Hemomancia',
        description: (
            <div>
                <p>Riven ao controlar o sangue de um cadáver são feitas uma quantidade de agulhas de sangue, <span className="text-yellow-300">cada cadáver gerar uma 
                Agulha de Sangue que dar 1d8 de dano</span>, uma <span className="text-yellow-300">criatura sangrando levará 1d8 para cada modificador de constituição</span> (formando agulhas). Se o 
                alvo tiver a marca do Riven as agulhas irão seguir a marca então não é necessário jogar dado de ataque, se não tiver a marca aí sim precisa jogar 1d20+const.</p>
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
                <span>8-Mana</span>
            </div>
        ),
    },
    {
        name: 'Músculo Tonificar ou Ampliar',
        image: './image/fibromanciaR.png',
        magic: 'Magia de Fibromancia',
        description: (
            <div>
                <p><span className="text-yellow-300">Tonificar:</span> A resistência fibrosa faz o com que o músculo <span className="text-yellow-300">reduza as habilidades inimigas em 1d8</span>, <span className="text-blue-500">4-Mana por rodada ativa</span>.
                    <span className="text-yellow-300"> Ampliar:</span> Todo dano desferidos contra os adversários terá a <span className="text-yellow-300">força somada e 1d8 a mais</span>, <span className="text-blue-500">4-Mana rodada ativa</span>.
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
        name: 'Erupção Plasmática',
        image: './image/cloneR.png',
        magic: 'Magia de Fibromancia',
        description: (
            <div>
                <p>Todo sangue e mandado para fora, <span className="text-yellow-300">criando um clone</span> que na rodada seguinte poderá atacar também, inclusive 
                com <span className="text-yellow-300">habilidades e dano</span>, duração de <span className="text-yellow-300">2 rodadas</span>.</p>
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
                <span>7-Mana</span>
            </div>
        ),
    },
    {
        name: 'Trovão de Contração',
        image: './image/trovaoR.png',
        magic: 'Magia de Neuromancia',
        description: (
            <div>
                <p>Um impulso pula de seu cérebro energizando todo seu corpo, riven desfere <span className="text-yellow-300">2d16 de dano</span>, o adversário terá de fazer um <span className="text-yellow-300">teste de constituição</span>, se falhar 
                    estará <span className="text-yellow-300">com medo é com apenas metade do dano na próxima rodada</span>.</p>
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
                <span>6-Mana</span>
            </div>
        ),
    },
    {
        name: 'Confusão',
        image: './image/confusaoR.png',
        magic: 'Magia de Neuromancia',
        description: (
            <div>
                <p>Feixe psíquicos mandados pelo ar <span className="text-yellow-300">confundem os adversários por 2 rodadas</span> onde ele terá que 
                fazer um <span className="text-yellow-300">teste de constituição</span> para manter o controle.</p>
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
    {
        name: 'Psy Bean',
        image: './image/psybeanR.png',
        magic: 'Magia de Neuromancia',
        description: (
            <div>
                <p>Um feixe psíquico é lançado <span className="text-yellow-300">4d8+int de dano</span>, na próxima rodada o adversário terá <span className="text-yellow-300">-2 de acerto</span>.</p>
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
    {
        name: 'Cães Infernais R',
        image: './image/caesR.png',
        magic: 'Magia de Evocação',
        description: (
            <div>
                <p>Riven pode invocar <a className="text-yellow-300 underline underline-offset-4" href="/image/minios.PNG" target="_blank">Blood Minios</a>. A quantidade que ele pode invocar e de acordo com seu modificador de constituição.
                Essa é a ultimate de Riven, a ultimate precisar se carregada e para ser carregada Riven precisa ter tomado <span className="text-yellow-300">5 golpes</span> de algum adversário.</p>
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
        name: 'Demon Back',
        image: './image/DemonR.png',
        magic: 'Magia de Transmutação',
        description: (
            <div>
                <p>Sua <span className="text-yellow-300">força e somada a sua Ca</span> durante <span className="text-yellow-300">4 rodadas</span>,  
                todo seu <span className="text-yellow-300">dano físico e dobrado</span>, e <span className="text-yellow-300">cura 1d8 por rodada</span>.</p>
            </div>
        ),
        type: (
            <div>
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                <span>Ação</span>
            </div>
        ),
    },
]

