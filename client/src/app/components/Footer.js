import { routes } from '../router';

class Footer {
  async render () {
    return `
      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="footer__block footer-nav col-12 cold-md-12 col-md-6 col-lg-6">
              <h3>Info</h3>
              <ul class="footer-nav__list">
                <li class="footer-nav__item">
                  <a class="footer-nav__link" href="${routes.ABOUT}" data-navigo>Opleiding</a>
                </li>              
                <li class="footer-nav__item">
                  <a class="footer-nav__link" href="${routes.TEAM}" data-navigo>Wie is PGM?</a>
                </li>              
                <li class="footer-nav__item">
                  <a class="footer-nav__link" href="${routes.WORK}" data-navigo>Werkplekleren</a>
                </li>              
                <li class="footer-nav__item">
                  <a class="footer-nav__link" href="${routes.CASES}" data-navigo>Cases</a>
                </li>              
                <li class="footer-nav__item">
                  <a class="footer-nav__link" href="${routes.BLOG}" data-navigo>Blog</a>
                </li>              
                <li class="footer-nav__item">
                  <a class="footer-nav__link" href="${routes.CONTACT}" data-navigo>Contact</a>
                </li>              
              </ul>
            </div>
            <div class="footer__block footer-contact col-12 cold-md-12 col-md-6">
              <h3>Contacteer ons</h3>
              <div class="footer-contact__address">
                <p class="footer__text title-text">Campus Mariakerke</p>
                <p class="footer__text">Industrieweg 232</p>
                <p class="footer__text">9030 Mariakerke</p>
                <p class="footer__text">09 234 86 00</p>
              </div>
              <div class="footer-contact__social">
                <a href="https://www.facebook.com/GraduaatProgrammeren.Arteveldehogeschool" target="_blank"><i class="fab fa-facebook-square"></i></a>
                <a href="https://www.instagram.com/explore/locations/354987211999862/graduaat-programmeren-arteveldehogeschool/?hl=nl" target="_blank"><i class="fab fa-instagram-square"></i></a>
                <a href="https://www.linkedin.com/company/graduaat-programmeren/" target="_blank"><i class="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>        
      </footer>
    `;
  }

  async afterRender () {
    // Connect the listeners
    // const btnHamburger = document.querySelector('.btn-hamburger');
    // btnHamburger.addEventListener('click', (ev) => {
    //   console.log(ev);
    // });
    // return this;
  }
}

export default Footer;
