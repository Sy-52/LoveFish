define(['Variate'],function(Variate){
	/* 漂浮物模块 */
	function Dust(){
		this.x = Math.random()*800;
		this.y = Math.random()*600;
		this.dust = new Image();
		this.amp = 20 + Math.random()*25;
		this.angle = 0;
	}

	Dust.prototype.draw = function(){
		this.angle += 0.001*(Math.random()*3 + 15);
		Variate.ctx1.drawImage(this.dust,this.x + Math.sin(this.angle)*this.amp,this.y);
		/* 控制变量大小 */
		if(this.angle > 2*Math.PI){
			this.angle = 0;
		}
	}
	return Dust;
});