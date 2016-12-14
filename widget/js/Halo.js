define(['Variate'],function(Variate){
	/* 光圈效果IIFE */
	function Halo(){
		this.x = 0;
		this.y = 0;
		this.r = 0;
		this.switch = false;
		this.alpha = 1;
		this.draw = function(r,color){
			var deltaTime = Math.random()*3 + 15;
			Variate.ctx2.save();
			Variate.ctx2.beginPath();
			Variate.ctx2.lineWidth = 2;
			Variate.ctx2.shadowBlur = 10;
			if(this.r < r){
				this.r += deltaTime*0.05;
				this.alpha = 1 - this.r/r;
			}else{
				this.r = 0;
				this.alpha = 1;
				this.switch = false;
			}
			Variate.ctx2.strokeStyle = "rgba("+ color + "," + this.alpha +")";
			Variate.ctx2.arc(this.x,this.y,this.r,0,Math.PI*2);
			Variate.ctx2.stroke();
			Variate.ctx2.closePath();
			Variate.ctx2.restore();
		}
	}
	return Halo;
});