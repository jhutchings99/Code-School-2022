
function addProblem() {
    var randomNumber1 = Math.floor(Math.random() * 10)
    var firstNumber = document.querySelector("#number-a");
    firstNumber.innerHTML = randomNumber1;
    
    var randomNumber2 = Math.floor(Math.random() * 10)
    var secondNumber = document.querySelector("#number-b");
    secondNumber.innerHTML = randomNumber2;
    
    return randomNumber1 + randomNumber2;
}

function multiplyProblem () {
    var randomNumber1 = Math.floor(Math.random() * 10)
    var firstNumber = document.querySelector("#number-a");
    firstNumber.innerHTML = randomNumber1;
    
    var randomNumber2 = Math.floor(Math.random() * 10)
    var secondNumber = document.querySelector("#number-b");
    secondNumber.innerHTML = randomNumber2;
    
    return randomNumber1 * randomNumber2;
}

var correctAnswer = multiplyProblem();

var submitButton = document.querySelector("#submit-button");
submitButton.onclick = function () {
    rightOrWrong = document.querySelector("#right-or-wrong");
    answerInput = document.querySelector("#answer-input");
    if (answerInput.value == correctAnswer) {
        rightOrWrong.innerHTML = "Correct";
        rightOrWrong.style.color = 'green';
        //rightOrWrong.classList.add("correct");
        correctAnswer = multiplyProblem();
    } else {
        rightOrWrong.innerHTML = "Wrong";
        rightOrWrong.style.color = 'red';
    }

    answerInput.value = "";
}

var nextQuestion = document.querySelector("#next-question")
nextQuestion.onclick = function () {
    var multiplyRadio = document.querySelector("#multiply");
    var addRadio = document.querySelector("#add");
    var operator = document.querySelector("#operator");

    if (multiplyRadio.checked) {
        correctAnswer = multiplyProblem;
        operator.innerHTML = "*";
    } else if (addRadio.checked) {
        correctAnswer = addProblem;
        operator.innerHTML = "+";
    } else {
        correctAnswer = addProblem;
    }
}