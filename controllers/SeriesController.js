import Serie from '../models/SerieModel.js';
import Genre from '../models/GenresModel.js';

// Helper function to convert any YouTube URL to embed format
function convertToEmbedUrl(url) {
    if (!url || url.trim() === '') return '';
    
    // Already an embed URL
    if (url.includes('/embed/')) {
        return url;
    }
    
    let videoId = null;
    
    // Extract video ID from different YouTube URL formats
    // Format: https://www.youtube.com/watch?v=VIDEO_ID
    if (url.includes('watch?v=')) {
        videoId = url.split('watch?v=')[1].split('&')[0];
    }
    // Format: https://youtu.be/VIDEO_ID
    else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    // Format: https://www.youtube.com/v/VIDEO_ID
    else if (url.includes('/v/')) {
        videoId = url.split('/v/')[1].split('?')[0];
    }
    
    // If we found a video ID, return embed URL
    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Return original URL if we couldn't parse it
    return url;
}

export function GetIndex(req, res) {

    Serie.GetAll((err, seriesData) => {
        if (err) {
            return res.status(500)
            .render('error', { 
                "page-title": 'Error', 
                error: err
             });
        }
    res.render('series/index', {"page-title": 'Lista de series',
        series: seriesData
    });
  })

}
export function GetNewSerie(req, res, next) {
    Genre.GetAll((err, generosData) => {
        if (err) {
            return res.status(500).render('error', { 
                "page-title": 'Error', 
                error: err.message
            });
        }
        res.render('series/nuevo', {
            editMode: false, 
            'page-title': 'Nueva Serie',
            generos: generosData
        });
    });
}

export function PostNewSerie(req, res) {
    const name = req.body.name;
    const description = req.body.description;
    const genero = req.body.genero;
    const img = req.body.img;
    const vid = convertToEmbedUrl(req.body.vid); // Convert to embed URL

    const serie = new Serie(
        0,
        name,
        description,
        genero,
        img,
        vid
    );
    serie.Save((err)=>{
        if (err) {
            return res.status(500).render('error', { 
                "page-title": 'Error', 
                error: err.message
            });
        }
        res.redirect('/series');
    })
}

    


export function Edit(req, res, next) {
    const id = req.params.serieId;
    
    Serie.GetById(id, (err, serieData) => {
        if (err) {
            return res.status(500).render('error', { 
                "page-title": 'Error', 
                error: err.message
            });
        }
        if (!serieData) {
            return res.status(404).render('404', { 
                "page-title": 'Serie no encontrada', 
            });
        }
        
        // Load genres for the dropdown
        Genre.GetAll((err, generosData) => {
            if (err) {
                return res.status(500).render('error', { 
                    "page-title": 'Error', 
                    error: err.message
                });
            }
            
            res.render('series/nuevo', { 
                editMode: true,
                'page-title': `Actualizar Serie: ${serieData.nombre}`,
                serie: serieData,
                generos: generosData,
                'page-description': 'Actualiza la información de la serie.'
            });
        });
    });
}

export function PostEdit(req, res) {
    const name = req.body.name;
    const description = req.body.description;
    const id = req.body.serieId;
    const genero = req.body.genero;
    const img = req.body.img;
    const vid = convertToEmbedUrl(req.body.vid); // Convert to embed URL

    const serie = new Serie(
        id,
        name,
        description,
        genero,
        img,
        vid
    );
    serie.Save((err)=>{
        if (err) {
            return res.status(500).render('404',{
                "page-title": 'Server Error',
                error: err.message
            })
        }
        res.redirect('/series');
    })
}

export function Delete(req, res) {
    const id = req.body.SerieId;

    Serie.Delete(id, (err) => {
        if (err) {
            return res.status(500).render('error', {
                "page-title": 'Error',
                error: err.message
            });
        }
        res.redirect('/series');
    });
}



export function GetDetails(req, res) {
    const serieId = req.params.serieId;

    // Get the serie by ID
    Serie.GetById(serieId, (err, serie) => {
        if (err) {
            console.error('Error loading serie:', err);
            return res.status(500).render('error', {
                'page-title': 'Error',
                error: 'Error al cargar la serie'
            });
        }

        if (!serie) {
            return res.status(404).render('404', {
                'page-title': 'Serie no encontrada'
            });
        }

        // Get the genre information for this serie
        Genre.GetById(serie.generoId, (genreErr, genero) => {
            if (genreErr) {
                res.status(500).render('error', {
                    'page-title': 'Error',
                    error: 'Error al cargar la serie'
                });
            }

            res.render('series/detail', {
                'page-title': serie.nombre,
                serie: serie,
                genero: genero || { nombre: 'Sin género' }
            });
        });
    });
}