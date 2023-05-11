import { ourTeam } from './our-team';

// const ourTeam = [
// 	{
// 		id: 1,
// 		name: "Vadym Agienko",
// 		dev: "Team lead",
// 		photo: "./images/desctop-2x.jpg",
// 	},
// 	{
// 		id: 2,
// 		name: "Viktor Biruk",
// 		dev: "Scrum master",
// 		photo: "./images/cat1.png",
// 	},
// 	{
// 		id: 3,
// 		name: "Andrey Datsenko",
// 		dev: "Developer",
// 		photo: "./images/left.svg",
// 	},
// 	{
// 		id: 4,
// 		name: "Daria Makarova",
// 		dev: "Developer",
// 		photo: "./images/dev_4.jpg",
// 	},
// 	{
// 		id: 5,
// 		name: "Yurii Hlushko",
// 		dev: "Developer",
// 		photo: "./images/dev_5.jpg",
// 	},
// 	{
// 		id: 6,
// 		name: "Nikolay Cherkasov",
// 		dev: "Developer",
// 		photo: "./images/dev_6.jpg",
// 	},
// 	{
// 		id: 7,
// 		name: "Oleg Vlasiuk",
// 		dev: "Developer",
// 		photo: "./images/dev_7.jpg",
// 	},
// 	{
// 		id: 8,
// 		name: "Vitaliy Dunyushkin",
// 		dev: "Developer",
// 		photo: "./images/dev_8.jpg",
// 	},
// 	{
// 		id: 9,
// 		name: "Maryna Onikhovska",
// 		dev: "Developer",
// 		photo: "./images/dev_9.jpg",
// 	},
// 	{
// 		id: 10,
// 		name: "Oleksandr Braun",
// 		dev: "Developer",
// 		photo: "./images/dev_10.jpg",
// 	},
// 	{
// 		id: 11,
// 		name: "Mykhailo Hryvinskyi",
// 		dev: "Developer",
// 		photo: "./images/dev_11.jpg",
// 	},
// ];

refs = {
	downBtn: document.querySelector('button[data-modal-down]'),
	upBtn: document.querySelector('button[data-modal-up]'),
	galery: document.querySelector('.modal-team__card'),
};

const changeInValue = value => {
	counterValue += value;

	const newCard = creatingNewCard(ourTeam[counterValue]);
	refs.galery.innerHTML = newCard;

	refs.downBtn.disabled = counterValue === 0 ? true : false;
	refs.upBtn.disabled = counterValue === 10 ? true : false;
};

let counterValue = 0;
refs.downBtn.disabled = true;
changeInValue(0);	

function creatingNewCard(item) {
	const { name, dev, photo } = item;
	return `<li class='modal-team__dev'>
						<div class='modal-team__img'>
							<img src='${photo}' width='270' alt=''>
						</div>
						<div class="modal-team__dev-info">
							<h3 class="modal-team__dev-head js-theme">${name}</h3>
							<p class="modal-team__dev-text js-theme">${dev}</p>
						</div>
					</li>`;
};

refs.downBtn.addEventListener('click', () => changeInValue(-1));
refs.upBtn.addEventListener('click', () => changeInValue(1));
