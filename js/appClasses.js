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
