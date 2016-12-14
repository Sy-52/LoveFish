define(['Variate'],function(Variate){
	/* 数值计算模块 */
	function Data(){
		/* 控制加的分数 */
		this.double = 1;
		/* 结果 */
		this.result = 0;
		/* 是否结束游戏 */
		this.gameOver = false;
		/* 笔的透明度 */
		this.alpha = 0;
	}

	Data.prototype.draw = function(){
		var deltaTime = Math.random()*3 + 15;
		Variate.ctx1.save();
		Variate.ctx1.font = "30px Verdana";
		Variate.ctx1.textAlign = "center";
		Variate.ctx1.shadowBlur = 10;
		Variate.ctx1.shadowColor = "white";
		Variate.ctx1.fillStyle = "white";	
		Variate.ctx1.fillText("SCORE: " + this.result,400,580);
		if(this.gameOver){
			if(this.alpha > 1){
				this.alpha = 1;
			}
			if(this.alpha < 1){
				this.alpha = this.alpha + deltaTime*0.0005;
			}
			Variate.ctx1.fillStyle = "rgba(255,255,255," + this.alpha + ")";	
			Variate.ctx1.fillText("GAME OVER",400,300);
		}
		Variate.ctx1.restore();
	}
	return Data;
});