import {
  getDataFromTheModelThatIsRunningOnTheLine,
  getDefectsByMagazineCode,
  getDefectsTypesOptions,
  getInspectorsOptions,
  getPositionsOptions,
  postDefect,
  saveClodedMagazine,
  searchByActiveMagazine,
  updateActiveMagazineCode
} from "./chunk-KX3MI4CT.mjs";

// src/controller/checkAOICtrl.ts
import { nanoid } from "nanoid";
var getDataFromLine = async (req, res) => {
  try {
    const { line } = req.query;
    const datas = await getDataFromTheModelThatIsRunningOnTheLine(line);
    res.status(200).json(datas);
  } catch (error) {
    res.status(400).json(error);
  }
};
var getOptionsToDefect = async (req, res) => {
  try {
    const { process, codeProgram } = req.query;
    console.log(codeProgram);
    const defectsTypesOptions = await getDefectsTypesOptions(process);
    const positionsOptions = await getPositionsOptions(process, codeProgram);
    const inspectorsOptions = await getInspectorsOptions();
    console.log(positionsOptions);
    res.status(200).json({ defectsTypesOptions, positionsOptions, inspectorsOptions });
  } catch (error) {
    res.status(500).json(error);
  }
};
var saveDefect = async (req, res) => {
  try {
    const { line, defectType, defectPosition, inspector } = req.body;
    const checkActiveMagazineCode = await searchByActiveMagazine(line);
    if (checkActiveMagazineCode.message === "dont exists") {
      const code = await nanoid();
      const teste = await updateActiveMagazineCode(code, line);
      console.log(teste);
      const result = await postDefect(code, defectType, defectPosition, inspector);
      res.status(200).json({ result });
    }
    if (checkActiveMagazineCode.message === "exists" && checkActiveMagazineCode.data) {
      const result = await postDefect(checkActiveMagazineCode.data, defectType, defectPosition, inspector);
      res.status(200).json({ result });
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
var closeMagazine = async (req, res) => {
  try {
    const { line } = await req.body;
    const searchResult = await searchByActiveMagazine(line);
    const code = searchResult.data;
    const defectsThisMagazine = await getDefectsByMagazineCode(code);
    await saveClodedMagazine(code, defectsThisMagazine.data);
    const newCode = await nanoid();
    await updateActiveMagazineCode(newCode, line);
    res.status(200).json({ message: `Magazine with code: ${code} was closed and the new code is ${newCode}`, code, magazineDefects: defectsThisMagazine.data });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};

export {
  getDataFromLine,
  getOptionsToDefect,
  saveDefect,
  closeMagazine
};
