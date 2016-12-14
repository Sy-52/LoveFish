define(['Variate'],function(Variate){
	/* 果实模块 */
	function Fruit(){
		/* 果实的海葵、图像、类型、成长和上升的速度(静态) */
		this.ane = Variate.ane[Math.floor(Math.random()*50)];
		this.img = new Image();
		this.type = Math.random();	
		this.spd = Math.random() * 0.017 + 0.003;  
		/* 果实的状态、体积、上升位置(动态) */
		this.volume = 0;
		this.alive = true;
		this.lastLoc = 0;
		this.position = 600 - this.ane.len; 
	}

	Fruit.prototype.grow = function(){
		var deltaTime = Math.random()*3 + 15;
		/* 果实类型判断 */
		if(this.type < 0.2){
			this.img.src = '../widget/image/blue.png';
		}else{
			this.img.src = '../widget/image/fruit.png';
		}
		/* 果实生长 */
		if(this.volume < 14){
			this.volume += this.spd * deltaTime;
			Variate.ctx1.drawImage(this.img , this.ane.loc+Math.sin(this.ane.angle)*this.ane.amp-this.volume*0.5 , this.position , this.volume , this.volume);
			this.lastLoc = this.ane.loc  + Math.sin(this.ane.angle)*this.ane.amp - this.volume*0.5;
		}else{
			/* 果实上升 */
			if(this.position > 0){
				this.position -= this.spd * 7 * deltaTime;
				Variate.ctx1.drawImage(this.img,this.lastLoc,this.position,this.volume,this.volume);
			}else{
				this.alive = false;
			}
		}
	}

	return Fruit;
});

