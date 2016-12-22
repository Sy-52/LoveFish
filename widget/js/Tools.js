define(function(){
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