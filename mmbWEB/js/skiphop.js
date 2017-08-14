/**
 * Created by rensheng on 2017-08-02.
 */

$(function() {

    $('#skiphop_back').click(function() {
        history.back();
    })

    //商品列表
    getShopList();


    // 店铺下拉框

    $.ajax({
        url: 'http://139.199.192.48:9090/api/getgsshop',
        success: function(data) {
            console.log(data);
            var tem_shop = template('templates1', data);
            $('.skiphop_shop>ul').html(tem_shop);
        }
    });

    //点击加载对应店铺数据
    var shopid;
    $('.skiphop_shop').on('click', 'li', function() {
        shopid = $(this).attr('data-shopid');
        console.log(shopid);
        $(this).addClass('sp_draw').siblings().removeClass('sp_draw');
        var cont = $(this).text();
        $('#skiphop_shop>a').text(cont);
        $('.skiphop_shop').slideUp(300);
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getgsproduct',
            data: {
                shopid: shopid,
                areaid: Number
            },
            success: function(data) {
                console.log(data);
                var tem = template('templates', data);
                $('.skiphop_list').html(tem);
            }
        })
    })


    //区域下拉框
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getgsshoparea',
        success: function(data) {
            console.log(data);
            var tem_area = template('templates2', data);
            $('.skiphop_area>ul').html(tem_area);
            $('#area_draw').addClass('sp_draw');
        }
    });

    $('.skiphop_area').on('click', 'li', function() {
        var areaid = $(this).attr('data-shopid');
        console.log(areaid);
        $(this).addClass('sp_draw').siblings().removeClass('sp_draw');
        var cont = $(this).text();
        $('#skiphop_area>a').text(cont);
        $('.skiphop_area').slideUp(300);

        $.ajax({
            url: 'http://139.199.192.48:9090/api/getgsproduct',
            data: {
                shopid: Number,
                areaid: areaid
            },
            success: function(data) {
                console.log(data);
                var tem = template('templates', data);
                $('.skiphop_list').html(tem);
            }
        })
    });

    //价格下拉框

    $('.skiphop_priceDown').on('click', 'li', function() {
        // var shopid = $(this).attr('data-shopid');
        $(this).addClass('sp_draw').siblings().removeClass('sp_draw');
        var cont = $(this).text();
        $('#skiphop_priceDown>a').text(cont);
        $('.skiphop_priceDown').slideUp(300);
        // $('#sm_drop>li').find("span").removeClass('glyphicon-triangle-top').addClass('glyphicon-triangle-bottom');

    });
    //筛选框
    $('#sky_right').click(function() {
        $('#skiphop_filtrate').toggle(300);
        $('#sky_right').toggleClass('glyphicon-remove');
    });

    //排序
    //分类
    $('.clearfix').on('click', 'a', function() {
        $(this).addClass('sort_links').siblings().removeClass('sort_links');
    })

    $('.sp_drop_down').on('click', function() {
            $('#sm_drop>li').find("span").removeClass('glyphicon-triangle-top').addClass('glyphicon-triangle-bottom');
        })
        //下拉框
    $('#sm_drop').on('click', 'li', function() {
        // console.log($(this).index());
        $('.sp_drop_down').eq($(this).index()).siblings().hide();
        $('.sp_drop_down').eq($(this).index()).slideToggle();
        $('.triangle').eq($(this).index()).toggleClass('glyphicon-triangle-top').toggleClass('glyphicon-triangle-bottom');
        $('#sm_drop>li').eq($(this).index()).siblings().find("span").removeClass('glyphicon-triangle-top').addClass('glyphicon-triangle-bottom');
    });

});

function getShopList() {
    $.ajax({
        // url:dataUrl.skiphop_list,
        url: 'http://139.199.192.48:9090/api/getgsproduct',
        data: {
            shopid: Number,
            areaid: Number
        },
        success: function(data) {
            console.log(data);
            var tem = template('templates', data);
            $('.skiphop_list').html(tem);
        }
    });
}