/* ===================== Menu mobile ===================== */
const navbarSlide = () => {
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.navbar--links');
	const navLinks = document.querySelectorAll('.navbar--links li');

	if (!burger || !nav) return;

	const fecharMenu = () => {
		nav.classList.remove('navbar-ativo');
		burger.classList.remove('toggle');
		burger.setAttribute('aria-expanded', 'false');
		navLinks.forEach((link) => { link.style.animation = ''; });
	};

	burger.addEventListener('click', () => {
		const aberto = nav.classList.toggle('navbar-ativo');
		burger.setAttribute('aria-expanded', String(aberto));

		navLinks.forEach((link, index) => {
			link.style.animation = aberto
				? `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
				: '';
		});

		burger.classList.toggle('toggle');
	});

	// fecha o menu ao clicar em um link
	navLinks.forEach((item) => item.addEventListener('click', fecharMenu));
};

navbarSlide();


/* ===================== Header fixo ao rolar ===================== */
const header = document.querySelector('.body-2 > header');

if (header) {
	window.addEventListener('scroll', () => {
		header.classList.toggle('sticky', window.scrollY > window.innerHeight * 0.9);
	});
}


/* ===================== Tema claro / escuro ===================== */
const checkbox = document.getElementById('colortheme-checkbox');
const bodyclass = document.querySelector('.body');

if (checkbox && bodyclass) {
	// restaura a preferência salva
	if (localStorage.getItem('tema') === 'dark') {
		bodyclass.classList.add('dark');
		checkbox.checked = true;
	}

	checkbox.addEventListener('change', () => {
		const escuro = bodyclass.classList.toggle('dark');
		localStorage.setItem('tema', escuro ? 'dark' : 'light');
	});
}


/* ===================== Revelação ao rolar ===================== */
const reveals = document.querySelectorAll('.reveal');

if (reveals.length && 'IntersectionObserver' in window) {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add('reveal_visible');
			observer.unobserve(entry.target);
		});
	}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

	reveals.forEach((el) => observer.observe(el));
}
