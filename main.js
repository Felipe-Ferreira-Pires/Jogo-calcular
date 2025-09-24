 

        function Maiuscula () {
            const input = document.getElementById("CaixaDeTexto").value;
            const output = input.toUpperCase(); //ToLowerCase
            document.getElementById("output").innerHTML="Maiuscula:" + output;
        }

        function Minuscula () {
            const input = document.getElementById("CaixaDeTexto").value;
            const output = input.toLowerCase(); //ToLowerCase
            document.getElementById("output").innerHTML="Minuscula:" + output;
        }

        function Aleatoria () {
            const input = document.getElementById("CaixaDeTexto").value
            let FraseAleatoria = ""
            for(let i=0; i<input.length; i++) {
                const LetraAleatoria = Math.random ()<0.5?input[i].toUpperCase():input[i].toLowerCase()
                FraseAleatoria +=LetraAleatoria
                document.getElementById("output").innerText="Aleatorio: "+FraseAleatoria
            }
        }

        function Tamanho () {
            const input = document.getElementById("CaixaDeTexto").value
            document.getElementById("output").innerText="Tamanho: "+input.length;
        }
        
        function PrimeiroChar () {
            const input = document.getElementById("CaixaDeTexto").value
            if (input.length>0) {
            document.getElementById("output").innerText="Primeira Letra: "+input.charAt(0);
            
            } else {
                document.getElementById("output").innerText="Nenhum caractere encontrado: "
            }
        }

        function PosicaoE () {
            const input = document.getElementById("CaixaDeTexto").value;
            const posicao = input.indexOf("e")
            document.getElementById("output").innerText="Posição da letra E: " + (posicao>=0?posicao: "Não foi encontrado")
        }

        function Primeira () {
            const input = document.getElementById("CaixaDeTexto").value;
            if (input.length > 0) {
                const primeiraMaiuscula = input.charAt(0).toUpperCase();
                let restoDasLetras = "";
                for (let i = 1; i < input.length; i++) {
                    restoDasLetras += input.charAt(i);
                }
                document.getElementById("output").innerText="Primeira letra: " + primeiraMaiuscula + restoDasLetras;
            } else {
                document.getElementById("output").innerText="Nenhuma palavra encontrada";
            }
        }

        //Desafio matemática

        let num1,num2, resultado;
        let acertos=0
        let erros=0

        function novaPergunta () {
            num1= Math.floor (Math.random ()*10)
            num2= Math.floor (Math.random ()*10)

            resultado= num1*num2;

            document.getElementById("math-question").textContent=`${num1} * ${num2}  =?`

            document.getElementById("resultado-matemática").textContent=" "
            document.getElementById("user-answer").value="";

            document.getElementById("btn-verificar").disabled=false;
            document.getElementById("user-answer").disabled=false;
            
        }

        function verificarResposta () {
            const resposta = parseInt(document.getElementById("user-answer").value);
            const resultadoTexto = document.getElementById("resultado-matemática");

            if (resposta == resultado) {
                resultadoTexto.textContent = "✅ Parabéns você acertou ! "
                acertos++
                
            } else {
                resultadoTexto.textContent = `❌ Você errou, quem sabe da próxima ! A resposta correta era: ${resultado}`
                erros++
                
            }

            document.getElementById("acertos").textContent = acertos
            document.getElementById("erros").textContent = erros

            document.getElementById ("user-answer").disabled=true
            document.getElementById ("btn-verificar").disabled=true
            
            localStorage.setItem("acertos",acertos);
            localStorage.setItem("erros",erros)

        }

        window.onload=function () {
            const acertosSalvos= localStorage.getItem("acertos")
            const errosSalvos= localStorage.getItem("erros")

            console.log (acertosSalvos)
            console.log (errosSalvos)

            if (acertosSalvos !==null){
                acertos= parseInt(acertosSalvos)
                document.getElementById("acertos").textContent=acertos;
            }
            
            if (errosSalvos !==null){
                erros= parseInt(errosSalvos)
                document.getElementById("erros").textContent=erros;
            }

        }

        function recomecarQuiz() {
            salvarRanking()
            acertos = 0
            erros = 0

            document.getElementById("acertos").textContent=acertos;
            document.getElementById("erros").textContent=erros;

            localStorage.removeItem("acertos")
            localStorage.removeItem("erros")

            document.getElementById("resultado-matemática").textContent=" "
            document.getElementById("user-answer").value="";

            document.getElementById("btn-verificar").disabled=true;
            document.getElementById("user-answer").disabled=true;

            document.getElementById("math-question").textContent="Clique em \"Próxima pergunta\" para iniciar"
        }

        function salvarRanking(){
            const nome=prompt("digite seu nome para salvar no ranking")
            if (!nome) return;

            const novoRegistro = {nome:nome, acertos:acertos,erros:erros }
            let ranking = JSON.parse(localStorage.getItem("ranking"))||[]

            ranking.push(novoRegistro)

            ranking.sort((a,b) => b.acertos - a.acertos)

            ranking = ranking.slice(0,5)

            localStorage.setItem("ranking", JSON.stringify(ranking))

            mostrarRanking();
        }

        function mostrarRanking(){
            const lista = document.getElementById("ranking-list")
            lista.innerHTML = "";

            const ranking = JSON.parse(localStorage.getItem ("ranking"))||[]

            ranking.forEach(entry =>{
                const li = document.createElement("li")

                li.textContent = `${entry.nome}: ${entry.acertos} acertos, ${entry.erros} erros`

                lista.appendChild(li)
            })

        }


