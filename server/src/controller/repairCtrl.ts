import { Request, Response } from "express";
import { getReparatorsOptionsDB, updateMagazineStatusDB } from "../model/repair";

export const getReparatorsOptions = async (req: Request, res: Response) => {
    try {
        const operatos = await getReparatorsOptionsDB()
        res.status(200).json(operatos)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const updateMagazineStatus = (req : Request, res: Response) => {
    try {
        const {code, reparator} = req.body
        const result = updateMagazineStatusDB(code, reparator)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
    
}
