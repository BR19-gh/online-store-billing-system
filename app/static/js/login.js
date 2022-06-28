/* eslint-disable indent */
function firstFetch() {
    fetch("/storeName/show")
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            if (responseJson.storeName === "") {
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
    location.assign(
        `/verify/${document.querySelector("#username").value}/${
            document.querySelector("#password").value
        }`
    );
}
document.querySelector("#loginBtn").addEventListener("click", (event) => {
    login();
    event.preventDefault();
});

function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "م" : "ص";
    hours = hours % 12;
    hours = hours || 12;
    // minutes = minutes < 10 ? '0' + minutes : minutes;
    const year = date.getFullYear();
    let month = date.getMonth();
    month =
        Number(month) + 1 < 10 ? "0" + (Number(month) + 1) : Number(month) + 1;
    var date = date.getDate();
    date = date < 10 ? "0" + date : date;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime =
        year + "/" + month + "/" + date + ", " + hours + ":" + minutes + ampm;
    return strTime;
}