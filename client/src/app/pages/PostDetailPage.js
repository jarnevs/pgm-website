import { BAAS } from '../services';
import { routes } from '../router';

class PostDetailPage {
  // show post on page based on id
  async generateUIForPostDetail (id) {
    const post = await BAAS.getPost(id);

    if (post.data === undefined) {
      window.location.assign('#!/404');
      return '';
    }

    return `
      <div class="row">
        <div class="col-md-12">
          <div class="post__image">
            <img src="${post.domain}${post.data.img}">
          </div>
        </div>
      </div>
      <div class="row post__info">
        <div class="offset-md-2 col-md-8">
          <div class="page-title page-title--no-margin">
            <h1>${post.data.title}</h1>
            <div class="page-title__bar"></div>
          </div>
          <div class="post__meta">
            <span>${this.formatTime(post.data.createdAt)}</span> | <span>${post.data.author}</span>
          </div>
          <div class="post__intro">
            <p class="title-text">
              ${post.data.intro}
            </p>
          </div>
          <div class="post__content">
            ${post.data.content}
          </div>
        </div>
      </div>
      <div class="row related">
        <div class="col-md-12">
          <div class="page-title page-title">
            <h1>Bekijk ook deze artikels</h1>
            <div class="page-title__bar"></div>
          </div>
          <div class="d-flex justify-content-between flex-wrap">
          ${await this.getRelatedPosts(id)}
          </div>
        </div>
      </div>
    `;
  }

  formatTime (time) {
    const date = new Date(time);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${this.addZeros(day)}/${this.addZeros(month + 1)}/${year} - ${this.addZeros(hours)}:${this.addZeros(minutes)}`;
  }

  addZeros (value) {
    let newValue = value.toString();

    while (newValue.length < 2) {
      newValue = `0${newValue}`;
    }

    return newValue;
  }

  async getRelatedPosts (id) {
    const posts = await BAAS.getPostsWithoutCurrent(id);
    const relatedProjects = [];
    let prevIndex = null;

    while (relatedProjects.length < 2) {
      let randomIndex = Math.floor(Math.random() * posts.data.length);

      if (prevIndex !== null) {
        if (randomIndex === prevIndex) {
          randomIndex += 1;

          if (randomIndex >= posts.data.length) {
            randomIndex = 0;
          }
        }
      }

      relatedProjects.push(posts.data[randomIndex]);
      prevIndex = randomIndex;
    }

    return relatedProjects.map(post => `
    <a href="#!${routes.POST_DETAIL.replace(':id', post.id)}" class="main-card" data-navigo>
      <div class="main-card__image">
        <img src="${posts.domain}${post.img}">
      </div>
      <div class="main-card__overlay"></div>
      <h2 class="main-card__title">${post.title}</h2>
    </a>
    `).join('');
  }

  replaceParameter (route, id) {
    return route.replace(':id', id);
  }

  async render (params) {
    return `
      <div class="page">
        <div class="container">
          ${await this.generateUIForPostDetail(params.id)}
        </div>
      </div>
    `;
  }

  async afterRender () {
    // Connect the listeners
    return this;
  }

  async mount () {
    // Before the rendering of the page
    const btnHamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.main-nav__list');

    menu.classList.remove('main-nav__list--show');
    btnHamburger.classList.remove('fa-times');
    btnHamburger.classList.add('fa-bars');
    document.body.style.overflow = 'initial';
    window.scrollTo(0, 0);
  }

  async unmount () {
    // After leaving the page
    return this;
  }
}

export default PostDetailPage;
