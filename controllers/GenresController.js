import Genre from '../models/GenresModel.js';
import Genres from '../models/GenresModel.js';

export function GetIndex(req, res) {
  Genres.GetAll((err,generosData)=>{
    if(err) {
        return res.status(500)
        .render('error', { 
            "page-title": 'Error', 
            error: err
         });
    }
    res.render('genres/index', {
        "page-title": 'Lista de géneros',
        genres: generosData
    });
  })

    
}

export function GetNewGenre(req, res, next) {
    res.render('genres/nuevo', {editMode: false, 'page-title': 'Nuevo Género',
        'page-description': 'Agrega un nuevo género a tu colección de cine.'
    });
}

export function PostNewGenre(req, res) {
    const name = req.body.name;
    const description = req.body.description;

    const genre = new Genres(
        0,
        name,
        description
    );
    genre.Save((err)=>{
        if (err) {
            return res.status(500).render('error', { 
                "page-title": 'Error', 
                error: err.message
            });
        }
        res.redirect('/generos');
    })
   
}

export function Edit(req, res, next) {
    const id = req.params.genreId;
    Genre.GetById(id, (err, genreData) => {
        if (err) {
            return res.status(500)
            .render('error', { 
                "page-title": 'Error', 
                error: err.message
             });
        }
        if (!genreData) {
            return res.status(404)
            .render('404', { 
                "page-title": 'Género no encontrado', 
             });
        } else {
            res.render('genres/nuevo', { editMode: true,
                'page-title': `Actualizar Género: ${genreData.nombre}`,
                genre: genreData,
                'page-description': 'Actualiza la información del género.'
            });
    }});
}

export function PostEdit(req, res) {
   const name = req.body.name;
    const description = req.body.description;
    const id = req.body.genreId;

    const genre = new Genres(id,
        name,
        description
    );
    genre.Save((err)=>{
        if (err) {
            return res.status(500).render('404',{
                "page-title": 'Server Error',
                error: err.message
            })
        }
           res.redirect('/generos');
    })
   
 
}

export function Delete(req, res) {
    const id = req.body.GenreId;

    Genres.Delete(id, (err) => {
        if (err) {
            return res.status(500).render('error', {
                "page-title": 'Error',
                error: err.message
            });
        }
        res.redirect('/generos');
    });
}

 