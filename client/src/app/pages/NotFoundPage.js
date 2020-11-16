import { routes } from '../router';

import image404 from '../_static/images/404.svg';

class NotFoundPage {
  async render () {
    return `
      <div class="page">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="work d-flex justify-content-center align-items-center flex-column">
                <div class="image-404">
                  <img src="${image404}" alt="image-404">
                </div>
                <div class="page-title page-title page-title--smaller-margin">
                  <h1 class="title-404">Het lijkt erop dat je verloren bent gelopen...<br>Laat me je terug brengen!</h1>
                </div>
                <a href="#!${routes.HOME}" class="cta__button">Ga terug naar home</a>
              </div>
            </div>
          </div>  
        </div>
      </div>
    `;
  }
}

export default NotFoundPage;
