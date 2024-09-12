'use client'

import React, { useContext, useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { AOIContext } from '@/context/myContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { urlBaseApi } from '@/urlBase'
import { useRouter } from 'next/navigation'

type Defect = {
  type: string,
  position: string,
  inspector: string,
  quantity: number
}

type Magazine = {
  codeMagazine: string,
  code: string,
  model: string
  defects: Defect[]
}


const Repair = () => {
  const [magazine, setMagazine] = useState<Magazine>({
    codeMagazine: '',
    code: '',
    model: '',
    defects: []
  })

  const { magazineInfos, reparator, setReparator } = useContext(AOIContext)

  const router = useRouter()

  const convertDatas = async () => {
    try {
      const magazineInfosJson: { magazineCode: string, code: string, model: string, defects: string } = JSON.parse(magazineInfos)
      const codeAOI: string = magazineInfosJson.code
      const modelAOI: string = magazineInfosJson.model
      const defects: Defect[] = JSON.parse(magazineInfosJson.defects)
      const infos: Magazine = {
        codeMagazine: magazineInfosJson.magazineCode,
        code: codeAOI,
        model: modelAOI,
        defects: defects
      }
      await setMagazine(infos)
    } catch (error) {
      toast.error('Aconteceu algum erro. Volte e escanei o QR Ccode novamente!')
    }
  }

  const completeRepair = async() => {
    await axios.patch(`${urlBaseApi}/update-magazine-status`, {
      code: magazine.codeMagazine,
      reparator: reparator 
    }).then(async(res) => {
      router.push('/repair-qrcode-scanner')
      setReparator('')
      toast.success('Reparo de magazine finalizado com sucesso!')    
    }).catch((error) => {
      toast.error('Algo deu errado!')
      console.log(error)
    })
   
  }

  useEffect(() => {
    convertDatas()
  }, [])

  return (
    <div className='flex flex-col h-screen items-center w-full'>
      <h1 className='mt-[90px] text-xl mb-4 font-bold'>Olá, {reparator}. Aqui estão os dados dos defeitos no magazine</h1>
      <Button variant='blue' className='mb-[20px] ml-[450px]' onClick={completeRepair}>Finalizar reparo</Button>
      <h1 className='text-2xl text-[#1446a0] font-bold mb-4'>Reparo de defeitos</h1>
      <div className="flex">
        <Table className="w-[600px] border">
          <TableHeader className="hover:bg-[#1446a0]">
            <TableRow className="bg-[#1446a0] text-white">
              <TableHead className="font-bold text-white w-[250px]">Defeito</TableHead>
              <TableHead className="font-bold text-white w-[250px]">Posição</TableHead>
              <TableHead className="font-bold text-white w-[250px]">Inspetor</TableHead>
              <TableHead className="font-bold text-white text-right">Quantidade</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              magazine.defects.map((defect, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{defect.type}</TableCell>
                  <TableCell className="font-medium">{defect.position}</TableCell>
                  <TableCell className="font-medium">{defect.inspector}</TableCell>
                  <TableCell className="text-center font-medium">{defect.quantity}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Repair