/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */
/* eslint-disable operator-linebreak */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable brace-style */
/* eslint-disable no-redeclare */
/* eslint-disable no-var */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */

/// / theme related
fetch("/storeTheme/show", {
        method: "GET"
    })
    .then((responseTheme) => {
        return responseTheme.json();
    })
    .then((responseJson) => {
        if (
            responseJson.storeTheme == "none/لايوجد" ||
            responseJson.storeTheme == "originalTheme"
        ) {
            originalTheme.className = "circleTheme-selected";
        } else if (responseJson.storeTheme == "greenTheme") {
            greenTheme.className = "circleTheme-selected";
        } else if (responseJson.storeTheme == "blueTheme") {
            blueTheme.className = "circleTheme-selected";
        } else if (responseJson.storeTheme == "redTheme") {
            redTheme.className = "circleTheme-selected";
        } else if (responseJson.storeTheme == "greyTheme") {
            greyTheme.className = "circleTheme-selected";
        } else if (responseJson.storeTheme == "pinkTheme") {
            pinkTheme.className = "circleTheme-selected";
        } else if (responseJson.storeTheme == "blackTheme") {
            blackTheme.className = "circleTheme-selected";
        } else {
            originalTheme.className = "circleTheme-selected";
        }
    })
    .catch((error) => {
        alert(
            `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 505\n err-fetch-admin: storetheme\n التاريخ: ${formatTheDate(
                new Date(), 1//
            )}`
        );
    });

const themeBtns = document.querySelectorAll("div.circleTheme");
for (var i = 0; i < themeBtns.length; i++) {
    themeBtns[i].onclick = function() {
        for (let i = 0; i < themesContainer.childNodes.length; i++) {
            themesContainer.childNodes[i].className = "circleTheme";
        }

        console.log(this.id);

        fetch("/storeTheme/show", {
                method: "GET"
            })
            .then((responseTheme) => {
                return responseTheme.json();
            })
            .then((responseJson) => {
                let method;
                if (responseJson.storeTheme == "none/لايوجد") {
                    method = "POST";
                } else {
                    method = "PUT";
                }

                fetch("/storeTheme", {
                        headers: {
                            Method: `${method}`,
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        },
                        method: `${method}`,
                        body: JSON.stringify({
                            storeTheme: this.id
                        })
                    })
                    .then((response) => {
                        return response.json();
                    })
                    .then((responseJson) => {
                        if (responseJson.statCode == 403) {
                            alert(
                                "حدث خطأ في " +
                                method +
                                ". \n\n ErrCode: 403-admin"
                            );
                            return;
                        }
                        if (responseJson.statCode == 429) {
                            alert(
                                "لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429-admin"
                            );
                            return;
                        }
                        fetch("/storeTheme/show", {
                                method: "GET"
                            })
                            .then((responseTheme) => {
                                return responseTheme.json();
                            })
                            .then((responseJson) => {
                                if (
                                    responseJson.storeTheme == "none/لايوجد" ||
                                    responseJson.storeTheme == "originalTheme"
                                ) {
                                    originalTheme.className =
                                        "circleTheme-selected";
                                } else if (
                                    responseJson.storeTheme == "greenTheme"
                                ) {
                                    greenTheme.className =
                                        "circleTheme-selected";
                                } else if (
                                    responseJson.storeTheme == "blueTheme"
                                ) {
                                    blueTheme.className = "circleTheme-selected";
                                } else if (
                                    responseJson.storeTheme == "redTheme"
                                ) {
                                    redTheme.className = "circleTheme-selected";
                                } else if (
                                    responseJson.storeTheme == "greyTheme"
                                ) {
                                    greyTheme.className = "circleTheme-selected";
                                } else if (
                                    responseJson.storeTheme == "pinkTheme"
                                ) {
                                    pinkTheme.className = "circleTheme-selected";
                                } else if (
                                    responseJson.storeTheme == "blackTheme"
                                ) {
                                    blackTheme.className = "circleTheme-selected";
                                } else {
                                    originalTheme.className =
                                        "circleTheme-selected";
                                }
                            })
                            .catch((error) => {
                                alert(
                                    `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 506\n err-fetch-admin: storetheme\n التاريخ: ${formatTheDate(
                                        new Date(), 1//
                                    )}`
                                );
                            });
                        fetchThemes();
                    })
                    .catch((error) => {
                        alert(
                            `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 507\n err-fetch-admin: storetheme\n التاريخ: ${formatTheDate(
                                new Date(), 1//
                            )}`
                        );
                    });
            })
            .catch((error) => {
                alert(
                    `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 508\n err-fetch-admin: storetheme\n التاريخ: ${formatTheDate(
                        new Date(), 1//
                    )}`
                );
            });
    };
}

/// expand or Narrow related

function expOrNarProduct(expOrNarProductKey) {
    if (expOrNarProductKey == 1) {
        document.querySelector("#productsList").style.height = "100%";
        document.querySelector("#productsList").style.overflow = "auto";
        productsList.childNodes[productsList.childNodes.length - 1].innerHTML =
            "<div class=\"expOrNar\" id=\"expOrNarProduct\" onclick=\"expOrNarProduct(0)\" style=\"cursor: pointer; display: flex; justify-content: center; font-size: 20px\">اضغط لإخفاء المنتجات &nbsp;  <i class=\"fas fa-angle-up\"></i></div>";
        productsList.childNodes[0].innerHTML = "";
    } else {
        document.querySelector("#productsList").style.height = "30px";
        document.querySelector("#productsList").style.overflow = "hidden";
        productsList.childNodes[0].innerHTML =
            "<div id=\"expOrNarProduct\" onclick=\"expOrNarProduct(1)\" style=\"cursor: pointer; display: flex; justify-content: center; font-size: 20px\">اضغط لإظهار المنتجات &nbsp; <i class=\"fas fa-angle-down\"></i></div>";
    }
}

function expOrNarPromo(expOrNarPromoKey) {
    if (expOrNarPromoKey == 1) {
        document.querySelector("#codesList").style.height = "100%";
        document.querySelector("#codesList").style.overflow = "auto";
        codesList.childNodes[codesList.childNodes.length - 1].innerHTML =
            "<div class=\"expOrNar\" id=\"expOrNarPromo\" onclick=\"expOrNarPromo(0)\" style=\"cursor: pointer; display: flex; justify-content: center; font-size: 20px\">اضغط لإخفاء القسائم &nbsp;  <i class=\"fas fa-angle-up\"></i></div>";
        codesList.childNodes[0].innerHTML = "";
    } else {
        document.querySelector("#codesList").style.height = "30px";
        document.querySelector("#codesList").style.overflow = "hidden";
        codesList.childNodes[0].innerHTML =
            "<div id=\"expOrNarPromo\" onclick=\"expOrNarPromo(1)\" style=\"cursor: pointer; display: flex; justify-content: center; font-size: 20px\">اضغط لإظهار القسائم &nbsp;  <i class=\"fas fa-angle-down\"></i></div>";
    }
}

function expOrNarBillHis(expOrNarBillHisKey) {
    if (expOrNarBillHisKey == 1) {
        document.querySelector("#billsList").style.height = "100%";
        document.querySelector("#billsList").style.overflow = "auto";
        billsList.childNodes[billsList.childNodes.length - 1].innerHTML =
            "<div class=\"expOrNar\" id=\"expOrNarBillHis\" onclick=\"expOrNarBillHis(0)\" style=\"cursor: pointer; display: flex; justify-content: center; font-size: 20px\">اضغط لإخفاء الفواتير &nbsp;  <i class=\"fas fa-angle-up\"></i></div>";
        billsList.childNodes[0].innerHTML = "";
    } else {
        document.querySelector("#billsList").style.height = "30px";
        document.querySelector("#billsList").style.overflow = "hidden";
        billsList.childNodes[0].innerHTML =
            "<div id=\"expOrNarBillHis\" onclick=\"expOrNarBillHis(1)\" style=\"cursor: pointer; display: flex; justify-content: center; font-size: 20px\">اضغط لإظهار الفواتير &nbsp;  <i class=\"fas fa-angle-down\"></i></div>";
    }
}

function expOrNarInfo(expOrNarInfoKey) {
    if (expOrNarInfoKey == 1) {
        document.querySelector("#infoList").style.height = "100%";
        document.querySelector("#infoList").style.overflow = "auto";
        document.querySelector("#pressToShowInfoBtn").style.display = "none";
        document.querySelector("#pressToHideInfoBtn").style.display = "block";
    } else {
        document.querySelector("#infoList").style.height = "30px";
        document.querySelector("#infoList").style.overflow = "hidden";
        document.querySelector("#pressToShowInfoBtn").style.display = "block";
        document.querySelector("#pressToHideInfoBtn").style.display = "none";
    }
}

function deleteOrEditPromo(id, opration) {
    if (opration == "edit") {
        document.querySelector("#codeExpPara").style.display = "none";
        // show btn
        document.querySelector("#addCode").style.display = "none";
        document.querySelector("#updCode").style.display = "block";
        document.querySelector("#delCode").style.display = "none";
        // fill input
        document.querySelector(
            "#promoModalLongTitle"
        ).innerHTML = `تعديل القسيمة رقم ${id}`;
        document.querySelector("#codeID").value = `${id}`;
        document.querySelector("#codeName").value = `${listOfPromos[id].code}`;
        document.querySelector("#codeAmount").value = `${listOfPromos[id].amount * 100}`;
        if (listOfPromos[id].exp == "9999-09-09") document.querySelector("#codeExp").value = "";
        else document.querySelector("#codeExp").value = `${listOfPromos[id].exp + "T00:00"}`;
        // disable input
        document.querySelector("#codeID").disabled = true;
        document.querySelector("#codeName").disabled = false;
        document.querySelector("#codeAmount").disabled = false;
        document.querySelector("#codeExp").disabled = false;
    } else if (opration == "delete") {
        document.querySelector("#codeExpPara").style.display = "none";
        // show btn
        document.querySelector("#addCode").style.display = "none";
        document.querySelector("#updCode").style.display = "none";
        document.querySelector("#delCode").style.display = "block";
        // fill input
        document.querySelector(
            "#promoModalLongTitle"
        ).innerHTML = `هل أنت متأكد من رغبتك بحذف القسيمة رقم ${id}؟`;
        document.querySelector("#codeID").value = `${id}`;
        document.querySelector("#codeName").value = `${listOfPromos[id].code}`;
        document.querySelector("#codeAmount").value = `${listOfPromos[id].amount * 100}`;
        if (listOfPromos[id].exp == "9999-09-09") document.querySelector("#codeExp").value = "";
        else document.querySelector("#codeExp").value = `${listOfPromos[id].exp + "T00:00"}`;
        // disable input
        document.querySelector("#codeID").disabled = true;
        document.querySelector("#codeName").disabled = true;
        document.querySelector("#codeAmount").disabled = true;
        document.querySelector("#codeExp").disabled = true;
    } else if (opration == "add") {
        document.querySelector("#codeExpPara").style.display = "block";
        // show btn
        document.querySelector("#addCode").style.display = "block";
        document.querySelector("#updCode").style.display = "none";
        document.querySelector("#delCode").style.display = "none";
        // fill input
        document.querySelector("#promoModalLongTitle").innerHTML = "إضافة قسيمة";
        // disable input
        document.querySelector("#codeID").disabled = false;
        document.querySelector("#codeName").disabled = false;
        document.querySelector("#codeAmount").disabled = false;
        document.querySelector("#codeExp").disabled = false;
    } else {
        alert(
            "هناك خطأ ما،  تواصل مع المطور لحل المشكلة. \n\n ErrCode: 557-admin"
        );
    }
}

function showBill(count) {
    $("#billModal").modal("show");

    document.querySelector("#delBillBtn").innerHTML = "";
    document.querySelector("#billContent").innerHTML = `
                ${(listOfBills[count].bill).replace(/%20/gi, " ")
            .replace(/\*/gi, "")
            .replace(/%0a/gi, "<br>")}
                                                       `;
    document.querySelector("#billTitle").innerHTML = `تفاصيل الفاتورة رقم ${listOfBills[count].billId}`;
}

