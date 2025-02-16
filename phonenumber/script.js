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
const input = document.getElementById("input");
const clearButton = document.getElementById("clear-btn");
const checkButton = document.getElementById("check-btn");

const historyData = localStorage.getItem("key") || [];
let currentNumber = {};

const updateContainer = () => {
    container.innerHTML = '';
    historyData.forEach((element => {
        container.innerHTML += `
        <div onclick="renderNumber(this)" id="${element.id}" class="history-child">
          <p id="phone-number">${element.number}</p>
          <p class="${element.isValid ? "green" : "red"}" id="is-valid">${element.isValid ? "it's valid" : "not valid"}</p>
        </div>
        `
    }))
 }

 updateContainer()

const updateHistory = () => {
    
    numberObj = {
       id: `${input.value.split(/^\d/g).join("-")}-${Date.now()}`,
       number: input.value,
       isValid: isItValid(), 
    }

    historyData.unshift(numberObj);
    localStorage.setItem("key", JSON.stringify(historyData));
    updateContainer();
    console.log(localStorage.getItem("key"))
}

const renderNumber = (callingDiv) => {
    const arrayIndex = historyData.findIndex(element => element.id === callingDiv.id);
    
}

const isItValid = () => {
    return true;
}

const checkInput = () => {
    if (input.value === "") {
      alert("Please input a value");
      return
    }
    isItValid();
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
    localStorage.clear()
})

scrollbar.addEventListener("mouseenter", () => {
    scrollbar.classList.add("hover-effect")
})

scrollbar.addEventListener("mouseleave", () => {
    scrollbar.classList.remove("hover-effect")
})