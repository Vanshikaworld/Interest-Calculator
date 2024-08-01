// script.js
let entries = [];
let isCalculating = true;

function calculateInterest() {
    if (!isCalculating) return;

    // Get values from the input fields
    const amount = parseFloat(document.getElementById('amount').value);
    const dateGiven = new Date(document.getElementById('dateGiven').value);
    const dateRepayment = new Date(document.getElementById('dateRepayment').value);
    const percentage = parseFloat(document.getElementById('percentage').value) / 100; // Convert percentage to decimal

    // Validate the input values
    if (isNaN(amount) || isNaN(percentage) || dateGiven > dateRepayment) {
        alert('Please enter valid values.');
        return;
    }

    // Calculate the exact number of days between the given and repayment dates
    const daysBetween = Math.floor((dateRepayment - dateGiven) / (1000 * 60 * 60 * 24));

    // Convert the days to months with fractional months
    const totalMonths = calculateTotalMonths(daysBetween);

    // Monthly interest calculation
    const interestAmount = amount * percentage * totalMonths;
    const totalAmount = amount + interestAmount;

    // Display the results
    document.getElementById('interestAmount').textContent = interestAmount.toFixed(2);
    document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);

    // Save the entry
    entries.push({
        Principal: amount,
        "Date Given On": document.getElementById('dateGiven').value,
        "Date of Repayment": document.getElementById('dateRepayment').value,
        "Monthly Interest Rate": document.getElementById('percentage').value,
        "Interest Amount": interestAmount.toFixed(2),
        "Total Amount to be Repaid": totalAmount.toFixed(2)
    });
}

// Function to convert total days to exact months and fractional months
function calculateTotalMonths(days) {
    const averageDaysInMonth = 30;
    const months = Math.floor(days / averageDaysInMonth);
    const fractionOfMonth = (days % averageDaysInMonth) / averageDaysInMonth;
    return months + fractionOfMonth;
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
    exportToExcel(); // Export all entries before exiting
    // Clear form and entries
    document.getElementById('calculator-form').reset();
    entries = [];
    isCalculating = false; // Disable further calculations
    alert('Exited and exported all entries.');
}

function continueCalculation() {
    // Simply clear the results for the next calculation
    document.getElementById('interestAmount').textContent = '0';
    document.getElementById('totalAmount').textContent = '0';
}
