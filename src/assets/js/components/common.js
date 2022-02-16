$(document).ready(function() {
    $("#sliderCredit").slider({
        range: "min",
        animate: true,
        value: 500000,
        min: 100000,
        max: 8000000,
        step: 10000,
        slide: function slide(event, ui) {
            var debtValue = ui.value;
            debtValue = numberWithCommas(debtValue);
            $("#slideCreditInput").val(debtValue);
        },
    });
    $("#sliderInvest").slider({
        range: "min",
        animate: true,
        value: 0,
        min: 0,
        max: 6400000,
        step: 10000,
        slide: function slide(event, ui) {
            var debtValue = ui.value;
            debtValue = numberWithCommas(debtValue);
            $("#slideInvestInput").val(debtValue);
        },
    });
    $("#sliderTime").slider({
        range: "min",
        animate: true,
        value: 36,
        min: 6,
        max: 96,
        step: 6,
        slide: function slide(event, ui) {
            var debtValue = ui.value;
            debtValue = numberWithCommas(debtValue);
            $("#slideTimeInput").val(debtValue);
        },
    });
});

$("#phone").inputmask();
$("#phoneUncertain").inputmask(); // Slide Logic

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

$("#slideInvestInput").after(function() {
    return "<span class ='rubles'>рублей</span>";
});
$("#slideCreditInput").after(function() {
    return "<span class ='rubles'>рублей</span>";
});
$("#slideTimeInput").after(function() {
    return "<span class ='rubles'>месяцев</span>";
});