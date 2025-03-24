import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { Funko } from './funko.js';

export class FunkoManager {
  private path: string;
  private user: string;

  constructor(user: string) {
    this.user = user;
    this.path = path.join("funkos", this.user);
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path, { recursive: true });
    }
  }

  public addFunko(funko: Funko): void {
    const fileName = path.join(this.path, `${funko.ID}.json`);
    if (!fs.existsSync(fileName)) {
      fs.writeFileSync(fileName, JSON.stringify(funko));
      console.log(chalk.green(`Funko ${funko.name} añadido correctamente`));
    } else {
      console.log(chalk.red(`El funko ${funko.name} ya existe`));
    }
  }

  public removeFunko(ID: number): void {
    const fileName = path.join(this.path, `${ID}.json`);
    if (fs.existsSync(fileName)) {
      fs.unlinkSync(fileName);
      console.log(chalk.green(`Funko con ID ${ID} eliminado correctamente`));
    } else {
      console.log(chalk.red(`El funko con ID ${ID} no existe`));
    }
  }

  public updateFunko(funko: Funko): void {
    const fileName = path.join(this.path, `${funko.ID}.json`);
    if (fs.existsSync(fileName)) {
      fs.writeFileSync(fileName, JSON.stringify(funko)); // fs.writeFileSync(fileName, JSON.stringify(funko, null, 2));
      console.log(chalk.green(`Funko ${funko.name} actualizado correctamente`));
    } else {
      console.log(chalk.red(`El funko ${funko.name} no existe`));
    }
  }

  private getColour(value: number): typeof chalk {
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

  public printFunkos(): void {
    const files = fs.readdirSync(this.path);
    if (files.length === 0) {
      console.log(chalk.red('No hay funkos'));
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

  public printtFunko(ID: number): void {
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
      console.log(chalk.red(`El funko con ID ${ID} no existe`));
    }
  }
}