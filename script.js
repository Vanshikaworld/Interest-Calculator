// script.js
let entries = [];

function calculateInterest() {
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

    // Calculate the number of months between the given and repayment dates
    const timeDifference = dateRepayment - dateGiven;
    const days = timeDifference / (1000 * 60 * 60 * 24);
    const monthsBetween = (dateRepayment.getFullYear() - dateGiven.getFullYear()) * 12 +
                           (dateRepayment.getMonth() - dateGiven.getMonth()) +
                           (dateRepayment.getDate() >= dateGiven.getDate() ? 0 : -1);

    // Monthly interest calculation
    const interestAmount = amount * percentage * monthsBetween;
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
}

function exitCalculator() {
    exportToExcel(); // Export all entries before exiting
    // Optionally, clear form or perform other actions
    document.getElementById('calculator-form').reset();
    entries = [];
    alert('Exited and exported all entries.');
}

function continueCalculation() {
    // Simply reset the form for the next calculation
    document.getElementById('calculator-form').reset();
}
