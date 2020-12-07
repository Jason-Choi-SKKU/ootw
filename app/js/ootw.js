var outers = { "None": 0, "Jacket": 35, "Cardigan": 35, "Blazer": 35, "Jersey": 35, "Hood zip-up": 40, "Vest padding": 50, "Windbreak": 50, "Fleece": 60, "Coat": 70, "Short padding": 90, "Long padding": 100 };

var tops = { "None": 0, "Sleeveless": 5, "Short-sleeved T-shirt": 8, "Long-sleeved T-shirt": 15, "Shirts": 15, "Sweatshirts": 25, "Hoodie": 30, "Crewneck Sweater": 35, "Turtleneck Sweater": 40 };

var bottom = { "None": 0, "Shorts": 5, "Linen trousers": 10, "Cotton pants": 20, "Slacks": 20, "Jeans": 30, "Sweat pants": 30 };

var temp_max;
var temp_min;

$.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=37.568&lon=126.978&exclude=hourly,minutely&appid=8eb8a13e66d5778e5e0e63510fdcba9b&units=metric', function (data) {
    temp_max = data.daily[0].temp.max;
    temp_min = data.daily[0].temp.min;

});



function post_ootw(n) {


    var httpRequest = new XMLHttpRequest();

    httpRequest.open('POST', 'http://18.221.219.97:5000/add', true);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {

            if (httpRequest.status === 200) {

                if (JSON.parse(httpRequest.response) === -1) {
                    alert("요청 처리 과정에서 에러가 발생했습니다.");
                    location.href = "ootw.html"
                }
                else if (JSON.parse(httpRequest.response) === 1) {
                    alert("전송되었습니다.")
                }
            }
        }
    };


    var data = new Object();

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();


    var o = document.getElementById('outers').value;
    var t = document.getElementById('top').value;
    var b = document.getElementById('bottom').value;
    var ootw = outers[o] + tops[t] + bottom[b];

    ootw = ootw + 5 * n;

    var strData = [];
    strData.push(String((yyyy % 100) * 10000 + mm * 100 + dd));
    strData.push(o);
    strData.push(t);
    strData.push(b);

    var numData = [];
    numData.push(temp_max);
    numData.push(temp_min);
    numData.push(ootw);


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

    data.numData = numData;
    data.strData = strData;


    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(JSON.stringify(data));

}

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
document.getElementById("date").innerHTML = yyyy + '-' + mm + '-' + dd;