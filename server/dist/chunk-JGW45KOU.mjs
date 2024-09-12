import {
  db
} from "./chunk-OFPTXF3K.mjs";

// src/model/repair.ts
var getReparatorsOptionsDB = () => {
  try {
    const q = "SELECT name FROM reparators";
    return new Promise(async (resolve, reject) => {
      await db.query(q, (err, data) => {
        if (err) {
          reject(err);
        }
        if (data && data.length > 0) {
          const response = data.map((reparator) => {
            return reparator.name;
          });
          resolve(response);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};
var updateMagazineStatusDB = (code, reparator) => {
  try {
    return new Promise(async (resolve, reject) => {
      const newStatus = `repaired:${reparator}`;
      const q = "UPDATE closeds_magazines SET status = ? WHERE code = ?";
      await db.query(q, [newStatus, code], (err, data) => {
        if (err) {
          reject(err);
        }
        if (data && data.affectedRows > 0) {
          resolve(data);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

export {
  getReparatorsOptionsDB,
  updateMagazineStatusDB
};
