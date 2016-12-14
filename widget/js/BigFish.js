define(['Variate','Tools'],function(Variate,Tools){
	/* 大鱼模块 */
	function BigFish(){
		this.eye = new Image();
		this.body = new Image();
		this.tail = new Image();
		/* 大鱼当前位置 */
		this.x = 400;
		this.y = 300;
		/* 尾巴摆动的图片、时间 */
		this.tailTimer = 0;
		this.tailCount = 0;
		/* 眼睛眨动的图片、时间 */
		this.eyeTimer = 0;
		this.eyeCount = 0;
		/* 身体颜色图片 */
		this.bodyCount = 0;
		/*  */
		this.angle = 0;
		this.type = 0;
	}

	BigFish.prototype.interval = Math.random() * 1500 + 2000;

	/* 绘制大鱼 */
	BigFish.prototype.draw = function(){
		/* 大鱼本身动态效果(身体、眼睛、尾巴) */
		var deltaTime = Math.random()*3 + 15;
		/* 身体变白 */
		if(this.type < 0.2){
			this.body.src = '../widget/image/bigSwimBlue'+ this.bodyCount +'.png';
		}else{
			this.body.src = '../widget/image/bigSwim'+ this.bodyCount +'.png';		
		}
		/* 尾巴摆动 */
		this.tail.src = '../widget/image/bigTail' + this.tailCount + '.png';
		this.tailTimer += deltaTime;
		if(this.tailTimer > 50){
			this.tailCount = (this.tailCount + 1) % 8;
			this.tailTimer = 0;
		}
		/* 眼睛眨动 */
		this.eye.src = '../widget/image/bigEye'+ this.eyeCount +'.png';
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
		/* 大鱼追寻鼠标 */
		Variate.ctx2.save();
		Variate.ctx2.clearRect(0,0,800,600);
		/* 鱼坐标趋近鼠标位置 */
		this.x = Tools.lerpDistance(Variate.mouseX,this.x,0.98);
		this.y = Tools.lerpDistance(Variate.mouseY,this.y,0.98);
		/* 将大鱼位置设置为画布中心，便于旋转 */
		Variate.ctx2.translate(this.x,this.y);
		/* 旋转canvas2画布 */
		this.angle = Math.atan2(Variate.mouseY - this.y,Variate.mouseX - this.x) - Math.PI;
		/* 左手定则 */
		Variate.ctx2.rotate(this.angle);
		/* 在画布正中心绘制大鱼 */
		Variate.ctx2.drawImage(this.body,-this.body.width*0.5,-this.body.height*0.5);
		Variate.ctx2.drawImage(this.tail,-this.tail.width*0.5+30,-this.tail.height*0.5);
		Variate.ctx2.drawImage(this.eye,-this.eye.width*0.5,-this.eye.height*0.5);
		Variate.ctx2.restore();
	}

	return BigFish;
});
