import { Router, routes } from './router';
import {
  HomePage, AboutPage, NotFoundPage, PostDetailPage, CasesPage, TeamPage,
  BlogPage, WorkPage, ContactPage, CaseDetailPage, StudentDetailPage,
} from './pages';
import { Header, Footer } from './components';

class App {
  constructor (container) {
    // Root container
    this.container = container;

    // Pages
    this.pageHome = new HomePage();
    this.pageAbout = new AboutPage();
    this.pageNotFound = new NotFoundPage();
    this.pagePostDetail = new PostDetailPage();
    this.pageCases = new CasesPage();
    this.pageCaseDetail = new CaseDetailPage();
    this.pageTeam = new TeamPage();
    this.pageStudentDetail = new StudentDetailPage();
    this.pageBlog = new BlogPage();
    this.pageWork = new WorkPage();
    this.pageContact = new ContactPage();

    // Components
    this.compHeader = new Header();
    this.compFooter = new Footer();
  }

  async render () {
    return `
    ${await this.compHeader.render()}
    <main class="main">
      <div id="children"></div>
    </main>
    ${await this.compFooter.render()}   
    `;
  }

  async afterRender () {
    await this.compHeader.afterRender();

    this.childrenContainer = document.getElementById('children');
    // Router
    this.router = new Router(this.childrenContainer);
    this.router.addRoute(routes.HOME, this.pageHome);
    this.router.addRoute(routes.ABOUT, this.pageAbout);
    this.router.addRoute(routes.POST_DETAIL, this.pagePostDetail);
    this.router.addRoute(routes.CASES, this.pageCases);
    this.router.addRoute(routes.CASE_DETAIL, this.pageCaseDetail);
    this.router.addRoute(routes.TEAM, this.pageTeam);
    this.router.addRoute(routes.STUDENT_DETAIL, this.pageStudentDetail);
    this.router.addRoute(routes.BLOG, this.pageBlog);
    this.router.addRoute(routes.WORK, this.pageWork);
    this.router.addRoute(routes.CONTACT, this.pageContact);
    this.router.setNotFoundPage(this.pageNotFound);
    this.router.resolve();

    // Listen to changes in history
    window.onpopstate = (event) => {
      this.setActiveLink();
    };
    // Set active link
    this.setActiveLink();
  }

  setActiveLink () {
    window.scrollTo(0, 0);
    this.compHeader.updateActiveLink(document.location.hash);
  }
}

export default App;
