$(document).ready(function(){
	let lastDisplay = [];
	let timer = setInterval(bounceAnimate, 700);

	navPosition();
	firstBounce();
	bounceStop();
	
/*	$("nav li span:eq(0)").css({
		"top": "-50%",
		"left": "0%"
	});
	
	$("nav li span:eq(1)").css({
		"top": "-150%",
		"left": "0%"
	});
	
	$("nav li span:eq(2)").css({
		"top": "-300%",
		"left": "0%"
	});
	
	$("nav li span:eq(3)").css({
		"top": "-400%",
		"left": "0%"
	});
	
	$("nav li span:eq(0)").css({
		"top": "-50%",
		"left": "0%"
	});*/
	
/*********************************************/
/*自訂函式*/	
	
	/* 抽取隨機亂數 */
	function randomNum() {
		let ranNum = Math.random();
		return ranNum;
	}
	
	/* 第一次的彈跳動畫
	   需確認第一次往上/往下彈分成兩個函式
	   firstBounce() & bounceAnimate() */
	function firstBounce() {
		let firstDisplay = [];
		let time = [];
		const len = $("#fakeNav span").length;
		
		for( let i = 0; i < len; i++) {
			/* 抽取位置的亂數，並控制位移範圍 */
			do {
				firstDisplay[i] = randomNum() * 100;
			} while (firstDisplay[i] <= 35 || firstDisplay[i] >= 65);
			
			/* 抽取動畫時間的亂數，控制時間範圍，讓每組動畫時間不一 */
			do {
				time[i] = randomNum() * 1200;
			} while (time[i] <= 700 || time[i] >= 1100);
		}
		
		for( let i = 0; i < len; i++) {
			lastDisplay[i] = firstDisplay[i];
			$("#fakeNav span:eq(" + i + ")").animate({top: firstDisplay[i] + "%"}, time[i]);
		}
	}
	
	function bounceAnimate() {
		let display = [];
		let time = [];
		const len = $("#fakeNav span").length;
		
		for( let i = 0; i < len; i++) {
			/* 若前一次位置(lastDisplay)>50  (向上移動) */
			/* 則此次位置向下 */
			if(lastDisplay[i] > 50) {
				do {
					display[i] = randomNum() * 100;
				} while (display[i] <= 35 || display[i] >= 50);

				do {
					time[i] = randomNum() * 1200;
				} while (time[i] <= 700 || time[i] >= 1100);
				
				lastDisplay[i] = display[i];
			} 
			
			/* 若前一次位置(lastDisplay)<50  (向下移動) */
			/* 則此次位置向上 */
			else if(lastDisplay[i] <= 50) {
				do {
					display[i] = randomNum() * 100;
				} while(display[i] <= 50 || display[i] >= 65);

				do {
					time[i] = randomNum() * 1200;
				} while (time[i] <= 700 || time[i] >= 1100);
				
				lastDisplay[i] = display[i];
			}			
		}
		
		for( let i = 0; i < len; i++) {
			$("#fakeNav span:eq(" + i + ")").animate({top: display[i] + "%"}, time[i]);
		}
	}

	function bounceStop() {		
		$("#fakeNav a, #fakeNav span").one("click", function(){
			clearInterval(timer);
			$("#fakeNav span").each(function(){
				$("#fakeNav span").stop(true);
			});
			$("#membrane").css("height", "100vh");
			$("#membrane").css("width", "100vw");
			navFullback();
		});
	}
	
	function navPosition(){
		let pos = [];
		const len = $("#fakeNav span").length;
		
		for( let i = 0; i < len; i++) {
			do {
				pos[i] = randomNum() * 100;
			} while(pos[i] >= 30);
			
			if( i % 2 == 0) {
				$("#fakeNav span:eq("+ i +")").css("left", pos[i] + "%");
			} else {
				$("#fakeNav span:eq("+ i +")").css("left", "-" + pos[i] + "%");	
			}
		}
	}
	
	/*倒退嚕*/
	function navFullback() {
		let animateTime = 250;
		let intervalTime = (animateTime/10)-1;
		let degree = 0;
		let deformDegree = 0;

		let rotate = setInterval(function(){
			$("#fakeNav li:odd span").css("transform", "rotateZ(" + degree + "deg) skewX(" + deformDegree + "deg)");
			$("#fakeNav li:even span").css("transform", "rotateZ(-" + degree + "deg) skewX(-" + deformDegree + "deg)");
			degree++;
			deformDegree += 2.5;
			if( degree > 10) {
				clearInterval(rotate);
			}
		}, intervalTime);
		
		$("#fakeNav li:even span").animate({
			left: "+=10%",
			top: "-=10%"
		}, animateTime);
		$("#fakeNav li:odd span").animate({
			left: "-=10%",
			top: "-=10%"
		}, animateTime);

		navFirstForward();
 	}
	
	/*前進*/
	function navFirstForward() {
		let time = 700;
		let firstLeft = [-180, 180, -180, 180];
		let firstTop = [150, 150, 150, 150];
		
		if($(window).width >= 768) {
			time = 2000;
		}
		
		$("#fakeNav span:eq(0)").animate({
			left: firstLeft[0] + "%",
			top: firstTop[0] + "%"
		}, time);
		
		$("#fakeNav span:eq(1)").animate({
			left: firstLeft[1] + "%",
			top: firstTop[1] + "%"
		}, time);
		
		$("#fakeNav span:eq(2)").animate({
			left: firstLeft[2] + "%",
			top: firstTop[2] + "%"
		}, time);
		
		$("#fakeNav span:eq(3)").animate({
			left: firstLeft[3] + "%",
			top: firstTop[3] + "%"
		}, time, function(){
			navMove(firstLeft, firstTop, 0, 1);
		});
	}
	
	function navMove(firstLeft, firstTop, freq, flag) {
		let secondLeft = [];
		let secondTop = [];
		let rotateDeg = [];
		let fontSize = [];
		let time = [];
		let degree = 180;
		
		for(let i = 0; i < $("#fakeNav span").length; i++){
			do {
				secondLeft[i] = randomNum() * 200;
			} while ( secondLeft[i] < 180);
			
			do {
				fontSize[i] = randomNum() * 300;
			} while ( fontSize[i] < 50);
			
			if($(window).width() < 768) {
				do {
					time[i] = randomNum() * 1600;
				} while ( time[i] < 1200);
			} else {
				do {
					time[i] = randomNum() * 3200;
				} while ( time[i] < 2500);
			}
			
			
			if( i == 0 || i == 1 ) {
				secondTop[i] = randomNum() * 300;
			}
			
			if( i == 2 || i == 3) {
				secondTop[i] = -(randomNum() * 300);
			}
			
			// flag = 0 為正面, flag = 1 轉為背面
			if( flag == 0 && i % 2 == 0){ 			// left -+-+ 負往左 正往右
				secondLeft[i] = -secondLeft[i];
			} else if( flag == 1 && i % 2 != 0){	// left +-+-
				secondLeft[i] = -secondLeft[i];
			}
			
			rotateDeg[i] = findDegree(firstLeft[i], secondLeft[i], firstTop[i], secondTop[i]);
			
			// 因為rotateZ轉的角度方向(逆時針)，在nav往右移動時要加上負號(順時針)
			// 翻為"背面"的情況下, rotateZ轉的角度方向相反(順時針)，所以背面時向左移動的nav須加上負號調整方向(逆時針)
			if(secondLeft[i] > 0 && flag == 0) {
				rotateDeg[i] = -rotateDeg[i];
			} else if(secondLeft[i] < 0 && flag == 1) {
				rotateDeg[i] = -rotateDeg[i];
			}
			
		}
		
		if(flag == 0) {
			degree = 0;
			flag = 1
		} else {
			flag = 0;
		}
		
		for( let i = 0; i < $("#fakeNav span").length; i++ ) {
			firstLeft[i] = secondLeft[i];
			firstTop[i] = secondTop[i];
		}
			
		$("#fakeNav li span:eq(0)").css("transform", "rotateY(" + degree + "deg) rotateZ(" + rotateDeg[0] + "deg)");
		$("#fakeNav li span:eq(1)").css("transform", "rotateY(" + degree + "deg) rotateZ(" + rotateDeg[1] + "deg)");
		$("#fakeNav li span:eq(2)").css("transform", "rotateY(" + degree + "deg) rotateZ(" + rotateDeg[2] + "deg)");
		$("#fakeNav li span:eq(3)").css("transform", "rotateY(" + degree + "deg) rotateZ(" + rotateDeg[3] + "deg)");
		
		$("#fakeNav li span:eq(0)").css("font-size", fontSize[0] + "%");
		$("#fakeNav li span:eq(1)").css("font-size", fontSize[1] + "%");
		$("#fakeNav li span:eq(2)").css("font-size", fontSize[2] + "%");
		$("#fakeNav li span:eq(3)").css("font-size", fontSize[3] + "%");
		
		console.log("0: " + rotateDeg[0] + "/n");
		console.log("1: " + rotateDeg[1] + "/n");
		console.log("2: " + rotateDeg[2] + "/n");
		console.log("3: " + rotateDeg[3] + "/n");
		
		$("#fakeNav span:eq(0)").animate({
			left: secondLeft[0] + "%",
			top: secondTop[0] + "%"
		}, time[0]);
		
		$("#fakeNav span:eq(1)").animate({
			left: secondLeft[1] + "%",
			top: secondTop[1] + "%"
		}, time[1]);
		
		$("#fakeNav span:eq(2)").animate({
			left: secondLeft[2] + "%",
			top: secondTop[2] + "%"
		}, time[2]);
		
		$("#fakeNav span:eq(3)").animate({
			left: secondLeft[3] + "%",
			top: secondTop[3] + "%"
		}, time[3], function(){
			if(freq > 0) {
				console.log(freq);
				navMove(firstLeft, firstTop, freq-1, flag);
			} else {
				finalPos();
			}
		});
		
	}
	
	function finalPos() {
		$("#fakeNav li span").css("font-size", "100%");
	}
	
	function findDegree(left1, left2, top1, top2) {
		let topDistance = 0;
		let leftDistance = 0;
		let tan = 0;
		let rotateDeg = 0;
		
		topDistance = Math.abs(top2 - top1)/4;
		leftDistance = Math.abs(left2 - left1);
		tan = topDistance / leftDistance;
		rotateDeg = tanDegree(Math.atan(tan));
		if(top2 > top1) {
			rotateDeg = -(rotateDeg);	
		}
		return rotateDeg;
	}
	
	function tanDegree(x){
		//弧度=角度*Math.PI/180
		return x * 180 / Math.PI;
	}
	
});