const chooseQuiz = document.getElementsByClassName('chooseQuiz')[0];
const questionNumber = document.getElementById('questionNumber');
const question = document.getElementById('question');

const answer01Div = document.getElementById('answer01');
const answer02Div = document.getElementById('answer02');
const answer03Div = document.getElementById('answer03');
const answer04Div = document.getElementById('answer04');

const allAnswerDivs = document.getElementsByClassName('answer');

const answer01Text = document.getElementById('answer01Text');
const answer02Text = document.getElementById('answer02Text');
const answer03Text = document.getElementById('answer03Text');
const answer04Text = document.getElementById('answer04Text');

const nextQuestion = document.getElementById('nextQuestion');
const container = document.getElementsByClassName('container')[0];
const wrapper = document.getElementsByClassName('wrapper')[0];
const wrapperHeader = document.getElementById('wrapperHeader');
const csharpButton = document.getElementsByClassName('csharp')[0];
const jsButton = document.getElementsByClassName('javascript')[0];
const pythonButton = document.getElementsByClassName('python')[0];
const reactButton = document.getElementsByClassName('react')[0];

const jsAnimation = document.getElementsByClassName('JS')[0];
const csharpAnimation = document.getElementsByClassName('C#')[0];
const pythonAnimation = document.getElementsByClassName('Python')[0];
const reactAnimation = document.getElementsByClassName('React')[0];

let currentQuiz = '';

const nextQuestionButton = document.getElementById('nextQuestion');
const submitAnswerButton = document.getElementById('submitAnswer');

let totalPoints = 0;
let currentQuestion = 1;
let selectedAnswers = [];
let isMultiAnswer = false;

csharpButton.addEventListener('click', () => {
    currentQuiz = 'C#';
    wrapper.style.display = 'block';
    wrapperHeader.textContent = 'C# Quiz';
    chooseQuiz.style.display = 'none';
    csharpAnimation.style.display = 'block';
    loadQuestionAndAnswer(currentQuestion);
});

jsButton.addEventListener('click', () => {
    currentQuiz = 'JS';
    wrapper.style.display = 'block';
    wrapperHeader.textContent = 'JavaScript Quiz';
    chooseQuiz.style.display = 'none';
    jsAnimation.style.display = 'block';
    loadQuestionAndAnswer(currentQuestion);
});

pythonButton.addEventListener('click', () => {
    currentQuiz = 'Python';
    wrapper.style.display = 'block';
    wrapperHeader.textContent = 'Python Quiz';
    chooseQuiz.style.display = 'none';
    pythonAnimation.style.display = 'block';
    loadQuestionAndAnswer(currentQuestion);
});

reactButton.addEventListener('click', () => {
    currentQuiz = 'React';
    wrapper.style.display = 'block';
    wrapperHeader.textContent = 'React Quiz';
    chooseQuiz.style.display = 'none';
    reactAnimation.style.display = 'block';
    loadQuestionAndAnswer(currentQuestion);
});

nextQuestion.addEventListener('click', loadNextQuestionHandler);

const jsConfetti = new JSConfetti();

function markRightAndWrongAnswer(givenAnswerId, correctAnswerDiv) {
    let i = document.createElement('i');
    i.classList.add('fa-solid');
    i.classList.add('fa-check');
    i.style.color = 'green';
    correctAnswerDiv.appendChild(i);
    console.log(correctAnswerDiv.id);
    if (givenAnswerId !== correctAnswerDiv.id) {
        let i = document.createElement('i');
        i.classList.add('fa-solid');
        i.classList.add('fa-x');
        i.style.color = 'red';
        document.getElementById(`${givenAnswerId}`).appendChild(i);
    } else {
        totalPoints++;
    }

    answer01Div.removeEventListener('click', checkIfAnswerIsTrueHandler);
    answer02Div.removeEventListener('click', checkIfAnswerIsTrueHandler);
    answer03Div.removeEventListener('click', checkIfAnswerIsTrueHandler);
    answer04Div.removeEventListener('click', checkIfAnswerIsTrueHandler);
    nextQuestion.style.display = 'block';
}

function markMultipleAnswers(selectedAnswerIds, correctAnswerDivs) {
    let allCorrect = true;
    
    for (let answerId of selectedAnswerIds) {
        let isCorrect = false;
        for (let correctDiv of correctAnswerDivs) {
            if (answerId === correctDiv.id) {
                isCorrect = true;
                break;
            }
        }
        
        if (!isCorrect) {
            allCorrect = false;
            let i = document.createElement('i');
            i.classList.add('fa-solid');
            i.classList.add('fa-x');
            i.style.color = 'red';
            document.getElementById(answerId).appendChild(i);
        }
    }
    
    if (selectedAnswerIds.length !== correctAnswerDivs.length) {
        allCorrect = false;
    }
    
    for (let correctDiv of correctAnswerDivs) {
        let i = document.createElement('i');
        i.classList.add('fa-solid');
        i.classList.add('fa-check');
        i.style.color = 'green';
        correctDiv.appendChild(i);
    }
    
    if (allCorrect) {
        totalPoints++;
    }
    
    submitAnswerButton.style.display = 'none';
    nextQuestion.style.display = 'block';
    
    answer01Div.removeEventListener('click', multiAnswerClickHandler);
    answer02Div.removeEventListener('click', multiAnswerClickHandler);
    answer03Div.removeEventListener('click', multiAnswerClickHandler);
    answer04Div.removeEventListener('click', multiAnswerClickHandler);
}

function multiAnswerClickHandler(event) {
    const answerId = event.currentTarget.id;
    const index = selectedAnswers.indexOf(answerId);
    
    if (index === -1) {
        selectedAnswers.push(answerId);
        event.currentTarget.classList.add('selected-answer');
    } else {
        selectedAnswers.splice(index, 1);
        event.currentTarget.classList.remove('selected-answer');
    }
}

