// Словарь для замены латинских символов на кириллические
export const CYRILLIC_MAP: {
	[key: string]: string;
} = {
	a: "cyrillic_ef",
	b: "cyrillic_i",
	c: "cyrillic_es",
	d: "cyrillic_ve",
	e: "cyrillic_u",
	f: "cyrillic_a",
	g: "cyrillic_pe",
	h: "cyrillic_er",
	i: "cyrillic_sha",
	j: "cyrillic_o",
	k: "cyrillic_el",
	l: "cyrillic_de",
	m: "cyrillic_softsign",
	n: "cyrillic_te",
	o: "cyrillic_shcha",
	p: "cyrillic_ze",
	q: "cyrillic_shorti",
	r: "cyrillic_ka",
	s: "cyrillic_yeru",
	t: "cyrillic_ie",
	u: "cyrillic_ghe",
	v: "cyrillic_em",
	w: "cyrillic_tse",
	x: "cyrillic_che",
	y: "cyrillic_en",
	z: "cyrillic_ya",
	"`": "cyrillic_io",
	";": "cyrillic_zhe",
	"'": "cyrillic_e",
	",": "cyrillic_be",
	".": "cyrillic_yu",
	"[": "cyrillic_ha",
	"]": "cyrillic_hardsign",
} as const;
