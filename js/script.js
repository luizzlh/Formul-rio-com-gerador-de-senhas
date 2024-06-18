const generatePasswordButton = document.getElementById("generate-password");
const generatedPasswordElement = document.getElementById("generated-password");
const formConfig = document.getElementById("generate-password-config");
const btnCreatePassword = document.getElementById("btnCreatePassword");
const btnCopiarSenha = document.getElementById("btnCopiarSenha");

//Funções
const getLetterLowerCase = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97);
const getLetterUpperCase = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);
const getNumber = () => Math.floor(Math.random() * 10).toString();
const getSymbol = () => {
   const symbols = "(){}[]=<>/,.!@#$%¨&*+-";
   return symbols[Math.floor(Math.random() * symbols.length)];
}

const validacaoCaracteres = () => {
   const caracteres = document.getElementById("caracteres").value;
   return caracteres === "" ? 10 : parseInt(caracteres, 10);
}

const generatePassword = () => {
   let password = "";
   const passwordLength = validacaoCaracteres();
   const generators = [];
   const checkboxes = [...document.querySelectorAll(".checkbox")];

   checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
         if (checkbox.value === "letras") {
            generators.push(getLetterLowerCase, getLetterUpperCase);
         }
         if (checkbox.value === "numeros") {
            generators.push(getNumber);
         }
         if (checkbox.value === "simbolos") {
            generators.push(getSymbol);
         }
      }
   });

   if (generators.length === 0) {
      alert("Por favor, marque pelo menos uma opção!");
      return;
   }

   for (let i = 0; i < passwordLength; i++) {
      const randomValue = generators[Math.floor(Math.random() * generators.length)]();
      password += randomValue;
   }

   return password;
}

//Eventos
btnCreatePassword.addEventListener("click", () => {
   const password = generatePassword();
   if (password) {
      generatedPasswordElement.style.display = "block";
      generatedPasswordElement.querySelector("h4").innerText = password;
   }
});

btnCopiarSenha.addEventListener("click", () => {
   navigator.clipboard.writeText(generatedPasswordElement.querySelector("h4").innerText);
});

generatePasswordButton.addEventListener("click", () => {
   formConfig.style.display = "block";
});