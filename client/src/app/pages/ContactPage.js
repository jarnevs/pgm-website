import mapboxgl from 'mapbox-gl';

import { BAAS } from '../services';
import pointer from '../_static/images/pointer.png';

class ContactPage {
  // function to show important contacts
  async showContacts () {
    const contactsData = await BAAS.getContacts();
    return contactsData.data.map(contact => `
        <div class="card-person card-person--contact">
          <div class="card-person__image">
            <img src="${contactsData.domain}${contact.img}" alt="${contact.firstName} ${contact.lastName}">
          </div>
          <div class="card-person__info  d-flex flex-column justify-content-between">
            <h2>${contact.firstName}<br>${contact.lastName}</h2>
            <div>
              <p class="title-text">${contact.extraFunction}</p>
              <p>${this.formatEmailForCard(contact.email)}</p>
            </div>
          </div>
        </div>
      `).join('');
  }

  // function to break e-mail on @
  formatEmailForCard (email) {
    let mail = '';
    mail = `${email.substring(0, email.indexOf('@'))}<br>${email.substring(email.indexOf('@'))}`;
    return mail;
  }

  async render () {
    return `
      <div class="page">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="page-title page-title--contact">
                <h1>Contact</h1>
                <div class="page-title__bar"></div>
              </div>
              <div class="d-flex justify-content-between flex-wrap">
                ${await this.showContacts()}
              </div>
            </div>
          </div>  
          <div class="row align-items-center">
            <div class="col-md-4 col-sm-12 col-12">
              <div class="contact-address">
                <p class="title-text">Campus Mariakerke</p>
                <p>Industrieweg 232</p>
                <p>9030 Mariakerke</p>
                <p>09 234 86 00</p>
              </div>
            </div>
            <div class="col-md-8 col-sm-12 col-12">
              <div id="map"></div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="page-title">
                <h1>Nog vragen? Contacteer ons!</h1>
                <div class="page-title__bar"></div>
              </div>
              <div class="contact-form">
                <form>
                  <div class="contact-form__input">
                    <label for="name">Naam</label>
                    <input type="text" name="name">
                  </div>
                  <div class="contact-form__input">
                    <label for="email">E-mail</label>
                    <input type="email" name="email">
                  </div>
                  <div class="contact-form__input">
                    <label for="subject">Onderwerp</label>
                    <input type="text" name="subject">
                  </div>
                  <div class="contact-form__input">
                    <label for="message">Bericht</label>
                    <textarea type="text" name="message"></textarea>
                  </div>
                  <div class="cta d-flex justify-content-center">
                    <button class="cta__button">Verzend</button>
                  </div>
                </form>
              </div>
            </div>
          </div> 
        </div>
      </div>
    `;
  }

  async afterRender () {
    // render map
    mapboxgl.accessToken = 'pk.eyJ1IjoiamFybnZhbnMiLCJhIjoiY2puY2NjOGFoMDV3czNrbnZjNzJicTFvbiJ9.YmULBJZC1OMMVucfXxLliA';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [3.668705, 51.087388],
      zoom: 15,
    });

    map.on('load', () => {
      map.loadImage(
        pointer,
        (error, image) => {
          if (error) throw error;
          map.addImage('cat', image);
          map.addSource('point', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [3.668705, 51.087388],
                  },
                },
              ],
            },
          });
          map.addLayer({
            id: 'points',
            type: 'symbol',
            source: 'point',
            layout: {
              'icon-image': 'cat',
              'icon-size': 0.3,
            },
          });
        }
      );
    });
  }

  async mount () {
    // close
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

export default ContactPage;
