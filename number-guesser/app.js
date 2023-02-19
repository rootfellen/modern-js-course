// GENERATE RANDOM NUMBER FROM 1 TO 10; DONE
// CHECK IF USER INPUT IS VALID IN A RANGE FROM 1 TO 10
// CHECK IF USERS INPUT MATCHED WITH GENERATED NUMBER DONE
// IF NOT MATCHED, REDUCE ONE ATEMPT FROM 3
// DISPLAY CONDITIONALLY RESULT 


//UI
let min = 1;
let max = 10; 
const message = document.querySelector('.message');
const wrapper = document.querySelector(".wrapper");
const container = document.querySelector(".container")
document.querySelector(".min").textContent = min;
document.querySelector(".max").textContent = max;


// INPUT & SUBMIT
const usersInput = document.querySelector("#guess");
const submitInput = document.querySelector("#guess-value");


// LIFE VARIABLE
let lives = 3;
const livesMessage = document.querySelector(".livesleft");

// GENERATE RANDOM NUMBER

const randomNumber = Math.floor(Math.random() * max + min)
console.log(randomNumber)


// PLAY AGAIN

container.addEventListener("mousedown",function(e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
})



// MATCH FUNCTION

function match() {
    message.textContent = `Congratulations, you've guessed a number ${usersInput.value}`
    wrapper.style.backgroundColor = "rgb(160, 248, 109)"
    livesMessage.style.display="none"
    usersInput.disabled = true;
    submitInput.style.textAlign = "center";
    submitInput.style.backgroundColor = "aquamarine";
    submitInput.value = "Try again";
    submitInput.className += 'play-again'
}

// NOT MATCH FUNCTION
function unmatch() {
    lives -= 1;
    livesMessage.textContent = `You have ${lives} remaining lives left`;
    wrapper.style.backgroundColor="rgb(255, 156, 156)"
    usersInput.value = ""
}

//VALIDATION

function wrongInput() {
    livesMessage.textContent = `Please enter a number between ${min} and ${max}`;
    wrapper.style.backgroundColor="rgb(200, 156, 156)"
    usersInput.value = ''
}



// SUBMIT RESULT
const checkResult = function() {

    let guess = parseInt(usersInput.value);

    if (isNaN(guess) || guess > max || guess < min){
       wrongInput()
       
    } else if  (guess === randomNumber) {
            match();
    } else {
        unmatch();
        if (!lives) {
            message.textContent = `Sorry, you've used all your lives, guessed number was ${randomNumber}`
            submitInput.style.textAlign = "center";
            submitInput.style.backgroundColor = "aquamarine";
            submitInput.value = "Try again";
            submitInput.className += 'play-again'
            usersInput.disabled = 'true';
            
        }
    }
}

submitInput.addEventListener("click", checkResult)





