let elList = document.querySelector('.js-list');
let elSelect1 = document.querySelector('.js-select1');
let elSelect2 = document.querySelector('.js-select2');

function year(format) {
	var date = new Date(format);
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function filmFunc(array, node) {
	array.forEach((item) => {
		let newItem = document.createElement('li');
		let newTitle = document.createElement('h3');
		let newImg = document.createElement('img');
		let newDiv = document.createElement('div');
		let newText = document.createElement('p');
		let newTime = document.createElement('span');
		let newType = document.createElement('span');

		newTitle.textContent = item.title;
		newImg.src = item.poster;
		newImg.setAttribute('alt', 'Film image');
		newImg.setAttribute('width', '200');
		newImg.setAttribute('height', '200');
		newDiv.setAttribute('class', 'wrapper');
		newText.textContent = item.overview;
		newTime.textContent = year(item.release_date);
		newType.textContent = item.genres;

		newItem.appendChild(newTitle);
		newItem.appendChild(newImg);
		newItem.appendChild(newDiv);
		newDiv.appendChild(newText);
		newItem.appendChild(newTime);
		newItem.appendChild(newType);
		node.appendChild(newItem);
	});
}

filmFunc(films, elList);

let genreArr = new Set();

films.forEach((item) => {
	item.genres.forEach((el) => {
		genreArr.add(el);
	});
});

genreArr.forEach((el) => {
	let elOption = document.createElement('option');

	elOption.value = el;
	elOption.text = el;

	elSelect1.appendChild(elOption);
});

elSelect1.addEventListener('change', function () {
	let selVal1 = elSelect1.value;
	let sortGenre = [];
	elList.innerHTML = '';

	if (selVal1 == 'All') {
		filmFunc(films, elList);
	}

	films.forEach((elem) => {
		if (elem.genres.includes(selVal1)) {
			sortGenre.push(elem);
		}
	});

	filmFunc(sortGenre, elList);
});

elSelect2.addEventListener('change', function () {
	let sortArr = [];
	elList.innerHTML = '';

	if (elSelect2.value == 'Aa-Zz') {
		let Aa = films.sort((a, b) => {
			let titleA = a.title.toUpperCase().charCodeAt(0);
			let titleB = b.title.toUpperCase().charCodeAt(0);

			if (titleA < titleB) {
				return -1;
			} else if (titleA > titleB) {
				return 1;
			} else {
				return 0;
			}
		});
		sortArr = Aa;
	}

	if (elSelect2.value == 'Zz-Aa') {
		let Aa = films.sort((a, b) => {
			let titleA = a.title.toUpperCase().charCodeAt(0);
			let titleB = b.title.toUpperCase().charCodeAt(0);

			if (titleA > titleB) {
				return -1;
			} else if (titleA < titleB) {
				return 1;
			} else {
				return 0;
			}
		});
		sortArr = Aa;
	}

	filmFunc(sortArr, elList);
});
