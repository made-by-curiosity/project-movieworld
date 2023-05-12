import { ourTeam } from './our-team';

const refs = {
	downBtn: document.querySelector('button[data-modal-down]'),
	upBtn: document.querySelector('button[data-modal-up]'),
	galery: document.querySelector('.modal-team__card'),
}

const changeInValue = value => {
  counterValue += value;
	if (counterValue < 0) counterValue = 10;
	if (counterValue > 10) counterValue = 0;

  const newCard = creatingNewCard(ourTeam[counterValue]);
  refs.galery.innerHTML = newCard;
};

let counterValue = 0;
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
}

refs.downBtn.addEventListener('click', () => changeInValue(-1));
refs.upBtn.addEventListener('click', () => changeInValue(1));
