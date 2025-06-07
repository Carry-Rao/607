import sha256_digest from "./safe/tools.js";
import setToken from "./safe/token.js";

console.log ("login.js")

export function login() {
    document.getElementById("error").innerHTML = "";
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "" || password == "") {
        document.getElementById("error").innerHTML = "用户名或密码不能为空！";
        return;
    }
    sha256_digest(password).then(function(sha256) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://607backend.carryrao.top/login", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var result = JSON.parse(xhr.responseText);
                    if (result.status == "success") {
                        setToken(result.token);
                        window.location.href = "/index.html";
                    } else {
                        document.getElementById("error").innerHTML = result.err;
                    }
                } else if (xhr.status == 401) {
                    document.getElementById("error").innerHTML = "用户名或密码错误！";
                } else if (xhr.status == 403) {
                    document.getElementById("error").innerHTML = "用户已被禁用！";
                } else if (xhr.status == 530) {
                    document.getElementById("error").innerHTML = "服务器错误！";
                } else {
                    var response = JSON.parse(xhr.responseText);
                    document.getElementById("error").innerHTML = response.err;
                }
            }
        };
        xhr.send("username=" + username + "&password=" + sha256);
    });
}