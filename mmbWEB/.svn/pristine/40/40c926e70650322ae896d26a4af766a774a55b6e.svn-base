$(function () {
    $.ajax({
        url: "http://139.199.192.48:9090/api/getcoupon",
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            $(".items").append(template('merchant_template', data));

            for (var i = 0; i < data.result.length; i++) {
                $(".item")[i].shopid = data.result[i].couponId;
                console.log(data.result[i].couponId);
            }
        }
    });
})