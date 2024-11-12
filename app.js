/**
 * Simples simulador de uma lampada
 * @author yvis trindade
 */

//variaveis de apoio logico
let chave = false // delisgado
let lampada = true // ligado

//pre carregando do arquivo de audio
let som = new Audio("sound/breaking-glass.mp3")

// lanterna (pré carregamento)
let stream, track // variaveis de apoio
inicializarLanterna()

function quebrar() {
    if (lampada === true) {
        document.getElementById('lamp').src = "img/broken.jpg"
        //reproduzindo um arquivo de audio do JS
        //passo 1: copiar o arquivo de audio para o projeto
        //passo 2: Usar a classe Audio(biblioteca interna do Js)
        //passo 3: pre carregar o arquivo de audio para  sincronizar com a troca de imagem (experiencia do usuario)
        som.play()
        // apoio a logica para o js indentificar a lampada quebrada
        lampada = false
    }
}
function onoff() {
    if (chave === false) {
        //ligar a chave
        document.getElementById('interruptor').src = "img/swon.png"
        chave = true //o js agora sabe que a chave esta ligada
        //
        if (lampada === true) {
            document.getElementById('lamp').src = "img/on.jpg"
        }
        //acender
    } else {
        document.getElementById('interruptor').src = "img/swoff.png"
        chave = false
        //verificar se a lampada esta intacta antes de apagar
        if (lampada === true) {
            document.getElementById('lamp').src = "img/off.jpg"
        }
    }
}

// estudo de eventos relacionados a click do mouse (pressionado ou nao pressionado) e telas touch
// passo 1 - capturar os elementos html (DOM)
const botao = document.getElementById('button')
const lampadaImg = document.getElementById('lamp')

// passo 2 - manipular o evento mouse pressionado
// addEventListener ("escuta de um evento em tempo real")
// mousedown (mouse pressionado constantemente)
//touchstart (tocar na tela e manter0
//touchend (deixar de pressionar a tela touch)

//pressionar o botao no mouse e manter
botao.addEventListener('mousedown', (Event) => {
    Event.preventDefault() // ignorar o comportamento padrão
    //console.log("botao pressionado")
    //se a lampada estiver intacta e o interruptor principal estiver ligado
    if (lampada === true && chave === false) {
        lampadaImg.src = "img/on.jpg" // trocar a imagem 
    }
})

//soltar o botao do mouse
botao.addEventListener('mouseup', (Event) => {
    //console.log("botao solto")
    //se a lampada estiver intacta e o interruptor principal estiver ligado
    if (lampada === true && chave === false) {
        lampadaImg.src = "img/off.jpg" // trocar a imagem 
    }
})

//pressionar a tela touch e manter
botao.addEventListener('touchstart', (Event) => {
    //console.log("tela pressionado")
    //se a lampada estiver intacta e o interruptor principal estiver ligado
    if (lampada === true && chave === false) {
        lampadaImg.src = "img/on.jpg" // trocar a imagem 
    }
})

//deixarf de preossionar a tela touch
botao.addEventListener('touchend', (Event) => {
    //console.log("a tela nao esta pressionada")
    //se a lampada estiver intacta e o interruptor principal estiver ligado
    if (lampada === true && chave === false) {
        lampadaImg.src = "img/off.jpg" // trocar a imagem 
    }
})

//Lanterna (torch)
async function inicializarLanterna() {
    try {
        // Solicita acesso à câmera traseira sem exibir o vídeo
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        })

        // Obtém o track do vídeo para controlar a lanterna
        track = stream.getVideoTracks()[0]

        // Verifica se o dispositivo suporta o uso da lanterna
        const capabilities = track.getCapabilities()
        if (!capabilities.torch) {
            console.log("Lanterna não suportada no dispositivo.")
            return
        }
    } catch (error) {
        console.error(`Erro ao inicializar a lanterna: ${error}`)
    }
}

// Função para ligar a lanterna (torch)
async function ligar() {
    if (track) {
        try {
            await track.applyConstraints({ advanced: [{ torch: true }] })
        } catch (error) {
            console.error(`Erro ao inicializar a lanterna: ${error}`)
        }
    }
}

// Função para desligar a lanterna sem parar o stream
async function desligar() {
    if (track) {
        try {
            await track.applyConstraints({ advanced: [{ torch: false }] })
        } catch (error) {
            console.error(`Erro ao inicializar a lanterna: ${error}`)
        }
    }
}