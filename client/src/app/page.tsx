'use client'

import SelectShadcn from "./components/shadcn/SelectShadcn";
import { Button } from "@/components/ui/button"
import InputSimulate from "./components/change-model/InputSimulate";
import { useChangeModel } from "@/hooks/useChangeModel";
import AsyncSelect from 'react-select'

export default function Home() {

  const {
    codeOptions, code, handleChangeCode,
    lineOptions, line, handleLineChange,
    plate,
    model,
    processesOptions, process, handleProcessesChange,
    sideOptions, side, handleSideChange,
    handleSubmit

  } = useChangeModel()

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h2 className="text-[#1446A0] text-2xl font-bold mb-10">Escolha os modelos que irão rodar hoje</h2>
      <div className="flex flex-col justify-center items-center bg-[#D9D9D9] h-[200px] w-[720px] rounded-lg gap-5 mb-10">
        <div className="flex gap-4">
          <AsyncSelect placeholder="Selecione o código" options={codeOptions} value={code} onChange={handleChangeCode} className="font-semibold text-sm w-[200px]"/>
          <InputSimulate value={plate} />
          <InputSimulate value={model} />
        </div>
        <div className="flex gap-4">
          <AsyncSelect placeholder="Selecione o processo" options={processesOptions} value={process} onChange={handleProcessesChange} className="font-semibold text-sm " />
          <AsyncSelect placeholder="Selecione o lado" options={sideOptions} value={side} onChange={handleSideChange} className="font-semibold text-sm "/>
          <AsyncSelect placeholder="Selecione a linha" options={lineOptions} value={line} onChange={handleLineChange} className="font-semibold text-sm"/>
        </div>
      </div>
      <Button variant={'default'} className="ml-[620px]" onClick={handleSubmit}>Salvar</Button>
    </div>
  );
}
