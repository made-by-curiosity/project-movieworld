(() => {
	const refs = {
		teamModal: document.getElementById('modal-team'),
		openTeamModal: document.querySelector('.js-open-modal-team'),
		closeTeamModal: document.querySelector('.js-close-modal-team'),
	}
	
// refs.teamModal.classList.toggle('js-hidden');
	// const onClickBtnOpen = () => {
  //   const isFormOpen = refs.openTeamModal.getAttribute('aria-expanded') === 'true' || false;
  //   refs.openTeamModal.setAttribute('aria-expanded', !isFormOpen);
	// 	refs.teamModal.classList.toggle('js-hidden');
  // };
	const onClickBtnOpen = () => {
		refs.teamModal.classList.remove('js-hidden');
  };
	
	const onClickBtnClose = () => {
		refs.teamModal.classList.add('js-hidden');
  };

	refs.openTeamModal.addEventListener('click', onClickBtnOpen);
	refs.closeTeamModal.addEventListener('click', onClickBtnClose);
})();