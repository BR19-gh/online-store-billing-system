/* eslint-disable eol-last */
/* eslint-disable operator-linebreak */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable brace-style */
/* eslint-disable no-redeclare */
/* eslint-disable no-var */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
let data = {};
let data2 = {};
let listOfTitles = [];
let isCartOpenWithoutChange = false;
let groupOfTitlesInnerHTML;

// eslint-disable-next-line space-before-function-paren
function firstFetch() {
    fetch("/products", {
            headers: {
                Method: "GET",
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            method: "GET"
        })
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
                data = responseJson;

                fetch("/promocodes", {
                        headers: {
                            Method: "GET",
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        },
                        method: "GET"
                    })
                    .then((response) => {
                        return response.json();
                    })
                    .then((responseJson) => {
                            data2 = responseJson;

                            fetch("/storeName/show", {
                                    headers: {
                                        Method: "GET",
                                        "Content-Type": "application/json",
                                        Accept: "application/json"
                                    },
                                    method: "GET"
                                })
                                .then((response) => {
                                    return response.json();
                                })
                                .then((responseJson) => {
                                        data3 = responseJson;

                                        const cartInfo = {
                                            titles: [],
                                            prices: []
                                        };
                                        if (data3.storeName != "none/????????????") {
                                            document.querySelector("#storeName").innerText =
                                                data3.storeName;
                                            clearInterval(loading);
                                        }

                                        fetch("/storeNum/show", {
                                                headers: {
                                                    Method: "GET",
                                                    "Content-Type": "application/json",
                                                    Accept: "application/json"
                                                },
                                                method: "GET"
                                            })
                                            .then((response) => {
                                                return response.json();
                                            })
                                            .then((responseJson) => {
                                                    data4 = responseJson;

                                                    phoneNum = data4.storeNum;

                                                    fetch("/billDetails/show", {
                                                            headers: {
                                                                Method: "GET",
                                                                "Content-Type": "application/json",
                                                                Accept: "application/json"
                                                            },
                                                            method: "GET"
                                                        })
                                                        .then((response) => {
                                                            return response.json();
                                                        })
                                                        .then((responseJson) => {
                                                                data5 = responseJson;

                                                                if (
                                                                    data5.billDetails ==
                                                                    "none/????????????" ||
                                                                    data5.billDetails == ""
                                                                ) {
                                                                    data5.billDetails = "";
                                                                } else {
                                                                    data5.billDetails = `??????: ${data5.billDetails}`;
                                                                }

                                                                document
                                                                    .querySelector(
                                                                        "#shoppingCartIcon"
                                                                    )
                                                                    .addEventListener(
                                                                        "click",
                                                                        () => {
                                                                            let listOfImgs;
                                                                            const innerHTMLofGroupOfTitlesNew = [];
                                                                            groupOfTitlesInnerHTML =
                                                                                document.querySelector(
                                                                                    "#groupOfTitles"
                                                                                ).innerHTML;
                                                                            const innerHTMLofGroupOfTitles =
                                                                                document
                                                                                .querySelector(
                                                                                    "#groupOfTitles"
                                                                                )
                                                                                .innerHTML.split(
                                                                                    "<br>"
                                                                                );
                                                                            innerHTMLofGroupOfTitles.pop();
                                                                            console.log(
                                                                                listOfTitles
                                                                            );
                                                                            if (
                                                                                listOfTitles.length !==
                                                                                0 &&
                                                                                isCartOpenWithoutChange ===
                                                                                false
                                                                            ) {
                                                                                isCartOpenWithoutChange = true;
                                                                                document.querySelector(
                                                                                    "#groupOfTitles"
                                                                                ).innerHTML = "";
                                                                                listOfImgs =
                                                                                    convertTitleToImg(
                                                                                        listOfTitles,
                                                                                        data
                                                                                    );
                                                                                let i = 0;
                                                                                innerHTMLofGroupOfTitles.forEach(
                                                                                    (ihgt) => {
                                                                                        innerHTMLofGroupOfTitlesNew.push(
                                                                                            `${ihgt}?? <b>????????????: </b><img style="border: 1px solid #8f8d85 ; border-radius: 10px; width: 25px; height: 25px; margin: 0;" src="data:image/png;base64,${listOfImgs[i]}" alt="${listOfTitles[i]}"><br>`
                                                                                        );
                                                                                        i++;
                                                                                    }
                                                                                );
                                                                                innerHTMLofGroupOfTitlesNew.forEach(
                                                                                    (
                                                                                        innerHTMLofGroupOfTitleNew
                                                                                    ) => {
                                                                                        document.querySelector(
                                                                                                "#groupOfTitles"
                                                                                            ).innerHTML +=
                                                                                            innerHTMLofGroupOfTitleNew;
                                                                                    }
                                                                                );
                                                                            }

                                                                            document
                                                                                .querySelector(
                                                                                    "#cartInfo"
                                                                                )
                                                                                .classList.add(
                                                                                    "showNice"
                                                                                );
                                                                            document
                                                                                .querySelector(
                                                                                    "#cartInfo"
                                                                                )
                                                                                .classList.remove(
                                                                                    "closeNice"
                                                                                );

                                                                            setTimeout(() => {
                                                                                document.querySelector(
                                                                                        "#cartInfo"
                                                                                    ).style.display =
                                                                                    "block";
                                                                            }, 300);

                                                                            document.getElementById(
                                                                                    "cover"
                                                                                ).style.display =
                                                                                "block";
                                                                            setTimeout(() => {
                                                                                document.getElementById(
                                                                                        "cover"
                                                                                    ).style.opacity =
                                                                                    "1";
                                                                            }, 300);
                                                                        }
                                                                    );

                                                                document
                                                                    .querySelector(
                                                                        "#shoppingCartCancel"
                                                                    )
                                                                    .addEventListener(
                                                                        "click",
                                                                        () => {
                                                                            document
                                                                                .querySelector(
                                                                                    "#cartInfo"
                                                                                )
                                                                                .classList.add(
                                                                                    "closeNice"
                                                                                );
                                                                            document
                                                                                .querySelector(
                                                                                    "#cartInfo"
                                                                                )
                                                                                .classList.remove(
                                                                                    "showNice"
                                                                                );

                                                                            setTimeout(() => {
                                                                                document.querySelector(
                                                                                        "#cartInfo"
                                                                                    ).style.display =
                                                                                    "none";
                                                                            }, 300);

                                                                            document.getElementById(
                                                                                "cover"
                                                                            ).style.display = "none";
                                                                            setTimeout(() => {
                                                                                document.getElementById(
                                                                                        "cover"
                                                                                    ).style.opacity =
                                                                                    "0";
                                                                            }, 300);
                                                                        }
                                                                    );

                                                                document
                                                                    .querySelector("#infoIcon")
                                                                    .addEventListener(
                                                                        "click",
                                                                        () => {
                                                                            document
                                                                                .querySelector(
                                                                                    "#infoCard"
                                                                                )
                                                                                .classList.add(
                                                                                    "showNice"
                                                                                );
                                                                            document
                                                                                .querySelector(
                                                                                    "#infoCard"
                                                                                )
                                                                                .classList.remove(
                                                                                    "closeNice"
                                                                                );

                                                                            setTimeout(() => {
                                                                                document.querySelector(
                                                                                        "#infoCard"
                                                                                    ).style.display =
                                                                                    "block";
                                                                            }, 300);

                                                                            document.getElementById(
                                                                                    "cover"
                                                                                ).style.display =
                                                                                "block";
                                                                            setTimeout(() => {
                                                                                document.getElementById(
                                                                                        "cover"
                                                                                    ).style.opacity =
                                                                                    "1";
                                                                            }, 300);
                                                                        }
                                                                    );

                                                                document
                                                                    .querySelector(
                                                                        "#infoCardCancel"
                                                                    )
                                                                    .addEventListener(
                                                                        "click",
                                                                        () => {
                                                                            document
                                                                                .querySelector(
                                                                                    "#infoCard"
                                                                                )
                                                                                .classList.add(
                                                                                    "closeNice"
                                                                                );
                                                                            document
                                                                                .querySelector(
                                                                                    "#infoCard"
                                                                                )
                                                                                .classList.remove(
                                                                                    "showNice"
                                                                                );

                                                                            setTimeout(() => {
                                                                                document.querySelector(
                                                                                        "#infoCard"
                                                                                    ).style.display =
                                                                                    "none";
                                                                            }, 300);

                                                                            document.getElementById(
                                                                                "cover"
                                                                            ).style.display = "none";
                                                                            setTimeout(() => {
                                                                                document.getElementById(
                                                                                        "cover"
                                                                                    ).style.opacity =
                                                                                    "0";
                                                                            }, 300);
                                                                        }
                                                                    );

                                                                document
                                                                    .querySelector("#cover")
                                                                    .addEventListener(
                                                                        "click",
                                                                        () => {
                                                                            document
                                                                                .querySelector(
                                                                                    "#infoCard"
                                                                                )
                                                                                .classList.add(
                                                                                    "closeNice"
                                                                                );
                                                                            document
                                                                                .querySelector(
                                                                                    "#infoCard"
                                                                                )
                                                                                .classList.remove(
                                                                                    "showNice"
                                                                                );
                                                                            document
                                                                                .querySelector(
                                                                                    "#cartInfo"
                                                                                )
                                                                                .classList.add(
                                                                                    "closeNice"
                                                                                );
                                                                            document
                                                                                .querySelector(
                                                                                    "#cartInfo"
                                                                                )
                                                                                .classList.remove(
                                                                                    "showNice"
                                                                                );

                                                                            setTimeout(() => {
                                                                                document.querySelector(
                                                                                        "#cartInfo"
                                                                                    ).style.display =
                                                                                    "none";
                                                                            }, 300);
                                                                            setTimeout(() => {
                                                                                document.querySelector(
                                                                                        "#infoCard"
                                                                                    ).style.display =
                                                                                    "none";
                                                                            }, 300);

                                                                            document.getElementById(
                                                                                "cover"
                                                                            ).style.display = "none";
                                                                            setTimeout(() => {
                                                                                document.getElementById(
                                                                                        "cover"
                                                                                    ).style.opacity =
                                                                                    "0";
                                                                            }, 300);
                                                                        }
                                                                    );

                                                                let num = 1;
                                                                let numNotRepeat = 0;
                                                                const container =
                                                                    document.querySelector(
                                                                        "#cardContainer"
                                                                    );
                                                                for (
                                                                    let i = 0; i < Object.keys(data).length; i++
                                                                ) {
                                                                    if (data.statCode == 204) {
                                                                        document.querySelector(
                                                                            "#msgNotFetched"
                                                                        ).style.display = "block";
                                                                        break;
                                                                    } else {
                                                                        document.querySelector(
                                                                            "#msgNotFetched"
                                                                        ).style.display = "none";
                                                                    }
                                                                    num =
                                                                        Math.floor(
                                                                            Math.random() * 8
                                                                        ) + 1;
                                                                    while (num == numNotRepeat) {
                                                                        num =
                                                                            Math.floor(
                                                                                Math.random() * 8
                                                                            ) + 1;
                                                                    }
                                                                    numNotRepeat = num;

                                                                    if (data[Object.keys(data)[i]].avail != false) {
                                                                        container.innerHTML += ` 
    <div id="form" class="card" style="width: 18rem;">
        <img style="width: 257px; height: 257px;" src="data:image/png;base64,${data[Object.keys(data)[i]].img
                          }" class="card-img-top" alt="${data[Object.keys(data)[i]].title}">
        <div class="card-body">
            <h5 class="card-title">${data[Object.keys(data)[i]].title}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" id="priceContainer">
                <div id="price">${data[Object.keys(data)[i]].price}</div>???
            </li>
            <li class="list-group-item">
                <select name="quentity" id="quentity-${Object.keys(data)[i]}">
                    <option selected disabled>????????????</option>
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
                <a  class="card-link addToCartBtn">?????????? ?????? <i class="fas fa-shopping-cart"></i></a>
                <br><br>
                <div style="display: none;">id:${Object.keys(data)[i]}\t</div>
            </div>
        </div>
    </div>
`;
                                                                    }
                                                                }

                                                                var allButtons =
                                                                    document.querySelectorAll(
                                                                        "a.addToCartBtn"
                                                                    );

                                                                for (
                                                                    var i = 0; i < allButtons.length; i++
                                                                ) {
                                                                    allButtons[i].addEventListener(
                                                                        "click",
                                                                        function() {
                                                                            isCartOpenWithoutChange = false;
                                                                            // to allow to enter promo code again
                                                                            if (
                                                                                firstPassCart == 1
                                                                            ) {
                                                                                beforeDiscount =
                                                                                    undefined;
                                                                                thereIsApastDiscount = true;
                                                                                document
                                                                                    .querySelectorAll(
                                                                                        ".submitCode"
                                                                                    )[0]
                                                                                    .classList.remove(
                                                                                        "submitCodeDisabled"
                                                                                    );
                                                                                document
                                                                                    .querySelectorAll(
                                                                                        ".submitCode"
                                                                                    )[0]
                                                                                    .classList.add(
                                                                                        "submitCodeEnabled"
                                                                                    );
                                                                            }
                                                                            // END
                                                                            // to know prud id, and its quentity

                                                                            const content =
                                                                                this.parentElement
                                                                                .innerHTML;

                                                                            id = content
                                                                                .split("id:")[1]
                                                                                .split("\t")[0];

                                                                            console.log(
                                                                                "You clicked:",
                                                                                id
                                                                            );

                                                                            let valueOfQuentity =
                                                                                Number(
                                                                                    document.getElementById(
                                                                                        `quentity-${id}`
                                                                                    ).value
                                                                                );
                                                                            if (
                                                                                isNaN(
                                                                                    valueOfQuentity
                                                                                ) == true
                                                                            ) {
                                                                                valueOfQuentity = false;
                                                                            }
                                                                            // END
                                                                            // to put titles and prices in cart
                                                                            if (
                                                                                valueOfQuentity ==
                                                                                false
                                                                            ) {
                                                                                valueOfQuentity = 1;
                                                                            }
                                                                            // count for quentity(select)
                                                                            for (
                                                                                let k = 0; k < valueOfQuentity; k++
                                                                            ) {
                                                                                cartInfo.titles.push(
                                                                                    data[`${id}`]
                                                                                    .title
                                                                                );
                                                                                cartInfo.prices.push(
                                                                                    data[`${id}`]
                                                                                    .price
                                                                                );
                                                                            }
                                                                            // END

                                                                            const sumOfPrices =
                                                                                cartInfo.prices.reduce(
                                                                                    (a, b) =>
                                                                                    Number(a) +
                                                                                    Number(b),
                                                                                    0
                                                                                ); // sum all price array elements
                                                                            let sumOfTitles = "";
                                                                            const countsSumOfTitles = {};
                                                                            cartInfo.titles.forEach(
                                                                                function(x) {
                                                                                    countsSumOfTitles[
                                                                                            x
                                                                                        ] =
                                                                                        (countsSumOfTitles[
                                                                                            x
                                                                                        ] || 0) + 1;
                                                                                }
                                                                            );
                                                                            for (
                                                                                let j = 0; j <
                                                                                Object.keys(
                                                                                    countsSumOfTitles
                                                                                ).length; j++
                                                                            ) {
                                                                                listOfTitles =
                                                                                    Object.keys(
                                                                                        countsSumOfTitles
                                                                                    );

                                                                                sumOfTitles =
                                                                                    sumOfTitles.concat(
                                                                                        `<b>????????????:</b> ${Object.keys(
                                    countsSumOfTitles
                                  )[j]
                                  }?? <b>????????????:</b> ${Number(
                                    Object.values(
                                      countsSumOfTitles
                                    )[j]
                                  )}<br>`
                                                                                    );
                                                                            }
                                                                            document.querySelector(
                                                                                "#groupOfTitles"
                                                                            ).innerHTML = `${sumOfTitles}`;
                                                                            document.querySelector(
                                                                                "#groupOfPrices"
                                                                            ).innerText = `??????????????: ${sumOfPrices} ???`;
                                                                            // to allow to enter promo code again
                                                                            if (
                                                                                firstPassCart == 1
                                                                            ) {
                                                                                priceBeforeDiscount =
                                                                                    Number(
                                                                                        sumOfPrices
                                                                                    );
                                                                            }
                                                                            // END
                                                                            shoppingCartIcon =
                                                                                document.querySelector(
                                                                                    "#shoppingCartIcon"
                                                                                );
                                                                            shoppingCartIcon.classList.add(
                                                                                "cartAnimation"
                                                                            );
                                                                            setTimeout(() => {
                                                                                shoppingCartIcon.classList.remove(
                                                                                    "cartAnimation"
                                                                                );
                                                                            }, 100);
                                                                            // END
                                                                        }
                                                                    );
                                                                }
                                                                var allButtons =
                                                                    document.querySelectorAll(
                                                                        "a.delToCartBtn"
                                                                    );

                                                                for (
                                                                    var i = 0; i < allButtons.length; i++
                                                                ) {
                                                                    allButtons[i].addEventListener(
                                                                        "click",
                                                                        function() {
                                                                            isCartOpenWithoutChange = false;
                                                                            // to allow to enter promo code again
                                                                            if (
                                                                                firstPassCart == 1
                                                                            ) {
                                                                                beforeDiscount =
                                                                                    undefined;
                                                                                thereIsApastDiscount = true;
                                                                                document
                                                                                    .querySelectorAll(
                                                                                        ".submitCode"
                                                                                    )[0]
                                                                                    .classList.remove(
                                                                                        "submitCodeDisabled"
                                                                                    );
                                                                                document
                                                                                    .querySelectorAll(
                                                                                        ".submitCode"
                                                                                    )[0]
                                                                                    .classList.add(
                                                                                        "submitCodeEnabled"
                                                                                    );
                                                                            }
                                                                            // END
                                                                            // to know prud id, and its quentity
                                                                            const content =
                                                                                this.parentElement
                                                                                .innerHTML;
                                                                            id = content
                                                                                .split("id:")[1]
                                                                                .split("\t")[0];

                                                                            console.log(
                                                                                "You clicked:",
                                                                                id
                                                                            );

                                                                            let valueOfQuentity =
                                                                                Number(
                                                                                    document.getElementById(
                                                                                        `quentity-${id}`
                                                                                    ).value
                                                                                );
                                                                            if (
                                                                                isNaN(
                                                                                    valueOfQuentity
                                                                                ) == true
                                                                            ) {
                                                                                valueOfQuentity = false;
                                                                            }
                                                                            // END
                                                                            // to put titles and prices in cart
                                                                            if (
                                                                                valueOfQuentity ==
                                                                                false
                                                                            ) {
                                                                                valueOfQuentity = 1;
                                                                            }
                                                                            // count for quentity(select)
                                                                            if (
                                                                                cartInfo.prices.findIndex(
                                                                                    (a) =>
                                                                                    a ===
                                                                                    data[
                                                                                        `${id}`
                                                                                    ].price
                                                                                ) != -1
                                                                            ) {
                                                                                for (
                                                                                    let k = 0; k <
                                                                                    valueOfQuentity; k++
                                                                                ) {
                                                                                    cartInfo.titles.splice(
                                                                                        cartInfo.titles.findIndex(
                                                                                            (a) =>
                                                                                            a ===
                                                                                            data[
                                                                                                `${id}`
                                                                                            ]
                                                                                            .title
                                                                                        ),
                                                                                        1
                                                                                    );
                                                                                    cartInfo.prices.splice(
                                                                                        cartInfo.prices.findIndex(
                                                                                            (a) =>
                                                                                            a ===
                                                                                            data[
                                                                                                `${id}`
                                                                                            ]
                                                                                            .price
                                                                                        ),
                                                                                        1
                                                                                    );
                                                                                }
                                                                            }
                                                                            // END
                                                                            else {
                                                                                shoppingCartIcon =
                                                                                    document.querySelector(
                                                                                        "#shoppingCartIcon"
                                                                                    );
                                                                                shoppingCartIcon.classList.add(
                                                                                    "cartAnimationDelFin"
                                                                                );
                                                                                setTimeout(() => {
                                                                                    shoppingCartIcon.classList.remove(
                                                                                        "cartAnimationDelFin"
                                                                                    );
                                                                                }, 500);

                                                                                if (
                                                                                    cartInfo.prices
                                                                                    .length == 0
                                                                                ) {
                                                                                    document.querySelector(
                                                                                            "#groupOfTitles"
                                                                                        ).innerHTML =
                                                                                        "???? ???????? ???? ???????? ???? ???????? ?????? ????????";
                                                                                    document.querySelector(
                                                                                            "#groupOfPrices"
                                                                                        ).innerText =
                                                                                        "?????????????? 0???";
                                                                                }
                                                                                return;
                                                                            }

                                                                            const sumOfPrices =
                                                                                cartInfo.prices.reduce(
                                                                                    (a, b) =>
                                                                                    Number(a) +
                                                                                    Number(b),
                                                                                    0
                                                                                ); // sum all price array elements
                                                                            let sumOfTitles = "";
                                                                            const countsSumOfTitles = {};
                                                                            cartInfo.titles.forEach(
                                                                                function(x) {
                                                                                    countsSumOfTitles[
                                                                                            x
                                                                                        ] =
                                                                                        (countsSumOfTitles[
                                                                                            x
                                                                                        ] || 0) + 1;
                                                                                }
                                                                            );
                                                                            for (
                                                                                let j = 0; j <
                                                                                Object.keys(
                                                                                    countsSumOfTitles
                                                                                ).length; j++
                                                                            ) {
                                                                                sumOfTitles =
                                                                                    sumOfTitles.concat(
                                                                                        `<b>????????????:</b> ${Object.keys(
                                    countsSumOfTitles
                                  )[j]
                                  }?? <b>????????????:</b> ${Number(
                                    Object.values(
                                      countsSumOfTitles
                                    )[j]
                                  )}<br>`
                                                                                    );
                                                                            }
                                                                            document.querySelector(
                                                                                "#groupOfTitles"
                                                                            ).innerHTML = `${sumOfTitles}`;
                                                                            groupOfTitlesInnerHTML = `${sumOfTitles}`;
                                                                            document.querySelector(
                                                                                "#groupOfPrices"
                                                                            ).innerText = `??????????????: ${sumOfPrices} ???`;
                                                                            // to allow to enter promo code again
                                                                            if (
                                                                                firstPassCart == 1
                                                                            ) {
                                                                                priceBeforeDiscount =
                                                                                    Number(
                                                                                        sumOfPrices
                                                                                    );
                                                                            }
                                                                            // END
                                                                            shoppingCartIcon =
                                                                                document.querySelector(
                                                                                    "#shoppingCartIcon"
                                                                                );
                                                                            shoppingCartIcon.classList.add(
                                                                                "cartAnimationDel"
                                                                            );
                                                                            setTimeout(() => {
                                                                                shoppingCartIcon.classList.remove(
                                                                                    "cartAnimationDel"
                                                                                );
                                                                            }, 100);
                                                                            // END
                                                                        }
                                                                    );
                                                                }
                                                                let firstPassCart = 0;
                                                                let thereIsApastDiscount = false;
                                                                let beforeDiscount;
                                                                let priceBeforeDiscount = 0;
                                                                let theCurrentDiscount;
                                                                let fullPrice;

                                                                document
                                                                    .querySelectorAll(
                                                                        ".submitCode"
                                                                    )[0]
                                                                    .addEventListener(
                                                                        "click",
                                                                        () => {
                                                                            if (
                                                                                data2[
                                                                                    `${Object.keys(
                                data2
                              )[0]
                              }`
                                                                                ] == null
                                                                            ) {
                                                                                alert(
                                                                                    "?????????????? ?????? ???????????? ?????? ???????????? ??????"
                                                                                );
                                                                                return;
                                                                            }
                                                                            firstPassCart = 1;
                                                                            let totalPrice =
                                                                                document
                                                                                .querySelector(
                                                                                    "#groupOfPrices"
                                                                                )
                                                                                .innerText.split(
                                                                                    ": "
                                                                                )[1]
                                                                                .split(" ")[0];
                                                                            for (
                                                                                let i = 0; i <
                                                                                Object.keys(data2)
                                                                                .length; i++
                                                                            ) {
                                                                                if (
                                                                                    document.querySelector(
                                                                                        "#discount"
                                                                                    ).value ==
                                                                                    data2[
                                                                                        `${Object.keys(
                                    data2
                                  )[i]
                                  }`
                                                                                    ].code
                                                                                ) {
                                                                                    if (
                                                                                        isNaN(
                                                                                            Number(
                                                                                                document
                                                                                                .querySelector(
                                                                                                    "#groupOfPrices"
                                                                                                )
                                                                                                .innerText.split(
                                                                                                    ": "
                                                                                                )[1]
                                                                                                .split(
                                                                                                    " "
                                                                                                )[0]
                                                                                            )
                                                                                        ) == true
                                                                                    ) {
                                                                                        break;
                                                                                    }
                                                                                    theCurrentDiscount =
                                                                                        data2[
                                                                                            `${Object.keys(
                                      data2
                                    )[i]
                                    }`
                                                                                        ].code;
                                                                                    if (
                                                                                        beforeDiscount ==
                                                                                        data2[
                                                                                            `${Object.keys(
                                      data2
                                    )[i]
                                    }`
                                                                                        ].code
                                                                                    ) {
                                                                                        thereIsApastDiscount = true;
                                                                                        break;
                                                                                    }
                                                                                    beforeDiscount =
                                                                                        data2[
                                                                                            `${Object.keys(
                                      data2
                                    )[i]
                                    }`
                                                                                        ].code;
                                                                                    if (
                                                                                        thereIsApastDiscount ==
                                                                                        true
                                                                                    ) {
                                                                                        if (
                                                                                            isNaN(priceBeforeDiscount) ==
                                                                                            false &&
                                                                                            priceBeforeDiscount !=
                                                                                            undefined &&
                                                                                            priceBeforeDiscount >
                                                                                            0
                                                                                        ) {
                                                                                            totalPrice =
                                                                                                priceBeforeDiscount;
                                                                                        }
                                                                                    } else {
                                                                                        priceBeforeDiscount =
                                                                                            totalPrice;
                                                                                    }
                                                                                    fullPrice =
                                                                                        Number(
                                                                                            totalPrice
                                                                                        );
                                                                                    totalPrice =
                                                                                        fullPrice -
                                                                                        Number(
                                                                                            totalPrice
                                                                                        ) *
                                                                                        data2[
                                                                                            `${Object.keys(
                                      data2
                                    )[
                                    i
                                    ]
                                    }`
                                                                                        ].amount;
                                                                                    document.querySelector(
                                                                                        "#groupOfPrices"
                                                                                    ).innerHTML = `??????????????: ${totalPrice} ???<br><small style='font-size: small; color: red; text-decoration: line-through;'>??????????????: ${priceBeforeDiscount}???</small>`;

                                                                                    dontAcceptOtherDiscount = 1;
                                                                                    document
                                                                                        .querySelectorAll(
                                                                                            ".submitCode"
                                                                                        )[0]
                                                                                        .classList.add(
                                                                                            "submitCodeDisabled"
                                                                                        );
                                                                                    document
                                                                                        .querySelectorAll(
                                                                                            ".submitCode"
                                                                                        )[0]
                                                                                        .classList.remove(
                                                                                            "submitCodeEnabled"
                                                                                        );
                                                                                    break;
                                                                                } else if (
                                                                                    document.querySelector(
                                                                                        "#discount"
                                                                                    ).value == ""
                                                                                ) {
                                                                                    break;
                                                                                } else if (
                                                                                    i ==
                                                                                    Object.keys(
                                                                                        data2
                                                                                    ).length -
                                                                                    1
                                                                                ) {
                                                                                    let totalPrice =
                                                                                        document
                                                                                        .querySelector(
                                                                                            "#groupOfPrices"
                                                                                        )
                                                                                        .innerText.split(
                                                                                            ": "
                                                                                        )[1]
                                                                                        .split(
                                                                                            " "
                                                                                        )[0];
                                                                                    beforeDiscount =
                                                                                        undefined;
                                                                                    if (
                                                                                        isNaN(priceBeforeDiscount) ==
                                                                                        false &&
                                                                                        priceBeforeDiscount !=
                                                                                        undefined &&
                                                                                        Number(
                                                                                            priceBeforeDiscount
                                                                                        ) > 0
                                                                                    ) {
                                                                                        totalPrice =
                                                                                            Number(
                                                                                                priceBeforeDiscount
                                                                                            );
                                                                                    }

                                                                                    document.querySelector(
                                                                                        "#groupOfPrices"
                                                                                    ).innerText = `??????????????: ${totalPrice} ???`;
                                                                                    alert(
                                                                                        "?????????????? ?????? ???????????? ?????? ???????????? ??????"
                                                                                    );
                                                                                    document
                                                                                        .querySelectorAll(
                                                                                            ".submitCode"
                                                                                        )[0]
                                                                                        .classList.remove(
                                                                                            "submitCodeDisabled"
                                                                                        );
                                                                                    document
                                                                                        .querySelectorAll(
                                                                                            ".submitCode"
                                                                                        )[0]
                                                                                        .classList.add(
                                                                                            "submitCodeEnabled"
                                                                                        );
                                                                                }
                                                                            }
                                                                        }
                                                                    );
                                                                let bill;
                                                                document
                                                                    .querySelector(
                                                                        "#sendToWhatsApp"
                                                                    )
                                                                    .addEventListener(
                                                                        "click",
                                                                        () => {
                                                                            let restDiscountMsg;

                                                                            let titles;
                                                                            let prices;
                                                                            let personalInfoOutput =
                                                                                "";
                                                                            const personalInfo = {};
                                                                            if (
                                                                                theCurrentDiscount ==
                                                                                undefined ||
                                                                                theCurrentDiscount ==
                                                                                ""
                                                                            ) {
                                                                                restDiscountMsg =
                                                                                    "???? ???????? ??????????";
                                                                                priceBeforeDiscount =
                                                                                    "???? ???????? ??????";
                                                                            } else {
                                                                                priceBeforeDiscount =
                                                                                    priceBeforeDiscount +
                                                                                    "???";
                                                                                restDiscountMsg =
                                                                                    theCurrentDiscount;
                                                                            }

                                                                            let date;
                                                                            if (
                                                                                document.querySelector(
                                                                                    "#personalInfoTime"
                                                                                ).innerText != "" ||
                                                                                document.querySelector(
                                                                                    "#personalInfoTime"
                                                                                ).innerText !=
                                                                                null ||
                                                                                document.querySelector(
                                                                                    "#personalInfoTime"
                                                                                ).innerText !=
                                                                                undefined
                                                                            ) {
                                                                                date = formatTheDate(
                                                                                    new Date(
                                                                                        document.querySelector(
                                                                                            "#personalInfoTime"
                                                                                        ).value
                                                                                    )
                                                                                );
                                                                            }

                                                                            let discount =
                                                                                "?????????? ??????????: " +
                                                                                restDiscountMsg;
                                                                            titles =
                                                                                `${groupOfTitlesInnerHTML}`.replace(
                                                                                    /\s/gi,
                                                                                    "%20"
                                                                                );
                                                                            titles = titles.replace(
                                                                                /<br>/gi,
                                                                                "%0a"
                                                                            );
                                                                            titles = titles.replace(
                                                                                /<b>/gi,
                                                                                "*"
                                                                            );
                                                                            titles = titles.replace(
                                                                                /<\/b>/gi,
                                                                                "*"
                                                                            );

                                                                            // eslint-disable-next-line prefer-const
                                                                            prices = `~?????? ??????????: ${priceBeforeDiscount}~%0a*${document
                              .querySelector(
                                "#groupOfPrices"
                              )
                              .innerText.split(
                                "\n"
                              )[0]
                              .replace(
                                /\s/gi,
                                "%20"
                              )}*`;

                                                                            personalInfo.name =
                                                                                document
                                                                                .querySelector(
                                                                                    "#personalInfoName"
                                                                                )
                                                                                .value.replace(
                                                                                    /\s/gi,
                                                                                    "%20"
                                                                                );
                                                                            personalInfo.numb =
                                                                                document
                                                                                .querySelector(
                                                                                    "#personalInfoNumb"
                                                                                )
                                                                                .value.replace(
                                                                                    /\s/gi,
                                                                                    "%20"
                                                                                );
                                                                            personalInfo.addr =
                                                                                document
                                                                                .querySelector(
                                                                                    "#personalInfoAddr"
                                                                                )
                                                                                .value.replace(
                                                                                    /\s/gi,
                                                                                    "%20"
                                                                                );

                                                                            // const datearray =
                                                                            //     date.split("-");
                                                                            // // ['yyyy', 'M', 'dThh:mm']
                                                                            // datearray[3] =
                                                                            //     datearray[2].split(
                                                                            //         "T"
                                                                            //     );
                                                                            // // ['yyyy', 'M', 'dThh:mm', ['d', 'hh:mm'] ]
                                                                            // datearray[2] =
                                                                            //     datearray[3][0];
                                                                            // // ['yyyy', 'M', 'd', ['d', 'hh:mm']]
                                                                            // datearray[3] =
                                                                            //     datearray[3][1];
                                                                            // // ['yyyy', 'M', 'd', 'hh:mm']
                                                                            // datearray[4] =
                                                                            //     datearray[3].split(
                                                                            //         ":"
                                                                            //     );
                                                                            // // ['yyyy', 'M', 'd', 'hh:mm',['hh','mm']]
                                                                            // datearray[3] =
                                                                            //     datearray[4][0];
                                                                            // // ['yyyy', 'M', 'd', 'hh',['hh','mm']]
                                                                            // datearray[4] =
                                                                            //     datearray[4][1];
                                                                            // // ['yyyy', 'M', 'd', 'hh','mm']

                                                                            // const ampm =
                                                                            //     datearray[3] >= 12 ?
                                                                            //     "??" :
                                                                            //     "??";
                                                                            // datearray[3] =
                                                                            //     datearray[3] % 12;
                                                                            // datearray[3] =
                                                                            //     datearray[3] || 12;
                                                                            // datearray[3] =
                                                                            //     datearray[3] < 10 ?
                                                                            //     "0" +
                                                                            //     datearray[3] :
                                                                            //     datearray[3];
                                                                            // // xx datearray[1] = datearray[1] < 10 ? '0' + datearray[1] : datearray[1]
                                                                            // datearray[2] =
                                                                            //     datearray[2] < 10 ?
                                                                            //     "0" +
                                                                            //     datearray[2] :
                                                                            //     datearray[2];
                                                                            // // xx datearray[4] = datearray[4] < 10 ? '0' + datearray[4] : datearray[4]

                                                                            personalInfo.time = `${"?????? ????????????????: " + `${date}`
                              //  `${datearray[0]}/${datearray[1]}/${datearray[2]}, ${datearray[3]}:${datearray[4]}${ampm}`
                              }`.replace(
                                /\s/gi,
                                "%20"
                              );
                            if (
                              personalInfo.name ==
                              "" ||
                              personalInfo.numb ==
                              "" ||
                              personalInfo.addr ==
                              "" ||
                              personalInfo.time ==
                              ""
                            ) {
                              alert(
                                "???????????? ?????????? ???? ???????????????? ??????????????"
                              );
                              return;
                            }
                            for (
                              let i = 0;
                              i <
                              Object.keys(
                                personalInfo
                              ).length;
                              i++
                            ) {
                              personalInfoOutput =
                                personalInfoOutput.concat(
                                  personalInfo[
                                  `${Object.keys(
                                    personalInfo
                                  )[i]
                                  }`
                                  ] + "%0a"
                                );
                            }

                            discount =
                              discount.replace(
                                /\s/gi,
                                "%20"
                              );

                            bill =
                              `???????????? ???????? ${data3.storeName}` +
                              "%0a%0a" +
                              "?????????????? ????????????:" +
                              "%0a" +
                              personalInfoOutput +
                              "%0a%0a" +
                              "?????????????? ????????????????:" +
                              "%0a" +
                              titles +
                              "%0a%0a" +
                              discount +
                              "%0a" +
                              prices +
                              "%0a%0a%0a" +
                              `${data5.billDetails}`;

                            if (
                              Number(
                                document
                                  .querySelector(
                                    "#groupOfPrices"
                                  )
                                  .innerText.split(
                                    ": "
                                  )[1]
                                  .split(
                                    " "
                                  )[0]
                              ) == 0 ||
                              isNaN(
                                Number(
                                  document
                                    .querySelector(
                                      "#groupOfPrices"
                                    )
                                    .innerText.split(
                                      ": "
                                    )[1]
                                    .split(
                                      " "
                                    )[0]
                                )
                              ) == true
                            ) {
                              alert(
                                "?????? ???? ???????? ???? ???????? ???????????? \n???? ???????? ???????? ???????????? ???????? ???? 0??? ???????????? ??????????????"
                              );
                              return;
                            }

                            location.assign(
                              `https://wa.me/${phoneNum}?text=${bill}`
                            );
                          }
                        );
                    })
                    .catch((error) => {
                      alert(
                        `???????? ?????????? ???? ?????????????? ???? ????????????????\n???????? ???????????? ???? ?????? ?????????? ?????? ???????????? ???????????????? ?????????? ???? ???????????? ???? ???????? ????????????. \n\n ErrMsg: ${error}\n ErrCode: 510\n err-fetch-main: billDetails\n ??????????????: ${formatTheDate(
                          new Date()
                        )}`
                      );
                    });
                })
                .catch((error) => {
                  alert(
                    `???????? ?????????? ???? ?????????????? ???? ????????????????\n???????? ???????????? ???? ?????? ?????????? ?????? ???????????? ???????????????? ?????????? ???? ???????????? ???? ???????? ????????????. \n\n ErrMsg: ${error}\n ErrCode: 506\n err-fetch-main: storeNum\n ??????????????: ${formatTheDate(
                      new Date()
                    )}`
                  );
                });
            })
            .catch((error) => {
              alert(
                `???????? ?????????? ???? ?????????????? ???? ????????????????\n???????? ???????????? ???? ?????? ?????????? ?????? ???????????? ???????????????? ?????????? ???? ???????????? ???? ???????? ????????????. \n\n ErrMsg: ${error}\n ErrCode: 507\n err-fetch-main: storeName\n ??????????????: ${formatTheDate(
                  new Date()
                )}`
              );
            });
        })
        .catch((error) => {
          alert(
            `???????? ?????????? ???? ?????????????? ???? ????????????????\n???????? ???????????? ???? ?????? ?????????? ?????? ???????????? ???????????????? ?????????? ???? ???????????? ???? ???????? ????????????. \n\n ErrMsg: ${error}\n ErrCode: 508\n err-fetch-main: promocodes\n ??????????????: ${formatTheDate(
              new Date()
            )}`
          );
        });
    })
    .catch((error) => {
      alert(
        `???????? ?????????? ???? ?????????????? ???? ????????????????\n???????? ???????????? ???? ?????? ?????????? ?????? ???????????? ???????????????? ?????????? ???? ???????????? ???? ???????? ????????????. \n\n ErrMsg: ${error}\n ErrCode: 509\n err-fetch-main: products\n ??????????????: ${formatTheDate(
          new Date()
        )}`
      );
    });
}

firstFetch();

function formatTheDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "??" : "??";
  hours = hours % 12;
  hours = hours || 12;
  const year = date.getFullYear();
  let month = date.getMonth();
  month = Number(month) + 1 < 10 ? "0" + (Number(month) + 1) : Number(month) + 1;
  let day = date.getDate();
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  day = day < 10 ? "0" + day : day;
  const strTime =
    year + "/" + month + "/" + day + ", " + hours + ":" + minutes + ampm;
  return strTime;
}

let i = 0;
const loading = setInterval(() => {
  if (i < 3) i++;
  else i = 0;
  document.querySelector("#storeName").innerText = `?????? ??????????????${".".repeat(
    i
  )}`;
}, 500);

const convertTitleToImg = (listOftitles, dict) => {
  const listofIds = [];
  listOftitles.forEach((title) => {
    for (let i = 0; i < Object.keys(dict).length; i++) {
      if (title == dict[Object.keys(dict)[i]].title) { listofIds.push(dict[Object.keys(dict)[i]].img); };
    }
  });

  return listofIds;
};