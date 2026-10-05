// ===== BANCO DE PERGUNTAS
MATEMÁTICA 6º ANO =====
const perguntas = [
{
pergunta: "Qual é o resultado de 25 × 4?",
opcoes: ["90", "100", "110", "120"],
correta: 1,
dica: "💡 Pense em 25 × 4 = 25 + 25 + 25 + 25"
},
{
pergunta: "Quanto é 144 ÷ 12?",
opcoes: ["10", "11", "12", "14"],
correta: 2,
dica: "💡 Qual número multiplicado por 12 dá 144?"
},
{
pergunta: "Qual é a fração equivalente a 1/2?",
opcoes: ["2/3", "3/6", "2/5", "1/3"],
correta: 1,
dica: "💡 Multiplique numerador e denominador por 3"
},
{
pergunta: "Quanto é 15% de 200?",
opcoes: ["15", "20", "30", "35"],
correta: 2,
dica: "💡 15% = 15/100. Multiplique por 200"
},
{
pergunta: "Qual é o valor de 7² (7 ao quadrado)?",
opcoes: ["14", "21", "49", "77"],
correta: 2,
dica: "💡 7² significa 7 × 7"
},
{
pergunta: "Qual é o MDC de 12 e 18?",
opcoes: ["2", "3", "6", "9"],
correta: 2,
dica: "💡 É o maior número que divide os dois ao mesmo tempo"
},
{
pergunta: "Se um triângulo tem lados 3, 4 e 5, qual é seu perímetro?",
opcoes: ["10", "11", "12", "13"],
correta: 2,
dica: "💡 Perímetro = soma de todos os lados"
},
{
pergunta: "Quanto é 3/4 + 1/4?",
opcoes: ["1/2", "3/8", "4/8", "1"],
correta: 3,
dica: "💡 Mesmo denominador: some apenas os numeradores"
},
{
pergunta: "Qual é o resultado de (-8) + 5?",
opcoes: ["-13", "-3", "3", "13"],
correta: 1,
dica: "💡 Números com sinais diferentes: subtraia e conserve o sinal do maior"
},
{
pergunta: "Um ângulo reto mede quantos graus?",
opcoes: ["45°", "60°", "90°", "180°"],
correta: 2,
dica: "💡 É o ângulo formado por um 'canto' perfeito"
}
];
// ===== ESTADO DO JOGO =====
let estado = {
indiceAtual: 0,
pontos: 0,
vidas: 3,
acertos: 0,
respondida: false,
ordemPerguntas: []
};

// ===== ELEMENTOS DO DOM =====
const telaInicio = document.getElementById('tela-inicio');
const telaJogo = document.getElementById('tela-jogo');
const telaFinal = document.getElementById('tela-final');
const btnComecar = document.getElementById('btn-comecar');
const btnReiniciar = document.getElementById('btn-reiniciar');
const numPerguntaEl = document.getElementById('num-pergunta');
const pontosEl = document.getElementById('pontos');
const vidasEl = document.getElementById('vidas');
const progressoEl = document.getElementById('progresso');
const perguntaEl = document.getElementById('pergunta');
const opcoesEl = document.getElementById('opcoes');
const feedbackEl = document.getElementById('feedback');
const astroEmoji = document.getElementById('astro-emoji');

// ===== CRIAÇÃO DAS ESTRELAS =====
function criarEstrelas() {
const container = document.getElementById('estrelas');
const numEstrelas = 60;

for (let i = 0; i < numEstrelas; i++) {
const estrela = document.createElement('div');
estrela.className = 'estrela';
const tamanho = Math.random() * 3 + 1;
estrela.style.width = tamanho + 'px';
estrela.style.height = tamanho + 'px';
estrela.style.left = Math.random() * 100 + '%';
estrela.style.top = Math.random() * 100 + '%';
estrela.style.animationDelay = Math.random() * 2 + 's';
container.appendChild(estrela);
}
}

// ===== NAVEGAÇÃO ENTRE TELAS =====
function mostrarTela(tela) {
document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
tela.classList.add('ativa');
}

// ===== EMBARALHAR ARRAY =====
function embaralhar(array) {
const copia = [...array];
for (let i = copia.length
1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[copia[i], copia[j]] = [copia[j], copia[i]];
}
return copia;
}
// ===== INICIAR JOGO =====
function iniciarJogo() {
estado = {
indiceAtual: 0,
pontos: 0,
vidas: 3,
acertos: 0,
respondida: false,
ordemPerguntas: embaralhar([...Array(perguntas.length).keys()])
};

atualizarPainel();
mostrarTela(telaJogo);
carregarPergunta();
}

// ===== ATUALIZAR PAINEL =====
function atualizarPainel() {
numPerguntaEl.textContent = estado.indiceAtual + 1;
pontosEl.textContent = estado.pontos;

let vidas = '';
for (let i = 0; i < 3; i++) {
vidas += i < estado.vidas ? '❤️' : '🖤';
}
vidasEl.textContent = vidas;

const progresso = ((estado.indiceAtual) / perguntas.length) * 100;
progressoEl.style.width = progresso + '%';
}

