$(document).ready(function() {
        //initialize the delete function
       
            $('.delete-serie-btn').on('click', function(e) {
                e.preventDefault();
                const form = $(this).closest('form');
                if (confirm('¿Estás seguro de que deseas eliminar esta serie?')) {
                    form.submit();
                }
            });     
        }
    );
    
