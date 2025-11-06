import fs from 'fs';
import path from 'path';
import { projectRoot } from '../utils/path.js';

    const generosPath = path.join(projectRoot, 'data', 'generos.json');

  
const GetDataFromFile = (generosPath, callBack) => {
        fs.readFile(generosPath, 'utf-8', function(err, data) {
            if (err) {
                console.error('Error reading file:', err);
                callBack(err,[]);
                return;
            }
            try {
                const jsonData = JSON.parse(data);
                 if (!Array.isArray(jsonData)) {
                console.error('JSON data is not an array');
                callBack(null, []);
                return;
            }
            callBack(null, jsonData);
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
                callBack(parseError, []);
            }
        });
    }

     const SaveDataToFile = (generosPath, data, callBack) => {
            fs.writeFile(generosPath, JSON.stringify(data, null, 2), 'utf-8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                   if(callBack) callBack(err);
                    return;
                }
               if(callBack) callBack(null);

            });
        };


class Genre {
    /**
     * 
     * @param {number} id 
     * @param {string} nombre 
     * @param {string} descripcion 
     */
    constructor(id, nombre, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    Save(callBack){
        GetDataFromFile(generosPath, ( err,  genreList) => {
            if (err) {
                console.error('Error getting data:', err);
                if (callBack) callBack(err);
                return;
            }
            // Convert id to number for consistent comparison
        const numericId = Number(this.id);
        
        if (numericId !== 0) {
            // Edit mode - find and update existing genre
            const editIndex = genreList.findIndex((g) => g.id == numericId);
            
            if (editIndex === -1) {
                console.error('Genre not found for edit:', numericId);
                if (callBack) callBack(new Error('Genre not found'));
                return;
            }
            
            genreList[editIndex] = this;
            
            SaveDataToFile(generosPath, genreList, (saveErr) => {
                if (saveErr) {
                    console.error('Error saving edited genre:', saveErr);
                    if (callBack) callBack(saveErr);
                    return;
                }
                if (callBack) callBack(null);
            });
        } else {
            this.id = genreList.length > 0 
                ? Math.max(...genreList.map(g => g.id)) + 1 
                : 1;
            
            genreList.push(this);
            
            SaveDataToFile(generosPath, genreList, (saveErr) => {
                if (saveErr) {
                    console.error('Error saving new genre:', saveErr);
                    if (callBack) callBack(saveErr);
                    return;
                }
                if (callBack) callBack(null);
            });
        }
    });
}


    static GetAll(callBack){
       GetDataFromFile(generosPath,callBack) ;
    }

     static GetById(id, callBack){
       GetDataFromFile(generosPath, (err, data) => {
           if (err) {
               console.error('Error getting genre by ID:', err);
               callBack(err, null);
               return;
           }
           const idNumeric = Number(id);
            const genre = data.find(g => g.id == idNumeric);
            if(genre){
                callBack(null, genre);

            } else {
                callBack(null,null);
            }

        });
    }

       static Delete(id,callBack){
       GetDataFromFile(generosPath, (err, genreList) =>{
            if (err) {
                console.error('Error getting data for delete:', err);
                if (callBack) callBack(err);
                return;
            }
            const idNumeric = Number(id);
           const newGenreList = genreList.filter(
            (genre) => genre.id != idNumeric);
           SaveDataToFile(generosPath, newGenreList, callBack);
       });
    }
}

export default Genre;