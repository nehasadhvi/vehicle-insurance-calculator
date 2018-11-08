//Variables
const html = new HTMLUI(), 
    years = document.getElementById('year'),
    carForm = document.getElementById('request-quote');

//Event Listeners
eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        html.displayYears();
    });

    carForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const makeVal = document.getElementById('make').value,
            yearVal = document.getElementById('year').value,
            levelVal = document.querySelector("input[name='level']:checked").value;

        if( makeVal === '' || yearVal === '' || levelVal === '') {
            html.displayError('All fields are mandatory !');
        } else {
            //Calculate Insurance
            const insurance = new Insurance(makeVal, yearVal, levelVal);
            const price = insurance.calculateQuotation(insurance);

            html.showResults(price, insurance);
        }

    });
}

// Everything related to quotation
function Insurance(makeVal, yearVal, levelVal) {
    this.makeVal = makeVal;
    this.yearVal = yearVal;
    this.levelVal = levelVal;
}

Insurance.prototype.calculateQuotation = function(insurance) {
    let price;
    const base = 2000;

    // Get the make value
    const makeVal = insurance.makeVal;

    /*
        1 = American 15% more on base
        2 = Asian 05% more on base
        3 = European 35% more on base
    */
    switch(makeVal) {
        case '1':
            price = base * 1.15;
            break;
        case '2':
            price = base * 1.05;
            break;
        case '3':
            price = base * 1.35;
            break;
    }
    
    // Getting year and year difference
    const yearVal = insurance.yearVal;
    const difference = this.getYearDifference(yearVal);

    // Each year cost of insurance will be 3% cheaper
    price = price - ((difference * 0.03) * price);

    // Get the level value and calculate the price based on insurance level
    const levelVal = insurance.levelVal;
    price = this.calculateYear(price, levelVal);

    return price;
}

Insurance.prototype.getYearDifference = (yearVal) => {
    return new Date().getFullYear() - yearVal;
}

Insurance.prototype.calculateYear = (price, levelVal) => {

    /*
        Basic Insurance will increase the price by 30%
        Complete Insurance will increase the price by 50%
    */
    if (levelVal === 'basic') {
        price = price * 1.3;
    } else {
        price = price * 1.5;
    }
    return price;
}

// HTML Objects
function HTMLUI() {}

//To display all the previous 20years as an option
HTMLUI.prototype.displayYears = () => {
    const max = new Date().getFullYear(),
        min = max-20;

    for(let i=max; i>=min; i--) {
        const year = document.createElement('option');
        year.value = i;
        year.textContent = i;
        years.appendChild(year);
    }
}

// To print the error message on the screen
HTMLUI.prototype.displayError = (message) => {
    const errorDiv = document.createElement('div');
    errorDiv.classList = 'error';
    errorDiv.innerHTML = `<p> ${message} </p>`;
    carForm.insertBefore(errorDiv, document.querySelector('.form-group'));
    setTimeout(() => {
        carForm.querySelector('.error').remove();
    }, 3000);
} 

// To display the total value on the screen
HTMLUI.prototype.showResults = (price, insurance) => {
    let makeVal = insurance.makeVal;
    switch(makeVal) {
        case '1':
            makeVal = "American";
            break;
        case '2':
            makeVal = "American";
            break;
        case '3':
            makeVal = "American";
            break;
    }

    const result = document.getElementById('result');
    div = document.createElement('div');
    div.innerHTML = `
        <p class="header"> Summary </p>
        <p>Make: ${makeVal}</p>
        <p>Year: ${insurance.yearVal}</p>
        <p>Level: ${insurance.yearVal}</p>
        <p class="total">Total: $ ${price}</p>
        `;

    // if (document.getElementById('result').contains("div")) {
        // result.querySelector('.total').remove();
        result.appendChild(div);
    // } else {
        // result.appendChild(div);
    // } 

}