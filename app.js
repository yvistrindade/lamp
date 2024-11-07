/**
 * Simples simuladoar de uma lampada
 * @author yvis trindade
 */

function quebrar() {
    document.getElementById('lamp').src = "img/broken.jpg"
    //reproduzindo um arquivo de acordo
    //passo 1: copiar o arquivo de audio para o projeto
    //passo2: usar a classe audio(biblioteca interna do jS)
    let som = new Audio()
    som.src = "sound/glassbreaking.wav"
    som.play()
}