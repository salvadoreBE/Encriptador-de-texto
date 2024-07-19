const text = "Encriptador de texto";
const typingElement = document.querySelector(".typing-effect");
let index = 0;

function typeText() {
    if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 150);
    } else {        
        setTimeout(resetText, 5000); // Espera 2 segundos antes de reiniciar
        typingElement.classList.add("blink");
    }
}

function resetText() {
    typingElement.classList.remove("blink");
    typingElement.textContent = "";
    index = 0;
    typeText();
}

typeText();