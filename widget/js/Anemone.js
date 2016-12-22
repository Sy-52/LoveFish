define(['Variate'],function(Variate){
	/* 海葵模块 */
	function Anemone(location){
		this.loc = location;
		this.len = 200 + Math.random()*50;
		this.amp = Math.random()*50 + 50;
		/* 
		  angle用以描述海葵顶端的当前位置。
		  因为angle是每个Anemone实例都需要具有的独立属性，所以不能写在原型对象上作为共有属性。
		*/
		this.angle = 0;
	}

	/* 画布上绘制海葵 */
	Anemone.prototype.grow = function(){
		/* angle每次都会加上一个小于0.018大于等于0.015的值 */
		this.angle += (Math.random()*3 + 15)*0.001;
		/* 在此位置使用save()保存的是之前的绘图环境状态，此后可临时改变ctx对象的属性 */
		Variate.ctx1.save();
		Variate.ctx1.beginPath();
		Variate.ctx1.globalAlpha = 0.6;
		Variate.ctx1.moveTo(this.loc,600);
		Variate.ctx1.quadraticCurveTo(this.loc,500,this.loc + Math.sin(this.angle)*this.amp,600-this.len);
		Variate.ctx1.stroke();
		Variate.ctx1.restore();
		/* 控制变量大小 */
		if(this.angle > 2*Math.PI){
			this.angle = 0;
		}
	}
	return Anemone;
});
