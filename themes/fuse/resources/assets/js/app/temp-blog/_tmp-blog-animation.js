import anime from "animejs";

const blogArchiveAnimationTimeline = anime.timeline({});
const animationEasing = "easeOutQuad";
const slideInX = [-10, 0];
const opacityFade = [0, 1];

blogArchiveAnimationTimeline
	.add({
		// Handle Title Animation
		targets: ".tmp-o-hero__title",
		translateX: slideInX,
		opacity: opacityFade,
		easing: animationEasing,
		delay: 200
	})
	.add({
		// Handle Subtitle Animation
		targets: ".tmp-o-hero__sub",
		translateX: slideInX,
		opacity: opacityFade,
		easing: animationEasing,
		offset: "-=600"
	})
	.add({
		// Handle Card Group Animation
		targets: ".tmp-o-group--cards",
		translateY: [10, 0],
		opacity: opacityFade,
		duration: 600,
		easing: animationEasing,
		offset: "-=700"
	});
