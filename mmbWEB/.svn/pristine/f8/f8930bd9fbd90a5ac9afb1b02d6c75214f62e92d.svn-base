$(function () {
    $.ajax({
        url: dataUrl.country,
        data: { productid: GetQueryString("id") },
        success: function (data) {
            console.log(data);
            var result = template('template', data.result[0]);
            $('.container').append(result);
        },
        Error: function () {
        }
    })



    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

    var back = document.querySelector('.back');
    itcast(back).tap(function () {
        window.scrollTo(0, 0);
    })
})
