function firstFetch() {
    fetch("/storeName/show").then((response) => {
        return response.json()
    }).then((responseJson) => {
        if (responseJson.storeName == '') document.querySelector('#storeName').innerText = ''
        else document.querySelector('#storeName').innerText = `${responseJson.storeName}`
    }).catch(error => {
        alert(`هناك خطأ في التواصل مع السيرفر، تواصل مع المطور لحل المشكلة أو انتظر حتى يتم حلها\nالخطأ: ${error}//login:storeName// 506\n التاريخ: ${formatDate(new Date())}`)
    });



}

firstFetch();

function login() {
    location.assign(`/verify/${document.querySelector('#username').value}/${document.querySelector('#password').value}`)

}
document.querySelector('#loginBtn').addEventListener('click', (event) => {
    login();
    event.preventDefault();
})