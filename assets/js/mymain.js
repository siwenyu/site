init();
function init(){
	/* 随机颜色的colordiv */
	colordiv();
	console.log("mymain.js");
};
/* 随机颜色的colordiv */
function colordiv(){
	$(".colordiv").each(function(){
		var color = '#' +    
	    (function(color){    
	    return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)]) && (color.length == 6) ?  color : arguments.callee(color);})('');
		$(this).css({"background": color});
	})
}