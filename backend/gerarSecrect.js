//gerar um SECRECT para o JWT
const crypto = require("crypto");
const segredo = crypto.randomBytes(64).toString("hex");
console.log(segredo);
