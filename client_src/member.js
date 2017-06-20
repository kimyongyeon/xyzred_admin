class Member {
    login() {
        console.log("login");
        //$.post('/login', {userid:'test', password:'1234'}, function(){});
        $("#loginForm").submit();
    }
    register () {
        console.log("register");
    }
    logout() {
        console.log("loout");
    }
}

window.onload = function() {
    this.member = new Member();
}
