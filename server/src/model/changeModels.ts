import { db, dbPPA } from "../config/bd";

export const getCodes = async () => {
    try {
        return new Promise((resolve, reject) => {
            const q = 'SELECT codigo_do_programa FROM codigos';
            dbPPA.query(q, (error, data) => {
                if (error) {
                    console.log('erro')
                    reject(error);
                } else if (data && data.length > 0) {
                    const codes = data.map((row: { codigo_do_programa: string }) => {
                        return { label : row.codigo_do_programa, value: row.codigo_do_programa } 
                    })
                    resolve(codes);
                } else {
                    resolve({ message: 'Not found' });
                }
            });
        });
    } catch (err) {
        throw err;
    }
};

export const getDatasByCode = (code: any) => {
    try {
        return new Promise((resolve, reject) => {
            const q = 'SELECT codigo, modelo FROM codigos WHERE codigo_do_programa = ? '
            dbPPA.query(q, [code], (error, data) => {
                if (error) {
                    reject(error)
                }
                if (data && data.length > 0) {
                    resolve({ model: data[0].modelo, plate: data[0].codigo })
                } else {
                    resolve({ message: 'Not found' })
                }
            })
        })
    } catch (err) {
        throw err
    }
}

export const thereIsAlreadyAModelinThisLine = async (line: any) => {
    try {
        return new Promise((resolve, reject) => {
            const q = 'SELECT plate_code FROM running_models WHERE line = ?'
            db.query(q, [line], (err, data) => {
                if (err) {
                    reject(err)
                }
                if (data && data.length > 0) {
                    resolve({ message: 'exists' })
                } else (
                    resolve({ message: 'not exists' })
                )
            })
        })
    } catch (error) {
        throw error
    }
}

export const insertRunnigModel = async (line: string, code: string, model: string, side: string, process: string) => {
    try {
        console.log(line, code, model, side, process)
        return new Promise((resolve, reject) => {
            const q = 'INSERT INTO running_models ( line, plate_code, model_plate, side, process ) VALUES (?, ?, ?, ?, ?)'
            db.query(q, [line, code, model, side, process], (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({ message: 'Data entered successfully' })
                }
            })
        })
    } catch (error) {

    }
}

export const updateRunnigModelDB = async (line: string, code: string, model: string, side: string, process: string) => {
    try {
        return new Promise((resolve, reject) => {
            console.log(line, code, model, side, process)
            const q = 'UPDATE running_models SET plate_code = ?, model_plate = ?, side =?, process = ? WHERE line = ?'
            db.query(q, [code, model, side, process, line], (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({ message: 'Data updated successfully' })
                }
            })
        })
    } catch (error) {

    }
}

