document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let previousValue = '';

    function updateDisplay(value) {
        display.textContent = value;
    }

    function calculate() {
        if (previousValue === '' || currentInput === '' || operator === '') return;

        let result;
        const prev = parseFloat(previousValue);
        const current = parseFloat(currentInput);

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        updateDisplay(result);
        currentInput = result;
        operator = '';
        previousValue = '';
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value >= '0' && value <= '9' || value === '.') {
                currentInput += value;
                updateDisplay(currentInput);
            } else if (value === 'C') {
                currentInput = '';
                previousValue = '';
                operator = '';
                updateDisplay('0');
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput !== '') {
                    previousValue = currentInput;
                    currentInput = '';
                    operator = value;
                }
            } else if (value === '=') {
                calculate();
            }
        });
    });
});
