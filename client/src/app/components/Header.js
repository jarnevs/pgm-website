import { routes } from '../router';

class Header {
  async render () {
    return `
      <header class="header">
        <div class="container">
          <div class="row align-items-center">
            <div class="logo col-3 col-sm-3 col-md-3">
              <a class="logo__link" href="${routes.HOME}" data-navigo>PGM</a>
            </div>
            <div class="main-nav col-9 col-sm-9 col-md-9">
              <i class="fas fa-bars hamburger"></i>
              <ul class="main-nav__list">
                <li class="main-nav__item">
                  <a class="main-nav__link" href="${routes.ABOUT}" data-navigo>Opleiding</a>
                </li>              
                <li class="main-nav__item">
                  <a class="main-nav__link" href="${routes.TEAM}" data-navigo>Wie is PGM?</a>
                </li>              
                <li class="main-nav__item">
                  <a class="main-nav__link" href="${routes.WORK}" data-navigo>Werkplekleren</a>
                </li>              
                <li class="main-nav__item">
                  <a class="main-nav__link" href="${routes.CASES}" data-navigo>Cases</a>
                </li>              
                <li class="main-nav__item">
                  <a class="main-nav__link" href="${routes.BLOG}" data-navigo>Blog</a>
                </li>              
                <li class="main-nav__item">
                  <a class="main-nav__link" href="${routes.CONTACT}" data-navigo>Contact</a>
                </li>              
              </ul>
            </div>
          </div>
        </div>        
      </header>
    `;
  }

  async afterRender () {
    const btnHamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.main-nav__list');

    menu.classList.remove('main-nav__list--show');
    btnHamburger.classList.remove('fa-times');
    btnHamburger.classList.add('fa-bars');
    document.body.style.overflow = 'initial';

    btnHamburger.addEventListener('click', (e) => {
      console.log(e.target);

      if (menu.classList.contains('main-nav__list--show')) {
        menu.classList.remove('main-nav__list--show');
        e.target.classList.remove('fa-times');
        e.target.classList.add('fa-bars');
        document.body.style.overflow = 'initial';
      } else {
        menu.classList.add('main-nav__list--show');
        e.target.classList.add('fa-times');
        e.target.classList.remove('fa-bars');
        document.body.style.overflow = 'hidden';
      }
    });
    return this;
  }

  updateActiveLink (route) {
    const prevActiveMenuItemElement = document.querySelector(`.main-nav__item > a[class*="active"]`);
    if (prevActiveMenuItemElement) {
      prevActiveMenuItemElement.classList.remove('main-nav__link--active');
    }
    const link = route.replace('#!', '');
    const menuItemElement = document.querySelector(`.main-nav__item > a[href*="${link}"]`);
    if (menuItemElement) {
      menuItemElement.classList.add('main-nav__link--active');
    }
  }
}

export default Header;
