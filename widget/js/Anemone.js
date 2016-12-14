define(['Variate'],function(Variate){
	/* 海葵模块 */
	function Anemone(location,length){
		this.loc = location;
		this.len = length;
		this.amp = Math.random()*50 + 50;
		this.angle = 0;
	}

	/* 画布上绘制海葵 */
	Anemone.prototype.grow = function(){
		var deltaTime = Math.random()*3 + 15;
		this.angle += deltaTime*0.001;
		Variate.ctx1.save();
		Variate.ctx1.beginPath();
		Variate.ctx1.strokeStyle = '#3b154e';
		Variate.ctx1.lineWidth = 20;
		Variate.ctx1.lineCap = 'round';
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
