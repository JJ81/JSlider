<h1># JSlider</h1>
<p>Simple Image Slider</p>
<b>Options</b>
<pre>
var slider = new JSlider({
	total : 8,
	current : 0,
	next : 1,
	prev : null,
	imgPath : "img/",
  imgType : 'png',
  btnPrev : $(".prev-btn"),
  btnNext : $(".next-btn"),
  display : $(".simpleSlider .item"),
  preview : $(".preview-thumbnail"),
  loop : false,
  animate : false,
  animateType : ''
});
</pre>
