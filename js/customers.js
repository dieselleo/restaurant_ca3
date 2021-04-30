function getCustomers(){
    let output = '<h2>Users</h2>'
    fetch('https://randomuser.me/api/?results=5')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach(function(user){
        output += `<h1>test</h1>`;
      })
    },
    document.getElementById('customers').innerHTML = output
    )
    }