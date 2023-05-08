// import { team } from './team';
const team =[
	{
		id: 1,
		name: "Vadim",
		dev: "Team lead",
		photo: "./images/employee_1.jpg",
	},
	{
		id: 2,
		name: "Viktor",
		dev: "Scrum master",
		photo: "./images/employee_2.jpg",
	},
	{
		id: 3,
		name: "Anrii",
		dev: "Developer",
		photo: "./images/employee_3.jpg",
	},
	{
		id: 4,
		name: "Darya",
		dev: "Developer",
		photo: "./images/employee_4.jpg",
	},
	{
		id: 5,
		name: "Jyrii",
		dev: "Developer",
		photo: "./images/employee_5.jpg",
	},
	{
		id: 6,
		name: "Nikolay",
		dev: "Developer",
		photo: "./images/employee_6.jpg",
	},
	{
		id: 7,
		name: "Oleg",
		dev: "Developer",
		photo: "./images/employee_7.jpg",
	},
	{
		id: 8,
		name: "Vitaliy",
		dev: "Developer",
		photo: "./images/employee_8.jpg",
	},
	{
		id: 9,
		name: "Marina",
		dev: "Developer",
		photo: "./images/employee_9.jpg",
	},
	{
		id: 10,
		name: "Oleksandr",
		dev: "Developer",
		photo: "./images/employee_10.jpg",
	},
	{
		id: 11,
		name: "Mihailo",
		dev: "Developer",
		photo: "./images/employee_11.jpg",
	},
]

refs = {
	downBtn: document.querySelector('button[data-modal-down]'),
	upBtn: document.querySelector('button[data-modal-up]'),
	galery: document.querySelector('.modal-team__card'),
};

const changeInValue = value => {
	counterValue += value;

	const newCard = creatingNewCard(team[counterValue]);
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
						<img src='${photo}' width='270' alt='${dev}'>
						<div class="modal-team__dev-info">
							<h3 class="modal-team__dev-head js-theme">${name}</h3>
							<p class="modal-team__dev-text js-theme">${dev}</p>
						</div>
					</li>`;
};

refs.downBtn.addEventListener('click', () => changeInValue(-1));
refs.upBtn.addEventListener('click', () => changeInValue(1));