function showBillForDel(count) {
    $("#billModal").modal("show");

    document.querySelector("#delBillBtn").innerHTML = `<a data-bs-dismiss="modal" onclick="delBill('${listOfBills[count].billId}')" class="card-link">حــذف <i class="fas fa-trash-alt"></i></a>`;
    document.querySelector("#billContent").innerHTML = `
                ${(listOfBills[count].bill).replace(/%20/gi, " ")
            .replace(/\*/gi, "")
            .replace(/%0a/gi, "<br>")}
                                                       `;
    document.querySelector("#billTitle").innerHTML = `هل أنت متأكد من حذف الفاتورة رقم ${listOfBills[count].billId}؟`;
}

function deleteOrEditProd(id, opration) {
    if (opration == "edit") {
        // show btn
        document.querySelector("#addProd").style.display = "none";
        document.querySelector("#updProd").style.display = "block";
        document.querySelector("#delProd").style.display = "none";
        // fill input
        document.querySelector(
            "#productModalLongTitle"
        ).innerHTML = `تعديل المنتج رقم ${id}`;
        document.querySelector(
            "#productImageEditModalLongTitle"
        ).innerHTML = `تعديل صورة المنتج رقم ${id}`;
        document.querySelector("#productID").value = `${id}`;
        document.querySelector(
            "#productTitle"
        ).value = `${listOfProducts[id].title}`;
        document.querySelector(
            "#productPrice"
        ).value = `${listOfProducts[id].price}`;
        document.querySelector("#productAvail").checked = listOfProducts[id].avail;
        document.querySelector(
            "#browseImg"
        ).innerHTML = `<img style="border: 1px solid #8f8d85; border-radius: 10px; width: 55px; height: 55px; margin: 0;" src="data:image/png;base64,${listOfProducts[id].img}" alt="img">`;
        document.querySelector("#browsePrevImg").innerHTML = `<img style="border: 1px solid #8f8d85; border-radius: 10px; width: 70px; height: 70px; margin: 0;" src="data:image/png;base64,${listOfProducts[id].img}" alt="img">`;
        // disable input
        document.querySelector("#productID").disabled = true;
        document.querySelector("#productTitle").disabled = false;
        document.querySelector("#productPrice").disabled = false;
        document.querySelector("#productAvail").disabled = false;
        document.querySelector("#productImg").disabled = false;
        document.querySelector("#productImgEdit").style.display = "block";
        document.querySelector("#productImg").style.display = "none";
        document.querySelector("#productImgEditBtn").style.display = "block";
    } else if (opration == "delete") {
        // show btn
        document.querySelector("#addProd").style.display = "none";
        document.querySelector("#updProd").style.display = "none";
        document.querySelector("#delProd").style.display = "block";
        // fill input
        document.querySelector(
            "#productModalLongTitle"
        ).innerHTML = `هل أنت متأكد من رغبتك بحذف المنتج رقم ${id}`;
        document.querySelector("#productID").value = `${id}`;
        document.querySelector(
            "#productTitle"
        ).value = `${listOfProducts[id].title}`;
        document.querySelector(
            "#productPrice"
        ).value = `${listOfProducts[id].price}`;
        document.querySelector("#productAvail").checked = listOfProducts[id].avail;
        document.querySelector(
            "#browseImg"
        ).innerHTML = `<img style="border: 1px solid #8f8d85 ; border-radius: 10px; width: 70px; height: 70px; margin: 0;" src="data:image/png;base64,${listOfProducts[id].img}" alt="img">`;
        // disable input
        document.querySelector("#productID").disabled = true;
        document.querySelector("#productTitle").disabled = true;
        document.querySelector("#productPrice").disabled = true;
        document.querySelector("#productAvail").disabled = true;
        document.querySelector("#productImg").disabled = true;
        document.querySelector("#productImg").style.display = "none";
        document.querySelector("#productImgEditBtn").style.display = "none";
    } else if (opration == "add") {
        // show btn
        document.querySelector("#addProd").style.display = "block";
        document.querySelector("#updProd").style.display = "none";
        document.querySelector("#delProd").style.display = "none";
        // fill input
        document.querySelector("#productModalLongTitle").innerHTML =
            "إضافة منتج";
        document.querySelector("#browseImg").innerHTML = "";
        // disable input
        document.querySelector("#productID").disabled = false;
        document.querySelector("#productTitle").disabled = false;
        document.querySelector("#productPrice").disabled = false;
        document.querySelector("#productAvail").disabled = false;
        document.querySelector("#productImg").disabled = false;
        document.querySelector("#productImg").style.display = "block";
        document.querySelector("#productImgEditBtn").style.display = "none";
    } else {
        alert(
            "هناك خطأ ما،  تواصل مع المطور لحل المشكلة. \n\n ErrCode: 558-admin"
        );
    }
}

function deleteOrEditStoreInfo(id, opration) {
    if (opration == "edit") {
        // show btn
        document.querySelector("#addInfo").style.display = "none";
        document.querySelector("#updInfo").style.display = "block";
        // fill input
        document.querySelector("#storeInfoModalLongTitle").innerHTML =
            "تعديل المعلومات";
        document.querySelector("#storeName").value = `${listOfInfo.name}`;
        document.querySelector("#storeCurr").value = `${listOfInfo.curr}`;
        const sliceNum = findHowMuchToSliceByNumber(`${listOfInfo.num}`);
        if (sliceNum != "err404") {
            document.querySelector("#storeNum").value =
                `${listOfInfo.num}`.slice(sliceNum);
            document.querySelector("#countryCodeTitle").innerText =
                `${listOfInfo.num}`.substring(0, sliceNum);
            currentCountryCodeSelected = Number(
                `${listOfInfo.num}`.substring(0, sliceNum)
            );
        } else {
            document.querySelector("#storeNum").value = "";
        }
        document.querySelector("#storeDetails").value = `${listOfInfo.details}`;
        document.querySelector("#billDetails").value = `${listOfInfo.bDetails}`;
        // disable input
    } else if (opration == "add") {
        // show btn
        document.querySelector("#addInfo").style.display = "block";
        document.querySelector("#updInfo").style.display = "none";
        // fill input
        document.querySelector("#storeInfoModalLongTitle").innerHTML =
            "إضافة المعلومات";
        // disable input
    } else {
        alert(
            "هناك خطأ ما،  تواصل مع المطور لحل المشكلة. \n\n ErrCode: 559-admin"
        );
    }
}

/// / fetches

function firstFetches() {
    fetchThemes();

    fetchStoreInfo();

    fetchProducts();

    fetchPromocodes();

    fetchBillHis();
}

function reload() {

    firstFetches();

    alert("تم تحديث بيانات الصفحة");
}


firstFetches();

