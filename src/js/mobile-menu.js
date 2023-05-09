(() => {
  const refs = {
    mobileMenu: document.getElementById('mobile-menu'),
		openMenuBtn: document.querySelector('.js-open-menu'),
		closeMenuBtn: document.getElementById('mobile-menu'),
		navigationList: document.querySelectorAll('.mobile-menu__link'),
  };
	
	const onClickBtnOpen = () => {
		refs.mobileMenu.classList.remove('js-hidden');
		definitionActivePage();
		document.body.classList.add('js-no-scroll');
	};

	const onClickBtnClose = () => {
		document.body.classList.remove('js-no-scroll');
		refs.mobileMenu.classList.add('js-hidden');
	};

	refs.openMenuBtn.addEventListener('click', onClickBtnOpen);
	refs.closeMenuBtn.addEventListener('click', onClickBtnClose);
})();

function definitionActivePage () {
	if (document.location.pathname.includes('/page-catalog')) {
		document.querySelector('.mobile-menu__link--galery').classList.add('current');
		return;
	};

	if (document.location.pathname.includes('/page-my-library')) {
		document.querySelector('.mobile-menu__link--library').classList.add('current');
		return;
	};

	console.log('houm');
	document.querySelector('.mobile-menu__link--home').classList.add('current');
};
