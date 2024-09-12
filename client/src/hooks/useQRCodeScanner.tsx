import React, {useState, useEffect, useContext, useRef} from 'react'
import jsQR from 'jsqr';
import { AOIContext } from '@/context/myContext';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { urlBaseApi } from '@/urlBase';

const useQRCodeScanner = () => {
    const { setMagazineInfos, reparator, setReparator } = useContext(AOIContext)

  const router = useRouter()

  const videoRef: any = useRef(null);
  const canvasRef: any = useRef(null);

  const [reparatorsOptions, setReparatorOptions] = useState<string[]>([])
  const getRpeparatorsOptions = async () => {
    await axios.get(`${urlBaseApi}/get-reparators`).then(async (res) => {
      await setReparatorOptions(res.data)
    })
  }

  const handleReparatorChange = (e: string) => {
    setReparator(e)
  }

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const initializeCamera = () => {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.error('Erro ao acessar a câmera:', err);
        });
    };

    const scanQRCode = async () => {
      let codeFound = false;

      if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });

        if (code && code.data && code.data.trim() !== '' && !codeFound) {
          await setMagazineInfos(code.data)
          router.push('/repair')
        }
      }

      if (!codeFound) {
        requestAnimationFrame(scanQRCode);
      }
    };

    initializeCamera();
    requestAnimationFrame(scanQRCode);
    getRpeparatorsOptions()

    return () => {
      if (video && video.srcObject) {
        video.srcObject.getTracks().forEach((track: any) => track.stop());
      }
    };
  }, []);

  return {reparator, handleReparatorChange, reparatorsOptions, videoRef, canvasRef}
}

export default useQRCodeScanner