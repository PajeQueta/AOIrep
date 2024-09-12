'use client'

import React, { useContext } from 'react'
import QRCode from 'qrcode.react';
import { AOIContext } from '@/context/myContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Token = () => {

    const router = useRouter()

    const { code, model, magazineInfos, url } = useContext(AOIContext)

    return (
        <div className='h-screen w-full flex justify-center items-center flex-col'>
            <Button className='ml-[910px]' onClick={
                () => {
                    
                    router.push(url)
                }
            }>Voltar</Button>
            <div className="border-2 border-black w-[500px] h-[250px] flex flex-col items-center">
                <div className="border-b border-black w-full flex justify-center items-center h-[40px]">
                    <h1 className='text-xl font-bold text-center'>Ficha de inspeção NG e reparo</h1>
                </div>
                <div className="flex w-full border-b border-black h-[35px]">
                    <div className="flex w-[250px] border-r border-black justify-center items-center">
                        <p className='text-xl font-bold'>Programa:</p>
                        <p className='ml-1 text-lg'>{code}</p>
                    </div>
                    <div className="flex w-[250px] justify-center items-center">
                        <p className='text-xl font-bold'>Modelo:</p>
                        <p className='ml-1 text-lg'>{model}</p>
                    </div>
                </div>
                <div className="flex w-full justify-around items-center mt-4">
                    <QRCode value={magazineInfos} />
                    <div className="flex flex-col">
                        <div className="flex justify-center items-center text-center mb-2">
                            Reparo
                            <br />
                            ____________________________
                        </div>
                        <div className="flex justify-center items-center text-center mt-2">
                            Visual
                            <br />
                            ____________________________
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Token