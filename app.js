const BASE_URL =
  "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api";

const dropdowns = document.querySelectorAll("select");
const btn = document.querySelector("form button");
const flag = document.querySelectorAll(".flag");
let msg = document.querySelector(".message p");


// Dynamically Add all the country currency codes in the both selects (dropdowns) 
for (let select of dropdowns) {
    for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerHTML = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
        newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
        newOption.selected = "selected";
    }
    select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
});
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img"); //retrieves img element in the parent element
    img.src = newSrc;
};

// Another Logic for updating flag
// const updateFlag = () => {
//     let currCode1 = dropdowns[0].value;
//     let currCode2 = dropdowns[1].value;
//     let countryCode1 = countryList[currCode1];
//     let countryCode2 = countryList[currCode2];
//     // console.log(countryList[flag1]);
//     // console.log(countryList[flag2]);
//     flag[0].src = `https://flagsapi.com/${countryCode1}/flat/64.png`;
//     flag[1].src = `https://flagsapi.com/${countryCode2}/flat/64.png`;
// }
// addEventListener("change",updateFlag);



const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    // console.log(amountVal);
    if (amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amount.value = "1";
    }
    let fromCurr = dropdowns[0].value;
    let toCurr = dropdowns[1].value;
    // console.log(fromCurr, toCurr);
    const URL = `${BASE_URL}/${fromCurr}_${toCurr}.json`;
    // console.log(URL);
    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data["rate"]);
    let rate = data["rate"];
    let convertedAmount = (amountVal / rate).toFixed(2);
    msg.innerText = `${amountVal} ${fromCurr} = ${convertedAmount} ${toCurr}`;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault(); //stops refreshing web page
    updateExchangeRate();
});

document.addEventListener("load", () => {
    updateExchangeRate();
});