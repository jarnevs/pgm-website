import * as THREE from 'three/build/three.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { BAAS } from '../services';
import { routes } from '../router';

class CaseDetailPage {
  // show content for a case based on id
  async generateUIForCaseDetail (id) {
    const project = await BAAS.getCase(id);

    if (project.data === undefined) {
      window.location.assign('#!/404');
      return '';
    }

    return `
      <div class="row case-student__info">
        <div class="col-md-6">
          <div class="case-student__container-image">
            <div class="case-student__main-image">
              <img src="${project.domain}${project.data.thumbnail}">
            </div>
            <div class="blue-square"></div>
          </div>
        </div>
        <div class="offset-md-1 col-md-5">
          <div class="page-title page-title--smaller-margin">
            <h1>${project.data.title}</h1>
            <div class="page-title__bar"></div>
          </div>
          <div class="case-student__description">
            <p>${project.data.description}</p>
          </div>
          <div class="case-student__student">
            <p class="title-text">Student(en)</p>
            <p>${project.data.students.join('<br>')}</p>
          </div>
          <div class="case-student__course">
            <p class="title-text">Vak</p>
            <p>${project.data.course}</p>
          </div>
        </div>
      </div>
      <div class="row case__images">
        <div class="col-md-12">
          <div class="d-flex flex-wrap justify-content-between">
            ${this.getImages(project.data.media, project.domain)}
          </div>
        </div>
      </div>
      <div class="row related">
        <div class="col-md-12">
          <div class="page-title page-title">
            <h1>Bekijk ook deze cases</h1>
            <div class="page-title__bar"></div>
          </div>
          <div class="d-flex justify-content-between flex-wrap">
          ${await this.getRelatedCases(id)}
          </div>
        </div>
      </div>
    `;
  }

  // function to generate content for media
  getImages (media, domain) {
    let tempStr = '';

    media.forEach((item) => {
      if (item.type === 'image') {
        tempStr += `
          <div class="case__image">
            <img src="${domain}${item.path}" alt="${item.alt}">
          </div>
        `;
      } else {
        window.localStorage.setItem('model', `${domain}${item.path}`);
        tempStr += `
          <div class="case__image model"></div>
        `;
      }
    });

    return tempStr;
  }

  // function to get random cases
  async getRelatedCases (id) {
    const projects = await BAAS.getCasesWithoutCurrent(id);
    const relatedProjects = [];
    let prevIndex = null;

    while (relatedProjects.length < 2) {
      let randomIndex = Math.floor(Math.random() * projects.data.length);

      if (prevIndex !== null) {
        // if previous index is same add 1
        if (randomIndex === prevIndex) {
          randomIndex += 1;

          // if the index is greater or equal to length, change index back to 0
          if (randomIndex >= projects.data.length) {
            randomIndex = 0;
          }
        }
      }

      relatedProjects.push(projects.data[randomIndex]);
      prevIndex = randomIndex;
    }

    return relatedProjects.map(project => `
    <a href="#!${routes.CASE_DETAIL.replace(':id', project.id)}" class="main-card" data-navigo>
      <div class="main-card__image">
        <img src="${projects.domain}${project.thumbnail}">
      </div>
      <p class="main-card__tag">${project.course}</p>
      <div class="main-card__overlay"></div>
      <h2 class="main-card__title">${project.title}</h2>
    </a>
    `).join('');
  }

  async render (params) {
    return `
      <div class="page">
        <div class="container case-student">
          ${await this.generateUIForCaseDetail(params.id)}
        </div>
      </div>
    `;
  }

  async afterRender () {
    // render 3d-model if there is one
    if (window.localStorage.getItem('model') !== null) {
      const model = window.localStorage.getItem('model');
      console.log(model);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(document.querySelector('.model').offsetWidth, document.querySelector('.model').offsetHeight);
      renderer.outputEncoding = THREE.sRGBEncoding;
      // Canvas Element

      const canvas = renderer.domElement;
      document.querySelector('.model').appendChild(canvas);

      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x999999);

      // Camera
      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
      camera.position.set(0.1, 0.1, 0.1);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // Controls
      // eslint-disable-next-line no-unused-vars
      const controls = new OrbitControls(camera, canvas);
      // Lights

      const ambientLight = new THREE.AmbientLight(0x666666);
      scene.add(ambientLight);

      // Loaders

      const loader = new GLTFLoader();

      loader.load(
        model,
        (gltf) => {
          scene.add(gltf.scene);
        },

        (xhr) => {
          console.info(`${xhr.loaded / xhr.total * 100}% loaded`);
        },

        (error) => {
          console.error(error);
        }
      );

      // Animation Loop

      (function animate () {
        // eslint-disable-next-line no-undef
        requestAnimationFrame(animate);

        // Render
        renderer.render(scene, camera);
      })();

      window.localStorage.removeItem('model');
    }
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

export default CaseDetailPage;