// ===== CARREGAR PERGUNTA =====
function carregarPergunta() {
if (estado.indiceAtual >= perguntas.length) {
finalizarJogo(true);
return;
}

estado.respondida = false;
feedbackEl.textContent = '';
feedbackEl.className = 'feedback';

const indicePergunta = estado.ordemPerguntas[estado.indiceAtual];
const perguntaAtual = perguntas[indicePergunta];

perguntaEl.textContent = perguntaAtual.pergunta;
astroEmoji.textContent = '👨‍🚀';

// Criar botões de opções
opcoesEl.innerHTML = '';

// Embaralhar opções mantendo o índice correto
const opcoesComIndice = perguntaAtual.opcoes.map((opcao, idx) => ({
texto: opcao,
correta: idx === perguntaAtual.correta
}));

const opcoesEmbaralhadas = embaralhar(opcoesComIndice);

opcoesEmbaralhadas.forEach(opcao => {
const btn = document.createElement('button');
btn.className = 'btn-opcao';
btn.textContent = opcao.texto;
btn.addEventListener('click', () => verificarResposta(btn, opcao.correta, perguntaAtual.dica));
opcoesEl.appendChild(btn);
});

atualizarPainel();
}

// ===== VERIFICAR RESPOSTA =====
function verificarResposta(botaoClicado, correta, dica) {
if (estado.respondida) return;
estado.respondida = true;

// Desabilitar todos os botões
document.querySelectorAll('.btn-opcao').forEach(btn => btn.disabled = true);

if (correta) {
botaoClicado.classList.add('correto');
estado.pontos += 10;
estado.acertos++;
pontosEl.textContent = estado.pontos;

const mensagens = ['🎉 Excelente!', '⭐ Muito bem!', '🚀 Incrível!', '💫 Você é demais!', '🌟 Perfeito!'];
const msg = mensagens[Math.floor(Math.random() * mensagens.length)];
feedbackEl.textContent = msg + ' +10 pontos!';
feedbackEl.className = 'feedback acerto';
astroEmoji.textContent = '🥳';

setTimeout(() => {
estado.indiceAtual++;
carregarPergunta();
}, 1500);
} else {
botaoClicado.classList.add('errado');
estado.vidas--;
atualizarPainel();

// Mostrar resposta correta
document.querySelectorAll('.btn-opcao').forEach(btn => {
if (btn.textContent === perguntas[estado.ordemPerguntas[estado.indiceAtual]].opcoes[perguntas[estado.ordemPerguntas[estado.indiceAtual]].correta]) {
btn.classList.add('correto');
}
});

feedbackEl.textContent = '❌ Ops! ' + dica;
feedbackEl.className = 'feedback erro';
astroEmoji.textContent = '😅';

setTimeout(() => {
if (estado.vidas <= 0) {
finalizarJogo(false);
} else {
estado.indiceAtual++;
carregarPergunta();
}
}, 2500);
}
}

// ===== FINALIZAR JOGO =====
function finalizarJogo(completou) {
mostrarTela(telaFinal);

const totalPerguntas = perguntas.length;
const precisao = Math.round((estado.acertos / totalPerguntas) * 100);

document.getElementById('pontos-finais').textContent = estado.pontos;
document.getElementById('acertos-finais').textContent = estado.acertos + '/' + totalPerguntas;
document.getElementById('precisao-final').textContent = precisao + '%';

const emojiFinal = document.getElementById('emoji-final');
const tituloFinal = document.getElementById('titulo-final');
const mensagemFinal = document.getElementById('mensagem-final');

if (!completou || estado.vidas <= 0) {
emojiFinal.textContent = '💔';
tituloFinal.textContent = 'Missão Encerrada!';
mensagemFinal.textContent = `Você perdeu todas as vidas, mas não desista! Tente novamente e mostre todo o seu potencial matemático!`;
tituloFinal.style.color = '#FF6B9D';
} else if (precisao === 100) {
emojiFinal.textContent = '🏆';
tituloFinal.textContent = 'PERFEITO! Lenda Espacial!';
mensagemFinal.textContent = 'Incrível! Você acertou TODAS as perguntas! Você é um verdadeiro mestre da matemática! 🌟';
tituloFinal.style.color = '#FFD93D';
} else if (precisao >= 70) {
emojiFinal.textContent = '🥇';
tituloFinal.textContent = 'Excelente Trabalho!';
mensagemFinal.textContent = 'Parabéns, astronauta! Você completou a missão com sucesso! Continue treinando para se tornar uma lenda!';
tituloFinal.style.color = '#4CAF50';
} else if (precisao >= 50) {
emojiFinal.textContent = '🥈';
tituloFinal.textContent = 'Bom Trabalho!';
mensagemFinal.textContent = 'Você está no caminho certo! Com um pouco mais de prática, vai dominar todas as operações!';
tituloFinal.style.color = '#A0E7E5';
} else {
emojiFinal.textContent = '🥉';
tituloFinal.textContent = 'Continue Tentando!';
mensagemFinal.textContent = 'Toda jornada começa com um passo. Revise o conteúdo e tente novamente
você consegue!';
tituloFinal.style.color = '#FFD93D';
}
}
// ===== EVENT LISTENERS =====
btnComecar.addEventListener('click', iniciarJogo);
btnReiniciar.addEventListener('click', () => {
mostrarTela(telaInicio);
});

// Suporte a teclado (teclas 1-4)
document.addEventListener('keydown', (e) => {
if (!telaJogo.classList.contains('ativa')) return;
const num = parseInt(e.key);
if (num >= 1 && num <= 4) {
const botoes = document.querySelectorAll('.btn-opcao');
if (botoes[num
1] && !botoes[num
1].disabled) {
botoes[num
1].click();
}
}
});
// Inicialização
criarEstrelas();

