var temp__min2 = 0;
var clothes__list = [];
var temp__max2 = 0;
var ootwn;
var outers = { "None": 0, "Jacket": 35, "Cardigan": 35, "Blazer": 35, "Jersey": 35, "Hood zip-up": 40, "Vest padding": 50, "Windbreak": 50, "Fleece": 60, "Coat": 70, "Short padding": 90, "Long padding ": 100 };
var tops = { "None": 0, "Sleeveless": 5, "Short-sleeved T-shirt": 8, "Long-sleeved T-shirt": 15, "Shirts": 15, "Sweatshirts": 25, "Hoodie": 30, "Crewneck Sweater": 35, "Turtleneck Sweater": 40 };
var bottom = { "None": 0, "Shorts": 5, "Linen trousers": 10, "Cotton pants": 20, "Slacks": 20, "Jeans": 30, "Sweat pants": 30 };

$.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=37.568&lon=126.978&exclude=hourly,minutely&appid=8eb8a13e66d5778e5e0e63510fdcba9b&units=metric', function (data) {
    var today = new Date($.now());
    var today__month = today.getMonth() + 1;
    var today__date = today.getFullYear() + '-' + today__month + '-' + today.getDate();

    var temp__min = data.daily[0].temp.min;
    var temp__max = data.daily[0].temp.max;
    temp__min2 = temp__min;
    temp__max2 = temp__max;
    var temp__average =
        (data.daily[0].temp.day +
            data.daily[0].temp.night +
            data.daily[0].temp.eve +
            data.daily[0].temp.morn) / 4;

    var wIcon = data.daily[0].weather[0].icon;

    $('.weatherbox__temperature__average').text(Math.round(temp__average) + '℃');
    $('.temperature__highest').text(Math.round(temp__max) + '℃');
    $('.temperature__lowest').text(Math.round(temp__min) + '℃');
    $('.weatherbox__logo').empty();
    $('.weatherbox__logo').append('<img class="temp__logo"src="http://openweathermap.org/img/wn/' + wIcon + '@2x.png">');
    $('.weatherbox__date').text(today__date);
    ootwn = GET_OOTW();
    ootw();
    changeclothes();

});


$(document).ready(function () {
    $(".toggle__state").click(function () {
        $('.label__text').text(function (i, oldText) {
            if (oldText === 'Today') {
                $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=37.568&lon=126.978&exclude=hourly,minutely&appid=8eb8a13e66d5778e5e0e63510fdcba9b&units=metric', function (data) {
                    var today = new Date($.now());
                    var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
                    var today__month = tomorrow.getMonth() + 1;
                    var today__date = tomorrow.getFullYear() + '-' + today__month + '-' + tomorrow.getDate();

                    var temp__min = data.daily[1].temp.min;
                    var temp__max = data.daily[1].temp.max;
                    temp__min2 = temp__min;
                    temp__max2 = temp__max;
                    var temp__average =
                        (data.daily[1].temp.day +
                            data.daily[1].temp.night +
                            data.daily[1].temp.eve +
                            data.daily[1].temp.morn) / 4;
                    var wIcon = data.daily[1].weather[0].icon;

                    $('.weatherbox__temperature__average').text(Math.round(temp__average) + '℃');
                    $('.temperature__highest').text(Math.round(temp__max) + '℃');
                    $('.temperature__lowest').text(Math.round(temp__min) + '℃');
                    $('.weatherbox__logo').empty();
                    $('.weatherbox__logo').append('<img src="http://openweathermap.org/img/wn/' + wIcon + '@2x.png">');
                    $('.weatherbox__date').text(today__date);
                });
                ootwn = GET_OOTW();
                return 'Tomorrow';
            }
            else {
                $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=37.568&lon=126.978&exclude=hourly,minutely&appid=8eb8a13e66d5778e5e0e63510fdcba9b&units=metric', function (data) {
                    var today = new Date($.now());
                    var today__month = today.getMonth() + 1;
                    var today__date = today.getFullYear() + '-' + today__month + '-' + today.getDate();

                    var temp__min = data.daily[0].temp.min;
                    var temp__max = data.daily[0].temp.max;

                    temp__min2 = temp__min;
                    temp__max2 = temp__max;
                    var temp__average =
                        (data.daily[0].temp.day +
                            data.daily[0].temp.night +
                            data.daily[0].temp.eve +
                            data.daily[0].temp.morn) / 4;
                    var wIcon = data.daily[0].weather[0].icon;

                    $('.weatherbox__temperature__average').text(Math.round(temp__average) + '℃');
                    $('.temperature__highest').text(Math.round(temp__max) + '℃');
                    $('.temperature__lowest').text(Math.round(temp__min) + '℃');
                    $('.weatherbox__logo').empty();
                    $('.weatherbox__logo').append('<img src="http://openweathermap.org/img/wn/' + wIcon + '@2x.png">');
                    $('.weatherbox__date').text(today__date);
                });
                ootwn = GET_OOTW();


                return 'Today';
            }
        });
    });
});


