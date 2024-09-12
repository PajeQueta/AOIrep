import { db } from "../config/bd";

export const getReparatorsOptionsDB = () => {
    try {
        const q = 'SELECT name FROM reparators'
        return new Promise(async(resolve, reject) => {
            await db.query(q, (err, data) => {
                if (err) {
                    reject(err)
                }
                if (data && data.length > 0) {
                    const response = data.map((reparator : {name: string}) => {
                        return reparator.name
                    })
                    resolve(response)
                }
            })
        })
    } catch (error) {
        throw error
    }
}

export const updateMagazineStatusDB = (code : string, reparator: string) => {
    try {
        return new Promise(async(resolve, reject) => {
            const newStatus: string = `repaired:${reparator}`
            const q = 'UPDATE closeds_magazines SET status = ? WHERE code = ?'
            await db.query(q, [newStatus, code], (err, data) => {
                if (err) {
                    reject(err)
                }
                if (data && data.affectedRows > 0) {
                    resolve(data)
                }
            })
        })
    } catch (error) {
        throw error
    }
} 