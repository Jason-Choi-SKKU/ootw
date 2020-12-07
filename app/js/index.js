document.addEventListener("DOMContentLoaded", function () {
    var cookie = document.cookie.split(';');
    cookie.some(function (item) {
        item = item.replace(' ', '');
        var dic = item.split('=');
        if (dic[0] === 'isLogin') {
            if (dic[1] === '1') {
                location.href = 'today.html'
                return 1
            }
            else {
                location.href = 'Signin.html'
            }
        }
        else {
            location.href = 'Signin.html'
        }
    });

});