import {
  getCodes,
  getDatasByCode,
  insertRunnigModel,
  thereIsAlreadyAModelinThisLine,
  updateRunnigModelDB
} from "./chunk-J57IZ4ZW.mjs";

// src/controller/changeModelsController.ts
var sendCodes = async (req, res) => {
  try {
    const plates = await getCodes();
    res.status(200).json(plates);
  } catch (error) {
    throw error;
  }
};
var sendDatasByCode = async (req, res) => {
  const { code } = req.query;
  try {
    const response = await getDatasByCode(code);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};
var updateRunningModel = async (req, res) => {
  try {
    const { line, code, model, side, process } = req.body;
    const checkResponse = await thereIsAlreadyAModelinThisLine(line);
    console.log(checkResponse.message);
    if (checkResponse.message === "exists") {
      const resUpdate = await updateRunnigModelDB(line, code, model, side, process);
      res.status(200).json(resUpdate);
    }
    if (checkResponse.message === "not exists") {
      const resPost = await insertRunnigModel(line, code, model, side, process);
      res.status(200).json(resPost);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  sendCodes,
  sendDatasByCode,
  updateRunningModel
};
