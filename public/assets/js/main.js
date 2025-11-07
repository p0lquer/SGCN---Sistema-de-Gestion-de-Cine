// Global JavaScript for SGCN - Sistema de Gestión de Cine

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== Delete Confirmation for Series ==========
    const deleteSerieButtons = document.querySelectorAll('.delete-serie-btn');
    
    deleteSerieButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the serie name from the card
            const card = this.closest('.card');
            const serieName = card.querySelector('.card-title').textContent.trim();
            
            // Show confirmation dialog
            if (confirm(`¿Estás seguro de que deseas eliminar la serie "${serieName}"?`)) {
                // Submit the form
                const form = this.closest('form');
                form.submit();
            }
        });
    });
    
    // ========== Delete Confirmation for Genres ==========
    const deleteGenreButtons = document.querySelectorAll('.delete-genre-btn');
    
    deleteGenreButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the genre name from the card
            const card = this.closest('.card');
            const genreName = card.querySelector('.card-title').textContent.trim();
            
            // Show confirmation dialog
            if (confirm(`¿Estás seguro de que deseas eliminar el género "${genreName}"?`)) {
                // Submit the form
                const form = this.closest('form');
                form.submit();
            }
        });
    });
    
    // ========== Add more global functions here ==========
    
});