function fetchThemes() {
    fetch("/storeTheme/show", {
            method: "GET"
        })
        .then((responseTheme) => {
            return responseTheme.json();
        })
        .then((responseJson) => {
            if (responseJson.storeTheme != "none/لايوجد") {
                if (responseJson.storeTheme == 'originalTheme') {
                    document.documentElement.style.setProperty(
                        '--textColor',
                        '#000000'
                    )
                    document.documentElement.style.setProperty(
                        '--body',
                        '#f0e9c9'
                    )
                    document.documentElement.style.setProperty(
                        '--borders',
                        '#8f8d85'
                    )
                    document.documentElement.style.setProperty(
                        '--btns',
                        '#f5ebbd'
                    )
                    document.documentElement.style.setProperty(
                        '--btnsHover',
                        '#bbb496'
                    )
                    document.documentElement.style.setProperty(
                        '--container',
                        '#d4cbabc0'
                    )
                    document.documentElement.style.setProperty(
                        '--containerHover',
                        '#d4cbabb0'
                    )
                    document.documentElement.style.setProperty(
                        '--h1',
                        '#c2bba1a0'
                    )
                    document.documentElement.style.setProperty(
                        '--h1OtherScreen',
                        '#c2bba1d0'
                    )
                    document.documentElement.style.setProperty(
                        '--form',
                        '#c4c1b6c0'
                    )
                    document.documentElement.style.setProperty(
                        '--formHover',
                        '#c4c1b6'
                    )
                    document.documentElement.style.setProperty(
                        '--input',
                        '#8f8d85'
                    )
                    document.documentElement.style.setProperty(
                        '--inputBG',
                        '#ffffff'
                    )
                    document.documentElement.style.setProperty(
                        '--inputHover',
                        '#aca588'
                    )
                    document.documentElement.style.setProperty(
                        '--inputFocus',
                        '#b1a883'
                    )
                    document.documentElement.style.setProperty(
                        '--webkitScrollbarTrack',
                        '#c4c1b6c0'
                    )
                    document.documentElement.style.setProperty(
                        '--modals',
                        '#c4c1b6'
                    )
                    document.documentElement.style.setProperty(
                        '--webkitScrollbarThumb',
                        '#969287'
                    )
                    document.documentElement.style.setProperty(
                        '--webkitScrollbarThumbHover',
                        '#797464'
                    )
                    document.documentElement.style.setProperty(
                        '--infoCard',
                        '#d4cbaba8'
                    )
                } else if (responseJson.storeTheme == 'blueTheme') {
                    document.documentElement.style.setProperty(
                        '--textColor',
                        '#000000'
                    )
                    document.documentElement.style.setProperty(
                        '--body',
                        '#c9cbf0'
                    )
                    document.documentElement.style.setProperty(
                        '--borders',
                        '#85868f'
                    )
                    document.documentElement.style.setProperty(
                        '--btns',
                        '#bdbef5'
                    )
                    document.documentElement.style.setProperty(
                        '--btnsHover',
                        '#8987ba'
                    )
                    document.documentElement.style.setProperty(
                        '--container',
                        '#4169E1c0'
                    )
                    document.documentElement.style.setProperty(
                        '--containerHover',
                        '#4169E1b0'
                    )
                    document.documentElement.style.setProperty(
                        '--h1',
                        '#a3a1c2a0'
                    )
                    document.documentElement.style.setProperty(
                        '--h1OtherScreen',
                        '#a3a1c2d0'
                    )
                    document.documentElement.style.setProperty(
                        '--form',
                        '#9696c1c0'
                    )
                    document.documentElement.style.setProperty(
                        '--formHover',
                        '#9696c1'
                    )
                    document.documentElement.style.setProperty(
                        '--input',
                        '#85858f'
                    )
                    document.documentElement.style.setProperty(
                        '--inputBG',
                        '#ffffff'
                    )
                    document.documentElement.style.setProperty(
                        '--inputHover',
                        '#8889ac'
                    )
                    document.documentElement.style.setProperty(
                        '--inputFocus',
                        '#8783b1'
                    )
                    document.documentElement.style.setProperty(
                        '--webkitScrollbarTrack',
                        '#b6b6c4c0'
                    )
                    document.documentElement.style.setProperty(
                        '--modals',
                        '#b6b6c4'
                    )
                    document.documentElement.style.setProperty(
                        '--webkitScrollbarThumb',
                        '#878796'
                    )
                    document.documentElement.style.setProperty(
                        '--webkitScrollbarThumbHover',
                        '#646579'
                    )
                    document.documentElement.style.setProperty(
                        '--infoCard',
                        '#abaed4a8'
                    )
                } else if (responseJson.storeTheme == 'greenTheme') {
                    document.documentElement.style.setProperty(
                        '--textColor',
                        '#000000'
                    )
                    document.documentElement.style.setProperty(
                        '--body',
                        '#c9f0cb'
                    )
                    document.documentElement.style.setProperty(
                        '--borders',
                        '#858f86'
                    )
                    document.documentElement.style.setProperty(
                        '--btns',
                        '#bdf5be'
                    )
                    document.documentElement.style.setProperty(
                        '--btnsHover',
                        '#96bb9a'
                    )
                    document.documentElement.style.setProperty(
                        '--container',
                        '#1e796bc0'
                    )
                    document.documentElement.style.setProperty(
                        '--containerHover',
                        '#1e796bb0'
                    )
                    document.documentElement.style.setProperty(
                        '--h1',
                        '#a1c2a3a0'
                    )
                    document.documentElement.style.setProperty(
                        '--h1OtherScreen',
                        '#a1c2a3d0'
                    )
                    document.documentElement.style.setProperty(
                        '--form',
                        '#b6c4b7c0'
                    )
                    document.documentElement.style.setProperty(
                        '--formHover',
                        '#b6c4b8'
                    )
                    document.documentElement.style.setProperty(
                        '--input',
                        '#858f85'
                    )
                    document.documentElement.style.setProperty(
                        '--inputBG',
                        '#ffffff'
                    )
                    document.documentElement.style.setProperty(
                        '--inputHover',
                        '#88ac8b'
                    )
                    document.documentElement.style.setProperty(
                        '--inputFocus',
                        '#83b185'
                    )
                    document.documentElement.style.setProperty(
                        '--webkitScrollbarTrack',
                        '#b6c4b8c0'
                    )
                    document.documentElement.style.setProperty(
                        '--modals',
                        '#b6c4b8'
                    )
                    document.documentElement.style.setProperty(
                        '--webkitScrollbarThumb',
                        '#879687'
                    )
                    document.documentElement.style.setProperty(
                        '--webkitScrollbarThumbHover',
                        '#647965'
                    )
                    document.documentElement.style.setProperty(
                        '--infoCard',
                        '#abd4b0a8'
                    )
                } else if (responseJson.storeTheme == 'redTheme') {
                    document.documentElement.style.setProperty(
                        '--textColor',
                        '#000000'
                    )
                    document.documentElement.style.setProperty(
                        '--body',
                        '#f0c9c9'
                    )
                    document.documentElement.style.setProperty(
                        '--borders',
                        '#8f8585'
                    )
                    document.documentElement.style.setProperty(
                        '--btns',
                        '#f5bdbd'
                    )
                    document.documentElement.style.setProperty(
                        '--btnsHover',
                        '#bb9696'
                    )
                    document.documentElement.style.setProperty(
                        '--container',
                        '#ad5a54c0'
                    )
                    document.documentElement.style.setProperty(
                        '--containerHover',
                        '#ad5a54b0'
                    )
                    document.documentElement.style.setProperty(
                        '--h1',
                        '#c2a1a1a0'
                    )
                    document.documentElement.style.setProperty(
                        '--h1OtherScreen',
                        '#c2a1a1d0'
                    )
                    document.documentElement.style.setProperty(
                        '--form',
                        '#c4b6b6c0'
                    )
                    document.documentElement.style.setProperty(
                        '--formHover',
                        '#c4b6b6'
                    )
                    document.documentElement.style.setProperty(
                        '--input',
                        '#8f8585'
                    )
                    document.documentElement.style.setProperty(
                        '--inputBG',
                        '#ffffff'
                    )
                    document.documentElement.style.setProperty(
                        '--inputHover',
                        '#ac8888'
                    )
                    document.documentElement.style.setProperty(
                        '--inputFocus',
                        '#b18383'
                    )
                    document.documentElement.style.setProperty(
                        '--webkitScrollbarTrack',
                        '#c4b6b6c0'
                    )
                    document.documentElement.style.setProperty(
                        '--modals',
                        '#c4b6b6'
                    )
                    document.documentElement.style.setProperty(
                        '--webkitScrollbarThumb',
                        '#968787'
                    )
                    document.documentElement.style.setProperty(
                        '--webkitScrollbarThumbHover',
                        '#796464'
                    )
                    document.documentElement.style.setProperty(
                        '--infoCard',
                        '#d4ababa8'
                    )
                } else if (responseJson.storeTheme == 'pinkTheme') {
                    document.documentElement.style.setProperty(
                        '--textColor',
                        '#000000'
                    )
                    document.documentElement.style.setProperty(
                        '--body',
                        '#efc9f0'
                    )
                    document.documentElement.style.setProperty(
                        '--borders',
                        '#8f858f'
                    )
                    document.documentElement.style.setProperty(
                        '--btns',
                        '#f3bdf5'
                    )
                    document.documentElement.style.setProperty(
                        '--btnsHover',
                        '#bb96bb'
                    )
                    document.documentElement.style.setProperty(
                        '--container',
                        '#ad5498c0'
                    )
                    document.documentElement.style.setProperty(
                        '--containerHover',
                        '#ad5498b0'
                    )
                    document.documentElement.style.setProperty(
                        '--h1',
                        '#c2a1b5d0'
                    )
                    document.documentElement.style.setProperty(
                        '--h1OtherScreen',
                        '#c4b6c2c0'
                    )
                    document.documentElement.style.setProperty(
                        '--form',
                        '#c4b6c4'
                    )
                    document.documentElement.style.setProperty(
                        '--formHover',
                        '#c4b6c4'
                    )
                    document.documentElement.style.setProperty(
                        '--input',
                        '#8f858f'
                    )
                    document.documentElement.style.setProperty(
                        '--inputBG',
                        '#ffffff'
                    )
                    document.documentElement.style.setProperty(
                        '--inputHover',
                        '#ac88a9'
                    )
                    document.documentElement.style.setProperty(
                        '--inputFocus',
                        '#b183aa'
                    )
                    document.documentElement.style.setProperty(
                        '--webkitScrollbarTrack',
                        '#c4b6c1c0'
                    )
                    document.documentElement.style.setProperty(
                        '--modals',
                        '#c4b6c1'
                    )
                    document.documentElement.style.setProperty(
                        '--webkitScrollbarThumb',
                        '#968795'
                    )
                    document.documentElement.style.setProperty(
                        '--webkitScrollbarThumbHover',
                        '#796478'
                    )
                    document.documentElement.style.setProperty(
                        '--infoCard',
                        '#d4abcaa8'
                    )
                } else if (responseJson.storeTheme == 'blackTheme') {
                    document.documentElement.style.setProperty(
                        '--textColor',
                        '#ffffff'
                    )
                    document.documentElement.style.setProperty(
                        '--body',
                        '#212121'
                    )
                    document.documentElement.style.setProperty(
                        '--borders',
                        '#c4c4c4'
                    )
                    document.documentElement.style.setProperty(
                        '--btns',
                        '#0d0d0d'
                    )
                    document.documentElement.style.setProperty(
                        '--btnsHover',
                        '#262626'
                    )
                    document.documentElement.style.setProperty(
                        '--container',
                        '#1e1e1ec0'
                    )
                    document.documentElement.style.setProperty(
                        '--containerHover',
                        '#292929b0'
                    )
                    document.documentElement.style.setProperty(
                        '--h1',
                        '#b9b9b9a0'
                    )
                    document.documentElement.style.setProperty(
                        '--h1OtherScreen',
                        '#2d2d2dd0'
                    )
                    document.documentElement.style.setProperty(
                        '--form',
                        '#2d2d2dc0'
                    )
                    document.documentElement.style.setProperty(
                        '--formHover',
                        '#3b3b3b'
                    )
                    document.documentElement.style.setProperty(
                        '--input',
                        '#4e4e4e'
                    )
                    document.documentElement.style.setProperty(
                        '--inputHover',
                        '#3c3c3c'
                    )
                    document.documentElement.style.setProperty(
                        '--inputBG',
                        '#000000'
                    )
                    document.documentElement.style.setProperty(
                        '--inputFocus',
                        '#4f4f4f'
                    )
                    document.documentElement.style.setProperty(
                        '--webkitScrollbarTrack',
                        '#c3c3c3c0'
                    )
                    document.documentElement.style.setProperty(
                        '--modals',
                        '#252525'
                    )
                    document.documentElement.style.setProperty(
                        '--webkitScrollbarThumb',
                        '#bababa'
                    )
                    document.documentElement.style.setProperty(
                        '--webkitScrollbarThumbHover',
                        '#595959'
                    )
                    document.documentElement.style.setProperty(
                        '--infoCard',
                        '#6f6f6fa8'
                    )
                } else {
                    document.documentElement.style.setProperty(
                        '--textColor',
                        '#000000'
                    )
                    document.documentElement.style.setProperty(
                        '--body',
                        '#bbc0c6'
                    )
                    document.documentElement.style.setProperty(
                        '--borders',
                        '#888888'
                    )
                    document.documentElement.style.setProperty(
                        '--btns',
                        '#a7aaad'
                    )
                    document.documentElement.style.setProperty(
                        '--btnsHover',
                        '#94979b'
                    )
                    document.documentElement.style.setProperty(
                        '--container',
                        '#838690c0'
                    )
                    document.documentElement.style.setProperty(
                        '--containerHover',
                        '#838690b0'
                    )
                    document.documentElement.style.setProperty(
                        '--h1',
                        '#c2c2c2a0'
                    )
                    document.documentElement.style.setProperty(
                        '--h1OtherScreen',
                        '#c2c2c2d0'
                    )
                    document.documentElement.style.setProperty(
                        '--form',
                        '#cdcdcec0'
                    )
                    document.documentElement.style.setProperty(
                        '--formHover',
                        '#cdcdce'
                    )
                    document.documentElement.style.setProperty(
                        '--input',
                        '#8a8a8a'
                    )
                    document.documentElement.style.setProperty(
                        '--inputBG',
                        '#ffffff'
                    )
                    document.documentElement.style.setProperty(
                        '--inputHover',
                        '#a9a9a9'
                    )
                    document.documentElement.style.setProperty(
                        '--inputFocus',
                        '#aeaeae'
                    )
                    document.documentElement.style.setProperty(
                        '--webkitScrollbarTrack',
                        '#b6b6c4c0'
                    )
                    document.documentElement.style.setProperty(
                        '--modals',
                        '#b6b6c4'
                    )
                    document.documentElement.style.setProperty(
                        '--webkitScrollbarThumb',
                        '#969696'
                    )
                    document.documentElement.style.setProperty(
                        '--webkitScrollbarThumbHover',
                        '#727272'
                    )
                    document.documentElement.style.setProperty(
                        '--infoCard',
                        '#d1d1d1a8'
                    )
                }
            }
            console.log("current theme is " + responseJson.storeTheme);
        })
        .catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 509\n err-fetch-admin: storetheme\n التاريخ: ${formatTheDate(
                    new Date(), 1//
                )}`
            );
        });
}

function fetchStoreInfo() {
    fetch("/storeNum/show", {
            headers: {
                Method: "GET",
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            method: "GET"
        })
        .then((responseNum) => {
            return responseNum.json();
        })
        .then((responseJson) => {
            if (responseJson.storeNum != "none/لايوجد") {
                document.querySelector("#addInfoBtn").style.display = "none";
                document.querySelector("#updInfoBtn").style.display = "block";
            } else {
                document.querySelector("#addInfoBtn").style.display = "block";
                document.querySelector("#updInfoBtn").style.display = "none";
            }
            document.querySelector(
                "#num"
            ).innerHTML = `رقم المتجر:<br><b class="numAndName">${responseJson.storeNum}</b>`;
            addToListOfInfo("num", responseJson.storeNum);
        })
        .catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 510\n err-fetch-admin: storeNum\n التاريخ: ${formatTheDate(
                    new Date(), 1//
                )}`
            );
        });

    fetch("/storeName/show", {
            headers: {
                Method: "GET",
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            method: "GET"
        })
        .then((responseName) => {
            return responseName.json();
        })
        .then((responseJson) => {
            if (responseJson.storeName != "none/لايوجد") {
                document.querySelector("#addInfo").style.display = "none";
            }
            document.querySelector(
                "#name"
            ).innerHTML = `اسم المتجر:<br><b class="numAndName">${responseJson.storeName}</b>`;
            addToListOfInfo("name", responseJson.storeName);
        })
        .catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 511\n err-fetch-admin: storeName\n التاريخ: ${formatTheDate(
                    new Date(), 1//
                )}`
            );
        });

    fetch("/storeCurr/show", {
            headers: {
                Method: "GET",
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            method: "GET"
        })
        .then((responseCurr) => {
            return responseCurr.json();
        })
        .then((responseJson) => {
            if (responseJson.storeCurr != "none/لايوجد") {
                document.querySelector("#addInfo").style.display = "none";
            }
            document.querySelector(
                "#curr"
            ).innerHTML = `عملة المتجر:<br><b class="numAndName">${responseJson.storeCurr}</b>`;
            addToListOfInfo("curr", responseJson.storeCurr);
        })
        .catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 511\n err-fetch-admin: storeCurr\n التاريخ: ${formatTheDate(
                    new Date(), 1//
                )}`
            );
        });

    fetch("/storeDetails/show", {
            headers: {
                Method: "GET",
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            method: "GET"
        })
        .then((responseDetails) => {
            return responseDetails.json();
        })
        .then((responseJson) => {
            if (responseJson.storeDetails != "none/لايوجد") {
                document.querySelector("#addInfo").style.display = "none";
            }
            document.querySelector(
                "#details"
            ).innerHTML = `تفاصيل المتجر: <p class="numAndName">${responseJson.storeDetails}</p>`;
            addToListOfInfo("details", responseJson.storeDetails);
        })
        .catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 512\n err-fetch-admin: storeDetails\n التاريخ: ${formatTheDate(
                    new Date(), 1
                )}`
            );
        });

    fetch("/billDetails/show", {
            headers: {
                Method: "GET",
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            method: "GET"
        })
        .then((responseBillDetails) => {
            return responseBillDetails.json();
        })
        .then((responseJson) => {
            if (responseJson.billDetails != "none/لايوجد") {
                document.querySelector("#addInfo").style.display = "none";
            }
            if (responseJson.billDetails != "") {
                document.querySelector(
                    "#bDetails"
                ).innerHTML = `تفاصيل إضافية للفاتورة: <p class="numAndName">${responseJson.billDetails}</p>`;
            } else {
                document.querySelector("#bDetails").innerHTML =
                    "تفاصيل إضافية للفاتورة: <p class=\"numAndName\">none/لايوجد</p>";
            }
            addToListOfInfo("billDetails", responseJson.billDetails);
        })
        .catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 513\n err-fetch-admin: billdetails\n التاريخ: ${formatTheDate(
                    new Date(), 1
                )}`
            );
        });
}

