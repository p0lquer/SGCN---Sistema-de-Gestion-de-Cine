$(document).ready(function() {
        //initialize the delete function
        $('.delete-genre-btn').on('click', function(e) {
            e.preventDefault();
            const form = $(this).closest('form');
            if (confirm('¿Estás seguro de que deseas eliminar este género?')) {
                form.submit();
            }
        }) 
});
