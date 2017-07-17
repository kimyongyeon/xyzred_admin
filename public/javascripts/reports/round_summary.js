function RoundSummary() {
    var _this = this;
    $('#reservation').val(new Date() , new Date());
    $('#reservation').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD'
        }
    }, function(start, end, label) {
        var start = start.toISOString().split("T")[0];
        var end = end.toISOString().split("T")[0];
        console.log(start, end);
        _this.list(start+","+end);
    });
}

RoundSummary.prototype.list = function(searchName) {
    $.ajax({
        method: "get",
        url: "/round_rest/searchList",
        data: { searchName: searchName }
    })
    .done(function( msg ) {
        var list = $("#round_list > tbody");
        var html = "";
        var margin_sum = 0;
        for (var i=0; i<msg.length; i++) {

            var bet = Math.floor(msg[i].bet);
            var cash_out = Math.floor(msg[i].cash_out == null ? 0 :  msg[i].cash_out   );
            var bonus = Math.floor(msg[i].bonus == null ? 0 : msg[i].bonus);
            var margin = bet - cash_out - bonus;
            margin_sum = margin_sum + margin;
            console.log("margin_sum",margin_sum, margin);

            html += "<tr>" +
                "<td>"+ msg[i].game_id+ "</td>" +
                "<td>"+ bet + "</td>" +
                "<td>"+ cash_out + "</td>" +
                "<td>"+ bonus + "</td>" +
                "<td>"+ margin + "</td>" +
                "<td>"+ msg[i].cnt+ "</td>" +
                "</tr>"
        }

        html += "<tr><td colspan='4'>합계</td><td >"+margin_sum+"</td><td></td></tr>";
        list.html(html);
    });
};

window.onload = function() {
    var roundSummary = new RoundSummary();
    var date =  $('#reservation').val().split(" - ");
    console.log(date);
    roundSummary.list(date[0]+","+date[1]);
};
