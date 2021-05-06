function clickBtnBar() {
    $("button").click(function () {
        el = $(this).prop("name")
        $(`#${el}`).ready(
            $(`#${el}`).toggle("slow"),
            $(`#${el}`).css("display", "flex")
        )
    });
}


function dispVeg () {
    $(document).ready(function(){
        $(document.querySelectorAll("#veg")).css("display","flex")
    })
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
                    el = `<div class="column prod-card">
                    <div class="container row row-wrap space-between">
                    <h4>${prod.name}</h4>
                    <h4>€ ${prod.price}</h4>
                    ${veg}
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
            })
        })
}

function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}