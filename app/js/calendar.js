var currentTitle = document.getElementById('current-year-month');
var calendarBody = document.getElementById('calendar-body');
var today = new Date();
var first = new Date(today.getFullYear(), today.getMonth(),1);
var dayList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var monthList = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var leapYear=[31,29,31,30,31,30,31,31,30,31,30,31];
var notLeapYear=[31,28,31,30,31,30,31,31,30,31,30,31];
var pageFirst = first;
var pageYear;
var mainTodayDay = document.getElementById('main-day');
var mainTodayDate = document.getElementById('main-date');

var mainTempHigh = document.getElementById("temp-high");
var mainTempLow = document.getElementById("temp-low");

var mainInputOuter = document.getElementById("input-Outer");
var mainInputTop = document.getElementById("input-Top");
var mainInputBottom = document.getElementById("input-Bottom");

var cloth;

if(first.getFullYear() % 4 === 0){
    pageYear = leapYear;
}else{
    pageYear = notLeapYear;
}

function showCalendar(){
    let monthCnt = 100;
    let cnt = 1;
    for(var i = 0; i < 6; i++){
        var $tr = document.createElement('tr');
        $tr.setAttribute('id', monthCnt);   
        for(var j = 0; j < 7; j++){
            if((i === 0 && j < first.getDay()) || cnt > pageYear[first.getMonth()]){
                var $td = document.createElement('td');
                $tr.appendChild($td);     
            }else{
                var $td = document.createElement('td');
                $td.textContent = cnt;
                $td.setAttribute('id', cnt);                
                $tr.appendChild($td);
                cnt++;
            }
        }
        monthCnt++;
        calendarBody.appendChild($tr);
    }
}
showCalendar();

function removeCalendar(){
    let catchTr = 100;
    for(var i = 100; i< 106; i++){
        var $tr = document.getElementById(catchTr);
        $tr.remove();
        catchTr++;
    }
}

function prev(){
    if(pageFirst.getMonth() === 1){
        pageFirst = new Date(first.getFullYear()-1, 12, 1);
        first = pageFirst;
        if(first.getFullYear() % 4 === 0){
            pageYear = leapYear;
        }else{
            pageYear = notLeapYear;
        }
    }else{
        pageFirst = new Date(first.getFullYear(), first.getMonth()-1, 1);
        first = pageFirst;
    }
    today = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());
    currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;'+ first.getFullYear();
    removeCalendar();
    showCalendar();
    showMain();
    clickedDate1 = document.getElementById(today.getDate());
    clickedDate1.classList.add('active');
    clickStart();
}

function next(){
    if(pageFirst.getMonth() === 12){
        pageFirst = new Date(first.getFullYear()+1, 1, 1);
        first = pageFirst;
        if(first.getFullYear() % 4 === 0){
            pageYear = leapYear;
        }else{
            pageYear = notLeapYear;
        }
    }else{
        pageFirst = new Date(first.getFullYear(), first.getMonth()+1, 1);
        first = pageFirst;
    }
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;'+ first.getFullYear();
    removeCalendar();
    showCalendar(); 
    showMain();
    clickedDate1 = document.getElementById(today.getDate());
    clickedDate1.classList.add('active');  
    clickStart();
}



function getcloth(date){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'http://18.221.219.97:5000//getClothingByDate', true);
    httpRequest.onreadystatechange=function(){
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if(httpRequest.status===200){
                if(JSON.parse(httpRequest.response)===-1){
                    cloth=['None', 'None', 'None', 'None', 'None']
                    changecloth();
                }
                else{
                    cloth = JSON.parse(httpRequest.response);
                    changecloth();
                }
            }
        }
    };

    var data= new Object();

    var cookie = document.cookie.split(';');
    cookie.some(function (item) {
        item = item.replace(' ', '');

        var dic = item.split('=');
        
        if (dic[0] === 'isLogin') {
            if (dic[1]=='1'){
            }
            else{
                location.href = 'index.html';
            }
        }
        else if(dic[0] === 'userID') {
            data.id = dic[1];
        }
    });
    data.date=date;

    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(JSON.stringify(data)); 
}

function changecloth(){
    mainInputOuter.innerHTML = cloth[0]
    mainInputTop.innerHTML = cloth[1]
    mainInputBottom.innerHTML = cloth[2]

    if (cloth[0] == "None"){
        mainTempHigh.innerHTML = cloth[3]
        mainTempLow.innerHTML = cloth[4]
    }
    else{
        mainTempHigh.innerHTML = cloth[3] + "℃"
        mainTempLow.innerHTML = cloth[4] + "℃"
    }
}



currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;' + first.getFullYear();
function showMain(){

    var date = (today.getFullYear()%100)*10000 +(today.getMonth()+1)*100+today.getDate();

    mainTodayDay.innerHTML = dayList[today.getDay()];
    mainTodayDate.innerHTML = today.getDate();
    
    getcloth(String(date));
    
}
showMain();













var clickedDate1 = document.getElementById(today.getDate());
clickedDate1.classList.add('active');
var prevBtn = document.getElementById('prev');
var nextBtn = document.getElementById('next');
prevBtn.addEventListener('click',prev);
nextBtn.addEventListener('click',next);
var tdGroup = [];
function clickStart(){
    for(let i = 1; i <= pageYear[first.getMonth()]; i++){
        tdGroup[i] = document.getElementById(i);
        tdGroup[i].addEventListener('click',changeToday);
    }
}
function changeToday(e){
    for(let i = 1; i <= pageYear[first.getMonth()]; i++){
        if(tdGroup[i].classList.contains('active')){
            tdGroup[i].classList.remove('active');
        }
    }
    clickedDate1 = e.currentTarget;
    clickedDate1.classList.add('active');
    today = new Date(today.getFullYear(), today.getMonth(), clickedDate1.id);
    showMain();
    keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();
}
clickStart();