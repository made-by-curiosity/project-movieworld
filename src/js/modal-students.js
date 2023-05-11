(() => {
  const refs = {
    teamModal: document.getElementById('modal-team'),
    openTeamModal: document.querySelector('.js-open-modal-team'),
    closeTeamModal: document.querySelector('.js-close-modal-team'),
  };

  const onClickBtnOpen = () => {
    refs.teamModal.classList.remove('js-hidden');

    window.addEventListener('keydown', onEscPress);
    refs.closeTeamModal.addEventListener('click', onClickBtnClose);
    refs.teamModal.addEventListener('click', onClickBtnClose);
  };

  const onClickBtnClose = event => {
    if (
      event.target.classList[0] !== 'modal-team__icon-close' &&
      event.target.classList[0] !== 'backdrop-modal'
    ) {
      return;
    }

    refs.teamModal.classList.add('js-hidden');
    refs.closeTeamModal.removeEventListener('click', onClickBtnClose);
    refs.teamModal.removeEventListener('click', onClickBtnClose);
  };

  function onEscPress(e) {
    if (e.code === 'Escape') {
      refs.teamModal.classList.add('js-hidden');
      window.removeEventListener('keydown', onEscPress);
    }
  }

  refs.openTeamModal.addEventListener('click', onClickBtnOpen);
})();
