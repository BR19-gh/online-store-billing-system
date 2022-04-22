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
        <img style="width: 257px; height: 257px;" src="data:image/png;base64,${data[Object.keys(data)[i]]["img"]}" class="card-img-top" alt="Product">
        <div class="card-body">
            <h5 class="card-title">${data[Object.keys(data)[i]]["title"]}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" id="priceContainer">
                <div id="price">${data[Object.keys(data)[i]]["price"]}</div>﷼
            </li>
            <li class="list-group-item">
                <select name="quentity" id="quentity-${Object.keys(data)[i]}">
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
            <div>
                <a  class="card-link delToCartBtn"><i class="fas fa-trash-alt"></i></a>
                <a  class="card-link addToCartBtn">إضافة إلى <i class="fas fa-shopping-cart"></i></a>
                <br><br>
                id:${Object.keys(data)[i]}
            </div>
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
                                            content = content.split("<br><br>id:");
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
                                    var allButtons = document.querySelectorAll('a.delToCartBtn');
                                    console.log("Found", allButtons.length, 'a which class:"delToCartBtn".');
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
                                            content = content.split("<br><br>:id");
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
                                                cartInfo['titles'].splice(cartInfo['titles'].findIndex(a => a === data[`${id}`]['title']), 1);
                                                cartInfo['prices'].splice(cartInfo['prices'].findIndex(a => a === data[`${id}`]['price']), 1);
                                            }
                                            // END
                                            if (cartInfo['prices'] == "") {

                                                shoppingCartIcon = document.getElementById('shoppingCartIcon')
                                                shoppingCartIcon.classList.add("cartAnimationDelFin");
                                                setTimeout(() => {
                                                    shoppingCartIcon.classList.remove("cartAnimationDelFin");
                                                }, 500);

                                                document.getElementById('groupOfTitles').innerHTML = `لا يوجد أي منتج في سلتك حتى الآن`;
                                                document.getElementById('groupOfPrices').innerText = `المجموع 0﷼`;
                                                return;
                                            }
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
                                            shoppingCartIcon.classList.add("cartAnimationDel");
                                            setTimeout(() => {
                                                shoppingCartIcon.classList.remove("cartAnimationDel");
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
                                        personalInfo['time'] = (`${'وقت الاستلام: ' + date}`).replace(/\s/gi, "%20");
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