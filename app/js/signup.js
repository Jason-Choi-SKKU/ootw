function signup() {

    var httpRequest = new XMLHttpRequest();

    httpRequest.open('POST', 'http://18.221.219.97:5000/signup', true);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {

            if (httpRequest.status === 200) {

                if (JSON.parse(httpRequest.response) === -1) {
                    alert("이미 사용중인 아이디입니다");
                    location.href = "signup.html"
                }
                else if (JSON.parse(httpRequest.response) === 1) {
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

};