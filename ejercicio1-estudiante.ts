import * as readline from "readline";

class SistemaCalificacion {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  iniciar(): void {
    console.log("=== SISTEMA DE CALIFICACIÓN ACADÉMICA ===\n");
    this.pedirNota();
  }

  private pedirNota(): void {
    this.rl.question("Ingrese la nota del estudiante (0-10): ", (respuesta: string) => {
      const nota: number = Number(respuesta);
      
      if (this.validarNota(nota)) {
        this.mostrarEstado(nota);
      } else {
        console.log("❌ Error: La nota debe ser un número entre 0 y 10");
      }
      
      this.cerrar();
    });
  }

  private validarNota(nota: number): boolean {
    return !isNaN(nota) && nota >= 0 && nota <= 10;
  }

  private mostrarEstado(nota: number): void {
    let estado: string;

    if (nota >= 9 && nota <= 10) {
      estado = "Excelente";
    } else if (nota >= 7 && nota < 9) {
      estado = "Bueno";
    } else if (nota >= 6 && nota < 7) {
      estado = "Regular";
    } else {
      estado = "Reprobado";
    }

    console.log("\n┌─────────────────────────────┐");
    console.log(`│  Nota: ${nota.toFixed(2)}               │`);
    console.log(`│  Estado: ${estado.padEnd(18)}│`);
    console.log("└─────────────────────────────┘\n");
  }

  private cerrar(): void {
    this.rl.close();
  }
}

const app = new SistemaCalificacion();
app.iniciar();