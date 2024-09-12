import { Request, Response } from "express";

import { nanoid } from 'nanoid'

import { getDataFromTheModelThatIsRunningOnTheLine, getDefectsByMagazineCode, getDefectsTypesOptions, getInspectorsOptions, getPositionsOptions, postDefect, saveClodedMagazine, searchByActiveMagazine, updateActiveMagazineCode } from "../model/checkDefectsAOI";

export const getDataFromLine = async (req: Request, res: Response) => {
    try {
        const { line } = req.query
        const datas = await getDataFromTheModelThatIsRunningOnTheLine(line as string)
        res.status(200).json(datas)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getOptionsToDefect = async (req: Request, res: Response) => {
    try {
        const {process, codeProgram} = req.query
        console.log(codeProgram)

        const defectsTypesOptions = await getDefectsTypesOptions( process as string )
        const positionsOptions = await getPositionsOptions(process as string, codeProgram as string )
        const inspectorsOptions = await getInspectorsOptions()
        console.log(positionsOptions)
        res.status(200).json({ defectsTypesOptions, positionsOptions, inspectorsOptions })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const saveDefect = async (req: Request, res: Response) => {
    try {
        const { line, defectType, defectPosition, inspector } = req.body

        const checkActiveMagazineCode = await searchByActiveMagazine(line) as { message: string, data?: string }

        if (checkActiveMagazineCode.message === 'dont exists') {
            const code = await nanoid()
            const teste = await updateActiveMagazineCode(code, line)
            console.log(teste)
            const result = await postDefect(code, defectType, defectPosition, inspector)
            res.status(200).json({ result })
        }

        if (checkActiveMagazineCode.message === 'exists' && checkActiveMagazineCode.data) {
            const result = await postDefect(checkActiveMagazineCode.data, defectType, defectPosition, inspector)
            res.status(200).json({ result })
        }

    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

export const closeMagazine = async (req: Request, res: Response) => {
    try {
        const { line } = await req.body
        const searchResult = await searchByActiveMagazine(line) as { data: string }
        const code = searchResult.data
        const defectsThisMagazine = await getDefectsByMagazineCode(code) as {data: string}
        await saveClodedMagazine(code, defectsThisMagazine.data)
        const newCode = await nanoid()
        await updateActiveMagazineCode(newCode, line)
        res.status(200).json({message: `Magazine with code: ${code} was closed and the new code is ${newCode}`, code: code, magazineDefects: defectsThisMagazine.data })
    } catch (error) {
        res.status(500).json({error: error})
        console.log(error)
    }
}