$(function () {

    var Number = 20;
    function run() {
        $.ajax({
            url: dataUrl.country,
            data: { productid: Number },
            success: function (data) {
                // console.log(data);
                var result = template('template', data.result[0]);
                $(".wrapper_box>ul").append(result);
            },
            Error: function () {
            }
        })
    }
    for (var i = 0; i < 10; i++) {
        Number++;
        run();
    }
    window.onscroll = function () {
        if(Number>150){
            $('.Page_loading').hide();
            return;
        }
        // console.log(Number);
        for (var i = 0; i < 2; i++) {
            Number++;
            run();
        }
    }
    //返回顶部
    var back = document.querySelector('.back');
    itcast(back).tap(function () {
        window.scrollTo(0, 0);
    })

})