// for fetchProducts()

function isNarrowed(responseJson) {
    // ** for products
    listOfProducts = responseJson;
    document.querySelector("#productsList").innerHTML =
        "<div id=\"expOrNarProduct\" onclick=\"expOrNarProduct(1)\" style=\"cursor: pointer; display: flex; justify-content: center; font-size: 20px\">اضغط لإظهار المنتجات &nbsp;  <i class=\"fas fa-angle-down\"></i></div><div></div><div style=\"display: flex; justify-content: space-around; border-bottom: rgba(0,0,0,.125) solid 1px; font-size: 20px\"><b class=\"cell\">الرقم</b><b class=\"cell\">العنوان</b><b class=\"cell\">السعر</b><b class=\"cell\">التوفر</b><b class=\"cell\">الصورة</b><b class=\"cell\">إجراءات</b></div>";
    for (let i = 0; i < Object.keys(responseJson).length; i++) {
        if (i == Object.keys(responseJson).length) {
            document.querySelector(
                "#productsList"
            ).innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"> <b class="cell">${responseJson[Object.keys(responseJson)[i]].id}</b> <b class="cell">${responseJson[Object.keys(responseJson)[i]].title}</b> <b class="cell">${responseJson[Object.keys(responseJson)[i]].price} ${listOfInfo.curr}</b> <b class="cell">${checkAvail(responseJson[Object.keys(responseJson)[i]].avail)}</b> <b class="cell"> <img style="border: 1px solid #8f8d85 ; border-radius: 10px; width: 40px; height: 40px; margin: 0;" src="data:image/png;base64,${responseJson[Object.keys(responseJson)[i]].img}" alt="img"> </b> <b class="cell" style="display:flex;justify-content:space-evenly;"> <div data-bs-toggle="modal" data-bs-target="#productModal" title="تعديل" onclick="deleteOrEditProd(${responseJson[Object.keys(responseJson)[i]].id},'edit')"> <i class="fas fa-edit"></i> </div> | <div data-bs-toggle="modal" data-bs-target="#productModal" title="حذف" onclick="deleteOrEditProd(${responseJson[Object.keys(responseJson)[i]].id},'delete')"> <i class="fas fa-trash-alt"></i> </div> </b> </div>`;
        }

        document.querySelector(
            "#productsList"
        ).innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"> <b class="cell">${responseJson[Object.keys(responseJson)[i]].id}</b> <b class="cell">${responseJson[Object.keys(responseJson)[i]].title}</b> <b class="cell">${responseJson[Object.keys(responseJson)[i]].price} ${listOfInfo.curr}</b> <b class="cell">${checkAvail(responseJson[Object.keys(responseJson)[i]].avail)}</b> <b class="cell"> <img style="border: 1px solid #8f8d85 ; border-radius: 10px; width: 40px; height: 40px; margin: 0;" src="data:image/png;base64,${responseJson[Object.keys(responseJson)[i]].img}" alt="img"> </b> <b class="cell" style="display:flex;justify-content:space-evenly;"> <div data-bs-toggle="modal" data-bs-target="#productModal" title="تعديل" onclick="deleteOrEditProd(${responseJson[Object.keys(responseJson)[i]].id},'edit')"> <i class="fas fa-edit"></i> </div>|<div data-bs-toggle="modal" data-bs-target="#productModal" title="حذف" onclick="deleteOrEditProd(${responseJson[Object.keys(responseJson)[i]].id},'delete')"> <i class="fas fa-trash-alt"></i> </div> </b> </div><br><div></div>`;
    }
}

function isExpanded(responseJson) {
    // ** for products
    listOfProducts = responseJson;

    document.querySelector("#productsList").innerHTML =
        "<div></div><div style=\"display: flex; justify-content: space-around; border-bottom: rgba(0,0,0,.125) solid 1px; font-size: 20px\"><b class=\"cell\">الرقم</b><b class=\"cell\">العنوان</b><b class=\"cell\">السعر</b><b class=\"cell\">التوفر</b><b class=\"cell\">الصورة</b><b class=\"cell\">إجراءات</b></div>";
    for (let i = 0; i < Object.keys(responseJson).length; i++) {
        if (i == Object.keys(responseJson).length) {
            document.querySelector(
                "#productsList"
            ).innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"> <b class="cell">${responseJson[Object.keys(responseJson)[i]].id}</b> <b class="cell">${responseJson[Object.keys(responseJson)[i]].title}</b> <b class="cell">${responseJson[Object.keys(responseJson)[i]].price} ${listOfInfo.curr}</b> <b class="cell">${checkAvail(responseJson[Object.keys(responseJson)[i]].avail)}</b> <b class="cell"><img style="border: 1px solid #8f8d85 ; border-radius: 10px; width: 40px; height: 40px; margin: 0;" src="data:image/png;base64,${responseJson[Object.keys(responseJson)[i]].img}" alt="img"></b> <b class="cell" style="display:flex;justify-content:space-evenly;"> <div data-bs-toggle="modal" data-bs-target="#productModal" title="تعديل" onclick="deleteOrEditProd(${responseJson[Object.keys(responseJson)[i]].id},'edit')"> <i class="fas fa-edit"></i> </div> | <div data-bs-toggle="modal" data-bs-target="#productModal" title="حذف" onclick="deleteOrEditProd(${responseJson[Object.keys(responseJson)[i]].id},'delete')"> <i class="fas fa-trash-alt"></i> </div> </b> </div>`;
        }

        document.querySelector(
            "#productsList"
        ).innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"><b class="cell">${responseJson[Object.keys(responseJson)[i]].id}</b><b class="cell">${responseJson[Object.keys(responseJson)[i]].title}</b><b class="cell">${responseJson[Object.keys(responseJson)[i]].price} ${listOfInfo.curr}</b><b class="cell">${checkAvail(responseJson[Object.keys(responseJson)[i]].avail)}</b><b class="cell"><img style="border: 1px solid #8f8d85 ; border-radius: 10px; width: 40px; height: 40px; margin: 0;" src="data:image/png;base64,${responseJson[Object.keys(responseJson)[i]].img}" alt="img"></b><b class="cell" style="display:flex;justify-content:space-evenly;"><div data-bs-toggle="modal" data-bs-target="#productModal" title="تعديل" onclick="deleteOrEditProd(${responseJson[Object.keys(responseJson)[i]].id},'edit')"><i class="fas fa-edit"></i></div>| <div data-bs-toggle="modal" data-bs-target="#productModal" title="حذف" onclick="deleteOrEditProd(${responseJson[Object.keys(responseJson)[i]].id},'delete')"> <i class="fas fa-trash-alt"></i> </div> </b> </div><br><div></div>`;
    }
    productsList.childNodes[productsList.childNodes.length - 1].innerHTML =
        "<div class=\"expOrNar\" id=\"expOrNarProduct\" onclick=\"expOrNarProduct(0)\" style=\"cursor: pointer; display: flex; justify-content: center; font-size: 20px\">اضغط لإخفاء المنتجات &nbsp;  <i class=\"fas fa-angle-up\"></i></div>";
}

function fetchProducts() {
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
            console.log(responseJson);
            if (responseJson.statCode == 204) {
                productsList.innerHTML = "حدث وانتظر قليلا إذا كنت قد أضفت";
                return;
            }
            if (responseJson.statCode == 429) {
                alert(
                    "لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429-admin"
                );
                return;
            }

            if (productsList.style.height == "30px") isNarrowed(responseJson); // ** for products
            if (productsList.style.height == "100%") isExpanded(responseJson); // ** for products
        })
        .catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 514\n err-fetch-admin: products\n التاريخ: ${formatTheDate(
                    new Date(), 1
                )}`
            );
        });
}

// for fetchProducts()
let listOfProducts;
let listOfPromos;
let listOfBills;
const listOfInfo = {
    name: "name",
    num: "num",
    details: "details",
    bDetails: "bDetails",
    curr: "curr",
};

function addToListOfInfo(infoType, infoData) {
    if (infoType == "name") listOfInfo.name = infoData;
    else if (infoType == "details") listOfInfo.details = infoData;
    else if (infoType == "num") listOfInfo.num = infoData;
    else if (infoType == "billDetails") listOfInfo.bDetails = infoData;
    else if (infoType == "curr") listOfInfo.curr = infoData;
}

function isNarrowedCode(responseJson) {
    listOfPromos = responseJson;
    document.querySelector("#codesList").innerHTML =
        "<div id=\"expOrNarPromo\" onclick=\"expOrNarPromo(1)\" style=\"cursor: pointer; display: flex; justify-content: center; font-size: 20px\">اضغط لإظهار القسائم &nbsp;  <i class=\"fas fa-angle-down\"></i></div><div></div><div style=\"display: flex; justify-content: space-around; border-bottom: rgba(0,0,0,.125) solid 1px; font-size: 20px\"><b class=\"cell\">الرقم</b><b class=\"cell\">الاسم</b><b class=\"cell\">النسبة</b><b class=\"cell\">الصلاحية</b><b class=\"cell\">إجراءات</b></div>";
    for (let i = 0; i < Object.keys(responseJson).length; i++) {
        if (i == Object.keys(responseJson).length) {
            document.querySelector(
                "#codesList"
            ).innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"> <b class="cell">${responseJson[Object.keys(responseJson)[i]].id}</b><b class="cell">${responseJson[Object.keys(responseJson)[i]].code}</b> <b class="cell">${responseJson[Object.keys(responseJson)[i]].amount * 100}%</b> <b class="cell">${checkExp(responseJson[Object.keys(responseJson)[i]].exp)}</b> <b class="cell" style="display:flex;justify-content:space-evenly;"> <div data-bs-toggle="modal" data-bs-target="#promoModal" title="تعديل" onclick="deleteOrEditPromo(${responseJson[Object.keys(responseJson)[i]].id},'edit')"> <i class="fas fa-edit"></i> </div> | <div data-bs-toggle="modal" data-bs-target="#promoModal" title="حذف" onclick="deleteOrEditPromo(${responseJson[Object.keys(responseJson)[i]].id},'delete')"> <i class="fas fa-trash-alt"></i> </div> </b> </div>`;
        }
        document.querySelector(
            "#codesList"
        ).innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"> <b class="cell">${responseJson[Object.keys(responseJson)[i]].id}</b> <b class="cell">${responseJson[Object.keys(responseJson)[i]].code}</b> <b class="cell">${responseJson[Object.keys(responseJson)[i]].amount * 100}%</b> <b class="cell">${checkExp(responseJson[Object.keys(responseJson)[i]].exp)}</b> <b class="cell" style="display:flex;justify-content:space-evenly;"> <div data-bs-toggle="modal" data-bs-target="#promoModal" title="تعديل" onclick="deleteOrEditPromo(${responseJson[Object.keys(responseJson)[i]].id},'edit')"> <i class="fas fa-edit"></i> </div> | <div data-bs-toggle="modal" data-bs-target="#promoModal" title="حذف" onclick="deleteOrEditPromo(${responseJson[Object.keys(responseJson)[i]].id},'delete')"> <i class="fas fa-trash-alt"></i> </div> </b> </div><br><div></div>`;
    }
}

