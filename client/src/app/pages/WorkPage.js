class WorkPage {
  async render () {
    return `
      <div class="page">
        <div class="container">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-12">
              <div class="work">
                <div class="page-title page-title page-title--smaller-margin">
                  <h1>Werkplekleren</h1>
                  <div class="page-title__bar"></div>
                </div>
                <div class="work__content">
                <p>In de opleiding zijn we praktijkgericht, we zijn zoveel mogelijk in contact met het werkveld. We doen dit door middel van gastcolleges, workshops en bedrijfsbezoeken. Om de opleiding te beëindigen moeten ze ook stage doen alsook een eindwerk maken. We gebruiken voor deze eindewerken cases van uit het werkveld. Mentoren zorgen ervoor dat dit in goede banen geleid wordt, de jury zorgt dan weer voor de beoordeling bij de verdediging.</p>
                <p>Wilt u zich als bedrijf kandidaat stellen voor 1 van bovengenoemde zaken, dan kan u onderstaand OneDrive formulier invullen. We zullen u daarna zo snel mogelijk contacteren.</p>
                <iframe width="640px" height= "480px" src= "https://forms.office.com/Pages/ResponsePage.aspx?id=6oDgtrmteUyTA23Pgm-4VKxu7jQQzjVNlyLzKsJ9e_dUMDVLN0FQQ0pUOVhRQUdJTzgwQUo5NkE0Ty4u&embed=true" frameborder= "0" marginwidth= "0" marginheight= "0" style= "border: none; max-width:100%; max-height:100vh" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen> </iframe>
                </div>
              </div>
            </div>
          </div>  
        </div>
      </div>
    `;
  }

  async afterRender () {
    // Connect the listeners
    return this;
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

export default WorkPage;
