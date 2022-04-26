//// theme related

import { fetchThemes } from "./themesFetch";

var themeBtns = document.querySelectorAll('div.circleTheme');
for (var i = 0; i < themeBtns.length; i++) {
    themeBtns[i].onclick = function() {

        if (document.getElementsByClassName("circleTheme-selected")[0] == undefined) {
            this.className = "circleTheme-selected";
        } else {
            document.getElementsByClassName("circleTheme-selected")[0].className = "circleTheme";
            this.className = "circleTheme-selected";
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
                            alert('لقد تجاوزت العدد المسموح من الطلبات على الخادم في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                            return;
                        }
                        fetchThemes();

                    });
            });


    }
}


/// expand or Narrow related

function expOrNarProduct(expOrNarProductKey) {
    if (expOrNarProductKey == 1) {
        document.getElementById('productsList').style.height = "100%"
        document.getElementById('productsList').style.overflow = "auto";
        productsList.childNodes[Object.keys(productsList.childNodes).length - 1].innerHTML = '<div id="expOrNarProduct" onclick="expOrNarProduct(0)" style="cursor: pointer; display: flex; justify-content: center; padding-bottom: 3px; font-size: 20px"><i class="fas fa-angle-up"></i> اضغط لإخفاء المنتجات </div>';
        productsList.childNodes[0].innerHTML = "";

    } else {
        document.getElementById('productsList').style.height = "30px"
        document.getElementById('productsList').style.overflow = "hidden";
        productsList.childNodes[0].innerHTML = '<div id="expOrNarProduct" onclick="expOrNarProduct(1)" style="cursor: pointer; display: flex; justify-content: center; padding-bottom: 3px; font-size: 20px"><i class="fas fa-angle-down"></i> اضغط لإظهار المنتجات</div>';
    }

}

function expOrNarPromo(expOrNarPromoKey) {
    if (expOrNarPromoKey == 1) {
        document.getElementById('codesList').style.height = "100%"
        document.getElementById('codesList').style.overflow = "auto";
        codesList.childNodes[Object.keys(codesList.childNodes).length - 1].innerHTML = '<div id="expOrNarPromo" onclick="expOrNarPromo(0)" style="cursor: pointer; display: flex; justify-content: center; padding-bottom: 3px; font-size: 20px"><i class="fas fa-angle-up"></i> اضغط لإخفاء الأكواد </div>';
        codesList.childNodes[0].innerHTML = "";

    } else {
        document.getElementById('codesList').style.height = "30px"
        document.getElementById('codesList').style.overflow = "hidden";
        codesList.childNodes[0].innerHTML = '<div id="expOrNarPromo" onclick="expOrNarPromo(1)" style="cursor: pointer; display: flex; justify-content: center; padding-bottom: 3px; font-size: 20px"><i class="fas fa-angle-down"></i> اضغط لإظهار الأكواد </div>';
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
        document.getElementById('num').innerHTML = `رقم المتجر: <b class="numAndName">${responseJson['storeNum']}</b>`;

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
            document.getElementById('name').innerHTML = `اسم المتجر: <b class="numAndName">${responseJson['storeName']}</b>`;
        });
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
            if (responseJson.statCode == 204) { return; }
            if (responseJson.statCode == 429) {
                alert('لقد تجاوزت العدد المسموح من الطلبات على الخادم في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                return;
            }
            document.getElementById('productsList').innerHTML = '<div id="expOrNarProduct" onclick="expOrNarProduct(1)" style="cursor: pointer; display: flex; justify-content: center; padding-bottom: 3px; font-size: 20px"><i class="fas fa-angle-down"></i> اضغط لإظهار المنتجات </div><div style="display: flex; justify-content: space-around; border-bottom: rgba(0,0,0,.125) solid 1px; padding-bottom: 3px; font-size: 20px"><b>الرقم</b><b>العنوان</b><b>السعر</b><b>الصورة</b></div>'
            for (let i = 0; i < Object.keys(responseJson).length; i++) {

                if (i == Object.keys(responseJson).length) {
                    document.getElementById('productsList').innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"><b>${responseJson[Object.keys(responseJson)[i]]['id']}</b><b>${responseJson[Object.keys(responseJson)[i]]['title']}</b><b>${responseJson[Object.keys(responseJson)[i]]['price']}﷼</b><b><img style="border: 1px solid #8f8d85 ; border-radius: 10px; width: 30px; height: 30px; margin: 0;" src="data:image/png;base64,${responseJson[Object.keys(responseJson)[i]]['img']}" alt="img"></b></div>`;
                }

                document.getElementById('productsList').innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"><b>${responseJson[Object.keys(responseJson)[i]]['id']}</b><b>${responseJson[Object.keys(responseJson)[i]]['title']}</b><b>${responseJson[Object.keys(responseJson)[i]]['price']}﷼</b><b><img style="border: 1px solid #8f8d85 ; border-radius: 10px; width: 30px; height: 30px; margin: 0;" src="data:image/png;base64,${responseJson[Object.keys(responseJson)[i]]['img']}" alt="img"></b></div><br><div></div>`;
            }

        });
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
            if (responseJson.statCode == 204) { return; }
            if (responseJson.statCode == 429) {
                alert('لقد تجاوزت العدد المسموح من الطلبات على الخادم في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 400 : رمز الخطأ')
                return;
            }
            document.getElementById('codesList').innerHTML = '<div id="expOrNarPromo" onclick="expOrNarPromo(1)" style="cursor: pointer; display: flex; justify-content: center; padding-bottom: 3px; font-size: 20px"><i class="fas fa-angle-down"></i> اضغط لإظهار الأكواد </div><div style="display: flex; justify-content: space-around; border-bottom: rgba(0,0,0,.125) solid 1px; padding-bottom: 3px; font-size: 20px"><b>الرقم</b><b>الاسم</b><b>النسبة</b></div>'
            for (let i = 0; i < Object.keys(responseJson).length; i++) {

                if (i == Object.keys(responseJson).length) {
                    document.getElementById('codesList').innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"><b>${responseJson[Object.keys(responseJson)[i]]['id']}</b><b>${responseJson[Object.keys(responseJson)[i]]['code']}</b><b>${responseJson[Object.keys(responseJson)[i]]['amount']*100}%</b></div>`;
                }
                document.getElementById('codesList').innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"><b>${responseJson[Object.keys(responseJson)[i]]['id']}</b><b>${responseJson[Object.keys(responseJson)[i]]['code']}</b><b>${responseJson[Object.keys(responseJson)[i]]['amount']*100}%</b></div><br><div></div>`;
            }
        });
}



