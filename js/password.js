var modal = document.getElementById("modal");

$('form input').keydown(function (e) {
    if (e.keyCode == 13) {
        el = $("#validate")
        btnClick(el)
        return false;
    }
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}

function openLogin () {
    modal.style.display='block'
    $("#pass").val("")
    msg.style.display = "none"
}

function btnClick(e) {
    regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g
    msg = document.getElementById('msg');
    pass = $("#pass").val()
    el = e.target
    if (el == undefined) {
        btn = $(e).prop("id")
    } else {
        btn = $(el).prop("id")
    }
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
        modal.style.display = "none";
    }
}