const crypto = require("crypto");

const helper = {
  async hashPassword(password) {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(8).toString("hex");

      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(salt + ":" + derivedKey.toString("hex"));
      });
    });
  },

  async verifyPasswrod(password, hash) {
    return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(":");
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(key == derivedKey.toString("hex"));
      });
    });
  },

  addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },
};

module.exports = helper;
