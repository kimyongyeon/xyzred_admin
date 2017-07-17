'use strict';

'develope ver 2.0';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$.fn.extend({
    animateCss: function animateCss(animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

$(document).ready(function () {

    $('#client_game_open').on('click', function (e) {
        $('iframe[name=client_game]').removeClass('bounceOutLeft').animateCss('bounceInLeft');
        $("iframe[name=client_game]").fadeIn();
        $('#client_game_close').fadeIn();
        $(this).hide();
    });

    $('#client_game_close').on('click', function (e) {
        $("iframe[name=client_game]").removeClass('bounceInLeft').animateCss('bounceOutLeft');
        $("iframe[name=client_game]").fadeOut();
        $('#client_game_open').fadeIn();
        $(this).hide();
    });

    $(".nav-tabs a").click(function () {
        $(this).tab('show');
    });
    $('#alert_server_close').on('click', function () {
        console.log("alert_server");
        $("#alert_server").fadeOut();
    });

    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);

    var render = new Render();
    render.memberMngAddRowDisplay();

    var service = new Service();
    service.pageList(1, render.pageListDisplay);

    var server_send_data = [];
    window.btn = new Controller(render, service, server_send_data);
});

var Agent = function () {
    function Agent() {
        _classCallCheck(this, Agent);

        this._id = $("#_id-input").val() || '';
        this.agent = $("#agent-input").val() || '';
        this.referer = $("#referer-input").val() || '';
    }

    _createClass(Agent, [{
        key: 'getAjaxSendItem',
        value: function getAjaxSendItem() {
            if (this._id == '') {
                alert("_id 필수 입력사항 입니다.");
                $("#_id-input").focus();
                throw 1;
            }
            if (this.agent == '') {
                alert("agent 필수 입력사항 입니다.");
                $("#agent-input").focus();
                throw 2;
            }
            if (this.referer == '') {
                alert("referer 필수 입력사항 입니다.");
                $("#referer-input").focus();
                throw 3;
            }
            return {
                _id: this._id,
                agent: this.agent,
                referer: this.referer
            };
        }
    }]);

    return Agent;
}();

var Controller = function () {

    // Controller 클래스 생성자 
    function Controller(render, service, server_send_data) {
        _classCallCheck(this, Controller);

        this.server_send_data = server_send_data;
        this.service = service;
        this.render = render;
    }
    // 등록


    _createClass(Controller, [{
        key: 'reg',
        value: function reg() {
            console.log("reg click..");
            this.service.reg(new Agent().getAjaxSendItem(), function (data) {
                console.log(data);
            });
        }
        // 삭제

    }, {
        key: 'remove',
        value: function remove() {
            console.log("remove click..");
            this.service.remove(new Agent().getAjaxSendItem(), function (data) {
                console.log(data);
            });
        }
        // 수정

    }, {
        key: 'edit',
        value: function edit() {
            console.log("edit click..");
            this.service.edit(new Agent().getAjaxSendItem(), function (data) {
                console.log(data);
            });
        }
        // 취소 

    }, {
        key: 'cancel',
        value: function cancel() {
            console.log("cancel click..");
        }
        // 더보기 

    }, {
        key: 'moreList',
        value: function moreList() {
            console.log("moreList click");
            var totCnt = $("#btn_page_more").attr('totCnt');
            var perPage = $("#btn_page_more").attr('perPage');
            var pageLimit = Math.floor(totCnt / perPage);
            var page = Math.floor($("#btn_page_more").val());
            if (pageLimit > page) {
                this.service.pageList(page + 1, this.render.pageListDisplay);
                //location.href = '/inputs?page=' + (page + 1);
            }
        }
        // 처음으로 

    }, {
        key: 'firstList',
        value: function firstList() {
            console.log("firstList click");
            this.service.pageList(1, this.render.pageListDisplay);
            // location.href = '/inputs?page=' + 1;
        }
        // 마지막으로 

    }, {
        key: 'lastList',
        value: function lastList() {
            console.log("lastList click");
            var totCnt = $("#btn_page_last").attr('totCnt');
            var perPage = $("#btn_page_last").attr('perPage');
            var pageLimit = Math.floor(totCnt / perPage);
            this.service.pageList(pageLimit, this.render.pageListDisplay);
            //location.href = '/inputs?page=' + pageLimit;
        }
        // 상세보기 

    }, {
        key: 'detail',
        value: function detail(key, agent_id, referer) {
            $("#_id-input").val(key);
            $("#agent-input").val(agent_id);
            $("#referer-input").val(referer);
        }
        // 서버 전송

    }, {
        key: 'serverSend',
        value: function serverSend() {
            console.log("서버전송" + $("#result_set > tbody > tr ").length);

            if ($("#result_set > tbody > tr ").length > 0) {
                $("#alert_server > strong").html("서버 전송 완료");
                $("#alert_server").fadeIn();
                $("#result_set > tbody > tr ").hide(3000);
                $("#result_set > tbody ").empty();

                var result = $.post("/reg_agent", {
                    msg: JSON.stringify(this.server_send_data)
                }).done(function (data) {
                    console.log(data);
                });

                // 초기화 
                this.server_send_data = [];
            } else {
                $("#alert_server > strong").html("전송할 데이터가 없습니다.");
                $("#alert_server").fadeIn();
                $("#result_set > tbody ").empty();
            }
        }
        // 행 전체 삭제

    }, {
        key: 'rowAllRemove',
        value: function rowAllRemove() {
            $("#result_set > tbody").empty();
        }
        // 행 삭제

    }, {
        key: 'rowRemove',
        value: function rowRemove() {
            console.log("행삭제");
        }
        // 행 수정

    }, {
        key: 'rowEdit',
        value: function rowEdit() {
            console.log(com);
            console.log("행수정");
        }
        // crash 추가 버튼

    }, {
        key: 'crashAdd',
        value: function crashAdd() {
            var site_agent = $("input[name=crash_site_agent]").val();
            var userid = $("input[name=crash_userid]").val();
            var rate = $("input[name=crash_rate]").val();
            console.log("crash", site_agent, userid, rate);
            this.render.resultTableAddRowDisplay(site_agent, userid, rate);
            this.service.arrayDataPush(site_agent, userid, rate);
        }
        // risk 추가 버튼 

    }, {
        key: 'riskAdd',
        value: function riskAdd() {
            var site_agent = $("input[name=risk_site_agent]").val();
            var userid = $("input[name=risk_userid]").val();
            var rate = $("input[name=risk_rate]").val();
            console.log("risk", site_agent, userid, rate);
            this.render.resultTableAddRowDisplay(site_agent, userid, rate);
            this.service.arrayDataPush(site_agent, userid, rate);
        }
    }]);

    return Controller;
}();

var Render = function () {
    function Render() {
        _classCallCheck(this, Render);
    }

    _createClass(Render, [{
        key: 'pageListDisplay',
        value: function pageListDisplay(data) {
            var result = $("#result_server_his > tbody");
            var html = '';
            for (var i = 0; i < data.tables.length; i++) {
                var item = data.tables[i];
                html += '\n                <tr>\n                    <td class=\'text-left\' id=key_' + item.key + '>\n                        <input type=\'text\' value=' + item.key + ' style=\'border:0;\'/>\n                    </td>\n                    <td class=\'text-left\' onclick="btn.detail(\'' + item.key + '\', \'' + item.agent_id + '\', \'' + item.referer + '\');">\n                        <input type=\'text\' value=' + item.agent_id + ' style=\'border:0;\'/>\n                    <td class=\'text-left\'>\n                        <input type=\'text\' value=' + item.referer + ' style=\'border:0;\'/>\n                    </td>\n                    <td class=\'text-left\'>' + item.reg_date + '</td>\n                    <td class=\'text-left\'>\n                        <button class=\'btn btn-info\'>\uC218\uC815</button>\n                        <button class=\'btn btn-danger\'>\uC0AD\uC81C</button>\n                    </td>\n                </tr>\n                    \n            ';
            }
            $("#pageNo").text('\uD398\uC774\uC9C0 \uBC88\uD638 : ' + data.page);
            $("#btn_page_more").attr('value', data.page);
            $("#btn_page_more").attr('totCnt', data.totCnt);
            $("#btn_page_more").attr('perPage', data.perPage);
            $("#btn_page_last").attr('value', data.page);
            $("#btn_page_last").attr('totCnt', data.totCnt);
            $("#btn_page_last").attr('perPage', data.perPage);
            result.append(html);
        }

        // 서버 전송 대기 데이터 행 추가 

    }, {
        key: 'resultTableAddRowDisplay',
        value: function resultTableAddRowDisplay(site_agent, userid, rate) {
            var result = $("#result_set > tbody");
            var tr = $("#result_set > tbody > tr");
            var index = tr.length + 1;

            var html = '\n            <tr>\n                <td class=\'text-center\'>' + index + '</td>\n                <td class=\'text-center\'>' + site_agent + '</td>\n                <td class=\'text-center\'>' + userid + '</td>\n                <td class=\'text-center\'>' + rate + '</td>\n                <td class=\'text-center\'>Y</td>\n                <td class=\'text-center\'>2017-06-20 15:00:00</td>\n                <td class=\'text-center\'>\n                    <button class=\'btn form-control btn-info mx-auto\' syle=\'width:77px\' onclick=\'btn.rowRemove()\'>\uC0AD\uC81C</button>\n                </td>\n                <td class=\'text-center\'>\n                    <button class=\'btn form-control btn-info mx-auto\' syle=\'width:77px\' onclick=\'btn.rowEdit()\'>\uC218\uC815</button>\n                </td>\n            </tr>\n                \n        ';
            result.append(html);
        }
    }, {
        key: 'memberMngAddRowDisplay',
        value: function memberMngAddRowDisplay() {
            var result = $("#memberList > tbody");
            var tr = $("#memberList > tbody > tr");
            var index = tr.length + 1;

            var html = '\n            <tr>\n                <td class=\'text-center\'>1</td>\n                <td class=\'text-center\'>\uD64D\uAE38\uB3D9</td>\n                <td class=\'text-center\'>hong</td>\n                <td class=\'text-center\'>1234</td>\n                <td class=\'text-center\'></td>\n                <td class=\'text-center\'>2017-06-20 15:00:00</td>\n                <td class=\'text-center\'>\n                    <button class=\'btn form-control btn-info mx-auto\' syle=\'width:77px\' onclick=\'btn.rowRemove()\'>\uC0AD\uC81C</button>\n                </td>\n                <td class=\'text-center\'>\n                    <button class=\'btn form-control btn-info mx-auto\' syle=\'width:77px\' onclick=\'btn.rowEdit()\'>\uC218\uC815</button>\n                </td>\n            </tr>\n                \n        ';
            result.append(html);
        }
    }]);

    return Render;
}();

var Service = function () {
    // 서비스 생성자 
    function Service(server_send_data) {
        _classCallCheck(this, Service);

        this.server_send_data = server_send_data;
    }
    // kostabit admin data 배열 추가 


    _createClass(Service, [{
        key: 'arrayDataPush',
        value: function arrayDataPush(site_agent, userid, rate) {
            this.server_send_data.push({
                site_agent: site_agent,
                userid: userid,
                rate: rate,
                use_yn: 'Y'
            });
        }
    }, {
        key: 'reg',
        value: function reg(item, callback) {
            $.ajax({
                method: "put",
                url: "/inputs/reg",
                data: item
            }).done(function (msg) {
                callback(msg);
            });
        }
    }, {
        key: 'edit',
        value: function edit(item, callback) {
            $.ajax({
                method: "put",
                url: "/inputs/edit",
                data: item
            }).done(function (msg) {
                callback(msg);
            });
        }
    }, {
        key: 'remove',
        value: function remove(item, callback) {
            $.ajax({
                method: "delete",
                url: "/inputs/remove",
                data: item
            }).done(function (msg) {
                callback(msg);
            });
        }
    }, {
        key: 'pageList',
        value: function pageList(page, callback) {
            $.ajax({
                method: "get",
                url: "/inputs/page",
                data: { page: page }
            }).done(function (msg) {
                callback(msg);
            });
        }
    }]);

    return Service;
}();

//made by vipul mirajkar thevipulm.appspot.com


var TxtType = function TxtType(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};