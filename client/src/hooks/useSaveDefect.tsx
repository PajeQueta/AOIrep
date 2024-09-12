import React, { useContext, useState} from 'react'
import { urlBaseApi } from '@/urlBase'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AOIContext } from '@/context/myContext'
import { useRouter } from 'next/navigation'

const useSaveDefect = () => {

    const router = useRouter()

    const {setModel, setCode, setMagazineInfos, setUrl, code} = useContext(AOIContext)

    const date = new Date().toLocaleDateString('pt-br')

    const [plateCode, setPlateCode] = useState<string>('')
    const [plateModel, setPlateModel] = useState<string>('')
    const [side, setSide] = useState<string>('')
    const [process, setProcess] = useState<string>('')

    const [defectType, setDefectType] = useState<any>('')

    const handleDefectTypeChange = (e: string) => {
        setDefectType(e)
    }
    const [position, setPosition] = useState<any>('')
    const handlePositionChange = (e: string) => {
        setPosition(e)
    }
    const [inspector, setInspector] = useState<any>('')
    const handleInspectorChange = (e: string) => {
        setInspector(e)
    }

    const [defectTypesOptions, setDefectTypesOptions] = useState<string[]>([])
    const [positionsOptions, setPositionsOptions] = useState<string[]>([])
    const [inspectorOptions, setInspectorOptions] = useState<string[]>([])

    const checkIftheFieldsAreFilledIn = (fields: string[]) => {
        try {
            let check: boolean = true
            fields.forEach((field) => {
                if (field.trim() === "") {
                    check = false
                }
            })
            return check
        } catch (err) {
            return err
        }
    }

    const getData = async (line: string) => {
        await axios.get(`${urlBaseApi}/get-data-running-model`, {
            params: {
                line: line
            }
        }).then((res) => {
            setPlateCode(res.data.code)
            setPlateModel(res.data.model)
            setSide(res.data.side)
            setProcess(res.data.process)
        }).catch(error => console.log(error))
    }

    const getOptionsToDefects = async () => {
        console.log(process)
        await axios.get(`${urlBaseApi}/get-options-to-defect`, {
            params: {
                process: process,
                codeProgram: plateCode
            }
        })
            .then((res) => {
                setDefectTypesOptions(res.data.defectsTypesOptions)
                setPositionsOptions(res.data.positionsOptions)
                setInspectorOptions(res.data.inspectorsOptions)
            }).catch(err => console.log(err))
    }

    const saveDefect = async (line: string) => {
        const check = await checkIftheFieldsAreFilledIn([defectType.value, position.value, inspector.value])
        if (check) {
            await axios.post(`${urlBaseApi}/save-defect`, {
                line: line,
                defectType: defectType.value,
                defectPosition: position.value,
                inspector: inspector.value
            }).then((res) => {
                toast.success('Defeito enviado')
            }).catch((err) => {
                console.log(err)
                toast.success('Erro ao lançar defeito')
            })
        } else {
            toast.error('Preencha todos os campos')
        }
    }

    const closeMagazine = async (line: string) => {
        await axios.post(`${urlBaseApi}/close-magazine`, {
            line: line,
        }
        ).then(async (res) => {
            setDefectType('')
            setPosition('')
            setInspector('')
            toast.success('Magazine fechado!')
            const defects = res.data.magazineDefects
            const magazineInfos = {
                magazineCode: res.data.code,
                code: plateCode,
                model: plateModel,
                defects: defects
            } 
            const url = window.location.href
            await setUrl(url)
            await setModel(plateModel)
            await setCode(plateCode) 
            await setMagazineInfos(JSON.stringify(magazineInfos))
            console.log(res.data.magazineDefects)
            router.push('/token')
        }).catch((err) => {
            console.log(err)
        })
    }

    



    return {
        closeMagazine,
        plateCode,
        plateModel,
        side,
        process,
        date,
        getData,
        getOptionsToDefects,
        defectType, defectTypesOptions, handleDefectTypeChange,
        position, positionsOptions, handlePositionChange,
        inspector, inspectorOptions, handleInspectorChange,
        saveDefect,
        setDefectType, setPosition, setInspector
    }
}

export default useSaveDefect