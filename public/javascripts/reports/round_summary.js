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
        for (var i=0; i<msg.length; i++) {
            html += "<tr>" +
                "<td>"+ msg[i].game_id+ "</td>" +
                "<td>"+ msg[i].bet+ "</td>" +
                "<td>"+ msg[i].cash_out+ "</td>" +
                "<td>"+ msg[i].bonus+ "</td>" +
                "<td>"+ msg[i].cnt+ "</td>" +
                "</tr>"
        }
        list.html(html);
    });
};

window.onload = function() {
    var roundSummary = new RoundSummary();
    var date =  $('#reservation').val().split(" - ");
    console.log(date);
    roundSummary.list(date[0]+","+date[1]);
};
