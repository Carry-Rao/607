import { getCookie, setCookie } from "./cookie.js";

function getToken() {
    return getCookie("token");
}

export function checkToken() {
    if (!getToken()) {
        return false;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://607backend.carryrao.top/token", true);
    xhr.setRequestHeader("Authorization", "Bearer " + getToken());
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.success == "true") {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
}

export function setToken(token) {
    setCookie("token", token, 30);
}

