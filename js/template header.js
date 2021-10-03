 // Para evitar cambiar el header en todos los archivos HTML hice un custom element (un tipo de web component)
// y cada vez que lo edito acá se cambia en todos los HTML donde corro este JS
// Los Web components dejan código por fuera del HTML que nos permite reutilizarlo sin copiar y pegar cada vez

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <nav class="site-header sticky-top py-1 bg-dark" id="header">
    <div class="container d-flex flex-column flex-md-row justify-content-between">
      <a class="py-2 d-none d-md-inline-block" href="./home.html">Inicio</a>
      <a class="py-2 d-none d-md-inline-block" href="./categories.html">Categorías</a>
      <a class="py-2 d-none d-md-inline-block" href="./products.html">Productos</a>
      <a class="py-2 d-none d-md-inline-block" href="./sell.html">Vender</a>
      
      <a class="py-2 d-none d-md-inline-block dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <div id="profile" style="display: inline-block"></div>
      </a>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="dropdownMenuButton">
        <a class="dropdown-item" href="./my-profile.html">Mi Perfil</a>
        <a class="dropdown-item" href="./cart.html">Mi carrito</a>
        <a class="dropdown-item" href="./index.html" onclick="logOut()">Salir</a>
      </div>
    </div>
    </nav> 
    `;
  }
}

customElements.define('header-component', Header);
