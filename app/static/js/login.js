/* eslint-disable indent */
function firstFetch() {
    fetch("/storeName/show")
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            if (responseJson.storeName == "") {
                document.querySelector("#storeName").innerText = "";
            } else {
                document.querySelector(
                    "#storeName"
                ).innerText = `${responseJson.storeName}`;
            }
        })
        .catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 500\n err-fetch-login: storeName\n التاريخ: ${formatDate(
                    new Date()
                )}`
            );
        });
}

firstFetch();

function login() {
    fetch(`/verify/${document.querySelector("#username").value}/${
        document.querySelector("#password").value
    }`, {
            method: "POST"
        })
        .then((response) => {
            return response.json();
        }).catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 500\n err-fetch-login: storeName\n التاريخ: ${formatDate(
                    new Date()
                )}`
            );
        });
    // location.assign(
    //     `/verify/${document.querySelector("#username").value}/${
    //         document.querySelector("#password").value
    //     }`
    // );
}
document.querySelector("#loginBtn").addEventListener("click", (event) => {
    login();
    event.preventDefault();
});