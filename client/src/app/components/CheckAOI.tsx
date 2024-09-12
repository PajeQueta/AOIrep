import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import SelectShadcn from './shadcn/SelectShadcn'
import useSaveDefect from '@/hooks/useSaveDefect'
import AsyncSelect from 'react-select'

type CheckAOIProps = {
    line: string
}

const CheckAOI = ({ line }: CheckAOIProps) => {
    const {
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
        saveDefect
    } = useSaveDefect()

    useEffect(() => {
        getData(line)
        getOptionsToDefects()
    }, [process, plateCode])

    return (
        <div className='flex flex-col justify-center items-center h-screen w-full text-[#1446a0]'>
            <Button variant='blue' className='text-sm ml-[550px]' onClick={() => closeMagazine(line)}>Fechar magazine</Button>
            <h2 className='font-bold text-4xl mr-[590px] mt-10 mb-2'>{line}</h2>
            <div className="flex flex-col w-[700px] font-bold h-[100px]">
                <div className="flex justify-around items-center bg-[#1446a0] text-white w-full h-[50%] rounded-t-lg">
                    <p>Código: {plateCode}</p>
                    <p>Modelo/Programa: {plateModel}</p>
                </div>
                <div className="flex justify-around items-center border-2 boder-[#1446a0] w-full h-[50%] rounded-b-lg">
                    <p>Lado: {side}</p>
                    <p>{'AOI'}</p>
                    <p>{process}</p>
                    <p>{date}</p>
                </div>
            </div>
            <div className="flex mt-20 gap-4">
                <AsyncSelect
                    options={defectTypesOptions}
                    className='rounded-md'
                    value={defectType}
                    onChange={handleDefectTypeChange}
                    placeholder='Selecione o tipo do defeito'
                />
                <AsyncSelect
                    options={positionsOptions}
                    className='rounded-md'
                    value={position}
                    onChange={handlePositionChange}
                    placeholder='Selecione a posição'
                />
                <AsyncSelect
                    options={inspectorOptions}
                    className='rounded-md  '
                    value={inspector}
                    onChange={handleInspectorChange}
                    placeholder='Selecione o inspetor'
                />
            </div>
            <Button className='mt-20 ml-[550px] mb-20' onClick={() => saveDefect(line)}>Salvar defeito</Button>
        </div>
    )
}

export default CheckAOI