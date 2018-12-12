$(document).ready(function(){
	$("html, body").scrollTop(0);
	
	let originBtnShadow = "";
	const BtnShadow = "1px 1px 10px rgba(0, 0, 0, 0.3), 1px 1px 3px rgba(0, 0, 0, 0.4)";
	let position = [];	/*儲存div原本的位置*/
	let oriHeight = $(window).height();
	
	checkPos();
	navbarBtn();
	scrollSpy();
	
	$(window).resize(function() {	
		let updateHeight = $(".row100").height();
		if( updateHeight !== oriHeight) {
			$("html, body").scrollTop(0);
			checkPos();
		}
		scrollSpy();
	});
	
	
	
/*******************************************************/	
	function checkPos() {
		for( let i = 0; i < $("section").children().length; i++) {
			position[i] = $("section").children().eq(i).offset().top;
		}	
	}
	
	function scrollSpy() {
		$("a[href*='#']:not([href='#'])").click(function(event){
			if($(this.hash) !== "") {
				event.preventDefault();
				$("html, body").stop();
				let target = $(this).attr("href");
				let indexTarget = "";
				
				if(target == "#info") {
					indexTarget = 0;
				} else if(target == "#experience") {
					indexTarget = 1;
				} else if(target == "#skill") {
					indexTarget = 2;
				} else {
					indexTarget = 3;
				}

				$("html, body").animate(
					{ scrollTop: position[indexTarget] }, 500
				);
			}
		});
	}
	
	
	function navbarBtn() {
		$("a[href*='#']:not([href='#'])").on({
			mousedown: function() {
				originBtnShadow = $(this).css("box-shadow");
				$(this).css("box-shadow", BtnShadow);				
			},
			mouseup: function() {
				$(this).css("box-shadow", originBtnShadow);
			}
		});
	}
	
	
});