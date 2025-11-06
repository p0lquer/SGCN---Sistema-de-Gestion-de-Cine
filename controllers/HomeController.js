import Genre from '../models/GenresModel.js';
import Serie from '../models/SerieModel.js';

export function GetHome(req, res) {
    // Get filter parameters from query string
    const searchQuery = req.query.search || '';
    const generoId = req.query.genero || '';

    // Get all genres
    Genre.GetAll((err, generos) => {
        if (err) {
            console.error('Error loading genres:', err);
            return res.status(500).render('error', {
                'page-title': 'Error',
                error: 'Error al cargar los géneros'
            });
        }

        // Get all series
        Serie.GetAll((serieErr, allSeries) => {
            if (serieErr) {
                console.error('Error loading series:', serieErr);
                return res.status(500).render('error', {
                    'page-title': 'Error',
                    error: 'Error al cargar las series'
                });
            }

            let series = allSeries;

            // Apply search filter (by name)
            if (searchQuery) {
                series = series.filter(serie => 
                    serie.nombre.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            // Apply genre filter
            if (generoId) {
                series = series.filter(serie => serie.generoId == generoId);
            }

            // Add genre name to each serie for display
            series = series.map(serie => {
                const genero = generos.find(g => g.id == serie.generoId);
                return {
                    ...serie,
                    generoNombre: genero ? genero.nombre : 'Sin género'
                };
            });

            res.render('home/home', {
                'page-title': 'Home',
                series: series,
                generos: generos,
                search: searchQuery,
                generoSeleccionado: generoId
            });
        });
    });
}

export function GetDetails(req, res) {
    const serieId = req.params.serieId;

    // Get the serie by ID
    Serie.GetById(serieId, (err, serie) => {
        if (err) {
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
                console.error('Error loading genre:', genreErr);
            }

            res.render('series/detail', {
                'page-title': serie.nombre,
                serie: serie,
                genero: genero || { nombre: 'Sin género' }
            });
        });
    });
}
