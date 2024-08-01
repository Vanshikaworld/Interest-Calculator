// script.js

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
}

function exportToExcel() {
    // Create a workbook and add a worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([{
        "Principal": document.getElementById('amount').value,
        "Date Given On": document.getElementById('dateGiven').value,
        "Date of Repayment": document.getElementById('dateRepayment').value,
        "Monthly Interest Rate": document.getElementById('percentage').value,
        "Interest Amount": document.getElementById('interestAmount').textContent,
        "Total Amount to be Repaid": document.getElementById('totalAmount').textContent
    }]);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Interest Calculation");

    // Generate a download link and trigger it
    XLSX.writeFile(wb, "Interest_Calculation.xlsx");
}
