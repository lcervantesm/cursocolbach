(function(){
//Get the HTML elements where the quiz is (must do with all quizes)
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const myQuestions = [
    {
        question: "1. Resuelve: $278 + 489 + 501 =$",
        answers: {
            a: "$1808$",
            b: "$709$",
            c: "$1268$",
            d: "$2567$"
        },
        correctAnswer: "c"
    },
    {
        question: "2. Resuelve: $298 + 564 + 151 =$",
        answers: {
            a: "$1013$",
            b: "$1209$",
            c: "$1289$",
            d: "$1008$"
        },
        correctAnswer: "a"
    },
    {
        question: "3. Resuelve: $986 + 575 + 1285 =$",
        answers: {
            a: "$3457$",
            b: "$2907$",
            c: "$2156$",
            d: "$2846$"
        },
        correctAnswer: "d"
    },
]
//Function Layout

function buildQuiz(){
    //Place to store th HTML output
    const output = [];

    //for each question...
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            //store the list of answer choices
            const answers = [];
            //and for each available answer...
            for(letter in currentQuestion.answers){
                //... add an HTML radio button
                answers.push(
                    `<label>
                        <input type='radio' name="question${questionNumber}" value="${letter}">${letter} :${currentQuestion.answers[letter]}
                        </input>
                    </label>`
                );
            }

            //add this question and its answers to the outpur
            output.push(
                `<div>
                    <div class='question'>${currentQuestion.question}</div>
                    <div class='answers'>${answers.join('')}</div>
                </div>`
            );
        }
    );

    //Finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
}

function showResults(){
    //Gather answers containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
    //keep track of user's answers
    let numCorrect = 0;

    //For each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
        //Find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = 'input[name=question'+questionNumber+']:checked';
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        //if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
            //add to the number of correct answers
            numCorrect++;
            //color the answers green
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        //if answer is wrong or blank
        else {
            //color the answers red
            answerContainers[questionNumber].style.color = 'red';
        }
    });
    //show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' de ' + myQuestions.length;
}

//display quiz
buildQuiz();

// on submit, show results
submitButton.addEventListener('click', showResults);
})();
