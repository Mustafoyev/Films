let elList = document.querySelector('.js-list');
let elSelect1 = document.querySelector('.js-select1');
let elSelect2 = document.querySelector('.js-select2');
let elBtn = document.querySelector('.dark-btn');
let elBookMark = document.querySelector('.bookmark');
let elMarkWrapper = document.querySelector('.js-mark-wrapper');
let elMarkList = document.querySelector('.js-mark-list');
let elInfoList = document.querySelector('.js-info-list');
let addFragment = document.createDocumentFragment();
let addInfoFragment = document.createDocumentFragment();
let addMarkFragment = document.createDocumentFragment();

let markArray = [];
let infoArray = [];

function year(format) {
	var date = new Date(format);
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function filmFunc(array, node) {
	array.forEach((item) => {
		let newItem = document.createElement('li');
		let newTitle = document.createElement('h3');
		let newImg = document.createElement('img');
		let markBtn = document.createElement('button');
		let infoBtn = document.createElement('button');

		newTitle.textContent = item.title;
		newImg.src = item.poster;
		newImg.setAttribute('alt', 'Film image');
		newImg.setAttribute('width', '200');
		newImg.setAttribute('height', '200');
		markBtn.textContent = 'Mark';
		markBtn.setAttribute('class', 'mark-btn js-mark');
		infoBtn.textContent = 'Info';
		infoBtn.setAttribute('class', 'info-btn js-info');

		markBtn.dataset.markId = item.id;
		infoBtn.dataset.infoId = item.id;

		newItem.appendChild(newTitle);
		newItem.appendChild(newImg);
		newItem.appendChild(markBtn);
		newItem.appendChild(infoBtn);
		addFragment.appendChild(newItem);
	});
	node.appendChild(addFragment);
}

filmFunc(films, elList);

function mark(array, add) {
	elMarkList.innerHTML = '';
	array.forEach((el) => {
		let newItem = document.createElement('li');
		let newTitle = document.createElement('h3');
		let delmark = document.createElement('button');

		newTitle.textContent = el.title;
		newTitle.setAttribute('class', 'mark-title');
		delmark.textContent = 'X';
		delmark.setAttribute('class', 'del-mark-btn');

		delmark.dataset.delMarkId = el.id;

		newItem.appendChild(newTitle);
		newItem.appendChild(delmark);
		addMarkFragment.appendChild(newItem);
	});
	add.appendChild(addMarkFragment);
}

function info(array, add) {
	array.forEach((el) => {
		let newLi = document.createElement('li');
		let newInfoContent = document.createElement('div');
		let newTitle = document.createElement('h3');
		let delBtn = document.createElement('button');
		let newText = document.createElement('p');
		let newTime = document.createElement('span');
		let newType = document.createElement('span');

		newInfoContent.setAttribute('class', 'info-content');
		newTitle.textContent = el.title;
		newTitle.setAttribute('class', 'info-title');
		delBtn.textContent = 'X';
		delBtn.setAttribute('class', 'del-btn');
		newText.textContent = el.overview;
		newTime.textContent = `Date of submission: ${year(el.release_date)}`;
		newType.textContent = `Genre: ${el.genres}`;

		newInfoContent.appendChild(delBtn);
		newInfoContent.appendChild(newTitle);
		newInfoContent.appendChild(newText);
		newInfoContent.appendChild(newTime);
		newInfoContent.appendChild(newType);
		newLi.appendChild(newInfoContent);
		addInfoFragment.appendChild(newLi);
	});
	add.appendChild(addInfoFragment);
}

elList.addEventListener('click', function (evt) {
	if (evt.target.matches('.js-mark')) {
		let findId = evt.target.dataset.markId;
		let findItem = films.find((el) => el.id == findId);
		if (!markArray.includes(findItem)) {
			markArray.push(findItem);
			mark(markArray, elMarkList);
		}
	}

	if (evt.target.matches('.js-info')) {
		let findId = evt.target.dataset.infoId;
		let findItem = films.find((el) => el.id == findId);
		infoArray.push(findItem);
		info(infoArray, elInfoList);
	}
});

elMarkWrapper.addEventListener('click', function (evt) {
	if (evt.target.matches('.del-mark-btn')) {
		let findId = evt.target.dataset.delMarkId;
		let findItem = markArray.findIndex((el) => el.id == findId);
		markArray.splice(findItem, 1);
		mark(markArray, elMarkList);
	}
});

elInfoList.addEventListener('click', function (evt) {
	if (evt.target.matches('.del-btn')) {
		infoArray.pop();
		elInfoList.innerHTML = '';
	}
});

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

let theme = false;

elBtn.addEventListener('click', function () {
	theme = !theme;
	window.localStorage.setItem('theme', theme ? 'dark' : 'light');

	changeTheme();
});

function changeTheme() {
	if (window.localStorage.getItem('theme') == 'light') {
		document.body.classList.add('light');
	} else {
		document.body.classList.remove('light');
	}
}

changeTheme();

elBookMark.addEventListener('click', function () {
	elMarkWrapper.classList.toggle('mark-wrapper');
});
