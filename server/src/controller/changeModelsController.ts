import { Request, Response } from 'express'
import { thereIsAlreadyAModelinThisLine, getCodes, getDatasByCode, insertRunnigModel, updateRunnigModelDB } from '../model/changeModels'

export const sendCodes = async (req: Request, res: Response) => {
    try {
        const plates = await getCodes()
        res.status(200).json(plates)
    } catch (error) {
        throw error
    }
}

export const sendDatasByCode = async (req: Request, res: Response) => {
    const { code } = req.query
    try {
        const response = await getDatasByCode(code)
        res.status(200).json(response)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const updateRunningModel = async (req: Request, res: Response) => {
    try {
        const { line, code, model, side, process } = req.body

        const checkResponse = await thereIsAlreadyAModelinThisLine(line) as { message: string }
        console.log(checkResponse.message)
        if (checkResponse.message === 'exists') {
            const resUpdate = await updateRunnigModelDB(line, code, model, side, process)
            res.status(200).json(resUpdate)
        }
        if (checkResponse.message === 'not exists') {
            const resPost = await insertRunnigModel(line, code, model, side, process)
            res.status(200).json(resPost)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}