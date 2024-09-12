import {
  db,
  dbPPA
} from "./chunk-D446NMCQ.mjs";

// src/model/changeModels.ts
var getCodes = async () => {
  try {
    return new Promise((resolve, reject) => {
      const q = "SELECT codigo_do_programa FROM codigos";
      dbPPA.query(q, (error, data) => {
        if (error) {
          console.log("erro");
          reject(error);
        } else if (data && data.length > 0) {
          const codes = data.map((row) => {
            return { label: row.codigo_do_programa, value: row.codigo_do_programa };
          });
          resolve(codes);
        } else {
          resolve({ message: "Not found" });
        }
      });
    });
  } catch (err) {
    throw err;
  }
};
var getDatasByCode = (code) => {
  try {
    return new Promise((resolve, reject) => {
      const q = "SELECT codigo, modelo FROM codigos WHERE codigo_do_programa = ? ";
      dbPPA.query(q, [code], (error, data) => {
        if (error) {
          reject(error);
        }
        if (data && data.length > 0) {
          resolve({ model: data[0].modelo, plate: data[0].codigo });
        } else {
          resolve({ message: "Not found" });
        }
      });
    });
  } catch (err) {
    throw err;
  }
};
var thereIsAlreadyAModelinThisLine = async (line) => {
  try {
    return new Promise((resolve, reject) => {
      const q = "SELECT plate_code FROM running_models WHERE line = ?";
      db.query(q, [line], (err, data) => {
        if (err) {
          reject(err);
        }
        if (data && data.length > 0) {
          resolve({ message: "exists" });
        } else
          resolve({ message: "not exists" });
      });
    });
  } catch (error) {
    throw error;
  }
};
var insertRunnigModel = async (line, code, model, side, process) => {
  try {
    console.log(line, code, model, side, process);
    return new Promise((resolve, reject) => {
      const q = "INSERT INTO running_models ( line, plate_code, model_plate, side, process ) VALUES (?, ?, ?, ?, ?)";
      db.query(q, [line, code, model, side, process], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ message: "Data entered successfully" });
        }
      });
    });
  } catch (error) {
  }
};
var updateRunnigModelDB = async (line, code, model, side, process) => {
  try {
    return new Promise((resolve, reject) => {
      console.log(line, code, model, side, process);
      const q = "UPDATE running_models SET plate_code = ?, model_plate = ?, side =?, process = ? WHERE line = ?";
      db.query(q, [code, model, side, process, line], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ message: "Data updated successfully" });
        }
      });
    });
  } catch (error) {
  }
};

export {
  getCodes,
  getDatasByCode,
  thereIsAlreadyAModelinThisLine,
  insertRunnigModel,
  updateRunnigModelDB
};
