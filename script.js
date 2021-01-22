const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const count = 20;
const apiKey = '[API_KEY]';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

/* Verifica se tds as imgs já foram carregadas */
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
	}
}

/* função auxiliar pra setar os attrs dos elementos da DOM */
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

/* Cria os elementos p/ links e fotos e dp add na DOM */
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	/* exec a f p/ cd item do array */
	photosArray.forEach((photo) => {
		/* Cria o elem <a> */
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		});

		/* Cria o elem <img> */
		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});

		img.addEventListener('load', imageLoaded);

		/* coloca <img> dentro de <a> e ambos dentro do container */
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

/* get fotos */
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
	} catch (error) {
		//
	}
}

/* verif se o scroll já esta perto do final da pag, p/ carregar mais fotos */
window.addEventListener('scroll', () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotos();
	}
});

// On Load
getPhotos();
