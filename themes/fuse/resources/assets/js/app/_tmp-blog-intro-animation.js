import anime from "animejs";


const animateCards = anime({
	targets: ".tmp-m-card__wrapper",
	translateX: [-10, 0],
	opacity: [0, 1],
	duration: 700,
	loop: false,
	easing: "easeOutQuad",
	delay: function(el, i, l) {
		return i * 250;
	}
});
