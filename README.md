# 🇨🇴 Explorador de Colombia

Aplicación web interactiva que permite explorar los departamentos de Colombia, visualizar su información general y consultar dinámicamente los municipios asociados utilizando la API pública de Colombia.

---

## 📸 Vista general

El proyecto muestra:

- 📍 Lista de departamentos
- 🔎 Buscador de departamentos en tiempo real
- 🏙 Información detallada de cada departamento
- 📋 Lista desplegable (accordion) de municipios
- 🔎 Buscador interno de municipios
- 🌐 Consulta dinámica a la API por cada municipio
- 🖼 Imágenes personalizadas por departamento
- 📱 Diseño completamente responsive

---

## 🚀 Tecnologías utilizadas

- HTML5
- CSS3 (Grid + Responsive Design)
- JavaScript (Vanilla JS)
- Fetch API
- API pública: https://api-colombia.com

---

## 📁 Estructura del proyecto

```bash
explorador-colombia/
│
├── index.html
├── styles.css
├── script.js
│
└── images/
    └── departments/
        ├── 1.jpg
        ├── 2.jpg
        ├── 3.jpg
        ├── ...
        └── default.jpg
```

---

## 🧠 Funcionamiento

### 1️⃣ Carga inicial

Al iniciar la aplicación:

- Se realiza una petición a:
  
  ```
  https://api-colombia.com/api/v1/Department
  ```

- Se renderizan las cards de los departamentos.

---

### 2️⃣ Detalle de departamento

Al hacer clic en un departamento:

- Se consulta:

  ```
  https://api-colombia.com/api/v1/Department/{id}
  ```

- Se obtienen los municipios con:

  ```
  https://api-colombia.com/api/v1/Department/{id}/cities
  ```

- Se muestra:
  - Nombre
  - Capital
  - Población
  - Superficie
  - Descripción
  - Lista de municipios

---

### 3️⃣ Municipios (Accordion dinámico)

Cada municipio:

- Es desplegable
- Hace una consulta bajo demanda:

  ```
  https://api-colombia.com/api/v1/City/{id}
  ```

- Solo consulta la API la primera vez
- Funciona como acordeón (solo uno abierto a la vez)

---

### 4️⃣ Buscadores

#### 🔎 Buscador de departamentos
Filtra en tiempo real los departamentos por nombre.

#### 🔎 Buscador de municipios
Filtra en tiempo real los municipios dentro del panel de detalle.

No realiza llamadas adicionales a la API.

---

## 🖼 Imágenes de departamentos

Las imágenes deben guardarse en:

```
/images/departments/
```

Cada imagen debe llamarse con el **ID del departamento**:

```
2.jpg
5.jpg
11.jpg
```

Esto garantiza:

- Identificación única
- Evita problemas con tildes
- Evita errores por espacios o caracteres especiales

Si no existe una imagen, se usa automáticamente:

```
default.jpg
```

Gracias al atributo `onerror` en la etiqueta `<img>`.

---

## 📱 Responsive Design

- Desktop: layout en 2 columnas (departamentos + detalle)
- Tablet: layout vertical
- Mobile:
  - Cards en una sola columna
  - Se ocultan imágenes para mejorar rendimiento
  - Diseño compacto

---

## ⚠️ Consideraciones sobre la API

La API pública de Colombia:

- Tiene campos `null` en muchos municipios
- Algunos municipios no poseen descripción o datos demográficos

La aplicación maneja correctamente:

- Valores `null`
- Strings vacíos
- Campos inexistentes

Mostrando solo información disponible.

---

## 🔥 Características destacadas

✔ Render dinámico  
✔ Manejo de errores  
✔ Carga bajo demanda (lazy fetch)  
✔ Acordeón optimizado  
✔ Fallback de imágenes  
✔ Buscadores en tiempo real  
✔ Diseño moderno y limpio  
✔ Código organizado y modular  

---

## 🛠 Posibles mejoras futuras

- 🌍 Integrar mapas (Leaflet o Google Maps)
- 📊 Visualización de estadísticas
- ⭐ Mostrar atractivos turísticos
- ⚡ Implementar caché global
- 🔄 Paginación virtual
- 🎨 Mejorar animaciones
- 🧪 Agregar pruebas unitarias
- 📦 Convertir a WebP automáticamente

---

## 📦 Cómo ejecutar el proyecto

1. Clona el repositorio:

```bash
git clone https://github.com/tuusuario/explorador-colombia.git
```

2. Abre el archivo `index.html` en el navegador  
   o usa una extensión como Live Server.

## 👨‍⚕️ Autor

Desarrollado por **Ing. Cristian Díaz**  

---

<p align="center">
  <img width="300" src="https://i.imgur.com/YYf2LgH.png" alt="Logo del autor">
</p>

---

## 📄 Licencia

Este proyecto es de uso educativo y demostrativo.
