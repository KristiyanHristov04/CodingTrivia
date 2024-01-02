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

const jsAnimation = document.getElementsByClassName('js')[0];
const csharpAnimation = document.getElementsByClassName('C#')[0];

let currentQuiz = '';

const nextQuestionButton = document.getElementById('nextQuestion');

let totalPoints = 0;
let currentQuestion = 1;

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
        } else if (currentQuestion === 5) {
            markRightAndWrongAnswer(givenAnswerId, answer02Div);
        } else if (currentQuestion === 6) {
            markRightAndWrongAnswer(givenAnswerId, answer04Div);
        } else if (currentQuestion === 7) {
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
        } else if (currentQuestion === 5) {
            markRightAndWrongAnswer(givenAnswerId, answer04Div);
        } else if (currentQuestion === 6) {
            markRightAndWrongAnswer(givenAnswerId, answer03Div);
        } else if (currentQuestion === 7) {
            markRightAndWrongAnswer(givenAnswerId, answer02Div);
        } else if (currentQuestion === 8) {
            markRightAndWrongAnswer(givenAnswerId, answer01Div);
        } else if (currentQuestion === 9) {
            markRightAndWrongAnswer(givenAnswerId, answer04Div);
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
        } else {
            let h2 = document.createElement('h2');
            h2.textContent = 'You\'ve completed the C# quiz!'
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
    for (let index = 0; index < allAnswerDivs.length; index++) {
        let currentDivChildren = allAnswerDivs[index].children;
        if (currentDivChildren.length > 1) {
            let child = currentDivChildren[1];
            allAnswerDivs[index].removeChild(child);
        }
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
            questionNumber.textContent = 'Question: 5/10';
            question.textContent = 'How to write a comment in JavaScript?';
            answer01Text.textContent = `<!--This is a comment-->`;
            answer01Text.style.color = '#659955';
            answer02Text.innerHTML = `<span style="color: #659955;">//This is a comment</span>`;
            answer03Text.innerHTML = `<span style="color: #659955;;">#This is a comment</span>`;
            answer04Text.innerHTML = `<span style="color: #659955;;">--This is a comment</span>`;
        } else if (currentQuestion === 6) {
            answer01Text.style.color = 'white';
            questionNumber.textContent = 'Question: 6/10';
            question.textContent = 'Which event occurs when the user clicks on an HTML element?';
            answer01Text.innerHTML = `<span style="color: #DCDCAA;">onmouseover</span>`;
            answer02Text.innerHTML = `<span style="color: #DCDCAA;">onchange</span>`;
            answer03Text.innerHTML = `<span style="color: #DCDCAA;">onblur</span>`;
            answer04Text.innerHTML = `<span style="color: #DCDCAA;">onclick</span>`;
        } else if (currentQuestion === 7) {
            questionNumber.textContent = 'Question: 7/10';
            question.textContent = 'Which of the following is true about JavaScript?';
            answer01Text.innerHTML = `JavaScript is not the same as Java`;
            answer02Text.innerHTML = `JavaScript is a programming language`;
            answer03Text.innerHTML = `JavaScript can be used for both Front-End and Back-End`;
            answer04Text.innerHTML = `All of the above`;
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
            questionNumber.textContent = 'Question: 5/10';
            question.textContent = 'The "null" value in C# can be assign to?';
            answer01Text.textContent = `Objects`;
            answer02Text.innerHTML = `Collections`;
            answer03Text.innerHTML = `Strings`;
            answer04Text.innerHTML = `All of the above`;
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
            questionNumber.textContent = 'Question: 8/10';
            question.textContent = 'From what programming language level is C#?';
            answer01Text.innerHTML = `High-level language`;
            answer02Text.innerHTML = `Mid-level language`;
            answer03Text.innerHTML = `Low-level langauge`;
            answer04Text.innerHTML = `None of the above`;
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
    }

    answer01Div.addEventListener('click', checkIfAnswerIsTrueHandler);
    answer02Div.addEventListener('click', checkIfAnswerIsTrueHandler);
    answer03Div.addEventListener('click', checkIfAnswerIsTrueHandler);
    answer04Div.addEventListener('click', checkIfAnswerIsTrueHandler);
}