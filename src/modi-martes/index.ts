import { list, remove, move } from './gestor.js'
import path from 'path';

// List
const dirPath1 = path.join('./src/ejercicio-funkos/');
list(dirPath1)

// Remove
const filePath1 = path.join('./pruebaArchivos/prueba.txt');
const binDir= path.join('./recycleBin/');
remove(filePath1, binDir);

// Move
const filePath2 = path.join('./pruebaArchivos/prueba2.txt');
const dirPath2 = path.join('./pruebaMover/');
move(filePath2, dirPath2);
