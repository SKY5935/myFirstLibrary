
$(function () {
    $(window).scroll(function () {
        //$(document).height()  页面的高度  $(window).scrollTop() 页面被卷去的高度 $(window).height() 屏幕可视区域的高度
        var scrollHeight = $(document).height() - $(window).scrollTop();
        if ($(window).scrollTop() > 500) {
            $(".rocket").show();
        } else {
            $(".rocket").hide();
        }

        //当页面的高度减去页面被卷去的高度之差等于屏幕的高度的时候，表示已经滚到底部了，此时就需要再次向服务器请求数据并渲染到页面上
        if (scrollHeight == $(window).height()) {
            $.ajax({
                url: "http://139.199.192.48:9090/api/getbaicaijiaproduct",
                data: {
                    titleid: 0
                },
                success: function (data) {
                    // console.log(data);
                    $(".LP_goodsList").append(template("goodsList", data));
                }
            })
        }
    })


    //tab切换
    $(".LP_nav>ul").on("tap", "li", function () {
        // $(window).scrollTop(0);
        var titleId = $(this).attr("data-id");
        $(this).children().addClass("active").parent().siblings().children().removeClass("active");
        if ($(window).scrollTop() > 500) {
            $(".rocket").show();
        } else {
            $(".rocket").hide();
        }
        //请求数据
        $.ajax({
            url: "http://139.199.192.48:9090/api/getbaicaijiaproduct",
            data: {
                titleid: titleId
            },
            success: function (data) {
                // console.log(data);
                $(".LP_goodsList").html(template("goodsList", data));
            }
        })
        //

        //页面滚动是请求数据加载页面
        // $(window).scroll(function () {
        //     // console.log(123);
        //     // $(".rocket").show();
        //     if ($(window).scrollTop() > 1000) {
        //         $.ajax({
        //             url: "http://139.199.192.48:9090/api/getbaicaijiaproduct",
        //             data: {
        //                 titleid: titleId
        //             },
        //             success: function (data) {
        //                 console.log(data);
        //                 $(".LP_goodsList").append(template("goodsList", data));
        //             }
        //         })
        //     }
        // })
    })

    //手指滑动事件
    //获取元素
    var ul = document.querySelector(".LP_nav>ul");
    // console.log(ul);
    // if (ul.parentNode.offsetWidth < 800) {
    //      console.log(ul.parentNode.offsetWidth);
    //     mySwiper();

    // }
    mySwiper();
    function mySwiper() {
        //记录手指按下时的坐标
        var startX;
        //记录以前一共移动了的距离，初始化的时候，让它等于0
        var preDistance = 0;
        //定义弹簧的长度
        var springs = 50;
        //最大左滑的距离
        var maxLeft = -(ul.offsetWidth - ul.parentNode.offsetWidth);
        // endX = e.changedTouches[0].clientX;
        // startX = e.targetTouches[0].clientX;

        // if (ul.parentNode.offsetWidth > 800) {
        //     // ul.style.transition = "none";
        //     // ul.style.transform = "none";
        //     return;
        // }
        ul.addEventListener("touchstart", function (e) {
            if (e.targetTouches.length > 1 || ul.parentNode.offsetWidth > 800) {
                return;
            }
            //记录手指按下位置
            startX = e.targetTouches[0].clientX;
            //清除过渡效果
            ul.style.transition = "none";
        })

        ul.addEventListener("touchmove", function (e) {
            if (e.targetTouches.length > 1) {
                return;
            }
            //记录当前的x坐标
            var moveX = e.targetTouches[0].clientX;
            //当前移动的距离
            var distance = moveX - startX + preDistance;
            //判断下拉的高度时候超出了弹簧的长度
            if (distance > springs) {
                distance = springs;
            } else if (distance < maxLeft - springs) {
                distance = maxLeft - springs;
            }
            //将这个距离设置到ul里面
            ul.style.transform = "translateX(" + distance + "px)";
        });

        ul.addEventListener("touchend", function (e) {
            // 判断手指的个数
            if (e.changedTouches.length > 1) {
                return;
            }

            //记录手指离开时的坐标
            var endX = e.changedTouches[0].clientX;
            //上一次移动的距离，手指松开的时候，还需要记录自己至之前移动
            preDistance = endX - startX;
            //判断距离的大小
            if (preDistance > 0) {
                preDistance = 0;
                //设置位移 添加过度
                ul.style.transition = "transform .3s";
                ul.style.transform = "translateX(" + preDistance + "px)";
            } else if (preDistance < maxLeft) {
                preDistance = maxLeft;
                //设置位移 添加过度
                ul.style.transition = "transform .3s";
                ul.style.transform = "translateX(" + preDistance + "px)";
            }
        })

    }

    //点击切换显示隐藏
    $(".LP_nav_search").on("tap", function () {
        // $(".LP_searchBar").show();
        // $("this").html("&#xe65f;")
        $(this).hide();
        $(".LP_nav_search2").show();
        $(".LP_searchBar").show();
    })

    $(".LP_nav_search2").click(function () {
        $(this).hide();
        $(".LP_nav_search").show();
        $(".LP_searchBar").hide();
    })


    //返回顶部
    $(".rocket").on("tap", function () {
        $("body").animate({
            scrollTop: 0
        }, 500)
    })

    $(".LP_bottom ul li:nth-child(3)").on("tap", function () {
        $("body").animate({
            scrollTop: 0
        }, 500)
    })

    //返回首页
    $(".LP_back ").click(function () {
        history.back();
    })

})

