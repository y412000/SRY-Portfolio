$(document).ready(function(){
	let skillDeg = 45;
	
	skillAnimate();
	
	function skillAnimate(){
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
			skillDeg--;				
		}, 10);
	
	}
});