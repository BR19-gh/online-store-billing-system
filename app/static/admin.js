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
    fetch('/product', {
            headers: {

                'Method': 'POST',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                id: document.getElementById('productID').value,
                title: document.getElementById('productTitle').value,
                price: document.getElementById('productPrice').value
            })
        })
        .then((response) => {
            return response.json();
        }).then((responseJson) => {
            if (responseJson.statCode == 403) {
                alert('الرقم التعريفي للمنتج المراد إضافته موجود مسبقا\nالرجاء المحاولة مجددًا باستخدام رقم آخر')
                return;
            }
            if (responseJson.statCode == 403) {
                alert('فشلت الإضافة، هناك مدخلات أُدخلت بشكل خاطئ\nمثلا: الرقم التعريفي أُدخل كنص')
                return;
            }
            if (responseJson.statCode == 500) {
                alert('حدث خطأ من طرف الخادم\nحاول مجددًا في وقت لاحق')
                return;
            }
            if (document.getElementById('productID').value == '' ||
                document.getElementById('productTitle').value == '' ||
                document.getElementById('productPrice').value == '') {
                return;
            }
            location.reload();
        });
});

document.getElementById('updProd').addEventListener('click', () => {
    fetch(`/product/${document.getElementById('productID').value}`, {
            headers: {

                'Method': 'PUT',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                title: document.getElementById('productTitle').value,
                price: document.getElementById('productPrice').value
            })
        })
        .then((response) => {
            return response.json();
        }).then((responseJson) => {
            if (responseJson.statCode == 404) {
                alert('الرقم التعريفي للمنتج المراد تحديثه غير موجود\nالرجاء المحاولة مجددًا باستخدام رقم آخر')
                return;
            }
            if (responseJson.statCode == 403) {
                alert('فشل التحديث، هناك مدخلات أُدخلت بشكل خاطئ\nمثلا: السعر أُدخل كنص')
                return;
            }
            if (responseJson.statCode == 500) {
                alert('حدث خطأ من طرف الخادم\nحاول مجددًا في وقت لاحق')
                return;
            }
            if (document.getElementById('productID').value == '' ||
                document.getElementById('productTitle').value == '' ||
                document.getElementById('productPrice').value == '') {
                return;
            }
            location.reload();
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
                alert('الرقم التعريفي للمنتج المراد حذفه غير موجود\nالرجاء المحاولة مجددًا باستخدام رقم آخر')
                return;
            }
            if (responseJson.statCode == 500) {
                alert('حدث خطأ من طرف الخادم\nحاول مجددًا في وقت لاحق')
                return;
            }
            if (document.getElementById('productID').value == '') {

                return;
            }
            location.reload();
        });
});

document.getElementById('addCode').addEventListener('click', () => {
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
                alert('الرقم التعريفي للكود المراد إضافته موجود مسبقا\nالرجاء المحاولة مجددًا باستخدام رقم آخر')
                return;
            }
            if (responseJson.statCode == 403) {
                alert('فشلت الإضافة، هناك مدخلات أُدخلت بشكل خاطئ\nمثلا: الرقم التعريفي أُدخل كنص')
                return;
            }
            if (responseJson.statCode == 500) {
                alert('حدث خطأ من طرف الخادم\nحاول مجددًا في وقت لاحق')
                return;
            }
            if (document.getElementById('codeID').value == '' ||
                document.getElementById('codeName').value == '' ||
                document.getElementById('codeAmount').value == '') {
                return;
            }
            location.reload();
        });
});

document.getElementById('updCode').addEventListener('click', () => {
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
                alert('الرقم التعريفي للكود المراد تحديثه غير موجود\nالرجاء المحاولة مجددًا باستخدام رقم آخر')
                return;
            }
            if (responseJson.statCode == 403) {
                alert('فشل التحديث، هناك مدخلات أُدخلت بشكل خاطئ\nمثلا: النسبة أُدخلت كنص')
                return;
            }
            if (responseJson.statCode == 500) {
                alert('حدث خطأ من طرف الخادم\nحاول مجددًا في وقت لاحق')
                return;
            }
            if (document.getElementById('codeID').value == '' ||
                document.getElementById('codeName').value == '' ||
                document.getElementById('codeAmount').value == '') {
                return;
            }
            location.reload();
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
                alert('الرقم التعريفي للكود المراد حذفه غير موجود\nالرجاء المحاولة مجددًا باستخدام رقم آخر')
                return;
            }
            if (responseJson.statCode == 500) {
                alert('حدث خطأ من طرف الخادم\nحاول مجددًا في وقت لاحق')
                return;
            }
            if (document.getElementById('codeID').value == '') {
                return;
            }
            location.reload();
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
                if (responseJson.statCode == 403) {
                    alert('فشلت الإضافة، هناك مدخلات أُدخلت بشكل خاطئ\nمثلا: الرقم أُدخل كنص')
                    return;
                }
                location.reload();
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
                location.reload();
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
            if (responseJson['num'].statCode == 403) {
                alert('فشلت الإضافة، هناك مدخلات أُدخلت بشكل خاطئ\nمثلا: الرقم أُدخل كنص')
                return;
            }
            location.reload();
        });
    } else {

        return;
    }

});


document.getElementById('updInfo').addEventListener('click', () => {

    fetch('/storeNum', { method: 'GET', }).then((responseNum) => { return responseNum.json(); })
        .then((responseJson) => { if (responseJson.storeNum == "none/لايوجد") { alert("يجب أولا إضافة كلًا من اسم ورقم المتجر للتحديث"); return; } });

    fetch('/storeName', { method: 'GET', }).then((responseName) => { return responseName.json(); })
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
                if (responseJson.statCode == 403) {
                    alert('فشل التحديث، هناك مدخلات أُدخلت بشكل خاطئ\nمثلا: الرقم أُدخل كنص')
                    return;
                }
                location.reload();
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
                console.log(responseJson)
                location.reload();
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
            if (responseJson['num'].statCode == 403) {
                alert('فشل التحديث، هناك مدخلات أُدخلت بشكل خاطئ\nمثلا: الرقم أُدخل كنص')
                return;
            }
            location.reload();
        });
    } else {
        return;
    }

});


//// fetches

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
        document.getElementById('productsList').innerHTML = '<b>(الرقم،  العنوان،   السعر)</b>'
        for (let i = 0; i < Object.keys(responseJson).length; i++) {

            if (i == Object.keys(responseJson).length) {
                document.getElementById('productsList').innerHTML += `(${responseJson[i]['id']}, ${responseJson[i]['title']}, ${responseJson[i]['price']})`;
            }
            document.getElementById('productsList').innerHTML += `(${responseJson[i]['id']}, ${responseJson[i]['title']}, ${responseJson[i]['price']})<br>`;
        }

    });

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
        document.getElementById('codesList').innerHTML = '<b>(الرقم،  الاسم،   النسبة)</b>'
        for (let i = 0; i < Object.keys(responseJson).length; i++) {

            if (i == Object.keys(responseJson).length) {
                document.getElementById('codesList').innerHTML += `(${responseJson[i]['id']}, ${responseJson[i]['code']}, ${responseJson[i]['amount']*100}%)`;
            }
            document.getElementById('codesList').innerHTML += `(${responseJson[i]['id']}, ${responseJson[i]['code']}, ${responseJson[i]['amount']*100}%)<br>`;
        }
    });

