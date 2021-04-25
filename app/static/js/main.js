let mainOutput = document.querySelector('#output');
let subOutput = document.querySelector('#output2');
let op = document.querySelector('#operator');
let num1 = document.querySelector('#num1');
let num2 = document.querySelector('#num2');
let temp = document.querySelector('#temp');
let nums = document.querySelectorAll('.nums');
let clearButton = document.querySelector('#clearButton');
let operateButtons = document.querySelectorAll('.btn-operate');
let resultButton = document.querySelector('#resultButton');
let deleteButton = document.querySelector('#deleteButton');
const regexOperator = new RegExp('[+\\-*\\/]');
const regexDot = new RegExp('\\.');

let clearData = function () {
    num1.value = '';
    op.value = '';
    num2.value = '';
    temp.value = '';
};

let clearOutput = function () {
    mainOutput.innerHTML = '';
    subOutput.innerHTML = '';
};

let digitError = function () {
    mainOutput.innerHTML = '0';
    subOutput.innerHTML = 'Reach Digit Limit';
    temp.value = 0;
};

nums.forEach((element) => {
    element.addEventListener('click', () => {
        if (regexOperator.test(mainOutput.innerHTML)) {
            mainOutput.innerHTML = '';
            subOutput.innerHTML = '';
        }

        if (regexDot.test(element.value) && regexDot.test(mainOutput.innerHTML))
            return;

        if (!regexDot.test(element.value)) {
            if (
                mainOutput.innerHTML === '0' ||
                subOutput.innerHTML === 'Reach Digit Limit'
            ) {
                clearOutput();
            }
        }

        if (temp.value !== '') {
            clearOutput();
            clearData();
        }
        mainOutput.innerHTML += element.value;
        subOutput.innerHTML += element.value;

        if (mainOutput.innerHTML.length > 12) {
            digitError();
        }
    });
});

clearButton.addEventListener('click', () => {
    mainOutput.innerHTML = '0';
    subOutput.innerHTML = '';
    clearData();
});

operateButtons.forEach((element) => {
    element.addEventListener('click', () => {
        let newOperator = element.value;
        if (
            num1.value !== '' &&
            !regexOperator.test(num1.value) &&
            op.value !== ''
        ) {
            num2.value = mainOutput.innerHTML;
            if (regexOperator.test(num2.value)) return;
            let url = new URL($SCRIPT_ROOT + '_calculate/'),
                params = {
                    number1: num1.value,
                    operator: op.value,
                    number2: num2.value,
                };
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

            fetch(url.toString(), {
                method: 'GET',
            }).then(response => response.json())
                .then((data) => {
                    if (data.result.toString().length > 13) {
                        digitError();
                    } else {
                        mainOutput.innerHTML = newOperator;
                        subOutput.innerHTML = data.result + newOperator;
                        num1.value = data.result;
                        op.value = newOperator
                    }
                })
        } else {
            num1.value = mainOutput.innerHTML;
            op.value = newOperator;
            mainOutput.innerHTML = newOperator;
            subOutput.innerHTML = newOperator;
        }
    });
});

resultButton.addEventListener('click', () => {
    if (mainOutput.innerHTML === '' || regexOperator.test(mainOutput.innerHTML))
        return;
    num2.value = mainOutput.innerHTML;
    if (num1.value === '' && op.value === '')
        return;
    let url = new URL($SCRIPT_ROOT + '_calculate/'),
        params = {
            number1: num1.value,
            operator: op.value,
            number2: num2.value,
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    fetch(url.toString(), {
        method: 'GET',
    }).then(response => response.json())
        .then((data) => {
            if (data.result.toString().length > 13) {
                digitError();
            } else {
                mainOutput.innerHTML = data.result;
                subOutput.innerHTML = data.result;
                clearData();
            }
        })
})

deleteButton.addEventListener('click', () => {
    if (mainOutput.innerHTML !== '0') {
        mainOutput.innerHTML = mainOutput.innerHTML.substring(0, mainOutput.innerHTML.length - 1);
        subOutput.innerHTML = subOutput.innerHTML.substring(0, subOutput.innerHTML.length - 1);
        if (mainOutput.innerHTML === '') {
            mainOutput.innerHTML = '0';
        }
    }
})
