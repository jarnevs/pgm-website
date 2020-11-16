import { BAAS } from '../services';

class AboutPage {
  // function to show the information about the formation
  async generateUIForAbout () {
    const aboutData = await BAAS.getAbout();
    const technologies = await await this.generateUIForTechnologies();
    return aboutData.data.map(item => `
      <div id="part-${item.id}" class="about-part">
        <div class="page-title page-title page-title--smaller-margin">
          <h1>${item.title}</h1>
          <div class="page-title__bar"></div>
        </div>
        <div class="about-part__content">
          ${item.content}
          ${item.img !== '' ? `<img src="${aboutData.domain}${item.img}">` : ''}
          ${item.title === 'Opleidings<br>programma' ? `<div class="technologies"><h2>Technologie</h2><div class="technologies__content d-flex justify-content-between flex-wrap">${technologies}</div></div>` : ''}
          </div>
      </div>
    `).join('');
  }

  // function to load the items in the sidebar
  async generateUIForSideBar () {
    const aboutData = await BAAS.getAbout();
    return aboutData.data.map(item => `
      <li class="sidebar__item"><a id="part-${item.id}" href="#part-${item.id}" class="sidebar__link">${item.title}</a></li>
    `).join('');
  }

  // function to load the technologies when needed
  async generateUIForTechnologies () {
    const technologiesData = await BAAS.getTechnologies();
    return technologiesData.map(technology => `
      <div class="technology d-flex flex-column align-items-center">
        <i class="fab fa-${technology.icon}"></i>
        <p>${technology.name}</p>
      </div>
    `).join('');
  }

  async render () {
    return `
  <div class="page">
    <div class="container">
      <div class="row">
        <div class="col-md-3 col-sm-12 col-12 sidebar-container">
          <div class="sidebar">
            <ul class="sidebar__list">
              ${await this.generateUIForSideBar()}
            </ul>
          </div>
        </div>
        <div class="col-md-9 col-sm-12 col-12">
            ${await this.generateUIForAbout()}
        </div>
      </div>  
    </div>
  </div>
    `;
  }

  // function to change the active filter when scrolled to the position
  changeActiveOnScroll (filters, content) {
    let index = content.length - 1;

    while (window.scrollY + 50 < content[index].offsetTop) {
      index--;
    }

    filters.forEach(element => element.classList.remove('sidebar__link--active'));
    filters[index].classList.add('sidebar__link--active');
    console.log('scroll');
  }

  async afterRender () {
    const filterElements = document.querySelectorAll('.sidebar__link');
    const contentElements = document.querySelectorAll('.about-part');

    filterElements[0].classList.add('sidebar__link--active');
    // create event listeners for each filter to get to the filter item when clicked on
    filterElements.forEach((element) => {
      element.addEventListener('click', (e) => {
        e.preventDefault();

        const { id } = e.target;

        document.querySelector(`div#${id}`).scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // create event listener to change active filter when scrolled to
    window.addEventListener('scroll', (e) => {
      this.changeActiveOnScroll(filterElements, contentElements);
    });
  }

  async mount () {
    // close the menu when you come on the page
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

export default AboutPage;
