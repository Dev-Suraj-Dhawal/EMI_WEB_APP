   /**
         * @fileoverview Main client-side script for the Stylish EMI Loan Calculator.
         * @description This script handles user input from the EMI calculation form,
         * performs the necessary mathematical calculations for EMI, total interest,
         * and total payment, and dynamically updates the DOM to display these results.
         * It also includes input validation and error handling.
         */

        // 🚀 Initialize the script once the HTML document is fully loaded and parsed.
        // This ensures that all DOM elements are available before the script tries to access them.
        document.addEventListener('DOMContentLoaded', function() {

            // 🏛️ DOM Element References:
            // Cache all necessary elements for efficient and quick access, avoiding repeated
            // DOM queries which can be performance-intensive.
            const emiForm = document.getElementById('emiForm'); // The main form element
            const principalInput = document.getElementById('principal'); // Input field for loan principal
            const interestInput = document.getElementById('interest'); // Input field for annual interest rate
            const tenureInput = document.getElementById('tenure'); // Input field for loan tenure in years
            
            const resultsDiv = document.getElementById('results'); // Container for displaying calculation results
            const errorBox = document.getElementById('error-box'); // Container for displaying error messages
            const errorMessage = document.getElementById('error-message'); // Paragraph inside the error box for the message text

            const monthlyEmiEl = document.getElementById('monthly-emi'); // Span to display the calculated Monthly EMI
            const totalInterestEl = document.getElementById('total-interest'); // Span to display the calculated Total Interest
            const totalPaymentEl = document.getElementById('total-payment'); // Span to display the calculated Total Payment

            /**
             * 👂 Event Listener for Form Submission
             * @description Attaches an event listener to the EMI form. When the form is submitted
             * (e.g., by clicking the "Calculate" button or pressing Enter in an input field),
             * this function is executed to handle the calculation process.
             * @param {Event} event - The submit event object.
             */
            emiForm.addEventListener('submit', function(event) {
                
                // 🛑 Prevent Default Form Submission:
                // Stops the browser from performing its default action for form submission,
                // which is usually a page reload. This allows our JavaScript to handle the submission.
                event.preventDefault();

                // 🧹 Reset UI State:
                // Before performing new calculations, hide any previously displayed results
                // and error messages to ensure a clean slate for the new output.
                resultsDiv.style.display = 'none';
                errorBox.style.display = 'none';
                errorMessage.textContent = ''; // Clear previous error message text

                // 📥 Input Parsing:
                // Retrieve the values entered by the user in the input fields.
                // parseFloat() is used to convert the string input values into floating-point numbers.
                const principal = parseFloat(principalInput.value);
                const annualInterest = parseFloat(interestInput.value);
                const tenureYears = parseFloat(tenureInput.value);

                /**
                 * 🛡️ Input Validation:
                 * Checks if the parsed input values are valid numbers and are positive.
                 * If any input is invalid (NaN, zero, or negative for principal/tenure, or negative for interest),
                 * an error message is displayed, and the function returns, halting the calculation.
                 */
                if (isNaN(principal) || isNaN(annualInterest) || isNaN(tenureYears) || principal <= 0 || annualInterest < 0 || tenureYears <= 0) {
                    errorMessage.textContent = 'Please enter valid, positive numbers for all fields.';
                    errorBox.style.display = 'block'; // Make the error box visible
                    return; // Exit the function as inputs are invalid
                }

                // 🧮 Perform Core Calculations:
                // These steps translate the annual input values into monthly terms suitable for the EMI formula.
                
                // 📈 Monthly Interest Rate:
                // Converts the annual interest rate (e.g., 7.5%) into a monthly decimal rate.
                // (e.g., 7.5 / (12 * 100) = 0.00625 for 7.5% annual interest)
                const monthlyInterestRate = annualInterest / (12 * 100);

                // 🗓️ Loan Tenure in Months:
                // Converts the loan tenure from years to total number of months.
                const numberOfMonths = tenureYears * 12;

                // ➗ EMI Calculation Logic:
                // Implements the standard EMI formula.
                // Formula: EMI = P * R * (1+R)^N / ((1+R)^N - 1)
                // where:
                // P = Principal Loan Amount
                // R = Monthly Interest Rate
                // N = Number of Months (Loan Tenure)
                let emi;
                if (monthlyInterestRate === 0) {
                    // Edge Case: If the annual interest rate is 0%, the EMI is simply the
                    // principal divided by the total number of months. This prevents
                    // division by zero or mathematical issues with the power term if R is 0.
                    emi = principal / numberOfMonths;
                } else {
                    // Calculate the (1+R)^N term, which is used multiple times in the formula.
                    const powerTerm = Math.pow(1 + monthlyInterestRate, numberOfMonths);
                    // Apply the full EMI formula for non-zero interest rates.
                    emi = (principal * monthlyInterestRate * powerTerm) / (powerTerm - 1);
                }

                // 💰 Calculate Supplementary Financial Details:
                // Derives the total amount paid over the loan term and the total interest component.
                const totalPayment = emi * numberOfMonths;
                const totalInterest = totalPayment - principal;

                // 📤 Display Results:
                // Update the text content of the result elements with the calculated values.
                // .toFixed(2) formats the numbers to two decimal places, suitable for currency display.
                monthlyEmiEl.textContent = `$${emi.toFixed(2)}`;
                totalInterestEl.textContent = `$${totalInterest.toFixed(2)}`;
                totalPaymentEl.textContent = `$${totalPayment.toFixed(2)}`;
                
                // ✨ Reveal the results section:
                // Change the display style to 'block' to make the results container visible.
                // The CSS animation 'slideUp' will then smoothly transition it into view.
                resultsDiv.style.display = 'block';
            });
        });