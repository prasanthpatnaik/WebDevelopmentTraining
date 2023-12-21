const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdownSelects = document.querySelectorAll(".exchange-menu select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".from-container select");
const toCurrency = document.querySelector(".to-container select");
const msg = document.querySelector(".msg");

const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    newFlagSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    flag = element.parentElement.querySelector("img");
    flag.src = newFlagSrc;
};

const getExchangeRate = async () => {
    let amount = document.querySelector("form input");
    let amountVal = amount.value;
    if(amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amount.value = 1;
    }
    url = `${BASE_URL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`
    let promise = await fetch(url);
    let response = await promise.json();
    let finalAmount = amountVal * response[toCurrency.value.toLowerCase()];
    msg.innerText = `${amountVal} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
};

dropdownSelects.forEach((select) => {
    for(let country in countryList) {
        let newOption = document.createElement("option");
        newOption.value = country;
        newOption.innerText = country;
        select.append(newOption);
        if(select.name === "from" && country === "INR") {
            newOption.selected ="selected";
        } else if(select.name === "to" && country === "USD") {
            newOption.selected ="selected";
        }
        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
    }
});

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    getExchangeRate();
});

window.addEventListener("load", () => {
    getExchangeRate();
});