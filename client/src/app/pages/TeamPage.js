import { routes } from '../router';
import { BAAS } from '../services';

class TeamPage {
  // show team
  async generateUIForTeam () {
    const teamsData = await BAAS.getTeam();
    teamsData.data.sort(this.compareTeam);
    return teamsData.data.map(member => `
        <div class="card-person">
          <div class="card-person__image">
            <img src="${teamsData.domain}${member.img}" alt="${member.firstName} ${member.lastName}">
          </div>
          <div class="card-person__info  d-flex flex-column justify-content-between">
            <h2>${member.firstName}<br>${member.lastName}</h2>
            <div>
              <p>${member.mainFunction}</p>
              <p>${member.isTeacher ? member.courses.join(', ') : member.extraFunction}</p>
            </div>
          </div>
        </div>
    `).join('');
  }

  // show students
  async generateUIForStudents () {
    const studentsData = await BAAS.getStudents();
    studentsData.sort(this.compareStudents);
    return studentsData.map(student => `
        <a data-id="${student.fields.generation}" href="#!${routes.STUDENT_DETAIL.replace(':id', student.id)}" class="card-person card-person--student" data-navigo>
          <div class="card-person__image">
            <img src="${student.fields.img[0].thumbnails.large.url}" alt="${student.fields.name_first} ${student.fields.name_last}">
          </div>
          <div class="card-person__info  d-flex flex-column justify-content-between">
            <h2>${student.fields.name_first}<br>${student.fields.name_last}</h2>
            <div>
              <p>Student</p>
              <p>${student.fields.generation}</p>
            </div>
          </div>
        </a>
    `).join('');
  }

  // generate years for sidebar
  async generateUIForSideBar () {
    const students = await BAAS.getStudents();
    const uniqueGeneration = [];

    students.forEach((student) => {
      if (!uniqueGeneration.includes(student.fields.generation)) {
        uniqueGeneration.push(student.fields.generation);
      }
    });

    return uniqueGeneration.sort().map(generation => `
      <li class="sidebar__item"><a data-id="${generation}" href="" class="sidebar__link second-level">${generation}</a></li>
    `).join('');
  }

  // sort team on first name
  compareTeam (a, b) {
    let order = 0;

    if (a.firstName < b.firstName) {
      order = -1;
    }

    if (a.firstName > b.firstName) {
      order = 1;
    }

    return order;
  }

  // sort student on first name
  compareStudents (a, b) {
    let order = 0;

    if (a.fields.name_first < b.fields.name_first) {
      order = -1;
    }

    if (a.fields.name_first > b.fields.name_first) {
      order = 1;
    }

    return order;
  }

  async render () {
    return `
    <div class="page">
      <div class="container">
        <div class="row">
          <div class="col-md-3 col-sm-12 col-12 sidebar-container">
            <div class="sidebar">
              <ul class="sidebar__list">
                <li class="sidebar__item"><a href="" data-id="team" class="sidebar__link first-level">Docenten</a></li>
                <li class="sidebar__item"><a href="" data-id="students" class="sidebar__link first-level">Studenten</a></li>
                <li class="sidebar__item">
                  <ul class="sidebar__list-second">
                    ${await this.generateUIForSideBar()}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-9 col-sm-12 col-12">
            <div data-id="team" class="team team-block team-block--show">
              <div class="page-title page-title--contact">
                <h1>Docenten</h1>
                <div class="page-title__bar"></div>
              </div>
              <div class="d-flex flex-wrap">
                ${await this.generateUIForTeam()}
              </div>
            </div>
            <div data-id="students" class="students team-block">
              <div class="page-title page-title--contact">
                <h1>Studenten</h1>
                <div class="page-title__bar"></div>
              </div>
              <div class="d-flex flex-wrap">
                ${await this.generateUIForStudents()}
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
    `;
  }

  async afterRender () {
    const firstLevelFilters = document.querySelectorAll('.first-level');
    const secondLevelFilters = document.querySelectorAll('.second-level');
    const teamElements = document.querySelectorAll('.team-block');
    const studentsCards = document.querySelectorAll('.card-person--student');
    console.log(teamElements);

    firstLevelFilters[0].classList.add('sidebar__link--active');

    // event listener to filter on type (docenten/studenten)
    firstLevelFilters.forEach((filter) => {
      filter.addEventListener('click', (e) => {
        e.preventDefault();
        const dataId = e.target.dataset.id;

        firstLevelFilters.forEach((el) => {
          el.classList.remove('sidebar__link--active');
        });

        secondLevelFilters.forEach((el) => {
          el.classList.remove('sidebar__link--active');
        });

        e.target.classList.add('sidebar__link--active');

        teamElements.forEach((element) => {
          element.classList.remove('team-block--show');

          if (element.dataset.id === dataId) {
            element.classList.add('team-block--show');
          }
        });
      });
    });

    // event listeren to filter on year
    secondLevelFilters.forEach((filter) => {
      filter.addEventListener('click', (e) => {
        e.preventDefault();
        const dataId = e.target.dataset.id;

        firstLevelFilters.forEach((el) => {
          el.classList.remove('sidebar__link--active');

          if (el.dataset.id === 'students') {
            el.classList.add('sidebar__link--active');
          }
        });

        secondLevelFilters.forEach((el) => {
          el.classList.remove('sidebar__link--active');
        });

        teamElements.forEach((element) => {
          element.classList.remove('team-block--show');

          if (element.dataset.id === 'students') {
            element.classList.add('team-block--show');
          }
        });

        e.target.classList.add('sidebar__link--active');

        studentsCards.forEach((el) => {
          el.classList.remove('card-person--hide');

          if (el.dataset.id !== dataId) {
            el.classList.add('card-person--hide');
          }
        });
      });
    });
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

export default TeamPage;
