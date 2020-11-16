import { BAAS } from '../services';
import { routes } from '../router';

class BlogPage {
  constructor () {
    this.postsData = {};
  }

  // function to get the data
  async getData () {
    this.postsData = await BAAS.getPosts();
    this.postsData.data.sort(this.compare);
  }

  // show the content on the page based on page number
  generateUIForBlog (page = 1) {
    console.log(this.postsData);
    const postsPage = this.postsData.data.slice(page * 4 - 4, page * 4);
    console.log(postsPage);
    return postsPage.map(post => `
    <a data-page href="#!${routes.POST_DETAIL.replace(':id', post.id)}" class="main-card" data-navigo>
      <div class="main-card__image">
        <img src="${this.postsData.domain}${post.img}">
      </div>
      <div class="main-card__overlay"></div>
      <h2 class="main-card__title">${post.title}</h2>
    </a>
    `).join('');
  }

  // function to create pages bar at the bottom
  paginateArray (data) {
    let tempStr = '<i class="fas fa-chevron-left back hidden-arrow"></i>';
    let pageNumber = 1;

    for (let i = 0; i < data.length; i += 4) {
      tempStr += `<a class="page-number" data-page="${pageNumber}" href="#!${routes.BLOG}?page=${pageNumber}">${pageNumber}</a>`;
      pageNumber++;
      console.log(i);
    }

    tempStr += '<i class="fas fa-chevron-right next"></i>';

    return tempStr;
  }

  // compare function to sort on date
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
    <div class="page">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-sm-12 col-12">
            <div class="blog">
              <div class="page-title page-title">
                <h1>Blog</h1>
                <div class="page-title__bar"></div>
              </div>
              <div class="d-flex flex-wrap justify-content-between blog-container">
               ${this.generateUIForBlog()}
              </div>
              <div class="pagination d-flex justify-content-center align-items-center">
                ${this.paginateArray(this.postsData.data)}
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
    `;
  }

  async afterRender () {
    const pageNumbers = document.querySelectorAll('.page-number');
    const backArrow = document.querySelector('.back');
    const nextArrow = document.querySelector('.next');
    const blogContainer = document.querySelector('.blog-container');
    let lastNumber = pageNumbers[pageNumbers.length - 1].dataset.page;
    lastNumber = parseInt(lastNumber, 10);

    let pageNumber = 1;

    // initial set of the active page
    pageNumbers[pageNumber - 1].classList.add('active-page');

    pageNumbers.forEach((page) => {
      page.addEventListener('click', (e) => {
        e.preventDefault();
        pageNumber = e.target.dataset.page;
        pageNumber = parseInt(pageNumber, 10);

        // show right content on page
        blogContainer.innerHTML = this.generateUIForBlog(pageNumber);

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

    backArrow.addEventListener('click', (e) => {
      e.preventDefault();

      if (pageNumber > 1) {
        pageNumber--;

        // show right content on page
        blogContainer.innerHTML = this.generateUIForBlog(pageNumber);

        // show arrows again
        nextArrow.classList.remove('hidden-arrow');
        e.target.classList.remove('hidden-arrow');

        // change active page
        pageNumbers.forEach((el) => {
          el.classList.remove('active-page');
        });
        pageNumbers[pageNumber - 1].classList.add('active-page');

        // hide back arrow when on the first page
        if (pageNumber <= 1) {
          e.target.classList.add('hidden-arrow');
        }

        window.scrollTo(0, 0);
      }
    });

    // event listener to go to the next page
    nextArrow.addEventListener('click', (e) => {
      e.preventDefault();

      if (pageNumber < lastNumber) {
        pageNumber++;

        // show right content on page
        blogContainer.innerHTML = this.generateUIForBlog(pageNumber);

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

        window.scrollTo(0, 0);
      }
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

    // get data before rendering
    await this.getData();
  }

  async unmount () {
    // After leaving the page
    return this;
  }
}

export default BlogPage;
