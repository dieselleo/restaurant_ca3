function clickBtnBar() {
    $("button").click(function () {
        el = $(this).prop("name")
        $(`#${el}`).ready(
            $(`#${el}`).toggle("slow"),
            $(`#${el}`).css("display", "flex")
        )
    });
}

function getProducts() {
    let opStarters = opMains = opDess = opDrinks = ''
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
                    <input id="qtd" type="number" value="0" 
                    data-name="${prod.name}" data-price="${prod.price}" data-cost="${prod.cost}">
                    </div>
                    <br>
                    </div>`
                } else {
                    if (prod.vegetarian==`true`){
                        veg = `<div id="veg"><h2>V</h2></div>`
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
                    <input id="qtd" type="number" value="0"
                    data-name="${prod.name}" data-price="${prod.price}" data-cost="${prod.cost}" 
                    data-veg="${prod.vegetarian}">
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
                    item.addEventListener('change', calcAll)
                })
            })
        })
}

function calcStarters () {
    startersPrice = startersCost = 0
    starVegCost = starNVegCost = 0
    $(document).ready(function(){
        el =  $("#starters").find("input")
        for (i = 0; i < el.length; i++) {
            if (el[i].getAttribute("data-veg")==`true`){
                starVegCost += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-cost"))
            } else {
                starNVegCost += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-cost"))
            }
            startersPrice += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-price"))
            startersCost += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-cost"))
        }
    })
}

function calcMains () {
    mainsPrice = mainsCost = 0
    mainsVegCost = mainsNVegCost = 0
    $(document).ready(function(){
        el =  $("#mains").find("input")
        for (i = 0; i < el.length; i++) {
            if (el[i].getAttribute("data-veg")=="true"){
                mainsVegCost += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-cost"))
            } else {
                mainsNVegCost += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-cost"))
            }            
            mainsPrice += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-price"))
            mainsCost += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-cost"))
        }
    })
}

function calcDesserts () {
    dessertsPrice = dessertsCost = 0
    $(document).ready(function(){
        el =  $("#desserts").find("input")
        for (i = 0; i < el.length; i++) {
            dessertsPrice += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-price"))
            dessertsCost += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-cost"))
        }
    })
}

function calcDrinks () {
    drinksPrice = drinksCost = 0
    $(document).ready(function(){
        el =  $("#drinks").find("input")
        for (i = 0; i < el.length; i++) {
            drinksPrice += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-price"))
            drinksCost += parseInt(el[i].value) * parseFloat(el[i].getAttribute("data-cost"))
        }
    })
}

function calcTotals () {
    $(document).ready(function(){
        totCost = (startersCost+mainsCost+dessertsCost+drinksCost)
        totPrice = (startersPrice+mainsPrice+dessertsPrice+drinksPrice)
        totVegCost = (starVegCost+mainsVegCost)
        totNVegCost = (starNVegCost+mainsNVegCost)
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
        document.getElementById("cost-veg").innerHTML = "Cost Vegetarian €" + parseFloat(totVegCost).toFixed(2)
        document.getElementById("cost-nveg").innerHTML = "Cost Non-Vegetarian €" + parseFloat(totNVegCost).toFixed(2)
    })
    
}

function calcAll () {
    calcDrinks();calcDesserts();calcMains();calcStarters();calcTotals()
}

function dispVeg () {
    $(document).ready(function(){
        $(document.querySelectorAll("#veg")).css("display","flex")
    })
}

function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}