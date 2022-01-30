function firstFetch() {
    fetch("/storeName/show").then((response) => {
        return response.json()
    }).then((responseJson) => {
        if (responseJson.storeName == '') document.getElementById('storeName').innerText = ''
        else document.getElementById('storeName').innerText = `${responseJson.storeName}`
    })
}

firstFetch();

function login() {
    location.assign(`/verfiy/${document.getElementById('username').value}/${document.getElementById('password').value}`)

}
document.getElementById('loginBtn').addEventListener('click', (event) => {
    login();
    event.preventDefault();
})