function isExpandedCode(responseJson) {
    listOfPromos = responseJson;

    document.querySelector("#codesList").innerHTML =
        "<div></div><div style=\"display: flex; justify-content: space-around; border-bottom: rgba(0,0,0,.125) solid 1px; font-size: 20px\"><b class=\"cell\">الرقم</b><b class=\"cell\">الاسم</b><b class=\"cell\">النسبة</b><b class=\"cell\">الصلاحية</b><b class=\"cell\">إجراءات</b></div>";
    for (let i = 0; i < Object.keys(responseJson).length; i++) {
        if (i == Object.keys(responseJson).length) {
            document.querySelector(
                "#codesList"
            ).innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"> <b class="cell">${responseJson[Object.keys(responseJson)[i]].id}</b><b class="cell">${responseJson[Object.keys(responseJson)[i]].code}</b> <b class="cell">${responseJson[Object.keys(responseJson)[i]].amount * 100}%</b> <b class="cell">${checkExp(responseJson[Object.keys(responseJson)[i]].exp)}</b> <b class="cell" style="display:flex;justify-content:space-evenly;"> <div data-bs-toggle="modal" data-bs-target="#promoModal" title="تعديل" onclick="deleteOrEditPromo(${responseJson[Object.keys(responseJson)[i]].id},'edit')"> <i class="fas fa-edit"></i> </div> | <div data-bs-toggle="modal" data-bs-target="#promoModal" title="حذف" onclick="deleteOrEditPromo(${responseJson[Object.keys(responseJson)[i]].id},'delete')"> <i class="fas fa-trash-alt"></i> </div> </b> </div>`;
        }
        document.querySelector("#codesList").innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"> <b class="cell">${responseJson[Object.keys(responseJson)[i]].id}</b> <b class="cell">${responseJson[Object.keys(responseJson)[i]].code}</b> <b class="cell">${responseJson[Object.keys(responseJson)[i]].amount * 100}%</b> <b class="cell">${checkExp(responseJson[Object.keys(responseJson)[i]].exp)}</b> <b class="cell" style="display:flex;justify-content:space-evenly;"> <div data-bs-toggle="modal" data-bs-target="#promoModal" title="تعديل" onclick="deleteOrEditPromo(${responseJson[Object.keys(responseJson)[i]].id},'edit')"> <i class="fas fa-edit"></i> </div> | <div data-bs-toggle="modal" data-bs-target="#promoModal" title="حذف" onclick="deleteOrEditPromo(${responseJson[Object.keys(responseJson)[i]].id},'delete')"> <i class="fas fa-trash-alt"></i> </div> </b> </div><br><div></div>`;
    }
    codesList.childNodes[codesList.childNodes.length - 1].innerHTML =
        "<div class=\"expOrNar\" id=\"expOrNarPromo\" onclick=\"expOrNarPromo(0)\" style=\"cursor: pointer; display: flex; justify-content: center; font-size: 20px\">اضغط لإخفاء القسائم &nbsp;  <i class=\"fas fa-angle-up\"></i></div>";
}

function isNarrowedBillHis(responseJson) {
    listOfBills = responseJson;
    document.querySelector("#billsList").innerHTML =
        "<div id=\"expOrNarBillHis\" onclick=\"expOrNarBillHis(1)\" style=\"cursor: pointer; display: flex; justify-content: center; font-size: 20px\">اضغط لإظهار الفواتير &nbsp;  <i class=\"fas fa-angle-down\"></i></div><div></div><div style=\"display: flex; justify-content: space-around; border-bottom: rgba(0,0,0,.125) solid 1px; font-size: 20px\"><b class=\"cell\">الرقم</b><b class=\"cell\">التاريخ</b><b class=\"cell\">إجراءات</b></div>";
    for (let i = 0; i < Object.keys(responseJson).length; i++) {
        if (i == Object.keys(responseJson).length) {
            document.querySelector(
                "#billsList"
            ).innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"> <b class="cell" style="font-size: 9px;">${Object.keys(responseJson)[i]}</b> <b style="font-size: 13px;" class="cell">${(responseJson[Object.keys(responseJson)[i]].billDate).replace(/T/gi, "<br>")}</b> <b class="cell" style="display:flex;justify-content:space-evenly;"> <div data-bs-toggle="modal" data-bs-target="#billModal" title="تفاصيل" onclick="showBill(${Object.keys(responseJson)[i]})"> <i class="fas fa-eye"></i> </div> | <div data-bs-toggle="modal" data-bs-target="#billModal" title="حذف" onclick="showBillForDel(${Object.keys(responseJson)[i]})"> <i class="fas fa-trash-alt"></i> </div> </b> </div>`;
        }
        document.querySelector(
            "#billsList"
        ).innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"><b class="cell" style="font-size: 9px;">${responseJson[Object.keys(responseJson)[i]].billId}</b> <b style="font-size: 13px;" class="cell">${(responseJson[Object.keys(responseJson)[i]].billDate).replace(/T/gi, "<br>")}</b> <b class="cell" style="display:flex;justify-content:space-evenly;"> <div data-bs-toggle="modal" data-bs-target="#billModal" title="تفاصيل" onclick="showBill(${Object.keys(responseJson)[i]})"> <i class="fas fa-eye"></i> </div> | <div data-bs-toggle="modal" data-bs-target="#billModal" title="حذف" onclick="showBillForDel(${Object.keys(responseJson)[i]})"> <i class="fas fa-trash-alt"></i> </div> </b> </div><br><div></div>`;
    }
}

function isExpandedBillHis(responseJson) {
    listOfBills = responseJson;

    document.querySelector("#billsList").innerHTML =
        "<div></div><div style=\"display: flex; justify-content: space-around; border-bottom: rgba(0,0,0,.125) solid 1px; font-size: 20px\"><b class=\"cell\">الرقم</b><b class=\"cell\">التاريخ</b><b class=\"cell\">إجراءات</b></div>";
    for (let i = 0; i < Object.keys(responseJson).length; i++) {
        if (i == Object.keys(responseJson).length) {
            document.querySelector(
                "#billsList"
            ).innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"> <b class="cell" style="font-size: 9px;">${Object.keys(responseJson)[i]}</b> <b style="font-size: 13px;" class="cell">${(responseJson[Object.keys(responseJson)[i]].billDate).replace(/T/gi, "<br>")}</b> <b class="cell" style="display:flex;justify-content:space-evenly;"> <div data-bs-toggle="modal" data-bs-target="#billModal" title="تفاصيل" onclick="showBill(${Object.keys(responseJson)[i]})"> <i class="fas fa-eye"></i> </div> | <div data-bs-toggle="modal" data-bs-target="#billModal" title="حذف" onclick="showBillForDel(${Object.keys(responseJson)[i]})"> <i class="fas fa-trash-alt"></i> </div> </b> </div>`;
        }
        document.querySelector(
            "#billsList"
        ).innerHTML += `<div style="display: flex; justify-content: space-around; color: #4b4b4b;"><b class="cell" style="font-size: 9px;">${responseJson[Object.keys(responseJson)[i]].billId}</b> <b style="font-size: 13px;" class="cell">${(responseJson[Object.keys(responseJson)[i]].billDate).replace(/T/gi, "<br>")}</b> <b class="cell" style="display:flex;justify-content:space-evenly;"> <div data-bs-toggle="modal" data-bs-target="#billModal" title="تفاصيل" onclick="showBill(${Object.keys(responseJson)[i]})"> <i class="fas fa-eye"></i> </div> | <div data-bs-toggle="modal" data-bs-target="#billModal" title="حذف" onclick="showBillForDel(${Object.keys(responseJson)[i]})"> <i class="fas fa-trash-alt"></i> </div> </b> </div><br><div></div>`;
    }
    billsList.childNodes[billsList.childNodes.length - 1].innerHTML =
        "<div class=\"expOrNar\" id=\"expOrNarBillHis\" onclick=\"expOrNarBillHis(0)\" style=\"cursor: pointer; display: flex; justify-content: center; font-size: 20px\">اضغط لإخفاء الفواتير &nbsp;  <i class=\"fas fa-angle-up\"></i></div>";
}

function fetchPromocodes() {
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
            console.log(responseJson);
            if (responseJson.statCode == 204) {
                codesList.innerHTML = "حدث وانتظر قليلا إذا كنت قد أضفت";
                return;
            }
            if (responseJson.statCode == 429) {
                alert(
                    "لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 400-admin"
                );
                return;
            }
            if (codesList.style.height == "30px") isNarrowedCode(responseJson);
            if (codesList.style.height == "100%") isExpandedCode(responseJson);
        })
        .catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 515\n err-fetch-admin: products\n التاريخ: ${formatTheDate(
                    new Date(), 1
                )}`
            );
        });
}

function fetchBillHis() {
    fetch("/billingHistory/show", {
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
            console.log(responseJson);
            if (responseJson.statCode == 204) {
                billsList.innerHTML = "حدث وانتظر قليلا إذا كانت هناك فواتير";
                return;
            }
            if (responseJson.statCode == 429) {
                alert(
                    "لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 400-admin"
                );
                return;
            }
            if (billsList.style.height == "30px") isNarrowedBillHis(responseJson);
            if (billsList.style.height == "100%") isExpandedBillHis(responseJson);
        })
        .catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 515\n err-fetch-admin: products\n التاريخ: ${formatTheDate(
                    new Date(), 1
                )}`
            );
        });
}

/// // to show msg or not

if (localStorage.pressToNotShowBtn == "true") {
    document.querySelectorAll(".dbInfo")[0].style.display = "none";
    localStorage.pressToNotShowBtn = "true";
}
document.querySelector("#pressToNotShowBtn").addEventListener("click", () => {
    document.querySelectorAll(".dbInfo")[0].style.display = "none";
    localStorage.pressToNotShowBtn = "true";
});

/// // btns

