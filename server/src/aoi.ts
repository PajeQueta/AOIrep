import e from 'express'

import cors from 'cors'

import { config } from '../node_modules/dotenv/lib/main'

config()

import { sendCodes, sendDatasByCode, updateRunningModel } from './controller/changeModelsController'
import { closeMagazine, getDataFromLine, getOptionsToDefect, saveDefect } from './controller/checkAOICtrl'
import { getReparatorsOptions, updateMagazineStatus } from './controller/repairCtrl'

const app = e()

app.use(cors())

app.use(e.json())

app.get('/get-plates', sendCodes )

app.get('/get-datas-by-code', sendDatasByCode)

app.post('/update-runnig-model', updateRunningModel)

app.get('/get-data-running-model', getDataFromLine)

app.get('/get-options-to-defect', getOptionsToDefect)

app.post('/save-defect', saveDefect)

app.post('/close-magazine', closeMagazine)

app.get('/get-reparators', getReparatorsOptions)

app.patch('/update-magazine-status', updateMagazineStatus)

const port = process.env.PORT || 3306

app.listen(port, () => { 
    console.log('on')
})