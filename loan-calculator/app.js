// getting access to our dom elements


// UI
const form = document.querySelector(".loan-wrapper");
const results = document.querySelector(".results")
const loader = document.querySelector(".loader");

const loanAmount = document.querySelector("#loan");
const interest = document.querySelector("#interest")
const years = document.querySelector("#years")

const monthlyPayment = document.querySelector(".results-monthly > p")
const totalPayment = document.querySelector(".results-total > p")
const totalInterest = document.querySelector(".results-interest > p")


// calculate result on submit
form.addEventListener("submit", calculateResult)


// display error
function showError(msg) {

    // get title
    const title = document.querySelector(".calculator_title");
    // create div element
    const errorContainer = document.createElement('div')

    // addig class to t element
    errorContainer.classList.add('error-alert')

    // add mg to error element
    errorContainer.appendChild(document.createTextNode(msg))
    form.insertBefore(errorContainer, title)

    // clear error

    setTimeout(() => {
        form.removeChild(errorContainer)
    }, 1000)
}


// Calculate result
function calculateResult(e) {
    e.preventDefault();

    
    

    const principal = parseFloat(loanAmount.value);
    const calculateInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;
    //compute monthly payments
    const x = Math.pow(1 + calculateInterest, calculatedPayments)
    const monthly = (principal * x * calculateInterest) / (x - 1)

    if (isFinite(monthly)) {
        let loaded;
        if (loaded) {
            loaded = false;
            clearTimeout(loadResults)
        }
        // display loader
        loader.style.display="inline-block"
        results.style.display="none";

        // assigning values 
        monthlyPayment.textContent = monthly.toFixed(2)
        totalPayment.textContent = (monthly * calculatedPayments).toFixed(2)
        totalInterest.textContent = ((monthly * calculatedPayments) - principal).toFixed(2)
        // displaying results container after 2 sec
        const loadResults = setTimeout(() => {
            loaded = true;
            loader.style.display="none";
            results.style.display = "block"
        }, 2000)
    } else {
        showError("Please check your numbers")
        results.style.display="none";
    }

}