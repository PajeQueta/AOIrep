import { db } from "./src/config/bd"

const insert = (postion: string, process: string) => {
    try {
        return new Promise(async (resolve, reject) => {
            const values = [postion, process]
            db.query('INSERT INTO defect_positions_list (position, process) VALUES (?, ?)', values, (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    } catch (error) {
        throw error
    }
}

const check = (position: string, process: string) => {
    try {
        const values = [position, process]
        const q = 'SELECT position FROM defect_positions_list WHERE position = ? AND process = ?'
        return new Promise(async (resolve, reject) => {
            db.query(q, values, (err, data) => {
                if (err) {
                    reject(err)
                }
                if (data && data.length > 0) {
                    reject({ message: `${data[0].position} já existe!` })
                } else {
                    resolve(true)
                }
            })
        })
    } catch (error) {
        throw error
    }
}

const insertPositions = (process: string, arr: string[]) => {
    try {
        const hash: { [key: string]: string } = {}
        arr.forEach((position) => {
            const patern = /^([^_])+/
            const without_: any = position.match(patern)
            if (without_ && !hash[without_[0]]) {
                hash[without_[0]] = without_[0]
                check(without_[0], process).then((res) => {
                    console.log(without_[0], ' foi inserido!')
                    insert(without_[0], process)
                })
                    .catch(err => console.log(err))
            }
        })
        return hash
    } catch (error) {
        throw error
    }
}

const arr = [
    "R22_1", "R22_2", "R22_3", "R22_4", "R22_5", "R22_6", "R22_7", "R22_8",
    "R14_1", "R14_2", "R14_3", "R14_4", "R14_5", "R14_6", "R14_7", "R14_8",
    "R28_1", "R28_2", "R28_3", "R28_4", "R28_5", "R28_6", "R28_7", "R28_8",
    "JR2_1", "JR2_2", "JR2_3", "JR2_4", "JR2_5", "JR2_6", "JR2_7", "JR2_8",
    "JR3_1", "JR3_2", "JR3_3", "JR3_4", "JR3_5", "JR3_6", "JR3_7", "JR3_8",
    "R23_1", "R23_2", "R23_3", "R23_4", "R23_5", "R23_6", "R23_7", "R23_8",
    "R24_1", "R24_2", "R24_3", "R24_4", "R24_5", "R24_6", "R24_7", "R24_8",
    "R25_1", "R25_2", "R25_3", "R25_4", "R25_5", "R25_6", "R25_7", "R25_8",
    "R26_1", "R26_2", "R26_3", "R26_4", "R26_5", "R26_6", "R26_7", "R26_8",
    "R27_1", "R27_2", "R27_3", "R27_4", "R27_5", "R27_6", "R27_7", "R27_8",
    "R29_1", "R29_2", "R29_3", "R29_4", "R29_5", "R29_6", "R29_7", "R29_8"
]
const process = 'SMD ADESIVO'

try {
    const result = insertPositions(process, arr)
} catch (error) {
    console.log(error)
}