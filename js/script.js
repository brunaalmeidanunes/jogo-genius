let pc = []
const cores = {
    azul: document.querySelector('.azul'),
    vermelho: document.querySelector('.vermelho'),
    amarelo: document.querySelector('.amarelo'),
    verde: document.querySelector('.verde')
}
let jogador = []
let contPlayer = 1
let rankingArr = []
localStorage.setItem('ranking', rankingArr)

function vezDoPc() {
    const randon = Math.floor(Math.random() * (5 - 1) + 1)
    let randonColor = undefined
    jogador = []
    contPlayer = 0
    removeEvents()
    const ranking = document.querySelector('#ranking ol')
    ranking.innerHTML = ''
    rankingStorage = localStorage.getItem('ranking').length > 0 ? localStorage.getItem('ranking').split(',') : []
    const top5 = rankingStorage.sort((a, b) => {
        a = Number(a.replace(/[^0-9]/g, ''))
        b = Number(b.replace(/[^0-9]/g, ''))
        return a - b
    }).reverse().filter((str, index) => index < 5)
    top5.forEach(element => {
        const li = document.createElement('li')
        li.innerHTML = element
        ranking.appendChild(li)
    });
    switch (randon) {
        case 1:
            randonColor = 'azul'
            break
        case 2:
            randonColor = 'vermelho'
            break
        case 3:
            randonColor = 'amarelo'
            break
        default:
            randonColor = 'verde'
            break;
    }
    pc.push(randonColor)
    const placarAtual = document.querySelector('#placarAtual')
    placarAtual.innerHTML = pc.length - 1
    let contador = 0
    const animaPc = setInterval(() => {
        let atual = cores[pc[contador]]
        atual.style.filter = `drop-shadow(0 0 1.5rem ${getComputedStyle(atual).backgroundColor})`
        const animaCor = setInterval(() => {
            atual.style.filter = `none`
            clearInterval(animaCor)
        }, 600)
        if (contador == pc.length - 1) {
            clearInterval(animaPc)
            addEvents()
        } else {
            contador++
        }
    }, 700)
}

function addEvents() {
    cores.amarelo.addEventListener('click', amarelo)
    cores.azul.addEventListener('click', azul)
    cores.verde.addEventListener('click', verde)
    cores.vermelho.addEventListener('click', vermelho)
}

function removeEvents() {
    cores.amarelo.removeEventListener('click', amarelo)
    cores.azul.removeEventListener('click', azul)
    cores.verde.removeEventListener('click', verde)
    cores.vermelho.removeEventListener('click', vermelho)
}

function amarelo() {
    cores.amarelo.style.filter = `drop-shadow(0 0 1.5rem ${getComputedStyle(cores.amarelo).backgroundColor})`
    const animaCor = setInterval(() => {
        cores.amarelo.style.filter = `none`
        clearInterval(animaCor)
    }, 600)
    jogador.push('amarelo')
    const atual = jogador.length - 1
    console.log(`Num atual = ${atual}, jogador = ${jogador[atual]}, pc = ${pc[atual]}`)
    if (jogador[atual] === pc[atual]) {
        contPlayer++
        if (contPlayer === pc.length) {
            const vezDoPcDelay = setInterval(() => {
                vezDoPc()
                clearInterval(vezDoPcDelay)
            }, 200)
        }
    } else(
        perdeu(pc.length - 1)
    )
}

function azul() {
    cores.azul.style.filter = `drop-shadow(0 0 1.5rem ${getComputedStyle(cores.azul).backgroundColor})`
    const animaCor = setInterval(() => {
        cores.azul.style.filter = `none`
        clearInterval(animaCor)
    }, 600)
    jogador.push('azul')
    const atual = jogador.length - 1
    console.log(`Num atual = ${atual}, jogador = ${jogador[atual]}, pc = ${pc[atual]}`)
    if (jogador[atual] === pc[atual]) {
        contPlayer++
        if (contPlayer === pc.length) {
            const vezDoPcDelay = setInterval(() => {
                vezDoPc()
                clearInterval(vezDoPcDelay)
            }, 200)
        }
    } else(
        perdeu(pc.length - 1)
    )
}

function verde() {
    cores.verde.style.filter = `drop-shadow(0 0 1.5rem ${getComputedStyle(cores.verde).backgroundColor})`
    const animaCor = setInterval(() => {
        cores.verde.style.filter = `none`
        clearInterval(animaCor)
    }, 600)
    jogador.push('verde')
    const atual = jogador.length - 1
    console.log(`Num atual = ${atual}, jogador = ${jogador[atual]}, pc = ${pc[atual]}`)
    if (jogador[atual] === pc[atual]) {
        contPlayer++
        if (contPlayer === pc.length) {
            const vezDoPcDelay = setInterval(() => {
                vezDoPc()
                clearInterval(vezDoPcDelay)
            }, 200)
        }
    } else(
        perdeu(pc.length - 1)
    )
}

function vermelho() {
    cores.vermelho.style.filter = `drop-shadow(0 0 1.5rem ${getComputedStyle(cores.vermelho).backgroundColor})`
    const animaCor = setInterval(() => {
        cores.vermelho.style.filter = `none`
        clearInterval(animaCor)
    }, 600)
    jogador.push('vermelho')
    const atual = jogador.length - 1
    console.log(`Num atual = ${atual}, jogador = ${jogador[atual]}, pc = ${pc[atual]}`)
    if (jogador[atual] === pc[atual]) {
        contPlayer++
        if (contPlayer === pc.length) {
            const vezDoPcDelay = setInterval(() => {
                vezDoPc()
                clearInterval(vezDoPcDelay)
            }, 200)
        }
    } else(
        perdeu(pc.length - 1)
    )
}

function perdeu(pontuacao) {
    const main = document.querySelector('main')
    const div = document.createElement('div')
    div.classList.add('containerPerdeu')
    const h3 = document.createElement('h3')
    h3.classList.add('textoPerdeu')
    h3.innerHTML = 'Voce perdeu tente novamente'
    const h4 = document.createElement('h4')
    h4.classList.add('pontuacaoTotal')
    h4.innerHTML = ` ${pontuacao} cores`
    const buttonReset = document.createElement('button')
    buttonReset.classList.add('buttonPerdeu')
    buttonReset.innerHTML = 'Jogar Novamente'
    buttonReset.addEventListener('click', () => {
        pc = []
        main.removeChild(div)
        vezDoPc()
    })
    rankingArr.push(`A sua pontuação foi ${pontuacao}`)
    localStorage.setItem('ranking', rankingArr)
    div.appendChild(h3)
    div.appendChild(h4)
    div.appendChild(buttonReset)
    main.appendChild(div)
}

vezDoPc()