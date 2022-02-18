"use strict";

$(document).ready(function () {
  $("#sliderCredit").slider({
    range: "min",
    animate: true,
    value: 500000,
    min: 100000,
    max: 8000000,
    step: 10000,
    slide: function slide(event, ui) {
      var debtValue = ui.value;
      var sliderCreditValue = debtValue * 0.8;
      debtValue = numberWithCommas(debtValue);
      $("#sliderCreditInput").val(debtValue);
      $("#sliderInvest").slider("option", "max", sliderCreditValue);
      setTimeout(countMonthPayment, 100);
    }
  });
  $("#sliderInvest").slider({
    range: "min",
    animate: true,
    value: 0,
    min: 0,
    max: 400000,
    step: 10000,
    slide: function slide(event, ui) {
      var debtValue = ui.value;
      debtValue = numberWithCommas(debtValue);
      $("#sliderInvestInput").val(debtValue);
      setTimeout(countMonthPayment, 200);
    }
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
    }
  }); // const creditInput = document.getElementById("sliderCreditInput");
  // creditInput.addEventListener("click");
  // const investInput = document.getElementById("slideInvestInput");
  // const timeInput = document.getElementById("slideTimeInput");

  var inputs = document.querySelectorAll(".form-input");
  var savedValue = "";
  inputs.forEach(function (input) {
    input.addEventListener("input", function () {
      var inputID = input.id.replace("Input", "");
      $("#".concat(inputID)).slider("option", "value", input.value);
    });
    input.addEventListener("change", function () {
      $("#".concat(input.id)).val(numberWithCommas(input.value));
    });
    input.addEventListener("focus", function () {
      savedValue = input.value;
      input.value = "";
    });
    input.addEventListener("focusout", function () {
      if (input.value == "") {
        input.value = savedValue;
      }
    });
  });
});
$("#phone").inputmask();
$("#phoneUncertain").inputmask(); // Slide Logic

$("#sliderInvestInput").after(function () {
  return "<span class ='rubles'>рублей</span>";
});
$("#sliderCreditInput").after(function () {
  return "<span class ='rubles'>рублей</span>";
});
$("#sliderTimeInput").after(function () {
  return "<span class ='rubles'>месяцев</span>";
}); // Calculator

function countMonthPayment() {
  var credit = $("#sliderCredit").slider("option", "value") - $("#sliderInvest").slider("option", "value");
  var time = $("#sliderTime").slider("option", "value");
  var interest = 13.0 / 1200.0;
  var totalInterest = round10(interest, -4);
  var resultPayment = credit * totalInterest * Math.pow(1.0 + totalInterest, time) / (Math.pow(1.0 + totalInterest, time) - 1.0);
  resultPayment = Math.floor(resultPayment);
  resultPayment = numberWithSpaces(resultPayment);
  $("#perMonthResult").html(resultPayment + "<span>₽</span>");
} // Submit Form


var submitCalcButton = document.getElementById("submitCalculator");
var submitForm = document.querySelector(".main-form-submit");
var closeSubmitForm = document.getElementById("closeSubmitForm");
submitCalcButton.addEventListener("click", function (event) {
  event.preventDefault();
  formControll();
});
closeSubmitForm.addEventListener("click", function () {
  formControll();
});

function formControll() {
  submitForm.classList.toggle("fromFullToZero");
  submitForm.classList.toggle("fromZeroToFull");
} // // header-swiper
// var swiper = new Swiper('#main-swiper', {
//   fadeEffect: {
//     crossFade: true
//   },
//   navigation: {
//     nextEl: '.swiper-button-next--header',
//     prevEl: '.swiper-button-prev--header',
//   },
//   pagination: {
//     el: '.swiper-pagination',
//     type: 'bullets',
//     clickable: true,
//   },
//   loop: true,
//   // autoplay: {
//   //   delay: 2300,
//   // },
//   fadeEffect: {
//     crossFade: true
//   },
//   speed: 800,
//   watchSlidesProgress: true,
//   watchVisibility: true,
//   disableOnInteraction: true,
// });
// Функция обрабатывающая число, порядок и округления, возвращает
// отформатированое число


function decimalAdjust(type, value, exp) {
  // Проверка числа, чтобы было нормальным
  if (typeof exp === "undefined" || +exp === 0) {
    return Math[type](value);
  }

  value = +value;
  exp = +exp; // Проверка, что число - это число

  if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
    return NaN;
  } // Сдвиг


  value = value.toString().split("e");
  value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp))); // Обратный сдвиг

  value = value.toString().split("e");
  return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
} // Функция форматирования цифр по разрядам


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
} // Округление до н-ого разряда


var round10 = function round10(value, exp) {
  return decimalAdjust("round", value, exp);
};