function submitAnswerHandler() {
    if (currentQuiz === 'JS') {
        if (currentQuestion === 5) {
            markMultipleAnswers(selectedAnswers, [answer01Div, answer02Div]);
        } else if (currentQuestion === 7) {
            markMultipleAnswers(selectedAnswers, [answer01Div, answer02Div, answer03Div]);
        }
    } else if (currentQuiz === 'C#') {
        if (currentQuestion === 5) {
            markMultipleAnswers(selectedAnswers, [answer01Div, answer03Div, answer04Div]);
        } else if (currentQuestion === 8) {
            markMultipleAnswers(selectedAnswers, [answer01Div, answer02Div]);
        }
    } else if (currentQuiz === 'Python') {
        if (currentQuestion === 3) {
            markMultipleAnswers(selectedAnswers, [answer01Div, answer02Div]);
        } else if (currentQuestion === 7) {
            markMultipleAnswers(selectedAnswers, [answer02Div, answer03Div, answer04Div]);
        }
    } else if (currentQuiz === 'React') {
        if (currentQuestion === 4) {
            markMultipleAnswers(selectedAnswers, [answer01Div, answer03Div]);
        } else if (currentQuestion === 9) {
            markMultipleAnswers(selectedAnswers, [answer01Div, answer02Div, answer04Div]);
        }
    }
}

function checkIfAnswerIsTrueHandler(event) {
    let givenAnswerId = event.currentTarget.id;
    if (currentQuiz === 'JS') {
        if (currentQuestion === 1) {
            markRightAndWrongAnswer(givenAnswerId, answer04Div);
        } else if (currentQuestion === 2) {
            markRightAndWrongAnswer(givenAnswerId, answer03Div);
        } else if (currentQuestion === 3) {
            markRightAndWrongAnswer(givenAnswerId, answer01Div);
        } else if (currentQuestion === 4) {
            markRightAndWrongAnswer(givenAnswerId, answer03Div);
        } else if (currentQuestion === 6) {
            markRightAndWrongAnswer(givenAnswerId, answer04Div);
        } else if (currentQuestion === 8) {
            markRightAndWrongAnswer(givenAnswerId, answer01Div);
        } else if (currentQuestion === 9) {
            markRightAndWrongAnswer(givenAnswerId, answer02Div);
        } else if (currentQuestion === 10) {
            markRightAndWrongAnswer(givenAnswerId, answer03Div);
            nextQuestion.innerHTML = `Results &#10095;`
        }
    } else if (currentQuiz === 'C#') {
        if (currentQuestion === 1) {
            markRightAndWrongAnswer(givenAnswerId, answer02Div);
        } else if (currentQuestion === 2) {
            markRightAndWrongAnswer(givenAnswerId, answer04Div);
        } else if (currentQuestion === 3) {
            markRightAndWrongAnswer(givenAnswerId, answer02Div);
        } else if (currentQuestion === 4) {
            markRightAndWrongAnswer(givenAnswerId, answer01Div);
        } else if (currentQuestion === 6) {
            markRightAndWrongAnswer(givenAnswerId, answer03Div);
        } else if (currentQuestion === 7) {
            markRightAndWrongAnswer(givenAnswerId, answer02Div);
        } else if (currentQuestion === 9) {
            markRightAndWrongAnswer(givenAnswerId, answer04Div);
        } else if (currentQuestion === 10) {
            markRightAndWrongAnswer(givenAnswerId, answer03Div);
            nextQuestion.innerHTML = `Results &#10095;`
        }
    } else if (currentQuiz === 'Python') {
        if (currentQuestion === 1) {
            markRightAndWrongAnswer(givenAnswerId, answer01Div);
        } else if (currentQuestion === 2) {
            markRightAndWrongAnswer(givenAnswerId, answer03Div);
        } else if (currentQuestion === 4) {
            markRightAndWrongAnswer(givenAnswerId, answer02Div);
        } else if (currentQuestion === 5) {
            markRightAndWrongAnswer(givenAnswerId, answer04Div);
        } else if (currentQuestion === 6) {
            markRightAndWrongAnswer(givenAnswerId, answer01Div);
        } else if (currentQuestion === 8) {
            markRightAndWrongAnswer(givenAnswerId, answer03Div);
        } else if (currentQuestion === 9) {
            markRightAndWrongAnswer(givenAnswerId, answer02Div);
        } else if (currentQuestion === 10) {
            markRightAndWrongAnswer(givenAnswerId, answer04Div);
            nextQuestion.innerHTML = `Results &#10095;`
        }
    } else if (currentQuiz === 'React') {
        if (currentQuestion === 1) {
            markRightAndWrongAnswer(givenAnswerId, answer02Div);
        } else if (currentQuestion === 2) {
            markRightAndWrongAnswer(givenAnswerId, answer01Div);
        } else if (currentQuestion === 3) {
            markRightAndWrongAnswer(givenAnswerId, answer04Div);
        } else if (currentQuestion === 5) {
            markRightAndWrongAnswer(givenAnswerId, answer03Div);
        } else if (currentQuestion === 6) {
            markRightAndWrongAnswer(givenAnswerId, answer02Div);
        } else if (currentQuestion === 7) {
            markRightAndWrongAnswer(givenAnswerId, answer04Div);
        } else if (currentQuestion === 8) {
            markRightAndWrongAnswer(givenAnswerId, answer01Div);
        } else if (currentQuestion === 10) {
            markRightAndWrongAnswer(givenAnswerId, answer03Div);
            nextQuestion.innerHTML = `Results &#10095;`
        }
    }
}

