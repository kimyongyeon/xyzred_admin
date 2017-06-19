'use strict';

'develope ver 1.0'

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
    
    var server_send_data = [];
    window.btn = new Button(server_send_data);

});

class Button {

    // Button 클래스 생성자 
    constructor(server_send_data) {
        this.server_send_data = server_send_data;
        this.service = new Service(server_send_data);
        this.render = new Render();
    }
    // 등록
    reg () {
        console.log("reg click..");
    }
    // 삭제
    remove () {
        console.log("remove click..");
    }
    // 수정
    edit () {
        console.log("edit click..");
    }
    // 취소 
    cancel () {
        console.log("cancel click..");
    }
    // 더보기 
    moreList () {
        console.log("moreList click");
        var totCnt = $("#btn_page").attr('totCnt');
        var perPage = $("#btn_page").attr('perPage');
        var pageLimit = Math.floor(totCnt / perPage);
        var page = Math.floor($("#btn_page").val());
        if (pageLimit > page) {
            console.log(pageLimit);
            location.href = '/inputs?page=' + (page + 1);
        }
    }
    // 처음으로 
    firstList () {
        console.log("firstList click");
        location.href = '/inputs?page=' + 1;
    }
    // 마지막으로 
    lastList() {
        console.log("lastList click");
        var totCnt = $("#btn_page").attr('totCnt');
        var perPage = $("#btn_page").attr('perPage');
        var pageLimit = Math.floor(totCnt / perPage);
        location.href = '/inputs?page=' + pageLimit;
    }
    // 상세보기 
    detail (item) {
        item = JSON.parse(item);
        $("#_id-input").val(item._id);
        $("#agent-input").val(item.site_agent);
        $("#referer-input").val(item.referer);
    }
    // 서버 전송
    serverSend () {
        console.log("서버전송" + $("#result_set > tbody > tr ").length);

        if ($("#result_set > tbody > tr ").length > 0) {
            $("#alert_server > strong").html("서버 전송 완료");
            $("#alert_server").fadeIn();
            $("#result_set > tbody > tr ").hide(3000);
            $("#result_set > tbody ").empty();

            console.log(this.server_send_data);

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
    rowAllRemove() {
        $("#result_set > tbody").empty();
    }
    // 행 삭제
    rowRemove() {
        console.log("행삭제");
    }
    // 행 수정
    rowEdit() {
        console.log(com);
        console.log("행수정");
    }
    // crash 추가 버튼
    crashAdd () {
        var site_agent = $("input[name=crash_site_agent]").val();
        var userid = $("input[name=crash_userid]").val();
        var rate = $("input[name=crash_rate]").val();
        console.log("crash", site_agent, userid, rate);
        this.render.resultTableAddRowDisplay(site_agent, userid, rate);
        this.service.arrayDataPush(site_agent, userid, rate);
    }
    // risk 추가 버튼 
    riskAdd () {
        var site_agent = $("input[name=risk_site_agent]").val();
        var userid = $("input[name=risk_userid]").val();
        var rate = $("input[name=risk_rate]").val();
        console.log("risk", site_agent, userid, rate);
        this.render.resultTableAddRowDisplay(site_agent, userid, rate);
        this.service.arrayDataPush(site_agent, userid, rate);
    }
    
    
}

class Render {
    // 서버 전송 대기 데이터 행 추가 
    resultTableAddRowDisplay (site_agent, userid, rate) {
        var result = $("#result_set > tbody");
        var tr = $("#result_set > tbody > tr");
        var index = tr.length + 1;

        var html = `
            <tr><td class='text-cetner'>${index}</td>
                <td class='text-cetner'>${site_agent}</td>
                <td class='text-cetner'>${userid}</td>
                <td class='text-cetner'>${rate}</td>
                <td class='text-cetner'><button class='btn form-control btn-info mx-auto' syle='width:77px'  onclick='btn.rowRemove()'>삭제</button></td>
                <td class='text-cetner'><button class='btn form-control btn-info mx-auto' syle='width:77px'  onclick='btn.rowEdit()'>수정</button></td>
            </tr>
                
        `;
        result.append(html);
    }
}

class Service {
    // 서비스 생성자 
    constructor(server_send_data) {
        this.server_send_data = server_send_data;
    }
    // kostabit admin data 배열 추가 
    arrayDataPush (site_agent, userid, rate) {
        this.server_send_data.push({
            site_agent: site_agent,
            userid: userid,
            rate: rate,
            use_yn: 'Y'
        });
    }
}

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

// function fnPaging() {
//     var totCnt = $("#btn_page").attr('totCnt');
//     var perPage = $("#btn_page").attr('perPage');
//     var pageLimit = Math.floor(totCnt / perPage);
//     var page = Math.floor($("#btn_page").val());
//     if (pageLimit > page) {
//         console.log(pageLimit);
//         location.href = '/inputs?page=' + (page + 1);
//     }
// }

// function fnFirstPaging() {
//     location.href = '/inputs?page=' + 1;
// }

// function fnLastPaging() {
//     var totCnt = $("#btn_page").attr('totCnt');
//     var perPage = $("#btn_page").attr('perPage');
//     var pageLimit = Math.floor(totCnt / perPage);
//     location.href = '/inputs?page=' + pageLimit;
// }

// function fnDetail(item) {
//     item = JSON.parse(item);
//     $("#_id-input").val(item._id);
//     $("#agent-input").val(item.site_agent);
//     $("#referer-input").val(item.referer);
// }

// function fn1() {
//     var site_agent = $("input[name=crash_site_agent]").val();
//     var userid = $("input[name=crash_userid]").val();
//     var rate = $("input[name=crash_rate]").val();
//     console.log("crash", site_agent, userid, rate);
//     result_add(site_agent, userid, rate);
//     arrayDataPush(site_agent, userid, rate);
// }

// function arrayDataPush(site_agent, userid, rate) {
//     server_send_data.push({
//         site_agent: site_agent,
//         userid: userid,
//         rate: rate,
//         use_yn: 'Y'
//     });
// }

// function server_send() {
//     console.log("서버전송" + $("#result_set > tbody > tr ").length);

//     if ($("#result_set > tbody > tr ").length > 0) {
//         $("#alert_server > strong").html("서버 전송 완료");
//         $("#alert_server").fadeIn();
//         $("#result_set > tbody > tr ").hide(3000);
//         $("#result_set > tbody ").empty();

//         console.log(server_send_data);

//         var result = $.post("/reg_agent", {
//             msg: JSON.stringify(server_send_data)
//         }).done(function (data) {
//             console.log(data);
//         });

//         // 초기화 
//         server_send_data = [];
//     } else {
//         $("#alert_server > strong").html("전송할 데이터가 없습니다.");
//         $("#alert_server").fadeIn();
//         $("#result_set > tbody ").empty();
//     }
// }

// function fnAllRemove() {
//     $("#result_set > tbody").empty();
// }

// function result_clear() {
//     $("#result_set > tbody").empty();
// }

// function result_add(site_agent, userid, rate) {

//     var result = $("#result_set > tbody");
//     var tr = $("#result_set > tbody > tr");
//     var index = tr.length + 1;
//     var html = '<tr>\n                    <td class=\'text-center\'>' + index + '</td>\n                    <td class=\'text-center\'>' + site_agent + '</td>\n                    <td class=\'text-center\'>' + userid + '</td>\n                    <td class=\'text-center\'>' + rate + '</td>\n                    <td class=\'text-center\'>Y</td>\n                    <td class=\'text-center\'>\n                        <button class=\'btn form-control btn-info mx-auto\' style=\'width:77px\'  onclick=\'fnRowRemove()\'>\uC0AD\uC81C</button>\n                    </td>\n                    <td class=\'text-center\'>\n                        <button class=\'btn form-control btn-info mx-auto\' style=\'width:77px\'  onclick=\'fnRowEdit()\'>\uC218\uC815</button>\n                    </td>\n                </tr>';
//     result.append(html);
// }

// var server_send_data = [];

// function fn2() {
//     var site_agent = $("input[name=risk_site_agent]").val();
//     var userid = $("input[name=risk_userid]").val();
//     var rate = $("input[name=risk_rate]").val();
//     console.log("risk", site_agent, userid, rate);
//     result_add(site_agent, userid, rate);
//     arrayDataPush(site_agent, userid, rate);
// }
