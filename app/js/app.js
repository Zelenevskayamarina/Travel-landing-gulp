// // Import vendor jQuery plugin example

import Splide from '@splidejs/splide';

document.addEventListener('DOMContentLoaded', () => {
	let result = `
    Общая оценка 100 / 100
    1. Слайдер изображений в секции destinations +50
    - на десктоп варианте при клике на урезанную картинку слева или справа изображение меняется по принципу карусели (например если нажать правую картинку та что была в центре на уезжает налево, а та что была видна наполовину оказывается справа). Слайдер может быть как конечным так и бесконечным - данный критерий не должен влиять на оценку + 20
    - три точки внизу отображают "номер слайда", то есть каждому слайду соответствует свой кружочек, который становится активным при нахождении соответствующего ему слайда в центре. На мобильном варианте картинка одна, но поверх нее появляются стрелочки навигации (можно сделать как карусель или же затемнять кнопку если слайдер достиг края) +20
    - анимации плавного перемещения для слайдера +10
    2. Нажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап + 50
    - логин попап соответствует верстке его закрытие происходит при клике вне попапа +25
    - логин попап имеет 2 инпута (логин и пароль) при нажатии на кнопку Sign In показывается браузерный алерт с введенными данными (для реализации можно использовать тег ) +25
    3. Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение). +25`

	console.log(result);

	//scroll to anchors
	const smoothScroll = function (targetEl, duration) {
		const headerElHeight = document.querySelector('.header').clientHeight;
		let target = document.querySelector(targetEl);
		let targetPossition = target.getBoundingClientRect().top - headerElHeight;
		let startPossition = window.pageYOffset;
		let startTime = null;

		const ease = function (t, b, c, d) {
			t /= d / 2;
			if (t < 1) return c / 2 * t * t + b;
			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		};

		const animation = function (currentTime) {
			if (startTime == null) startTime = currentTime;
			const timeElapsed = currentTime - startTime;
			const run = ease(timeElapsed, startPossition, targetPossition, duration);
			window.scrollTo(0, run);
			if (timeElapsed < duration) requestAnimationFrame(animation);
		};
		requestAnimationFrame(animation);
	};

	const scrollTo = function () {
		const links = document.querySelectorAll('.js-scroll');
		links.forEach(each => {
			each.addEventListener('click', function () {
				const currentTarget = this.getAttribute('href');
				smoothScroll(currentTarget, 1000);
			});
		});
	};
	scrollTo();

	// burger
	const headerBurger = document.querySelector(".header__burger");
	const headerNav = document.querySelector(".header__nav");
	const headerLinks = document.querySelectorAll(".header__link");
	const headerOverlay = document.querySelector('.header__overlay');

	headerBurger.addEventListener("click", () => {
		headerBurger.classList.toggle("burger_closed");
		headerNav.classList.toggle("header__nav_active");
	});

	headerLinks.forEach(link => link.addEventListener("click", () => {
		headerNav.classList.remove("header__nav_active");
		headerBurger.classList.remove("burger_closed");
	}));

	headerOverlay.addEventListener("click", () => {
		headerNav.classList.remove("header__nav_active");
		headerBurger.classList.remove("burger_closed");
	});

	// pop-up 
	const myBtn = document.getElementById('myButton');
	const myAccount = document.getElementById('myAccount');
	const popUpOverlay = document.querySelector('.pop-up__overlay');
	const popUp = document.getElementById('myPopUp');

	function togglePopUp() {
		if (popUp.style.display === 'block') {
			popUp.style.display = 'none';
		} else {
			popUp.style.display = 'block';
			popUp.classList.add("pop-up_open");
		}
	}

	popUpOverlay.addEventListener("click", () => {
		if (popUp.style.display === 'block') {
			popUp.style.display = 'none';
			popUp.classList.add("pop-up_close");
		} else {
			popUp.style.display = 'block';
		}
	});

	myBtn.addEventListener('click', togglePopUp);
	myAccount.addEventListener('click', togglePopUp);
	popUpOverlay.addEventListener('click', togglePopUp);

	const myRegister = document.getElementById('myRegister');
	const contentPopUp = document.querySelector('.pop-up__content');
	const titlePopUp = document.querySelector('.pop-up__form-title');
	const buttonsPopUp = document.querySelectorAll('.pop-up__form-button');
	const textPopUp = document.querySelector('.pop-up__form-text');
	const buttonSendPopUp = document.querySelector('.pop-up__form-button-text');
	const linkPopUp = document.querySelector('.pop-up__form-link');
	const linkLitePopUp = document.querySelector('.pop-up__form-link_lite');
	const linkDarkPopUp = document.querySelector('.pop-up__form-link_dark');

	let trigger = 1;

	myRegister.addEventListener('click', () => {
		trigger == 1 ? signUp() : signIn()
	})

	function signUp() {
		contentPopUp.classList.add('pop-up__content_second');
		titlePopUp.innerHTML = 'Create account';
		buttonsPopUp.forEach((button) => {
			button.classList.add('block');
		})
		textPopUp.classList.add('block');
		buttonSendPopUp.innerHTML = 'Sign Up';
		linkPopUp.innerHTML = '';
		linkLitePopUp.innerHTML = 'Already have an account?';
		linkDarkPopUp.innerHTML = 'Log in';
		linkLitePopUp.classList.add('pop-up__form-link_lite-second');
		linkPopUp.classList.add('pop-up__form-link_second');
		trigger++;
	}

	function signIn() {
		contentPopUp.classList.remove('pop-up__content_second');
		titlePopUp.innerHTML = 'Log in to your account';
		buttonsPopUp.forEach((button) => {
			button.classList.remove('block');
		})
		textPopUp.classList.remove('block');
		buttonSendPopUp.innerHTML = 'Sign In';
		linkPopUp.innerHTML = 'Forgot Your Password?';
		linkLitePopUp.innerHTML = 'Don’t have an account?';
		linkDarkPopUp.innerHTML = 'Register';
		linkLitePopUp.classList.remove('pop-up__form-link_lite-second');
		linkPopUp.classList.remove('pop-up__form-link_second');
		trigger--;
	}

	const email = document.getElementById("email");
	const password = document.getElementById("password");
	const signInPopUp = document.getElementById("signInPopUp");

	signInPopUp.addEventListener("click", () => {
		if (email.value.trim().length != 0 && password.value.trim().length != 0) {
			alert(`E-mail: ${email.value}` + '\n' + `Password: ${password.value}`);
		} else if (email.value.trim().length == 0 && password.value.trim().length == 0) {
			alert(`Please enter your email and password!`);
		} else if (email.value.trim().length == 0 && password.value.trim().length > 0) {
			alert(`Please enter your e-mail!`);
		} else if (password.value.trim().length == 0 && email.value.trim().length > 0) {
			alert(`Please enter your password!`);
		}
	});

	// slider  
	const destinationsSliderSettings = {
		type: 'loop',
		speed: 1500,
		isNavigation: true,
		drag: true,
		arrows: false,
		pagination: true,
		classes: {
			pagination: 'splide__pagination destinations-slider__pagination',
		},
		interval: 3000,
		movePage: 1,
		perPage: 1,
		focus: 'center',
		gap: '60px',
		breakpoints: {
			391: {
				type: 'loop',
				gap: "20px",
				width: "100%",
				arrows: true,
				classes: {
					arrow: 'splide__arrow destinations-slider__arrow',
				},
			},
		}
	}
	new Splide('#destinations-survey', destinationsSliderSettings).mount();

	const arrowPrev = document.querySelector(".splide__arrow--prev");
	arrowPrev.addEventListener("click", () => {
		arrowPrev.classList.add("is-active");
		arrowNext.classList.remove("is-active");
	});

	const arrowNext = document.querySelector(".splide__arrow--next");
	arrowNext.addEventListener("click", () => {
		arrowNext.classList.add("is-active");
		arrowPrev.classList.remove("is-active");
	});
})