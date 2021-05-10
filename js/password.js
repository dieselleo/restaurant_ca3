var modal = document.getElementById('modal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}

function btnClick(e) {
    regex = /leonardo/g
    regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g
    msg = document.getElementById('msg');
    pass = $("#pass").val()
    el = e.target
    btn = $(el).prop("id")
    console.log(pass.match(regex))
    if (btn == "validate") {
        if (pass.match(regex) == pass) {
            $(document).ready(function(){
                msg.innerHTML =  "<p>Your password is correct!</p>";
                msg.style.color = "green"
                msg.style.display = "flex"
            })
        } else if (pass.match(regex) == null) {
            $(document).ready(function(){
                msg.innerHTML =  "<p>Your password is incorrect!</p>"
                msg.style.color = "red"
                msg.style.display = "flex"
            })
        }
    } else if (btn == "cancel") {
        $("#pass").val("")
        msg.style.display = "none"
        modal.style.display = "none";
    }
}