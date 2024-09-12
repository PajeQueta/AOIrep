import { db } from "../config/bd";

export const getDataFromTheModelThatIsRunningOnTheLine = async (line: string) => {
    try {
        return new Promise(async (resolve, reject) => {
            const q = 'SELECT plate_code, model_plate, side, process FROM running_models WHERE line = ?'
            await db.query(q, [line], (err, data) => {
                if (err) {
                    reject(err)
                }
                if (data && data.length > 0) {
                    resolve({
                        code: data[0].plate_code,
                        model: data[0].model_plate,
                        side: data[0].side,
                        process: data[0].process
                    })
                }
            })
        })
    } catch (error) {
        throw error
    }
}

export const getDefectsTypesOptions = async (process: string) => {
    try {
        return new Promise(async (resolve, reject) => {
            const q = 'SELECT type FROM defect_types_list WHERE process = ?'
            await db.query(q, [process], (err, data) => {
                if (err) {
                    reject(err)
                }
                if (data && data.length > 0) {
                    const defectTypes = data.map((item: {
                        type: string
                    }) => {
                        return {label: item.type, value: item.type }
                    })
                    resolve(defectTypes)
                }
            })
        })
    } catch (error) {
        throw error
    }
}

export const getPositionsOptions = async (process: string, codeProgram: string) => {
    try {
        return new Promise(async (resolve, reject) => {
            const q = 'SELECT position FROM defect_positions_list WHERE process = ?'
            await db.query(q, [process],(err, data) => {
                if (err) {
                    reject(err)
                }
                if (data && data.length > 0) {
                    const postions = data.map((item: {
                        position: string
                    }) => {
                        return { label: item.position, value: item.position }
                    })
                    resolve(postions)
                } else {
                    resolve([{label: '', value: ''}])
                }
            })
        })
    } catch (error) {
        throw error
    }
}

export const getInspectorsOptions = async () => {
    try {
        return new Promise(async (resolve, reject) => {
            const q = 'SELECT name FROM inspectors'
            await db.query(q, (err, data) => {
                if (err) {
                    reject(err)
                }
                if (data && data.length > 0) {
                    const inspectors = data.map((item: {
                        name: string
                    }) => {
                        return {label: item.name, value: item.name}
                    })
                    resolve(inspectors)
                }
            })
        })
    } catch (error) {
        throw error
    }
}

export const searchByActiveMagazine = async (line: string) => {
    try {
        return new Promise(async (resolve, reject) => {
            const q = 'SELECT code FROM magazines_actives WHERE line = ?'
            console.log(line)
            await db.query(q, [line], (err, data) => {
                if (err) {
                    reject(err)
                }
                if (data && data.length > 0 && data[0].code !== '') {
                    resolve({ message: 'exists', data: data[0].code })
                } else {
                    resolve({ message: 'dont exists', data: [] })
                }
            })
        })
    } catch (error) {
        throw error
    }
}

export const postDefect = async (activeMagazinecode: string, defectType: string, defectPosition: string, inspector: string) => {
    const q = 'INSERT INTO defects (magazine_code, type, position, inspector) VALUES (?, ?, ?, ?)'
    try {
        return new Promise(async (resolve, reject) => {
            db.query(q, [activeMagazinecode, defectType, defectPosition, inspector], (err) => {
                if (err) {
                    reject(err)
                }
                resolve('data entered')
            })
        })
    } catch (err) {
        throw err
    }
}

export const updateActiveMagazineCode = (newCode: string, line: string) => {
    const q = 'UPDATE magazines_actives SET code = ? WHERE line = ?'
    const values = [newCode, line]
    try {
        return new Promise(async (resolve, reject) => {
            db.query(q, values, (err) => {
                if (err) {
                    reject(err)
                }
                resolve('data updated')
            })
        })
    } catch (error) {
        throw error
    }
}

interface Defect {
    type: string,
    position: string,
    inspector: string
}

interface defectsSorted extends Defect {
    quantity: number
}

export const getDefectsByMagazineCode = (code: string) => {
    const q = 'SELECT type, position, inspector FROM defects WHERE magazine_code = ?'
    try {
        return new Promise(async (resolve, reject) => {
            db.query(q, [code], (err, data) => {
                if (err) {
                    reject(err)
                }
                if (data && data.length > 0) {

                    console.log(data)
                    let defectsSorted: { [key: string]: defectsSorted } = {}

                    data.forEach((defect: { type: string, position: string, inspector: string }) => {
                        let key = `${defect.type}-${defect.position}-${defect.inspector}`
                        if (defectsSorted[key]) {
                            defectsSorted[key].quantity += 1;
                        } else {
                            defectsSorted[key] = { ...defect, quantity: 1 }
                        }
                    });
                    let result = Object.values(defectsSorted);
                    resolve({ data: JSON.stringify(result) })
                } else {
                    resolve({ message: 'dont found', data: '[]' })
                }

            })
        })
    } catch (error) {
        throw error
    }
}

export const saveClodedMagazine = (code: string, content: string) => {
    const q = 'INSERT INTO closeds_magazines (code, content, status) VALUES (?, ?, ?)'
    try {
        return new Promise(async (resolve, reject) => {
            const status = 'waiting repair'
            db.query(q, [code, content, status], (err) => {
                if (err) {
                    reject(err)
                }
                resolve('data entered')
            })
        })
    } catch (error) {
        throw error
    }
}
