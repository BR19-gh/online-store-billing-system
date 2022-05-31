//// theme related

fetch('/storeTheme/show', { method: 'GET', }).then((responseName) => { return responseName.json(); })
    .then((responseJson) => {
        if (responseJson.storeTheme == "none/لايوجد" || responseJson.storeTheme == "originalTheme") { originalTheme.className = "circleTheme-selected" } else if (responseJson.storeTheme == "greenTheme") { greenTheme.className = "circleTheme-selected" } else if (responseJson.storeTheme == "blueTheme") { blueTheme.className = "circleTheme-selected" } else if (responseJson.storeTheme == "redTheme") { redTheme.className = "circleTheme-selected" } else if (responseJson.storeTheme == "greyTheme") { greyTheme.className = "circleTheme-selected" } else if (responseJson.storeTheme == "pinkTheme") { pinkTheme.className = "circleTheme-selected" } else { originalTheme.className = "circleTheme-selected" }
    });

var themeBtns = document.querySelectorAll('div.circleTheme');
for (var i = 0; i < themeBtns.length; i++) {
    themeBtns[i].onclick = function() {

        for (let i = 0; i < themesContainer.childNodes.length; i++) {

            themesContainer.childNodes[i].className = "circleTheme"

        }

        console.log(this.id);

        fetch('/storeTheme/show', { method: 'GET', }).then((responseName) => { return responseName.json(); })
            .then((responseJson) => {
                let method;
                if (responseJson.storeTheme == "none/لايوجد") {
                    method = "POST";
                } else { method = "PUT"; }

                fetch('/storeTheme', {
                        headers: {

                            'Method': `${method}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        method: `${method}`,
                        body: JSON.stringify({
                            storeTheme: this.id,
                        })
                    })
                    .then((response) => {
                        return response.json();
                    }).then((responseJson) => {
                        if (responseJson.statCode == 403) {
                            alert('حدث خطأ في ' + method + '. \n\n ErrCode: 403 : رمز الخطأ')
                            return;
                        }
                        if (responseJson.statCode == 429) {
                            alert('لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                            return;
                        }
                        fetch('/storeTheme/show', { method: 'GET', }).then((responseName) => { return responseName.json(); })
                            .then((responseJson) => {
                                if (responseJson.storeTheme == "none/لايوجد" || responseJson.storeTheme == "originalTheme") { originalTheme.className = "circleTheme-selected" } else if (responseJson.storeTheme == "greenTheme") { greenTheme.className = "circleTheme-selected" } else if (responseJson.storeTheme == "blueTheme") { blueTheme.className = "circleTheme-selected" } else if (responseJson.storeTheme == "redTheme") { redTheme.className = "circleTheme-selected" } else if (responseJson.storeTheme == "greyTheme") { greyTheme.className = "circleTheme-selected" } else if (responseJson.storeTheme == "pinkTheme") { pinkTheme.className = "circleTheme-selected" } else { originalTheme.className = "circleTheme-selected" }
                            });
                        fetchThemes();

                    });
            });


    }
}


/// expand or Narrow related

function expOrNarProduct(expOrNarProductKey) {
    if (expOrNarProductKey == 1) {
        document.querySelector('#productsList').style.height = "100%"
        document.querySelector('#productsList').style.overflow = "auto";
        productsList.childNodes[Object.keys(productsList.childNodes).length - 1].innerHTML = '<div id="expOrNarProduct" onclick="expOrNarProduct(0)" style="cursor: pointer; display: flex; justify-content: center; padding-bottom: 3px; font-size: 20px"><i class="fas fa-angle-up"></i> &nbsp; اضغط لإخفاء المنتجات </div>';
        productsList.childNodes[0].innerHTML = "";

    } else {
        document.querySelector('#productsList').style.height = "30px"
        document.querySelector('#productsList').style.overflow = "hidden";
        productsList.childNodes[0].innerHTML = '<div id="expOrNarProduct" onclick="expOrNarProduct(1)" style="cursor: pointer; display: flex; justify-content: center; padding-bottom: 3px; font-size: 20px"><i class="fas fa-angle-down"></i> &nbsp; اضغط لإظهار المنتجات</div>';
    }

}

function expOrNarPromo(expOrNarPromoKey) {
    if (expOrNarPromoKey == 1) {
        document.querySelector('#codesList').style.height = "100%"
        document.querySelector('#codesList').style.overflow = "auto";
        codesList.childNodes[Object.keys(codesList.childNodes).length - 1].innerHTML = '<div id="expOrNarPromo" onclick="expOrNarPromo(0)" style="cursor: pointer; display: flex; justify-content: center; padding-bottom: 3px; font-size: 20px"><i class="fas fa-angle-up"></i> &nbsp; اضغط لإخفاء الأكواد </div>';
        codesList.childNodes[0].innerHTML = "";

    } else {
        document.querySelector('#codesList').style.height = "30px"
        document.querySelector('#codesList').style.overflow = "hidden";
        codesList.childNodes[0].innerHTML = '<div id="expOrNarPromo" onclick="expOrNarPromo(1)" style="cursor: pointer; display: flex; justify-content: center; padding-bottom: 3px; font-size: 20px"><i class="fas fa-angle-down"></i> &nbsp; اضغط لإظهار الأكواد </div>';
    }

}



//// fetches

function firstFetches() {

    fetchThemes();

    fetchStoreInfo();

    fetchProducts();

    fetchPromocodes();

}

firstFetches();

function fetchThemes() {
    fetch('/storeTheme/show', {
            method: 'GET',
        }).then((responseName) => {
            return responseName.json();
        })
        .then((responseJson) => {

            if (responseJson['storeTheme'] != "none/لايوجد") {
                let setProp = document.documentElement.style.setProperty;
                switch (responseJson['storeTheme']) {
                    case 'originalTheme':
                        setProp('--body', '#f0e9c9');
                        setProp('--borders', '#8f8d85');
                        setProp('--btns', '#f5ebbd');
                        setProp('--btnsHover', '#bbb496');
                        setProp('--container', '#d4cbabc0');
                        setProp('--containerHover', '#d4cbabb0');
                        setProp('--h1', '#c2bba1a0');
                        setProp('--h1OtherScreen', '#c2bba1d0');
                        setProp('--form', '#c4c1b6c0');
                        setProp('--formHover', '#c4c1b6');
                        setProp('--input', '#8f8d85');
                        setProp('--inputHover', '#aca588');
                        setProp('--inputFocus', '#b1a883');
                        setProp('--webkitScrollbarTrack', '#c4c1b6c0');
                        setProp('--webkitScrollbarThumb', '#969287');
                        setProp('--webkitScrollbarThumbHover', '#797464');
                        setProp('--infoCard', '#d4cbaba8');
                        break;

                    case 'blueTheme':
                        setProp('--body', '#c9cbf0');
                        setProp('--borders', '#85868f');
                        setProp('--btns', '#bdbef5');
                        setProp('--btnsHover', '#8987ba');
                        setProp('--container', '#4169E1c0');
                        setProp('--containerHover', '#4169E1b0');
                        setProp('--h1', '#a3a1c2a0');
                        setProp('--h1OtherScreen', '#a3a1c2d0');
                        setProp('--form', '#9696c1c0');
                        setProp('--formHover', '#9696c1');
                        setProp('--input', '#85858f');
                        setProp('--inputHover', '#8889ac');
                        setProp('--inputFocus', '#8783b1');
                        setProp('--webkitScrollbarTrack', '#b6b6c4c0');
                        setProp('--webkitScrollbarThumb', '#878796');
                        setProp('--webkitScrollbarThumbHover', '#646579');
                        setProp('--infoCard', '#abaed4a8');
                        break;

                    case 'greenTheme':
                        setProp('--body', '#c9f0cb');
                        setProp('--borders', '#858f86');
                        setProp('--btns', '#bdf5be');
                        setProp('--btnsHover', '#96bb9a');
                        setProp('--container', '#1e796bc0');
                        setProp('--containerHover', '#1e796bb0');
                        setProp('--h1', '#a1c2a3a0');
                        setProp('--h1OtherScreen', '#a1c2a3d0');
                        setProp('--form', '#b6c4b7c0');
                        setProp('--formHover', '#b6c4b8');
                        setProp('--input', '#858f85');
                        setProp('--inputHover', '#88ac8b');
                        setProp('--inputFocus', '#83b185');
                        setProp('--webkitScrollbarTrack', '#b6c4b8c0');
                        setProp('--webkitScrollbarThumb', '#879687');
                        setProp('--webkitScrollbarThumbHover', '#647965');
                        setProp('--infoCard', '#abd4b0a8');
                        break;

                    case 'redTheme':
                        setProp('--body', '#f0c9c9');
                        setProp('--borders', '#8f8585');
                        setProp('--btns', '#f5bdbd');
                        setProp('--btnsHover', '#bb9696');
                        setProp('--container', '#ad5a54c0');
                        setProp('--containerHover', '#ad5a54b0');
                        setProp('--h1', '#c2a1a1a0');
                        setProp('--h1OtherScreen', '#c2a1a1d0');
                        setProp('--form', '#c4b6b6c0');
                        setProp('--formHover', '#c4b6b6');
                        setProp('--input', '#8f8585');
                        setProp('--inputHover', '#ac8888');
                        setProp('--inputFocus', '#b18383');
                        setProp('--webkitScrollbarTrack', '#c4b6b6c0');
                        setProp('--webkitScrollbarThumb', '#968787');
                        setProp('--webkitScrollbarThumbHover', '#796464');
                        setProp('--infoCard', '#d4ababa8');
                        break;

                    case 'pinkTheme':
                        setProp('--body', '#efc9f0');
                        setProp('--borders', '#8f858f');
                        setProp('--btns', '#f3bdf5');
                        setProp('--btnsHover', '#bb96bb');
                        setProp('--container', '#ad5498c0');
                        setProp('--containerHover', '#ad5498b0');
                        setProp('--h1', '#c2a1b5d0');
                        setProp('--h1OtherScreen', '#c4b6c2c0');
                        setProp('--form', '#c4b6c4');
                        setProp('--formHover', '#c4b6c4');
                        setProp('--input', '#8f858f');
                        setProp('--inputHover', '#ac88a9');
                        setProp('--inputFocus', '#b183aa');
                        setProp('--webkitScrollbarTrack', '#c4b6c1c0');
                        setProp('--webkitScrollbarThumb', '#968795');
                        setProp('--webkitScrollbarThumbHover', '#796478');
                        setProp('--infoCard', '#d4abcaa8');
                        break;

                    default:
                        setProp('--body', '#bbc0c6');
                        setProp('--borders', '#888888');
                        setProp('--btns', '#a7aaad');
                        setProp('--btnsHover', '#94979b');
                        setProp('--container', '#838690c0');
                        setProp('--containerHover', '#838690b0');
                        setProp('--h1', '#c2c2c2a0');
                        setProp('--h1OtherScreen', '#c2c2c2d0');
                        setProp('--form', '#cdcdcec0');
                        setProp('--formHover', '#cdcdce');
                        setProp('--input', '#8a8a8a');
                        setProp('--inputHover', '#a9a9a9');
                        setProp('--inputFocus', '#aeaeae');
                        setProp('--webkitScrollbarTrack', '#b6b6c4c0');
                        setProp('--webkitScrollbarThumb', '#969696');
                        setProp('--webkitScrollbarThumbHover', '#727272');
                        setProp('--infoCard', '#d1d1d1a8');
                        break;

                }
            }
            console.log('current theme is ' + responseJson['storeTheme'])
        });
}

function fetchStoreInfo() {

    fetch('/storeNum/show', {
        headers: {

            'Method': 'GET',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'GET',
    }).then((responseNum) => {
        return responseNum.json();
    }).then((responseJson) => {
        if (responseJson['storeNum'] != 'none/لايوجد') { document.querySelector("#addInfo").style.display = "none"; }
        document.querySelector('#num').innerHTML = `رقم المتجر: <b class="numAndName">${responseJson['storeNum']}</b>`;

    });


    fetch('/storeName/show', {
            headers: {

                'Method': 'GET',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET',
        })
        .then((responseName) => {
            return responseName.json();
        }).then((responseJson) => {
            if (responseJson['storeName'] != 'none/لايوجد') { document.querySelector("#addInfo").style.display = "none"; }
            document.querySelector('#name').innerHTML = `اسم المتجر: <b class="numAndName">${responseJson['storeName']}</b>`;
        });
}

// for fetchProducts()

function isNarrowed(responseJson) {

    document.querySelector('#productsList').innerHTML = '<div id="expOrNarProduct" onclick="expOrNarProduct(1)" style="cursor: pointer; display: flex; justify-content: center; padding-bottom: 3px; font-size: 20px"><i class="fas fa-angle-down"></i> &nbsp; اضغط لإظهار المنتجات </div><div style="display: flex; justify-content: space-around; border-bottom: rgba(0,0,0,.125) solid 1px; padding-bottom: 3px; font-size: 20px"><b>الرقم</b><b>العنوان</b><b>السعر</b><b>الصورة</b></div>'
    for (let i = 0; i < Object.keys(responseJson).length; i++) {

        if (i == Object.keys(responseJson).length) {
            document.querySelector('#productsList').innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"><b>${responseJson[Object.keys(responseJson)[i]]['id']}</b><b>${responseJson[Object.keys(responseJson)[i]]['title']}</b><b>${responseJson[Object.keys(responseJson)[i]]['price']}﷼</b><b><img style="border: 1px solid #8f8d85 ; border-radius: 10px; width: 30px; height: 30px; margin: 0;" src="data:image/png;base64,${responseJson[Object.keys(responseJson)[i]]['img']}" alt="img"></b></div>`;
        }

        document.querySelector('#productsList').innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"><b>${responseJson[Object.keys(responseJson)[i]]['id']}</b><b>${responseJson[Object.keys(responseJson)[i]]['title']}</b><b>${responseJson[Object.keys(responseJson)[i]]['price']}﷼</b><b><img style="border: 1px solid #8f8d85 ; border-radius: 10px; width: 30px; height: 30px; margin: 0;" src="data:image/png;base64,${responseJson[Object.keys(responseJson)[i]]['img']}" alt="img"></b></div><br><div></div>`;
    }
}

function isExpanded(responseJson) {


    document.querySelector('#productsList').innerHTML = '<div style="display: flex; justify-content: space-around; border-bottom: rgba(0,0,0,.125) solid 1px; padding-bottom: 3px; font-size: 20px"><b>الرقم</b><b>العنوان</b><b>السعر</b><b>الصورة</b></div>'
    for (let i = 0; i < Object.keys(responseJson).length; i++) {

        if (i == Object.keys(responseJson).length) {
            document.querySelector('#productsList').innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"><b>${responseJson[Object.keys(responseJson)[i]]['id']}</b><b>${responseJson[Object.keys(responseJson)[i]]['title']}</b><b>${responseJson[Object.keys(responseJson)[i]]['price']}﷼</b><b><img style="border: 1px solid #8f8d85 ; border-radius: 10px; width: 30px; height: 30px; margin: 0;" src="data:image/png;base64,${responseJson[Object.keys(responseJson)[i]]['img']}" alt="img"></b></div>`;
        }

        document.querySelector('#productsList').innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"><b>${responseJson[Object.keys(responseJson)[i]]['id']}</b><b>${responseJson[Object.keys(responseJson)[i]]['title']}</b><b>${responseJson[Object.keys(responseJson)[i]]['price']}﷼</b><b><img style="border: 1px solid #8f8d85 ; border-radius: 10px; width: 30px; height: 30px; margin: 0;" src="data:image/png;base64,${responseJson[Object.keys(responseJson)[i]]['img']}" alt="img"></b></div><br><div></div>`;
    }
    productsList.childNodes[Object.keys(productsList.childNodes).length - 1].innerHTML = '<div id="expOrNarProduct" onclick="expOrNarProduct(0)" style="cursor: pointer; display: flex; justify-content: center; padding-bottom: 3px; font-size: 20px"><i class="fas fa-angle-up"></i> &nbsp; اضغط لإخفاء المنتجات </div>';
}

function fetchProducts() {

    fetch('/products', {
            headers: {

                'Method': 'GET',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET',
        })
        .then((response) => {
            return response.json();
        }).then((responseJson) => {
            console.log(responseJson);
            if (responseJson.statCode == 204) { productsList.innerHTML = "حدث وانتظر قليلا إذا كنت قد أضفت"; return; }
            if (responseJson.statCode == 429) {
                alert('لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                return;
            }

            if (productsList.style.height == "30px") isNarrowed(responseJson);
            if (productsList.style.height == "100%") isExpanded(responseJson);

        });
}

// for fetchProducts()

function isNarrowedCode(responseJson) {

    document.querySelector('#codesList').innerHTML = '<div id="expOrNarPromo" onclick="expOrNarPromo(1)" style="cursor: pointer; display: flex; justify-content: center; padding-bottom: 3px; font-size: 20px"><i class="fas fa-angle-down"></i> &nbsp; اضغط لإظهار الأكواد </div><div style="display: flex; justify-content: space-around; border-bottom: rgba(0,0,0,.125) solid 1px; padding-bottom: 3px; font-size: 20px"><b>الرقم</b><b>الاسم</b><b>النسبة</b></div>'
    for (let i = 0; i < Object.keys(responseJson).length; i++) {

        if (i == Object.keys(responseJson).length) {
            document.querySelector('#codesList').innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"><b>${responseJson[Object.keys(responseJson)[i]]['id']}</b><b>${responseJson[Object.keys(responseJson)[i]]['code']}</b><b>${responseJson[Object.keys(responseJson)[i]]['amount'] * 100}%</b></div>`;
        }
        document.querySelector('#codesList').innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"><b>${responseJson[Object.keys(responseJson)[i]]['id']}</b><b>${responseJson[Object.keys(responseJson)[i]]['code']}</b><b>${responseJson[Object.keys(responseJson)[i]]['amount'] * 100}%</b></div><br><div></div>`;
    }
}

function isExpandedCode(responseJson) {


    document.querySelector('#codesList').innerHTML = '<div style="display: flex; justify-content: space-around; border-bottom: rgba(0,0,0,.125) solid 1px; padding-bottom: 3px; font-size: 20px"><b>الرقم</b><b>الاسم</b><b>النسبة</b></div>'
    for (let i = 0; i < Object.keys(responseJson).length; i++) {

        if (i == Object.keys(responseJson).length) {
            document.querySelector('#codesList').innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"><b>${responseJson[Object.keys(responseJson)[i]]['id']}</b><b>${responseJson[Object.keys(responseJson)[i]]['code']}</b><b>${responseJson[Object.keys(responseJson)[i]]['amount'] * 100}%</b></div>`;
        }
        document.querySelector('#codesList').innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"><b>${responseJson[Object.keys(responseJson)[i]]['id']}</b><b>${responseJson[Object.keys(responseJson)[i]]['code']}</b><b>${responseJson[Object.keys(responseJson)[i]]['amount'] * 100}%</b></div><br><div></div>`;
    }
    codesList.childNodes[Object.keys(codesList.childNodes).length - 1].innerHTML = '<div id="expOrNarPromo" onclick="expOrNarPromo(0)" style="cursor: pointer; display: flex; justify-content: center; padding-bottom: 3px; font-size: 20px"><i class="fas fa-angle-up"></i> &nbsp; اضغط لإخفاء الأكواد </div>';
}

function fetchPromocodes() {

    fetch('/promocodes', {
            headers: {

                'Method': 'GET',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET',
        })
        .then((response) => {
            return response.json();
        }).then((responseJson) => {
            console.log(responseJson);
            if (responseJson.statCode == 204) { codesList.innerHTML = "حدث وانتظر قليلا إذا كنت قد أضفت"; return; }
            if (responseJson.statCode == 429) {
                alert('لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 400 : رمز الخطأ')
                return;
            }
            if (codesList.style.height == "30px") isNarrowedCode(responseJson);
            if (codesList.style.height == "100%") isExpandedCode(responseJson);
        });
}



///// to show msg or not

if (localStorage.pressToNotShowBtn == 'true') {
    document.querySelectorAll('.dbInfo')[0].style.display = 'none';
    localStorage.pressToNotShowBtn = 'true';
}
document.querySelector('#pressToNotShowBtn').addEventListener('click', () => {
    document.querySelectorAll('.dbInfo')[0].style.display = 'none';
    localStorage.pressToNotShowBtn = 'true';

});



///// btns

document.querySelector('#addProd').addEventListener('click', () => {
    let productImg = document.querySelector('#productImg');
    let uploadImgForm = new FormData();
    uploadImgForm.append('image', productImg.files[0]);
    if (document.querySelector('#productID').value == '' ||
        document.querySelector('#productTitle').value == '' ||
        document.querySelector('#productPrice').value == '' ||
        document.querySelector('#productImg').value == '') {
        alert('يجب ملئ جميع الخانات أولا');
        return;
    }
    fetch('/product', {
            headers: {
                'id': encodeURIComponent(document.querySelector('#productID').value),
                'title': encodeURIComponent(document.querySelector('#productTitle').value),
                'price': encodeURIComponent(document.querySelector('#productPrice').value)
            },
            method: 'POST',
            body: uploadImgForm,
        })
        .then((response) => {
            return response.json();
        }).then((responseJson) => {
            if (responseJson.statCode == 403) {
                alert('الرقم التعريفي للمنتج المراد إضافته موجود مسبقا\nالرجاء المحاولة مجددًا باستخدام رقم آخر. \n\n ErrCode: 403 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 400) {
                alert('هناك مدخلات أُدخلت بشكل خاطئ\nالرقم التعريفي أو السعر أُدخل فيه نص، يجب إدخالها على شكل رقم فقط. \n\n ErrCode: 400 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 429) {
                alert('لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 500) {
                alert('حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 500 : رمز الخطأ')
                return;
            }

            alert("تــمــت الإضــافــة بــنــجــاح، إنتظر قليلا وستظهر التحديثات");
            fetchProducts();
            document.querySelector('#productID').value = '';
            document.querySelector('#productTitle').value = '';
            document.querySelector('#productPrice').value = '';
            document.querySelector('#productImg').value = '';
        });
});

document.querySelector('#updProd').addEventListener('click', () => {
    let productImg = document.querySelector('#productImg');
    let uploadImgForm = new FormData();
    uploadImgForm.append('image', productImg.files[0]);
    if (document.querySelector('#productID').value == '' ||
        document.querySelector('#productTitle').value == '' ||
        document.querySelector('#productPrice').value == '' ||
        document.querySelector('#productImg').value == '') {
        alert('يجب ملئ جميع الخانات أولا');
        return;
    }
    fetch(`/product/${document.querySelector('#productID').value}`, {
            headers: {
                'title': encodeURIComponent(document.querySelector('#productTitle').value),
                'price': encodeURIComponent(document.querySelector('#productPrice').value)
            },
            method: 'PUT',
            body: uploadImgForm,
        })
        .then((response) => {
            return response.json();
        }).then((responseJson) => {
            if (responseJson.statCode == 404) {
                alert('الرقم التعريفي للمنتج المراد تحديثه غير موجود\nالرجاء المحاولة مجددًا باستخدام رقم آخر. \n\n ErrCode: 404 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 400) {
                alert('هناك مدخلات أُدخلت بشكل خاطئ\nالرقم التعريفي أو السعر أُدخل فيه نص، يجب إدخالها على شكل رقم فقط. \n\n ErrCode: 400 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 429) {
                alert('لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 500) {
                alert('حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 500 : رمز الخطأ')
                return;
            }

            alert("تــم الــتــحــديـث بــنــجــاح، إنتظر قليلا وستظهر التحديثات");
            fetchProducts();
            document.querySelector('#productID').value = '';
            document.querySelector('#productTitle').value = '';
            document.querySelector('#productPrice').value = '';
            document.querySelector('#productImg').value = '';
        });
});

document.querySelector('#delProd').addEventListener('click', () => {
    fetch(`/product/${document.querySelector('#productID').value}`, {
            headers: {

                'Method': 'DELETE',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'DELETE',

        })
        .then((response) => {
            return response.json();
        }).then((responseJson) => {
            if (responseJson.statCode == 404) {
                alert('الرقم التعريفي للمنتج المراد حذفه غير موجود\nالرجاء المحاولة مجددًا باستخدام رقم آخر. \n\n ErrCode: 404 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 400) {
                alert('هناك مدخلات أُدخلت بشكل خاطئ\nالرقم التعريفي أُدخل فيه نص، يجب إدخاله على شكل رقم فقط. \n\n ErrCode: 400 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 429) {
                alert('لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 500) {
                alert('حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 500 : رمز الخطأ')
                return;
            }
            if (document.querySelector('#productID').value == '') {

                return;
            }

            alert("تــم الــحــذف بــنــجــاح، إنتظر قليلا وستظهر التحديثات");
            fetchProducts();
            document.querySelector('#productID').value = '';
            document.querySelector('#productTitle').value = '';
            document.querySelector('#productPrice').value = '';
            document.querySelector('#productImg').value = '';
        });
});



document.querySelector('#addCode').addEventListener('click', () => {
    if (document.querySelector('#codeID').value == '' ||
        document.querySelector('#codeName').value == '' ||
        document.querySelector('#codeAmount').value == '') {
        alert('يجب ملئ جميع الخانات أولا');
        return;
    }
    fetch('/promocode', {
            headers: {

                'Method': 'POST',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                id: document.querySelector('#codeID').value,
                code: document.querySelector('#codeName').value,
                amount: document.querySelector('#codeAmount').value
            })
        })
        .then((response) => {
            return response.json();
        }).then((responseJson) => {
            if (responseJson.statCode == 403) {
                alert('الرقم التعريفي للكود المراد إضافته موجود مسبقا\nالرجاء المحاولة مجددًا باستخدام رقم آخر. \n\n ErrCode: 403 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 400) {
                alert('هناك مدخلات أُدخلت بشكل خاطئ\nالرقم التعريفي أو نسبة التخفيض أُدخل فيه نص، يجب إدخالها على شكل رقم فقط. \n\n ErrCode: 400 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 429) {
                alert('لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 500) {
                alert('حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 500 : رمز الخطأ')
                return;
            }

            alert("تــمــت الإضــافــة بــنــجــاح، إنتظر قليلا وستظهر التحديثات");
            fetchPromocodes();
            document.querySelector('#codeID').value = '';
            document.querySelector('#codeName').value = '';
            document.querySelector('#codeAmount').value = '';
        });
});

document.querySelector('#updCode').addEventListener('click', () => {
    if (document.querySelector('#codeID').value == '' ||
        document.querySelector('#codeName').value == '' ||
        document.querySelector('#codeAmount').value == '') {
        alert('يجب ملئ جميع الخانات أولا');
        return;
    }
    fetch(`/promocode/${document.querySelector('#codeID').value}`, {
            headers: {

                'Method': 'PUT',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                code: document.querySelector('#codeName').value,
                amount: document.querySelector('#codeAmount').value
            })
        })
        .then((response) => {
            return response.json();
        }).then((responseJson) => {
            if (responseJson.statCode == 404) {
                alert('الرقم التعريفي للكود المراد تحديثه غير موجود\nالرجاء المحاولة مجددًا باستخدام رقم آخر. \n\n ErrCode: 404 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 400) {
                alert('هناك مدخلات أُدخلت بشكل خاطئ\nnالرقم التعريفي أو نسبة التخفيض أُدخل فيه نص، يجب إدخالها على شكل رقم فقط. \n\n ErrCode: 400 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 429) {
                alert('لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 500) {
                alert('حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 500 : رمز الخطأ')
                return;
            }

            alert("تــم الــتــحــديـث بــنــجــاح، إنتظر قليلا وستظهر التحديثات");
            fetchPromocodes();
            document.querySelector('#codeID').value = '';
            document.querySelector('#codeName').value = '';
            document.querySelector('#codeAmount').value = '';
        });
});

document.querySelector('#delCode').addEventListener('click', () => {
    fetch(`/promocode/${document.querySelector('#codeID').value}`, {
            headers: {

                'Method': 'DELETE',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'DELETE',

        })
        .then((response) => {
            return response.json();
        }).then((responseJson) => {
            if (responseJson.statCode == 404) {
                alert('الرقم التعريفي للكود المراد حذفه غير موجود\nالرجاء المحاولة مجددًا باستخدام رقم آخر. \n\n ErrCode: 404 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 400) {
                alert('هناك مدخلات أُدخلت بشكل خاطئ\nالرقم التعريفي أُدخل فيه نص، يجب إدخاله على شكل رقم فقط. \n\n ErrCode: 400 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 500) {
                alert('حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 500 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 429) {
                alert('لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                return;
            }
            if (document.querySelector('#codeID').value == '') {
                return;
            }

            alert("تــم الــحــذف بــنــجــاح، إنتظر قليلا وستظهر التحديثات");
            fetchPromocodes();
            document.querySelector('#codeID').value = '';
            document.querySelector('#codeName').value = '';
            document.querySelector('#codeAmount').value = '';
        });
});


document.querySelector('#addInfo').addEventListener('click', () => {
    if (document.querySelector('#storeNum').value == '' || document.querySelector('#storeName').value == '') { alert('يجب ملئ جميع الخانات أولا'); return; }

    fetch('/storeInfo', {
            headers: {

                'Method': 'POST',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                storeName: document.querySelector('#storeName').value,
                storeNum: (currentCountryCodeSelected + document.querySelector('#storeNum').value),
            })
        })
        .then((response) => {
            return response.json();
        }).then((responseJson) => {

            if (responseJson.statCode == 429) {
                alert('لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 500) {
                alert('حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 500 : رمز الخطأ')
                return;
            }

            alert("تــمــت الإضــافــة بــنــجــاح، إنتظر قليلا وستظهر التحديثات");

            fetchStoreInfo();
            document.querySelector('#storeName').value = '';
            document.querySelector('#storeNum').value = '';
        });
});


document.querySelector('#updInfo').addEventListener('click', () => {

    fetch('/storeNum/show', { method: 'GET', }).then((responseNum) => { return responseNum.json(); })
        .then((responseJson) => { if (responseJson.storeNum == "none/لايوجد") { alert("يجب أولا إضافة كلًا من اسم ورقم المتجر للتحديث"); return; } });

    fetch('/storeName/show', { method: 'GET', }).then((responseName) => { return responseName.json(); })
        .then((responseJson) => { if (responseJson.storeName == "none/لايوجد") { alert("يجب أولا إضافة كلًا من اسم ورقم المتجر للتحديث"); return; } });


    if (document.querySelector('#storeNum').value == '' && document.querySelector('#storeName').value != '') {
        fetch('/storeName', {
                headers: {

                    'Method': 'PUT',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({
                    storeName: document.querySelector('#storeName').value,
                })
            })
            .then((response) => {
                return response.json();
            }).then((responseJson) => {

                if (responseJson.statCode == 429) {
                    alert('لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                    return;
                }
                if (responseJson.statCode == 500) {
                    alert('حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 500 : رمز الخطأ')
                    return;
                }


                alert("تــم الــتــحــديـث بــنــجــاح، إنتظر قليلا وستظهر التحديثات");
                fetchStoreInfo();
                document.querySelector('#storeName').value = '';
                document.querySelector('#storeNum').value = '';
            });
    } else if (document.querySelector('#storeName').value == '' && document.querySelector('#storeNum').value != '') {
        if (currentCountryCodeSelected < 0) { alert('لم تدخل مفتاح الدولة،\n الرجاء المحاولة مجددَا مع إدخال المفتاح'); return; }
        fetch('/storeNum', {
                headers: {

                    'Method': 'PUT',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({
                    storeNum: (currentCountryCodeSelected + document.querySelector('#storeNum').value),
                })
            })
            .then((response) => {
                return response.json();
            }).then((responseJson) => {
                if (responseJson.statCode == 400) {
                    alert('هناك مدخلات أُدخلت بشكل خاطئ\nرقم المتجر أُدخل فيه نص، يجب إدخاله على شكل رقم فقط. \n\n ErrCode: 400 : رمز الخطأ')
                    return;
                }
                if (responseJson.statCode == 429) {
                    alert('لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                    return;
                }
                if (responseJson.statCode == 500) {
                    alert('حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 500 : رمز الخطأ')
                    return;
                }

                console.log(responseJson)

                alert("تــم الــتــحــديـث بــنــجــاح، إنتظر قليلا وستظهر التحديثات");
                fetchStoreInfo();
                document.querySelector('#storeName').value = '';
                document.querySelector('#storeNum').value = '';
            });
    } else if (document.querySelector('#storeNum').value != '' && document.querySelector('#storeName').value != '') {
        if (currentCountryCodeSelected < 0) { alert('لم تدخل مفتاح الدولة،\n الرجاء المحاولة مجددَا مع إدخال المفتاح'); return; }
        Promise.all([
            fetch('/storeNum', {
                headers: {

                    'Method': 'PUT',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({
                    storeNum: (currentCountryCodeSelected + (currentCountryCodeSelected + document.querySelector('#storeNum').value)),
                })
            }),
            fetch('/storeName', {
                headers: {

                    'Method': 'PUT',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({
                    storeName: document.querySelector('#storeName').value,
                })
            })
        ]).then(([responseNum, responseName]) => {
            return { num: responseNum.json(), name: responseName.json() };
        }).then((responseJson) => {
            if (responseJson['num'].statCode == 400) {
                alert('هناك مدخلات أُدخلت بشكل خاطئ\nرقم المتجر أُدخل فيه نص، يجب إدخاله على شكل فقط. \n\n ErrCode: 400 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 429) {
                alert('لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 500) {
                alert('حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 500 : رمز الخطأ')
                return;
            }


            alert("تــم الــتــحــديـث بــنــجــاح، إنتظر قليلا وستظهر التحديثات");
            fetchStoreInfo();
            document.querySelector('#storeName').value = '';
            document.querySelector('#storeNum').value = '';
        });
    } else {
        return;
    }

});


const countriesCodes = {
    "SA": {
        "code": "SA",
        "name": "\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629",
        "en_name": "Saudi Arabia",
        "ar_name": "\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629",
        "calling_code": "966"
    },
    "AE": {
        "code": "AE",
        "name": "\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0645\u062a\u062d\u062f\u0629",
        "en_name": "United Arab Emirates",
        "ar_name": "\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0645\u062a\u062d\u062f\u0629",
        "calling_code": "971"
    },
    "QA": {
        "code": "QA",
        "name": "\u0642\u0637\u0631",
        "en_name": "Qatar",
        "ar_name": "\u0642\u0637\u0631",
        "calling_code": "974"
    },
    "KW": {
        "code": "KW",
        "name": "\u0627\u0644\u0643\u0648\u064a\u062a",
        "en_name": "Kuwait",
        "ar_name": "\u0627\u0644\u0643\u0648\u064a\u062a",
        "calling_code": "965"
    },
    "OM": {
        "code": "OM",
        "name": "\u0639\u064f\u0645\u0627\u0646",
        "en_name": "Oman",
        "ar_name": "\u0639\u064f\u0645\u0627\u0646",
        "calling_code": "968"
    },
    "BH": {
        "code": "BH",
        "name": "\u0627\u0644\u0628\u062d\u0631\u064a\u0646",
        "en_name": "Bahrain",
        "ar_name": "\u0627\u0644\u0628\u062d\u0631\u064a\u0646",
        "calling_code": "973"
    },
    "GB": {
        "code": "GB",
        "name": "United Kingdom\u202c\u200f",
        "en_name": "United Kingdom",
        "ar_name": "\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0645\u062a\u062d\u062f\u0629 ",
        "calling_code": "44"
    },
    "US": {
        "code": "US",
        "name": "United States\u202c\u200f",
        "en_name": "United States",
        "ar_name": "\u0627\u0644\u0648\u0644\u0627\u064a\u0627\u062a \u0627\u0644\u0645\u062a\u062d\u062f\u0629 ",
        "calling_code": "1"
    },
    "EG": {
        "code": "EG",
        "name": "\u0645\u0635\u0631",
        "en_name": "Egypt",
        "ar_name": "\u0645\u0635\u0631",
        "calling_code": "20"
    },
    "YE": {
        "code": "YE",
        "name": "\u0627\u0644\u064a\u0645\u0646",
        "en_name": "Yemen",
        "ar_name": "\u0627\u0644\u064a\u0645\u0646",
        "calling_code": "967"
    },
}

let listOfCountriesCodes = document.querySelector('#listOfCountriesCodes');
for (let i = 0; i < /*Object.keys(countriesCodes).length*/ 10; i++) {
    if (i == 0) {
        listOfCountriesCodes.innerHTML = '';
    }

    listOfCountriesCodes.innerHTML += `<li><a class="dropdown-item" >${i + 1}:${countriesCodes[Object.keys(countriesCodes)[i]]['ar_name']}</a></li>`;
}

let countryCodeTitle = document.querySelector('#countryCodeTitle');
let allCountriesAncors = document.querySelectorAll('a[class^=dropdown-item]');
let currentCountryCodeSelected = -1;
console.log("Found", allCountriesAncors.length, 'a which class:"dropdown-item".');
for (var i = 0; i < allCountriesAncors.length; i++) {
    allCountriesAncors[i].addEventListener('click', function() {
        let content = this.innerText;
        content = content.split(':');
        let id = content[0];
        id--;
        currentCountryCodeSelected = countriesCodes[Object.keys(countriesCodes)[id]]['calling_code'];
        countryCodeTitle.innerText = currentCountryCodeSelected;
    });
}