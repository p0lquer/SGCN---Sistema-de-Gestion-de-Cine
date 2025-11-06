$(document).ready(function() {
        //initialize the delete function
        if($('.delete-genre-btn').length) {
            $('.delete-genre-btn').on('click', function(e) {
                e.preventDefault();
                const form = $(this).closest('form');
                if (confirm('¿Estás seguro de que deseas eliminar este género?')) {
                    form.submit();
                }
            });
        } else if($('.delete-serie-btn').length) {
            $('.delete-serie-btn').on('click', function(e) {
                e.preventDefault();
                const form = $(this).closest('form');
                if (confirm('¿Estás seguro de que deseas eliminar esta serie?')) {
                    form.submit();
                }
            });     
        }
    });
    
