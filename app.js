let listOfDrawnNumbers = [];
const maxNumber = 20;
let attempts = 0;

readText = (text) => {
    responsiveVoice.speak(text, 'Brazilian Portuguese Female',{rate:1.2});
}

/*
    Quando chamada cria uma referência elemento HTML e 
    se text não for vazia acrescenta o valor de text dentro do elemento HTML.
 */
createReferenceForElement = (tag,text) => {
    let aux = document.querySelector(tag);
    if(text != undefined) aux.innerHTML = text;
    return aux;
}

/* Função que é executada qdo o jogo é iniciado  ou um novo jogo */
showInitialMessage = () => {
    // Chamando a função que gera números aleatórios
    secretNumber = toGenerateRandonNumber();
    // Chamando a função que irá manipular o DOM
    let title = createReferenceForElement('h1', 'Jogo do número secreto');
    let paragraph = createReferenceForElement('p',`Escolha um número entre 1 e ${maxNumber}`);
    // Chamando a função respopnsável pela acessibilidade de voz
    readText(`${title.innerText} ${paragraph.innerText}`);
}

//Quando chamada limpa o input
cleanScreen = () => createReferenceForElement('input').value = '';

//Verificar na lista
haveOnTheList = (list, number) => list.includes(number); 

/* Função quando chamada, gera um número aleatório e verfica se ja foi sorteado  */
toGenerateRandonNumber = () => {
   let chosenNumber;
   //Verfica se a lista atingiu o limite máximo
   if(listOfDrawnNumbers.length === maxNumber) listOfDrawnNumbers = [];
   //Gerando um número aleatório até que gere um que não tenha na lista evitando assim a recursão 
   do {
      chosenNumber = Math.floor(Math.random() * maxNumber + 1);
   } while(haveOnTheList(listOfDrawnNumbers,chosenNumber));
   
   //Add na lista
   listOfDrawnNumbers.push(chosenNumber);  
   return listOfDrawnNumbers[listOfDrawnNumbers.length - 1];
}    

//Quando chamada recomeça o jogo
startNewGame = () =>  { 
    document.getElementById('restart').setAttribute('disabled','true');
    console.log(listOfDrawnNumbers);
    cleanScreen();
    attempts = 0;
    showInitialMessage();
}

showInitialMessage();

// Referancias para DOM
const field = createReferenceForElement('input');
// Deixando o valor máximo do input dinâmico
field.max = maxNumber;

// Executada quando o botão chutar e clicado e verifica se ganhou ou não
checkAttempt = () => {
    attempts++;
    if(secretNumber === parseInt(field.value)){
        let title = createReferenceForElement('h1', 'Acertou!');
        let msg = attempts > 1 ? 'tentativas' : 'tentativa';
        let paragraph = createReferenceForElement('p',`Você descobriu o número secreto com ${attempts} ${msg}!`);
        // Chamando a função respopnsável pela acessibilidade de voz
        readText(`${title.innerText} ${paragraph.innerText}`);
        // Chamndo a função que manipula o DOM e armazenando no escopo global
        const btnNewGame = createReferenceForElement('#restart');
        // Ativando o botão de novo jogo
        btnNewGame.removeAttribute('disabled');
        // Depois de ativo adicionado o evento que chama a função que atualiza a página
        btnNewGame.addEventListener('click', startNewGame);
    }
    else {
        let guessGuidance = (secretNumber > parseInt(field.value) ? 'O número secreto é maior' : 'O número secreto é menor');
        let paragraph = createReferenceForElement('p', guessGuidance);
        readText(paragraph.innerText);
        cleanScreen();
    } 
}  





