const question = document.querySelector('.question');
const answersBtns = document.querySelectorAll('.answers button');
const answers = document.querySelector('.answers');
const hide = document.querySelector('.hide');
const result = document.querySelector('.result-container')
const quiz = document.querySelector('.quiz');
const score = document.querySelector('.score');
const span = document.querySelector('.container span');

let numberOfQuestions = 5;
let count = 0;
const ARR = randomGenerate(numberOfQuestions);
let ansCount = 0;

function randomGenerate(arrLength){
    let randomNum;
    let arr = [];
    while(arr.length < arrLength){
        randomNum = Math.floor(Math.random() * arrLength);
        if(arr != null){
            if(arr.indexOf(randomNum) == -1) arr.push(randomNum)
        }else{
            arr.push(randomNum);
        }
    }
    return arr;
}

const QUESTIONS = [
    {
        question : '4 + 4 = ?',
        answer : [{ans : '1', correct : false}, {ans : '4', correct : false}, {ans : '8', correct : true}, {ans : '6', correct : false}]
    },
    {
        question : '4 + 6 = ?',
        answer : [{ans : '9', correct : false}, {ans : '6', correct : false}, {ans : '14', correct : false}, {ans : '10', correct : true}]
    },
    {
        question : '2 + 9 = ?',
        answer : [{ans : '11', correct : true}, {ans : '16', correct : false}, {ans : '14', correct : false}, {ans : '12', correct : false}]
    },
    {
        question : '3 + 4 = ?',
        answer : [{ans : '3', correct : false}, {ans : '7', correct : true}, {ans : '14', correct : false}, {ans : '8', correct : false}]
    },
    {
        question : '5 + 5 = ?',
        answer : [{ans : '7', correct : false}, {ans : '11', correct : false}, {ans : '10', correct : true}, {ans : '12', correct : false}]
    }
];

(function(){
    setNextQuestion();
})();

function setNextQuestion(){
    if(ARR.length > count){
        question.innerHTML = QUESTIONS[ARR[count]].question;
        for(let i = 0; i < 4; i++){
            answersBtns[i].innerHTML = QUESTIONS[ARR[count]].answer[i].ans;
            answersBtns[i].dataset.correct = QUESTIONS[ARR[count]].answer[i].correct;
        }
        span.innerHTML = `question ${count+1} of 5`;
    }else{
        jobDone();
    }
    count++;
}

function jobDone() {
    question.classList.add('hide');
    answers.classList.add('hide');
    result.classList.remove('hide');
    quiz.classList.add('hide');
    span.classList.add('hide');
}

function scoreDisplay(e){
    const correctAns = e.target.dataset.correct;
    if(correctAns == 'true'){
        ansCount++;
    }
    let scoreResult = calculateScore(ansCount);
    score.innerHTML = `${scoreResult} %`;
    score.style.width = `${scoreResult}%`;
    score.style.animation = 'Range 1.5s forwards ease-in-out';
}

function calculateScore(correctCount) {
    return (correctCount * 20);
}

answersBtns.forEach(btn => {
    btn.addEventListener('click', scoreDisplay)
    btn.addEventListener('click', setNextQuestion)
})