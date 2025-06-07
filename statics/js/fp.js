import { sha256_digest, hex } from "./safe/tools.js";

function email() {
    document.getElementById("error").innerHTML = "";
    var name = document.getElementById("name").value;
    var yz = document.getElementsByName("yz");
    var yzValue = "";
    for (var i = 0; i < yz.length; i++) {
        if (yz[i].checked) {
            yzValue = yz[i].value;
            break;
        }
    }
    if (yzValue == "") {
        document.getElementById("error").innerHTML = "请选择验证方式！";
        return;
    } 
    if (name == "") {
        document.getElementById("error").innerHTML = "姓名不能为空！";
        return;
    }    
    var xhr = new XMLHttpRequest();
    if (yzValue == "email") {
        xhr.open("POST", "https://607bg.carryrao.top/fpe", true);
    } else if (yzValue == "qq") {
        xhr.open("POST", "https://607bg.carryrao.top/fpq", true);
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var result = JSON.parse(xhr.responseText);
                if (result.status == "success") {
                    return;
                } else {
                    document.getElementById("error").innerHTML = result.message;
                }
            } else if (xhr.status == 530) {
                document.getElementById("error").innerHTML = "服务器错误！";
            }
        }
    };
    xhr.send("name=" + name);
}

function fp() {
    document.getElementById("error").innerHTML = "";
    var name = document.getElementById("name").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var yz = document.getElementsByName("yz");
    var yzValue = "";
    for (var i = 0; i < yz.length; i++) {
        if (yz[i].checked) {
            yzValue = yz[i].value;
            break;
        }
    }
    if (yzValue == "") {
        document.getElementById("error").innerHTML = "请选择验证方式！";
        return;
    }
    if (name == "" || username == "" || password == "") {
        document.getElementById("error").innerHTML = "姓名、用户名或密码不能为空！";
        return;
    }
    sha256_digest(password).then(function(sha256) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://607bg.carryrao.top/fp", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var result = JSON.parse(xhr.responseText);
                    if (result.status == "success") {
                        window.location.href = "/login.html";
                    } else {
                        document.getElementById("error").innerHTML = result.message;
                    }
                } else if (xhr.status == 401) {
                    document.getElementById("error").innerHTML = "邮件验证码错误！";
                } else if (xhr.status == 530) {
                    document.getElementById("error").innerHTML = "服务器错误，请稍后再试！";
                } else {
                    var response = JSON.parse(xhr.responseText);
                    document.getElementById("error").innerHTML = response.error;
                }
            }
        };
        xhr.send("name=" + name + "&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(sha256) + "&type=" + yzValue);
    });
}