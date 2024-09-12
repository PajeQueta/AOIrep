import {
  getReparatorsOptionsDB,
  updateMagazineStatusDB
} from "./chunk-DDH5TGST.mjs";

// src/controller/repairCtrl.ts
var getReparatorsOptions = async (req, res) => {
  try {
    const operatos = await getReparatorsOptionsDB();
    res.status(200).json(operatos);
  } catch (error) {
    res.status(400).json(error);
  }
};
var updateMagazineStatus = (req, res) => {
  try {
    const { code, reparator } = req.body;
    const result = updateMagazineStatusDB(code, reparator);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  getReparatorsOptions,
  updateMagazineStatus
};
