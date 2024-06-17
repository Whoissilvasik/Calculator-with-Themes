let a = ''; 
let b = ''; 
let sign = ''; 
let finish = false;

const switchModeButton = document.getElementById("switchMode");

switchModeButton.onclick = function() {
    let theme = document.getElementById("theme");

    if (theme.getAttribute("href") == "style.css") {
        theme.href = "light.css";
        switchModeButton.textContent = "Switch to Dark Mode";
    } else {
        theme.href = "style.css";
        switchModeButton.textContent = "Switch to Light Mode";
    }
}

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/'];

const out = document.querySelector('.calc-screen p');

function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    // clicked on borders not the button
    if (!event.target.classList.contains('btn')) return;
    // clicked AC button
    if (event.target.classList.contains('ac')) return;

    out.textContent = '';

    const key = event.target.textContent;

    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            a += key;
            out.textContent = a;
        } else if (a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        } else {
            b += key;
            out.textContent = b;
        }
        console.table(a, b, sign);
        return;
    }

    if (action.includes(key)) {
        sign = key;
        console.table(sign);
        out.textContent = a;
        return;
    }

    if (key === '=') {
        if (b === '') b = a;
        switch (sign) {
            case "+":
                a = (+a) + (+b);
                break;
            case "-":
                a = a - b;
                break;
            case "X":
                a = a * b;
                break;
            case "/":
                if (b === '0') {
                    out.textContent = 'no no no';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = a / b;
                break;
        }
        finish = true;
        out.textContent = a;
        console.table(a, b, sign);
    }

    if (event.target.classList.contains('plus-minus')) {
        if (b === '' && sign === '') {
            a = (-a).toString();
            out.textContent = a;
        } else if (a !== '' && b !== '' && finish) {
            b = (-b).toString();
            out.textContent = b;
        } else if (b !== '' && sign !== '') {
            b = (-b).toString();
            out.textContent = b;
        }
        console.table(a, b, sign);
        return;
    }

    if (event.target.classList.contains('percent')) {
        if (b === '' && sign === '') {
            a = (a / 100).toString();
            out.textContent = a;
        } else if (a !== '' && b !== '' && finish) {
            b = (b / 100).toString();
            out.textContent = b;
        } else if (b !== '' && sign !== '') {
            b = (b / 100).toString();
            out.textContent = b;
        }
        console.table(a, b, sign);
        return;
    }
}
