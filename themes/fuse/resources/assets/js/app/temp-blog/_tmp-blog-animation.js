import anime from "animejs";

const animationEasing = "easeOutQuad";
const slideInX = [-10, 0];
const opacityFade = [0, 1];

const gradients = {

	start: "#5C789E",
	end: "#5C789E",
	position: "50%",

};

const articleHero = document.querySelector('.tmp-o-hero--archive');

if( articleHero ){

	// const blogArchiveHeroAnimation = anime({

	// 	targets: gradients,
	// 	duration: 1500,
	// 	start: "#DE0D61",
	// 	end: gradients.end,
	// 	position: "128.36%",
	// 	easing: 'linear',
	// 	round: 1,
	// 	delay: 500,
	// 	update: function(a){

	// 		const gradientStartValue = a.animations[0].currentValue;
	// 		const gradientEndValue = a.animations[1].currentValue;
	// 		const gradientPositionValue = a.animations[2].currentValue;

	// 		articleHero.style.backgroundImage = `linear-gradient(90deg, ${gradientStartValue} -4.25%, ${gradientEndValue} ${gradientPositionValue})`;

	// 	}

	// });

}

const blogSingleAnimationTimeline = anime.timeline({});

blogSingleAnimationTimeline
	.add({
		// Handle Title Animation
		targets: ".tmp-o-hero--single .l-container",
		translateX: slideInX,
		opacity: opacityFade,
		easing: animationEasing,
		delay: 200
	})
	.add({
		// Handle Card Group Animation
		targets: ".tmp-o-post__summary",
		translateY: [-10, 0],
		opacity: opacityFade,
		duration: 600,
		easing: animationEasing,
		offset: "-=700"
	})
	.add({
		// Handle Card Group Animation
		targets: ".tmp-o-post__content",
		translateY: [10, 0],
		opacity: opacityFade,
		duration: 600,
		easing: animationEasing,
		offset: "-=200"
	});
