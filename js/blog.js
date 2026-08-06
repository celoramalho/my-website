/* =========================================================================
   Blog: busca, filtro por categoria e renderização dos cards.
   Os artigos vêm de js/posts.js (constante POSTS).
   ========================================================================= */

(function () {
	'use strict';

	const grid = document.getElementById('post-grid');
	if (!grid || typeof POSTS === 'undefined') return;

	const campoBusca = document.getElementById('blog-search-input');
	const botaoLimpar = document.getElementById('blog-search-clear');
	const filtros = document.querySelectorAll('.blog-filter');
	const secaoForYou = document.getElementById('blog-foryou');
	const destaque = document.getElementById('foryou-destaque');
	const listaForYou = document.getElementById('foryou-lista');
	const tituloResultados = document.getElementById('blog-todos-title');
	const contador = document.getElementById('blog-count');
	const vazio = document.getElementById('blog-vazio');

	let categoriaAtiva = 'todos';
	let termo = '';

	/* ---------- utilidades ---------- */

	// busca sem acento e sem caixa: "seguranca" encontra "Segurança"
	const normalizar = (texto) =>
		String(texto).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

	const formatarData = (iso) => {
		const [ano, mes, dia] = iso.split('-').map(Number);
		return new Date(ano, mes - 1, dia).toLocaleDateString('pt-BR', {
			day: '2-digit', month: 'short', year: 'numeric'
		});
	};

	const escapar = (texto) => {
		const div = document.createElement('div');
		div.textContent = texto;
		return div.innerHTML;
	};

	const ordenados = POSTS.slice().sort((a, b) => b.data.localeCompare(a.data));

	/* ---------- montagem dos cards ---------- */

	const metaDoPost = (post) => `
		<p class="post-card--meta">
			<time datetime="${post.data}">${formatarData(post.data)}</time>
			<span aria-hidden="true">·</span>
			<span>${post.leitura} min de leitura</span>
		</p>`;

	const selos = (post) => `
		<span class="post-card--categoria">${escapar(post.categoria)}</span>
		${post.exemplo ? '<span class="post-card--exemplo">Exemplo</span>' : ''}
		${post.externo ? '<span class="post-card--externo"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Medium</span>' : ''}`;

	const tags = (post) =>
		post.tags && post.tags.length
			? `<ul class="post-card--tags">${post.tags.map((t) => `<li>${escapar(t)}</li>`).join('')}</ul>`
			: '';

	const alvo = (post) => (post.externo ? ' target="_blank" rel="noopener"' : '');

	const cardCompleto = (post, extraClasse) => `
		<article class="post-card ${extraClasse || ''}">
			<div class="post-card--topo">${selos(post)}</div>
			<h3 class="post-card--titulo">
				<a href="${escapar(post.url)}"${alvo(post)}>${escapar(post.titulo)}</a>
			</h3>
			<p class="post-card--resumo">${escapar(post.resumo)}</p>
			${tags(post)}
			${metaDoPost(post)}
		</article>`;

	const cardCompacto = (post) => `
		<article class="post-card post-card_compacto">
			<div class="post-card--topo">${selos(post)}</div>
			<h3 class="post-card--titulo">
				<a href="${escapar(post.url)}"${alvo(post)}>${escapar(post.titulo)}</a>
			</h3>
			${metaDoPost(post)}
		</article>`;

	/* ---------- "Para você": as publicações mais recentes ---------- */

	const montarForYou = () => {
		if (!destaque || !listaForYou || !ordenados.length) return;
		destaque.innerHTML = cardCompleto(ordenados[0], 'post-card_destaque');
		listaForYou.innerHTML = ordenados.slice(1, 4).map(cardCompacto).join('');
	};

	/* ---------- filtro + busca ---------- */

	const filtrar = () => {
		const alvoBusca = normalizar(termo).trim();

		return ordenados.filter((post) => {
			if (categoriaAtiva !== 'todos' && post.categoria !== categoriaAtiva) return false;
			if (!alvoBusca) return true;

			const conteudo = normalizar(
				[post.titulo, post.resumo, post.categoria].concat(post.tags || []).join(' ')
			);
			// todas as palavras digitadas precisam aparecer
			return alvoBusca.split(/\s+/).every((palavra) => conteudo.includes(palavra));
		});
	};

	const renderizar = () => {
		const resultados = filtrar();
		const filtrando = categoriaAtiva !== 'todos' || termo.trim() !== '';

		grid.innerHTML = resultados.map((p) => cardCompleto(p)).join('');

		if (secaoForYou) secaoForYou.hidden = filtrando;
		if (vazio) vazio.hidden = resultados.length > 0;
		if (botaoLimpar) botaoLimpar.hidden = termo === '';

		if (tituloResultados) {
			tituloResultados.textContent = filtrando ? 'Resultados' : 'Todos os artigos';
		}

		if (contador) {
			const n = resultados.length;
			contador.textContent = n === 1 ? '1 artigo' : `${n} artigos`;
		}
	};

	/* ---------- eventos ---------- */

	if (campoBusca) {
		campoBusca.addEventListener('input', () => {
			termo = campoBusca.value;
			renderizar();
		});

		campoBusca.addEventListener('keydown', (evento) => {
			if (evento.key !== 'Escape' || campoBusca.value === '') return;
			campoBusca.value = '';
			termo = '';
			renderizar();
		});
	}

	if (botaoLimpar) {
		botaoLimpar.addEventListener('click', () => {
			campoBusca.value = '';
			termo = '';
			campoBusca.focus();
			renderizar();
		});
	}

	filtros.forEach((botao) => {
		botao.addEventListener('click', () => {
			categoriaAtiva = botao.dataset.cat;
			filtros.forEach((b) => b.setAttribute('aria-pressed', String(b === botao)));
			renderizar();
		});
	});

	montarForYou();
	renderizar();
})();