document.querySelector("#addProd").addEventListener("click", () => {
    const productImg = document.querySelector("#productImg");
    const uploadImgForm = new FormData();
    uploadImgForm.append("image", productImg.files[0]);
    if (
        document.querySelector("#productID").value == "" ||
        document.querySelector("#productTitle").value == "" ||
        document.querySelector("#productPrice").value == "" ||
        document.querySelector("#productImg").value == ""
    ) {
        alert("يجب ملئ جميع الخانات أولا");
        setTimeout(() => {
            $("#productModal").modal("show");
        }, 200);
        return;
    }
    fetch("/product", {
            headers: {
                id: encodeURIComponent(document.querySelector("#productID").value),
                title: encodeURIComponent(
                    document.querySelector("#productTitle").value
                ),
                price: encodeURIComponent(
                    document.querySelector("#productPrice").value
                ),
                avail: encodeURIComponent(
                    `${document.querySelector("#productAvail").checked}`
                )
            },
            method: "POST",
            body: uploadImgForm
        })
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            if (responseJson.statCode == 403) {
                alert(
                    "الرقم التعريفي للمنتج المراد إضافته موجود مسبقا\nالرجاء المحاولة مجددًا باستخدام رقم آخر. \n\n ErrCode: 403-admin"
                ) | $("#productModal").modal("show");
                return;
            }
            if (responseJson.statCode == 400) {
                alert(
                    "هناك مدخلات أُدخلت بشكل خاطئ\nالرقم التعريفي أو السعر أُدخل فيه نص، يجب إدخالها على شكل رقم فقط. \n\n ErrCode: 400-admin"
                ) | $("#productModal").modal("show");
                return;
            }
            if (responseJson.statCode == 429) {
                alert(
                    "لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429-admin"
                ) | $("#productModal").modal("show");
                return;
            }
            if (responseJson.statCode == 500) {
                alert(
                    "حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 530-admin"
                ) | $("#productModal").modal("show");
                return;
            }

            alert(
                `تم إضافة المنتج رقم ${document.querySelector("#productID").value} بنجاح، إنتظر قليلا وستظهر التحديثات`
            );
            fetchProducts();
            document.querySelector("#productID").value = "";
            document.querySelector("#productTitle").value = "";
            document.querySelector("#productPrice").value = "";
            document.querySelector("#productAvail").checked = false;
            document.querySelector("#productImg").value = "";
        })
        .catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 516\n err-fetch-admin: product\n التاريخ: ${formatTheDate(
                    new Date(), 1
                )}`
            );
        });
});

document.querySelector("#updProd").addEventListener("click", () => {
    if (
        document.querySelector("#productID").value == "" ||
        document.querySelector("#productTitle").value == "" ||
        document.querySelector("#productPrice").value == ""
    ) {
        alert("يجب ملئ جميع الخانات أولا");
        setTimeout(() => {
            $("#productModal").modal("show");
        }, 200);
        return;
    }
    fetch(`/product/${document.querySelector("#productID").value}`, {
            headers: {
                title: encodeURIComponent(
                    document.querySelector("#productTitle").value
                ),
                price: encodeURIComponent(
                    document.querySelector("#productPrice").value
                ),
                avail: encodeURIComponent(
                    `${document.querySelector("#productAvail").checked}`
                )
            },
            method: "PUT"

        })
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            if (responseJson.statCode == 404) {
                alert(
                    "الرقم التعريفي للمنتج المراد تحديثه غير موجود\nالرجاء المحاولة مجددًا باستخدام رقم آخر. \n\n ErrCode: 404-admin"
                ) | $("#productModal").modal("show");
                return;
            }
            if (responseJson.statCode == 400) {
                alert(
                    "هناك مدخلات أُدخلت بشكل خاطئ\nالرقم التعريفي أو السعر أُدخل فيه نص، يجب إدخالها على شكل رقم فقط. \n\n ErrCode: 400-admin"
                ) | $("#productModal").modal("show");
                return;
            }
            if (responseJson.statCode == 429) {
                alert(
                    "لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429-admin"
                ) | $("#productModal").modal("show");
                return;
            }
            if (responseJson.statCode == 500) {
                alert(
                    "حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 531-admin"
                ) | $("#productModal").modal("show");
                return;
            }

            alert(
                `تم تعديل المنتج رقم ${document.querySelector("#productID").value} بنجاح، إنتظر قليلا وستظهر التحديثات`
            );
            fetchProducts();
            document.querySelector("#productID").value = "";
            document.querySelector("#productTitle").value = "";
            document.querySelector("#productPrice").value = "";
            document.querySelector("#productAvail").checked = false;
            document.querySelector("#productImg").value = "";
        })
        .catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 517\n err-fetch-admin: product\n التاريخ: ${formatTheDate(
                    new Date(), 1
                )}`
            );
        });
});

document.querySelector("#updProdImg").addEventListener("click", () => {
    const productImg = document.querySelector("#productImgEdit");
    const uploadImgForm = new FormData();
    uploadImgForm.append("image", productImg.files[0]);
    if (
        document.querySelector("#productID").value == "" ||
        document.querySelector("#productImgEdit").value == ""
    ) {
        alert("إرفع الصورة أولًا");
        setTimeout(() => {
            $("#productImageEditModal").modal("show");
        }, 200);
        return;
    }
    fetch(`/product/image/edit/${document.querySelector("#productID").value}`, {
            method: "PUT",
            body: uploadImgForm
        })
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            if (responseJson.statCode == 404) {
                alert(
                    "الرقم التعريفي للمنتج المراد تحديث صورته غير موجود\nالرجاء المحاولة مجددًا باستخدام رقم آخر. \n\n ErrCode: 404-admin"
                ) | $("#productImageEditModal").modal("show");
                return;
            }
            if (responseJson.statCode == 400) {
                alert(
                    "هناك مدخلات أُدخلت بشكل خاطئ\nالرقم التعريفي ، يجب إدخاله على شكل رقم فقط. \n\n ErrCode: 400-admin"
                ) | $("#productImageEditModal").modal("show");
                return;
            }
            if (responseJson.statCode == 429) {
                alert(
                    "لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429-admin"
                ) | $("#productImageEditModal").modal("show");
                return;
            }
            if (responseJson.statCode == 500) {
                alert(
                    "حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 531-admin"
                ) | $("#productImageEditModal").modal("show");
                return;
            }

            alert(
                `تم تعديل صورة المنتج رقم ${document.querySelector("#productID").value} بنجاح، إنتظر قليلا وستظهر التحديثات`
            );
            $("#productModal").modal("toggle");
            fetchProducts();
            document.querySelector("#productImgEdit").value = "";
            document.querySelector("#productID").value = "";
            document.querySelector("#productTitle").value = "";
            document.querySelector("#productPrice").value = "";
            document.querySelector("#productAvail").checked = false;
            document.querySelector("#productImg").value = "";
        })
        .catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 517\n err-fetch-admin: product\n التاريخ: ${formatTheDate(
                    new Date(), 1
                )}`
            );
        });
});

document.querySelector("#delProd").addEventListener("click", () => {
    fetch(`/product/${document.querySelector("#productID").value}`, {
            headers: {
                Method: "DELETE",
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            method: "DELETE"
        })
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            if (responseJson.statCode == 404) {
                alert(
                    "الرقم التعريفي للمنتج المراد حذفه غير موجود\nالرجاء المحاولة مجددًا باستخدام رقم آخر. \n\n ErrCode: 404-admin"
                ) | $("#productModal").modal("show");
                return;
            }
            if (responseJson.statCode == 400) {
                alert(
                    "هناك مدخلات أُدخلت بشكل خاطئ\nالرقم التعريفي أُدخل فيه نص، يجب إدخاله على شكل رقم فقط. \n\n ErrCode: 400-admin"
                ) | $("#productModal").modal("show");
                return;
            }
            if (responseJson.statCode == 429) {
                alert(
                    "لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429-admin"
                ) | $("#productModal").modal("show");
                return;
            }
            if (responseJson.statCode == 500) {
                alert(
                    "حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 532-admin"
                ) | $("#productModal").modal("show");
                return;
            }

            alert(`تم حذف المنتج رقم ${document.querySelector("#productID").value} بنجاح، إنتظر قليلا وستظهر التحديثات`);
            fetchProducts();
            document.querySelector("#productID").value = "";
            document.querySelector("#productTitle").value = "";
            document.querySelector("#productPrice").value = "";
            document.querySelector("#productAvail").checked = false;
            document.querySelector("#productImg").value = "";
        });
});

document.querySelector("#addCode").addEventListener("click", () => {
    if (
        document.querySelector("#codeID").value == "" ||
        document.querySelector("#codeName").value == "" ||
        document.querySelector("#codeAmount").value == ""
    ) {
        alert("يجب ملئ جميع الخانات أولا");
        setTimeout(() => {
            $("#promoModal").modal("show");
        }, 200);
        return;
    }
    fetch("/promocode", {
            headers: {
                Method: "POST",
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                id: document.querySelector("#codeID").value,
                code: document.querySelector("#codeName").value,
                amount: document.querySelector("#codeAmount").value,
                exp: formatTheDate(new Date(document.querySelector("#codeExp").value), 2)
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            if (responseJson.statCode == 403) {
                alert(
                    "الرقم التعريفي للقسيمة المراد إضافته موجود مسبقا\nالرجاء المحاولة مجددًا باستخدام رقم آخر. \n\n ErrCode: 403-admin"
                ) | $("#promoModal").modal("show");
                return;
            }
            if (responseJson.statCode == 400) {
                alert(
                    "هناك مدخلات أُدخلت بشكل خاطئ\nالرقم التعريفي أو نسبة التخفيض أُدخل فيه نص، يجب إدخالها على شكل رقم فقط. \n إن لم تكن تلك هي المشكلة، الرجاء إبلاغ المطور. \n\n ErrCode: 400-admin"
                ) | $("#promoModal").modal("show");
                return;
            }
            if (responseJson.statCode == 429) {
                alert(
                    "لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429-admin"
                ) | $("#promoModal").modal("show");
                return;
            }
            if (responseJson.statCode == 500) {
                alert(
                    "حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 533-admin"
                ) | $("#promoModal").modal("show");
                return;
            }

            alert(
                `تم إضافة القسيمة رقم ${document.querySelector("#codeID").value} بنجاح، إنتظر قليلا وستظهر التحديثات`
            );
            fetchPromocodes();
            document.querySelector("#codeID").value = "";
            document.querySelector("#codeName").value = "";
            document.querySelector("#codeAmount").value = "";
            document.querySelector("#codeExp").value = "";
        })
        .catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 518\n err-fetch-admin: promocode\n التاريخ: ${formatTheDate(
                    new Date(), 1
                )}`
            );
        });
});

