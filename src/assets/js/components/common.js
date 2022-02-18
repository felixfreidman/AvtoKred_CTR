$(document).ready(function() {
    $("#sliderCredit").slider({
        range: "min",
        animate: true,
        value: 500000,
        min: 100000,
        max: 8000000,
        step: 10000,
        slide: function slide(event, ui) {
            let debtValue = ui.value;
            const sliderCreditValue = debtValue * 0.8;
            debtValue = numberWithCommas(debtValue);
            $("#sliderCreditInput").val(debtValue);
            $("#sliderInvest").slider("option", "max", sliderCreditValue);
            setTimeout(countMonthPayment, 100);
        },
    });
    $("#sliderInvest").slider({
        range: "min",
        animate: true,
        value: 0,
        min: 0,
        max: 400000,
        step: 10000,
        slide: function slide(event, ui) {
            let debtValue = ui.value;
            debtValue = numberWithCommas(debtValue);
            $("#sliderInvestInput").val(debtValue);
            setTimeout(countMonthPayment, 200);
        },
    });
    $("#sliderTime").slider({
        range: "min",
        animate: true,
        value: 36,
        min: 12,
        max: 96,
        step: 12,
        slide: function slide(event, ui) {
            var debtValue = ui.value;
            debtValue = numberWithCommas(debtValue);
            $("#sliderTimeInput").val(debtValue);
            setTimeout(countMonthPayment, 200);
        },
    });
    // const creditInput = document.getElementById("sliderCreditInput");
    // creditInput.addEventListener("click");
    // const investInput = document.getElementById("slideInvestInput");
    // const timeInput = document.getElementById("slideTimeInput");
    const inputs = document.querySelectorAll(".form-input");
    let savedValue = "";
    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            const inputID = input.id.replace("Input", "");
            $(`#${inputID}`).slider("option", "value", input.value);
        });
        input.addEventListener("change", () => {
            $(`#${input.id}`).val(numberWithCommas(input.value));
        });
        input.addEventListener("focus", () => {
            savedValue = input.value;
            input.value = "";
        });
        input.addEventListener("focusout", () => {
            if (input.value == "") {
                input.value = savedValue;
            }
        });
    });
});

$("#phone").inputmask();
$("#phoneUncertain").inputmask(); // Slide Logic

$("#sliderInvestInput").after(function() {
    return "<span class ='rubles'>рублей</span>";
});
$("#sliderCreditInput").after(function() {
    return "<span class ='rubles'>рублей</span>";
});
$("#sliderTimeInput").after(function() {
    return "<span class ='rubles'>месяцев</span>";
});

// Calculator

function countMonthPayment() {
    const credit =
        $("#sliderCredit").slider("option", "value") -
        $("#sliderInvest").slider("option", "value");
    const time = $("#sliderTime").slider("option", "value");
    const interest = 13.0 / 1200.0;
    const totalInterest = round10(interest, -4);
    let resultPayment =
        (credit * totalInterest * Math.pow(1.0 + totalInterest, time)) /
        (Math.pow(1.0 + totalInterest, time) - 1.0);
    resultPayment = Math.floor(resultPayment);
    resultPayment = numberWithSpaces(resultPayment);
    $("#perMonthResult").html(resultPayment + "<span>₽</span>");
}

// Submit Form

const submitCalcButton = document.getElementById("submitCalculator");
const submitForm = document.querySelector(".main-form-submit");
const closeSubmitForm = document.getElementById("closeSubmitForm");
submitCalcButton.addEventListener("click", (event) => {
    event.preventDefault();
    formControll();
});

closeSubmitForm.addEventListener("click", () => {
    formControll();
});

function formControll() {
    submitForm.classList.toggle("fromFullToZero");
    submitForm.classList.toggle("fromZeroToFull");
}