function loadNextQuestionHandler() {
    currentQuestion++;
    nextQuestion.style.display = 'none';
    if (currentQuestion > 10) {
        container.textContent = '';
        let subContainer = document.createElement('div');
        subContainer.classList.add('subContainer');
        if (currentQuiz == 'JS') {
            let h2 = document.createElement('h2');
            h2.textContent = 'You\'ve completed the JS quiz!'
            h2.style.textAlign = 'center';
            subContainer.appendChild(h2);
        } else if (currentQuiz == 'C#') {
            let h2 = document.createElement('h2');
            h2.textContent = 'You\'ve completed the C# quiz!'
            h2.style.textAlign = 'center';
            subContainer.appendChild(h2);
        } else if (currentQuiz == 'Python') {
            let h2 = document.createElement('h2');
            h2.textContent = 'You\'ve completed the Python quiz!'
            h2.style.textAlign = 'center';
            subContainer.appendChild(h2);
        } else if (currentQuiz == 'React') {
            let h2 = document.createElement('h2');
            h2.textContent = 'You\'ve completed the React quiz!'
            h2.style.textAlign = 'center';
            subContainer.appendChild(h2);
        }
        let h3 = document.createElement('h3');
        h3.textContent = `You scored: ${totalPoints}/10`;
        h3.style.textAlign = 'center';
        let button = document.createElement('button');
        button.textContent = 'HOME';
        button.classList.add('homeBtn');
        let anchor = document.createElement('a');
        anchor.setAttribute('href', 'index.html');
        anchor.appendChild(button);
        subContainer.appendChild(h3);
        subContainer.appendChild(anchor);
        container.appendChild(subContainer);
        jsConfetti.addConfetti({
            confettiColors: ['cornflowerblue', 'coral', 'lightgreen', 'yellow', 'white', 'red', 'indigo', 'lightslategray'],
        });
    } else {
        loadQuestionAndAnswer(currentQuestion);
    }
}

