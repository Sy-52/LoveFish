define(function(){
	/* 请求动画帧函数兼容函数 */
	window.requestAnimFrame = (function(){
		return window.requestAnimationFrame ||
			   window.webkitRequestAnimationFrame ||
			   window.mozRequestAnimationFrame  ||
			   function(callback){
			   		window.setTimeout(callback,1000/60);
			   }
	})();

	/* 渐进函数 -- lerpDistance */
	function lerpDistance(aim,cur,ratio){
		return aim + (cur - aim) * ratio;
	}

	/* 事件函数(兼容模式) */
	function addEvent(ele,type,fn){
		if(window.addEventListener){
			ele.addEventListener(type,fn);
		}else if(document.all){
			ele.attachEvent('on' + type,fn);
		}else{
			ele['on'+type] = fn;
		}
	}

	return {
		lerpDistance:lerpDistance,
		addEvent:addEvent,
	}
});