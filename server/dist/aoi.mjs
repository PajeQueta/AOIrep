import {
  sendCodes,
  sendDatasByCode,
  updateRunningModel
} from "./chunk-44TICJFN.mjs";
import {
  closeMagazine,
  getDataFromLine,
  getOptionsToDefect,
  saveDefect
} from "./chunk-6QAAJDRW.mjs";
import {
  getReparatorsOptions,
  updateMagazineStatus
} from "./chunk-CCP4YBKH.mjs";
import "./chunk-J57IZ4ZW.mjs";
import "./chunk-MVMO7TI4.mjs";
import "./chunk-JGW45KOU.mjs";
import {
  __toESM,
  require_main
} from "./chunk-OFPTXF3K.mjs";

// src/aoi.ts
var import_main = __toESM(require_main());
import e from "express";
import cors from "cors";
(0, import_main.config)();
var app = e();
app.use(cors());
app.use(e.json());
app.get("/get-plates", sendCodes);
app.get("/get-datas-by-code", sendDatasByCode);
app.post("/update-runnig-model", updateRunningModel);
app.get("/get-data-running-model", getDataFromLine);
app.get("/get-options-to-defect", getOptionsToDefect);
app.post("/save-defect", saveDefect);
app.post("/close-magazine", closeMagazine);
app.get("/get-reparators", getReparatorsOptions);
app.patch("/update-magazine-status", updateMagazineStatus);
var port = process.env.PORT || 3306;
app.listen(port, () => {
  console.log("on");
});
