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
    let opStarters = opMains = opDess = opDrinks =''
    fetch('../products.json')
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            (data.starters).forEach(prod => {
                opStarters += `<div class="column prod-card">
                          <div class="container row space-between">
                          <h4>${prod.name}</h4><h4>€ ${prod.price}</h4>
                          <input type="number" name="qtd" id="qtd">
                          </div>
                          <br>
                          <p><strong>${prod.description}</strong></p>
                          <p>${prod.ingredients}</p>
                          </div>`
            })
            $(document).ready(function () {
                document.getElementById("starters").innerHTML = opStarters
            }),
            (data.mains).forEach(prod => {
                opMains += `<div class="column prod-card">
                          <div class="container row space-between">
                          <h4>${prod.name}</h4><h4>€ ${prod.price}</h4>
                          <input type="number" name="qtd" id="qtd">
                          </div>
                          <br>
                          <p><strong>${prod.description}</strong></p>
                          <p>${prod.ingredients}</p>
                          </div>`
            })
            $(document).ready(function () {
                document.getElementById("mains").innerHTML = opMains
            }),
            (data.desserts).forEach(prod => {
                opDess += `<div class="column prod-card">
                          <div class="container row space-between">
                          <h4>${prod.name}</h4><h4>€ ${prod.price}</h4>
                          <input type="number" name="qtd" id="qtd">
                          </div>
                          <br>
                          <p><strong>${prod.description}</strong></p>
                          <p>${prod.ingredients}</p>
                          </div>`
            })
            $(document).ready(function () {
                document.getElementById("desserts").innerHTML = opDess
            }),
            (data.drinks).forEach(prod => {
                opDrinks += `<div class="column prod-card">
                          <div class="container row space-between">
                          <h4>${prod.name}</h4><h4>€ ${prod.price}</h4>
                          <input type="number" name="qtd" id="qtd">
                          </div>
                          <br>
                          <p><strong>${prod.description}</strong></p>
                          </div>`
            })
            $(document).ready(function () {
                document.getElementById("drinks").innerHTML = opDrinks
            })
        });
}

function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}