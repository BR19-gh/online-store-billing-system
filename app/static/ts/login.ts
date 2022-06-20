let storeName = <HTMLElement> document.querySelector('#storeName');
function firstFetch() : void {
    fetch('/storeName/show')
        .then((response) => {
            return response.json()
        })
        .then((responseJson) => {
            if (responseJson.storeName == '') {
               
               storeName!.innerText = ''
            } else {
                storeName!.innerText = `${responseJson.storeName}`
            }
        })
        .catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: ${error}//login:storeName// 506\n التاريخ: ${formatDate(
                    new Date()
                )}`
            )
        })
}

firstFetch()
let username  = <HTMLInputElement> document.querySelector('#username');
username as HTMLInputElement;
let password = <HTMLInputElement> document.querySelector('#password');
function login(): void {
    location.assign(
        `/verify/${username!.value}/${
            password!.value
        }`
    )
}
document.querySelector('#loginBtn')!.addEventListener('click', (event) => {
    login()
    event.preventDefault()
})
