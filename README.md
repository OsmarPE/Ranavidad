# 🎄 Renavidad - Cuenta Regresiva Navideña

Una aplicación web interactiva que muestra una cuenta regresiva hasta la Navidad, con reproductor de video de fondo y notificaciones por correo electrónico.

## 🌟 Características

- ⏰ **Cuenta regresiva en tiempo real** hasta la Navidad 2025
- 🎥 **Reproductor de video** con controles de reproducción y sonido
- 🔔 **Sistema de notificaciones** por correo electrónico
- 📱 **Diseño responsivo** adaptable a diferentes dispositivos
- 🎨 **Interfaz moderna** con efectos visuales atractivos
- 🏗️ **Arquitectura orientada a objetos** para mejor mantenibilidad

## 🖥️ Demo

![Renavidad Screenshot](screenshot.png) <!-- Agrega una captura de pantalla aquí -->

## 🚀 Instalación y Uso

### Prerrequisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, para desarrollo)

### Instalación

1. Clona este repositorio:
```bash
git clone https://github.com/tuusuario/renavidad.git
cd renavidad
```

2. Abre el archivo `index.html` en tu navegador web favorito, o

3. Si prefieres usar un servidor local:
```bash
# Usando Python
python -m http.server 8000

# Usando Node.js (npx)
npx http-server

# Usando PHP
php -S localhost:8000
```

4. Visita `http://localhost:8000` en tu navegador

## 📁 Estructura del Proyecto

```
renavidad/
├── index.html          # Página principal
├── app.js             # Lógica JavaScript (POO)
├── README.md          # Documentación del proyecto
├── css/
│   └── styles.css     # Estilos CSS
└── src/
    └── video.mp4      # Video de fondo navideño
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica de la página
- **CSS3**: Estilos y diseño responsivo
- **JavaScript ES6+**: Lógica de la aplicación con clases
- **SVG**: Iconos vectoriales para mejor calidad
- **Video HTML5**: Reproductor multimedia integrado

## 🏗️ Arquitectura del Código

El proyecto utiliza **Programación Orientada a Objetos** con las siguientes clases:

### `IconManager`
Gestiona todos los iconos SVG de la aplicación de forma centralizada.

### `CountdownTimer`
Maneja la lógica de la cuenta regresiva:
- Cálculo de tiempo restante
- Actualización automática cada segundo
- Transición automática al año siguiente

### `VideoPlayer`
Controla el reproductor de video:
- Reproducción/pausa
- Control de volumen
- Efectos visuales

### `Modal`
Gestiona la ventana modal de notificaciones:
- Apertura/cierre
- Interacciones del usuario
- Accesibilidad (Escape, click fuera)

### `ChristmasApp`
Clase principal que orquesta toda la aplicación.

## 🎯 Funcionalidades Principales

### Cuenta Regresiva
- Muestra días, horas, minutos y segundos restantes
- Actualización en tiempo real
- Transición automática al año siguiente después de Navidad

### Reproductor de Video
- Control de reproducción/pausa
- Control de volumen (silenciar/activar)
- Efecto de desenfoque que se quita cuando el video está listo

### Sistema de Notificaciones
- Modal para registro de correo electrónico
- Validación de email
- Interfaz intuitiva para suscripción

### Controles de Accesibilidad
- Navegación por teclado
- Cierre de modal con tecla Escape
- Iconos descriptivos y semánticos
