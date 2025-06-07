function register() {
    document.getElementById("error").innerHTML = "";
    var tos = document.getElementsByName("tos");
    var tosValue = "";
    for (var i = 0; i < tos.length; i++) {
        if (tos[i].checked) {
            tosValue = tos[i].value;
            break;
        }
    }
    if (tosValue == "") {
        document.getElementById("error").innerHTML = "请选择注册身份";
        return;
    }
    var name = document.getElementById("name").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var yzpassword = document.getElementById("yzpassword").value;
    if (name == "" || username == "" || password == "" || yzpassword == "") {
        document.getElementById("error").innerHTML = "请填写所有必填项";
        return;
    }
    if (password != yzpassword) {
        document.getElementById("error").innerHTML = "两次输入的密码不一致";
        return;
    }
    sha256_digest(password)
        .then(function(hash) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://607bg.carryrao.top/register", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var response = JSON.parse(xhr.responseText);
                        if (response.status === "success") {
                            document.getElementById("ok").style.display = "block";
                        } else {
                            document.getElementById("error").innerHTML = response.message;
                        }
                    } else if (xhr.status === 530) {
                        document.getElementById("error").innerHTML = "服务器错误";
                    } else {
                        var response = JSON.parse(xhr.responseText);
                        document.getElementById("error").innerHTML = response.message;
                    } 
                }
            };
            xhr.send("tos=" + tosValue + "&name=" + name + "&username=" + username + "&password=" + hash);
        });
}