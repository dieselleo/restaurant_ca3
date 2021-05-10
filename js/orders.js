function preventNegative(e) {
    var inputKeyCode = e.keyCode ? e.keyCode : e.which;
    if (inputKeyCode != null) {
        if (inputKeyCode == 45) e.preventDefault();
    }
}

function preventMax (e) {
    el = e.target
    console.log(el)
    max = parseInt($(el).prop("max"))
    val = parseInt($(el).val())
    if (val > max) {
        alert(`You cannot order more than ${max} of the selected product`);
        el = $(el).val("0")
    } 
}

function clickBtn() {
    $("button").each(function () {
        if ($(this).attr("id") == "btn-bar") {
            $(this).click(function () {
                el = $(this).prop("name")
                $(`#${el}`).ready(
                    $(`#${el}`).toggle("slow"),
                    $(`#${el}`).css("display", "flex")
                )
            })
        }
    });
}

function placeOrder() {
    $(document).ready(function () {
        alert("Thank you! Your order has been placed!")
        $("input").val("0")
        $(".food-menu").each(function () {
            $(this).css("display", "none")
        })
    })
    refrshScreen();
}

function getProducts() {
    opStarters = opMains = opDess = opDrinks = ''
    fetch('../products.json')
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            (data.results).forEach(prod => {
                if (prod.menu == "drinks") {
                    opDrinks += `<div class="column prod-card">
                    <div class="container row row-wrap space-between">
                    <div class="container row">
                    <h4>${prod.name}</h4>
                    <h4>€ ${prod.price}</h4>
                    </div>
                    <input id="qtd" type="number" value="0" min="0" max="99"
                    data-name="${prod.name}" data-price="${prod.price}" data-cost="${prod.cost}"
                    data-menu="${prod.menu}" 
                    onkeypress="preventNegative(event)" onkeyup="preventMax(event)" onclick="this.select()"
                    style="width: 40px">
                    </div>
                    <br>
                    </div>`
                } else {
                    if (prod.vegetarian == `true`) {
                        veg = `<img id="veg" src="img/veg.png">`
                    } else {
                        veg = ``
                    }
                    el = `<div class="prod-card column">
                    <div class="container row">
                    <div class="container row row-wrap space-between" style="width: 300px;">
                    <h4>${prod.name}</h4>
                    <h4>€ ${prod.price}</h4>
                    ${veg}
                    </div>
                    <input id="qtd" type="number" value="0" min="0" max="9"
                    data-name="${prod.name}" data-price="${prod.price}" data-cost="${prod.cost}" 
                    data-veg="${prod.vegetarian}" data-menu="${prod.menu}" 
                    onkeypress="preventNegative(event)" onkeyup="preventMax(event)" onclick="this.select()"> 
                    </div>
                    <br>
                    <p><strong>${prod.description}</strong></p>
                    <p>${prod.ingredients}</p>
                    </div>`
                    switch (prod.menu) {
                        case "starters":
                            opStarters += el
                            break;
                        case "mains":
                            opMains += el
                            break;
                        case "desserts":
                            opDess += el
                            break;
                        default:
                    }
                }
            });
            $(document).ready(function () {
                document.getElementById("starters").innerHTML = opStarters
                document.getElementById("mains").innerHTML = opMains
                document.getElementById("desserts").innerHTML = opDess
                document.getElementById("drinks").innerHTML = opDrinks
                document.querySelectorAll("input").forEach(item => {
                    item.addEventListener('change', refrshScreen)
                })
            })
        })
}

function calcStarters() {
    startersPrice = startersCost = 0
    starVegCost = starNVegCost = 0
    $(document).ready(function () {
        el = $("#starters").find("input")
        for (i = 0; i < el.length; i++) {
            if (el[i].getAttribute("data-veg") == `true`) {
                starVegCost += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-cost"))
            } else {
                starNVegCost += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-cost"))
            }
            startersPrice += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-price"))
            startersCost += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-cost"))
        }
    })
}

function calcMains() {
    mainsPrice = mainsCost = 0
    mainsVegCost = mainsNVegCost = 0
    $(document).ready(function () {
        el = $("#mains").find("input")
        for (i = 0; i < el.length; i++) {
            if (el[i].getAttribute("data-veg") == "true") {
                mainsVegCost += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-cost"))
            } else {
                mainsNVegCost += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-cost"))
            }
            mainsPrice += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-price"))
            mainsCost += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-cost"))
        }
    })
}

