let entries = [];
let isCalculating = true;

function calculateDateDifference(startDate, endDate) {
    // Ensure startDate and endDate are Date objects
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    // Calculate the number of months and days
    let yearsDiff = endDate.getFullYear() - startDate.getFullYear();
    let monthsDiff = endDate.getMonth() - startDate.getMonth() + (yearsDiff * 12);
    let daysDiff = endDate.getDate() - startDate.getDate();

    if (daysDiff < 0) {
        // Adjust the month difference if daysDiff is negative
        let previousMonth = new Date(endDate.getFullYear(), endDate.getMonth() - 1, startDate.getDate());
        daysDiff += new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate(); // Get days in the previous month
        monthsDiff--;
    }

    return {
        months: monthsDiff,
        days: daysDiff
    };
}

function calculateInterest() {
    if (!isCalculating) return;

    // Get values from the input fields
    const amount = parseFloat(document.getElementById('amount').value);
    const dateGiven = document.getElementById('dateGiven').value;
    const dateRepayment = document.getElementById('dateRepayment').value;
    const percentage = parseFloat(document.getElementById('percentage').value); // Monthly interest rate

    // Validate the input values
    if (isNaN(amount) || isNaN(percentage) || !dateGiven || !dateRepayment || new Date(dateGiven) > new Date(dateRepayment)) {
        alert('Please enter valid values.');
        return;
    }

    // Calculate the difference between dates
    const { months, days } = calculateDateDifference(dateGiven, dateRepayment);

    // Calculate total time in months
    const totalTime = months + (days / 30);

    // Monthly interest calculation
    const interestAmount = amount * totalTime * (percentage / 100);
    const totalAmount = amount + interestAmount;

    // Display the results
    document.getElementById('interestAmount').textContent = interestAmount.toFixed(2);
    document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
    document.getElementById('totalPeriod').textContent = `${months} months ${days} days`;

    // Save the entry
    entries.push({
        Principal: amount,
        "Date Given On": dateGiven,
        "Date of Repayment": dateRepayment,
        "Monthly Interest Rate": percentage.toFixed(2),
        "Interest Amount": interestAmount.toFixed(2),
        "Total Amount to be Repaid": totalAmount.toFixed(2),
        "Total Period": `${months} months ${days} days`
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
    document.getElementById('totalPeriod').textContent = '';
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
    document.getElementById('totalPeriod').textContent = '';
}