function GET_OOTW() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'http://18.221.219.97:5000/get', true);
    var OOTW = httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {

            if (httpRequest.status === 200) {

                if (JSON.parse(httpRequest.response) === -1) {
                    alert("요청 처리 과정에서 에러가 발생했습니다.");
                    location.href = "today.html";
                }
                else {
                    ootwn = JSON.parse(httpRequest.response);
                    ootw();
                    changeclothes();
                }
            }
        }
    };
    var data = new Object();


    var cookie = document.cookie.split(';');
    cookie.some(function (item) {
        item = item.replace(' ', '');

        var dic = item.split('=');

        if (dic[0] === 'isLogin') {
            if (dic[1] == '1') {
            }
            else {
                location.href = 'index.html';
            }
        }
        else if (dic[0] === 'userID') {
            data.id = dic[1];
        }
    });


    data.high = temp__max2;
    data.low = temp__min2;

    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(JSON.stringify(data));
}


function ootw() {
    var clothes = []; /*dp를 쓸 수 있을 수도?*/
    for (var o in outers) {
        for (var t in tops) {
            for (var b in bottom) {
                var temp = outers[o] + tops[t] + bottom[b];
                if (ootwn - 5 < temp) {
                    if (temp < ootwn + 5) {
                        var outfit = [];
                        outfit[0] = o;
                        outfit[1] = t;
                        outfit[2] = b;

                        clothes.push(outfit);
                    }
                }
            }
        }
    }
    console.log(clothes);
    clothes__list = shuffle(clothes);
    return 0;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    console.log(array);
    return array;
}

var num = 1;

function changeclothes() {
    var clothes__length = clothes__list.length;

    var i;
    for (i = 0; i < clothes__length; i++) {
        if (num == i) {
            document.getElementById('Outer__clothes').innerHTML = clothes__list[i][0];
            document.getElementById('Top__clothes').innerHTML = clothes__list[i][1];
            document.getElementById('Bottom__clothes').innerHTML = clothes__list[i][2];
            console.log(clothes__list[i][0], clothes__list[i][1], clothes__list[i][2]);
        }
    }
    num++;
    if (num > clothes__length - 1) {
        num = 0;
    }
}
function logout() {
    var data = new Object();

    var cookie = document.cookie.split(';');
    cookie.some(function (item) {
        item = item.replace(' ', '');

        var dic = item.split('=');

        if (dic[0] === 'isLogin') {
            if (dic[1] == '1') {
                document.cookie = "isLogin=1;expires=" + "Thu, 01 Jan 1999 00:00:10 GMT;" + ';path=/';
            }
            else {
                location.href = 'index.html';
            }
        }
        else if (dic[0] === 'userID') {
            data.id = dic[1];
            document.cookie = "userID=" + data.id + '; expires=Thu, 01 Jan 1999 00:00:10 GMT;' + ';path=/';
            location.href = "index.html"
        }
    });
}