// Desafio avançado

function novaPerguntaAvançada() {
    const operadores = ["+", "-", "*", "/"];
    n1 = Math.ceil(Math.random() * 20);
    n2 = Math.ceil(Math.random() * 10);
    op = operadores[Math.floor(Math.random() * operadores.length)];
    let perguntaTexto = `${n1} ${op} ${n2} = ?`;
    if (op === "+") {
        resultadoAvancado = n1 + n2; 
    } else if (op === "-") {
        resultadoAvancado = n1 - n2; 
    } else if (op === "*") {
        resultadoAvancado = n1 * n2; 
    } else if (op === "/") {
        resultadoAvancado = n1 / n2; 
    }

    // explicação abaixo 

    // Mostra a pergunta na tela
    document.getElementById("advanced-quest").textContent = perguntaTexto;
    // Tira a pergunta da tela
    document.getElementById("advanced-answer").value = "";
    // Limpa a pergunta de antes [acerto ou erro]
    document.getElementById("resultado-avançado").textContent = "";
    // Ativa o verificar
    document.getElementById("btn-verificar-adv").disabled = false;
    // Ativa a resposta
    document.getElementById("advanced-answer").disabled = false;
}


let acertosAdv = 0;  
let errosAdv = 0;    

function verificarAvançado() {
    // Transforma a resposta em numero "decimal", ai ele verifica melhor
    const respostaUsuario = parseFloat(document.getElementById("advanced-answer").value);
    // Lugar que a gente usa erro e acerto la
    const resultadoTexto = document.getElementById("resultado-avançado");
    // Arredonda o resultado
    const respostaCorrigida = parseFloat(resultadoAvancado.toFixed(2));
    // Compara as respostas
    if (respostaUsuario.toFixed(2) === respostaCorrigida.toFixed(2)) {
        
        resultadoTexto.textContent = "✅ Parabéns você acertou!";

        acertosAdv++;
    } else {
        resultadoTexto.textContent = `❌ Você errou! A resposta correta era: ${respostaCorrigida}`;

        errosAdv++;
    }

    document.getElementById("acertos-adv").textContent = acertosAdv;
    document.getElementById("erros-adv").textContent = errosAdv;

    document.getElementById("advanced-answer").disabled = true;
    document.getElementById("btn-verificar-adv").disabled = true;


}

