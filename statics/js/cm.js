import { checkToken } from "./safe/token.js";

if (!checkToken()) {
    window.location.href = "/login.html";
    return;
}

var xhr = new XMLHttpRequest();
xhr.open("POST", "https://607bg.carryrao.top/cm", true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = function() {
if (xhr.readyState == 4) {
    if (xhr.status == 200) {
        var result = JSON.parse(xhr.responseText);
        if (result.status == "success") {
            if (!result.data) {
                console.error("result.data is null or undefined:", result.data);
                return;
            }
            var container = document.getElementById("container");
            for (var i = 0; i < result.data.length; i++) {
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var td2 = document.createElement("td");
                var td3 = document.createElement("td");
                var td4 = document.createElement("td");
                var td5 = document.createElement("td");
                td1.innerHTML = result.data[i].name;
                td2.innerHTML = result.data[i].wechat;
                td3.innerHTML = result.data[i].phone;
                td4.innerHTML = result.data[i].email;
                td5.innerHTML = result.data[i].qq;
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                container.appendChild(tr);
            }
        } else {
            console.error("Request was successful, but status was not 'success':", result.status);
        }
    } else if (xhr.status == 530) {
        console.error("Server responded with status code 530");
    } else {
        console.error("Request failed with status code:", xhr.status);
    }
}
};

xhr.send("username=" + encodeURIComponent(username));