const ApiURL = "https://api-colombia.com/api/v1/Department";
const container = document.getElementById("departmentsContainer");
const detail = document.getElementById("detailContainer");
const searchInput = document.getElementById("searchInput");

let departments = [];

/* =========================
   CARGAR DEPARTAMENTOS
========================= */
async function loadDepartments() {
  try {
    // Cargamos todos los departamentos al inicio
    const response = await fetch(ApiURL);
    departments = await response.json();
    renderCards(departments);
  } catch (error) {
    container.innerHTML = "<p>Error al cargar datos.</p>";
    console.error(error);
  }
}

/* =========================
   RENDER CARDS
========================= */
function renderCards(data) {
  container.innerHTML = "";
  if (data.length === 0) {
    container.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  data.forEach(dep => {
    const card = document.createElement("div");
    card.className = "card";
    // Usamos una imagen por defecto si no tienes la carpeta local configurada aún
    card.innerHTML = `
      <img src="images/departments/${dep.id}.jpg" alt="${dep.name}">
      <div class="card-content">
        <h3>${dep.name}</h3>
        <p><strong>Capital:</strong> ${dep.cityCapital?.name || "N/A"}</p>
      </div>
    `;
    card.addEventListener("click", () => showDetail(dep.id));
    container.appendChild(card);
  });
}

/* =========================
   MOSTRAR DETALLE
========================= */
async function showDetail(id) {
  detail.innerHTML = "<p>Cargando información...</p>";
  
  try {
    // Petición del departamento y sus ciudades en paralelo para mayor velocidad
    const [depRes, citiesRes] = await Promise.all([
      fetch(`${ApiURL}/${id}`),
      fetch(`${ApiURL}/${id}/cities`)
    ]);

    const dep = await depRes.json();
    const cities = await citiesRes.json();

    detail.innerHTML = `
      <div class="detail-header">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/120px-Flag_of_Colombia.svg.png" alt="Bandera">
        <h2>${dep.name}</h2>
      </div>
      
      <div class="info-box">
        <p><strong>Capital:</strong> ${dep.cityCapital?.name || "N/A"}</p>
        <p><strong>Población:</strong> ${dep.population?.toLocaleString() || "N/A"}</p>
        <p><strong>Descripción:</strong> ${dep.description || "Sin descripción disponible."}</p>
      </div>

      <div class="municipios">
        <h3>Municipios (${cities.length})</h3>
        <input type="text" id="municipioSearch" placeholder="Filtrar municipios..." 
               style="width:100%; padding:8px; margin:10px 0; border-radius:4px; border:1px solid #ccc;">
        
        <div id="municipiosList">
          ${cities.map(city => `
            <div class="municipio-item" data-id="${city.id}">
              <div class="municipio-header">${city.name}</div>
              <div class="municipio-body" id="municipio-${city.id}"></div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Activamos las funciones interactivas una vez creado el HTML
    activarEventosMunicipios();
    activarBuscadorMunicipios();

  } catch (error) {
    detail.innerHTML = "<p>Error al cargar el detalle.</p>";
    console.error(error);
  }
}

/* =========================
   EVENTOS MUNICIPIOS (ACCORDION)
========================= */
function activarEventosMunicipios() {
  const items = document.querySelectorAll(".municipio-item");

  items.forEach(item => {
    item.addEventListener("click", async function() {
      const id = this.dataset.id;
      const body = this.querySelector(".municipio-body");

      // Cerrar otros abiertos (opcional, para efecto acordeón real)
      document.querySelectorAll(".municipio-body.active").forEach(b => {
        if (b !== body) b.classList.remove("active");
      });

      // Alternar clase active (tu CSS ya maneja la transición)
      body.classList.toggle("active");

      // Cargar info si está vacío
      if (body.innerHTML === "" || body.innerHTML === "<p>Cargando...</p>") {
        body.innerHTML = "<p>Cargando...</p>";
        try {
          const res = await fetch(`https://api-colombia.com/api/v1/City/${id}`);
          const city = await res.json();
          
          body.innerHTML = `
            <div class="municipio-info">
              <p><strong>Población:</strong> ${city.population?.toLocaleString() || "N/A"}</p>
              <p><strong>Superficie:</strong> ${city.surface ? city.surface + " km²" : "N/A"}</p>
              <p><strong>Código postal:</strong> ${city.postalCode || "N/A"}</p>
            </div>
          `;
        } catch {
          body.innerHTML = "<p>Error al cargar datos.</p>";
        }
      }
    });
  });
}

/* =========================
   BUSCADOR MUNICIPIOS
========================= */
function activarBuscadorMunicipios() {
  const input = document.getElementById("municipioSearch");
  if (!input) return;

  input.addEventListener("input", function() {
    const value = this.value.toLowerCase();
    const items = document.querySelectorAll(".municipio-item");

    items.forEach(item => {
      const nombre = item.querySelector(".municipio-header").textContent.toLowerCase();
      item.style.display = nombre.includes(value) ? "block" : "none";
    });
  });
}

/* =========================
   BUSCADOR DEPARTAMENTOS
========================= */
searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const filtered = departments.filter(dep =>
    dep.name.toLowerCase().includes(value)
  );
  renderCards(filtered);
});

loadDepartments();