$(function () {
  $.ajax({
    url: 'http://139.199.192.48:9090/api/getindexmenu',
    success: function (data) {
      console.log(data);
      var result = template('template1', data);
      $('.menu-bar').append(result);
    }
  })
  $(".menu-bar").on("click", "..menu-bar>li", function () {
    if ($(this).attr("data-indexmenuId") == 7) {
      $(this).nextAll().toggle();
      return false;
    }
  })
})
// 超值折扣推荐
$(function () {
  $.ajax({
    url: 'http://139.199.192.48:9090/api/getmoneyctrl',
    success: function (data) {
      console.log(data);
      var result = template('template', data);
      $('.index_discount_content>ul').append(result);
    }
  });

  /*返回顶部*/
  var back = document.querySelector('.back');
  back.addEventListener('tap', function () {
    window.scrollTo(0, 0);
  })
  var backtop = document.querySelector('.index1-top');
  console.log(backtop);
  backtop.addEventListener('tap', function () {
    window.scrollTo(0, 0);
  })
})
// 轮播图
Crousel();
function Crousel() {
  // 定义轮播的索引
  var index = 1;
  $(".carousel_ul").css("transform", "translate(-" + index + "0%)");

  // 开启定时器
  var timeId = goInterval();

  // 过渡结束事件 
  $(".carousel_ul").on("transitionend", function () {
    if (index >= 9) {
      // 切换回索引为1 的图片
      index = 1;
      $(".carousel_ul").css({
        "transition": "none",
        "transform": "translate(-" + index + "0%)"
      });
    } else if (index <= 0) {
      index = 8;
      // 瞬间切换是不需要加上过渡效果的
      $(".carousel_ul").css({
        "transition": "none",
        "transform": "translate(-" + index + "0%)"
      });
    }
    // 获取索引器的要激活的索引 
    var liIndex = index - 1;
    $(".carousel_indexer>li").eq(liIndex).addClass("active").siblings().removeClass("active");
  });

  document.querySelector(".carousel").addEventListener("touchstart", function (event) {
    //code here
    event.preventDefault();
  }, false)

  // 开启定时器函数
  function goInterval() {
    return setInterval(function () {
      index++;

      // 让轮播图进行位移--加上过渡效果
      $(".carousel_ul").css({
        "transition": "transform .8s",
        "transform": "translate(-" + index + "0%)"
      });
    }, 1000);
  }
}
// xx
var x = document.getElementById("x");
x.onclick = function () {
  this.parentNode.style.display = "none";
}
// 滑动
$(function () {
  var box_height = $(".index_discount_content").offset().top;
  $(window).scroll(function () {
    var box_scrollTop = $(this).scrollTop();
    if (box_scrollTop > box_height) {
      $(".index_gotop").show();
    } else {
      $(".index_gotop").hide();
    }
  })
})