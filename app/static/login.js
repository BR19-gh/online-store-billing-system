function firstFetch() {
    fetch("/storeName/show").then((response) => {
        return response.json()
    }).then((responseJson) => {
        if (responseJson.storeName == '') document.querySelector('#storeName').innerText = ''
        else document.querySelector('#storeName').innerText = `${responseJson.storeName}`
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