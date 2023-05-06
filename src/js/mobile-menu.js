(() => {
	refs = {
		mobileMenu: document.getElementById('mobile-menu'),
		openMenuBtn: document.querySelector('.js-open-menu'),
	}

  const onClickBtn = () => {
    const isMenuOpen =
      refs.openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    	refs.openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
			refs.mobileMenu.classList.toggle('is-open');
		
		// console.log(isMenuOpen);

  };

  refs.openMenuBtn.addEventListener('click', onClickBtn);
})();
