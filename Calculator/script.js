let input = document.querySelector("input");
let buttons = document.querySelectorAll("button");
let toast = document.querySelector(".toast");

let outString = "";

let displayOutput = () => {
    outString = input.value;
    try {
        outString = eval(outString).toString();
    }
    catch {
        input.classList.add("wrong-input");
        toast.innerText = `Invalid Input. Please check the expression you entered - "${outString}"`;
        toast.classList.remove("hide");
        outString = "";
        setTimeout(() => {
            toast.classList.add("hide"),
            input.classList.remove("wrong-input");
        }, 2000);
    }
    input.value = outString;
};

input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        displayOutput();
    }
});

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.value === "=") {
            displayOutput();
        }
        else if (button.value === "ac") {
            outString = "";
            input.value = outString;
        }
        else if (button.value === "del") {
            outString = outString.substring(0, outString.length - 1);
            input.value = outString;
        }
        else {
            outString += button.value;
            input.value = outString;
        }
        input.focus();
    });
});