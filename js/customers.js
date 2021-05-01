function getCustomers() {
  var output = "<h1>test1</h1>"
  fetch('https://randomuser.me/api/?results=5')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      (data.results).forEach(user => {
        Object.entries(user).forEach(function(){
          console.log("foi")
          output = `<div class="data-container column" style="background-color: blue;">
          <h1 id="name">${name.first}</h1><br>
          <h2 id="add1">${location.street}</h2>
          <h2 id="add2">${location.city}</h2></div>`
          $(document).ready(function (){
            document.getElementById("customers").innerHTML = output
          })
        })        
      })
    });
}