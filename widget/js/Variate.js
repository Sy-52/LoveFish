define(function(){
	/* 画布和画笔 */
	var canvas1,canvas2;
	var ctx1,ctx2;
	/* 海葵、果实、灰尘、大鱼、小鱼、光圈 */
	var ane = new Array(50);
	var fruit = new Array(30);
	var dust = new Array(30);
	var bigFish,smallFish;
	var circle,halo;
	/* 分数 */
	var data;
	/* 鼠标位置 */
	var mouseX = 400,mouseY = 300;
	return {
		ctx1:ctx1,
		ctx2:ctx2,
		ane:ane,
		fruit:fruit,
		dust:dust,
		bigFish:bigFish,
		smallFish:smallFish,
		circle:circle,
		halo:halo,
		data:data,
		mouseX:mouseX,
		mouseY:mouseY,
	}
});