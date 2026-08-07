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


/* ===================== Cenário do site (space, hiking, ...) ===================== */
const themeSwitcher = document.getElementById('theme-switcher');
const themeToggle = document.getElementById('theme-toggle');

if (themeSwitcher && themeToggle) {
	const opcoes = themeSwitcher.querySelectorAll('.theme-cloud--option');
	const temasValidos = Array.from(opcoes, (o) => o.dataset.theme);

	const marcarAtivo = (tema) => {
		opcoes.forEach((opcao) => {
			opcao.setAttribute('aria-pressed', String(opcao.dataset.theme === tema));
		});
	};

	const aplicarTema = (tema) => {
		if (!temasValidos.includes(tema)) tema = 'space';
		document.documentElement.dataset.siteTheme = tema;
		marcarAtivo(tema);
		try { localStorage.setItem('siteTheme', tema); } catch (e) { /* modo privado */ }
	};

	const abrirNuvem = (abrir) => {
		themeSwitcher.classList.toggle('theme--buttom_open', abrir);
		themeToggle.setAttribute('aria-expanded', String(abrir));
	};

	// o script inline do <head> já escolheu o tema; aqui só sincronizamos os botões
	marcarAtivo(document.documentElement.dataset.siteTheme || 'space');

	themeToggle.addEventListener('click', (evento) => {
		evento.stopPropagation();
		abrirNuvem(!themeSwitcher.classList.contains('theme--buttom_open'));
	});

	opcoes.forEach((opcao) => {
		opcao.addEventListener('click', () => {
			aplicarTema(opcao.dataset.theme);
			abrirNuvem(false);
		});
	});

	// fecha ao clicar fora ou apertar Esc
	document.addEventListener('click', (evento) => {
		if (!themeSwitcher.contains(evento.target)) abrirNuvem(false);
	});

	document.addEventListener('keydown', (evento) => {
		if (evento.key !== 'Escape') return;
		if (!themeSwitcher.classList.contains('theme--buttom_open')) return;
		abrirNuvem(false);
		themeToggle.focus();
	});
}


/* ===================== Parallax dos cenários ===================== */
/* Cada camada tem um data-parallax: quanto maior, mais ela "atrasa" ao rolar,
   o que dá a sensação de distância. A camada da frente fica em 0 (sem
   atributo), para a emenda com a cor da página não se mexer. Vale para
   qualquer cenário — hoje hiking e fantasy. */
const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!semAnimacao.matches) {
	const camadas = Array.from(
		document.querySelectorAll('.arte-tema [data-parallax]'),
		(el) => ({ el, fator: parseFloat(el.dataset.parallax) || 0 })
	);

	let agendado = false;

	const moverCamadas = () => {
		agendado = false;
		// o cenário só ocupa a primeira tela; passando dela, para de andar
		const y = Math.min(window.scrollY, window.innerHeight);

		camadas.forEach(({ el, fator }) => {
			el.style.transform = `translate3d(0, ${(y * fator).toFixed(1)}px, 0)`;
		});
	};

	const agendarMovimento = () => {
		if (agendado) return;
		agendado = true;
		requestAnimationFrame(moverCamadas);
	};

	window.addEventListener('scroll', agendarMovimento, { passive: true });
	moverCamadas();
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
