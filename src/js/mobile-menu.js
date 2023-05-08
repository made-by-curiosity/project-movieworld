// (() => {
//   const refs = {
//     mobileMenu: document.getElementById('mobile-menu'),
//     openMenuBtn: document.querySelector('.js-open-menu'),
//   };

//   const onClickBtn = () => {
//     const isMenuOpen =
//       refs.openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
//     refs.openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
//     refs.mobileMenu.classList.toggle('is-open');
//   };

//   refs.openMenuBtn.addEventListener('click', onClickBtn);
// })();

(() => {
  const refs = {
    mobileMenu: document.getElementById('mobile-menu'),
		openMenuBtn: document.querySelector('.js-open-menu'),
		closeMenuBtn: document.getElementById('mobile-menu'),
  };

	const onClickBtnOpen = () => {
		refs.mobileMenu.classList.remove('js-hidden');
	};

	const onClickBtnClose = () => {
		refs.mobileMenu.classList.add('js-hidden');
	};

	refs.openMenuBtn.addEventListener('click', onClickBtnOpen);
	refs.closeMenuBtn.addEventListener('click', onClickBtnClose);
})();
