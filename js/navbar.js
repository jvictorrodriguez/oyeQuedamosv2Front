//Recupera la barra de navegación del fichero navbar.html
//añade al elemento con id navbarContainer el contenido de la barra de navegación
document.addEventListener('DOMContentLoaded', function() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbarContainer').innerHTML = data;
        })
        .catch(error => console.warn('Error al cargar la barra de navegación:', error));
});
