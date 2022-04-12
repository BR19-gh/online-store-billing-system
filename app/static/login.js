function firstFetch() {
    fetch("/storeName/show").then((response) => {
        return response.json()
    }).then((responseJson) => {
        if (responseJson.storeName == '') document.getElementById('storeName').innerText = ''
        else document.getElementById('storeName').innerText = `${responseJson.storeName}`
    });

    fetch('/storeTheme/show', { method: 'GET', }).then((responseName) => { return responseName.json(); })
        .then((responseJson) => {

            if (responseJson['storeTheme'] == "none/لايوجد") {

            } else {


                if (responseJson['storeTheme'] == 'originalTheme') {
                    document.documentElement.style.setProperty('--body', '#f0e9c9');
                    document.documentElement.style.setProperty('--borders', '#8f8d85');
                    document.documentElement.style.setProperty('--btns', '#f5ebbd');
                    document.documentElement.style.setProperty('--btnsHover', '#bbb496');
                    document.documentElement.style.setProperty('--container', '#d4cbabc0');
                    document.documentElement.style.setProperty('--containerHover', '#d4cbaba0');
                    document.documentElement.style.setProperty('--h1', '#c2bba1a0');
                    document.documentElement.style.setProperty('--h1OtherScreen', '#c2bba1d0');
                    document.documentElement.style.setProperty('--form', '#c4c1b6c0');
                    document.documentElement.style.setProperty('--formHover', '#c4c1b6');
                    document.documentElement.style.setProperty('--input', '#8f8d85');
                    document.documentElement.style.setProperty('--inputHover', '#aca588');
                    document.documentElement.style.setProperty('--inputFocus', '#b1a883');
                    document.documentElement.style.setProperty('--webkitScrollbarTrack', '#c4c1b6c0');
                    document.documentElement.style.setProperty('--webkitScrollbarThumb', '#969287');
                    document.documentElement.style.setProperty('--webkitScrollbarThumbHover', '#797464');
                    document.documentElement.style.setProperty('--infoCard', '#d4cbaba8');
                } else if (responseJson['storeTheme'] == 'blueTheme') {
                    document.documentElement.style.setProperty('--body', '#c9cbf0');
                    document.documentElement.style.setProperty('--borders', '#85868f');
                    document.documentElement.style.setProperty('--btns', '#bdbef5');
                    document.documentElement.style.setProperty('--btnsHover', '#9796bb');
                    document.documentElement.style.setProperty('--container', '#4169E1c0');
                    document.documentElement.style.setProperty('--containerHover', '#4169E1a0');
                    document.documentElement.style.setProperty('--h1', '#a3a1c2a0');
                    document.documentElement.style.setProperty('--h1OtherScreen', '#a3a1c2d0');
                    document.documentElement.style.setProperty('--form', '#b6b6c4c0');
                    document.documentElement.style.setProperty('--formHover', '#acaec5');
                    document.documentElement.style.setProperty('--input', '#85858f');
                    document.documentElement.style.setProperty('--inputHover', '#8889ac');
                    document.documentElement.style.setProperty('--inputFocus', '#8783b1');
                    document.documentElement.style.setProperty('--webkitScrollbarTrack', '#b6b6c4c0');
                    document.documentElement.style.setProperty('--webkitScrollbarThumb', '#878796');
                    document.documentElement.style.setProperty('--webkitScrollbarThumbHover', '#646579');
                    document.documentElement.style.setProperty('--infoCard', '#abaed4a8');
                } else if (responseJson['storeTheme'] == 'greenTheme') {
                    document.documentElement.style.setProperty('--body', '#c9f0cb');
                    document.documentElement.style.setProperty('--borders', '#858f86');
                    document.documentElement.style.setProperty('--btns', '#bdf5be');
                    document.documentElement.style.setProperty('--btnsHover', '#96bb9a');
                    document.documentElement.style.setProperty('--container', '#1e796bc0');
                    document.documentElement.style.setProperty('--containerHover', '#1e796ba0');
                    document.documentElement.style.setProperty('--h1', '#a1c2a3a0');
                    document.documentElement.style.setProperty('--h1OtherScreen', '#a1c2a3d0');
                    document.documentElement.style.setProperty('--form', '#b6c4b7c0');
                    document.documentElement.style.setProperty('--formHover', '#b6c4b8');
                    document.documentElement.style.setProperty('--input', '#858f85');
                    document.documentElement.style.setProperty('--inputHover', '#88ac8b');
                    document.documentElement.style.setProperty('--inputFocus', '#83b185');
                    document.documentElement.style.setProperty('--webkitScrollbarTrack', '#b6c4b8c0');
                    document.documentElement.style.setProperty('--webkitScrollbarThumb', '#879687');
                    document.documentElement.style.setProperty('--webkitScrollbarThumbHover', '#647965');
                    document.documentElement.style.setProperty('--infoCard', '#abd4b0a8');
                } else if (responseJson['storeTheme'] == 'redTheme') {
                    document.documentElement.style.setProperty('--body', '#f0c9c9');
                    document.documentElement.style.setProperty('--borders', '#8f8585');
                    document.documentElement.style.setProperty('--btns', '#f5bdbd');
                    document.documentElement.style.setProperty('--btnsHover', '#bb9696');
                    document.documentElement.style.setProperty('--container', '#ad5a54c0');
                    document.documentElement.style.setProperty('--containerHover', '#ad5a54a0');
                    document.documentElement.style.setProperty('--h1', '#c2a1a1a0');
                    document.documentElement.style.setProperty('--h1OtherScreen', '#c2a1a1d0');
                    document.documentElement.style.setProperty('--form', '#c4b6b6c0');
                    document.documentElement.style.setProperty('--formHover', '#c4b6b6');
                    document.documentElement.style.setProperty('--input', '#8f8585');
                    document.documentElement.style.setProperty('--inputHover', '#ac8888');
                    document.documentElement.style.setProperty('--inputFocus', '#b18383');
                    document.documentElement.style.setProperty('--webkitScrollbarTrack', '#c4b6b6c0');
                    document.documentElement.style.setProperty('--webkitScrollbarThumb', '#968787');
                    document.documentElement.style.setProperty('--webkitScrollbarThumbHover', '#796464');
                    document.documentElement.style.setProperty('--infoCard', '#d4ababa8');
                } else {
                    document.documentElement.style.setProperty('--body', '#bbc0c6');
                    document.documentElement.style.setProperty('--borders', '#888888');
                    document.documentElement.style.setProperty('--btns', '#a7aaad');
                    document.documentElement.style.setProperty('--btnsHover', '#94979b');
                    document.documentElement.style.setProperty('--container', '#838690c0');
                    document.documentElement.style.setProperty('--containerHover', '#838690a0');
                    document.documentElement.style.setProperty('--h1', '#c2c2c2a0');
                    document.documentElement.style.setProperty('--h1OtherScreen', '#c2c2c2d0');
                    document.documentElement.style.setProperty('--form', '#cdcdcec0');
                    document.documentElement.style.setProperty('--formHover', '#cdcdce');
                    document.documentElement.style.setProperty('--input', '#8a8a8a');
                    document.documentElement.style.setProperty('--inputHover', '#a9a9a9');
                    document.documentElement.style.setProperty('--inputFocus', '#aeaeae');
                    document.documentElement.style.setProperty('--webkitScrollbarTrack', '#b6b6c4c0');
                    document.documentElement.style.setProperty('--webkitScrollbarThumb', '#969696');
                    document.documentElement.style.setProperty('--webkitScrollbarThumbHover', '#727272');
                    document.documentElement.style.setProperty('--infoCard', '#d1d1d1a8');
                }


            }
            console.log('current theme is ' + responseJson['storeTheme'])
        });

}

firstFetch();

function login() {
    location.assign(`/verify/${document.getElementById('username').value}/${document.getElementById('password').value}`)

}
document.getElementById('loginBtn').addEventListener('click', (event) => {
    login();
    event.preventDefault();
})