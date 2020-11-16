import { routes } from '../router';
import { BAAS } from '../services';

class CasesPage {
  constructor () {
    this.casesData = {};
  }

  // show content on page based on filter and page
  async generateUIForCases (course = 'all', page = 1) {
    this.casesData = course === 'all' ? await BAAS.getCases() : await BAAS.getCasesByCourse(course);
    this.casesData.data.sort(this.compare);
    const casesPage = this.casesData.data.slice(page * 4 - 4, page * 4);
    return casesPage.map(project => `
    <a href="#!${routes.CASE_DETAIL.replace(':id', project.id)}" class="main-card">
      <div class="main-card__image">
        <img src="${this.casesData.domain}${project.thumbnail}">
      </div>
      <p class="main-card__tag">${project.course}</p>
      <div class="main-card__overlay"></div>
      <h2 class="main-card__title">${project.title}</h2>
    </a>
    `).join('');
  }

  // load courses for siderbar
  async generateUIForSideBar () {
    const casesData = await BAAS.getCases();
    const uniqueCourses = [];

    casesData.data.forEach((project) => {
      if (!uniqueCourses.includes(project.course)) {
        uniqueCourses.push(project.course);
      }
    });

    return uniqueCourses.sort().map(course => `
      <li class="sidebar__item"><a data-id="${course}" href="" class="sidebar__link filter">${course}</a></li>
    `).join('');
  }

  // fucntion to sort on title
  compare (a, b) {
    let order = 0;

    if (a.title > b.title) {
      order = 1;
    }

    if (a.title < b.title) {
      order = -1;
    }

    return order;
  }

  // function to create pages bar at the bottom
  paginateArray (data) {
    let tempStr = '<i class="fas fa-chevron-left back hidden-arrow"></i>';
    let pageNumber = 1;

    for (let i = 0; i < data.length; i += 4) {
      tempStr += `<a class="page-number" data-page="${pageNumber}" href="">${pageNumber}</a>`;
      pageNumber++;
      console.log(i);
    }

    tempStr += '<i class="fas fa-chevron-right next"></i>';

    return tempStr;
  }

  async render () {
    return `
    <div class="page">
    <div class="container">
      <div class="row">
        <div class="col-md-3 col-sm-12 col-12 sidebar-container">
          <div class="sidebar">
            <p class="title-sidebar">Vak</p>
            <ul class="sidebar__list">
              <li class="sidebar__item"><a data-id="all" href="" class="sidebar__link sidebar__link--active filter">Alle vakken</a></li>
              ${await this.generateUIForSideBar()}
            </ul>
          </div>
        </div>
        <div class="col-md-9 col-sm-12 col-12">
          <div id="team" class="team">
            <div class="page-title page-title">
              <h1>Cases</h1>
              <div class="page-title__bar"></div>
            </div>
            <div class="d-flex flex-wrap justify-content-between cases-container">
              ${await this.generateUIForCases()}
            </div>
            <div class="pagination d-flex justify-content-center align-items-center">
              ${this.paginateArray(this.casesData.data)}
            </div>
          </div>
        </div>
      </div>  
    </div>
  </div>
    `;
  }

  // function to create event listeners for arrow and pages
  createEventListeners (course, casesContainer) {
    const container = casesContainer;

    const pageNumbers = document.querySelectorAll('.page-number');
    const backArrow = document.querySelector('.back');
    const nextArrow = document.querySelector('.next');
    let lastNumber = pageNumbers[pageNumbers.length - 1].dataset.page;
    lastNumber = parseInt(lastNumber, 10);

    let pageNumber = 1;

    // initial set of the active page
    pageNumbers[pageNumber - 1].classList.add('active-page');

    if (pageNumbers.length < 2) {
      nextArrow.classList.add('hidden-arrow');
    }

    pageNumbers.forEach((page) => {
      page.addEventListener('click', async (e) => {
        e.preventDefault();
        pageNumber = e.target.dataset.page;
        pageNumber = parseInt(pageNumber, 10);

        // show right content on page
        container.innerHTML = await this.generateUIForCases(course, pageNumber);

        // change active page
        pageNumbers.forEach((el) => {
          el.classList.remove('active-page');
        });

        e.target.classList.add('active-page');

        // show both arrows again
        backArrow.classList.remove('hidden-arrow');
        nextArrow.classList.remove('hidden-arrow');

        // when on first page hide back arrow
        if (pageNumber === 1) {
          backArrow.classList.add('hidden-arrow');
        }

        // when on last page hide next arrow
        if (pageNumber === lastNumber) {
          nextArrow.classList.add('hidden-arrow');
        }

        window.scrollTo(0, 0);
      });
    });

    backArrow.addEventListener('click', async (e) => {
      e.preventDefault();

      if (pageNumber > 1) {
        pageNumber--;

        // show right content on page
        container.innerHTML = await this.generateUIForCases(course, pageNumber);

        // show arrows again
        e.target.classList.remove('hidden-arrow');
        nextArrow.classList.remove('hidden-arrow');

        // change active page
        pageNumbers.forEach((el) => {
          el.classList.remove('active-page');
        });
        pageNumbers[pageNumber - 1].classList.add('active-page');

        // hide back arrow when on the first page
        if (pageNumber <= 1) {
          e.target.classList.add('hidden-arrow');
        }
      }

      window.scrollTo(0, 0);
    });

    nextArrow.addEventListener('click', async (e) => {
      e.preventDefault();

      if (pageNumber < lastNumber) {
        pageNumber++;

        // show right content on page
        container.innerHTML = await this.generateUIForCases(course, pageNumber);

        // show back arrow again
        backArrow.classList.remove('hidden-arrow');

        // change active page
        pageNumbers.forEach((el) => {
          el.classList.remove('active-page');
        });
        pageNumbers[pageNumber - 1].classList.add('active-page');

        // hide next-arrow when on the last page
        if (pageNumber === lastNumber) {
          e.target.classList.add('hidden-arrow');
        }
      } else {
        e.target.classList.add('hidden-arrow');
      }

      window.scrollTo(0, 0);
    });
  }

  async afterRender () {
    const filters = document.querySelectorAll('.filter');
    const casesContainer = document.querySelector('.cases-container');
    const paginationContainer = document.querySelector('.pagination');
    let course = 'all';

    // create event listener to filter
    filters.forEach((filter) => {
      filter.addEventListener('click', async (e) => {
        e.preventDefault();

        course = e.target.dataset.id;

        // change active filter
        filters.forEach((el) => {
          el.classList.remove('sidebar__link--active');
        });

        e.target.classList.add('sidebar__link--active');

        // show content based on course
        casesContainer.innerHTML = await this.generateUIForCases(course);

        // show new page numbers
        paginationContainer.innerHTML = this.paginateArray(this.casesData.data);

        // recreate event listeners for pagination after filter is selected
        this.createEventListeners(course, casesContainer);
      });
    });

    // initial creation of even listeners for pagination
    this.createEventListeners(course, casesContainer);
  }

  async mount () {
    // close menu
    const btnHamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.main-nav__list');

    menu.classList.remove('main-nav__list--show');
    btnHamburger.classList.remove('fa-times');
    btnHamburger.classList.add('fa-bars');
    document.body.style.overflow = 'initial';

    return this;
  }

  async unmount () {
    // After leaving the page
    return this;
  }
}

export default CasesPage;
