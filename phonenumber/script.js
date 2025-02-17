const scrollbar = document.getElementById("history");
const numberOne = document.getElementById("1");
const numberTwo = document.getElementById("2");
const numberThree = document.getElementById("3");
const numberFour = document.getElementById("4");
const numberFive = document.getElementById("5");
const numberSix = document.getElementById("6");
const numberSeven = document.getElementById("7");
const numberEight = document.getElementById("8");
const numberNine = document.getElementById("9");
const numberZero = document.getElementById("0");
const numberAsterix = document.getElementById("*");
const numberSharp = document.getElementById("#");
const container = document.getElementById("history");
const input = document.getElementById("user-input");
const output = document.getElementById("results-div")
const clearButton = document.getElementById("clear-btn");
const checkButton = document.getElementById("check-btn");

let historyData = JSON.parse(localStorage.getItem("key")) || [];
let currentNumber = {};

const updateContainer = () => {
    container.innerHTML = '';
    historyData.forEach((element => {
        container.innerHTML += `
        <div onclick="renderNumber(this)" id="${element.id}" class="history-child">
          <p id="phone-number">${element.number}</p>
          <p class=${element.isValid ? "green" : "red"} id="is-valid">${element.isValid ? "it's valid" : "not valid"}</p>
        </div>
        `
    }))
 }

 updateContainer()

const updateHistory = () => {
    const arrayIndex = historyData.findIndex(element => element.id === currentNumber.id)

    const numberObj = {
       id: `${input.value.split(/^\d/g).join("-")}-${Date.now()}`,
       number: input.value,
       isValid: isItValid(input.value), 
    }

    if (arrayIndex === -1) {
      historyData.unshift(numberObj);  
      currentNumber = numberObj  
    }
    else {
      historyData[arrayIndex] = numberObj
    }

    localStorage.setItem("key", JSON.stringify(historyData));
    updateContainer();
    output.innerHTML = `<p id="results-text">${currentNumber.isValid ? 'Valid US number: ' : 'Invalid US number: '}${currentNumber.number}</p>`
    output.classList.remove("green", "red")
    output.classList.add(currentNumber.isValid ? "green" : "red")
    input.value = "";
    currentNumber = {};
}

const renderNumber = (callingDiv) => {
    const arrayIndex = historyData.findIndex(element => element.id === callingDiv.id);
    currentNumber = historyData[arrayIndex];
    input.value = currentNumber.number;
    output.classList.remove("green", "red")
    output.classList.add(currentNumber.isValid ? "green" : "red")
    output.innerHTML = `<p id="results-text">${currentNumber.isValid ? 'Valid US number: ' : 'Invalid US number: '}${currentNumber.number}</p>`
}

const isItValid = (input) => {
    const regex = /^(1[\s-]?)?(\([0-9]{3}\)|[0-9]{3})[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/;
    return regex.test(input);
}

const checkInput = () => {
    if (input.value === "") {
      alert("Please provide a phone number");
      return
    }
    updateHistory();
}

const dial = (callingButton) => {
    const buttonNumber = callingButton.id;
    input.value += buttonNumber
}

checkButton.addEventListener("click", () => {
    checkInput()
})

clearButton.addEventListener("click", () => {
    localStorage.clear();
    historyData = [];
    input.value = "";
    output.innerHTML = "";
    currentNumber = {};
    updateContainer();
})

scrollbar.addEventListener("mouseenter", () => {
    scrollbar.classList.add("hover-effect")
})

scrollbar.addEventListener("mouseleave", () => {
    scrollbar.classList.remove("hover-effect")
})