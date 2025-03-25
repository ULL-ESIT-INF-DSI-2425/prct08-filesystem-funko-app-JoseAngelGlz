import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { Funko } from './funko.js';

/**
 * Clase FunkoManager
 */
export class FunkoManager {
  private path: string;
  private user: string;

  /**
   * Constructor de la clase FunkoManager
   * @param user - Nombre del usuario
   */
  constructor(user: string) {
    this.user = user;
    this.path = path.join("funkos", this.user);
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path, { recursive: true });
    }
  }

  /**
   * Añade un funko
   * @param funko - Funko a añadir
   */
  public add(funko: Funko): void | undefined {
    const fileName = path.join(this.path, `${funko.ID}.json`);
    if (!fs.existsSync(fileName)) {
      fs.writeFileSync(fileName, JSON.stringify(funko, null, 2));
      console.log(chalk.green(`Funko ${funko.name} añadido correctamente`));
    } else {
      console.log(chalk.red(`El funko ${funko.name} ya existe para el usuario ${this.user}`));
      return undefined;
    }
  }


  public remove(ID: number): void | undefined {
    const fileName = path.join(this.path, `${ID}.json`);
    if (fs.existsSync(fileName)) {
      fs.unlinkSync(fileName);
      console.log(chalk.green(`Funko con ID ${ID} eliminado correctamente`));
    } else {
      console.log(chalk.red(`El funko con ID ${ID} no existe para el usuario ${this.user}`));
      return undefined;
    }
  }

  /**
   * Actualiza un funko
   * @param funko - Funko a actualizar
   */
  public update(funko: Funko): void | undefined{
    const fileName = path.join(this.path, `${funko.ID}.json`);
    if (fs.existsSync(fileName)) {
      fs.writeFileSync(fileName, JSON.stringify(funko, null, 2));
      console.log(chalk.green(`Funko ${funko.name} actualizado correctamente`));
    } else {
      console.log(chalk.red(`El funko ${funko.name} no existe para el ususario ${this.user}`));
      return undefined;
    }
  }

  /**
   * Obtiene el color del valor de un funko
   * @param value - Valor del funko
   * @returns Color del valor
   */
  public getColour(value: number): typeof chalk {
    if (value < 10) {
      return chalk.red;
    } else if (value < 20) {
      return chalk.yellow;
    } else if (value < 50) {
      return chalk.blue;
    } else {
      return chalk.green;
    }
  }

  /**
   * Imprime los funkos
   */
  public printAll(): void | undefined{
    const files = fs.readdirSync(this.path);
    if (files.length === 0) {
      console.log(chalk.red('No hay funkos para imprimir para el usuario ${this.user}'));
      return undefined;
    } else {
      console.log(`Listado de Funkos para el usuario ${this.user}:`);
      files.forEach((file) => {
        const fileName = path.join(this.path, file);
        const data = fs.readFileSync(fileName, 'utf-8');
        const funko: Funko = JSON.parse(data);
        console.log(chalk.white(` ID: ${funko.ID}`));
        console.log(chalk.white(` - Nombre: ${funko.name}`));
        console.log(chalk.white(` - Descripción: ${funko.description}`));
        console.log(chalk.white(` - Tipo: ${funko.type}`));
        console.log(chalk.white(` - Género: ${funko.gender}`));
        console.log(chalk.white(` - Franquicia: ${funko.franchise}`));
        console.log(chalk.white(` - Número de piezas: ${funko.pieceNumber}`));
        console.log(chalk.white(` - Exclusivo: ${funko.exclusive ? 'Sí' : 'No'}`));
        console.log(chalk.white(` - Características especiales: ${funko.specialFeatures}`));
        console.log(this.getColour(funko.value)(` - Valor: ${funko.value}`));
        console.log(chalk.white('\n'));
      });
    }
  }

  /**
   * Imprime un funko
   * @param ID - Identificador del funko
   */
  public print(ID: number): void | undefined {
    const fileName = path.join(this.path, `${ID}.json`);
    if (fs.existsSync(fileName)) {
      const data = fs.readFileSync(fileName, 'utf-8');
      const funko: Funko = JSON.parse(data);
      console.log(chalk.white(` ID: ${funko.ID}`));
      console.log(chalk.white(` - Nombre: ${funko.name}`));
      console.log(chalk.white(` - Descripción: ${funko.description}`));
      console.log(chalk.white(` - Tipo: ${funko.type}`));
      console.log(chalk.white(` - Género: ${funko.gender}`));
      console.log(chalk.white(` - Franquicia: ${funko.franchise}`));
      console.log(chalk.white(` - Número de piezas: ${funko.pieceNumber}`));
      console.log(chalk.white(` - Exclusivo: ${funko.exclusive ? 'Sí' : 'No'}`));
      console.log(chalk.white(` - Características especiales: ${funko.specialFeatures}`));
      console.log(this.getColour(funko.value)(` - Valor: ${funko.value}`));
    } else {
      console.log(chalk.red(`El funko con ID ${ID} no existe para el usuario ${this.user}`));
      return undefined;
    }
  }
}