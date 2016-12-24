define(['Variate','Tools'],function(Variate,Tools){
	/* 小鱼模块 */
	function SmallFish(){
		this.eye = new Image();
		this.body = new Image();
		this.tail = new Image();
		/* 小鱼当前位置 */
		this.x = 350;
		this.y = 350;
		this.angle = 0;
		/* 尾巴摆动的图片、时间 */
		this.tailTimer = 0;
		this.tailCount = 0;
		/* 眼睛眨动的图片、时间 */
		this.eyeTimer = 0;
		this.eyeCount = 0;
		/* 身体颜色图片 */
		this.bodyTimer = 0;
		this.bodyCount = 0;
	}

	SmallFish.prototype.interval = Math.random() * 1500 + 2000;

	/* 在画布上绘制小鱼 */
	SmallFish.prototype.draw = function(){
		/* 小鱼本身动态效果(身体、眼睛、尾巴) */
		var deltaTime = Math.random()*3 + 15;
		/* 身体变白 */
		this.body.src = '../widget/image/babyFade'+ this.bodyCount +'.png';
		this.bodyTimer += deltaTime;
		if(this.bodyTimer > 300){
			if(this.bodyCount == 19){
				this.bodyCount == 19
				Variate.data.gameOver = true;
			}else{
				this.bodyCount += 1;
			}
			this.bodyTimer = 0;
		}
		/* 尾巴摆动 */
		this.tail.src = '../widget/image/babyTail' + this.tailCount + '.png';
		this.tailTimer += deltaTime;
		if(this.tailTimer > 50){
			this.tailCount = (this.tailCount + 1) % 8;
			this.tailTimer = 0;
		}
		/* 眼睛眨动 */
		this.eye.src = '../widget/image/babyEye'+ this.eyeCount +'.png';
		if(this.eyeCount == 0){
			if(this.eyeTimer < this.interval){
				this.eyeTimer += deltaTime;
			}else{
				this.eyeCount = 1;
				this.eyeTimer = 0;
			}
		}else{
			if(this.eyeTimer < 200){
				this.eyeTimer += deltaTime;
			}else{
				this.eyeCount = 0;
				this.eyeTimer = 0;
			}
		}
		/* 小鱼追寻大鱼 */
		Variate.ctx2.save();
		/* 小鱼趋近于大鱼 */
		this.x = Tools.lerpDistance(Variate.bigFish.x,this.x,0.98);
		this.y = Tools.lerpDistance(Variate.bigFish.y,this.y,0.98);
		Variate.ctx2.translate(this.x,this.y);
		//大鱼角度逐渐朝向与鼠标的连线
		this.angle = Math.atan2(Variate.bigFish.y - this.y,Variate.bigFish.x - this.x) + Math.PI;
		/* 左手定则 */
		Variate.ctx2.rotate(this.angle);
		/* 绘制小鱼 */
		Variate.ctx2.drawImage(this.body,-this.body.width*0.5,-this.body.height*0.5);
		Variate.ctx2.drawImage(this.tail,-this.tail.width*0.5+23,-this.tail.height*0.5);
		Variate.ctx2.drawImage(this.eye,-this.eye.width*0.5,-this.eye.height*0.5);
		Variate.ctx2.restore();
	}

	return SmallFish;
});