import Navigo from 'navigo';

class Router {
  constructor (container) {
    this.container = container;
    this.router = new Navigo(null, true, '#!');
  }

  addRoute (location, page) {
    this.router.on(
      location,
      async (params) => {
        this.container.innerHTML = await page.render(params);
        await page.afterRender();
      },
      {
        before: async (done, params) => {
          await page.mount();
          done();
        },
        leave: async () => {
          await page.unmount();
        },
      }
    );
  }

  setNotFoundPage (page) {
    this.router.notFound(
      async (query) => {
        this.container.innerHTML = await page.render();
      }
    );
  }

  resolve () {
    this.router.resolve();
  }
}

export default Router;
