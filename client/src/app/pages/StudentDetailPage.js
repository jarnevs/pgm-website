import { BAAS } from '../services';

class StudentDetailPage {
  // show student based on id
  async generateUIForStudentDetail (id) {
    const student = await BAAS.getStudent(id);

    if (student === undefined) {
      window.location.assign('#!/404');
      return '';
    }

    return `
      <div class="row case-student__info">
        <div class="col-md-5 col-sm-12 col-12">
          <div class="case-student__container-image">
            <div class="case-student__main-image">
              <img src="${student.fields.img[0].url}">
            </div>
            <div class="blue-square"></div>
          </div>
        </div>
        <div class="offset-md-1 col-md-5 col-sm-12 col-12">
          <div class="page-title page-title--smaller-margin">
            <h1>${student.fields.name_first} ${student.fields.name_last}</h1>
            <div class="page-title__bar"></div>
          </div>
          <div class="student__block">
            <p>${student.fields.about !== undefined ? student.fields.about : ''}</p>
          </div>
          <div class="student__quote student__block">
            <p>"${student.fields.quote_alt}"</p>
          </div>
          <div class="student__course student__block">
            <p class="title-text">Favoriete vak</p>
            <div>${student.fields.favourite}</div>
          </div>
          <div class="student__block">
            <p class="title-text">Interesses</p>
            <p>${student.fields.interests !== undefined ? student.fields.interests : '/'}</p>
          </div>
        </div>
      </div>
    `;
  }

  async render (params) {
    return `
      <div class="page">
        <div class="container case-student student">
          ${await this.generateUIForStudentDetail(params.id)}
        </div>
      </div>
    `;
  }

  async afterRender () {
    // Connect the listeners
    const btnHamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.main-nav__list');

    menu.classList.remove('main-nav__list--show');
    btnHamburger.classList.remove('fa-times');
    btnHamburger.classList.add('fa-bars');
    document.body.style.overflow = 'initial';
    window.scrollTo(0, 0);
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
    return this;
  }

  async unmount () {
    // After leaving the page
    return this;
  }
}

export default StudentDetailPage;
