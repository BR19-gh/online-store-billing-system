let data = {}
let data2 = {}

function firstFetch() {

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
            data = responseJson;
            console.log(responseJson);
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
                    data2 = responseJson;


                    fetch('/storeName/show', {
                            headers: {

                                'Method': 'GET',
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                            },
                            method: 'GET',
                        })
                        .then((response) => {
                            return response.json();
                        }).then((responseJson) => {
                            data3 = responseJson;
                            console.log(responseJson);


                            let cartInfo = {
                                "titles": [],
                                "prices": []
                            }
                            if (data3['storeName'] != "none/لايوجد") {
                                document.getElementById('storeName').innerText = data3['storeName'];
                            }

                            fetch('/storeNum/show', {
                                    headers: {

                                        'Method': 'GET',
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json',
                                    },
                                    method: 'GET',
                                })
                                .then((response) => {
                                    return response.json();
                                }).then((responseJson) => {
                                    data4 = responseJson;
                                    console.log(responseJson);
                                    phoneNum = data4['storeNum']

                                    document.getElementById('shoppingCartIcon').addEventListener('click', () => {
                                        document.getElementById('cartInfo').style.display = "block";
                                    });

                                    document.getElementById('shoppingCartCancel').addEventListener('click', () => {
                                        document.getElementById('cartInfo').style.display = "none";
                                    });

                                    document.getElementById('infoIcon').addEventListener('click', () => {
                                        document.getElementById('infoCard').style.display = "block";
                                    });

                                    document.getElementById('infoCardCancel').addEventListener('click', () => {
                                        document.getElementById('infoCard').style.display = "none";
                                    });

                                    let num = 1
                                    let numNotRepeat = 0;
                                    let container = document.getElementById('cardContainer');
                                    for (let i = 0; i < Object.keys(data).length; i++) {
                                        if (data.statCode == 204) { document.getElementById('msgNotFetched').style.display = "block"; break; } else { document.getElementById('msgNotFetched').style.display = "none"; }
                                        num = Math.floor(Math.random() * 8) + 1;
                                        while (num == numNotRepeat) { num = Math.floor(Math.random() * 8) + 1; }
                                        numNotRepeat = num;

                                        container.innerHTML +=
                                            ` 
    <div id="form" class="card" style="width: 18rem;">
        <img style="width: 257px; height: 257px;" src="data:image/png;base64,${data[i]["img"]}" class="card-img-top" alt="Product">
        <div class="card-body">
            <h5 class="card-title">${data[i]["title"]}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" id="priceContainer">
                <div id="price">${data[i]["price"]}</div>﷼
            </li>
            <li class="list-group-item">
                <select name="quentity" id="quentity-${i}">
                    <option selected disabled>الكمية</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </li>
        </ul>
        <div style="direction: rtl;" class="card-body">
            <div><a  class="card-link addToCartBtn">إضافة إلى <i class="fas fa-shopping-cart"></i></a><br><br>${i+1}</div>
        </div>
    </div>
`
                                    }
                                    var allButtons = document.querySelectorAll('a.addToCartBtn');
                                    console.log("Found", allButtons.length, 'a which class:"addToCartBtn".');
                                    for (var i = 0; i < allButtons.length; i++) {
                                        allButtons[i].addEventListener('click', function() {
                                            // to allow to enter promo code again
                                            if (firstPassCart == 1) {
                                                beforeDiscount = undefined;
                                                thereIsApastDiscount = true;
                                                document.getElementsByClassName('submitCode')[0].classList.remove('submitCodeDisabled')
                                                document.getElementsByClassName('submitCode')[0].classList.add('submitCodeEnabled')
                                            }
                                            // END
                                            // to know prud id, and its quentity
                                            let content = this.parentElement.innerHTML;
                                            content = content.split("<br><br>");
                                            id = content[1];
                                            console.log("You clicked:", id);
                                            id--;
                                            let valueOfQuentity = Number(document.getElementById(`quentity-${id}`).value);
                                            if (isNaN(valueOfQuentity) == true) {
                                                valueOfQuentity = false;
                                            }
                                            // END
                                            // to put titles and prices in cart
                                            if (valueOfQuentity == false) {
                                                valueOfQuentity = 1;
                                            }
                                            // count for quentity(select)
                                            for (let k = 0; k < valueOfQuentity; k++) {
                                                cartInfo['titles'].push(data[`${id}`]['title']);
                                                cartInfo['prices'].push(data[`${id}`]['price']);
                                            }
                                            // END
                                            let sumOfPrices = cartInfo['prices'].reduce((a, b) => Number(a) + Number(b)) // sum all price array elements
                                            let sumOfTitles = '';
                                            let countsSumOfTitles = {};
                                            cartInfo['titles'].forEach(function(x) { countsSumOfTitles[x] = (countsSumOfTitles[x] || 0) + 1; });
                                            for (let j = 0; j < Object.keys(countsSumOfTitles).length; j++) {
                                                sumOfTitles = sumOfTitles.concat(`المنتج:<b>${Object.keys(countsSumOfTitles)[j]}</b>، الكمية:<b>${Number(Object.values(countsSumOfTitles)[j])}</b> <br>`);
                                            }
                                            document.getElementById('groupOfTitles').innerHTML = `${sumOfTitles}`;;
                                            document.getElementById('groupOfPrices').innerText = `المجموع: ${sumOfPrices} ﷼`
                                                // to allow to enter promo code again
                                            if (firstPassCart == 1) {
                                                priceBeforeDiscount = Number(sumOfPrices);
                                            }
                                            // END
                                            shoppingCartIcon = document.getElementById('shoppingCartIcon')
                                            shoppingCartIcon.classList.add("cartAnimation");
                                            setTimeout(() => {
                                                shoppingCartIcon.classList.remove("cartAnimation");
                                            }, 100);
                                            // END
                                        });
                                    }
                                    let firstPassCart = 0;
                                    let thereIsApastDiscount = false;
                                    let beforeDiscount;
                                    let priceBeforeDiscount = 0;
                                    let theCurrentDiscount;
                                    let fullPrice;
                                    document.getElementsByClassName('submitCode')[0].addEventListener('click', () => {
                                        if (data2[0] == null) { alert("الكود غير صالح، جرب كودًا آخر"); return; }
                                        firstPassCart = 1;
                                        let totalPrice = document.getElementById('groupOfPrices').innerText.split(': ')[1].split(' ')[0];
                                        for (let i = 0; i < Object.keys(data2).length; i++) {
                                            if (document.getElementById('discount').value == data2[`${i}`]['code']) {
                                                if (isNaN(Number(document.getElementById('groupOfPrices').innerText.split(': ')[1].split(' ')[0])) == true) {
                                                    break;
                                                }
                                                theCurrentDiscount = data2[`${i}`]['code'];
                                                if (beforeDiscount == data2[`${i}`]['code']) {
                                                    thereIsApastDiscount = true;
                                                    break;
                                                }
                                                beforeDiscount = data2[`${i}`]['code'];
                                                if (thereIsApastDiscount == true) {
                                                    if (priceBeforeDiscount != NaN && priceBeforeDiscount != undefined && priceBeforeDiscount > 0) {
                                                        totalPrice = priceBeforeDiscount;
                                                    }
                                                } else {
                                                    priceBeforeDiscount = totalPrice;
                                                }
                                                fullPrice = Number(totalPrice)
                                                totalPrice = fullPrice - (Number(totalPrice) * data2[`${i}`]['amount']);
                                                document.getElementById('groupOfPrices').innerHTML = `المجموع: ${totalPrice} ﷼<br><small style='font-size: small; color: red; text-decoration: line-through;'>المجموع: ${priceBeforeDiscount}﷼</small>`
                                                console.log(totalPrice)
                                                dontAcceptOtherDiscount = 1;
                                                document.getElementsByClassName('submitCode')[0].classList.add('submitCodeDisabled')
                                                document.getElementsByClassName('submitCode')[0].classList.remove('submitCodeEnabled')
                                                break;
                                            } else if (document.getElementById('discount').value == '') {
                                                break;
                                            } else if (i == (Object.keys(data2).length) - 1) {
                                                let totalPrice = document.getElementById('groupOfPrices').innerText.split(': ')[1].split(' ')[0];
                                                beforeDiscount = undefined;
                                                if (priceBeforeDiscount != NaN && priceBeforeDiscount != undefined && Number(priceBeforeDiscount) > 0) {


                                                    totalPrice = Number(priceBeforeDiscount);
                                                }
                                                console.log(totalPrice)
                                                document.getElementById('groupOfPrices').innerText = `المجموع: ${totalPrice} ﷼`
                                                alert("الكود غير صالح، جرب كودًا آخر")
                                                document.getElementsByClassName('submitCode')[0].classList.remove('submitCodeDisabled')
                                                document.getElementsByClassName('submitCode')[0].classList.add('submitCodeEnabled')

                                            }
                                        }

                                    });
                                    let bill;
                                    document.getElementById('sendToWhatsApp').addEventListener('click', () => {
                                        let restDiscountMsg;

                                        let titles;
                                        let prices;
                                        let personalInfoOutput = '';
                                        let personalInfo = {};
                                        if (theCurrentDiscount == undefined || theCurrentDiscount == '') {
                                            restDiscountMsg = 'لا يوجد كود';
                                            priceBeforeDiscount = "لا يوجد خصم"
                                        } else {
                                            priceBeforeDiscount = priceBeforeDiscount + '﷼'
                                            restDiscountMsg = theCurrentDiscount;
                                        }

                                        let date;
                                        if (document.getElementById('personalInfoTime').innerText != '' ||
                                            document.getElementById('personalInfoTime').innerText != null ||
                                            document.getElementById('personalInfoTime').innerText != undefined) {
                                            date = formatDate(new Date(document.getElementById('personalInfoTime').value));
                                        }


                                        let discount = 'كود الخصم: ' + restDiscountMsg;
                                        titles = document.getElementById('groupOfTitles').innerHTML.replace(/\s/gi, "%20");
                                        titles = titles.replace(/<br>/gi, "%0a");
                                        titles = titles.replace(/<b>/gi, "*");
                                        titles = titles.replace(/<\/b>/gi, "*");

                                        prices = `~قبل الخصم: ${priceBeforeDiscount}~%0a*${document.getElementById('groupOfPrices').innerText.split('\n')[0].replace(/\s/gi, "%20")}*`

                                        personalInfo['name'] = document.getElementById('personalInfoName').value.replace(/\s/gi, "%20");
                                        personalInfo['numb'] = document.getElementById('personalInfoNumb').value.replace(/\s/gi, "%20");
                                        personalInfo['addr'] = document.getElementById('personalInfoAddr').value.replace(/\s/gi, "%20");
                                        personalInfo['time'] = (`${'وقت الاستلام: '+date}`).replace(/\s/gi, "%20");
                                        if (personalInfo['name'] == '' || personalInfo['numb'] == '' || personalInfo['addr'] == '' || personalInfo['time'] == '') {
                                            alert('الرجاء تعبئة كل البيانات الشخصية')
                                            return;
                                        }
                                        for (let i = 0; i < Object.keys(personalInfo).length; i++) {
                                            personalInfoOutput = personalInfoOutput.concat(personalInfo[`${Object.keys(personalInfo)[i]}`] + "%0a");
                                        }

                                        discount = discount.replace(/\s/gi, "%20");

                                        bill = personalInfoOutput + "%0a%0a" + titles + "%0a%0a" + discount + '%0a' + prices;

                                        if (Number(document.getElementById('groupOfPrices').innerText.split(': ')[1].split(' ')[0]) == 0 ||
                                            isNaN(Number(document.getElementById('groupOfPrices').innerText.split(': ')[1].split(' ')[0])) == true) {
                                            alert('يجب أن يكون في سلتك منتجات \nأو يكون مبلغ الشراء أعلى من 0﷼ لإتمام العملية');
                                            return;
                                        }

                                        location.assign(`https://wa.me/${phoneNum}?text=${bill}`);
                                    });





                                });
                        });
                });
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
                    document.documentElement.style.setProperty('--container', '#6583dfc0');
                    document.documentElement.style.setProperty('--containerHover', '#6583dfa0');
                    document.documentElement.style.setProperty('--h1', '#a3a1c2a0');
                    document.documentElement.style.setProperty('--h1OtherScreen', '#a3a1c2d0');
                    document.documentElement.style.setProperty('--form', '#b6b6c4c0');
                    document.documentElement.style.setProperty('--formHover', '#b6b7c4');
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
                    document.documentElement.style.setProperty('--body', '#464646');
                    document.documentElement.style.setProperty('--borders', '#111111');
                    document.documentElement.style.setProperty('--btns', '#7A7A7A');
                    document.documentElement.style.setProperty('--btnsHover', '#5c5c5c');
                    document.documentElement.style.setProperty('--container', '#404040c0');
                    document.documentElement.style.setProperty('--containerHover', '#404040a0');
                    document.documentElement.style.setProperty('--h1', '#232323a0');
                    document.documentElement.style.setProperty('--h1OtherScreen', '#232323d0');
                    document.documentElement.style.setProperty('--form', '#343434c0');
                    document.documentElement.style.setProperty('--formHover', '#343434');
                    document.documentElement.style.setProperty('--input', '#8e8e8e');
                    document.documentElement.style.setProperty('--inputHover', '#aaaaaa');
                    document.documentElement.style.setProperty('--inputFocus', '#bbbbbb');
                    document.documentElement.style.setProperty('--webkitScrollbarTrack', '#bfbfbfc0');
                    document.documentElement.style.setProperty('--webkitScrollbarThumb', '#949494');
                    document.documentElement.style.setProperty('--webkitScrollbarThumbHover', '#7a7a7a');
                    document.documentElement.style.setProperty('--infoCard', '#d6d6d6a8');
                }


            }
            console.log('current theme is ' + responseJson['storeTheme'])
        });

}

firstFetch();



function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'م' : 'ص';
    hours = hours % 12;
    hours = hours ? hours : 12;
    // minutes = minutes < 10 ? '0' + minutes : minutes;
    var year = date.getFullYear();
    var month = date.getMonth();
    month = (Number(month) + 1) < 10 ? '0' + (Number(month) + 1) : (Number(month) + 1);
    var date = date.getDate();
    date = date < 10 ? '0' + date : date;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = year + '/' + month + '/' + date + ', ' + hours + ':' + minutes + ampm;
    return strTime;
}