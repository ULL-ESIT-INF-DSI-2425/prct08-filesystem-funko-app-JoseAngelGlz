import * as fs from "fs";

/**
 * Valida los argumentos pasados al script.
 * Si los argumentos no son suficientes, muestra un mensaje de uso y termina el proceso.
 *
 * @param args - Los argumentos pasados al script.
 */
function validateArgs(args: string[]): void {
  if (args.length < 4) {
    console.log("Uso: node app.js <ruta-del-log> <palabraClave>");
    process.exit(1);
  }
}

const filePath = process.argv[2];
const keyword = process.argv[3];
validateArgs(process.argv);
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error("Error al leer el archivo:", err);
    process.exit(1);
  }

  const regex = new RegExp(`\\b${keyword}\\b`, "g");

  const matches = data.match(regex);
  const count = matches ? matches.length : 0;
  console.log(`La palabra clave "${keyword}" se encontró ${count} veces en el archivo ${filePath}.`);
});