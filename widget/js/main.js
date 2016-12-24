/* requireJS配置 */
require.config({
	baseUrl:'../widget/js'
});
/* 引用模块 */
require(['Variate','Tools','Anemone','Fruit','Dust','BigFish','SmallFish','Halo','Data'],function(Variate,Tools,Anemone,Fruit,Dust,BigFish,SmallFish,Halo,Data){
	/* 主函数模块IIFE */
	(function(){
		/* 初始化 */
		initial();
		/* 预加载图片 */
		preloader();
	})();

	/* 初始化 */
	function initial(){
		Variate.canvas1 = document.getElementsByTagName('canvas')[0];
		Variate.canvas2 = document.getElementsByTagName('canvas')[1];
		Variate.ctx1 = Variate.canvas1.getContext('2d');	
		Variate.ctx2 = Variate.canvas2.getContext('2d');
		/* 海葵初始化 */
		for(var i = 0 ; i < 50 ; i++){
			var x = i*16 + Math.random()*20;
			Variate.ane[i] = new Anemone(x);
		}
		/* 果实初始化 */
		for(i = 0 ; i<30 ; i++){
			/* 每一个果实在50棵海葵中随机找一颗生长 */
			Variate.fruit[i] = new Fruit();
		}
		/* 漂浮物初始化 */
		for(i = 0 ; i<30 ; i++){
			Variate.dust[i] = new Dust();
			Variate.dust[i].dust.src = "../widget/image/dust"+ Math.floor(Math.random()*7) +".png";
		}
		/* 大鱼初始化 */
		Variate.bigFish = new BigFish();
		/* 绑定mousemove事件句柄便于大鱼取得鼠标在画布坐标 */
		Tools.addEvent(Variate.canvas2,'mousemove',onmousemove);
		/* 小鱼初始化 */
		Variate.smallFish = new SmallFish();
		/* 波浪、光圈初始化 */
		Variate.circle = new Halo();
		Variate.halo = new Halo();
		/* 分数初始化 */
		Variate.data = new Data();
		/* 初始化"绘图环境"对象的状态 */
		Variate.ctx1.strokeStyle = '#3b154e';
		Variate.ctx1.lineWidth = 20;
		Variate.ctx1.lineCap = 'round';
	}

	/* 图片预加载 */
	function preloader(){
		/* 预加载图片 */
		var imageObj = new Array();
		var arr = [];
		var count = 0;
		arr.push('../widget/image/background.jpg');
		/* 预加载蓝、橙果实 */
		arr.push('../widget/image/blue.png');
		arr.push('../widget/image/fruit.png');
		/* 预加载灰尘 */
		for(var i = 0;i < 8;i++){
			arr.push('../widget/image/bigSwim'+ i +'.png');
			arr.push('../widget/image/bigSwimBlue'+ i +'.png');
			arr.push('../widget/image/bigTail'+ i +'.png');
			arr.push('../widget/image/babyTail'+ i +'.png');
		}
		for(i = 0;i < 7;i++){
			arr.push('../widget/image/dust'+ i +'.png');
		}
		for(i = 0;i < 2;i++){
			arr.push('../widget/image/bigEye'+ i +'.png');
			arr.push(imageObj.src = '../widget/image/babyEye'+ i +'.png');
		}
		for(i = 0;i < 20;i++){
			arr.push('../widget/image/babyFade'+ i +'.png');
		}
		for(i = 0;i < arr.length;i++){
			imageObj[i] = new Image();
			imageObj[i].src = arr[i];
			imageObj[i].onload = function(){
				count++;
				if(count == 66){
					/* 动态绘制 */
					gameLoop();
				}
				imageObj[i] = null;
			}
		}
	}

	/* 动态绘制 */
	function gameLoop(){
		window.requestAnimationFrame(gameLoop);	
		/* 绘制背景图 */
		drawBackgroundImage();
		/* 绘制海葵 */
		drawAnemone();
		/* 绘制果实 */
		drawFruit();
		/* 绘制灰尘 */
		drawDust();
		/* 绘制大鱼 */
		Variate.bigFish.draw();
		/* 绘制小鱼 */
		Variate.smallFish.draw();
		/* 大鱼吃果实 */
		FruitsCollision();
		/* 大鱼进食时显示光圈 */
		if(Variate.circle.switch)Variate.circle.draw(50,'255,255,255');
		/* 大鱼喂小鱼 */
		FishCollision();
		/* 小鱼进食时显示光圈 */
		if(Variate.halo.switch)Variate.halo.draw(100,'203,91,0');
		/* 分数计算 */ 	
		Variate.data.draw();
	}


	/* 加载背景图 */
	function drawBackgroundImage(){
		var background = new Image();
		background.src = '../widget/image/background.jpg';
		Variate.ctx1.drawImage(background,0,0);		
	}

	/* 绘制海葵 */
	function drawAnemone(){
		for(var i = 0 ; i<50 ; i++){
			Variate.ane[i].grow();
		}
	}

	/* 绘制果实 */
	function drawFruit(){
		var data = 0;
		/* 检测、记录当前所有果实实例中死亡的果实数量 */
		for(var i = 0 ; i<30 ;i++){
			if(Variate.fruit[i].alive == false){
				data++;	
			}
		}
		/* 检测到死亡果实数过半，则生成一个新果实 */
		if(data > 15){
			for(i = 0 ; i<30 ; i++){
				if(Variate.fruit[i].alive == false){
					Variate.fruit[i] = null;
					Variate.fruit[i] = new Fruit();
					break;
				}
			}
		}
		/* 绘制这波浏览器间隔时间内的所有果实 */
		for(i = 0 ; i<30 ; i++){
			if(Variate.fruit[i].alive == true){
				Variate.fruit[i].grow();
			}
		}
	}

	/* 绘制漂浮物 */
	function drawDust(){
		for(var i = 0;i < 30;i++){
			Variate.dust[i].draw();
		}
	}

	/* 获取鼠标位置 */
	function onmousemove(event){
		if(!Variate.data.gameOver){
			var evt = event || window.event;
			var srcObj = evt.target || evt.srcElement;
			/* offsetX只在IE中适用，FF不行。下面是一种兼容方案 */
			Variate.mouseX = (evt.offsetX == undefined) ? evt.clientX - srcObj.getBoundingClientRect().left : evt.offsetX;
			Variate.mouseY = (evt.offsetY == undefined) ? evt.clientY - srcObj.getBoundingClientRect().top : evt.offsetY;
		}
	}
	/* 
	  大鱼、果实碰撞
	  应该是大鱼吃掉果实就计分。因为实际操作中我不可能吃一个果实就喂一次（而且我也没限制只能吃一颗喂一颗） 
	 */
	function FruitsCollision(){
		if(!Variate.data.gameOver){
			for(var i = 0 ; i < 30 ; i++){
				if(Variate.fruit[i].alive == true){
					var deltaX = Math.pow(Variate.bigFish.x - Variate.fruit[i].lastLoc,2);
					var deltaY = Math.pow(Variate.bigFish.y - Variate.fruit[i].position,2);
					if(deltaX + deltaY < 900){
						/* 果实死亡 */
						Variate.fruit[i].alive = false;
						/* 大鱼身体颜色变深 */
						if(Variate.bigFish.bodyCount < 7)Variate.bigFish.bodyCount += 1;
						/* 果实不同大鱼身体颜色亦不同 */
						Variate.bigFish.type = Variate.fruit[i].type;
						/* 分数计算 */
						if(Variate.fruit[i].type < 0.2){
							Variate.data.double = 2;
						}else{
							Variate.data.double = 1;							
						}
						Variate.data.result += Variate.data.double;
						/* 大鱼进食时显示光圈 */
						Variate.circle.x = Variate.fruit[i].lastLoc;
						Variate.circle.y = Variate.fruit[i].position;
						Variate.circle.switch = true;
					}
				}
			}
		}
	}

	/* 大鱼喂小鱼 */
	function FishCollision(){
		if(Math.pow(Variate.bigFish.x - Variate.smallFish.x,2) + Math.pow(Variate.bigFish.y - Variate.smallFish.y,2) < 900){
			if(Variate.bigFish.bodyCount != 0){
				/* 将小大鱼的身体颜色恢复 */
				Variate.bigFish.bodyCount = 0;
				Variate.smallFish.bodyCount = 0;
				Variate.halo.switch = true;
			}
			Variate.halo.x = Variate.smallFish.x;
			Variate.halo.y = Variate.smallFish.y;
		}
	}
});

