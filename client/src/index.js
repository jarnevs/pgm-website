import App from './app';

(async () => {
  const rootContainer = document.getElementById('root');
  const app = new App(rootContainer);
  rootContainer.innerHTML = await app.render();
  await app.afterRender();
})();
