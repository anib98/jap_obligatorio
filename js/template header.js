// Para evitar cambiar el header en todos los archivos HTML hice un custom element (un tipo de web component)
// y cada vez que lo edito acá se cambia en todos los HTML donde corro este JS
// Los Web components dejan código por fuera del HTML que nos permite reutilizarlo sin copiar y pegar cada vez

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <nav class="navbar navbar-expand-md navbar-dark bg-dark site-header sticky-top py-1 bg-dark" id="header">
        <a class="navbar-brand" href="#">eMercado</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto" style="width:100%;display:flex;">
            
            <li class="nav-item active py-2 d-md-inline-block"  style="margin-left: auto;order: 0;">
              <a class="nav-link" href="./home.html">Inicio</a>
            </li>
            
            <li class="nav-item active py-2 d-md-inline-block"  style="margin-left: auto;order: 1;">
              <a class="nav-link" href="./categories.html">Categorías</a>
            </li>
            
            <li class="nav-item active py-2 d-md-inline-block"  style="margin-left: auto;order: 2;">
              <a class="nav-link" href="./products.html">Productos</a>
            </li>
           
            <li class="nav-item active py-2 d-md-inline-block"  style="margin-left: auto;order: 3;">
              <a class="nav-link" href="./sell.html">Vender</a>
            </li>
         
            <li class="nav-item active dropdown py-2 d-md-inline-block my-lg-0" style="margin-left: auto;order: 4;">
              <a class="nav-link dropdown-toggle" href="#" id="dropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div id="profile" style="display: inline-block"></div>
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a class="dropdown-item" href="./my-profile.html">Mi Perfil</a>
                <a class="dropdown-item" href="./cart.html">Mi carrito</a>
                <a class="dropdown-item" href="./index.html" onclick="logOut()">Salir</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    `;
  }
}

customElements.define('header-component', Header);
