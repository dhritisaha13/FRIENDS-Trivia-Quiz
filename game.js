const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question:"In which city is Friends set?",
        choice1: "Los Angeles",
        choice2: "New York City",
        choice3: "Miami",
        choice4: "Seattle",
        answer: 2
    },
    {
        question:"What's the title of the Friends theme song?",
        choice1: "I'll be there for them",
        choice2: "I'll be there for those",
        choice3: "I'll be there for you",
        choice4: "I'll be there for that",
        answer: 3
    },
    {
        question:"What does Joey never share?",
        choice1: "His books",
        choice2: "His information",
        choice3: "His food",
        choice4: "His DVDs",
        answer: 3
    },
    {
        question:"What song is Phoebe best known for?",
        choice1: "Smelly Cat",
        choice2: "Smelly Dog",
        choice3: "Smelly Rabbit",
        choice4: "Smelly Worm",
        answer: 1
    },
    {
        question:"Who was Chandler's TV magazine always addressed to?",
        choice1: "Miss Chanandler Bong",
        choice2: "Chandler Bang",
        choice3: "Chandler Bung",
        choice4: "Chandler Bing",
        answer: 1
    },
    {
        question:"What is Joey's Penguin's name?",
        choice1: "Snowflake",
        choice2: "Waddle",
        choice3: "Huggsy",
        choice4: "Emma",
        answer: 3
    },
    {
        question:"Who was Monica's midnight mystery kisser?",
        choice1: "Chandler",
        choice2: "Chip Matthews",
        choice3: "Joey",
        choice4: "Ross",
        answer: 4
    },
    {
        question:"What was Ross's job?",
        choice1: "Podiatrist",
        choice2: "Paleontologist",
        choice3: "Orthodontist",
        choice4: "Archaeologist",
        answer: 2
    },
    {
        question:"What is the name of Rachel's hairless cat?",
        choice1: "Baldy",
        choice2: "Mrs Whiskerson",
        choice3: "Sid",
        choice4: "Felix",
        answer: 2
    },
    {
        question:"What's the name of the coffee shop used by the characters?",
        choice1: "St James Perk",
        choice2: "Central Perk",
        choice3: "Froth of Khan",
        choice4: "Daily Grind",
        answer: 2
    }
];


//CONSTANTS

const CORRECT_BONUS = 20;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    
    if(availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('end.html');
    }
    
    questionCounter++;
    
    progressText.innerText = "Question " + questionCounter + "/" + MAX_QUESTIONS;
    
    //Update the progress bar
    progressBarFull.style.width = ((questionCounter/MAX_QUESTIONS) * 100) + "%";
        
    
    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex,1);
    acceptingAnswers = true;
    
};

choices.forEach(choice => {
    choice.addEventListener('click',e => {
        if(!acceptingAnswers) return;
        
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        
        if(classToApply == 'correct'){
            incrementScore(CORRECT_BONUS);
        }
       
        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000);
        
        
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();