// =========================================================
// 🌱 EXPLORADORES BOTÂNICOS
Lógica do Jogo
// =========================================================
// --------
-ESTADO GLOBAL ----------
const estado = {
pontos: 0,
vidas: 3,
fase: 1,
missaoAtual: 0,
missoesCompletas: 0,
posicao: { x: 50, y: 100 },
velocidade: 12,
objetoProximo: null,
emMovimento: false
};
// --------
-DADOS DAS FASES E MISSÕES ----------
const fases = {
1: {
nome: 'Fácil',
classe: 'fase-1',
dica: '💡 Explore o jardim até encontrar o objeto brilhante!',
missoes: [
{
icone: '🌱',
titulo: 'Missão 1: A Raiz Mágica',
posicao: { x: 300, y: 200 },
pergunta: 'Qual é a principal função da RAIZ de uma planta?',
alternativas: [
'Produzir flores coloridas',
'Absorver água e nutrientes do solo',
'Realizar a fotossíntese',
'Atrair insetos polinizadores'
],
correta: 1,
explicacao: '✅ Isso mesmo! A raiz fixa a planta no solo e absorve água e sais minerais.'
},
{
icone: '🌿',
titulo: 'Missão 2: O Caule Viajante',
posicao: { x: 550, y: 300 },
pergunta: 'Qual é a função principal do CAULE?',
alternativas: [
'Realizar a fotossíntese',
'Transportar água e nutrientes entre raiz e folhas',
'Produzir sementes',
'Absorver luz solar'
],
correta: 1,
explicacao: '✅ Exato! O caule é como um "cano" que transporta água e nutrientes pela planta.'
},
{
icone: '☀️',
titulo: 'Missão 3: A Fábrica de Alimento',
posicao: { x: 200, y: 350 },
pergunta: 'Na FOTOSSÍNTESE, qual gás a planta ABSORVE do ar?',
alternativas: [
'Oxigênio (O₂)',
'Nitrogênio (N₂)',
'Gás Carbônico (CO₂)',
'Hidrogênio (H₂)'
],
correta: 2,
explicacao: '✅ Muito bem! A planta absorve CO₂ e libera O₂ durante a fotossíntese.'
}
]
},
2: {
nome: 'Média',
classe: 'fase-2',
dica: '💡 A floresta é densa! Encontre as amostras escondidas entre as árvores.',
missoes: [
{
icone: '🥕',
titulo: 'Missão 1: Classificando Raízes',
posicao: { x: 150, y: 250 },
pergunta: 'A raiz da CENOURA, que armazena nutrientes, é do tipo:',
alternativas: [
'Pivotante',
'Fasciculada',
'Tuberosa',
'Aérea'
],
correta: 2,
explicacao: '✅ Isso! A raiz tuberosa armazena reservas, como na cenoura e na batata-doce.'
},
{
icone: '🎋',
titulo: 'Missão 2: Tipos de Caule',
posicao: { x: 600, y: 150 },
pergunta: 'O caule do BAMBU, oco e com nós, é classificado como:',
alternativas: [
'Tronco',
'Colmo',
'Rizoma',
'Estipe'
],
correta: 1,
explicacao: '✅ Correto! O colmo é o caule típico de bambus, cana-de-açúcar e milho.'
},
{
icone: '🌿',
titulo: 'Missão 3: Grupos Vegetais',
posicao: { x: 400, y: 380 },
pergunta: 'As plantas que NÃO possuem vasos condutores (xilema e floema) são chamadas de:',
alternativas: [
'Angiospermas',
'Gimnospermas',
'Pteridófitas',
'Briófitas'
],
correta: 3,
explicacao: '✅ Muito bem! As briófitas (como musgos) são avasculares e pequenas.'
}
]
},
3: {
nome: 'Difícil',
classe: 'fase-3',
dica: '🔬 O laboratório é escuro! Resolva os mistérios científicos para avançar.',
missoes: [
{
icone: '🧪',
titulo: 'Missão 1: A Equação da Vida',
posicao: { x: 250, y: 180 },
pergunta: 'Qual é a equação CORRETA da fotossíntese?',
alternativas: [
'Glicose + O₂ → CO₂ + H₂O + Luz',
'CO₂ + H₂O + Luz → Glicose + O₂',
'O₂ + H₂O → CO₂ + Glicose',
'CO₂ + Glicose → O₂ + H₂O'
],
correta: 1,
explicacao: '✅ Perfeito! A planta usa CO₂, água e luz para produzir glicose e liberar O₂.'
},
{
icone: '🐝',
titulo: 'Missão 2: Agentes Polinizadores',
posicao: { x: 620, y: 320 },
pergunta: 'Qual destes NÃO é um agente polinizador natural?',
alternativas: [
'Abelhas',
'Vento',
'Morcegos',
'Plástico'
],
correta: 3,
explicacao: '✅ Isso! Polinizadores são seres vivos (animais, insetos) ou o vento/água.'
},
{
icone: '🌰',
titulo: 'Missão 3: Reprodução Vegetal',
posicao: { x: 400, y: 400 },
pergunta: 'A reprodução ASSEXUADA em plantas, que gera clones idênticos, ocorre por:',
alternativas: [
'Polinização cruzada',
'Formação de sementes',
'Estaquia e brotamento',
'Fecundação'
],
correta: 2,
explicacao: '✅ Exato! Est aquia, enxertia e brotamento geram plantas geneticamente iguais.'
}
]
}
};
// --------
-ELEMENTOS DO DOM ----------
const el = {
telas: {
inicial: document.getElementById('telaInicial'),
instrucoes: document.getElementById('telaInstrucoes'),
jogo: document.getElementById('telaJogo'),
pergunta: document.getElementById('telaPergunta'),
faseCompleta: document.getElementById('telaFaseCompleta'),
final: document.getElementById('telaFinal')
},
pontos: document.getElementById('pontos'),
vidas: document.getElementById('vidas'),
faseAtual: document.getElementById('faseAtual'),
faseNome: document.getElementById('faseNome'),
mapa: document.getElementById('mapa'),
personagem: document.getElementById('personagem'),
dicaMissao: document.getElementById('dicaMissao'),
perguntaTitulo: document.getElementById('perguntaTitulo'),
perguntaTexto: document.getElementById('perguntaTexto'),
alternativas: document.getElementById('alternativas'),
feedback: document.getElementById('feedback'),
missaoBadge: document.getElementById('missaoBadge'),
pontosFinal: document.getElementById('pontosFinal'),
msgFaseCompleta: document.getElementById('msgFaseCompleta'),
tituloFinal: document.getElementById('tituloFinal'),
mensagemFinal: document.getElementById('mensagemFinal'),
pontuacaoFinal: document.getElementById('pontuacaoFinal')
};
// --------
-NAVEGAÇÃO ENTRE TELAS ----------
function mostrarTela(nomeTela) {
Object.values(el.telas).forEach(t => t.classList.remove('ativa'));
el.telas[nomeTela].classList.add('ativa');
}
// --------
-INICIALIZAÇÃO DA FASE ----------
function iniciarFase(numFase) {
estado.fase = numFase;
estado.missaoAtual = 0;
estado.missoesCompletas = 0;
estado.posicao = { x: 50, y: 100 };
estado.objetoProximo = null;
const dadosFase = fases[numFase];

// Atualiza HUD
el.faseAtual.textContent = numFase;
el.faseNome.textContent = dadosFase.nome;
el.dicaMissao.textContent = dadosFase.dica;

// Configura mapa
el.mapa.className = 'mapa ' + dadosFase.classe;

// Remove objetos antigos
document.querySelectorAll('.objeto-missao').forEach(o => o.remove());

// Cria objetos das missões
dadosFase.missoes.forEach((missao, index) => {
const obj = document.createElement('div');
obj.className = 'objeto-missao';
obj.textContent = missao.icone;
obj.style.left = missao.posicao.x + 'px';
obj.style.top = missao.posicao.y + 'px';
obj.dataset.indice = index;
obj.addEventListener('click', () => tentarInteragir(index));
el.mapa.appendChild(obj);
});

// Posiciona personagem
atualizarPersonagem();

mostrarTela('jogo');
}

// --------
-ATUALIZAÇÃO DO PERSONAGEM ----------
function atualizarPersonagem() {
el.personagem.style.left = estado.posicao.x + 'px';
el.personagem.style.top = estado.posicao.y + 'px';
verificarProximidade();
}
// --------
-MOVIMENTO ----------
function moverPersonagem(direcao) {
if (!el.telas.jogo.classList.contains('ativa')) return;
if (el.telas.pergunta.classList.contains('ativa')) return;
const limiteX = el.mapa.clientWidth
50;
const limiteY = el.mapa.clientHeight
50;
if (direcao === 'up' && estado.posicao.y > 0) estado.posicao.y -= estado.velocidade;
if (direcao === 'down' && estado.posicao.y < limiteY) estado.posicao.y += estado.velocidade;
if (direcao === 'left' && estado.posicao.x > 0) estado.posicao.x -= estado.velocidade;
if
