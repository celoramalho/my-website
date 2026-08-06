/* =========================================================================
   Artigos do blog
   -------------------------------------------------------------------------
   Para publicar um artigo novo, adicione um objeto no INÍCIO da lista.
   A ordem da lista define o que aparece em "Para você" (as mais recentes).

   Campos:
     titulo     obrigatório
     resumo     obrigatório — 1 ou 2 frases, aparece no card
     categoria  uma de: Cibersegurança | Programação | Infraestrutura | Carreira
                (para criar outra, adicione também um filtro em blog/index.html)
     tags       array de palavras-chave — entram na busca
     data       'AAAA-MM-DD'
     leitura    minutos estimados de leitura
     url        caminho do artigo. Relativo à pasta blog/ quando interno,
                ou URL completa quando for um post no Medium.
     externo    true quando url apontar para fora do site (abre em nova aba)
     exemplo    true mostra o selo "Exemplo". REMOVA ao publicar de verdade.
   ========================================================================= */

const POSTS = [
	{
		titulo: 'Zero Trust na prática: por onde começar no Entra ID',
		resumo: 'Acesso condicional, MFA resistente a phishing e o mínimo privilégio que realmente se sustenta no dia a dia de uma empresa.',
		categoria: 'Cibersegurança',
		tags: ['Zero Trust', 'Entra ID', 'Conditional Access', 'IAM'],
		data: '2026-07-28',
		leitura: 9,
		url: 'artigo-exemplo.html',
		externo: false,
		exemplo: true
	},
	{
		titulo: 'Pentest dentro do CI/CD sem travar a esteira',
		resumo: 'Como encaixar varredura de dependências, SAST e DAST no pipeline mantendo o build rápido o bastante para ninguém querer pular a etapa.',
		categoria: 'Cibersegurança',
		tags: ['Pentest', 'CI/CD', 'DevSecOps', 'Automação'],
		data: '2026-07-10',
		leitura: 11,
		url: 'artigo-exemplo.html',
		externo: false,
		exemplo: true
	},
	{
		titulo: 'RPA em Python: automatizando o provisionamento de identidades',
		resumo: 'Um fluxo de onboarding e offboarding com Microsoft Graph e FastAPI, e as armadilhas de quem automatiza acesso sem trilha de auditoria.',
		categoria: 'Programação',
		tags: ['Python', 'Microsoft Graph', 'FastAPI', 'RPA', 'IAM'],
		data: '2026-06-22',
		leitura: 12,
		url: 'artigo-exemplo.html',
		externo: false,
		exemplo: true
	},
	{
		titulo: 'Gestão de vulnerabilidades: priorizar é mais difícil que encontrar',
		resumo: 'CVSS não basta. Como combinar exposição, criticidade do ativo e inteligência de ameaça para decidir o que corrigir primeiro.',
		categoria: 'Cibersegurança',
		tags: ['Vulnerabilidades', 'Qualys', 'CVSS', 'Gestão de risco'],
		data: '2026-06-05',
		leitura: 8,
		url: 'artigo-exemplo.html',
		externo: false,
		exemplo: true
	},
	{
		titulo: 'ITAM na prática: inventário que não vira planilha morta',
		resumo: 'Como manter a base de ativos viva integrando Intune, GLPI e descoberta de rede, e por que isso é pré-requisito para segurança.',
		categoria: 'Infraestrutura',
		tags: ['ITAM', 'Intune', 'GLPI', 'Inventário'],
		data: '2026-05-18',
		leitura: 7,
		url: 'artigo-exemplo.html',
		externo: false,
		exemplo: true
	},
	{
		titulo: 'De suporte técnico a cibersegurança: o caminho que eu faria de novo',
		resumo: 'O que realmente contou na transição — e o que eu estudei à toa. Um relato sem atalhos mágicos.',
		categoria: 'Carreira',
		tags: ['Carreira', 'Transição', 'Estudos'],
		data: '2026-04-30',
		leitura: 6,
		url: 'artigo-exemplo.html',
		externo: false,
		exemplo: true
	}
];
