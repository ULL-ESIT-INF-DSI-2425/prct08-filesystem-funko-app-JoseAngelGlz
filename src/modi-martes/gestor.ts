import fs from 'fs';
import path from 'path';

/**
 * Función que lista los ficheros de un directorio, con su tamaño y última fecha de modificación
 * @param dirPath - Dirección del directorio
 */
export function list(dirPath: string) {
  fs.readdir(dirPath, (err, files) => {

    // Comprobamos si hay un error
    if (err) {
      console.error(`Error al leer el directorio ${dirPath}: ${err.message}`);
      return;
    }
    const outputFiles: string[] = files;

    // Imprimimos los ficheros dentro del directorio
    outputFiles.forEach(file => {

      // Cogemos la ruta de cada fichero
      const filePath = path.join(dirPath, file);
      
      fs.stat(filePath, (err, fileStats) => {

        // Si hay un error obteniendo la información del fichero
        if (err) {
          console.error(`Error al leer la información del fichero ${filePath}: ${err.message}`)
          return;
        }

        // Imprimimos los datos del mismo
        console.log(`El archivo ${file}, tiene un tamaño de ${fileStats.size} y su fecha de última modificación fue ${fileStats.mtime}`)
      });
    });
  });
}

/**
 * Función que elimina un fichero de forma segura
 * @param file - Ruta del fichero
 * @param recycleBin - Ruta de la papelera de reciclaje
 */
export function remove(file: string, recycleBin: string) {

  // Sacamos el nombre del archivo exclusivamente
  const pathFile = path.basename(file)

  // Verificamos si podemos acceder a el
  fs.access(file, (err) => {
    if(err) {
      console.log(`No se ha podido acceder al fichero ${file}: ${err?.message}`);
      return;
    }
  })

  // Le ponemos su nueva ubicación
  const destinationPath = path.join(recycleBin, pathFile);

  // Le cambiamos el nombre al fichero
  fs.rename(file, destinationPath, (err) => {

    // Si no se puede mover
    if (err) {
      console.error(`Error al mover el archivo ${file} a ${destinationPath}: ${err.message}`);
      return;
    }

    // De lo contrario
    console.log(`Archivo movido exitosamente de ${file} a ${destinationPath}`);
  });
}

/**
 * Función que mueve un fichero o directorio a otro directorio
 * @param pathFile - Ruta del fichero
 * @param pathDirectory - Ruta del directorio
 */
export function move(pathFile: string, pathDirectory: string) {

  // Sacamos el nombre del archivo exclusivamente
  const fileName = path.basename(pathFile)
  const directoryName = path.basename(pathDirectory)

  // Verificamos si podemos acceder al directorio de origen
  fs.access(pathFile, (err) => {
    if (err) {
      console.log(`No se ha podido acceder al fichero/directorio ${fileName}: ${err?.message}`);
      return;
    }
  })

  // Verificamos si podemos acceder al directorio de destino, y si este es un directorio
  fs.access(pathDirectory, (err) => {
    if (err) {
      console.log(`No se ha podido acceder al directorio ${directoryName}: ${err?.message}`);
      return;
    }

  })

  // Le ponemos su nueva ubicación
  const destinationPath = path.join(pathDirectory, fileName);

  // Le cambiamos el nombre al fichero
  fs.rename(pathFile, destinationPath, (err) => {

    // Si no se puede mover
    if (err) {
      console.error(`Error al mover el archivo ${pathFile} a ${destinationPath}: ${err.message}`);
      return;
    }

    // De lo contrario
    console.log(`Archivo movido exitosamente de ${pathFile} a ${destinationPath}`);
  });
}