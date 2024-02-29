let userScore=0;
let cpuScore=0;

// let rock=document.querySelector('#rock')
// let scissors=document.querySelector('#scissors')
// let paper=document.querySelector('#paper')
// console.log(rock,scissors,paper)
let choiceButtons=document.querySelectorAll('.circle')
let uScore=document.querySelector('.user-score')
let cScore=document.querySelector('.computer-score')

function computerChoice(){
    const choices=['rock','paper','scissors']
    const index=Math.floor(Math.random()*3)
    return choices[index]
   
}



function playGame(userChoice){
    const cpuChoice=computerChoice()
    console.log('CPU:',cpuChoice,'USER:',userChoice)
    if(cpuChoice===userChoice){
        console.log('Game Tie')
    }else if(cpuChoice==='scissors' && userChoice==='rock'){
        console.log('user win')
        userScore++;
    }else if(cpuChoice==='scissors' && userChoice==='paper'){
        console.log('computer win')
        cpuScore++;
    }else if(cpuChoice==='paper' && userChoice==='scissors'){
        console.log('user win')
        userScore++;
    }else if(cpuChoice==='paper' && userChoice==='rock'){
        console.log('computer win')
        cpuScore++;
    }else if(cpuChoice==='rock' && userChoice==='scissors'){
        console.log('computer win')
        cpuScore++;
    }else if(cpuChoice==='rock'&& userChoice==='paper'){
        console.log('user win')
        userScore++
    }
    uScore.textContent=userScore;
    cScore.textContent=cpuScore;
    // if(userChoice!==cpuChoice){
    //     document.querySelector('.controls').innerHTML='<h2>hello buddy you know who got win</h2>'
    // }

    
}

for(let choiceButton of choiceButtons){
    choiceButton.addEventListener('click',function(e){
        const userChoice=choiceButton.textContent.trim()
        // console.log('user choice',userChoice)
        playGame(userChoice)

    })
    
}