///// to show msg or not

if (localStorage.pressToNotShowBtn == 'true') {
    document.getElementsByClassName('dbInfo')[0].style.display = 'none';
    localStorage.pressToNotShowBtn = 'true';
}
document.getElementById('pressToNotShowBtn').addEventListener('click', () => {
    document.getElementsByClassName('dbInfo')[0].style.display = 'none';
    localStorage.pressToNotShowBtn = 'true';
});



///// btns

document.getElementById('addProd').addEventListener('click', () => {
    let productImg = document.getElementById('productImg');
    let uploadImgForm = new FormData();
    uploadImgForm.append('image', productImg.files[0]);
    if (document.getElementById('productID').value == '' ||
        document.getElementById('productTitle').value == '' ||
        document.getElementById('productPrice').value == '' ||
        document.getElementById('productImg').value == '') {
        alert('يجب ملئ جميع الخانات أولا');
        return;
    }
    fetch('/product', {
            headers: {
                'id': encodeURIComponent(document.getElementById('productID').value),
                'title': encodeURIComponent(document.getElementById('productTitle').value),
                'price': encodeURIComponent(document.getElementById('productPrice').value)
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
                alert('لقد تجاوزت العدد المسموح من الطلبات على الخادم في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 500) {
                alert('حدث خطأ من طرف الخادم\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 500 : رمز الخطأ')
                return;
            }

            fetchProducts();
        });
});

document.getElementById('updProd').addEventListener('click', () => {
    let productImg = document.getElementById('productImg');
    let uploadImgForm = new FormData();
    uploadImgForm.append('image', productImg.files[0]);
    if (document.getElementById('productID').value == '' ||
        document.getElementById('productTitle').value == '' ||
        document.getElementById('productPrice').value == '' ||
        document.getElementById('productImg').value == '') {
        alert('يجب ملئ جميع الخانات أولا');
        return;
    }
    fetch(`/product/${document.getElementById('productID').value}`, {
            headers: {
                'title': encodeURIComponent(document.getElementById('productTitle').value),
                'price': encodeURIComponent(document.getElementById('productPrice').value)
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
                alert('لقد تجاوزت العدد المسموح من الطلبات على الخادم في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 500) {
                alert('حدث خطأ من طرف الخادم\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 500 : رمز الخطأ')
                return;
            }

            fetchProducts();
        });
});

document.getElementById('delProd').addEventListener('click', () => {
    fetch(`/product/${document.getElementById('productID').value}`, {
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
                alert('لقد تجاوزت العدد المسموح من الطلبات على الخادم في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 500) {
                alert('حدث خطأ من طرف الخادم\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 500 : رمز الخطأ')
                return;
            }
            if (document.getElementById('productID').value == '') {

                return;
            }
            fetchProducts();
        });
});



document.getElementById('addCode').addEventListener('click', () => {
    if (document.getElementById('codeID').value == '' ||
        document.getElementById('codeName').value == '' ||
        document.getElementById('codeAmount').value == '') {
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
                id: document.getElementById('codeID').value,
                code: document.getElementById('codeName').value,
                amount: document.getElementById('codeAmount').value
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
                alert('لقد تجاوزت العدد المسموح من الطلبات على الخادم في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 500) {
                alert('حدث خطأ من طرف الخادم\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 500 : رمز الخطأ')
                return;
            }

            fetchPromocodes();
        });
});

document.getElementById('updCode').addEventListener('click', () => {
    if (document.getElementById('codeID').value == '' ||
        document.getElementById('codeName').value == '' ||
        document.getElementById('codeAmount').value == '') {
        alert('يجب ملئ جميع الخانات أولا');
        return;
    }
    fetch(`/promocode/${document.getElementById('codeID').value}`, {
            headers: {

                'Method': 'PUT',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                code: document.getElementById('codeName').value,
                amount: document.getElementById('codeAmount').value
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
                alert('لقد تجاوزت العدد المسموح من الطلبات على الخادم في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 500) {
                alert('حدث خطأ من طرف الخادم\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 500 : رمز الخطأ')
                return;
            }

            fetchPromocodes();
        });
});

document.getElementById('delCode').addEventListener('click', () => {
    fetch(`/promocode/${document.getElementById('codeID').value}`, {
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
                alert('حدث خطأ من طرف الخادم\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 500 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 429) {
                alert('لقد تجاوزت العدد المسموح من الطلبات على الخادم في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                return;
            }
            if (document.getElementById('codeID').value == '') {
                return;
            }
            fetchPromocodes();
        });
});


document.getElementById('addInfo').addEventListener('click', () => {
    if (document.getElementById('storeNum').value == '' && document.getElementById('storeName').value != '') {

        fetch('/storeName', {
                headers: {

                    'Method': 'POST',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    storeName: document.getElementById('storeName').value,
                })
            })
            .then((response) => {
                return response.json();
            }).then((responseJson) => {

                if (responseJson.statCode == 429) {
                    alert('لقد تجاوزت العدد المسموح من الطلبات على الخادم في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                    return;
                }
                fetchStoreInfo();
            });
    } else if (document.getElementById('storeName').value == '' && document.getElementById('storeNum').value != '') {
        if (currentCountryCodeSelected < 0) { alert('لم تدخل مفتاح الدولة،\n الرجاء المحاولة مجددَا مع إدخال المفتاح'); return; }
        fetch('/storeNum', {
                headers: {

                    'Method': 'POST',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    storeNum: (currentCountryCodeSelected + document.getElementById('storeNum').value),
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
                    alert('لقد تجاوزت العدد المسموح من الطلبات على الخادم في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                    return;
                }
                fetchStoreInfo();
            });
    } else if (document.getElementById('storeNum').value != '' && document.getElementById('storeName').value != '') {
        if (currentCountryCodeSelected < 0) { alert('لم تدخل مفتاح الدولة،\n الرجاء المحاولة مجددَا مع إدخال المفتاح'); return; }
        Promise.all([
            fetch('/storeNum', {
                headers: {

                    'Method': 'POST',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    storeNum: (currentCountryCodeSelected + document.getElementById('storeNum').value),
                })
            }),
            fetch('/storeName', {
                headers: {

                    'Method': 'POST',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    storeName: document.getElementById('storeName').value,
                })
            })
        ]).then(([responseNum, responseName]) => {
            return { num: responseNum.json(), name: responseName.json() };
        }).then((responseJson) => {
            if (responseJson['num'].statCode == 400) {
                alert('هناك مدخلات أُدخلت بشكل خاطئ\nرقم المتجر أُدخل فيه نص، يجب إدخاله على شكل رقم فقط. \n\n ErrCode: 400 : رمز الخطأ')
                return;
            }
            if (responseJson.statCode == 429) {
                alert('لقد تجاوزت العدد المسموح من الطلبات على الخادم في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                return;
            }
            fetchStoreInfo();
        });
    } else {

        return;
    }

});


document.getElementById('updInfo').addEventListener('click', () => {

    fetch('/storeNum/show', { method: 'GET', }).then((responseNum) => { return responseNum.json(); })
        .then((responseJson) => { if (responseJson.storeNum == "none/لايوجد") { alert("يجب أولا إضافة كلًا من اسم ورقم المتجر للتحديث"); return; } });

    fetch('/storeName/show', { method: 'GET', }).then((responseName) => { return responseName.json(); })
        .then((responseJson) => { if (responseJson.storeName == "none/لايوجد") { alert("يجب أولا إضافة كلًا من اسم ورقم المتجر للتحديث"); return; } });


    if (document.getElementById('storeNum').value == '' && document.getElementById('storeName').value != '') {
        fetch('/storeName', {
                headers: {

                    'Method': 'PUT',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({
                    storeName: document.getElementById('storeName').value,
                })
            })
            .then((response) => {
                return response.json();
            }).then((responseJson) => {

                if (responseJson.statCode == 429) {
                    alert('لقد تجاوزت العدد المسموح من الطلبات على الخادم في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                    return;
                }
                fetchStoreInfo();
            });
    } else if (document.getElementById('storeName').value == '' && document.getElementById('storeNum').value != '') {
        if (currentCountryCodeSelected < 0) { alert('لم تدخل مفتاح الدولة،\n الرجاء المحاولة مجددَا مع إدخال المفتاح'); return; }
        fetch('/storeNum', {
                headers: {

                    'Method': 'PUT',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({
                    storeNum: (currentCountryCodeSelected + document.getElementById('storeNum').value),
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
                    alert('لقد تجاوزت العدد المسموح من الطلبات على الخادم في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                    return;
                }
                console.log(responseJson)
                fetchStoreInfo();
            });
    } else if (document.getElementById('storeNum').value != '' && document.getElementById('storeName').value != '') {
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
                    storeNum: (currentCountryCodeSelected + (currentCountryCodeSelected + document.getElementById('storeNum').value)),
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
                    storeName: document.getElementById('storeName').value,
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
                alert('لقد تجاوزت العدد المسموح من الطلبات على الخادم في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429 : رمز الخطأ')
                return;
            }
            fetchStoreInfo();
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

let listOfCountriesCodes = document.getElementById('listOfCountriesCodes');
for (let i = 0; i < /*Object.keys(countriesCodes).length*/ 10; i++) {
    if (i == 0) {
        listOfCountriesCodes.innerHTML = '';
    }

    listOfCountriesCodes.innerHTML += `<li><a class="dropdown-item" >${i+1}:${countriesCodes[Object.keys(countriesCodes)[i]]['ar_name']}</a></li>`;
}

let countryCodeTitle = document.getElementById('countryCodeTitle');
let allCountriesAncors = document.querySelectorAll('a[class^=dropdown-item]');
let currentCountryCodeSelected = -1;
console.log("Found", allCountriesAncors.length, 'a which class:"dropdown-item".');
for (var i = 0; i < allCountriesAncors.length; i++) {
    allCountriesAncors[i].addEventListener('click', function() {
        let content = this.innerText;
        content = content.split(':');
        id = content[0];
        id--;
        currentCountryCodeSelected = countriesCodes[Object.keys(countriesCodes)[id]]['calling_code'];
        countryCodeTitle.innerText = currentCountryCodeSelected;
    });
}