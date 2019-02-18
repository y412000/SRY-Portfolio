$(document).ready(function(){
	let flagAbt = 1;
	let flagExp = 0;
	let flagSki = 0;
	let flagPort = 0;
	
	recoverNav();

	$("section").animate({opacity: 1}, 800);
	setTimeout(function(){
		ajax("about");
	}, 100);

	ajax("about");


	$(window).resize(function(){
		recoverNav();

		if( flagAbt == 1) {
			layoutCss("about");
		} else if( flagExp == 1 ) {
			layoutCss("experience");
		} else if( flagSki == 1 ) {
			layoutCss("skill")
		} else if ( flagPort == 1 ) {
			layoutCss("portfolio");
		}
	});
	
	
	$("#rlink1").click(function(){
		change("about");
	});
	$("#rlink2").click(function(){
		change("experience");
	});
	$("#rlink3").click(function(){
		change("skill");
	});
	$("#rlink4").click(function(){
		change("portfolio");
	});
	
	function change(fileName){
		let waitTime = waitingTime();
		let leave = leaveAnimate();
		
		leave;
		setTimeout(function(){
			ajax(fileName);
		}, waitTime);
	}
	
	function ajax(fileName){
		$("#myContent").load( "./txt/" + fileName + ".html", function() {
			if( fileName == "about" ) {
				flagAbt = 1;
				flagExp = 0;
				flagSki = 0;
				flagPort = 0;
				layoutCss("about");
				aboutAnimate();
			} else if( fileName == "experience" ) {
				flagAbt = 0;
				flagExp = 1;
				flagSki = 0;
				flagPort = 0;
				layoutCss("experience");
				expAnimate();
			} else if ( fileName == "skill") {
				flagAbt = 0;
				flagExp = 0;
				flagSki = 1;
				flagPort = 0;
				layoutCss("skill");
				skillAnimate();
			} else if ( fileName == "portfolio"){
				flagAbt = 0;
				flagExp = 0;
				flagSki = 0;
				flagPort = 1;
				layoutCss("portfolio");
				setTimeout(function(){
					portAnimate();
				}, 10);
			}
		});
	};
	
	function waitingTime(){
		if(flagAbt == 1) {
			return 1150;
		} else if (flagExp == 1) {
			return 1500;
		} else if (flagSki == 1) {
			return 1000;
		} else if (flagPort == 1) {
			return 1500;
		}
	}
	
	function leaveAnimate(){
		if(flagAbt == 1) {
			return aboutLeave();
		} else if (flagExp == 1) {
			return expLeave();
		} else if (flagSki == 1) {
			return skillLeave();
		} else if (flagPort == 1) {
			return portLeave();
		}
	}
	
	
	function recoverNav(){
		if($(window).width() < 768) {
			$("#mainBar a").on("click", function(){
				$(".navbar-toggler").click();
			});
			
		} else {
			$("#mainBar a").off("click");
		}
	}
	
	
	function layoutCss(ctnId) {			
		let ctnHeight = $("#" + ctnId).height();
		let height = $(window).height();
		let width = $(window).width();
		
		if(ctnId == "skill"){
			if(ctnHeight+150 <= height && width >= 768) {
				$("#" + ctnId).css("padding-top", "60px");
			} else if( ctnHeight+100 <= height && width < 768 ) {
				$("#" + ctnId).css("padding-top", "30px");
			} else {
				$("#" + ctnId).css("padding-top", "0px");
			}
		}
		
		if( ctnHeight+150 <= height && width >= 768 ) {
			$("#" + ctnId).css({
				"top": "50%",
				"transform": "translateY(-50%)",
				"margin-top": "0px"
			});
		} else if( ctnHeight+150 > height && width >= 768 ){
			$("#" + ctnId).css({
				"top": "0%",
				"transform": "translateY(0%)",
				"margin-top": "120px"
			});
		} else if( ctnHeight+100 <= height && width < 768 ) {
			$("#" + ctnId).css({
				"top": "50%",
				"transform": "translateY(-50%)",
				"margin-top": "0px"
			});
		} else if( ctnHeight+100 > height && width < 768 ) {
			$("#" + ctnId).css({
				"top": "0%",
				"transform": "translateY(0%)",
				"margin-top": "70px"
			});
		}
	}
	
	function aboutAnimate(){
		const h1 = $("#about > h1");
		const h2 = $("#about > h2");
		let x = 1; /* scale()用 */
		let y = 1; /* scale()用 */


		/*向上*/
		h1.animate({top: "-50px"}, 500);
		h2.animate({top: "-50px"}, 600, function(){
			setTimeout(function(){
				scale(0.02, 0.0125, 1.4, 6);	
			}, 80);
		});
		
		/*向下撞擊*/
		h1.animate({top: "65px"}, 350);
		h2.animate({top: "40px"}, 150, "swing", function(){
			setTimeout(function(){
				scale(-0.04, -0.0275, 0.6, 11);
			}, 120);
			setTimeout(function(){
				rotate(1440, 0, 10);
			}, 100);
			setTimeout(function(){
				rotate(1080, 1, 16);
			}, 600);
			setTimeout(function(){
				rotate(720, 2, 25);
			}, 1100);
			
		});
		
		/*向上回彈*/
		h1.animate({top: "-40px"}, 300);
		h2.delay(90).animate({top: "-30px"}, 300, function(){
			setTimeout(function(){
				scale(0.02, 0.015, 1, 15);
			}, 100);
			
		});
		
		/*向下歸位*/
		h1.animate({top: "0px"}, 400);
		h2.animate({top: "0px"}, 450);
		

		function scale(xx, yy, num, time){

			let scaleH2 = setInterval(function(){			
				x += xx;
				y -= yy;
				
				if( num > 1 ) {
					if(  xx > 0 && x >= num ) {
						clearInterval(scaleH2);
					}
				} else if( num <= 1 ){
					if ( xx < 0 && x <= num) {
						clearInterval(scaleH2);
					} else if( xx > 0 && x >= num ){
						clearInterval(scaleH2);
					}
				}
				
				h2.css("transform", "scale(" + x + "," + y + ")");

			}, time);
		}
		
		function rotate(maxDeg, num, timer){
			let deg = 0;
			let time = timer;
			
			let rotateP = setInterval(function(){
				
				$("#about p:eq(" + num + ")").css("opacity", 1);
				
				if( deg >= maxDeg ){
					clearInterval(rotateP);
				}
				
				$("#about p:eq(" + num + ")").css("transform", "rotateX(" + deg + "deg)");
				deg += 11.25;
				
			}, time );
			
		}

	}
	
	function aboutLeave(){
		const h1 = $("#about > h1");
		const h2 = $("#about > h2");
		let x = 1; /* scale()用 */
		let y = 1; /* scale()用 */
		let xp = [1, 1, 1]; /* scaleP()用 */
		let yp = [1, 1, 1]; /* scaleP()用 */


		/*向上*/
		h1.animate({top: "-70px"}, 500);
		h2.animate({top: "-70px"}, 600, function(){
			setTimeout(function(){
				scale(0.02, 0.0125, 1.6, 4);	
			}, 100);
			
			setTimeout(function(){
				scaleP(0.02, 0.05, 1.4, 3, 0);
			}, 150);
			setTimeout(function(){
				scaleP(0.0151, 0.05, 1.3, 3, 1);
			}, 150);
			setTimeout(function(){
				scaleP(0.01, 0.05, 1.2, 3, 2);
			}, 150);
		});
		
		/*向下撞擊*/
		h1.animate({top: "120px"}, 250);
		h2.animate({top: "100px"}, 150, function(){
			setTimeout(function(){
				scale(-0.1, -0.125, 0.8, 8);
			}, 80);

		});
		
		setTimeout(function(){
			$("#about p:eq(0)").animate({top: "60px"}, 50);
		}, 680);
		setTimeout(function(){
			$("#about p:eq(1)").animate({top: "40px"}, 50);
		}, 700);
		setTimeout(function(){
			$("#about p:eq(2)").animate({top: "20px"}, 50);
		}, 740);
		
		
		/*向上回彈 */
		h1.animate({top: "-80vh"}, 500, "swing");
		h2.delay(100).animate({top: "-80vh"}, 300);
		
		function scale(xx, yy, num, time){
			let scaleH2 = setInterval(function(){			
				x += xx;
				y -= yy;

				if( num > 1 ) {
					if(  xx > 0 && x >= num ) {
						clearInterval(scaleH2);
					}
				} else if( num <= 1 ){
					if ( xx < 0 && x <= num) {
						clearInterval(scaleH2);
					} else if( xx > 0 && x >= num ){
						clearInterval(scaleH2);
					}
				}
				
				h2.css("transform", "scale(" + x + "," + y + ")");
				
			}, time);
		}
		
		function scaleP(xx, yy, num, time, pNum){
			let scaletoP = setInterval(function(){			
				xp[pNum] += xx;
				yp[pNum] -= yy;
				
				if( num > 1 ) {
					if(  xx > 0 && xp[pNum] >= num ) {
						
						clearInterval(scaletoP);
					}
				} 
				
				$("#about p:eq(" + pNum + ")").css("transform", "scale(" + xp[pNum] + "," + yp[pNum] + ")");
				
			}, time);
		}
				
	}
	
	function expAnimate(){
		const odd = $("#experience .odd");
		const even = $("#experience .even");
		
		odd.animate({
			left: "0%", 
			opacity: 1
		}, 1500);
		even.animate({
			right: "0%",
			opacity: 1
		}, 1500);
	}
	
	function expLeave(){
		const odd = $("#experience .odd");
		const even = $("#experience .even");
		
		odd.animate({
			left: "-10%", 
			opacity: 0
		}, 1500);
		even.animate({
			right: "-10%",
			opacity: 0
		}, 1500);
	}
	
	
	function skillAnimate(){
		let skillDeg = 45;
		
		$("#skill").animate({opacity: 1}, 1500);
		let skillBorderAni = setInterval(function(){
			
			if(skillDeg == -315) {
				clearInterval(skillBorderAni);
				let color = "rgb(180, 215, 126), ";
				let color1 = "rgb(136, 172, 83), ";
				let num = 0;
				let skillBorderAni2 = setInterval(function(){
					$("#skillBorder").css("background-image", "linear-gradient(" + skillDeg + "deg," + color + 
										  "rgb(180, 215, 126), rgb(180, 215, 126), rgb(136, 172, 83), rgb(136, 172, 83), " + color1 + 
										  "rgb(180, 215, 126), rgb(180, 215, 126), rgb(180, 215, 126), " + color + 
										  "rgb(255, 255, 255), rgb(255, 255, 255))");
					color += "rgb(180, 215, 126), ";
					color1 += "rgb(136, 172, 83), ";
					
					num++;
					
					if(num == 20) {
						clearInterval(skillBorderAni2);
						$("#skillBorder").css("background-image", "linear-gradient(" + skillDeg + "deg," +
										  "rgb(180, 215, 126), rgb(180, 215, 126), rgb(136, 172, 83), rgb(136, 172, 83), " +
										  "rgb(180, 215, 126), rgb(180, 215, 126), rgb(180, 215, 126))");
					}
					
				}, 35);
			}
			
			$("#skillBorder").css("background-image", "linear-gradient(" + skillDeg + "deg," + 
								  "rgb(180, 215, 126), rgb(180, 215, 126), rgb(136, 172, 83), rgb(136, 172, 83)," + 
								  "rgb(180, 215, 126), rgb(180, 215, 126), rgb(180, 215, 126), rgb(255, 255, 255), rgb(255, 255, 255))");
			
			if(skillDeg == 3) {
				skillAnimateH4(0);
			} else if (skillDeg == -55) {
				skillAnimateH4(2);
			} else if (skillDeg == -75) {
				skillAnimateH4(4);
			} else if (skillDeg == -210) {
				skillAnimateH4(3);
			} else if (skillDeg == -250) {
				skillAnimateH4(1);
			}
			
			skillDeg--;				
		}, 9);
		
		function skillAnimateH4(h4Num){
			const h4 = $("#skill h4:eq(" + h4Num + ")");

			h4.animate({
				width: "60%",
				borderWidth: "5px",
				opacity: 1,
				padding: "5px 20px"
			}, 1000);

		}
	
	}

	function skillLeave() {
		let distance = 10;
		let borderWid = 5;
		let x = 1;
		let y = 1;
		
		$("#skill > div").animate({
			width: "200%"}, 1000);
		$("#skill h4").animate({
			width: "0%",
		}, 1000);
		setTimeout(function(){
			$("#skill h1").animate({
				opacity: 0
			}, 500);			
		}, 500);

		
		let lengthen = setInterval(function(){
			const border = $("#skill > div > div");
			const h1 = $("#skill h1");
			
			distance -= 0.5;
			borderWid -= 0.25;
			x += 0.04;
			y -= 0.047;
			
			border.css("height", "calc(100% - " + distance + "px)");
			border.css("top", borderWid + "px");
			h1.css("transform", "scale( " + x + "," + y + ")");
			
			if(distance == -0.5) {
				clearInterval(lengthen);
			}
			
		}, 45);
	}
	
	function portAnimate(){
		const len = $(".pAnimate").length;
		let winHeight = $(window).height();
		let pos = [];
		let winPos = $(window).scrollTop();
		let pFlag = [];
		let appearTime = 700;
		let pHeight = $(".pAnimate:eq(" + (len-1) + ")").height();
		let pAnimateNum = 0;
		
		for(let i = 0; i < len; i++){
			pFlag[i] = 0;
		}
		
		checkPos();
		appear();
		
		$(window).resize(function(){
			winHeight = $(window).height();
			winPos = $(window).scrollTop();
			pHeight = $(".pAnimate:eq(" + (len-1) + ")");
			checkPos();
			appear();
		});
		
		$(window).scroll(function(){
			winPos = $(window).scrollTop();
			appear();
		});

		function checkPos(){
			for(let i = 0; i < len; i++){
				pos[i] = $("#portfolio > div:eq(" + i + ")").offset().top;
			}
		}
		
		function appear(){
			let timer = 0;
			for(let i = pAnimateNum; i < len; i++){
				if(pFlag[i] == 0 && (winPos + (winHeight*3/4)) >= pos[i]) {
					setTimeout(function(){
						$(".pAnimate:eq(" + i + ")").animate({
							top: "0px",
							opacity: 1
						}, appearTime, "swing");						
					}, timer);
					timer += 300;
					pAnimateNum++;
					pFlag[i] = 1;
				} else{
					break;
				}
			}
		}

	}
	
	function portLeave() {
		const len = $(".pAnimate").length;
		let x = 1;
		let y = 1;
		let deg = 5;
		
		let rotation = setInterval(function(){
			$(".pAnimate:odd").parents("#portfolio > div").css(
				"transform", "rotate(" + deg + "deg) scale(" + x + ", " + y + ")");
			$(".pAnimate:even").parents("#portfolio > div").css(
				"transform", "rotate(" + (-deg) + "deg) scale(" + x + ", " + y + ")");
			
			
			if(deg == 1800) {
				$(".pAnimate").parents("#portfolio > div").css("transform", "rotate(0deg) scale( 1, 1 )");
				clearInterval(rotation);
			}
			deg += 5;
			x -= 0.003;
			y -= 0.003;
			
		}, 5);
		
		$(".pAnimate").animate({
			opacity: 0
		}, 1500);
	}
	
});

