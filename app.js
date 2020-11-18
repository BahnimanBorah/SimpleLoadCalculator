// Events of submit and calculate

//defining the UI attributes

const card = document.querySelector('.card');
const heading = document.querySelector('.heading');
const form = document.querySelector('#loan-form');
const amount = document.querySelector('#amount');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');

//result attributes
const totalPayment = document.querySelector('#totalPayment');
const monthlyPremium = document.querySelector('#monthlyPremium');
const totalInterest = document.querySelector('#totalInterest');

const loader = document.querySelector('#loading');
const results = document.querySelector('#results');

// Event loading

loadAllEvents();

function loadAllEvents(){

    //form submit
    form.addEventListener('submit', function(e){
        //hide results
        results.style.display = 'none';
        //show loader
        loader.style.display = 'block';
        setTimeout(calculateResults,2000);
        
        e.preventDefault();
    });
}

// calculate results method
function calculateResults(){

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //computing the monthly payment
    const x = Math.pow(1 +  calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){

        monthlyPremium.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value =  ((monthly*calculatedPayments)-principal).toFixed(2);

        //hide loader
        loader.style.display = 'none';
        //show the results
        results.style.display = 'block';
        
    }else{
        showError('Error in numbers !');
    }
}

// give error for wrong numbers
function showError(error){

    //hide results
    results.style.display = 'none';
    //hide loader
    loader.style.display = 'none';


    const errorMsg = document.createElement('div');
    errorMsg.className = 'alert alert-danger';
    //create the text node
    const textNode = document.createTextNode(error);
    errorMsg.appendChild(textNode);

    //Insert the error above heading
    card.insertBefore(errorMsg,heading);

    //clear error after 4 seconds
    setTimeout(clearError,4000);
}

//clear error message
function clearError(){
    document.querySelector('.alert').remove();
}