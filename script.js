const question = [
    {
        question:"which is the large animal in the world?",
        answers:[
            
               { text:"Shark",correct:false},
               { text:"Blue whale",correct:true},
               { text:"Elephant",correct:false},
               { text:"Giraffe",correct:false},
        ]
    },
    {
        question:"which is the largest desert in the world?",
        answers:[
            
               { text:"Kalahari",correct:false},
               { text:"Gobi",correct:false},
               { text:"Sahara",correct:false},
               { text:"Antarctica",correct:true},
        ]

    },
    {
        question:"which is the smallest  contient in the world?",
        answers:[
            
               { text:"Asia",correct:false},
               { text:"Australia",correct:true},
               { text:"Arctic",correct:false},
               { text:"Africa",correct:false},
        ]
    }
];
const questionElement= document.getElementById("question");
const answerButtons= document.getElementById("anwer-button");
const nextButton= document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML ="Next";  
    showQuestions();

}
function showQuestions(){
    resetState();
    let currentQuestion = question[ currentQuestionIndex];
    let questionNo =  currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(asnwer => {
        const button = document.createElement("button");
        button.innerHTML = asnwer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(asnwer.correct){
            button.dataset.correct = asnwer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
      
}

function  resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true" ;
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}






function  handeleNextButton(){
    currentQuestionIndex++;
     if(currentQuestionIndex < question.length){
        showQuestions();
     }else{
        showScore();
     }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < question.length){
        handeleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();


