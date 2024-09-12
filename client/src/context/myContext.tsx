'use client'

import React, { createContext, useState, SetStateAction } from "react";

type AOIContextProps = {
    url: string,
    setUrl: React.Dispatch<SetStateAction<string>>,
    code: string,
    setCode: React.Dispatch<SetStateAction<string>>,
    model: string,
    setModel: React.Dispatch<SetStateAction<string>>,
    magazineInfos: string,
    setMagazineInfos: React.Dispatch<SetStateAction<string>>,
    reparator: string,
    setReparator: React.Dispatch<SetStateAction<string>>
}

const AOIContext = createContext({} as AOIContextProps )

const AOIContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [url, setUrl] = useState<string>('')
    const [code, setCode] = useState<string>('124003101')
    const [model, setModel] = useState<string>('CM-500')
    const [magazineInfos, setMagazineInfos] = useState<string>('')
    const [reparator, setReparator] = useState<string>('')

    return (
        <AOIContext.Provider value={{
            url, 
            setUrl,
            code,
            setCode,
            model,
            setModel,
            magazineInfos,
            setMagazineInfos,
            reparator,
            setReparator
        }}>
            <>
                {children}
            </>
        </AOIContext.Provider>
    )

}

export { AOIContext, AOIContextProvider }