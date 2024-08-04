const submitButton = document.querySelector('.first-button');
const textarea = document.querySelector('.input-text');
const clearButton = document.querySelector('.restart-button');
const desencriptarButton = document.querySelector('.second-button');

document.addEventListener('DOMContentLoaded', function() {

    textarea.addEventListener('input', function() {
        if (!textarea.value == '') {
            submitButton.disabled = false;
            desencriptarButton.disabled = false;
            clearButton.disabled = false;
        } else {
            clearButton.disabled = true;
            submitButton.disabled = true;
            desencriptarButton.disabled = true;
            verificarOutput();
        }
    })
});

const verificarOutput = () => {
    const contenedor = document.querySelector('.output-div');
    if (contenedor.querySelector('.output-encrypted')) {
        clearButton.disabled = false;
    } else {
        clearButton.disabled = true;
    }

}

const revertFunction = () => {
    const text = textarea.value;
    const encryptedTextElement = document.querySelector('.encrypted-text');
    const newText = desencryptText(text);
    encryptedTextElement.textContent = newText;
    clearButton.disabled = false;
    textarea.value = '';
    submitButton.disabled = true;
    desencriptarButton.disabled = true;
}

const submitFunction = () => {
    const text = textarea.value;
    const encryptedTextElement = document.querySelector('.encrypted-text');
    const newText = encryptText(text);
    encryptedTextElement.textContent = newText;
    clearButton.disabled = false;
    textarea.value = '';
    submitButton.disabled = true;
    desencriptarButton.disabled = true;
}

document.addEventListener('DOMContentLoaded', function() {
    const contentDiv = document.querySelector('.output-div');
    submitButton.addEventListener('click', function() {
        if (containsValidChars(textarea.value)) {
            showAlert();
            return;
        } else {
            contentDiv.innerHTML = `
                <div class="output-encrypted">
                    <p class="output-text-title">Texto encriptado:</p>
                    <p class="encrypted-text"></p>
                    <button class="copy-button">Copiar</button>
                </div>
            `;
            submitFunction();
            hideAlert()
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const contentDiv = document.querySelector('.output-div');
    desencriptarButton.addEventListener('click', function() {
        if (containsValidChars(textarea.value)) {
            showAlert();
            return;
        } else {
            contentDiv.innerHTML = `
                <div class="output-encrypted">
                    <p class="output-text-title-2">Texto desencriptado:</p>
                    <p class="encrypted-text"></p>
                    <button class="copy-button">Copiar</button>
                </div>
            `;
            revertFunction();
            hideAlert();
        }
    })
})

const clearFunction = () => {
    const contentDiv = document.querySelector('.output-div');
    const alert = document.querySelector('.alert-span');
    contentDiv.innerHTML = '';
    textarea.value = '';
    submitButton.disabled = true;
    desencriptarButton.disabled = true;
    alert.style.display = 'none';
    contentDiv.innerHTML = `
        <img src="./assets/image2.png" class="output-img">
            <div class="output-text">
                <p class="text-1">Ningún mensaje fue encontrado</p>
                <p class="text-2">Ingresa el texto que desees encriptar o desencriptar.</p>
            </div>
        </div>
    `;
    clearButton.disabled = true;
}

document.addEventListener('DOMContentLoaded', function() {
    clearButton.addEventListener('click', function() {
        clearFunction();
    });

    document.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('copy-button')) {
            copyFunction(event.target);
        }
    });
})

const copyFunction = (copyButton) => {
    const encryptedTextElement = document.querySelector('.encrypted-text');
    const encryptedText = encryptedTextElement.textContent;
    navigator.clipboard.writeText(encryptedText)
        .then(() => {
            copyButton.classList.add('copied');
            copyButton.innerHTML = `
                <p>Copiado</p>
                <img src="./assets/check-regular-24.png" class="check-icon">
                `;
        })
        .catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
};

const containsValidChars = (text) => {
    const validCharsPattern = /[^a-z0-9!¡?¿]/;
    return validCharsPattern.test(text);
};

const showAlert = () => {
    const alertSpan = document.querySelector('.alert-span');
    alertSpan.style.display = 'flex';
};

const hideAlert = () => {
    const alertSpan = document.querySelector('.alert-span');
    alertSpan.style.display = 'none';
};

const encryptText = (text) => {
    let encryptedText = '';
    for (let char of text) {    
        switch (char) {
            case 'a':
                encryptedText += 'ai';
                break;
            case 'e':
                encryptedText += 'enter';
                break;
            case 'i':
                encryptedText += 'imes';
                break;
            case 'o':
                encryptedText += 'ober';
                break;
            case 'u':
                encryptedText += 'ufat';
                break;
            default:
                encryptedText += char;
                break;
        }
    }

    return encryptedText;
};

const desencryptText = (text) => {
    let decryptedText = '';
    let i = 0;

    while (i < text.length) {
        if (text.startsWith('ai', i)) {
            decryptedText += 'a';
            i += 2; 
        } else if (text.startsWith('enter', i)) {
            decryptedText += 'e';
            i += 5; 
        } else if (text.startsWith('imes', i)) {
            decryptedText += 'i';
            i += 4; 
        } else if (text.startsWith('ober', i)) {
            decryptedText += 'o';
            i += 4; 
        } else if (text.startsWith('ufat', i)) {
            decryptedText += 'u';
            i += 4; 
        } else {
            decryptedText += text[i];
            i += 1; 
        }
    }

    return decryptedText;
}

