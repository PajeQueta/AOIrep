'use client'

import React, { useRef, useEffect, useContext, useState } from 'react';
import SelectShadcn from '../components/shadcn/SelectShadcn';
import useQRCodeScanner from '@/hooks/useQRCodeScanner';

const QRCodeScanner = () => {

  const {reparator, handleReparatorChange, videoRef, reparatorsOptions, canvasRef} = useQRCodeScanner()

  return (
    <div className='h-screen w-full flex justify-center items-center flex-col text-center'>
      <h2 className='font-bold text-2xl text-[#1446A0] mb-8'>Selecione quem está fazendo o reparo e escanei o QRCode para iniciar o reparo</h2>
      <div className="flex mb-6">
        <SelectShadcn
          value={reparator}
          handleChangeValue={handleReparatorChange}
          placeholder='Selecione quem está fazendo o reparo'
          options={reparatorsOptions}
        />
      </div>
      <video ref={videoRef} style={{ height: '300px', width: '450px', maxWidth: '500px', borderRadius: 20 }} autoPlay />
      <canvas ref={canvasRef} style={{ display: 'none', borderRadius: 20 }} />
    </div>
  );
}

export default QRCodeScanner;