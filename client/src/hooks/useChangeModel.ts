import { useState, useEffect, FormEvent } from "react"
import axios from "axios"
import { urlBaseApi } from "@/urlBase"
import { toast } from "react-toastify";

export const useChangeModel = () => {
    const [line, setLine] = useState<any>('')

    const lineOptions: {label: string, value: string}[] = [
        {label: 'L05', value: 'L05'},
        {label: 'L06', value: 'L06'},
        {label: 'L07', value: 'L07'},
        {label: 'L08', value: 'L08'},
        {label: 'L09', value: 'L09'},
        {label: 'L10', value: 'L10'},
        {label: 'L11', value: 'L11'},
        {label: 'L12', value: 'L12'},
        {label: 'L13', value: 'L13'},
        {label: 'L14', value: 'L14'}
    ]

    const [plate, setPlate] = useState<string>('Informação de placa')

    const [model, setModel] = useState<string>('Informação de modelo')

    const [code, setCode] = useState<any>('')

    const [codeOptions, setCodeOptions] = useState<string[]>([])

    const [process, setProcess] = useState<any>('')

    const processesOptions : {label: string, value: string}[] = [{label: 'SMD PASTA', value: 'SMD PASTA'}, {label: 'PTH', value: 'PTH'}, { label: 'SMD ADESIVO', value: 'SMD ADESIVO'}]

    const [side, setSide] = useState<any>('')

    const sideOptions: {label: string, value: string}[] = [{label: '1R', value: '1R'}, { label: '2R', value: '2R'}, {label: 'ADESIVO', value: 'ADESIVO'}]

    const handleSideChange = (e: string) => {
        setSide(e)
    }

    const getPlates = async () => {
        try {
            await axios.get(`${urlBaseApi}/get-plates`).then((res) => {
                console.log(res.data)
                setCodeOptions(res.data)
            }).catch(err => setCodeOptions(['a']))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getPlates()
    }, [])

    const handleChangeCode = async (e: any) => {
        setCode(e)
        axios.get(`${urlBaseApi}/get-datas-by-code`, {
            params: {
                code: e.value
            }
        }).then((res) => {
            console.log(res.data)
            setPlate(res.data.plate)
            setModel(res.data.model)
        })
    }

    const handleLineChange = (e: any) => {
        console.log(e)
        setLine(e)
    }

    const handleProcessesChange = (e: any) => {
        setProcess(e)
    }

    const checkIftheFieldsAreFilledIn = (fields: string[]) => {
        try {
            let check : boolean = true
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

    const handleSubmit = async () => {
        const check = checkIftheFieldsAreFilledIn([code.value, plate, model, process.value, side.value, line.value])
        check ? axios.post(`${urlBaseApi}/update-runnig-model`, {
            code: code.value,
            model: model,
            process: process.value,
            side: side.value,
            line: line.value,     
        }).then((res) => toast.success('Atualizado com sucesso')).catch((err) => console.log(err)) : toast.error('Todos os campos devem ser preenchidos')
        
    }

    return {
        codeOptions, code, handleChangeCode,
        lineOptions, line, handleLineChange,
        plate,
        model,
        processesOptions, process, handleProcessesChange,
        sideOptions, side, handleSideChange,
        handleSubmit
    }
}