document.querySelector("#updCode").addEventListener("click", () => {
    if (
        document.querySelector("#codeID").value == "" ||
        document.querySelector("#codeName").value == "" ||
        document.querySelector("#codeAmount").value == ""
    ) {
        alert("يجب ملئ جميع الخانات أولا");
        setTimeout(() => {
            $("#promoModal").modal("show");
        }, 200);
        return;
    }
    fetch(`/promocode/${document.querySelector("#codeID").value}`, {
            headers: {
                Method: "PUT",
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            method: "PUT",
            body: JSON.stringify({
                code: document.querySelector("#codeName").value,
                amount: document.querySelector("#codeAmount").value,
                exp: formatTheDate(new Date(document.querySelector("#codeExp").value), 2)
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            if (responseJson.statCode == 404) {
                alert(
                    "الرقم التعريفي للقسيمة المراد تحديثه غير موجود\nالرجاء المحاولة مجددًا باستخدام رقم آخر. \n\n ErrCode: 404-admin"
                ) | $("#promoModal").modal("show");
                return;
            }
            if (responseJson.statCode == 400) {
                alert(
                    "هناك مدخلات أُدخلت بشكل خاطئ\nالرقم التعريفي أو نسبة التخفيض أُدخل فيه نص، يجب إدخالها على شكل رقم فقط. \n إن لم تكن تلك هي المشكلة، الرجاء إبلاغ المطور. \n\n ErrCode: 400-admin"
                ) | $("#promoModal").modal("show");
                return;
            }
            if (responseJson.statCode == 429) {
                alert(
                    "لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429-admin"
                ) | $("#promoModal").modal("show");
                return;
            }
            if (responseJson.statCode == 500) {
                alert(
                    "حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 534-admin"
                ) | $("#promoModal").modal("show");
                return;
            }

            alert(
                `تم تعديل القسيمة رقم ${document.querySelector("#codeID").value} بنجاح، إنتظر قليلا وستظهر التحديثات`
            );
            fetchPromocodes();
            document.querySelector("#codeID").value = "";
            document.querySelector("#codeName").value = "";
            document.querySelector("#codeAmount").value = "";
            document.querySelector("#codeExp").value = "";
        });
});

document.querySelector("#delCode").addEventListener("click", () => {
    fetch(`/promocode/${document.querySelector("#codeID").value}`, {
            headers: {
                Method: "DELETE",
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            method: "DELETE"
        })
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            if (responseJson.statCode == 404) {
                alert(
                    "الرقم التعريفي للقسيمة المراد حذفه غير موجود\nالرجاء المحاولة مجددًا باستخدام رقم آخر. \n\n ErrCode: 404-admin"
                ) | $("#promoModal").modal("show");
                return;
            }
            if (responseJson.statCode == 400) {
                alert(
                    "هناك مدخلات أُدخلت بشكل خاطئ\nالرقم التعريفي أُدخل فيه نص، يجب إدخاله على شكل رقم فقط. \n\n ErrCode: 400-admin"
                ) | $("#promoModal").modal("show");
                return;
            }
            if (responseJson.statCode == 500) {
                alert(
                    "حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 535-admin"
                ) | $("#promoModal").modal("show");
                return;
            }
            if (responseJson.statCode == 429) {
                alert(
                    "لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429-admin"
                ) | $("#promoModal").modal("show");
                return;
            }

            alert(`تم حذف القسيمة رقم ${document.querySelector("#codeID").value} بنجاح، إنتظر قليلا وستظهر التحديثات`);
            fetchPromocodes();
            document.querySelector("#codeID").value = "";
            document.querySelector("#codeName").value = "";
            document.querySelector("#codeAmount").value = "";
            document.querySelector("#codeExp").value = "";
        });
});

document.querySelector("#addInfo").addEventListener("click", () => {
    if (
        document.querySelector("#storeNum").value == "" ||
        document.querySelector("#storeName").value == "" ||
        document.querySelector("#storeDetails").value == ""
    ) {
        alert("يجب ملئ جميع الخانات أولا");
        setTimeout(() => {
            $("#storeInfoModal").modal("show");
        }, 200);
        return;
    }

    fetch("/storeInfo", {
            headers: {
                Method: "POST",
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                storeName: document.querySelector("#storeName").value,
                storeNum: currentCountryCodeSelected +
                    document.querySelector("#storeNum").value,
                storeDetails: document.querySelector("#storeDetails").value,
                billDetails: document.querySelector("#billDetails").value,
                storeCurr: document.querySelector("#storeCurr").value
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            if (responseJson.statCode == 429) {
                alert(
                    "لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429-admin"
                );
                return;
            }
            if (responseJson.statCode == 500) {
                alert(
                    "حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 536-admin"
                );
                return;
            }

            alert(
                "تــمــت إضــافة المعلومات بنجاح إنتظر قليلا وستظهر التحديثات"
            );

            fetchStoreInfo();
            fetchProducts();
            document.querySelector("#storeName").value = "";
            document.querySelector("#storeDetails").value = "";
            document.querySelector("#billDetails").value = "";
            document.querySelector("#storeNum").value = "";
            document.querySelector("#storeCurr").value = "";
        })
        .catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 519\n err-fetch-admin: storeInfo\n التاريخ: ${formatTheDate(
                    new Date(), 1
                )}`
            );
        });
});

document.querySelector("#updInfo").addEventListener("click", () => {
    if (
        document.querySelector("#storeNum").value == "" ||
        document.querySelector("#storeName").value == "" ||
        document.querySelector("#storeDetails").value == "" ||
        document.querySelector("#storeCurr").value == ""
    ) {
        alert("يجب ملئ جميع الخانات أولا");
        setTimeout(() => {
            $("#storeInfoModal").modal("show");
        }, 200);
        return;
    }

    fetch("/storeNum/show", {
            method: "GET"
        })
        .then((responseNum) => {
            return responseNum.json();
        })
        .then((responseJson) => {
            if (responseJson.storeNum == "none/لايوجد") {
                alert("يجب أولا إضافة معلومات المتجر المتجر للتحديث");
                setTimeout(() => {
                    $("#storeInfoModal").modal("show");
                }, 200);
            }
        })
        .catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 520\n err-fetch-admin: storeNum\n التاريخ: ${formatTheDate(
                    new Date(), 1
                )}`
            );
        });

    fetch("/storeCurr/show", {
            method: "GET"
        })
        .then((responseNum) => {
            return responseNum.json();
        })
        .then((responseJson) => {
            if (responseJson.storeCurr == "none/لايوجد") {
                alert("يجب أولا إضافة معلومات المتجر المتجر للتحديث");
                setTimeout(() => {
                    $("#storeInfoModal").modal("show");
                }, 200);
            }
        })
        .catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 520\n err-fetch-admin: storeCurr\n التاريخ: ${formatTheDate(
                    new Date(), 1
                )}`
            );
        });

    fetch("/storeName/show", {
            method: "GET"
        })
        .then((responseName) => {
            return responseName.json();
        })
        .then((responseJson) => {
            if (responseJson.storeName == "none/لايوجد") {
                alert("يجب أولا إضافة معلومات المتجر المتجر للتحديث");
                setTimeout(() => {
                    $("#storeInfoModal").modal("show");
                }, 200);
            }
        })
        .catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 521\n err-fetch-admin: storeName\n التاريخ: ${formatTheDate(
                    new Date(), 1
                )}`
            );
        });

    fetch("/storeDetails/show", {
            method: "GET"
        })
        .then((responseDetails) => {
            return responseDetails.json();
        })
        .then((responseJson) => {
            if (responseJson.storeDetails == "none/لايوجد") {
                alert("يجب أولا إضافة معلومات المتجر المتجر للتحديث");
                setTimeout(() => {
                    $("#storeInfoModal").modal("show");
                }, 200);
            }
        })
        .catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 522\n err-fetch-admin: storeName\n التاريخ: ${formatTheDate(
                    new Date(), 1
                )}`
            );
        });

    fetch("/billDetails/show", {
            method: "GET"
        })
        .then((responseBillDetails) => {
            return responseBillDetails.json();
        })
        .then((responseJson) => {
            if (responseJson.billDetails == "none/لايوجد") {
                alert("يجب أولا إضافة معلومات المتجر المتجر للتحديث");
                setTimeout(() => {
                    $("#storeInfoModal").modal("show");
                }, 200);
            }
        })
        .catch((error) => {
            alert(
                `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 523\n err-fetch-admin: billDetails\n التاريخ: ${formatTheDate(
                    new Date(), 1
                )}`
            );
        });

    if (
        document.querySelector("#storeNum").value == "" &&
        document.querySelector("#storeName").value != "" &&
        document.querySelector("#storeDetails").value != "" &&
        document.querySelector("#storeCurr").value != ""
    ) {
        fetch("/storeName", {
                headers: {
                    Method: "PUT",
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                method: "PUT",
                body: JSON.stringify({
                    storeName: document.querySelector("#storeName").value
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson.statCode == 429) {
                    alert(
                        "لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429-admin"
                    );
                    setTimeout(() => {
                        $("#storeInfoModal").modal("show");
                    }, 200);
                    return;
                }
                if (responseJson.statCode == 500) {
                    alert(
                        "حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 537-admin"
                    );
                    setTimeout(() => {
                        $("#storeInfoModal").modal("show");
                    }, 200);
                    return;
                }

                alert(
                    "تم تعديل المعلومات بنجاح، إنتظر قليلا وستظهر التحديثات"
                );
                fetchStoreInfo();
                document.querySelector("#storeName").value = "";
                document.querySelector("#storeDetails").value = "";
                document.querySelector("#billDetails").value = "";
                document.querySelector("#storeNum").value = "";
                document.querySelector("#storeCurr").value = "";
            })
            .catch((error) => {
                alert(
                    `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 524\n err-fetch-admin: storeName\n التاريخ: ${formatTheDate(
                        new Date(), 1
                    )}`
                );
            });
    } else if (
        document.querySelector("#storeName").value == "" &&
        document.querySelector("#storeNum").value != "" &&
        document.querySelector("#storeDetails").value != "" &&
        document.querySelector("#storeCurr").value != ""
    ) {
        if (currentCountryCodeSelected < 0) {
            alert(
                "لم تدخل مفتاح الدولة،\n الرجاء المحاولة مجددَا مع إدخال المفتاح"
            );
            setTimeout(() => {
                $("#storeInfoModal").modal("show");
            }, 200);
            return;
        }
        fetch("/storeNum", {
                headers: {
                    Method: "PUT",
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                method: "PUT",
                body: JSON.stringify({
                    storeNum: currentCountryCodeSelected +
                        document.querySelector("#storeNum").value
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson.statCode == 400) {
                    alert(
                        "هناك مدخلات أُدخلت بشكل خاطئ\nرقم المتجر أُدخل فيه نص، يجب إدخاله على شكل رقم فقط. \n\n ErrCode: 400-admin"
                    );
                    setTimeout(() => {
                        $("#storeInfoModal").modal("show");
                    }, 200);
                    return;
                }
                if (responseJson.statCode == 429) {
                    alert(
                        "لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429-admin"
                    );
                    setTimeout(() => {
                        $("#storeInfoModal").modal("show");
                    }, 200);
                    return;
                }
                if (responseJson.statCode == 500) {
                    alert(
                        "حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 538-admin"
                    );
                    setTimeout(() => {
                        $("#storeInfoModal").modal("show");
                    }, 200);
                    return;
                }

                console.log(responseJson);

                alert(
                    "تم تعديل المعلومات بنجاح، إنتظر قليلا وستظهر التحديثات"
                );
                fetchStoreInfo();
                document.querySelector("#storeName").value = "";
                document.querySelector("#storeDetails").value = "";
                document.querySelector("#billDetails").value = "";
                document.querySelector("#storeNum").value = "";
                document.querySelector("#storeCurr").value = "";
            })
            .catch((error) => {
                alert(
                    `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 525\n err-fetch-admin: storeNum\n التاريخ: ${formatTheDate(
                        new Date(), 1
                    )}`
                );
            });
    } else if (
        document.querySelector("#storeDetails").value == "" &&
        document.querySelector("#storeName").value != "" &&
        document.querySelector("#storeNum").value != "" &&
        document.querySelector("#storeCurr").value != ""
    ) {
        fetch("/storeDetails", {
                headers: {
                    Method: "PUT",
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                method: "PUT",
                body: JSON.stringify({
                    storeDetails: document.querySelector("#storeDetails").value
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson.statCode == 429) {
                    alert(
                        "لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429-admin"
                    );
                    setTimeout(() => {
                        $("#storeInfoModal").modal("show");
                    }, 200);
                    return;
                }
                if (responseJson.statCode == 500) {
                    alert(
                        "حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 539-admin"
                    );
                    setTimeout(() => {
                        $("#storeInfoModal").modal("show");
                    }, 200);
                    return;
                }

                alert(
                    "تم تعديل المعلومات بنجاح، إنتظر قليلا وستظهر التحديثات"
                );
                fetchStoreInfo();
                document.querySelector("#storeName").value = "";
                document.querySelector("#storeDetails").value = "";
                document.querySelector("#storeNum").value = "";
                document.querySelector("#storeCurr").value = "";
            })
            .catch((error) => {
                alert(
                    `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 526\n err-fetch-admin: storeDetails\n التاريخ: ${formatTheDate(
                        new Date(), 1
                    )}`
                );
            });
        fetch("/billDetails", {
                headers: {
                    Method: "PUT",
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                method: "PUT",
                body: JSON.stringify({
                    billDetails: document.querySelector("#billDetails").value
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson.statCode == 429) {
                    alert(
                        "لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429-admin"
                    );
                    setTimeout(() => {
                        $("#storeInfoModal").modal("show");
                    }, 200);
                    return;
                }
                if (responseJson.statCode == 500) {
                    alert(
                        "حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 540-admin"
                    );
                    setTimeout(() => {
                        $("#storeInfoModal").modal("show");
                    }, 200);
                    return;
                }

                alert(
                    "تم تعديل المعلومات بنجاح، إنتظر قليلا وستظهر التحديثات"
                );
                fetchStoreInfo();
                document.querySelector("#storeName").value = "";
                document.querySelector("#storeDetails").value = "";
                document.querySelector("#billDetails").value = "";
                document.querySelector("#storeNum").value = "";
                document.querySelector("#storeCurr").value = "";
            })
            .catch((error) => {
                alert(
                    `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 527\n err-fetch-admin: billdetails\n التاريخ: ${formatTheDate(
                        new Date(), 1
                    )}`
                );
            });
        fetch("/storeCurr", {
                headers: {
                    Method: "PUT",
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                method: "PUT",
                body: JSON.stringify({
                    storeCurr: document.querySelector("#storeCurr").value
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson.statCode == 429) {
                    alert(
                        "لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429-admin"
                    );
                    setTimeout(() => {
                        $("#storeInfoModal").modal("show");
                    }, 200);
                    return;
                }
                if (responseJson.statCode == 500) {
                    alert(
                        "حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 540-admin"
                    );
                    setTimeout(() => {
                        $("#storeInfoModal").modal("show");
                    }, 200);
                    return;
                }

                alert(
                    "تم تعديل المعلومات بنجاح، إنتظر قليلا وستظهر التحديثات"
                );
                fetchStoreInfo();
                fetchProducts();
                document.querySelector("#storeName").value = "";
                document.querySelector("#storeDetails").value = "";
                document.querySelector("#billDetails").value = "";
                document.querySelector("#storeNum").value = "";
                document.querySelector("#storeCurr").value = "";
            })
            .catch((error) => {
                alert(
                    `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 527\n err-fetch-admin: billdetails\n التاريخ: ${formatTheDate(
                        new Date(), 1
                    )}`
                );
            });
    } else if (
        document.querySelector("#storeNum").value != "" &&
        document.querySelector("#storeName").value != "" &&
        document.querySelector("#storeDetails").value != "" &&
        document.querySelector("#storeCurr").value != ""
    ) {
        if (currentCountryCodeSelected < 0) {
            alert(
                "لم تدخل مفتاح الدولة،\n الرجاء المحاولة مجددَا مع إدخال المفتاح"
            );
            setTimeout(() => {
                $("#storeInfoModal").modal("show");
            }, 200);
            return;
        }
        Promise.all([
                fetch("/storeNum", {
                    headers: {
                        Method: "PUT",
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    method: "PUT",
                    body: JSON.stringify({
                        storeNum: currentCountryCodeSelected +
                            document.querySelector("#storeNum").value
                    })
                }),
                fetch("/storeName", {
                    headers: {
                        Method: "PUT",
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    method: "PUT",
                    body: JSON.stringify({
                        storeName: document.querySelector("#storeName").value
                    })
                }),
                fetch("/storeDetails", {
                    headers: {
                        Method: "PUT",
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    method: "PUT",
                    body: JSON.stringify({
                        storeDetails: document.querySelector("#storeDetails").value
                    })
                }),
                fetch("/billDetails", {
                    headers: {
                        Method: "PUT",
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    method: "PUT",
                    body: JSON.stringify({
                        billDetails: document.querySelector("#billDetails").value
                    })
                }),
                fetch("/storeCurr", {
                    headers: {
                        Method: "PUT",
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    method: "PUT",
                    body: JSON.stringify({
                        storeCurr: document.querySelector("#storeCurr").value
                    })
                })
            ])
            .then(
                ([
                    responseNum,
                    responseName,
                    responseDetails,
                    responseBillDetails,
                    responseStoreCurr
                ]) => {
                    return {
                        num: responseNum.json(),
                        name: responseName.json(),
                        details: responseDetails.json(),
                        bDetails: responseBillDetails.json(),
                        curr: responseStoreCurr.json(),
                    };
                }
            )
            .then((responseJson) => {
                if (responseJson.num.statCode == 400) {
                    alert(
                        "هناك مدخلات أُدخلت بشكل خاطئ\nرقم المتجر أُدخل فيه نص، يجب إدخاله على شكل فقط. \n\n ErrCode: 400-admin"
                    );
                    setTimeout(() => {
                        $("#storeInfoModal").modal("show");
                    }, 200);
                    return;
                }
                if (responseJson.statCode == 429) {
                    alert(
                        "لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429-admin"
                    );
                    setTimeout(() => {
                        $("#storeInfoModal").modal("show");
                    }, 200);
                    return;
                }
                if (responseJson.statCode == 500) {
                    alert(
                        "حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 541-admin"
                    );
                    setTimeout(() => {
                        $("#storeInfoModal").modal("show");
                    }, 200);
                    return;
                }

                alert(
                    "تم تعديل المعلومات بنجاح، إنتظر قليلا وستظهر التحديثات"
                );
                fetchStoreInfo();
                fetchProducts();
                document.querySelector("#storeName").value = "";
                document.querySelector("#storeDetails").value = "";
                document.querySelector("#billDetails").value = "";
                document.querySelector("#storeNum").value = "";
                document.querySelector("#storeCurr").value = "";
            })
            .catch((error) => {
                alert(
                    `توجد مشكلة في التواصل مع السيرفر،\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrMsg: ${error}\n ErrCode: 555\n err-fetch-admin: ALL\n التاريخ: ${formatTheDate(
                        new Date(), 1
                    )}`
                );
            });
    };
});

const delBill = (id) => {
    fetch("/billingHistory", {
            headers: {
                Method: "DELETE",
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            method: "DELETE",
            body: JSON.stringify({
                billId: id
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            if (responseJson.statCode == 204) {
                alert(
                    `تم حذف الفاتورة رقم ${id} بنجاح، إنتظر قليلا وستظهر التحديثات`
                );
                fetchBillHis();
                return;
            }
            if (responseJson.statCode == 404) {
                alert(
                    "هناك خطأ ما.\n الرجاء التواصل مع المطور إن استمرت المشكلة\n\n ErrCode: 404-admin-billingHistory"
                );
                return;
            }
            if (responseJson.statCode == 400) {
                alert(
                    "هناك خطأ ما.\n الرجاء التواصل مع المطور إن استمرت المشكلة\n\n ErrCode: 400-admin-billingHistory"
                );
                fetchBillHis();
                return;
            }
            if (responseJson.statCode == 500) {
                alert(
                    "حدث خطأ من طرف السيرفر\nحاول مجددًا في وقت لاحق، إذا استمرت المشكلة، تواصل مع المطور. \n\n ErrCode: 535-admin-billingHistory"
                );
                return;
            }
            if (responseJson.statCode == 429) {
                alert(
                    "لقد تجاوزت العدد المسموح من الطلبات على السيرفر في وقت معين،\n إنتظر قليلا ثم حاول الطلب مجددا. \n\n ErrCode: 429-admin-billingHistory"
                );
            }
        });
};

const countriesCodes = {
    SA: {
        code: "SA",
        name: "\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629",
        en_name: "Saudi Arabia",
        ar_name: "\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629",
        callingCode: "966"
    },
    AE: {
        code: "AE",
        name: "\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0645\u062a\u062d\u062f\u0629",
        en_name: "United Arab Emirates",
        ar_name: "\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0645\u062a\u062d\u062f\u0629",
        callingCode: "971"
    },
    QA: {
        code: "QA",
        name: "\u0642\u0637\u0631",
        en_name: "Qatar",
        ar_name: "\u0642\u0637\u0631",
        callingCode: "974"
    },
    KW: {
        code: "KW",
        name: "\u0627\u0644\u0643\u0648\u064a\u062a",
        en_name: "Kuwait",
        ar_name: "\u0627\u0644\u0643\u0648\u064a\u062a",
        callingCode: "965"
    },
    OM: {
        code: "OM",
        name: "\u0639\u064f\u0645\u0627\u0646",
        en_name: "Oman",
        ar_name: "\u0639\u064f\u0645\u0627\u0646",
        callingCode: "968"
    },
    BH: {
        code: "BH",
        name: "\u0627\u0644\u0628\u062d\u0631\u064a\u0646",
        en_name: "Bahrain",
        ar_name: "\u0627\u0644\u0628\u062d\u0631\u064a\u0646",
        callingCode: "973"
    },
    GB: {
        code: "GB",
        name: "United Kingdom\u202c\u200f",
        en_name: "United Kingdom",
        ar_name: "\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0645\u062a\u062d\u062f\u0629 ",
        callingCode: "44"
    },
    US: {
        code: "US",
        name: "United States\u202c\u200f",
        en_name: "United States",
        ar_name: "\u0627\u0644\u0648\u0644\u0627\u064a\u0627\u062a \u0627\u0644\u0645\u062a\u062d\u062f\u0629 ",
        callingCode: "1"
    },
    EG: {
        code: "EG",
        name: "\u0645\u0635\u0631",
        en_name: "Egypt",
        ar_name: "\u0645\u0635\u0631",
        callingCode: "20"
    },
    YE: {
        code: "YE",
        name: "\u0627\u0644\u064a\u0645\u0646",
        en_name: "Yemen",
        ar_name: "\u0627\u0644\u064a\u0645\u0646",
        callingCode: "967"
    }
};

const listOfCountriesCodes = document.querySelector("#listOfCountriesCodes");
for (let i = 0; i < /* Object.keys(countriesCodes).length */ 10; i++) {
    if (i == 0) {
        listOfCountriesCodes.innerHTML = "";
    }

    listOfCountriesCodes.innerHTML += `<li><a class="dropdown-item" >${i + 1}:${countriesCodes[Object.keys(countriesCodes)[i]].ar_name
        }</a></li>`;
}

const countryCodeTitle = document.querySelector("#countryCodeTitle");
const allCountriesAncors = document.querySelectorAll("a[class^=dropdown-item]");
let currentCountryCodeSelected = -1;
console.log(
    "Found",
    allCountriesAncors.length,
    "a which class:\"dropdown-item\"."
);
for (var i = 0; i < allCountriesAncors.length; i++) {
    allCountriesAncors[i].addEventListener("click", function() {
        let content = this.innerText;
        content = content.split(":");
        let id = content[0];
        id--;
        currentCountryCodeSelected =
            countriesCodes[Object.keys(countriesCodes)[id]].callingCode;
        countryCodeTitle.innerText = currentCountryCodeSelected;
    });
}
for (
    var i = 0; i < document.querySelectorAll(".delete-input").length; i++
) {
    document
        .querySelectorAll(".delete-input")[i].addEventListener("click", function() {
            document.querySelector("#codeID").value = "";
            document.querySelector("#codeName").value = "";
            document.querySelector("#codeAmount").value = "";
            document.querySelector("#codeExp").value = "";
            document.querySelector("#productID").value = "";
            document.querySelector("#productTitle").value = "";
            document.querySelector("#productPrice").value = "";
            document.querySelector("#productImg").value = "";
        });
}

function findHowMuchToSliceByNumber(text) {
    let callingCode = text.slice(0, 3);

    for (let i = 0; i < Object.keys(countriesCodes).length; i++) {
        if (
            callingCode ==
            countriesCodes[Object.keys(countriesCodes)[i]].callingCode
        ) {
            return 3;
        }
    }
    callingCode = text.slice(0, 2);
    for (let i = 0; i < Object.keys(countriesCodes).length; i++) {
        if (
            callingCode ==
            countriesCodes[Object.keys(countriesCodes)[i]].callingCode
        ) {
            return 2;
        }
    }
    callingCode = text.slice(0, 1);
    for (let i = 0; i < Object.keys(countriesCodes).length; i++) {
        if (
            callingCode ==
            countriesCodes[Object.keys(countriesCodes)[i]].callingCode
        ) {
            return 1;
        }
    }
    return "err404";
}

function formatTheDate(date, typeOfFormat) {
    let hours12 = date.getHours();
    let hours24 = hours12;
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const ampm = hours12 >= 12 ? "م" : "ص";
    hours12 = hours12 % 12;
    hours12 = hours12 || 12;
    const year = date.getFullYear();
    let month = date.getMonth();
    month = Number(month) + 1 < 10 ? "0" + (Number(month) + 1) : Number(month) + 1;
    let day = date.getDate();
    hours12 = hours12 < 10 ? "0" + hours12 : hours12;
    hours24 = hours24 < 10 ? "0" + hours24 : hours24;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    day = day < 10 ? "0" + day : day;
    if (isNaN(year) == true) {
        return null;
    }
    if (typeOfFormat == 1) {
        const strTime =
            year + "/" + month + "/" + day + ", " + hours12 + ":" + minutes + ampm;
        return strTime;
    } else if (typeOfFormat == 3) {
        const strTime =
            year + "-" + month + "-" + day + "T" + hours24 + ":" + minutes + ":" + seconds;
        return strTime;
    } else if (typeOfFormat == "id") {
        const strTime =
            `${month}${day}${hours24}${minutes}${seconds}`;
        return strTime;
    } else {
        const strTime =
            year + "-" + month + "-" + day;
        return strTime;
    }
}

const checkAvail = (value) => {
    if (value == true) return "نعم";
    else if (value == false) return "لا";
    else if (value == undefined) return "لم يحدد";
};

const checkExp = (date) => {
    if (date == "9999-09-09" || date == undefined || date == null) return "إلى الأبد";
    else return date;
};