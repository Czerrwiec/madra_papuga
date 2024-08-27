let hamburger;
let stick;
let footerYear;
let mobileNav;
let mobileLinkBox;
let navigation;
let slider;
let prevBtn;
let nextBtn;
let listOfSelectors;
let selectorParent;
let navLinks;
let spySections;
let observer;
let mobileLinks;
let index = 0;

const options = {
	threshold: [0.5, 0.9],
};

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
	handleCurrentYear();
};

const prepareDOMElements = () => {
	hamburger = document.querySelector('.hamburger-container');
	stick = document.querySelector('.stick');
	footerYear = document.querySelector('.footer-year');
	mobileNav = document.querySelector('.mobile-nav');
	mobileLinkBox = document.querySelector('.mobile-link-box');
	navigation = document.querySelector('.navbar');
	slider = document.querySelector('.slider');
	prevBtn = document.querySelector('.prev');
	nextBtn = document.querySelector('.next');
	listOfSelectors = document.querySelectorAll('.list li');
	selectorParent = document.querySelector('.list');
	navLinks = document.querySelectorAll('.link');
	spySections = document.querySelectorAll('.spy-section');
	mobileLinks = document.querySelectorAll('.mobile-link');
	observer = new IntersectionObserver(handleScrollspy, options);
};

const prepareDOMEvents = () => {
	hamburger.addEventListener('click', handleMobileNav);
	window.addEventListener('scroll', addShadow);
	nextBtn.addEventListener('click', nextImg);
	prevBtn.addEventListener('click', prevImg);
	listOfSelectors.forEach((item, i) => {
		item.addEventListener('click', () => {
			index = i;
			cleanUpAndTranslate();
			item.classList.add('selected');
		});
	});
	spySections.forEach((section) => {
		observer.observe(section);
	});
	mobileLinks.forEach((link) => {
		link.addEventListener('click', () => {
			mobileNav.style.transform = 'translateY(-105%)';
			mobileNav.style.opacity = '0';
			mobileLinkBox.style.opacity = '0';
			stick.classList.remove('trigger');
		});
	});
};

const handleMobileNav = () => {
	if (stick.classList.contains('trigger')) {
		mobileNav.style.transform = 'translateY(-105%)';
		mobileNav.style.opacity = '0';
		mobileLinkBox.style.opacity = '0';
		stick.classList.remove('trigger');
	} else {
		stick.classList.add('trigger');
		mobileNav.style.transform = 'translateY(0%)';
		mobileNav.style.opacity = '1';
		mobileLinkBox.style.opacity = '1';
	}
};

const addShadow = () => {
	let number = 280;

	if (window.matchMedia('(max-width: 700px)')) {
		number = 50;
	}
	if (window.scrollY >= number) {
		navigation.style.backgroundColor = 'rgba(117, 105, 182, 0.846)';

		navLinks.forEach((link) => {
			link.style.color = '#ffe6e6';
			link.style.setProperty('--after_txt', '#ffe6e6');
			stick.style.setProperty('--hamburger_00', '#ffe6e6')
		});
	} else {
		navigation.style.backgroundColor = '';
		navLinks.forEach((link) => {
			link.style.color = '#7469b6';
			link.style.setProperty('--after_txt', '#7469b6');
			stick.style.setProperty('--hamburger_00', '#7469b6')
		});
	}
};

const prevImg = () => {
	index = index > 0 ? index - 1 : 0;
	cleanUpAndTranslate();
	selectorParent.children[index].classList.add('selected');
};

const nextImg = () => {
	index = index < 5 ? index + 1 : 5;
	cleanUpAndTranslate();
	selectorParent.children[index].classList.add('selected');
};

const cleanUpAndTranslate = () => {
	listOfSelectors.forEach((x) => {
		x.classList.remove('selected');
	});
	slider.style.transform = `translate(${index * -16.666667}%)`;
};

const handleScrollspy = (entries) => {
	entries.forEach((entry) => {
		const activeNav = document.querySelector(`a[href='#${entry.target.id}']`);
		if (entry.isIntersecting) {
			navLinks.forEach((link) => link.classList.remove('active'));
			activeNav.classList.add('active');
		}
	});
};

const handleCurrentYear = () => {
	const year = new Date().getFullYear();
	footerYear.textContent = year;
};

document.addEventListener('DOMContentLoaded', main);
