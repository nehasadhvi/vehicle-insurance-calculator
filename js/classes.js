// Everything related to quotation
class Insurance {
    constructor(makeVal, yearVal, levelVal) {
        this.makeVal = makeVal;
        this.yearVal = yearVal;
        this.levelVal = levelVal;
    }

    calculateQuotation(insurance) {
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
    
    getYearDifference(yearVal) {
        return new Date().getFullYear() - yearVal;
    }
    
    calculateYear(price, levelVal) {
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
}


// HTML Objects
class HTMLUI {
    //To display all the previous 20years as an option
    displayYears() {
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
    displayError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.classList = 'error';
        errorDiv.innerHTML = `<p> ${message} </p>`;
        carForm.insertBefore(errorDiv, document.querySelector('.form-group'));
        setTimeout(() => {
            carForm.querySelector('.error').remove();
        }, 3000);
    } 

    // To display the total value on the screen
    showResults(price, insurance) {
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
        const div = document.createElement('div');
        div.innerHTML = `
            <p class="header"> Summary </p>
            <p>Make: ${makeVal}</p>
            <p>Year: ${insurance.yearVal}</p>
            <p>Level: ${insurance.levelVal}</p>
            <p class="total">Total: $ ${price}</p>
            `;
        
        const preResult = document.querySelector("#result div");
        //Remove the previous summary block, if exists
        if (preResult != null) {
            preResult.remove();
        }

        const spinner = document.querySelector("#loading img");
        spinner.style.display = 'block';

        setTimeout(() => {
            spinner.style.display = 'none';

            //Display the new summary block
            result.appendChild(div);
        }, 2000);
    }
}
