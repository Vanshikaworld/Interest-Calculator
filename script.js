// script.js
let entries = [];
let isCalculating = true;

function calculateInterest() {
    if (!isCalculating) return;

    // Get values from the input fields
    const amount = parseFloat(document.getElementById('amount').value);
    const dateGiven = new Date(document.getElementById('dateGiven').value);
    const dateRepayment = new Date(document.getElementById('dateRepayment').value);
    const percentage = parseFloat(document.getElementById('percentage').value); // Monthly rate in percentage

    // Validate the input values
    if (isNaN(amount) || isNaN(percentage) || dateGiven > dateRepayment) {
        alert('Please enter valid values.');
        return;
    }

    // Calculate the number of days between the given and repayment dates
    const timeDifference = dateRepayment.getTime() - dateGiven.getTime();
    const daysBetween = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Calculate months and days
    const totalMonths = Math.floor(daysBetween / 30);
    const remainingDays = daysBetween % 30;

    // Total time in months
    const totalTime = totalMonths + (remainingDays / 30);

    // Calculate interest
    const interestAmount = amount * totalTime * (percentage / 100);
    const totalAmount = amount + interestAmount;

    // Display the results
    document.getElementById('interestAmount').textContent = interestAmount.toFixed(2);
    document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);

    // Save the entry
    entries.push({
        Principal: amount,
        "Date Given On": document.getElementById('dateGiven').value,
        "Date of Repayment": document.getElementById('dateRepayment').value,
        "Monthly Interest Rate": percentage,
        "Interest Amount": interestAmount.toFixed(2),
        "Total Amount to be Repaid": totalAmount.toFixed(2)
    });
}

function exportToExcel() {
    if (entries.length === 0) {
        alert('No entries to export.');
        return;
    }

    // Create a workbook and add a worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(entries);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Interest Calculations");

    // Generate a download link and trigger it
    XLSX.writeFile(wb, "Interest_Calculations.xlsx");

    // Clear entries after exporting
    entries = [];
}

function restartCalculation() {
    // Reset all fields and results
    document.getElementById('calculator-form').reset();
    document.getElementById('interestAmount').textContent = '0';
    document.getElementById('totalAmount').textContent = '0';
    entries = []; // Clear all previous entries
    isCalculating = true; // Enable calculations
}

function exitCalculator() {
    isCalculating = false; // Disable further calculations
    alert('Exited. You can now export your data if needed.');
}

function continueCalculation() {
    // Clear the input fields
    document.getElementById('calculator-form').reset();
    // Clear the results for the next calculation
    document.getElementById('interestAmount').textContent = '0';
    document.getElementById('totalAmount').textContent = '0';
}
