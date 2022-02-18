// Функция обрабатывающая число, порядок и округления, возвращает
// отформатированое число
function decimalAdjust(type, value, exp) {
    // Проверка числа, чтобы было нормальным
    if (typeof exp === "undefined" || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Проверка, что число - это число
    if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
        return NaN;
    }
    // Сдвиг
    value = value.toString().split("e");
    value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
    // Обратный сдвиг
    value = value.toString().split("e");
    return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
}
// Функция форматирования цифр по разрядам
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
// Округление до н-ого разряда
const round10 = (value, exp) => decimalAdjust("round", value, exp);