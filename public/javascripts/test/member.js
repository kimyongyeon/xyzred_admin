"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Member = function () {
    function Member() {
        _classCallCheck(this, Member);
    }

    _createClass(Member, [{
        key: "login",
        value: function login() {
            console.log("login");
            //$.post('/login', {userid:'test', password:'1234'}, function(){});
            $("#loginForm").submit();
        }
    }, {
        key: "register",
        value: function register() {
            console.log("register");
        }
    }, {
        key: "logout",
        value: function logout() {
            console.log("loout");
        }
    }]);

    return Member;
}();

window.onload = function () {
    this.member = new Member();
};