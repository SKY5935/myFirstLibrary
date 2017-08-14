/**
 * 获取浏览器宽度
 * 返回值是一个对象
 */
function client() {

	if (window.innerWidth != undifined) { //是否支持该属性
		return {
			width: window.innerWidth,
			height: window.innerHeight
		}
	} else if (document.compatMode == "CSS1compat") { //判断有无dtd约束
		return {
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight
		}
	} else { //没有dtd约束
		return {
			width: document.body.clientWidth,
			height: document.body.clientHeight
		}
	}
}

/**
 * 获取页面被卷去的位置 
 */
function scroll() {
	return {
		left: window.pageXOffset || document.documentElement.scrollLeft,
		top: window.pageYOffset || document.documentElement.scrollTop
	}
}

/**
 * 普通绑定事件防层叠的办法
 * @param {*dom元素} ele 
 * @param {*事件名} eve 
 * @param {*函数体} fn 
 */
function listener(ele, eve, fn) {

	//先保存老事件    
	var oldEve = ele["on" + eve];
	ele["on" + eve] = function () {
		oldEve(); //先执行老事件在执行新事件
		fn();
	}
}
/**
 * 绑定事件的兼容封装
 * @param {*} ele 
 * @param {*} eve 
 * @param {*} fn 
 */
function addEvent(ele, eve, fn) {

	if (ele.addEventListener) {
		ele.addEventListener(eve, fn);
	} else if (ele.attachEvent) {
		ele.attachEvent("on" + eve, fn)
	} else {
		listener(ele, eve, fn);
	}
}

/**
 * 事件解绑的兼容封装
 * @param {*} ele 
 * @param {*} eve 
 * @param {*} fn 
 */
function removeEvent(ele, eve, fn) {

	if (ele.removeEventListener) {
		ele.removeEventListener(eve, fn);
	} else if (ele.detachEvent) {
		ele.detachEvent("on" + eve, fn);
	} else {
		ele["on" + eve] = null;
	}
}


/**
 * 移动端触摸事件及滑动事件封装
 * @param {*} ele 
 */
function itcast(ele) {

	var obj = {
		tap: function (callback) {
			var startX, startY, startTime;
			//绑定手指触摸事件
			ele.addEventListener("touchstart", function (event) {
				event = event || window.event;
				//判断手指个数
				if (event.targetTouches.length > 1) {
					return;
				}
				//记录手指按下的位置
				startX = event.targetTouches[0].clientX;
				startY = event.targetTouches[0].clientY;
				//记录手指按下的时间
				startTime = Date.now();
			})
			//绑定手指弹起事件
			ele.addEventListener("touchend", function (event) {
				event = event || window.event;
				//判断手指个数
				if (event.changedTouches.length > 1) {
					return;
				}
				//弹起位置及时间
				var endX = event.changedTouches[0].clientX;
				var endY = event.changedTouches[0].clientY;
				var endTime = Date.now();
				//判断手指的运动距离，大于5px就不是点击了
				if (Math.abs(endX - startX) > 5) {
					return;
				}
				if (Math.abs(endY - startY) > 5) {
					return;
				}
				if (endTime - startTime > 300) {
					return;
				}
				//如果执行到这，说明是一个点击事件，需要执行我们的代码，
				//又是我们需要将这个事件的一些信息传出去，所以在后面写了一个参数
				callback(event);
			})
		},
		//滑动事件
		swiper: function (callback) {
			var startX, startY, startTime, direction;
			ele.addEventListener("touchstart", function (e) {
				e = e || window.event;
				//判断手指个数
				if (e.targetTouches.length > 1) {
					return;
				}
				//记录位置和时间
				startX = e.targetTouches[0].clientX;
				startY = e.targetTouches[0].clientY;
				startTime = Date.now();
			})
			ele.addEventListener("touchend", function (e) {
				e = e || window.event;
				//判断手指个数
				if (e.changedTouches.length > 1) {
					return;
				}
				//获取位置
				var endX = e.changedTouches[0].clientX;
				var endY = e.changedTouches[0].clientY;
				var endTime = Date.now();
				//判断时间
				if (endTime - startTime > 800) {
					return;
				}
				//判断方向
				if (Math.abs(endX - startX) > 5) {
					direction = endX > startX ? "right" : "left";
				} else if (Math.abs(endY - startY) > 5) {
					direction = endY > startY ? "bottom" : "top";
				} else {
					return;
				}
				//如果执行到这，说明满足滑动，执行我们的逻辑
				ccallback(direction);
			})
		}
	};
	return obj;
}