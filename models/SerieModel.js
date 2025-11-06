
import path from 'path';
import { projectRoot } from '../utils/path.js';
import { GetDataFromFile,SaveDataToFile } from '../utils/FileHandlers.js';


const seriesPath = path.join(projectRoot, 'data', 'series.json');


class Serie {
    /**
     * @param {number} id 
     * @param {string} nombre 
     * @param {string} descripcion 
     * @param {number} generoId 
     * @param {string} imagen
     * @param {string} videoUrl
     */
    constructor(id, nombre, descripcion, generoId, imagen, videoUrl) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.generoId = generoId;
        this.imagen = imagen;
        this.videoUrl = videoUrl;
    }

    Save(callBack) {
        GetDataFromFile(seriesPath, (err, serieList) => {
            if (err) {
                console.error('Error getting data:', err);
                if (callBack) callBack(err);
                return;
            }
            
            const numericId = Number(this.id);
            
            if (numericId !== 0) {
                // Edit mode - find and update existing serie
                const editIndex = serieList.findIndex((s) => s.id == numericId);
                
                if (editIndex === -1) {
                    console.error('Serie not found for edit:', numericId);
                    if (callBack) callBack(new Error('Serie not found'));
                    return;
                }
                
                serieList[editIndex] = this;
                
                SaveDataToFile(seriesPath, serieList, (saveErr) => {
                    if (saveErr) {
                        console.error('Error saving edited serie:', saveErr);
                        if (callBack) callBack(saveErr);
                        return;
                    }
                    if (callBack) callBack(null);
                });
            } else {
                // Create mode - generate new ID
                this.id = serieList.length > 0 
                    ? Math.max(...serieList.map(s => s.id)) + Math.random() * 10000
                    : Math.random() * 10000;
                
                serieList.push(this);
                
                SaveDataToFile(seriesPath, serieList, (saveErr) => {
                    if (saveErr) {
                        console.error('Error saving new serie:', saveErr);
                        if (callBack) callBack(saveErr);
                        return;
                    }
                    if (callBack) callBack(null);
                });
            }
        });
    }

    static GetAll(callBack) {
        GetDataFromFile(seriesPath, callBack);
    }

    static GetById(id, callBack) {
        GetDataFromFile(seriesPath, (err, data) => {
            if (err) {
                console.error('Error getting serie by ID:', err);
                callBack(err, null);
                return;
            }
            
            const serie = data.find(s => s.id == id);
            if (serie) {
                callBack(null, serie);
            } else {
                callBack(null, null);
            }
        });
    }

    static Delete(id, callBack) {
        GetDataFromFile(seriesPath, (err, serieList) => {
            if (err) {
                console.error('Error getting data for delete:', err);
                if (callBack) callBack(err);
                return;
            }
            
            const idNumeric = Number(id);
            const newSerieList = serieList.filter((serie) => serie.id != idNumeric);
            SaveDataToFile(seriesPath, newSerieList, callBack);
        });
    }
}

export default Serie;
