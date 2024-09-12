import {
  db
} from "./chunk-OFPTXF3K.mjs";

// src/model/checkDefectsAOI.ts
var getDataFromTheModelThatIsRunningOnTheLine = async (line) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "SELECT plate_code, model_plate, side, process FROM running_models WHERE line = ?";
      await db.query(q, [line], (err, data) => {
        if (err) {
          reject(err);
        }
        if (data && data.length > 0) {
          resolve({
            code: data[0].plate_code,
            model: data[0].model_plate,
            side: data[0].side,
            process: data[0].process
          });
        }
      });
    });
  } catch (error) {
    throw error;
  }
};
var getDefectsTypesOptions = async (process) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "SELECT type FROM defect_types_list WHERE process = ?";
      await db.query(q, [process], (err, data) => {
        if (err) {
          reject(err);
        }
        if (data && data.length > 0) {
          const defectTypes = data.map((item) => {
            return { label: item.type, value: item.type };
          });
          resolve(defectTypes);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};
var getPositionsOptions = async (process, codeProgram) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "SELECT position FROM defect_positions_list WHERE process = ?";
      await db.query(q, [process], (err, data) => {
        if (err) {
          reject(err);
        }
        if (data && data.length > 0) {
          const postions = data.map((item) => {
            return { label: item.position, value: item.position };
          });
          resolve(postions);
        } else {
          resolve([{ label: "", value: "" }]);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};
var getInspectorsOptions = async () => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "SELECT name FROM inspectors";
      await db.query(q, (err, data) => {
        if (err) {
          reject(err);
        }
        if (data && data.length > 0) {
          const inspectors = data.map((item) => {
            return { label: item.name, value: item.name };
          });
          resolve(inspectors);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};
var searchByActiveMagazine = async (line) => {
  try {
    return new Promise(async (resolve, reject) => {
      const q = "SELECT code FROM magazines_actives WHERE line = ?";
      console.log(line);
      await db.query(q, [line], (err, data) => {
        if (err) {
          reject(err);
        }
        if (data && data.length > 0 && data[0].code !== "") {
          resolve({ message: "exists", data: data[0].code });
        } else {
          resolve({ message: "dont exists", data: [] });
        }
      });
    });
  } catch (error) {
    throw error;
  }
};
var postDefect = async (activeMagazinecode, defectType, defectPosition, inspector) => {
  const q = "INSERT INTO defects (magazine_code, type, position, inspector) VALUES (?, ?, ?, ?)";
  try {
    return new Promise(async (resolve, reject) => {
      db.query(q, [activeMagazinecode, defectType, defectPosition, inspector], (err) => {
        if (err) {
          reject(err);
        }
        resolve("data entered");
      });
    });
  } catch (err) {
    throw err;
  }
};
var updateActiveMagazineCode = (newCode, line) => {
  const q = "UPDATE magazines_actives SET code = ? WHERE line = ?";
  const values = [newCode, line];
  try {
    return new Promise(async (resolve, reject) => {
      db.query(q, values, (err) => {
        if (err) {
          reject(err);
        }
        resolve("data updated");
      });
    });
  } catch (error) {
    throw error;
  }
};
var getDefectsByMagazineCode = (code) => {
  const q = "SELECT type, position, inspector FROM defects WHERE magazine_code = ?";
  try {
    return new Promise(async (resolve, reject) => {
      db.query(q, [code], (err, data) => {
        if (err) {
          reject(err);
        }
        if (data && data.length > 0) {
          console.log(data);
          let defectsSorted = {};
          data.forEach((defect) => {
            let key = `${defect.type}-${defect.position}-${defect.inspector}`;
            if (defectsSorted[key]) {
              defectsSorted[key].quantity += 1;
            } else {
              defectsSorted[key] = { ...defect, quantity: 1 };
            }
          });
          let result = Object.values(defectsSorted);
          resolve({ data: JSON.stringify(result) });
        } else {
          resolve({ message: "dont found", data: "[]" });
        }
      });
    });
  } catch (error) {
    throw error;
  }
};
var saveClodedMagazine = (code, content) => {
  const q = "INSERT INTO closeds_magazines (code, content, status) VALUES (?, ?, ?)";
  try {
    return new Promise(async (resolve, reject) => {
      const status = "waiting repair";
      db.query(q, [code, content, status], (err) => {
        if (err) {
          reject(err);
        }
        resolve("data entered");
      });
    });
  } catch (error) {
    throw error;
  }
};

export {
  getDataFromTheModelThatIsRunningOnTheLine,
  getDefectsTypesOptions,
  getPositionsOptions,
  getInspectorsOptions,
  searchByActiveMagazine,
  postDefect,
  updateActiveMagazineCode,
  getDefectsByMagazineCode,
  saveClodedMagazine
};
