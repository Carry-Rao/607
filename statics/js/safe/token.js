import { getCookie, setCookie } from "./cookie.js";

function getToken() {
    return getCookie("token");
}

export function checkToken() {
    return new Promise((resolve, reject) => {
        if (!getToken()) {
            resolve(false);
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://607backend.carryrao.top/token", true);
        xhr.setRequestHeader("Authorization", "Bearer " + getToken());
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var response = JSON.parse(xhr.responseText);
                    if (response.success == "true") {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                } else {
                    resolve(false);
                }
            }
        };
        xhr.send();
    });
}

export function setToken(token) {
    setCookie("token", token, 30);
}
