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



                            let cartInfo = {
                                "titles": [],
                                "prices": []
                            }
                            if (data3['storeName'] != "none/لايوجد") {
                                document.querySelector('#storeName').innerText = data3['storeName'];
                                clearInterval(loading);

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

                                    phoneNum = data4['storeNum']

                                    document.querySelector('#shoppingCartIcon').addEventListener('click', () => {
                                        document.querySelector('#cartInfo').classList.add('showNice');
                                        document.querySelector('#cartInfo').classList.remove('closeNice');

                                        setTimeout(() => {
                                            document.querySelector('#cartInfo').style.display = "block";
                                        }, 300);

                                        document.getElementById('cover').style.display = 'block';
                                        setTimeout(() => {
                                            document.getElementById('cover').style.opacity = '1';
                                        }, 300);


                                    });

                                    document.querySelector('#shoppingCartCancel').addEventListener('click', () => {
                                        document.querySelector('#cartInfo').classList.add('closeNice');
                                        document.querySelector('#cartInfo').classList.remove('showNice');

                                        setTimeout(() => {
                                            document.querySelector('#cartInfo').style.display = "none";
                                        }, 300);

                                        document.getElementById('cover').style.display = 'none';
                                        setTimeout(() => {
                                            document.getElementById('cover').style.opacity = '0';
                                        }, 300);
                                    });

                                    document.querySelector('#infoIcon').addEventListener('click', () => {
                                        document.querySelector('#infoCard').classList.add('showNice');
                                        document.querySelector('#infoCard').classList.remove('closeNice');

                                        setTimeout(() => {
                                            document.querySelector('#infoCard').style.display = "block";
                                        }, 300);

                                        document.getElementById('cover').style.display = 'block';
                                        setTimeout(() => {
                                            document.getElementById('cover').style.opacity = '1';
                                        }, 300);
                                    });

                                    document.querySelector('#infoCardCancel').addEventListener('click', () => {
                                        document.querySelector('#infoCard').classList.add('closeNice');
                                        document.querySelector('#infoCard').classList.remove('showNice');

                                        setTimeout(() => {
                                            document.querySelector('#infoCard').style.display = "none";
                                        }, 300);

                                        document.getElementById('cover').style.display = 'none';
                                        setTimeout(() => {
                                            document.getElementById('cover').style.opacity = '0';
                                        }, 300);
                                    });

                                    document.querySelector('#cover').addEventListener('click', () => {
                                        document.querySelector('#infoCard').classList.add('closeNice');
                                        document.querySelector('#infoCard').classList.remove('showNice');
                                        document.querySelector('#cartInfo').classList.add('closeNice');
                                        document.querySelector('#cartInfo').classList.remove('showNice');


                                        setTimeout(() => {
                                            document.querySelector('#cartInfo').style.display = "none";
                                        }, 300);
                                        setTimeout(() => {
                                            document.querySelector('#infoCard').style.display = "none";
                                        }, 300);

                                        document.getElementById('cover').style.display = 'none';
                                        setTimeout(() => {
                                            document.getElementById('cover').style.opacity = '0';
                                        }, 300);
                                    });

                                    let num = 1
                                    let numNotRepeat = 0;
                                    let container = document.querySelector('#cardContainer');
                                    for (let i = 0; i < Object.keys(data).length; i++) {
                                        if (data.statCode == 204) {
                                            document.querySelector('#msgNotFetched').style.display = "block";
                                            break;
                                        } else {
                                            document.querySelector('#msgNotFetched').style.display = "none";
                                        }
                                        num = Math.floor(Math.random() * 8) + 1;
                                        while (num == numNotRepeat) {
                                            num = Math.floor(Math.random() * 8) + 1;
                                        }
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
            <div style="height: 1.5rem;">
                <a  class="card-link delToCartBtn"><i class="fas fa-trash-alt"></i></a>
                <a  class="card-link addToCartBtn">إضافة إلى <i class="fas fa-shopping-cart"></i></a>
                <br><br>
                <div style="display: none;">id:${Object.keys(data)[i]}\t</div>
            </div>
        </div>
    </div>
`
                                    }
                                    var allButtons = document.querySelectorAll('a.addToCartBtn');

                                    for (var i = 0; i < allButtons.length; i++) {
                                        allButtons[i].addEventListener('click', function() {
                                            // to allow to enter promo code again
                                            if (firstPassCart == 1) {
                                                beforeDiscount = undefined;
                                                thereIsApastDiscount = true;
                                                document.querySelectorAll('.submitCode')[0].classList.remove('submitCodeDisabled')
                                                document.querySelectorAll('.submitCode')[0].classList.add('submitCodeEnabled')
                                            }
                                            // END
                                            // to know prud id, and its quentity
                                            let content = this.parentElement.innerHTML;
                                            id = content.split(`id:`)[1].split(`\t`)[0];

                                            console.log("You clicked:", id);

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

                                            let sumOfPrices = cartInfo['prices'].reduce((a, b) => Number(a) + Number(b), 0); // sum all price array elements
                                            let sumOfTitles = '';
                                            let countsSumOfTitles = {};
                                            cartInfo['titles'].forEach(function(x) {
                                                countsSumOfTitles[x] = (countsSumOfTitles[x] || 0) + 1;
                                            });
                                            for (let j = 0; j < Object.keys(countsSumOfTitles).length; j++) {
                                                sumOfTitles = sumOfTitles.concat(`المنتج:<b>${Object.keys(countsSumOfTitles)[j]}</b>، الكمية:<b>${Number(Object.values(countsSumOfTitles)[j])}</b> <br>`);
                                            }
                                            document.querySelector('#groupOfTitles').innerHTML = `${sumOfTitles}`;;
                                            document.querySelector('#groupOfPrices').innerText = `المجموع: ${sumOfPrices} ﷼`
                                                // to allow to enter promo code again
                                            if (firstPassCart == 1) {
                                                priceBeforeDiscount = Number(sumOfPrices);
                                            }
                                            // END
                                            shoppingCartIcon = document.querySelector('#shoppingCartIcon')
                                            shoppingCartIcon.classList.add("cartAnimation");
                                            setTimeout(() => {
                                                shoppingCartIcon.classList.remove("cartAnimation");
                                            }, 100);
                                            // END
                                        });
                                    }
                                    var allButtons = document.querySelectorAll('a.delToCartBtn');

                                    for (var i = 0; i < allButtons.length; i++) {
                                        allButtons[i].addEventListener('click', function() {
                                            // to allow to enter promo code again
                                            if (firstPassCart == 1) {
                                                beforeDiscount = undefined;
                                                thereIsApastDiscount = true;
                                                document.querySelectorAll('.submitCode')[0].classList.remove('submitCodeDisabled')
                                                document.querySelectorAll('.submitCode')[0].classList.add('submitCodeEnabled')
                                            }
                                            // END
                                            // to know prud id, and its quentity
                                            let content = this.parentElement.innerHTML;
                                            id = content.split(`id:`)[1].split(`\t`)[0];

                                            console.log("You clicked:", id);

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
                                            if (cartInfo['prices'].findIndex(a => a === data[`${id}`]['price']) != -1) {
                                                for (let k = 0; k < valueOfQuentity; k++) {
                                                    cartInfo['titles'].splice(cartInfo['titles'].findIndex(a => a === data[`${id}`]['title']), 1);
                                                    cartInfo['prices'].splice(cartInfo['prices'].findIndex(a => a === data[`${id}`]['price']), 1);
                                                }
                                            }
                                            // END
                                            else {
                                                shoppingCartIcon = document.querySelector('#shoppingCartIcon')
                                                shoppingCartIcon.classList.add("cartAnimationDelFin");
                                                setTimeout(() => {
                                                    shoppingCartIcon.classList.remove("cartAnimationDelFin");
                                                }, 500);

                                                if (cartInfo['prices'].length == 0) {
                                                    document.querySelector('#groupOfTitles').innerHTML = `لا يوجد أي منتج في سلتك حتى الآن`;
                                                    document.querySelector('#groupOfPrices').innerText = `المجموع 0﷼`;
                                                }
                                                return;
                                            }

                                            let sumOfPrices = cartInfo['prices'].reduce((a, b) => Number(a) + Number(b), 0); // sum all price array elements
                                            let sumOfTitles = '';
                                            let countsSumOfTitles = {};
                                            cartInfo['titles'].forEach(function(x) {
                                                countsSumOfTitles[x] = (countsSumOfTitles[x] || 0) + 1;
                                            });
                                            for (let j = 0; j < Object.keys(countsSumOfTitles).length; j++) {
                                                sumOfTitles = sumOfTitles.concat(`المنتج:<b>${Object.keys(countsSumOfTitles)[j]}</b>، الكمية:<b>${Number(Object.values(countsSumOfTitles)[j])}</b> <br>`);
                                            }
                                            document.querySelector('#groupOfTitles').innerHTML = `${sumOfTitles}`;;
                                            document.querySelector('#groupOfPrices').innerText = `المجموع: ${sumOfPrices} ﷼`
                                                // to allow to enter promo code again
                                            if (firstPassCart == 1) {
                                                priceBeforeDiscount = Number(sumOfPrices);
                                            }
                                            // END
                                            shoppingCartIcon = document.querySelector('#shoppingCartIcon')
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

                                    document.querySelectorAll('.submitCode')[0].addEventListener('click', () => {
                                        if (data2[`${Object.keys(data2)[0]}`] == null) {
                                            alert("القسيمة غير صالحة، جرب قسيمةً آخر");
                                            return;
                                        }
                                        firstPassCart = 1;
                                        let totalPrice = document.querySelector('#groupOfPrices').innerText.split(': ')[1].split(' ')[0];
                                        for (let i = 0; i < Object.keys(data2).length; i++) {
                                            if (document.querySelector('#discount').value == data2[`${Object.keys(data2)[i]}`]['code']) {
                                                if (isNaN(Number(document.querySelector('#groupOfPrices').innerText.split(': ')[1].split(' ')[0])) == true) {
                                                    break;
                                                }
                                                theCurrentDiscount = data2[`${Object.keys(data2)[i]}`]['code'];
                                                if (beforeDiscount == data2[`${Object.keys(data2)[i]}`]['code']) {
                                                    thereIsApastDiscount = true;
                                                    break;
                                                }
                                                beforeDiscount = data2[`${Object.keys(data2)[i]}`]['code'];
                                                if (thereIsApastDiscount == true) {
                                                    if (priceBeforeDiscount != NaN && priceBeforeDiscount != undefined && priceBeforeDiscount > 0) {
                                                        totalPrice = priceBeforeDiscount;
                                                    }
                                                } else {
                                                    priceBeforeDiscount = totalPrice;
                                                }
                                                fullPrice = Number(totalPrice)
                                                totalPrice = fullPrice - (Number(totalPrice) * data2[`${Object.keys(data2)[i]}`]['amount']);
                                                document.querySelector('#groupOfPrices').innerHTML = `المجموع: ${totalPrice} ﷼<br><small style='font-size: small; color: red; text-decoration: line-through;'>المجموع: ${priceBeforeDiscount}﷼</small>`

                                                dontAcceptOtherDiscount = 1;
                                                document.querySelectorAll('.submitCode')[0].classList.add('submitCodeDisabled')
                                                document.querySelectorAll('.submitCode')[0].classList.remove('submitCodeEnabled')
                                                break;
                                            } else if (document.querySelector('#discount').value == '') {
                                                break;
                                            } else if (i == (Object.keys(data2).length) - 1) {
                                                let totalPrice = document.querySelector('#groupOfPrices').innerText.split(': ')[1].split(' ')[0];
                                                beforeDiscount = undefined;
                                                if (priceBeforeDiscount != NaN && priceBeforeDiscount != undefined && Number(priceBeforeDiscount) > 0) {


                                                    totalPrice = Number(priceBeforeDiscount);
                                                }

                                                document.querySelector('#groupOfPrices').innerText = `المجموع: ${totalPrice} ﷼`
                                                alert("القسيمة غير صالحة، جرب قسيمةً آخر")
                                                document.querySelectorAll('.submitCode')[0].classList.remove('submitCodeDisabled')
                                                document.querySelectorAll('.submitCode')[0].classList.add('submitCodeEnabled')

                                            }
                                        }

                                    });
                                    let bill;
                                    document.querySelector('#sendToWhatsApp').addEventListener('click', () => {
                                        let restDiscountMsg;

                                        let titles;
                                        let prices;
                                        let personalInfoOutput = '';
                                        let personalInfo = {};
                                        if (theCurrentDiscount == undefined || theCurrentDiscount == '') {
                                            restDiscountMsg = 'لا يوجد قسيمة';
                                            priceBeforeDiscount = "لا يوجد خصم"
                                        } else {
                                            priceBeforeDiscount = priceBeforeDiscount + '﷼'
                                            restDiscountMsg = theCurrentDiscount;
                                        }

                                        let date;
                                        if (document.querySelector('#personalInfoTime').innerText != '' ||
                                            document.querySelector('#personalInfoTime').innerText != null ||
                                            document.querySelector('#personalInfoTime').innerText != undefined) {
                                            date = formatDate(new Date(document.querySelector('#personalInfoTime').value));
                                        }


                                        let discount = 'قسيمة الخصم: ' + restDiscountMsg;
                                        titles = document.querySelector('#groupOfTitles').innerHTML.replace(/\s/gi, "%20");
                                        titles = titles.replace(/<br>/gi, "%0a");
                                        titles = titles.replace(/<b>/gi, "*");
                                        titles = titles.replace(/<\/b>/gi, "*");

                                        prices = `~قبل الخصم: ${priceBeforeDiscount}~%0a*${document.querySelector('#groupOfPrices').innerText.split('\n')[0].replace(/\s/gi, "%20")}*`

                                        personalInfo['name'] = document.querySelector('#personalInfoName').value.replace(/\s/gi, "%20");
                                        personalInfo['numb'] = document.querySelector('#personalInfoNumb').value.replace(/\s/gi, "%20");
                                        personalInfo['addr'] = document.querySelector('#personalInfoAddr').value.replace(/\s/gi, "%20");
                                        personalInfo['time'] = (`${'وقت الاستلام: ' + date}`).replace(/\s/gi, "%20");
                                        if (personalInfo['name'] == '' || personalInfo['numb'] == '' || personalInfo['addr'] == '' || personalInfo['time'] == '') {
                                            alert('الرجاء تعبئة كل البيانات الشخصية')
                                            return;
                                        }
                                        for (let i = 0; i < Object.keys(personalInfo).length; i++) {
                                            personalInfoOutput = personalInfoOutput.concat(personalInfo[`${Object.keys(personalInfo)[i]}`] + "%0a");
                                        }

                                        discount = discount.replace(/\s/gi, "%20");

                                        bill = `فاتورة متجر ${data3['storeName']}` + "%0a%0a" + personalInfoOutput + "%0a%0a" + titles + "%0a%0a" + discount + '%0a' + prices;

                                        if (Number(document.querySelector('#groupOfPrices').innerText.split(': ')[1].split(' ')[0]) == 0 ||
                                            isNaN(Number(document.querySelector('#groupOfPrices').innerText.split(': ')[1].split(' ')[0])) == true) {
                                            alert('يجب أن يكون في سلتك منتجات \nأو يكون مبلغ الشراء أعلى من 0﷼ لإتمام العملية');
                                            return;
                                        }

                                        location.assign(`https://wa.me/${phoneNum}?text=${bill}`);
                                    });




                                }).catch(error => {
                                    alert(`هناك خطأ في التواصل مع السيرفر، تواصل مع المطور لحل المشكلة أو انتظر حتى يتم حلها\nالخطأ: ${error}//storeNum// \n التاريخ: ${formatDate(new Date())}`)
                                });
                        }).catch(error => {
                            alert(`هناك خطأ في التواصل مع السيرفر، تواصل مع المطور لحل المشكلة أو انتظر حتى يتم حلها\nالخطأ: ${error}//storeName// \n التاريخ: ${formatDate(new Date())}`)
                        });
                }).catch(error => {
                    alert(`هناك خطأ في التواصل مع السيرفر، تواصل مع المطور لحل المشكلة أو انتظر حتى يتم حلها\nالخطأ: ${error}//promocodes// \n التاريخ: ${formatDate(new Date())}`)
                });
        }).catch(error => {
            alert(`هناك خطأ في التواصل مع السيرفر، تواصل مع المطور لحل المشكلة أو انتظر حتى يتم حلها\nالخطأ: ${error}//products// \n التاريخ: ${formatDate(new Date())}`)
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


let i = 0;
let loading = setInterval(() => {
    if (i < 3) i++;
    else i = 0;
    document.querySelector('#storeName').innerText = `جار التحميل${'.'.repeat(i)}`;
}, 500);