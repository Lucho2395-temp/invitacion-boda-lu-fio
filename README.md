# Invitación de Boda — Luis & Fiorelita

Invitación web tipo página continua (scroll), estilo moderno, para la boda del
26/09/2026.

## Estructura del proyecto

```
invitacion-luis-fiorelita/
├── index.html          → Página principal (HTML)
├── css/
│   └── style.css       → Todos los estilos
├── js/
│   └── script.js       → Slider, countdown, RSVP, música, animaciones
├── assets/
│   ├── images/         → Aquí van tus fotos
│   └── audio/          → Aquí va tu canción
└── README.md
```

## Cómo agregar tus fotos al slider

1. Copia tus 5 fotos dentro de `assets/images/` (por ejemplo `foto1.jpg`,
   `foto2.jpg`, ... `foto5.jpg`).
2. Abre `index.html` y busca la sección `<!-- SLIDER DE FOTOS -->`.
3. Reemplaza cada `<div class="slide">...</div>` por:
   ```html
   <div class="slide"><img src="assets/images/foto1.jpg" alt=""></div>
   ```
   Repite con cada foto (`foto2.jpg`, `foto3.jpg`, etc.).

## Cómo agregar tu música de fondo

1. Copia tu archivo de audio (mp3) dentro de `assets/audio/`, por ejemplo
   `musica.mp3`.
2. En `index.html`, busca `<audio id="bgMusic" loop>` y agrega adentro:
   ```html
   <source src="assets/audio/musica.mp3" type="audio/mpeg">
   ```

## Datos que puedes seguir personalizando

- **Padrinos**: en `index.html`, sección `<!-- PADRINOS -->`, reemplaza
  "Nombre del Padrino" / "Nombre de la Madrina".
- **Número de WhatsApp para RSVP**: en `js/script.js`, variable
  `numeroWhatsApp`.
- **Fecha límite de confirmación**: en `index.html`, sección `<!-- RSVP -->`.
- **Colores**: en `css/style.css`, dentro de `:root{ ... }` (variables
  `--terracota`, `--cream`, etc.).

## Cómo publicarlo en GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `invitacion-luis-fiorelita`).
2. Sube todo el contenido de esta carpeta al repositorio (asegúrate de que
   `index.html` quede en la raíz del repo).
3. Ve a **Settings → Pages**.
4. En **Source**, selecciona la rama `main` y la carpeta `/ (root)`.
5. Guarda. GitHub te dará una URL pública, algo como:
   `https://tu-usuario.github.io/invitacion-luis-fiorelita/`
6. Espera 1-2 minutos y comparte ese link con tus invitados.

## Notas

- El sitio es responsive (se adapta a celular, tablet y computadora).
- No requiere backend ni base de datos: el RSVP envía la confirmación por
  WhatsApp directamente al número configurado.
