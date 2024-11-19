document.addEventListener("DOMContentLoaded", () => {
    const timerElement = document.querySelector("#timer span");
    const quoteDisplayElement = document.getElementById("quoteDisplay");
    const quoteInputElement = document.getElementById("quoteInput");
    const submitButton = document.getElementById("submitBtn");
    const resetButton = document.getElementById("resetBtn");
    const resultElement = document.getElementById("result");
    const spinner = document.getElementById("spinner");

    let quote = "";
    let startTime;
    let timerInterval;

    async function fetchQuote() {
        spinner.classList.add("d-block");
        quoteDisplayElement.textContent = "Loading quote...";
        try {
            const response = await fetch("https://apis.ccbp.in/random-quote");
            const data = await response.json();
            quote = data.content;
            quoteDisplayElement.textContent = quote;
        } catch (error) {
            quoteDisplayElement.textContent = "Failed to load quote. Please try again.";
        }
        spinner.classList.remove("d-block");
    }

    function startTimer() {
        startTime = new Date();
        timerInterval = setInterval(() => {
            timerElement.textContent = Math.floor((new Date() - startTime) / 1000);
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function resetTest() {
        fetchQuote();
        quoteInputElement.value = "";
        resultElement.textContent = "";
        timerElement.textContent = "0";
        stopTimer();
        startTimer();
    }

    submitButton.addEventListener("click", () => {
        if (quoteInputElement.value === quote) {
            stopTimer();
            resultElement.textContent = "You typed the correct sentence!";
            resultElement.style.color = "green";
        } else {
            resultElement.textContent = "You typed incorrect sentence";
            resultElement.style.color = "red";
        }
    });

    resetButton.addEventListener("click", resetTest);

    fetchQuote();
    startTimer();
});