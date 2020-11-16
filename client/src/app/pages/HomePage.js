import { BAAS } from '../services';

import { routes } from '../router';

import home1 from '../_static/images/home-1.jpg';
import home2 from '../_static/images/klas.jpg';

class HomePage {
  // show random projects on page
  async getCasesHome () {
    const projects = await BAAS.getCases();
    const randomProjects = [];
    let prevIndex = null;

    while (randomProjects.length < 2) {
      let randomIndex = Math.floor(Math.random() * projects.data.length);

      if (prevIndex !== null) {
        if (randomIndex === prevIndex) {
          randomIndex += 1;

          if (randomIndex >= projects.data.length) {
            randomIndex = 0;
          }
        }
      }

      randomProjects.push(projects.data[randomIndex]);
      prevIndex = randomIndex;
    }

    return randomProjects.map(project => `
    <a href="#!${routes.CASE_DETAIL.replace(':id', project.id)}" class="main-card" data-navigo>
      <div class="main-card__image">
        <img src="${projects.domain}${project.thumbnail}">
      </div>
      <p class="main-card__tag">${project.course}</p>
      <div class="main-card__overlay"></div>
      <h2 class="main-card__title">${project.title}</h2>
    </a>
    `).join('');
  }

  // show recent news on page
  async getRecentNews () {
    const postsData = await BAAS.getPosts();
    postsData.data.sort(this.compare);
    postsData.data = postsData.data.slice(0, 2);
    return postsData.data.map(post => `
    <a href="#!${routes.POST_DETAIL.replace(':id', post.id)}" class="main-card" data-navigo>
      <div class="main-card__image">
        <img src="${postsData.domain}${post.img}">
      </div>
      <div class="main-card__overlay"></div>
      <h2 class="main-card__title">${post.title}</h2>
    </a>
    `).join('');
  }

  // function to sort on date
  compare (a, b) {
    let order = 0;

    if (a.createdAt > b.createdAt) {
      order = -1;
    }

    if (a.createdAt < b.createdAt) {
      order = 1;
    }

    return order;
  }

  async render () {
    return `
      <div class="page home">
        <div class="container">
          <div class="row home__about home__block">
            <div class="col-12 col-sm-12 col-md-6">
              <div class="case-student__container-image">
                <div class="case-student__main-image">
                  <img src="${home1}">
                </div>
                <div class="blue-square"></div>
              </div>
            </div>
            <div class="col-12 col-sm-12 offset-md-1 col-md-5">
              <div class="page-title page-title">
                <h1>Graduaat<br>Programmeren</h1>
                <div class="page-title__bar"></div>
              </div>
              <p class="home-phrase">Deze opleiding is een nieuwe opleiding die praktisch gericht te werk gaat. Je leert zaken die je dan later omzet in praktijk. Je leert een heel met verschillende technologieën werken. Klik hieronder om alles te weten komen.</p>
              <a href="#!${routes.ABOUT}" class="cta__button">Ga naar opleiding</a>
            </div>
          </div>
          <div class="row flex-row-reverse home__team home__block">
            <div class="col-12 col-sm-12 offset-md-1 col-md-6">
              <div class="case-student__container-image">
                <div class="case-student__main-image">
                  <img src="${home2}">
                </div>
                <div class="blue-square blue-square--right"></div>
              </div>
            </div>
            <div class="col-12 col-sm-12 col-md-5">
              <div class="page-title page-title">
                <h1>Kom te<br>weten wie pgm is</h1>
                <div class="page-title__bar"></div>
              </div>
              <p class="home-phrase">Deze richting bestaat uit een gemotiveerd team van docenten die je zoveel mogelijk zullen begeleiden. Ook de studenten kunnen een grote hulpbron zijn. Klik snel hieronder om te zien wie jouw zal helpen in de opleiding!</p>
              <a href="#!${routes.TEAM}" class="cta__button">Leer ons kennen</a>
            </div>
          </div>
          <div class="row related">
            <div class="col-md-12">
              <div class="page-title page-title">
                <h1>Werk van studenten</h1>
                <div class="page-title__bar"></div>
              </div>
              <div class="d-flex justify-content-between flex-wrap">
                ${await this.getCasesHome()}
              </div>
              <div class="cta d-flex justify-content-center">
                <a href="#!${routes.CASES}" class="cta__button">Meer cases</a>
              </div>
            </div>
          </div>
          <div class="row related">
            <div class="col-md-12">
              <div class="page-title page-title">
                <h1>Recent nieuws</h1>
                <div class="page-title__bar"></div>
              </div>
              <div class="d-flex justify-content-between flex-wrap">
                ${await this.getRecentNews()}
              </div>
              <div class="cta d-flex justify-content-center">
                <a href="#!${routes.BLOG}" class="cta__button">Meer nieuws</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  async afterRender () {
    // Connect the listeners
    return this;
  }

  async mount () {
    // close menu
    const btnHamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.main-nav__list');

    menu.classList.remove('main-nav__list--show');
    btnHamburger.classList.remove('fa-times');
    btnHamburger.classList.add('fa-bars');
    document.body.style.overflow = 'initial';
    window.scrollTo(0, 0);
    return this;
  }

  async unmount () {
    // After leaving the page
    return this;
  }
}

export default HomePage;
