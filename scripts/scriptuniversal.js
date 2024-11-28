// Áudios da morte
const audios = [
    new Audio('../sounds/som1.mp3'),
    new Audio('../sounds/som2.mp3'),
    new Audio('../sounds/som3.mp3'),
    new Audio('../sounds/som4.mp3'),
    new Audio('../sounds/som5.mp3'),
    new Audio('../sounds/som6.mp3'),
    new Audio('../sounds/som7.mp3'),
    new Audio('../sounds/som8.mp3'),
    new Audio('../sounds/som9.mp3'),
    new Audio('../sounds/som10.mp3'),
    new Audio('../sounds/som11.mp3'),
    new Audio('../sounds/som12.mp3')
];

// Valor da resposta correta
const respostaCerta = 3;

// Carrega os níveis do localStorage ou inicializa os niveis
let niveis = JSON.parse(localStorage.getItem("niveis")) || [1,2,3,4,5,6,7,8,9,10];

function salvarNiveis() {
    localStorage.setItem("niveis", JSON.stringify(niveis));
}

function gerarNumeroAleatorio() { //autoexplicativo
    return niveis[Math.floor(Math.random() * niveis.length)];
}

function selecionadorDeNivel() {
    console.log("Níveis restantes:", niveis);

    if (niveis.length === 0) { // se for chamada e não tiver nada, acabou
        alert("Você está livre!");
        window.location.href = "../levels/fim.html"; // Redireciona para a página do fim
        return;
    }

    const numeroAleatorio = gerarNumeroAleatorio();
    console.log("Nível selecionado:", numeroAleatorio);

    // Remove o nível selecionado do array e salva
    const indice = niveis.indexOf(numeroAleatorio);
    if (indice !== -1) {
        niveis.splice(indice, 1);
        salvarNiveis(); // Atualiza o localStorage
        console.log("Nível removido:", numeroAleatorio);
    }

    // Redireciona para o nível correspondente
    window.location.href = `../levels/${numeroAleatorio}.html`;
}

// Seleção de som
function selecionadorDeSom() {
    const somAleatorio = Math.floor(Math.random() * audios.length);
    const somEscolhido = audios[somAleatorio];
    somEscolhido.play();
}

// Controle do jogo
function proximoNivel() {
    alert("Parabéns, você acertou!");
    selecionadorDeNivel();
}

function voceMorreu() {
    alert("Você errou! :(");
    const somMorte = audios[0];
    somMorte.play();

    setTimeout(() => {
        niveis = [1,2,3,4,5,6,7,8,9,10]; // reseta os niveis (precisa ser igual o do início)
        salvarNiveis(); // salva no local storage 
        window.location.href = "../pages/morte.html";
    }, 3000);
}

function resetaOGame(){
    niveis = [1,2,3,4,5,6,7,8,9,10];
    salvarNiveis();
    window.location.href= "../index.html";
}

// Resposta do jogador
function enviarResposta() {
    const escolhaResposta = document.querySelector('input[name="resposta"]:checked');

    if (!escolhaResposta) {
        alert("Escolha uma resposta antes de enviar!");
        document.querySelector("form").classList.add("erro");
        return;
    }

    document.querySelector("form").classList.remove("erro");

    if (parseInt(escolhaResposta.value) === respostaCerta) {
        proximoNivel();
    } else {
        selecionadorDeSom();
        voceMorreu();
    }
}
