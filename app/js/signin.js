function signin() {
    var httpRequest = new XMLHttpRequest();

    httpRequest.open('POST', 'http://18.221.219.97:5000/signin', true);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {

            if (httpRequest.status === 200) {

                if (JSON.parse(httpRequest.response) === -1) {
                    alert("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.");
                    location.href = "Signin.html"
                }
                else if (JSON.parse(httpRequest.response) === 1) {
                    var date = new Date();
                    date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
                    var strCookie = "isLogin=1;expires=" + date.toUTCString() + ';path=/';
                    var strCookie2 = "userID=" + data.id + ";expires=" + date.toUTCString() + ';path=/';
                    document.cookie = strCookie;
                    document.cookie = strCookie2;
                    location.href = "index.html"

                }
            }
            else {
            }
        }
        else {
        }
    };

    var data = new Object();
    data.id = document.getElementById('id').value;
    data.pw = document.getElementById('password').value;


    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(JSON.stringify(data));

}
function enterkey() {
    if (window.event.keyCode == 13) {
        signin();
    }
} 