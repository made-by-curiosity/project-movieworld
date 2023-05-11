import { ourTeam } from './our-team';

const refs = {
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
							<h3 class="modal-team__dev-head">${name}</h3>
							<p class="modal-team__dev-text">${dev}</p>
						</div>
					</li>`;
};

refs.downBtn.addEventListener('click', () => changeInValue(-1));
refs.upBtn.addEventListener('click', () => changeInValue(1));