function calcDesserts() {
    dessertsPrice = dessertsCost = 0
    $(document).ready(function () {
        el = $("#desserts").find("input")
        for (i = 0; i < el.length; i++) {
            dessertsPrice += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-price"))
            dessertsCost += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-cost"))
        }
    })
}

function calcDrinks() {
    drinksPrice = drinksCost = 0
    $(document).ready(function () {
        el = $("#drinks").find("input")
        for (i = 0; i < el.length; i++) {
            drinksPrice += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-price"))
            drinksCost += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-cost"))
        }
    })
}

function calcTotals() {
    $(document).ready(function () {
        totCost = (startersCost + mainsCost + dessertsCost + drinksCost)
        totPrice = (startersPrice + mainsPrice + dessertsPrice + drinksPrice)
        totVegCost = (starVegCost + mainsVegCost)
        totNVegCost = (starNVegCost + mainsNVegCost)
        document.getElementById("st-starters-price").innerHTML = "Price €" + parseFloat(startersPrice).toFixed(2)
        document.getElementById("st-starters-cost").innerHTML = "Cost €" + parseFloat(startersCost).toFixed(2)
        document.getElementById("st-mains-price").innerHTML = "Price €" + parseFloat(mainsPrice).toFixed(2)
        document.getElementById("st-mains-cost").innerHTML = "Cost €" + parseFloat(mainsCost).toFixed(2)
        document.getElementById("st-desserts-price").innerHTML = "Price €" + parseFloat(dessertsPrice).toFixed(2)
        document.getElementById("st-desserts-cost").innerHTML = "Cost €" + parseFloat(dessertsCost).toFixed(2)
        document.getElementById("st-drinks-price").innerHTML = "Price €" + parseFloat(drinksPrice).toFixed(2)
        document.getElementById("st-drinks-cost").innerHTML = "Cost €" + parseFloat(drinksCost).toFixed(2)
        document.getElementById("tot-cost").innerHTML = "Total Cost €" + parseFloat(totCost).toFixed(2)
        document.getElementById("tot-price").innerHTML = "Total Price €" + parseFloat(totPrice).toFixed(2)
        document.getElementById("cost-veg").innerHTML = "Vegetarian €" + parseFloat(totVegCost).toFixed(2)
        document.getElementById("cost-nveg").innerHTML = "Non-Vegetarian €" + parseFloat(totNVegCost).toFixed(2)
    })

}

function refrshScreen() {
    calcDrinks();
    calcDesserts();
    calcMains();
    calcStarters();
    calcTotals();
    buildOrder();
}

function buildOrder() {
    descrStarters = `<h3>Starters</h3><hr>`
    descrMains = `<h3>Mains</h3><hr>`
    descrDess = `<h3>Desserts</h3><hr>`
    descrDrinks = `<h3>Drinks</h3><hr>`
    $(document.body).ready(function () {
        el = document.querySelectorAll("input")
        el.forEach(prod => {
            if (prod.value > 0) {
                switch (prod.getAttribute("data-menu")) {
                    case "starters":
                        descrStarters += `<h4>${parseInt(prod.value)} x ${prod.getAttribute("data-name")}</h4><hr>`
                        break;
                    case "mains":
                        descrMains += `<h4>${parseInt(prod.value)} x ${prod.getAttribute("data-name")}</h4><hr>`
                        break;
                    case "desserts":
                        descrDess += `<h4>${parseInt(prod.value)} x ${prod.getAttribute("data-name")}</h4><hr>`
                        break;
                    case "drinks":
                        descrDrinks += `<h4>${parseInt(prod.value)} x ${prod.getAttribute("data-name")}</h4><hr>`
                        break;
                    default:
                }
            }

        })
        document.getElementById("descr-starters").innerHTML = descrStarters
        document.getElementById("descr-mains").innerHTML = descrMains
        document.getElementById("descr-dess").innerHTML = descrDess
        document.getElementById("descr-drinks").innerHTML = descrDrinks
    })
    $(document).ready(function () {
        $(`[id^="descr-"]`).each(function (i) {
            menu = this
            qtd = $(`#${$(this).prop("id")} > *`).length
            if (qtd > 2) {
                $(menu).css("display", "flex")
            } else {
                $(menu).css("display", "none")
            }

        })
    })
}

function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}