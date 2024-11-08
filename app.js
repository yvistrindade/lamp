/**
 * Simples simulador de uma lampada
 * @author João Victor
 */

//variaveis de apoio logico
let chave = false // delisgado
let lampada = true // ligado

function quebrar() {
    document.getElementById('lamp').src = "img/broken.jpg"
    //reproduzindo um arquivo de audio do JS
    //passo 1: copiar o arquivo de audio para o projeto
    //passo 2: Usar a classe Audio(biblioteca interna do Js)

    let som = new Audio()
    som.src = "sound/glassbreaking.wav"
    som.play()
    // apoio a logica para o js indentificar a lampada quebrada
}
function onoff() {
        if (chave === false && lampada === true){
        document.getElementById('interruptor').src = "img/swon.png"
        chave = true //o js agora sabe que a chave esta ligada
        document.getElementById('lamp').src = "img/on.jpg"
        //acender
    }else {
        document.getElementById('interruptor').src = "img/swoff.png"
        chave = false
        document.getElementById('lamp').src = "img/off.jpg"
    }
}