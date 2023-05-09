import { refs } from './js/refs';

import { onLibraryPage } from './js/my-library';
import { onCatalogPage } from './js/catalog';

import { onUpcomingPage } from './js/upcoming';
import { renderWeekelyTrends } from './js/weeklyTrends';
import './js/header';
import './js/mobile-menu';
import './js/hero';
import './js/modal-movie';

if (
  !document.location.pathname.includes('/page-catalog') &&
  !document.location.pathname.includes('/page-my-library')
) {
  onUpcomingPage();
  renderWeekelyTrends();
}

if (document.location.pathname.includes('/page-catalog')) {
  onCatalogPage();
}

if (document.location.pathname.includes('/page-my-library')) {
  onLibraryPage();
}
