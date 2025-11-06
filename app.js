import express from 'express';
import {engine} from 'express-handlebars';
import path from 'path';
import {projectRoot} from './utils/path.js';
import homeRoutes from './routes/home.js';
import genreRoutes from './routes/genres-router.js';
import seriesRoutes from './routes/series.js';


const app = express();

app.engine('hbs', engine({
    layoutsDir: "views/layouts",
    defaultLayout: 'layout',
    extname: 'hbs',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }    
    }
}));
app.set('view engine', 'hbs');
app.set('views', 'views');

// Middleware to parse form data
app.use(express.urlencoded());
// app.use(express.json());

// Serve static files from the public directory

app.use(express.static(path.join(projectRoot, 'public')));

//routes
app.use(homeRoutes);
app.use('/generos', genreRoutes);
app.use('/series', seriesRoutes);

app.use((req, res) => {
    res.status(404).render('404', {"page-title": '404 - Not Found'});
});

// Start the server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});