fetch('/storeNum', {
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

fetch('/storeName', {
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
// let timedelay = setInterval(() => {
//     if ((document.getElementsByClassName('numAndName')[0].innerText != 'none/لايوجد') && (document.getElementsByClassName('numAndName')[1].innerText != 'none/لايوجد')) {
//         document.getElementById('addInfo').style.display = "none";
//     }
// }, 100);
// json for countrey codes


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
    "AX": {
        "code": "AX",
        "name": "\u00c5land\u202c\u200f",
        "en_name": "\u00c5land Islands",
        "ar_name": "\u062c\u0632\u0631 \u0623\u0648\u0644\u0627\u0646 ",
        "calling_code": "358"
    },
    "AL": {
        "code": "AL",
        "name": "Shqip\u00ebria\u202c\u200f",
        "en_name": "Albania",
        "ar_name": "\u0623\u0644\u0628\u0627\u0646\u064a\u0627 ",
        "calling_code": "355"
    },
    "DZ": {
        "code": "DZ",
        "name": "\u0627\u0644\u062c\u0632\u0627\u0626\u0631",
        "en_name": "Algeria",
        "ar_name": "\u0627\u0644\u062c\u0632\u0627\u0626\u0631",
        "calling_code": "213"
    },
    "AS": {
        "code": "AS",
        "name": "American Samoa\u202c\u200f",
        "en_name": "American Samoa",
        "ar_name": "\u0633\u0627\u0645\u0648\u0627 \u0627\u0644\u0623\u0645\u0631\u064a\u0643\u064a\u0629 ",
        "calling_code": "1 684"
    },
    "AD": {
        "code": "AD",
        "name": "Andorra\u202c\u200f",
        "en_name": "Andorra",
        "ar_name": "\u0623\u0646\u062f\u0648\u0631\u0627 ",
        "calling_code": "376"
    },
    "AO": {
        "code": "AO",
        "name": "Angola\u202c\u200f",
        "en_name": "Angola",
        "ar_name": "\u0623\u0646\u063a\u0648\u0644\u0627 ",
        "calling_code": "244"
    },
    "AI": {
        "code": "AI",
        "name": "Anguilla\u202c\u200f",
        "en_name": "Anguilla",
        "ar_name": "\u0623\u0646\u063a\u0648\u064a\u0644\u0627 ",
        "calling_code": "1 264"
    },
    "AQ": {
        "code": "AQ",
        "name": "Antarctica\u202c\u200f",
        "en_name": "Antarctica",
        "ar_name": "\u0623\u0646\u062a\u0627\u0631\u0643\u062a\u064a\u0643\u0627 ",
        "calling_code": "672"
    },
    "AG": {
        "code": "AG",
        "name": "Antigua and Barbuda\u202c\u200f",
        "en_name": "Antigua and Barbuda",
        "ar_name": "\u0623\u0646\u062a\u064a\u063a\u0648\u0627 \u0648\u0628\u0631\u0628\u0648\u062f\u0627 ",
        "calling_code": "1 268"
    },
    "AR": {
        "code": "AR",
        "name": "Argentina\u202c\u200f",
        "en_name": "Argentina",
        "ar_name": "\u0627\u0644\u0623\u0631\u062c\u0646\u062a\u064a\u0646 ",
        "calling_code": "54"
    },
    "AM": {
        "code": "AM",
        "name": "\u0540\u0561\u0575\u0561\u057d\u057f\u0561\u0576\u202c\u200f",
        "en_name": "Armenia",
        "ar_name": "\u0623\u0631\u0645\u064a\u0646\u064a\u0627 ",
        "calling_code": "374"
    },
    "AW": {
        "code": "AW",
        "name": "Aruba\u202c\u200f",
        "en_name": "Aruba",
        "ar_name": "\u0622\u0631\u0648\u0628\u0627 ",
        "calling_code": "297"
    },
    "AU": {
        "code": "AU",
        "name": "Australia\u202c\u200f",
        "en_name": "Australia",
        "ar_name": "\u0623\u0633\u062a\u0631\u0627\u0644\u064a\u0627 ",
        "calling_code": "61"
    },
    "AT": {
        "code": "AT",
        "name": "\u00d6sterreich\u202c\u200f",
        "en_name": "Austria",
        "ar_name": "\u0627\u0644\u0646\u0645\u0633\u0627 ",
        "calling_code": "43"
    },
    "AZ": {
        "code": "AZ",
        "name": "Az\u0259rbaycan\u202c\u200f",
        "en_name": "Azerbaijan",
        "ar_name": "\u0623\u0630\u0631\u0628\u064a\u062c\u0627\u0646 ",
        "calling_code": "994"
    },
    "BS": {
        "code": "BS",
        "name": "Bahamas\u202c\u200f",
        "en_name": "Bahamas",
        "ar_name": "\u0627\u0644\u0628\u0627\u0647\u0627\u0645\u0627 ",
        "calling_code": "1 242"
    },

    "BD": {
        "code": "BD",
        "name": "\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6\u202c\u200f",
        "en_name": "Bangladesh",
        "ar_name": "\u0628\u0646\u062c\u0644\u0627\u062f\u064a\u0634 ",
        "calling_code": "880"
    },
    "BB": {
        "code": "BB",
        "name": "Barbados\u202c\u200f",
        "en_name": "Barbados",
        "ar_name": "\u0628\u0631\u0628\u0627\u062f\u0648\u0633 ",
        "calling_code": "1 246"
    },
    "BY": {
        "code": "BY",
        "name": "\u0411\u0435\u043b\u0430\u0440\u0443\u0441\u044c\u202c\u200f",
        "en_name": "Belarus",
        "ar_name": "\u0631\u0648\u0633\u064a\u0627 \u0627\u0644\u0628\u064a\u0636\u0627\u0621 ",
        "calling_code": "375"
    },
    "BE": {
        "code": "BE",
        "name": "Belgi\u00eb\u202c\u200f",
        "en_name": "Belgium",
        "ar_name": "\u0628\u0644\u062c\u064a\u0643\u0627 ",
        "calling_code": "32"
    },
    "BZ": {
        "code": "BZ",
        "name": "Belize\u202c\u200f",
        "en_name": "Belize",
        "ar_name": "\u0628\u0644\u064a\u0632 ",
        "calling_code": "501"
    },
    "BJ": {
        "code": "BJ",
        "name": "B\u00e9nin\u202c\u200f",
        "en_name": "Benin",
        "ar_name": "\u0628\u0646\u064a\u0646 ",
        "calling_code": "229"
    },
    "BM": {
        "code": "BM",
        "name": "Bermuda\u202c\u200f",
        "en_name": "Bermuda",
        "ar_name": "\u0628\u0631\u0645\u0648\u062f\u0627 ",
        "calling_code": "1 441"
    },
    "BT": {
        "code": "BT",
        "name": "\u0f60\u0f56\u0fb2\u0f74\u0f42\u202c\u200f",
        "en_name": "Bhutan",
        "ar_name": "\u0628\u0648\u062a\u0627\u0646 ",
        "calling_code": "975"
    },
    "BO": {
        "code": "BO",
        "name": "Bolivia\u202c\u200f",
        "en_name": "Bolivia",
        "ar_name": "\u0628\u0648\u0644\u064a\u0641\u064a\u0627 ",
        "calling_code": "591"
    },
    "BQ": {
        "code": "BQ",
        "name": "Caribbean Netherlands\u202c\u200f",
        "en_name": "Caribbean Netherlands",
        "ar_name": "\u0647\u0648\u0644\u0646\u062f\u0627 \u0627\u0644\u0643\u0627\u0631\u064a\u0628\u064a\u0629 ",
        "calling_code": "599"
    },
    "BA": {
        "code": "BA",
        "name": "\u0411\u043e\u0441\u043d\u0430 \u0438 \u0425\u0435\u0440\u0446\u0435\u0433\u043e\u0432\u0438\u043d\u0430\u202c\u200f",
        "en_name": "Bosnia and Herzegovina",
        "ar_name": "\u0627\u0644\u0628\u0648\u0633\u0646\u0629 \u0648\u0627\u0644\u0647\u0631\u0633\u0643 ",
        "calling_code": "387"
    },
    "BW": {
        "code": "BW",
        "name": "Botswana\u202c\u200f",
        "en_name": "Botswana",
        "ar_name": "\u0628\u062a\u0633\u0648\u0627\u0646\u0627 ",
        "calling_code": "267"
    },
    "BV": {
        "code": "BV",
        "name": "Bouvet Island\u202c\u200f",
        "en_name": "Bouvet Island",
        "ar_name": "\u062c\u0632\u064a\u0631\u0629 \u0628\u0648\u0641\u064a\u0647 ",
        "calling_code": null
    },
    "BR": {
        "code": "BR",
        "name": "Brasil\u202c\u200f",
        "en_name": "Brazil",
        "ar_name": "\u0627\u0644\u0628\u0631\u0627\u0632\u064a\u0644 ",
        "calling_code": "55"
    },
    "IO": {
        "code": "IO",
        "name": "British Indian Ocean Territory\u202c\u200f",
        "en_name": "British Indian Ocean Territory",
        "ar_name": "\u0627\u0644\u0625\u0642\u0644\u064a\u0645 \u0627\u0644\u0628\u0631\u064a\u0637\u0627\u0646\u064a \u0641\u064a \u0627\u0644\u0645\u062d\u064a\u0637 \u0627\u0644\u0647\u0646\u062f\u064a ",
        "calling_code": "246"
    },
    "BN": {
        "code": "BN",
        "name": "Brunei\u202c\u200f",
        "en_name": "Brunei",
        "ar_name": "\u0628\u0631\u0648\u0646\u0627\u064a ",
        "calling_code": "673"
    },
    "BG": {
        "code": "BG",
        "name": "\u0411\u044a\u043b\u0433\u0430\u0440\u0438\u044f\u202c\u200f",
        "en_name": "Bulgaria",
        "ar_name": "\u0628\u0644\u063a\u0627\u0631\u064a\u0627 ",
        "calling_code": "359"
    },
    "BF": {
        "code": "BF",
        "name": "Burkina Faso\u202c\u200f",
        "en_name": "Burkina Faso",
        "ar_name": "\u0628\u0648\u0631\u0643\u064a\u0646\u0627 \u0641\u0627\u0633\u0648 ",
        "calling_code": "226"
    },
    "BI": {
        "code": "BI",
        "name": "Uburundi\u202c\u200f",
        "en_name": "Burundi",
        "ar_name": "\u0628\u0648\u0631\u0648\u0646\u062f\u064a ",
        "calling_code": "257"
    },
    "KH": {
        "code": "KH",
        "name": "\u1780\u1798\u17d2\u1796\u17bb\u1787\u17b6\u202c\u200f",
        "en_name": "Cambodia",
        "ar_name": "\u0643\u0645\u0628\u0648\u062f\u064a\u0627 ",
        "calling_code": "855"
    },
    "CM": {
        "code": "CM",
        "name": "Cameroun\u202c\u200f",
        "en_name": "Cameroon",
        "ar_name": "\u0627\u0644\u0643\u0627\u0645\u064a\u0631\u0648\u0646 ",
        "calling_code": "237"
    },
    "CA": {
        "code": "CA",
        "name": "Canada\u202c\u200f",
        "en_name": "Canada",
        "ar_name": "\u0643\u0646\u062f\u0627 ",
        "calling_code": "1"
    },
    "CV": {
        "code": "CV",
        "name": "Kabu Verdi\u202c\u200f",
        "en_name": "Cape Verde",
        "ar_name": "\u0627\u0644\u0631\u0623\u0633 \u0627\u0644\u0623\u062e\u0636\u0631 ",
        "calling_code": "238"
    },
    "KY": {
        "code": "KY",
        "name": "Cayman Islands\u202c\u200f",
        "en_name": "Cayman Islands",
        "ar_name": "\u062c\u0632\u0631 \u0627\u0644\u0643\u0627\u064a\u0645\u0646 ",
        "calling_code": "1 345"
    },
    "CF": {
        "code": "CF",
        "name": "R\u00e9publique centrafricaine\u202c\u200f",
        "en_name": "Central African Republic",
        "ar_name": "\u062c\u0645\u0647\u0648\u0631\u064a\u0629 \u0623\u0641\u0631\u064a\u0642\u064a\u0627 \u0627\u0644\u0648\u0633\u0637\u0649 ",
        "calling_code": "236"
    },
    "TD": {
        "code": "TD",
        "name": "Tchad\u202c\u200f",
        "en_name": "Chad",
        "ar_name": "\u062a\u0634\u0627\u062f ",
        "calling_code": "235"
    },
    "CL": {
        "code": "CL",
        "name": "Chile\u202c\u200f",
        "en_name": "Chile",
        "ar_name": "\u0634\u064a\u0644\u064a ",
        "calling_code": "56"
    },
    "CN": {
        "code": "CN",
        "name": "\u4e2d\u56fd\u202c\u200f",
        "en_name": "China",
        "ar_name": "\u0627\u0644\u0635\u064a\u0646 ",
        "calling_code": "86"
    },
    "CX": {
        "code": "CX",
        "name": "Christmas Island\u202c\u200f",
        "en_name": "Christmas Island",
        "ar_name": "\u062c\u0632\u064a\u0631\u0629 \u0627\u0644\u0643\u0631\u064a\u0633\u0645\u0627\u0633 ",
        "calling_code": "61"
    },
    "CC": {
        "code": "CC",
        "name": "Cocos [Keeling] Islands\u202c\u200f",
        "en_name": "Cocos [Keeling] Islands",
        "ar_name": "\u062c\u0632\u0631 \u0643\u0648\u0643\u0648\u0633 ",
        "calling_code": "61"
    },
    "CO": {
        "code": "CO",
        "name": "Colombia\u202c\u200f",
        "en_name": "Colombia",
        "ar_name": "\u0643\u0648\u0644\u0648\u0645\u0628\u064a\u0627 ",
        "calling_code": "57"
    },
    "KM": {
        "code": "KM",
        "name": "\u062c\u0632\u0631 \u0627\u0644\u0642\u0645\u0631",
        "en_name": "Comoros",
        "ar_name": "\u062c\u0632\u0631 \u0627\u0644\u0642\u0645\u0631",
        "calling_code": "269"
    },
    "CG": {
        "code": "CG",
        "name": "Congo-Brazzaville\u202c\u200f",
        "en_name": "Congo [Republic]",
        "ar_name": "\u0627\u0644\u0643\u0648\u0646\u063a\u0648 - \u0628\u0631\u0627\u0632\u0627\u0641\u064a\u0644 ",
        "calling_code": "242"
    },
    "CD": {
        "code": "CD",
        "name": "Jamhuri ya Kidemokrasia ya Kongo\u202c\u200f",
        "en_name": "Congo [DRC]",
        "ar_name": "\u0627\u0644\u0643\u0648\u0646\u063a\u0648 - \u0643\u064a\u0646\u0634\u0627\u0633\u0627 ",
        "calling_code": "243"
    },
    "CK": {
        "code": "CK",
        "name": "Cook Islands\u202c\u200f",
        "en_name": "Cook Islands",
        "ar_name": "\u062c\u0632\u0631 \u0643\u0648\u0643 ",
        "calling_code": "682"
    },
    "CR": {
        "code": "CR",
        "name": "Costa Rica\u202c\u200f",
        "en_name": "Costa Rica",
        "ar_name": "\u0643\u0648\u0633\u062a\u0627\u0631\u064a\u0643\u0627 ",
        "calling_code": "506"
    },
    "CI": {
        "code": "CI",
        "name": "C\u00f4te d\u2019Ivoire\u202c\u200f",
        "en_name": "C\u00f4te d\u2019Ivoire",
        "ar_name": "\u0633\u0627\u062d\u0644 \u0627\u0644\u0639\u0627\u062c ",
        "calling_code": "225"
    },
    "HR": {
        "code": "HR",
        "name": "Hrvatska\u202c\u200f",
        "en_name": "Croatia",
        "ar_name": "\u0643\u0631\u0648\u0627\u062a\u064a\u0627 ",
        "calling_code": "385"
    },
    "CU": {
        "code": "CU",
        "name": "Cuba\u202c\u200f",
        "en_name": "Cuba",
        "ar_name": "\u0643\u0648\u0628\u0627 ",
        "calling_code": "53"
    },
    "CW": {
        "code": "CW",
        "name": "Cura\u00e7ao\u202c\u200f",
        "en_name": "Cura\u00e7ao",
        "ar_name": "\u0643\u0648\u0631\u0627\u0633\u0627\u0648 ",
        "calling_code": "599 9"
    },
    "CY": {
        "code": "CY",
        "name": "\u039a\u03cd\u03c0\u03c1\u03bf\u03c2\u202c\u200f",
        "en_name": "Cyprus",
        "ar_name": "\u0642\u0628\u0631\u0635 ",
        "calling_code": "357"
    },
    "CZ": {
        "code": "CZ",
        "name": "\u010cesk\u00e1 republika\u202c\u200f",
        "en_name": "Czech Republic",
        "ar_name": "\u062c\u0645\u0647\u0648\u0631\u064a\u0629 \u0627\u0644\u062a\u0634\u064a\u0643 ",
        "calling_code": "420"
    },
    "DK": {
        "code": "DK",
        "name": "Danmark\u202c\u200f",
        "en_name": "Denmark",
        "ar_name": "\u0627\u0644\u062f\u0627\u0646\u0645\u0631\u0643 ",
        "calling_code": "45"
    },
    "DJ": {
        "code": "DJ",
        "name": "Djibouti\u202c\u200f",
        "en_name": "Djibouti",
        "ar_name": "\u062c\u064a\u0628\u0648\u062a\u064a ",
        "calling_code": "253"
    },
    "DM": {
        "code": "DM",
        "name": "Dominica\u202c\u200f",
        "en_name": "Dominica",
        "ar_name": "\u062f\u0648\u0645\u064a\u0646\u064a\u0643\u0627 ",
        "calling_code": "1 767"
    },
    "DO": {
        "code": "DO",
        "name": "Rep\u00fablica Dominicana\u202c\u200f",
        "en_name": "Dominican Republic",
        "ar_name": "\u062c\u0645\u0647\u0648\u0631\u064a\u0629 \u0627\u0644\u062f\u0648\u0645\u064a\u0646\u064a\u0643 ",
        "calling_code": "1 809"
    },
    "EC": {
        "code": "EC",
        "name": "Ecuador\u202c\u200f",
        "en_name": "Ecuador",
        "ar_name": "\u0627\u0644\u0625\u0643\u0648\u0627\u062f\u0648\u0631 ",
        "calling_code": "593"
    },
    "SV": {
        "code": "SV",
        "name": "El Salvador\u202c\u200f",
        "en_name": "El Salvador",
        "ar_name": "\u0627\u0644\u0633\u0644\u0641\u0627\u062f\u0648\u0631 ",
        "calling_code": "503"
    },
    "GQ": {
        "code": "GQ",
        "name": "Guinea Ecuatorial\u202c\u200f",
        "en_name": "Equatorial Guinea",
        "ar_name": "\u063a\u064a\u0646\u064a\u0627 \u0627\u0644\u0625\u0633\u062a\u0648\u0627\u0626\u064a\u0629 ",
        "calling_code": "240"
    },
    "ER": {
        "code": "ER",
        "name": "Eritrea\u202c\u200f",
        "en_name": "Eritrea",
        "ar_name": "\u0623\u0631\u064a\u062a\u0631\u064a\u0627 ",
        "calling_code": "291"
    },
    "EE": {
        "code": "EE",
        "name": "Eesti\u202c\u200f",
        "en_name": "Estonia",
        "ar_name": "\u0623\u0633\u062a\u0648\u0646\u064a\u0627 ",
        "calling_code": "372"
    },
    "ET": {
        "code": "ET",
        "name": "Ethiopia\u202c\u200f",
        "en_name": "Ethiopia",
        "ar_name": "\u0625\u062b\u064a\u0648\u0628\u064a\u0627 ",
        "calling_code": "251"
    },
    "FK": {
        "code": "FK",
        "name": "Falkland Islands [Islas Malvinas]\u202c\u200f",
        "en_name": "Falkland Islands [Islas Malvinas]",
        "ar_name": "\u062c\u0632\u0631 \u0641\u0648\u0643\u0644\u0627\u0646\u062f ",
        "calling_code": "500"
    },
    "FO": {
        "code": "FO",
        "name": "F\u00f8royar\u202c\u200f",
        "en_name": "Faroe Islands",
        "ar_name": "\u062c\u0632\u0631 \u0641\u0627\u0631\u0648 ",
        "calling_code": "298"
    },
    "FJ": {
        "code": "FJ",
        "name": "Fiji\u202c\u200f",
        "en_name": "Fiji",
        "ar_name": "\u0641\u064a\u062c\u064a ",
        "calling_code": "679"
    },
    "FI": {
        "code": "FI",
        "name": "Suomi\u202c\u200f",
        "en_name": "Finland",
        "ar_name": "\u0641\u0646\u0644\u0646\u062f\u0627 ",
        "calling_code": "358"
    },
    "FR": {
        "code": "FR",
        "name": "France\u202c\u200f",
        "en_name": "France",
        "ar_name": "\u0641\u0631\u0646\u0633\u0627 ",
        "calling_code": "33"
    },
    "GF": {
        "code": "GF",
        "name": "Guyane fran\u00e7aise\u202c\u200f",
        "en_name": "French Guiana",
        "ar_name": "\u063a\u0648\u064a\u0627\u0646\u0627 \u0627\u0644\u0641\u0631\u0646\u0633\u064a\u0629 ",
        "calling_code": null
    },
    "PF": {
        "code": "PF",
        "name": "Polyn\u00e9sie fran\u00e7aise\u202c\u200f",
        "en_name": "French Polynesia",
        "ar_name": "\u0628\u0648\u0644\u064a\u0646\u064a\u0632\u064a\u0627 \u0627\u0644\u0641\u0631\u0646\u0633\u064a\u0629 ",
        "calling_code": "689"
    },
    "TF": {
        "code": "TF",
        "name": "Terres australes fran\u00e7aises\u202c\u200f",
        "en_name": "French Southern Territories",
        "ar_name": "\u0627\u0644\u0645\u0642\u0627\u0637\u0639\u0627\u062a \u0627\u0644\u062c\u0646\u0648\u0628\u064a\u0629 \u0627\u0644\u0641\u0631\u0646\u0633\u064a\u0629 ",
        "calling_code": null
    },
    "GA": {
        "code": "GA",
        "name": "Gabon\u202c\u200f",
        "en_name": "Gabon",
        "ar_name": "\u0627\u0644\u062c\u0627\u0628\u0648\u0646 ",
        "calling_code": "241"
    },
    "GM": {
        "code": "GM",
        "name": "Gambia\u202c\u200f",
        "en_name": "Gambia",
        "ar_name": "\u063a\u0627\u0645\u0628\u064a\u0627 ",
        "calling_code": "220"
    },
    "GE": {
        "code": "GE",
        "name": "\u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd\u202c\u200f",
        "en_name": "Georgia",
        "ar_name": "\u062c\u0648\u0631\u062c\u064a\u0627 ",
        "calling_code": "995"
    },
    "DE": {
        "code": "DE",
        "name": "Deutschland\u202c\u200f",
        "en_name": "Germany",
        "ar_name": "\u0623\u0644\u0645\u0627\u0646\u064a\u0627 ",
        "calling_code": "49"
    },
    "GH": {
        "code": "GH",
        "name": "Gaana\u202c\u200f",
        "en_name": "Ghana",
        "ar_name": "\u063a\u0627\u0646\u0627 ",
        "calling_code": "233"
    },
    "GI": {
        "code": "GI",
        "name": "Gibraltar\u202c\u200f",
        "en_name": "Gibraltar",
        "ar_name": "\u062c\u0628\u0644 \u0637\u0627\u0631\u0642 ",
        "calling_code": "350"
    },
    "GR": {
        "code": "GR",
        "name": "\u0395\u03bb\u03bb\u03ac\u03b4\u03b1\u202c\u200f",
        "en_name": "Greece",
        "ar_name": "\u0627\u0644\u064a\u0648\u0646\u0627\u0646 ",
        "calling_code": "30"
    },
    "GL": {
        "code": "GL",
        "name": "Kalaallit Nunaat\u202c\u200f",
        "en_name": "Greenland",
        "ar_name": "\u063a\u0631\u064a\u0646\u0644\u0627\u0646\u062f ",
        "calling_code": "299"
    },
    "GD": {
        "code": "GD",
        "name": "Grenada\u202c\u200f",
        "en_name": "Grenada",
        "ar_name": "\u063a\u0631\u064a\u0646\u0627\u062f\u0627 ",
        "calling_code": "1 473"
    },
    "GP": {
        "code": "GP",
        "name": "Guadeloupe\u202c\u200f",
        "en_name": "Guadeloupe",
        "ar_name": "\u062c\u0648\u0627\u062f\u0644\u0648\u0628 ",
        "calling_code": null
    },
    "GU": {
        "code": "GU",
        "name": "Guam\u202c\u200f",
        "en_name": "Guam",
        "ar_name": "\u063a\u0648\u0627\u0645 ",
        "calling_code": "1 671"
    },
    "GT": {
        "code": "GT",
        "name": "Guatemala\u202c\u200f",
        "en_name": "Guatemala",
        "ar_name": "\u063a\u0648\u0627\u062a\u064a\u0645\u0627\u0644\u0627 ",
        "calling_code": "502"
    },
    "GG": {
        "code": "GG",
        "name": "Guernsey\u202c\u200f",
        "en_name": "Guernsey",
        "ar_name": "\u063a\u064a\u0631\u0646\u0632\u064a ",
        "calling_code": "44"
    },
    "GN": {
        "code": "GN",
        "name": "Guin\u00e9e\u202c\u200f",
        "en_name": "Guinea",
        "ar_name": "\u063a\u064a\u0646\u064a\u0627 ",
        "calling_code": "224"
    },
    "GW": {
        "code": "GW",
        "name": "Guin\u00e9 Bissau\u202c\u200f",
        "en_name": "Guinea-Bissau",
        "ar_name": "\u063a\u064a\u0646\u064a\u0627 \u0628\u064a\u0633\u0627\u0648 ",
        "calling_code": "245"
    },
    "GY": {
        "code": "GY",
        "name": "Guyana\u202c\u200f",
        "en_name": "Guyana",
        "ar_name": "\u063a\u064a\u0627\u0646\u0627 ",
        "calling_code": "592"
    },
    "HT": {
        "code": "HT",
        "name": "Haiti\u202c\u200f",
        "en_name": "Haiti",
        "ar_name": "\u0647\u0627\u064a\u062a\u064a ",
        "calling_code": "509"
    },
    "HM": {
        "code": "HM",
        "name": "Heard Island and McDonald Islands\u202c\u200f",
        "en_name": "Heard Island and McDonald Islands",
        "ar_name": "\u062c\u0632\u064a\u0631\u0629 \u0647\u064a\u0631\u062f \u0648\u062c\u0632\u0631 \u0645\u0627\u0643\u062f\u0648\u0646\u0627\u0644\u062f ",
        "calling_code": null
    },
    "VA": {
        "code": "VA",
        "name": "Citt\u00e0 del Vaticano\u202c\u200f",
        "en_name": "Vatican City",
        "ar_name": "\u0627\u0644\u0641\u0627\u062a\u064a\u0643\u0627\u0646 ",
        "calling_code": "39"
    },
    "HN": {
        "code": "HN",
        "name": "Honduras\u202c\u200f",
        "en_name": "Honduras",
        "ar_name": "\u0647\u0646\u062f\u0648\u0631\u0627\u0633 ",
        "calling_code": "504"
    },
    "HK": {
        "code": "HK",
        "name": "\u9999\u6e2f\u202c\u200f",
        "en_name": "Hong Kong",
        "ar_name": "\u0647\u0648\u0646\u063a \u0643\u0648\u0646\u063a ",
        "calling_code": "852"
    },
    "HU": {
        "code": "HU",
        "name": "Magyarorsz\u00e1g\u202c\u200f",
        "en_name": "Hungary",
        "ar_name": "\u0647\u0646\u063a\u0627\u0631\u064a\u0627 ",
        "calling_code": "36"
    },
    "IS": {
        "code": "IS",
        "name": "\u00cdsland\u202c\u200f",
        "en_name": "Iceland",
        "ar_name": "\u0623\u064a\u0633\u0644\u0646\u062f\u0627 ",
        "calling_code": "354"
    },
    "IN": {
        "code": "IN",
        "name": "\u092d\u093e\u0930\u0924\u202c\u200f",
        "en_name": "India",
        "ar_name": "\u0627\u0644\u0647\u0646\u062f ",
        "calling_code": "91"
    },
    "ID": {
        "code": "ID",
        "name": "Indonesia\u202c\u200f",
        "en_name": "Indonesia",
        "ar_name": "\u0623\u0646\u062f\u0648\u0646\u064a\u0633\u064a\u0627 ",
        "calling_code": "62"
    },
    "IR": {
        "code": "IR",
        "name": "\u0625\u064a\u0631\u0627\u0646",
        "en_name": "Iran",
        "ar_name": "\u0627\u06cc\u0631\u0627\u0646",
        "calling_code": "98"
    },
    "IQ": {
        "code": "IQ",
        "name": "\u0627\u0644\u0639\u0631\u0627\u0642",
        "en_name": "Iraq",
        "ar_name": "\u0627\u0644\u0639\u0631\u0627\u0642",
        "calling_code": "964"
    },
    "IE": {
        "code": "IE",
        "name": "Ireland\u202c\u200f",
        "en_name": "Ireland",
        "ar_name": "\u0623\u064a\u0631\u0644\u0646\u062f\u0627 ",
        "calling_code": "353"
    },
    "IM": {
        "code": "IM",
        "name": "Isle of Man\u202c\u200f",
        "en_name": "Isle of Man",
        "ar_name": "\u062c\u0632\u064a\u0631\u0629 \u0645\u0627\u0646 ",
        "calling_code": "44"
    },
    "IL": {
        "code": "IL",
        "name": "\u05d9\u05e9\u05e8\u05d0\u05dc",
        "en_name": "Israel",
        "ar_name": "\u0625\u0633\u0631\u0627\u0626\u064a\u0644",
        "calling_code": "972"
    },
    "IT": {
        "code": "IT",
        "name": "Italia\u202c\u200f",
        "en_name": "Italy",
        "ar_name": "\u0625\u064a\u0637\u0627\u0644\u064a\u0627 ",
        "calling_code": "39"
    },
    "JM": {
        "code": "JM",
        "name": "Jamaica\u202c\u200f",
        "en_name": "Jamaica",
        "ar_name": "\u062c\u0627\u0645\u0627\u064a\u0643\u0627 ",
        "calling_code": "1 876"
    },
    "JP": {
        "code": "JP",
        "name": "\u65e5\u672c\u202c\u200f",
        "en_name": "Japan",
        "ar_name": "\u0627\u0644\u064a\u0627\u0628\u0627\u0646 ",
        "calling_code": "81"
    },
    "JE": {
        "code": "JE",
        "name": "Jersey\u202c\u200f",
        "en_name": "Jersey",
        "ar_name": "\u062c\u064a\u0631\u0633\u064a ",
        "calling_code": "44"
    },
    "JO": {
        "code": "JO",
        "name": "\u0627\u0644\u0623\u0631\u062f\u0646",
        "en_name": "Jordan",
        "ar_name": "\u0627\u0644\u0623\u0631\u062f\u0646",
        "calling_code": "962"
    },
    "KZ": {
        "code": "KZ",
        "name": "\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d\u202c\u200f",
        "en_name": "Kazakhstan",
        "ar_name": "\u0643\u0627\u0632\u0627\u062e\u0633\u062a\u0627\u0646 ",
        "calling_code": "7"
    },
    "KE": {
        "code": "KE",
        "name": "Kenya\u202c\u200f",
        "en_name": "Kenya",
        "ar_name": "\u0643\u064a\u0646\u064a\u0627 ",
        "calling_code": "254"
    },
    "KI": {
        "code": "KI",
        "name": "Kiribati\u202c\u200f",
        "en_name": "Kiribati",
        "ar_name": "\u0643\u064a\u0631\u064a\u0628\u0627\u062a\u064a ",
        "calling_code": "686"
    },
    "KP": {
        "code": "KP",
        "name": "\uc870\uc120 \ubbfc\uc8fc\uc8fc\uc758 \uc778\ubbfc \uacf5\ud654\uad6d\u202c\u200f",
        "en_name": "North Korea",
        "ar_name": "\u0643\u0648\u0631\u064a\u0627 \u0627\u0644\u0634\u0645\u0627\u0644\u064a\u0629 ",
        "calling_code": "850"
    },
    "KR": {
        "code": "KR",
        "name": "\ub300\ud55c\ubbfc\uad6d\u202c\u200f",
        "en_name": "South Korea",
        "ar_name": "\u0643\u0648\u0631\u064a\u0627 \u0627\u0644\u062c\u0646\u0648\u0628\u064a\u0629 ",
        "calling_code": "82"
    },
    "KG": {
        "code": "KG",
        "name": "Kyrgyzstan\u202c\u200f",
        "en_name": "Kyrgyzstan",
        "ar_name": "\u0642\u0631\u063a\u064a\u0632\u0633\u062a\u0627\u0646 ",
        "calling_code": "996"
    },
    "LA": {
        "code": "LA",
        "name": "\u0eaa.\u0e9b.\u0e9b \u0ea5\u0eb2\u0ea7\u202c\u200f",
        "en_name": "Laos",
        "ar_name": "\u0644\u0627\u0648\u0633 ",
        "calling_code": "856"
    },
    "LV": {
        "code": "LV",
        "name": "Latvija\u202c\u200f",
        "en_name": "Latvia",
        "ar_name": "\u0644\u0627\u062a\u0641\u064a\u0627 ",
        "calling_code": "371"
    },
    "LB": {
        "code": "LB",
        "name": "\u0644\u0628\u0646\u0627\u0646",
        "en_name": "Lebanon",
        "ar_name": "\u0644\u0628\u0646\u0627\u0646",
        "calling_code": "961"
    },
    "LS": {
        "code": "LS",
        "name": "Lesotho\u202c\u200f",
        "en_name": "Lesotho",
        "ar_name": "\u0644\u064a\u0633\u0648\u062a\u0648 ",
        "calling_code": "266"
    },
    "LR": {
        "code": "LR",
        "name": "Liberia\u202c\u200f",
        "en_name": "Liberia",
        "ar_name": "\u0644\u064a\u0628\u064a\u0631\u064a\u0627 ",
        "calling_code": "231"
    },
    "LY": {
        "code": "LY",
        "name": "\u0644\u064a\u0628\u064a\u0627",
        "en_name": "Libya",
        "ar_name": "\u0644\u064a\u0628\u064a\u0627",
        "calling_code": "218"
    },
    "LI": {
        "code": "LI",
        "name": "Liechtenstein\u202c\u200f",
        "en_name": "Liechtenstein",
        "ar_name": "\u0644\u064a\u062e\u062a\u0646\u0634\u062a\u0627\u064a\u0646 ",
        "calling_code": "423"
    },
    "LT": {
        "code": "LT",
        "name": "Lietuva\u202c\u200f",
        "en_name": "Lithuania",
        "ar_name": "\u0644\u064a\u062a\u0648\u0627\u0646\u064a\u0627 ",
        "calling_code": "370"
    },
    "LU": {
        "code": "LU",
        "name": "Luxembourg\u202c\u200f",
        "en_name": "Luxembourg",
        "ar_name": "\u0644\u0648\u0643\u0633\u0645\u0628\u0648\u0631\u063a ",
        "calling_code": "352"
    },
    "MO": {
        "code": "MO",
        "name": "\u6fb3\u9580\u202c\u200f",
        "en_name": "Macau",
        "ar_name": "\u0645\u0643\u0627\u0648 ",
        "calling_code": "853"
    },
    "MK": {
        "code": "MK",
        "name": "\u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0438\u0458\u0430\u202c\u200f",
        "en_name": "Macedonia [FYROM]",
        "ar_name": "\u0645\u0642\u062f\u0648\u0646\u064a\u0627 ",
        "calling_code": "389"
    },
    "MG": {
        "code": "MG",
        "name": "Madagasikara\u202c\u200f",
        "en_name": "Madagascar",
        "ar_name": "\u0645\u062f\u063a\u0634\u0642\u0631 ",
        "calling_code": "261"
    },
    "MW": {
        "code": "MW",
        "name": "Malawi\u202c\u200f",
        "en_name": "Malawi",
        "ar_name": "\u0645\u0644\u0627\u0648\u064a ",
        "calling_code": "265"
    },
    "MY": {
        "code": "MY",
        "name": "Malaysia\u202c\u200f",
        "en_name": "Malaysia",
        "ar_name": "\u0645\u0627\u0644\u064a\u0632\u064a\u0627 ",
        "calling_code": "60"
    },
    "MV": {
        "code": "MV",
        "name": "Maldives\u202c\u200f",
        "en_name": "Maldives",
        "ar_name": "\u062c\u0632\u0631 \u0627\u0644\u0645\u0627\u0644\u062f\u064a\u0641 ",
        "calling_code": "960"
    },
    "ML": {
        "code": "ML",
        "name": "Mali\u202c\u200f",
        "en_name": "Mali",
        "ar_name": "\u0645\u0627\u0644\u064a ",
        "calling_code": "223"
    },
    "MT": {
        "code": "MT",
        "name": "Malta\u202c\u200f",
        "en_name": "Malta",
        "ar_name": "\u0645\u0627\u0644\u0637\u0627 ",
        "calling_code": "356"
    },
    "MH": {
        "code": "MH",
        "name": "Marshall Islands\u202c\u200f",
        "en_name": "Marshall Islands",
        "ar_name": "\u062c\u0632\u0631 \u0627\u0644\u0645\u0627\u0631\u0634\u0627\u0644 ",
        "calling_code": "692"
    },
    "MQ": {
        "code": "MQ",
        "name": "Martinique\u202c\u200f",
        "en_name": "Martinique",
        "ar_name": "\u0645\u0627\u0631\u062a\u064a\u0646\u064a\u0643 ",
        "calling_code": "596"
    },
    "MR": {
        "code": "MR",
        "name": "\u0645\u0648\u0631\u064a\u062a\u0627\u0646\u064a\u0627",
        "en_name": "Mauritania",
        "ar_name": "\u0645\u0648\u0631\u064a\u062a\u0627\u0646\u064a\u0627",
        "calling_code": "222"
    },
    "MU": {
        "code": "MU",
        "name": "Moris\u202c\u200f",
        "en_name": "Mauritius",
        "ar_name": "\u0645\u0648\u0631\u064a\u0634\u064a\u0648\u0633 ",
        "calling_code": "230"
    },
    "YT": {
        "code": "YT",
        "name": "Mayotte\u202c\u200f",
        "en_name": "Mayotte",
        "ar_name": "\u0645\u0627\u064a\u0648\u062a ",
        "calling_code": "262"
    },
    "MX": {
        "code": "MX",
        "name": "M\u00e9xico\u202c\u200f",
        "en_name": "Mexico",
        "ar_name": "\u0627\u0644\u0645\u0643\u0633\u064a\u0643 ",
        "calling_code": "52"
    },
    "FM": {
        "code": "FM",
        "name": "Micronesia\u202c\u200f",
        "en_name": "Micronesia",
        "ar_name": "\u0645\u064a\u0643\u0631\u0648\u0646\u064a\u0632\u064a\u0627 ",
        "calling_code": "691"
    },
    "MD": {
        "code": "MD",
        "name": "Republica Moldova\u202c\u200f",
        "en_name": "Moldova",
        "ar_name": "\u0645\u0648\u0644\u062f\u0627\u0641\u064a\u0627 ",
        "calling_code": "373"
    },
    "MC": {
        "code": "MC",
        "name": "Monaco\u202c\u200f",
        "en_name": "Monaco",
        "ar_name": "\u0645\u0648\u0646\u0627\u0643\u0648 ",
        "calling_code": "377"
    },
    "MN": {
        "code": "MN",
        "name": "\u041c\u043e\u043d\u0433\u043e\u043b\u202c\u200f",
        "en_name": "Mongolia",
        "ar_name": "\u0645\u0646\u063a\u0648\u0644\u064a\u0627 ",
        "calling_code": "976"
    },
    "ME": {
        "code": "ME",
        "name": "Crna Gora\u202c\u200f",
        "en_name": "Montenegro",
        "ar_name": "\u0627\u0644\u062c\u0628\u0644 \u0627\u0644\u0623\u0633\u0648\u062f ",
        "calling_code": "382"
    },
    "MS": {
        "code": "MS",
        "name": "Montserrat\u202c\u200f",
        "en_name": "Montserrat",
        "ar_name": "\u0645\u0648\u0646\u062a\u0633\u0631\u0627\u062a ",
        "calling_code": "1 664"
    },
    "MA": {
        "code": "MA",
        "name": "\u0627\u0644\u0645\u063a\u0631\u0628",
        "en_name": "Morocco",
        "ar_name": "\u0627\u0644\u0645\u063a\u0631\u0628",
        "calling_code": "212"
    },
    "MZ": {
        "code": "MZ",
        "name": "Mo\u00e7ambique\u202c\u200f",
        "en_name": "Mozambique",
        "ar_name": "\u0645\u0648\u0632\u0645\u0628\u064a\u0642 ",
        "calling_code": "258"
    },
    "MM": {
        "code": "MM",
        "name": "\u1019\u103c\u1014\u103a\u1019\u102c\u202c\u200f",
        "en_name": "Myanmar [Burma]",
        "ar_name": "\u0645\u064a\u0627\u0646\u0645\u0627\u0631 -\u0628\u0648\u0631\u0645\u0627 ",
        "calling_code": "95"
    },
    "NA": {
        "code": "NA",
        "name": "Namibia\u202c\u200f",
        "en_name": "Namibia",
        "ar_name": "\u0646\u0627\u0645\u064a\u0628\u064a\u0627 ",
        "calling_code": "264"
    },
    "NR": {
        "code": "NR",
        "name": "Nauru\u202c\u200f",
        "en_name": "Nauru",
        "ar_name": "\u0646\u0627\u0648\u0631\u0648 ",
        "calling_code": "674"
    },
    "NP": {
        "code": "NP",
        "name": "\u0928\u0947\u092a\u093e\u0932\u202c\u200f",
        "en_name": "Nepal",
        "ar_name": "\u0646\u064a\u0628\u0627\u0644 ",
        "calling_code": "977"
    },
    "NL": {
        "code": "NL",
        "name": "Nederland\u202c\u200f",
        "en_name": "Netherlands",
        "ar_name": "\u0647\u0648\u0644\u0646\u062f\u0627 ",
        "calling_code": "31"
    },
    "NC": {
        "code": "NC",
        "name": "Nouvelle-Cal\u00e9donie\u202c\u200f",
        "en_name": "New Caledonia",
        "ar_name": "\u0643\u0627\u0644\u064a\u062f\u0648\u0646\u064a\u0627 \u0627\u0644\u062c\u062f\u064a\u062f\u0629 ",
        "calling_code": "687"
    },
    "NZ": {
        "code": "NZ",
        "name": "New Zealand\u202c\u200f",
        "en_name": "New Zealand",
        "ar_name": "\u0646\u064a\u0648\u0632\u064a\u0644\u0627\u0646\u062f\u0627 ",
        "calling_code": "64"
    },
    "NI": {
        "code": "NI",
        "name": "Nicaragua\u202c\u200f",
        "en_name": "Nicaragua",
        "ar_name": "\u0646\u064a\u0643\u0627\u0631\u0627\u063a\u0648\u0627 ",
        "calling_code": "505"
    },
    "NE": {
        "code": "NE",
        "name": "Nijar\u202c\u200f",
        "en_name": "Niger",
        "ar_name": "\u0627\u0644\u0646\u064a\u062c\u0631 ",
        "calling_code": "227"
    },
    "NG": {
        "code": "NG",
        "name": "Nigeria\u202c\u200f",
        "en_name": "Nigeria",
        "ar_name": "\u0646\u064a\u062c\u064a\u0631\u064a\u0627 ",
        "calling_code": "234"
    },
    "NU": {
        "code": "NU",
        "name": "Niue\u202c\u200f",
        "en_name": "Niue",
        "ar_name": "\u0646\u064a\u0648\u064a ",
        "calling_code": "683"
    },
    "NF": {
        "code": "NF",
        "name": "Norfolk Island\u202c\u200f",
        "en_name": "Norfolk Island",
        "ar_name": "\u062c\u0632\u064a\u0631\u0629 \u0646\u0648\u0631\u0641\u0648\u0643 ",
        "calling_code": "672"
    },
    "MP": {
        "code": "MP",
        "name": "Northern Mariana Islands\u202c\u200f",
        "en_name": "Northern Mariana Islands",
        "ar_name": "\u062c\u0632\u0631 \u0645\u0627\u0631\u064a\u0627\u0646\u0627 \u0627\u0644\u0634\u0645\u0627\u0644\u064a\u0629 ",
        "calling_code": "1 670"
    },
    "NO": {
        "code": "NO",
        "name": "Norge\u202c\u200f",
        "en_name": "Norway",
        "ar_name": "\u0627\u0644\u0646\u0631\u0648\u064a\u062c ",
        "calling_code": "47"
    },
    "PK": {
        "code": "PK",
        "name": "\u067e\u0627\u06a9\u0633\u062a\u0627\u0646",
        "en_name": "Pakistan",
        "ar_name": "\u0628\u0627\u0643\u0633\u062a\u0627\u0646",
        "calling_code": "92"
    },
    "PW": {
        "code": "PW",
        "name": "Palau\u202c\u200f",
        "en_name": "Palau",
        "ar_name": "\u0628\u0627\u0644\u0627\u0648 ",
        "calling_code": "680"
    },
    "PS": {
        "code": "PS",
        "name": "\u0641\u0644\u0633\u0637\u064a\u0646",
        "en_name": "Palestine",
        "ar_name": "\u0641\u0644\u0633\u0637\u064a\u0646",
        "calling_code": "970"
    },
    "PA": {
        "code": "PA",
        "name": "Panam\u00e1\u202c\u200f",
        "en_name": "Panama",
        "ar_name": "\u0628\u0646\u0645\u0627 ",
        "calling_code": "507"
    },
    "PG": {
        "code": "PG",
        "name": "Papua New Guinea\u202c\u200f",
        "en_name": "Papua New Guinea",
        "ar_name": "\u0628\u0627\u0628\u0648\u0627 \u063a\u064a\u0646\u064a\u0627 \u0627\u0644\u062c\u062f\u064a\u062f\u0629 ",
        "calling_code": "675"
    },
    "PY": {
        "code": "PY",
        "name": "Paraguay\u202c\u200f",
        "en_name": "Paraguay",
        "ar_name": "\u0628\u0627\u0631\u0627\u063a\u0648\u0627\u064a ",
        "calling_code": "595"
    },
    "PE": {
        "code": "PE",
        "name": "Per\u00fa\u202c\u200f",
        "en_name": "Peru",
        "ar_name": "\u0628\u064a\u0631\u0648 ",
        "calling_code": "51"
    },
    "PH": {
        "code": "PH",
        "name": "Philippines\u202c\u200f",
        "en_name": "Philippines",
        "ar_name": "\u0627\u0644\u0641\u064a\u0644\u0628\u064a\u0646 ",
        "calling_code": "63"
    },
    "PN": {
        "code": "PN",
        "name": "Pitcairn Islands\u202c\u200f",
        "en_name": "Pitcairn Islands",
        "ar_name": "\u062c\u0632\u0631 \u0628\u064a\u062a\u0643\u064a\u0631\u0646 ",
        "calling_code": "870"
    },
    "PL": {
        "code": "PL",
        "name": "Polska\u202c\u200f",
        "en_name": "Poland",
        "ar_name": "\u0628\u0648\u0644\u0646\u062f\u0627 ",
        "calling_code": "48"
    },
    "PT": {
        "code": "PT",
        "name": "Portugal\u202c\u200f",
        "en_name": "Portugal",
        "ar_name": "\u0627\u0644\u0628\u0631\u062a\u063a\u0627\u0644 ",
        "calling_code": "351"
    },
    "PR": {
        "code": "PR",
        "name": "Puerto Rico\u202c\u200f",
        "en_name": "Puerto Rico",
        "ar_name": "\u0628\u0648\u0631\u062a\u0648\u0631\u064a\u0643\u0648 ",
        "calling_code": "1 787"
    },
    "RE": {
        "code": "RE",
        "name": "R\u00e9union\u202c\u200f",
        "en_name": "R\u00e9union",
        "ar_name": "\u0631\u0648\u064a\u0646\u064a\u0648\u0646 ",
        "calling_code": null
    },
    "RO": {
        "code": "RO",
        "name": "Rom\u00e2nia\u202c\u200f",
        "en_name": "Romania",
        "ar_name": "\u0631\u0648\u0645\u0627\u0646\u064a\u0627 ",
        "calling_code": "40"
    },
    "RU": {
        "code": "RU",
        "name": "\u0420\u043e\u0441\u0441\u0438\u044f\u202c\u200f",
        "en_name": "Russia",
        "ar_name": "\u0631\u0648\u0633\u064a\u0627 ",
        "calling_code": "7"
    },
    "RW": {
        "code": "RW",
        "name": "Rwanda\u202c\u200f",
        "en_name": "Rwanda",
        "ar_name": "\u0631\u0648\u0627\u0646\u062f\u0627 ",
        "calling_code": "250"
    },
    "BL": {
        "code": "BL",
        "name": "Saint-Barth\u00e9l\u00e9my\u202c\u200f",
        "en_name": "Saint Barth\u00e9lemy",
        "ar_name": "\u0633\u0627\u0646 \u0628\u0627\u0631\u062a\u0644\u064a\u0645\u064a ",
        "calling_code": "590"
    },
    "SH": {
        "code": "SH",
        "name": "Saint Helena\u202c\u200f",
        "en_name": "Saint Helena",
        "ar_name": "\u0633\u0627\u0646\u062a \u0647\u064a\u0644\u0646\u0627 ",
        "calling_code": "290"
    },
    "KN": {
        "code": "KN",
        "name": "Saint Kitts and Nevis\u202c\u200f",
        "en_name": "Saint Kitts and Nevis",
        "ar_name": "\u0633\u0627\u0646\u062a \u0643\u064a\u062a\u0633 \u0648\u0646\u064a\u0641\u064a\u0633 ",
        "calling_code": "1 869"
    },
    "LC": {
        "code": "LC",
        "name": "Saint Lucia\u202c\u200f",
        "en_name": "Saint Lucia",
        "ar_name": "\u0633\u0627\u0646\u062a \u0644\u0648\u0633\u064a\u0627 ",
        "calling_code": "1 758"
    },
    "MF": {
        "code": "MF",
        "name": "Saint-Martin [partie fran\u00e7aise]\u202c\u200f",
        "en_name": "Saint Martin",
        "ar_name": "\u0633\u0627\u0646\u062a \u0645\u0627\u0631\u062a\u0646 ",
        "calling_code": "1 599"
    },
    "PM": {
        "code": "PM",
        "name": "Saint-Pierre-et-Miquelon\u202c\u200f",
        "en_name": "Saint Pierre and Miquelon",
        "ar_name": "\u0633\u0627\u0646\u062a \u0628\u064a\u064a\u0631 \u0648\u0645\u064a\u0643\u0648\u0644\u0648\u0646 ",
        "calling_code": "508"
    },
    "VC": {
        "code": "VC",
        "name": "Saint Vincent and the Grenadines\u202c\u200f",
        "en_name": "Saint Vincent and the Grenadines",
        "ar_name": "\u0633\u0627\u0646\u062a \u0641\u0646\u0633\u0646\u062a \u0648\u063a\u0631\u0646\u0627\u062f\u064a\u0646 ",
        "calling_code": "1784"
    },
    "WS": {
        "code": "WS",
        "name": "Samoa\u202c\u200f",
        "en_name": "Samoa",
        "ar_name": "\u0633\u0627\u0645\u0648\u0627 ",
        "calling_code": "685"
    },
    "SM": {
        "code": "SM",
        "name": "San Marino\u202c\u200f",
        "en_name": "San Marino",
        "ar_name": "\u0633\u0627\u0646 \u0645\u0627\u0631\u064a\u0646\u0648 ",
        "calling_code": "378"
    },
    "ST": {
        "code": "ST",
        "name": "S\u00e3o Tom\u00e9 e Pr\u00edncipe\u202c\u200f",
        "en_name": "S\u00e3o Tom\u00e9 and Pr\u00edncipe",
        "ar_name": "\u0633\u0627\u0648 \u062a\u0648\u0645\u064a \u0648\u0628\u0631\u064a\u0646\u0633\u064a\u0628\u064a ",
        "calling_code": "239"
    },
    "SN": {
        "code": "SN",
        "name": "S\u00e9n\u00e9gal\u202c\u200f",
        "en_name": "Senegal",
        "ar_name": "\u0627\u0644\u0633\u0646\u063a\u0627\u0644 ",
        "calling_code": "221"
    },
    "RS": {
        "code": "RS",
        "name": "\u0421\u0440\u0431\u0438\u0458\u0430\u202c\u200f",
        "en_name": "Serbia",
        "ar_name": "\u0635\u0631\u0628\u064a\u0627 ",
        "calling_code": "381"
    },
    "SC": {
        "code": "SC",
        "name": "Seychelles\u202c\u200f",
        "en_name": "Seychelles",
        "ar_name": "\u0633\u064a\u0634\u0644 ",
        "calling_code": "248"
    },
    "SL": {
        "code": "SL",
        "name": "Sierra Leone\u202c\u200f",
        "en_name": "Sierra Leone",
        "ar_name": "\u0633\u064a\u0631\u0627\u0644\u064a\u0648\u0646 ",
        "calling_code": "232"
    },
    "SG": {
        "code": "SG",
        "name": "Singapore\u202c\u200f",
        "en_name": "Singapore",
        "ar_name": "\u0633\u0646\u063a\u0627\u0641\u0648\u0631\u0629 ",
        "calling_code": "65"
    },
    "SX": {
        "code": "SX",
        "name": "Sint Maarten\u202c\u200f",
        "en_name": "Sint Maarten",
        "ar_name": "\u0633\u064a\u0646\u062a \u0645\u0627\u0631\u062a\u0646 ",
        "calling_code": "1 721"
    },
    "SK": {
        "code": "SK",
        "name": "Slovensko\u202c\u200f",
        "en_name": "Slovakia",
        "ar_name": "\u0633\u0644\u0648\u0641\u0627\u0643\u064a\u0627 ",
        "calling_code": "421"
    },
    "SI": {
        "code": "SI",
        "name": "Slovenija\u202c\u200f",
        "en_name": "Slovenia",
        "ar_name": "\u0633\u0644\u0648\u0641\u064a\u0646\u064a\u0627 ",
        "calling_code": "386"
    },
    "SB": {
        "code": "SB",
        "name": "Solomon Islands\u202c\u200f",
        "en_name": "Solomon Islands",
        "ar_name": "\u062c\u0632\u0631 \u0633\u0644\u064a\u0645\u0627\u0646 ",
        "calling_code": "677"
    },
    "SO": {
        "code": "SO",
        "name": "Soomaaliya\u202c\u200f",
        "en_name": "Somalia",
        "ar_name": "\u0627\u0644\u0635\u0648\u0645\u0627\u0644 ",
        "calling_code": "252"
    },
    "ZA": {
        "code": "ZA",
        "name": "South Africa\u202c\u200f",
        "en_name": "South Africa",
        "ar_name": "\u062c\u0646\u0648\u0628 \u0623\u0641\u0631\u064a\u0642\u064a\u0627 ",
        "calling_code": "27"
    },
    "GS": {
        "code": "GS",
        "name": "South Georgia and the South Sandwich Islands\u202c\u200f",
        "en_name": "South Georgia and the South Sandwich Islands",
        "ar_name": "\u062c\u0648\u0631\u062c\u064a\u0627 \u0627\u0644\u062c\u0646\u0648\u0628\u064a\u0629 \u0648\u062c\u0632\u0631 \u0633\u0627\u0646\u062f\u0648\u064a\u062a\u0634 \u0627\u0644\u062c\u0646\u0648\u0628\u064a\u0629 ",
        "calling_code": null
    },
    "SS": {
        "code": "SS",
        "name": "\u062c\u0646\u0648\u0628 \u0627\u0644\u0633\u0648\u062f\u0627\u0646",
        "en_name": "South Sudan",
        "ar_name": "\u062c\u0646\u0648\u0628 \u0627\u0644\u0633\u0648\u062f\u0627\u0646",
        "calling_code": "211"
    },
    "ES": {
        "code": "ES",
        "name": "Espa\u00f1a\u202c\u200f",
        "en_name": "Spain",
        "ar_name": "\u0625\u0633\u0628\u0627\u0646\u064a\u0627 ",
        "calling_code": "34"
    },
    "LK": {
        "code": "LK",
        "name": "\u0dc1\u0dca\u200d\u0dbb\u0dd3 \u0dbd\u0d82\u0d9a\u0dcf\u0dc0\u202c\u200f",
        "en_name": "Sri Lanka",
        "ar_name": "\u0633\u0631\u064a\u0644\u0627\u0646\u0643\u0627 ",
        "calling_code": "94"
    },
    "SD": {
        "code": "SD",
        "name": "\u0627\u0644\u0633\u0648\u062f\u0627\u0646",
        "en_name": "Sudan",
        "ar_name": "\u0627\u0644\u0633\u0648\u062f\u0627\u0646",
        "calling_code": "249"
    },
    "SR": {
        "code": "SR",
        "name": "Suriname\u202c\u200f",
        "en_name": "Suriname",
        "ar_name": "\u0633\u0648\u0631\u064a\u0646\u0627\u0645 ",
        "calling_code": "597"
    },
    "SJ": {
        "code": "SJ",
        "name": "Svalbard og Jan Mayen\u202c\u200f",
        "en_name": "Svalbard and Jan Mayen",
        "ar_name": "\u0633\u0641\u0627\u0644\u0628\u0627\u0631\u062f \u0648\u062c\u0627\u0646 \u0645\u0627\u064a\u0627\u0646 ",
        "calling_code": null
    },
    "SZ": {
        "code": "SZ",
        "name": "Swaziland\u202c\u200f",
        "en_name": "Swaziland",
        "ar_name": "\u0633\u0648\u0627\u0632\u064a\u0644\u0627\u0646\u062f ",
        "calling_code": "268"
    },
    "SE": {
        "code": "SE",
        "name": "Sverige\u202c\u200f",
        "en_name": "Sweden",
        "ar_name": "\u0627\u0644\u0633\u0648\u064a\u062f ",
        "calling_code": "46"
    },
    "CH": {
        "code": "CH",
        "name": "Schweiz\u202c\u200f",
        "en_name": "Switzerland",
        "ar_name": "\u0633\u0648\u064a\u0633\u0631\u0627 ",
        "calling_code": "41"
    },
    "SY": {
        "code": "SY",
        "name": "\u0633\u0648\u0631\u064a\u0627",
        "en_name": "Syria",
        "ar_name": "\u0633\u0648\u0631\u064a\u0627",
        "calling_code": "963"
    },
    "TW": {
        "code": "TW",
        "name": "\u53f0\u7063\u202c\u200f",
        "en_name": "Taiwan",
        "ar_name": "\u062a\u0627\u064a\u0648\u0627\u0646 ",
        "calling_code": "886"
    },
    "TJ": {
        "code": "TJ",
        "name": "Tajikistan\u202c\u200f",
        "en_name": "Tajikistan",
        "ar_name": "\u0637\u0627\u062c\u0643\u0633\u062a\u0627\u0646 ",
        "calling_code": "992"
    },
    "TZ": {
        "code": "TZ",
        "name": "Tanzania\u202c\u200f",
        "en_name": "Tanzania",
        "ar_name": "\u062a\u0627\u0646\u0632\u0627\u0646\u064a\u0627 ",
        "calling_code": "255"
    },
    "TH": {
        "code": "TH",
        "name": "\u0e44\u0e17\u0e22\u202c\u200f",
        "en_name": "Thailand",
        "ar_name": "\u062a\u0627\u064a\u0644\u0646\u062f ",
        "calling_code": "66"
    },
    "TL": {
        "code": "TL",
        "name": "Timor-Leste\u202c\u200f",
        "en_name": "Timor-Leste",
        "ar_name": "\u062a\u064a\u0645\u0648\u0631 \u0627\u0644\u0634\u0631\u0642\u064a\u0629 ",
        "calling_code": "670"
    },
    "TG": {
        "code": "TG",
        "name": "Togo\u202c\u200f",
        "en_name": "Togo",
        "ar_name": "\u062a\u0648\u062c\u0648 ",
        "calling_code": "228"
    },
    "TK": {
        "code": "TK",
        "name": "Tokelau\u202c\u200f",
        "en_name": "Tokelau",
        "ar_name": "\u062a\u0648\u0643\u064a\u0644\u0648 ",
        "calling_code": "690"
    },
    "TO": {
        "code": "TO",
        "name": "Tonga\u202c\u200f",
        "en_name": "Tonga",
        "ar_name": "\u062a\u0648\u0646\u063a\u0627 ",
        "calling_code": "676"
    },
    "TT": {
        "code": "TT",
        "name": "Trinidad and Tobago\u202c\u200f",
        "en_name": "Trinidad and Tobago",
        "ar_name": "\u062a\u0631\u064a\u0646\u064a\u062f\u0627\u062f \u0648\u062a\u0648\u0628\u0627\u063a\u0648 ",
        "calling_code": "1 868"
    },
    "TN": {
        "code": "TN",
        "name": "\u062a\u0648\u0646\u0633",
        "en_name": "Tunisia",
        "ar_name": "\u062a\u0648\u0646\u0633",
        "calling_code": "216"
    },
    "TR": {
        "code": "TR",
        "name": "T\u00fcrkiye\u202c\u200f",
        "en_name": "Turkey",
        "ar_name": "\u062a\u0631\u0643\u064a\u0627 ",
        "calling_code": "90"
    },
    "TM": {
        "code": "TM",
        "name": "Turkmenistan\u202c\u200f",
        "en_name": "Turkmenistan",
        "ar_name": "\u062a\u0631\u0643\u0645\u0627\u0646\u0633\u062a\u0627\u0646 ",
        "calling_code": "993"
    },
    "TC": {
        "code": "TC",
        "name": "Turks and Caicos Islands\u202c\u200f",
        "en_name": "Turks and Caicos Islands",
        "ar_name": "\u062c\u0632\u0631 \u0627\u0644\u062a\u0631\u0643 \u0648\u062c\u0627\u064a\u0643\u0648\u0633 ",
        "calling_code": "1 649"
    },
    "TV": {
        "code": "TV",
        "name": "Tuvalu\u202c\u200f",
        "en_name": "Tuvalu",
        "ar_name": "\u062a\u0648\u0641\u0627\u0644\u0648 ",
        "calling_code": "688"
    },
    "UG": {
        "code": "UG",
        "name": "Uganda\u202c\u200f",
        "en_name": "Uganda",
        "ar_name": "\u0623\u0648\u063a\u0646\u062f\u0627 ",
        "calling_code": "256"
    },
    "UA": {
        "code": "UA",
        "name": "\u0423\u043a\u0440\u0430\u0457\u043d\u0430\u202c\u200f",
        "en_name": "Ukraine",
        "ar_name": "\u0623\u0648\u0643\u0631\u0627\u0646\u064a\u0627 ",
        "calling_code": "380"
    },
    "UM": {
        "code": "UM",
        "name": "U.S. Outlying Islands\u202c\u200f",
        "en_name": "U.S. Outlying Islands",
        "ar_name": "\u062c\u0632\u0631 \u0627\u0644\u0648\u0644\u0627\u064a\u0627\u062a \u0627\u0644\u0645\u062a\u062d\u062f\u0629 \u0627\u0644\u0628\u0639\u064a\u062f\u0629 \u0627\u0644\u0635\u063a\u064a\u0631\u0629 ",
        "calling_code": null
    },
    "UY": {
        "code": "UY",
        "name": "Uruguay\u202c\u200f",
        "en_name": "Uruguay",
        "ar_name": "\u0623\u0648\u0631\u063a\u0648\u0627\u064a ",
        "calling_code": "598"
    },
    "UZ": {
        "code": "UZ",
        "name": "\u040e\u0437\u0431\u0435\u043a\u0438\u0441\u0442\u043e\u043d\u202c\u200f",
        "en_name": "Uzbekistan",
        "ar_name": "\u0623\u0648\u0632\u0628\u0643\u0633\u062a\u0627\u0646 ",
        "calling_code": "998"
    },
    "VU": {
        "code": "VU",
        "name": "Vanuatu\u202c\u200f",
        "en_name": "Vanuatu",
        "ar_name": "\u0641\u0627\u0646\u0648\u0627\u062a\u0648 ",
        "calling_code": "678"
    },
    "VE": {
        "code": "VE",
        "name": "Venezuela\u202c\u200f",
        "en_name": "Venezuela",
        "ar_name": "\u0641\u0646\u0632\u0648\u064a\u0644\u0627 ",
        "calling_code": "58"
    },
    "VN": {
        "code": "VN",
        "name": "Vi\u1ec7t Nam\u202c\u200f",
        "en_name": "Vietnam",
        "ar_name": "\u0641\u064a\u062a\u0646\u0627\u0645 ",
        "calling_code": "84"
    },
    "VG": {
        "code": "VG",
        "name": "British Virgin Islands\u202c\u200f",
        "en_name": "British Virgin Islands",
        "ar_name": "\u062c\u0632\u0631 \u0641\u0631\u062c\u064a\u0646 \u0627\u0644\u0628\u0631\u064a\u0637\u0627\u0646\u064a\u0629 ",
        "calling_code": "1 284"
    },
    "VI": {
        "code": "VI",
        "name": "U.S. Virgin Islands\u202c\u200f",
        "en_name": "U.S. Virgin Islands",
        "ar_name": "\u062c\u0632\u0631 \u0641\u0631\u062c\u064a\u0646 \u0627\u0644\u0623\u0645\u0631\u064a\u0643\u064a\u0629 ",
        "calling_code": "1 340"
    },
    "WF": {
        "code": "WF",
        "name": "Wallis and Futuna\u202c\u200f",
        "en_name": "Wallis and Futuna",
        "ar_name": "\u062c\u0632\u0631 \u0648\u0627\u0644\u0633 \u0648\u0641\u0648\u062a\u0648\u0646\u0627 ",
        "calling_code": "681"
    },
    "EH": {
        "code": "EH",
        "name": "\u0627\u0644\u0635\u062d\u0631\u0627\u0621 \u0627\u0644\u063a\u0631\u0628\u064a\u0629",
        "en_name": "Western Sahara",
        "ar_name": "\u0627\u0644\u0635\u062d\u0631\u0627\u0621 \u0627\u0644\u063a\u0631\u0628\u064a\u0629",
        "calling_code": "212"
    },

    "ZM": {
        "code": "ZM",
        "name": "Zambia\u202c\u200f",
        "en_name": "Zambia",
        "ar_name": "\u0632\u0627\u0645\u0628\u064a\u0627 ",
        "calling_code": "260"
    },
    "ZW": {
        "code": "ZW",
        "name": "Zimbabwe\u202c\u200f",
        "en_name": "Zimbabwe",
        "ar_name": "\u0632\u064a\u0645\u0628\u0627\u0628\u0648\u064a ",
        "calling_code": "263"
    }
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