function loadQuestionAndAnswer(currentQuestion) {
    selectedAnswers = [];
    isMultiAnswer = false;
    submitAnswerButton.style.display = 'none';
    
    for (let index = 0; index < allAnswerDivs.length; index++) {
        let currentDivChildren = allAnswerDivs[index].children;
        if (currentDivChildren.length > 1) {
            let child = currentDivChildren[1];
            allAnswerDivs[index].removeChild(child);
        }
        allAnswerDivs[index].classList.remove('selected-answer');
    }

    if (currentQuiz === 'JS') {
        if (currentQuestion === 1) {
            questionNumber.textContent = 'Question: 1/10';
            question.textContent = 'What is the correct way to initialize a variable with a value of 5 in JavaScript?';
            answer01Text.innerHTML = `<span style="color: #286ACB;">int</span> <span style="color: #9CDCFE;">myVariable</span> <span style="color: #D4D4D4;">=</span> <span style="color: #A7CEA8;">5</span><span style="color: #D4D4D4;">;</span>`;
            answer02Text.innerHTML = `<span style="color: #286ACB;">function</span> <span style="color: #9CDCFE;">myVariable</span> <span style="color: #D4D4D4;">=</span> <span style="color: #A7CEA8;">5</span><span style="color: #D4D4D4;">;</span>`;
            answer03Text.innerHTML = `<span style="color: #286ACB;">Integer</span> <span style="color: #9CDCFE;">myVariable</span> <span style="color: #D4D4D4;">=</span> <span style="color: #A7CEA8;">5</span><span style="color: #D4D4D4;">;</span>`;
            answer04Text.innerHTML = `<span style="color: #286ACB;">let</span> <span style="color: #9CDCFE;">myVariable</span> <span style="color: #D4D4D4;">=</span> <span style="color: #A7CEA8;">5</span><span style="color: #D4D4D4;">;</span>`;
        } else if (currentQuestion === 2) {
            questionNumber.textContent = 'Question: 2/10';
            question.textContent = 'Which of the following names used to be the name of JavaScript?';
            answer01Text.innerHTML = `Java`;
            answer02Text.innerHTML = `C#`;
            answer03Text.innerHTML = `LiveScript`;
            answer04Text.innerHTML = `DynamicScript`;
        } else if (currentQuestion === 3) {
            questionNumber.textContent = 'Question: 3/10';
            question.textContent = 'How to write \'I Love JS\' in an alert box?';
            answer01Text.innerHTML = `<span style="color: #DCDCAA;">alert</span><span style="color: #286ACB;">(</span><span style="color: #CE9178;">'I Love JS'</span><span style="color: #286ACB;">)</span><span style="color: #D4D4D4;">;</span>`;
            answer02Text.innerHTML = `<span style="color: #DCDCAA;">msg</span><span style="color: #286ACB;">(</span><span style="color: #CE9178;">'I Love JS'</span><span style="color: #286ACB;">)</span><span style="color: #D4D4D4;">;</span>`;
            answer03Text.innerHTML = `<span style="color: #9CDCFE;">console</span><span style="color: #D4D4D4;">.</span><span style="color: #DCDCAA;">log</span><span style="color: #286ACB;">(</span><span style="color: #CE9178;">'I Love JS'</span><span style="color: #286ACB;">)</span><span style="color: #D4D4D4;">;</span>`;
            answer04Text.innerHTML = `<span style="color: #DCDCAA;">alertBox</span><span style="color: #286ACB;">(</span><span style="color: #CE9178;">'I Love JS'</span><span style="color: #286ACB;">)</span><span style="color: #D4D4D4;">;</span>`;
        } else if (currentQuestion === 4) {
            questionNumber.textContent = 'Question: 4/10';
            question.textContent = 'How to write an IF statement for executing some code if \'myNum\' is NOT equal to 18?';
            answer01Text.innerHTML = `<span style="color: #C586C0;">if</span> <span style="color: #286ACB;">(</span><span style="color: #9CDCFE;">myNum</span> <span style="color: #D4D4D4;">\<\></span> <span style="color: #A7CEA8;">18</span><span style="color: #286ACB;">)</span>`;
            answer02Text.innerHTML = `<span style="color: #C586C0;">if</span> <span style="color: #9CDCFE;">myNum</span> <span style="color: #D4D4D4;">\<\></span> <span style="color: #A7CEA8;">18</span>`;
            answer03Text.innerHTML = `<span style="color: #C586C0;">if</span> <span style="color: #286ACB;">(</span><span style="color: #9CDCFE;">myNum</span> <span style="color: #D4D4D4;">!==</span> <span style="color: #A7CEA8;">18</span><span style="color: #286ACB;">)</span>`;
            answer04Text.innerHTML = `<span style="color: #C586C0;">if</span> <span style="color: #286ACB;">(</span><span style="color: #9CDCFE;">myNum</span> <span style="color: #D4D4D4;">/==</span> <span style="color: #A7CEA8;">18</span><span style="color: #286ACB;">)</span>`;
        } else if (currentQuestion === 5) {
            isMultiAnswer = true;
            questionNumber.textContent = 'Question: 5/10 (Select all that apply)';
            question.textContent = 'Which of the following are valid ways to write a comment in JavaScript? (Select all correct answers)';
            answer01Text.textContent = `/* This is a comment */`;
            answer01Text.style.color = '#659955';
            answer02Text.innerHTML = `<span style="color: #659955;">//This is a comment</span>`;
            answer03Text.innerHTML = `<span style="color: #659955;">#This is a comment</span>`;
            answer04Text.innerHTML = `<span style="color: #659955;">--This is a comment</span>`;
        } else if (currentQuestion === 6) {
            answer01Text.style.color = 'white';
            questionNumber.textContent = 'Question: 6/10';
            question.textContent = 'Which event occurs when the user clicks on an HTML element?';
            answer01Text.innerHTML = `<span style="color: #DCDCAA;">onmouseover</span>`;
            answer02Text.innerHTML = `<span style="color: #DCDCAA;">onchange</span>`;
            answer03Text.innerHTML = `<span style="color: #DCDCAA;">onblur</span>`;
            answer04Text.innerHTML = `<span style="color: #DCDCAA;">onclick</span>`;
        } else if (currentQuestion === 7) {
            isMultiAnswer = true;
            questionNumber.textContent = 'Question: 7/10 (Select all that apply)';
            question.textContent = 'Which of the following are true about JavaScript? (Select all correct answers)';
            answer01Text.innerHTML = `JavaScript is not the same as Java`;
            answer02Text.innerHTML = `JavaScript is a programming language`;
            answer03Text.innerHTML = `JavaScript can be used for both Front-End and Back-End`;
            answer04Text.innerHTML = `JavaScript was created by Microsoft`;
        } else if (currentQuestion === 8) {
            questionNumber.textContent = 'Question: 8/10';
            question.textContent = 'How to get an element with id="container" using DOM?';
            answer01Text.innerHTML = `<span style="color: #9CDCFE;">document</span><span style="color: #D4D4D4;">.</span style="color: #9CDCFE;"><span style="color: #DCDCAA;">getElementById</span><span style="color: #286ACB;">(</span><span style="color: #CE9178;">'container'</span><span style="color: #286ACB;">)</span><span style="color: #D4D4D4;">;</span>`;
            answer02Text.innerHTML = `<span style="color: #9CDCFE;">document</span><span style="color: #D4D4D4;">.</span style="color: #9CDCFE;"><span style="color: #DCDCAA;">getElementByIdentifier</span><span style="color: #286ACB;">(</span><span style="color: #CE9178;">'container'</span><span style="color: #286ACB;">)</span><span style="color: #D4D4D4;">;</span>`;
            answer03Text.innerHTML = `<span style="color: #9CDCFE;">document</span><span style="color: #D4D4D4;">.</span style="color: #9CDCFE;"><span style="color: #DCDCAA;">querySelector</span><span style="color: #286ACB;">(</span><span style="color: #CE9178;">'container'</span><span style="color: #286ACB;">)</span><span style="color: #D4D4D4;">;</span>`;
            answer04Text.innerHTML = `<span style="color: #9CDCFE;">document</span><span style="color: #D4D4D4;">.</span style="color: #9CDCFE;"><span style="color: #DCDCAA;">getId</span><span style="color: #286ACB;">(</span><span style="color: #CE9178;">'container'</span><span style="color: #286ACB;">)</span><span style="color: #D4D4D4;">;</span>`;
        } else if (currentQuestion === 9) {
            questionNumber.textContent = 'Question: 9/10';
            question.textContent = 'How to call a function with name "myFunction"?';
            answer01Text.innerHTML = `<span style="color: #9CDCFE;">call</span> <span style="color: #DCDCAA;">myFunction</span><span style="color: #286ACB;">()</span><span style="color: #D4D4D4;">;</span>`;
            answer02Text.innerHTML = `<span style="color: #DCDCAA;">myFunction</span><span style="color: #286ACB;">()</span><span style="color: #D4D4D4;">;</span>`;
            answer03Text.innerHTML = `<span style="color: #9CDCFE;">invoke</span> <span style="color: #DCDCAA;">myFunction</span><span style="color: #286ACB;">()</span><span style="color: #D4D4D4;">;</span>`;
            answer04Text.innerHTML = `<span style="color: #286ACB;">function</span><span style="color: #D4D4D4;">.</span><span style="color: #DCDCAA;">myFunction</span><span style="color: #286ACB;">()</span><span style="color: #D4D4D4;">;</span>`;
        } else if (currentQuestion === 10) {
            questionNumber.textContent = 'Question: 10/10';
            question.textContent = 'Which of the following is an existing method when using an array in JavaScript?';
            answer01Text.innerHTML = `<span style="color: #D4D4D4;">.</span><span style="color: #DCDCAA;">any</span><span style="color: #286ACB;">()</span><span style="color: #D4D4D4;">;</span>`;
            answer02Text.innerHTML = `<span style="color: #D4D4D4;">.</span><span style="color: #DCDCAA;"><span>select</span><span style="color: #286ACB;">()</span><span style="color: #D4D4D4;">;</span>`;
            answer03Text.innerHTML = `<span style="color: #D4D4D4;">.</span><span style="color: #DCDCAA;">map</span><span style="color: #286ACB;">()</span><span style="color: #D4D4D4;">;</span>`;
            answer04Text.innerHTML = `<span style="color: #D4D4D4;">.</span><span style="color: #DCDCAA;">where</span><span style="color: #286ACB;">()</span><span style="color: #D4D4D4;">;</span>`;
        }
    } else if (currentQuiz === 'C#') {
        if (currentQuestion === 1) {
            questionNumber.textContent = 'Question: 1/10';
            question.textContent = 'How to read input in C#?';
            answer01Text.innerHTML = `<span style="color: #4EC9B0;">Console</span><span style="color: #B4B4B4;">.</span><span style="color: #DCDCAA;">WriteLine</span><span style="color: #B4B4B4;">();</span>`;
            answer02Text.innerHTML = `<span style="color: #4EC9B0;">Console</span><span style="color: #B4B4B4;">.</span><span style="color: #DCDCAA;">ReadLine</span><span style="color: #B4B4B4;">();</span>`;
            answer03Text.innerHTML = `<span style="color: #4EC9B0;">Console</span><span style="color: #B4B4B4;">.</span><span style="color: #DCDCAA;">ReadInput</span><span style="color: #B4B4B4;">();</span>`;
            answer04Text.innerHTML = `<span style="color: #4EC9B0;">Console</span><span style="color: #B4B4B4;">.</span><span style="color: #DCDCAA;">Write</span><span style="color: #B4B4B4;">();</span>`;
        } else if (currentQuestion === 2) {
            questionNumber.textContent = 'Question: 2/10';
            question.textContent = 'Which company created C#?';
            answer01Text.innerHTML = `Oracle Corporation`;
            answer02Text.innerHTML = `Meta`;
            answer03Text.innerHTML = `Yahoo`;
            answer04Text.innerHTML = `Microsoft`;
        } else if (currentQuestion === 3) {
            questionNumber.textContent = 'Question: 3/10';
            question.textContent = 'How to initialize an array of 5 elements in C#?';
            answer01Text.innerHTML = `<span style="color: #569CD5;">int</span><span style="color: #B4B4B4;">[]</span> <span style="color: #9CDCFE;">array</span> <span style="color: #B4B4B4;">=</span> <span style="color: #569CD5;">int</span><span style="color: #B4B4B4;">[</span><span style="color: #B5CEA7;">5</span><span style="color: #B4B4B4;">];</span>`;
            answer02Text.innerHTML = `<span style="color: #569CD5;">int</span><span style="color: #B4B4B4;">[]</span> <span style="color: #9CDCFE;">array</span> <span style="color: #B4B4B4;">=</span> <span style="color: #569CD5;">new int</span><span style="color: #B4B4B4;">[</span><span style="color: #B5CEA7;">5</span><span style="color: #B4B4B4;">];</span>`;
            answer03Text.innerHTML = `<span style="color: #569CD5;">int</span> <span style="color: #9CDCFE;">array</span> <span style="color: #B4B4B4;">=</span> <span style="color: #569CD5;">new int</span><span style="color: #B4B4B4;">[</span><span style="color: #B5CEA7;">5</span><span style="color: #B4B4B4;">];</span>`;
            answer04Text.innerHTML = `<span style="color: #569CD5;">let</span><span style="color: #B4B4B4;">[]</span> <span style="color: #9CDCFE;">array</span> <span style="color: #B4B4B4;">=</span> <span style="color: #569CD5;">new int</span><span style="color: #B4B4B4;">[</span><span style="color: #B5CEA7;">5</span><span style="color: #B4B4B4;">];</span>`;
        } else if (currentQuestion === 4) {
            questionNumber.textContent = 'Question: 4/10';
            question.textContent = 'How to add a new element with a value of 10 in a list in C#?';
            answer01Text.innerHTML = `<span style="color: #9CDCFE;">list</span><span style="color: #B4B4B4;">.</span><span style="color: #DCDCAA;">Add</span><span style="color: #B4B4B4;">(</span><span style="color: #B5CEA7;">10</span><span style="color: #B4B4B4;">);</span>`;
            answer02Text.innerHTML = `<span style="color: #9CDCFE;">list</span><span style="color: #B4B4B4;">.</span><span style="color: #DCDCAA;">AddItem</span><span style="color: #B4B4B4;">(</span><span style="color: #B5CEA7;">10</span><span style="color: #B4B4B4;">);</span>`;
            answer03Text.innerHTML = `<span style="color: #9CDCFE;">list</span><span style="color: #B4B4B4;">.</span><span style="color: #DCDCAA;">Push</span><span style="color: #B4B4B4;">(</span><span style="color: #B5CEA7;">10</span><span style="color: #B4B4B4;">);</span>`;
            answer04Text.innerHTML = `<span style="color: #9CDCFE;">list</span><span style="color: #B4B4B4;">.</span><span style="color: #DCDCAA;">AddNew</span><span style="color: #B4B4B4;">(</span><span style="color: #B5CEA7;">10</span><span style="color: #B4B4B4;">);</span>`;
        } else if (currentQuestion === 5) {
            isMultiAnswer = true;
            questionNumber.textContent = 'Question: 5/10 (Select all that apply)';
            question.textContent = 'Which of the following can have "null" value in C#? (Select all correct answers)';
            answer01Text.textContent = `Objects`;
            answer02Text.innerHTML = `Value types like int, double without Nullable<T>`;
            answer03Text.innerHTML = `Strings`;
            answer04Text.innerHTML = `Reference types`;
        } else if (currentQuestion === 6) {
            questionNumber.textContent = 'Question: 6/10';
            question.textContent = 'Which one shows the right use of the ternary operator in C#?';
            answer01Text.innerHTML = `<span style="color: #569CD5;">bool</span> <span style="color: #9CDCFE;">isAdult</span> <span style="color: #B4B4B4;">=</span> <span style="color: #B5CEA7;">15</span> <span style="color: #B4B4B4;">?</span> <span style="color: #B5CEA7;">18</span> <span style="color: #B4B4B4;">=</span> <span style="color: #569CD5;">true</span> <span style="color: #B4B4B4;">:</span> <span style="color: #569CD5;">false</span><span style="color: #B4B4B4;">;</span>`;
            answer02Text.innerHTML = `<span style="color: #569CD5;">bool</span> <span style="color: #9CDCFE;">isAdult</span> <span style="color: #B4B4B4;">=</span> <span style="color: #B5CEA7;">15</span> <span style="color: #B4B4B4;">>=</span> <span style="color: #B5CEA7;">18</span> <span style="color: #B4B4B4;">??</span> <span style="color: #569CD5;">true</span> <span style="color: #B4B4B4;">:</span> <span style="color: #569CD5;">false</span><span style="color: #B4B4B4;">;</span>`;
            answer03Text.innerHTML = `<span style="color: #569CD5;">bool</span> <span style="color: #9CDCFE;">isAdult</span> <span style="color: #B4B4B4;">=</span> <span style="color: #B5CEA7;">15</span> <span style="color: #B4B4B4;">>=</span> <span style="color: #B5CEA7;">18</span> <span style="color: #B4B4B4;">?</span> <span style="color: #569CD5;">true</span> <span style="color: #B4B4B4;">:</span> <span style="color: #569CD5;">false</span><span style="color: #B4B4B4;">;</span>`;
            answer04Text.innerHTML = `<span style="color: #569CD5;">bool</span> <span style="color: #9CDCFE;">isAdult</span> <span style="color: #B4B4B4;">=</span> <span style="color: #B5CEA7;">15</span> <span style="color: #B4B4B4;">>=</span> <span style="color: #B5CEA7;">18</span> <span style="color: #B4B4B4;">:</span> <span style="color: #569CD5;">true</span> <span style="color: #B4B4B4;">?</span> <span style="color: #569CD5;">false</span><span style="color: #B4B4B4;">;</span>`;
        } else if (currentQuestion === 7) {
            questionNumber.textContent = 'Question: 7/10';
            question.textContent = 'Which of the following is a valid access modifier in C#?';
            answer01Text.innerHTML = `<span style="color: #569CD5;">default</span>`;
            answer02Text.innerHTML = `<span style="color: #569CD5;">public</span>`;
            answer03Text.innerHTML = `<span style="color: #569CD5;">partly</span>`;
            answer04Text.innerHTML = `<span style="color: #569CD5;">protector</span>`;
        } else if (currentQuestion === 8) {
            isMultiAnswer = true;
            questionNumber.textContent = 'Question: 8/10 (Select all that apply)';
            question.textContent = 'Which of the following are true about C#? (Select all correct answers)';
            answer01Text.innerHTML = `High-level language`;
            answer02Text.innerHTML = `Statically-typed language`;
            answer03Text.innerHTML = `Dynamically-typed language`;
            answer04Text.innerHTML = `Low-level language`;
        } else if (currentQuestion === 9) {
            questionNumber.textContent = 'Question: 9/10';
            question.textContent = 'Which data type should be used to store in a variable the value "Mike"?';
            answer01Text.innerHTML = `<span style="color: #569CD5;">double</span> <span style="color: #9CDCFE;">name</span> <span style="color: #B4B4B4;">=</span> <span style="color: #CE9178;">"Mike"</span><span style="color: #B4B4B4;">;</span>`;
            answer02Text.innerHTML = `<span style="color: #569CD5;">char</span> <span style="color: #9CDCFE;">name</span> <span style="color: #B4B4B4;">=</span> <span style="color: #CE9178;">"Mike"</span><span style="color: #B4B4B4;">;</span>`;
            answer03Text.innerHTML = `<span style="color: #569CD5;">int</span> <span style="color: #9CDCFE;">name</span> <span style="color: #B4B4B4;">=</span> <span style="color: #CE9178;">"Mike"</span><span style="color: #B4B4B4;">;</span>`;
            answer04Text.innerHTML = `<span style="color: #569CD5;">string</span> <span style="color: #9CDCFE;">name</span> <span style="color: #B4B4B4;">=</span> <span style="color: #CE9178;">"Mike"</span><span style="color: #B4B4B4;">;</span>`;
        } else if (currentQuestion === 10) {
            questionNumber.textContent = 'Question: 10/10';
            question.textContent = 'Which keyword is used to return a value inside a method in C#?';
            answer01Text.innerHTML = `<span style="color: #D8A0DF;">break</span>`;
            answer02Text.innerHTML = `<span style="color: #569CD5;">get</span>`;
            answer03Text.innerHTML = `<span style="color: #D8A0DF;">return</span>`;
            answer04Text.innerHTML = `<span style="color: #569CD5;">void</span>`;
        }
    } else if (currentQuiz === 'Python') {
        if (currentQuestion === 1) {
            questionNumber.textContent = 'Question: 1/10';
            question.textContent = 'What symbol is used for single line comments in Python?';
            answer01Text.innerHTML = `<span style="color: #6A9955;">#</span>`;
            answer02Text.innerHTML = `<span style="color: #6A9955;">//</span>`;
            answer03Text.innerHTML = `<span style="color: #6A9955;">/* */</span>`;
            answer04Text.innerHTML = `<span style="color: #6A9955;">--</span>`;
        } else if (currentQuestion === 2) {
            questionNumber.textContent = 'Question: 2/10';
            question.textContent = 'Which function is used to get the length of a list in Python?';
            answer01Text.innerHTML = `<span style="color: #DCDCAA;">size</span><span style="color: #D4D4D4;">(</span><span style="color: #9CDCFE;">my_list</span><span style="color: #D4D4D4;">)</span>`;
            answer02Text.innerHTML = `<span style="color: #9CDCFE;">my_list</span><span style="color: #D4D4D4;">.</span><span style="color: #DCDCAA;">length</span><span style="color: #D4D4D4;">()</span>`;
            answer03Text.innerHTML = `<span style="color: #DCDCAA;">len</span><span style="color: #D4D4D4;">(</span><span style="color: #9CDCFE;">my_list</span><span style="color: #D4D4D4;">)</span>`;
            answer04Text.innerHTML = `<span style="color: #9CDCFE;">my_list</span><span style="color: #D4D4D4;">.</span><span style="color: #DCDCAA;">size</span><span style="color: #D4D4D4;">()</span>`;
        } else if (currentQuestion === 3) {
            isMultiAnswer = true;
            questionNumber.textContent = 'Question: 3/10 (Select all that apply)';
            question.textContent = 'Which of the following are valid ways to create a list in Python? (Select all correct answers)';
            answer01Text.innerHTML = `<span style="color: #9CDCFE;">my_list</span> <span style="color: #D4D4D4;">=</span> <span style="color: #D4D4D4;">[</span><span style="color: #A7CEA8;">1</span><span style="color: #D4D4D4;">,</span> <span style="color: #A7CEA8;">2</span><span style="color: #D4D4D4;">,</span> <span style="color: #A7CEA8;">3</span><span style="color: #D4D4D4;">]</span>`;
            answer02Text.innerHTML = `<span style="color: #9CDCFE;">my_list</span> <span style="color: #D4D4D4;">=</span> <span style="color: #DCDCAA;">list</span><span style="color: #D4D4D4;">()</span>`;
            answer03Text.innerHTML = `<span style="color: #9CDCFE;">my_list</span> <span style="color: #D4D4D4;">=</span> <span style="color: #DCDCAA;">array</span><span style="color: #D4D4D4;">(</span><span style="color: #A7CEA8;">1</span><span style="color: #D4D4D4;">,</span> <span style="color: #A7CEA8;">2</span><span style="color: #D4D4D4;">,</span> <span style="color: #A7CEA8;">3</span><span style="color: #D4D4D4;">)</span>`;
            answer04Text.innerHTML = `<span style="color: #9CDCFE;">my_list</span> <span style="color: #D4D4D4;">=</span> <span style="color: #DCDCAA;">new</span> <span style="color: #DCDCAA;">List</span><span style="color: #D4D4D4;">()</span>`;
        } else if (currentQuestion === 4) {
            questionNumber.textContent = 'Question: 4/10';
            question.textContent = 'How do you create a virtual environment in Python?';
            answer01Text.innerHTML = `<span style="color: #DCDCAA;">pip</span> <span style="color: #CE9178;">install</span> <span style="color: #CE9178;">virtualenv</span>`;
            answer02Text.innerHTML = `<span style="color: #DCDCAA;">python</span> <span style="color: #D4D4D4;">-</span><span style="color: #CE9178;">m</span> <span style="color: #CE9178;">venv</span> <span style="color: #CE9178;">myenv</span>`;
            answer03Text.innerHTML = `<span style="color: #DCDCAA;">venv</span> <span style="color: #CE9178;">create</span> <span style="color: #CE9178;">myenv</span>`;
            answer04Text.innerHTML = `<span style="color: #DCDCAA;">create</span> <span style="color: #CE9178;">env</span> <span style="color: #CE9178;">myenv</span>`;
        } else if (currentQuestion === 5) {
            questionNumber.textContent = 'Question: 5/10';
            question.textContent = 'What does PEP 8 refer to in Python?';
            answer01Text.innerHTML = `A Python Enhancement Process version 8`;
            answer02Text.innerHTML = `A Python Enhancement Proposal for error handling`;
            answer03Text.innerHTML = `A Python Enterprise Platform version 8`;
            answer04Text.innerHTML = `A Python style guide for code`;
        } else if (currentQuestion === 6) {
            questionNumber.textContent = 'Question: 6/10';
            question.textContent = 'What is the correct way to define a function in Python?';
            answer01Text.innerHTML = `<span style="color: #C586C0;">def</span> <span style="color: #DCDCAA;">my_function</span><span style="color: #D4D4D4;">(</span><span style="color: #D4D4D4;">)</span><span style="color: #D4D4D4;">:</span>`;
            answer02Text.innerHTML = `<span style="color: #C586C0;">function</span> <span style="color: #DCDCAA;">my_function</span><span style="color: #D4D4D4;">(</span><span style="color: #D4D4D4;">)</span><span style="color: #D4D4D4;">:</span>`;
            answer03Text.innerHTML = `<span style="color: #C586C0;">define</span> <span style="color: #DCDCAA;">my_function</span><span style="color: #D4D4D4;">(</span><span style="color: #D4D4D4;">)</span><span style="color: #D4D4D4;">:</span>`;
            answer04Text.innerHTML = `<span style="color: #C586C0;">func</span> <span style="color: #DCDCAA;">my_function</span><span style="color: #D4D4D4;">(</span><span style="color: #D4D4D4;">)</span><span style="color: #D4D4D4;">:</span>`;
        } else if (currentQuestion === 7) {
            isMultiAnswer = true;
            questionNumber.textContent = 'Question: 7/10 (Select all that apply)';
            question.textContent = 'Which of the following are built-in data types in Python? (Select all correct answers)';
            answer01Text.innerHTML = `array`;
            answer02Text.innerHTML = `dict`;
            answer03Text.innerHTML = `tuple`;
            answer04Text.innerHTML = `set`;
        } else if (currentQuestion === 8) {
            questionNumber.textContent = 'Question: 8/10';
            question.textContent = 'What does the "self" parameter refer to in a Python class method?';
            answer01Text.innerHTML = `It refers to the parent class`;
            answer02Text.innerHTML = `It refers to the entire Python module`;
            answer03Text.innerHTML = `It refers to the instance of the class`;
            answer04Text.innerHTML = `It's an optional parameter for documentation`;
        } else if (currentQuestion === 9) {
            questionNumber.textContent = 'Question: 9/10';
            question.textContent = 'Which of these is the correct way to open a file in Python?';
            answer01Text.innerHTML = `<span style="color: #9CDCFE;">file</span> <span style="color: #D4D4D4;">=</span> <span style="color: #DCDCAA;">File</span><span style="color: #D4D4D4;">(</span><span style="color: #CE9178;">"file.txt"</span><span style="color: #D4D4D4;">,</span> <span style="color: #CE9178;">"r"</span><span style="color: #D4D4D4;">)</span>`;
            answer02Text.innerHTML = `<span style="color: #9CDCFE;">file</span> <span style="color: #D4D4D4;">=</span> <span style="color: #DCDCAA;">open</span><span style="color: #D4D4D4;">(</span><span style="color: #CE9178;">"file.txt"</span><span style="color: #D4D4D4;">,</span> <span style="color: #CE9178;">"r"</span><span style="color: #D4D4D4;">)</span>`;
            answer03Text.innerHTML = `<span style="color: #9CDCFE;">file</span> <span style="color: #D4D4D4;">=</span> <span style="color: #DCDCAA;">read</span><span style="color: #D4D4D4;">(</span><span style="color: #CE9178;">"file.txt"</span><span style="color: #D4D4D4;">)</span>`;
            answer04Text.innerHTML = `<span style="color: #9CDCFE;">file</span> <span style="color: #D4D4D4;">=</span> <span style="color: #DCDCAA;">fileOpen</span><span style="color: #D4D4D4;">(</span><span style="color: #CE9178;">"file.txt"</span><span style="color: #D4D4D4;">)</span>`;
        } else if (currentQuestion === 10) {
            questionNumber.textContent = 'Question: 10/10';
            question.textContent = 'Which of the following is a popular Python web framework?';
            answer01Text.innerHTML = `Express.js`;
            answer02Text.innerHTML = `Ruby on Rails`;
            answer03Text.innerHTML = `ASP.NET`;
            answer04Text.innerHTML = `Django`;
        }
    } else if (currentQuiz === 'React') {
        if (currentQuestion === 1) {
            questionNumber.textContent = 'Question: 1/10';
            question.textContent = 'Who created React.js?';
            answer01Text.innerHTML = `Google`;
            answer02Text.innerHTML = `Facebook (Meta)`;
            answer03Text.innerHTML = `Microsoft`;
            answer04Text.innerHTML = `Amazon`;
        } else if (currentQuestion === 2) {
            questionNumber.textContent = 'Question: 2/10';
            question.textContent = 'What do you use to pass data to a component from outside?';
            answer01Text.innerHTML = `Props`;
            answer02Text.innerHTML = `setState`;
            answer03Text.innerHTML = `PropTypes`;
            answer04Text.innerHTML = `Render with arguments`;
        } else if (currentQuestion === 3) {
            questionNumber.textContent = 'Question: 3/10';
            question.textContent = 'Which method is called before a component mounts?';
            answer01Text.innerHTML = `componentWillMount() (legacy)`;
            answer02Text.innerHTML = `onBeforeMount()`;
            answer03Text.innerHTML = `beforeMount()`;
            answer04Text.innerHTML = `constructor()`;
        } else if (currentQuestion === 4) {
            isMultiAnswer = true;
            questionNumber.textContent = 'Question: 4/10 (Select all that apply)';
            question.textContent = 'Which hooks are part of React? (Select all correct answers)';
            answer01Text.innerHTML = `useState`;
            answer02Text.innerHTML = `useChange`;
            answer03Text.innerHTML = `useEffect`;
            answer04Text.innerHTML = `useData`;
        } else if (currentQuestion === 5) {
            questionNumber.textContent = 'Question: 5/10';
            question.textContent = 'What is the correct way to update state in a React component?';
            answer01Text.innerHTML = `<span style="color: #DCDCAA;">setState</span><span style="color: #D4D4D4;">-</span><span style="color: #A7CEA8;">5</span><span style="color: #D4D4D4;">;</span>`;
            answer02Text.innerHTML = `<span style="color: #DCDCAA;">setState</span><span style="color: #D4D4D4;">:</span><span style="color: #A7CEA8;">5</span><span style="color: #D4D4D4;">;</span>`;
            answer03Text.innerHTML = `<span style="color: #DCDCAA;">setState</span><span style="color: #D4D4D4;">(</span><span style="color: #A7CEA8;">5</span><span style="color: #D4D4D4;">);</span>`;
            answer04Text.innerHTML = `<span style="color: #DCDCAA;">setState</span><span style="color: #D4D4D4;">(</span><span style="color: #9CDCFE;">this</span><span style="color: #D4D4D4;">);</span>`;
        } else if (currentQuestion === 6) {
            questionNumber.textContent = 'Question: 6/10';
            question.textContent = 'What is JSX in React?';
            answer01Text.innerHTML = `A database for React`;
            answer02Text.innerHTML = `A syntax extension for JavaScript`;
            answer03Text.innerHTML = `A styling library`;
            answer04Text.innerHTML = `JavaScript XML API`;
        } else if (currentQuestion === 7) {
            questionNumber.textContent = 'Question: 7/10';
            question.textContent = 'What tool is commonly used to create a new React application?';
            answer01Text.innerHTML = `react-generator`;
            answer02Text.innerHTML = `react-starter`;
            answer03Text.innerHTML = `react-factory`;
            answer04Text.innerHTML = `create-react-app`;
        } else if (currentQuestion === 8) {
            questionNumber.textContent = 'Question: 8/10';
            question.textContent = 'Which of the following is used to keep track of state across the entire app?';
            answer01Text.innerHTML = `Redux`;
            answer02Text.innerHTML = `Local Storage`;
            answer03Text.innerHTML = `Cookies`;
            answer04Text.innerHTML = `React Cache`;
        } else if (currentQuestion === 9) {
            isMultiAnswer = true;
            questionNumber.textContent = 'Question: 9/10 (Select all that apply)';
            question.textContent = 'Which of these are React component lifecycle phases? (Select all correct answers)';
            answer01Text.innerHTML = `Mounting`;
            answer02Text.innerHTML = `Updating`;
            answer03Text.innerHTML = `Refreshing`;
            answer04Text.innerHTML = `Unmounting`;
        } else if (currentQuestion === 10) {
            questionNumber.textContent = 'Question: 10/10';
            question.textContent = 'Which of the following is NOT a feature of React?';
            answer01Text.innerHTML = `Virtual DOM`;
            answer02Text.innerHTML = `Component-based architecture`;
            answer03Text.innerHTML = `Built-in backend capabilities`;
            answer04Text.innerHTML = `One-way data binding`;
        }
    }

    if (isMultiAnswer) {
        answer01Div.addEventListener('click', multiAnswerClickHandler);
        answer02Div.addEventListener('click', multiAnswerClickHandler);
        answer03Div.addEventListener('click', multiAnswerClickHandler);
        answer04Div.addEventListener('click', multiAnswerClickHandler);
        submitAnswerButton.style.display = 'block';
    } else {
        answer01Div.addEventListener('click', checkIfAnswerIsTrueHandler);
        answer02Div.addEventListener('click', checkIfAnswerIsTrueHandler);
        answer03Div.addEventListener('click', checkIfAnswerIsTrueHandler);
        answer04Div.addEventListener('click', checkIfAnswerIsTrueHandler);
    }
}

submitAnswerButton.addEventListener('click', submitAnswerHandler);

