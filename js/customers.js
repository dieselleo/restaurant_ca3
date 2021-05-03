function getCustomers() {
  var output = ''
  fetch('https://randomuser.me/api/?results=10')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.results.forEach(user => {
        output += `<div class="card column-wrap">
        <div class="column flex center">
          <img src="${user.picture.medium}" style="margin: 0 10px 0 10px; border-radius: 50%">
        </div>
        <div class="column flex center" style="width: 100%; margin: 0 10px 0 20px">
        <h1>${user.name.title} ${user.name.last}, ${user.name.first}</h1><br>
        <h2>${capFirstLetter(user.gender)}, ${user.dob.age}</h2>
        <h2>${user.location.city}, ${user.location.state}</h2>
        <h2>${user.location.country}</h2>
        </div>
    </div>`
      })
      $(document).ready(function () {
        document.getElementById("customers").innerHTML = output
      })
    });
}

function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}