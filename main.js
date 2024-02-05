// let elem = document.querySelector('.example')

// console.log(elem.offsetTop)
// console.log(elem.offsetLeft)

// console.log(elem.clientTop)
// console.log(elem.clientLeft)

// console.log(elem.offsetWidth)
// console.log(elem.clientWidth)

// console.log(elem.clientHeight)
// console.log(elem.offsetHeight)

// console.log(elem.scrollTop)
// console.log(elem.scrollHeight)

// console.log(elem.offsetParent)

// console.log(elem.offsetWidth-elem.clientWidth-elem.clientLeft*2)

// elem.style.height = elem.scrollHeight + 'px'

// console.log(document.documentElement.clientHeight)

// console.log(document.documentElement.clientWidth)


// console.log(window.pageXOffset)
// elem.scrollTo(0,50)
// elem.scrollBy(0,100)


// function hello(){
//     alert('Hello')
// }

// let elem = document.querySelector('.btn2')
// // let input = document.querySelector('.input')
// // elem.onclick = hello
// function hello(){
//     alert('hello')
//     // console.log(input.value)
//     elem.removeEventListener('click', hello)
// }
// function change(text){
//     let state = confirm(text)
//     if (state){
//         document.querySelector('.btn3').innerHTML = 'helo'
//     }
// }

// elem.addEventListener('click', hello)
// elem.addEventListener('mouseover', () => console.log('mouseover'))

// elem.onclick = function (event){
//     console.log(event)
// }

// elem.addEventListener('click', (event) => console.log(event.type))
// elem.addEventListener('mouseover', (event) => console.log(event.type))
// elem.addEventListener('mouseout', (event) => console.log(event.type))


// let div = document.querySelector('.block')
// let ul = document.querySelector('.list')
// let li = document.querySelector('.item')

// div.addEventListener('click', (event) => console.log('div'))
// ul.addEventListener('click', (event) => {
//     console.log('ul');
//     event.stopPropagation()
// })
// li.addEventListener('click', (event) => {
//     console.log('li');
//     event.stopPropagation()
// })

// let elem = document.querySelector('.wrap')

// elem.addEventListener('click', (event) => {
//     let target = event.target;
//     if (target.classList.contain('.card')){
//         target.classList
//     }
// }
// )

// let elem = document.querySelector('.wrap')

// elem.addEventListener('click', (event) => {
//     let target = event.target;
//     if (target.closest('.card')){
//         target.closest('.card').classList.toggle('new')
//     }
// })

// let text = document.querySelector('.card_title')
// text.addEventListener('dblclick', (event) => {
//     let target = event.target;
//     if (target.classList.contains('.card_text')){
//         target.outerHTML = `<input class="card_text" value=${target.innerHTML}>`
//         console.log(target.innerHTML)
//     }
// })


// let ball = document.querySelector('.ball');
// let field = document.querySelector('.field');

// const fieldWidht = 1650;
// const fieldHeight = 950;

// document.addEventListener('mousemove', (event) => {
//     let x = event.clientX;
//     let y = event.clientY;

//     if (x < 0) {
//         x = 0;
//     } else if (x > fieldWidht) {
//         x = fieldWidht;
//     }

//     if (y < 0) {
//         y = 0;
//     } else if (y > fieldHeight) {
//         y = fieldHeight;
//     }

//     ball.style.left = x + 'px';
//     ball.style.top = y-100 + 'px';
// });

let ball = document.querySelector('.ball');
let field = document.querySelector('.field');
let goalLeft = document.querySelector('.goal-left');
let goalRight = document.querySelector('.goal-right');
let scoreLeftElement = document.getElementById('scoreLeft');
let scoreRightElement = document.getElementById('scoreRight');

const fieldWidth = 1650;
const fieldHeight = 950;

const ballRadius = 10;
const ballSpeed = 5;

let ballX = fieldWidth / 2;
let ballY = fieldHeight / 2;

let scoreLeft = 0;
let scoreRight = 0;

// перемешается, кликая мышкой
document.addEventListener('click', (event) => {
    let x = event.clientX;
    let y = event.clientY;

    if (x < ballRadius) {
        x = ballRadius;
    } else if (x > fieldWidth - ballRadius) {
        x = fieldWidth - ballRadius;
    }

    if (y < ballRadius) {
        y = ballRadius;
    } else if (y > fieldHeight - ballRadius) {
        y = fieldHeight - ballRadius;
    }

    ballX = x;
    ballY = y;

    checkGoal();
    moveBall();
});
// можно на клавиатуре( по стрелочкам)
document.addEventListener('keydown', (event) => {
    const speed = ballSpeed;

    switch (event.key) {
        case 'ArrowUp':
            ballY -= speed;
            break;
        case 'ArrowDown':
            ballY += speed;
            break;
        case 'ArrowLeft':
            ballX -= speed;
            break;
        case 'ArrowRight':
            ballX += speed;
            break;
    }

    if (ballX < ballRadius) {
        ballX = ballRadius;
    } else if (ballX > fieldWidth - ballRadius) {
        ballX = fieldWidth - ballRadius;
    }

    if (ballY < ballRadius) {
        ballY = ballRadius;
    } else if (ballY > fieldHeight - ballRadius) {
        ballY = fieldHeight - ballRadius;
    }

    checkGoal();
    moveBall();
});
// следует за мышкой
document.addEventListener('mousemove', (event) => {
    let x = event.clientX;
    let y = event.clientY;

    if (x < ballRadius) {
        x = ballRadius;
    } else if (x > fieldWidth - ballRadius) {
        x = fieldWidth - ballRadius;
    }

    if (y < ballRadius) {
        y = ballRadius;
    } else if (y > fieldHeight - ballRadius) {
        y = fieldHeight - ballRadius;
    }

    ballX = x;
    ballY = y;

    moveBall();
});

function moveBall() {
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
}

// есть счет, криво работает, но нажимая на ворота начисляется балл, работает с двух сторон, до 3 побед
function checkGoal() {
    if (
        (ballX - ballRadius <= goalLeft.getBoundingClientRect().right && ballY >= goalLeft.getBoundingClientRect().top && ballY <= goalLeft.getBoundingClientRect().bottom) ||
        (ballX + ballRadius >= goalRight.getBoundingClientRect().left && ballY >= goalRight.getBoundingClientRect().top && ballY <= goalRight.getBoundingClientRect().bottom)
    ) {
        if (ballX - ballRadius <= goalLeft.getBoundingClientRect().right) {
            scoreRight++;
        } else {
            scoreLeft++;
        }

        resetBall();
        updateScore();
        checkGameEnd();
    }
}

function resetBall() {
    ballX = fieldWidth / 2;
    ballY = fieldHeight / 2;
}

function updateScore() {
    scoreLeftElement.textContent = scoreLeft;
    scoreRightElement.textContent = scoreRight;
}

function checkGameEnd() {
    if (scoreLeft === 3 || scoreRight === 3) {
        alert(`игра окончена! ${scoreLeft > scoreRight ? 'красные' : 'синие'} побеждают!`);
        scoreLeft = 0;
        scoreRight = 0;
        updateScore();
    }
}





