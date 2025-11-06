import fs from 'fs'

export function GetDataFromFile(generosPath, callBack){
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

export function SaveDataToFile(generosPath, data, callBack) {
    fs.writeFile(generosPath, JSON.stringify(data, null, 2), 'utf-8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            if(callBack) callBack(err);
            return;
        }
        if(callBack) callBack(null);
    });
}