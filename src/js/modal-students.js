(() => {
	const refs = {
		teamModal: document.getElementById('modal-team'),
		openTeamModal: document.querySelector('.js-open-modal-team'),
		closeTeamModal: document.querySelector('.js-close-modal-team'),
	}
	
	const onClickBtnOpen = () => {
		refs.teamModal.classList.remove('js-hidden');
  };
	
	const onClickBtnClose = () => {
		refs.teamModal.classList.add('js-hidden');
  };

	refs.openTeamModal.addEventListener('click', onClickBtnOpen);
	refs.closeTeamModal.addEventListener('click', onClickBtnClose);
})();