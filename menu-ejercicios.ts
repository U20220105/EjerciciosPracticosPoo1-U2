import * as readline from "readline";

class Estudiante {
  constructor(public nota: number) {}

  obtenerEstado(): string {
    if (this.nota >= 9 && this.nota <= 10) {
      return "Excelente";
    } else if (this.nota >= 7 && this.nota < 9) {
      return "Bueno";
    } else if (this.nota >= 6 && this.nota < 7) {
      return "Regular";
    } else {
      return "Reprobado";
    }
  }
}

class Usuario {
  constructor(
    public username: string,
    public password: string,
    public rol: number
  ) {}

  obtenerNombreRol(): string {
    switch (this.rol) {
      case 1:
        return "Administrador";
      case 2:
        return "Cliente";
      case 3:
        return "Invitado";
      default:
        return "Desconocido";
    }
  }
}

class MenuPrincipal {
  private rl: readline.Interface;
  private usuarios: Usuario[];

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    this.usuarios = [
      new Usuario("admin", "admin123", 1),
      new Usuario("cliente1", "cliente123", 2),
      new Usuario("invitado", "invitado123", 3)
    ];
  }

  iniciar(): void {
    this.mostrarMenu();
  }

  private mostrarMenu(): void {
    console.log("\n╔════════════════════════════════════╗");
    console.log("║   SISTEMA DE EJERCICIOS POO       ║");
    console.log("╚════════════════════════════════════╝");
    console.log("1. Sistema de Calificación");
    console.log("2. Sistema de Autenticación");
    console.log("3. Salir\n");

    this.rl.question("Seleccione una opción: ", (opcion: string) => {
      this.procesarOpcion(opcion);
    });
  }

  private procesarOpcion(opcion: string): void {
    switch (opcion) {
      case "1":
        this.ejecutarCalificacion();
        break;
      case "2":
        this.ejecutarAutenticacion();
        break;
      case "3":
        console.log("\n👋 ¡Hasta luego!\n");
        this.cerrar();
        break;
      default:
        console.log("\n❌ Opción inválida\n");
        this.mostrarMenu();
    }
  }

  private ejecutarCalificacion(): void {
    console.log("\n=== SISTEMA DE CALIFICACIÓN ===\n");
    this.rl.question("Ingrese la nota (0-10): ", (respuesta: string) => {
      const nota = Number(respuesta);

      if (isNaN(nota) || nota < 0 || nota > 10) {
        console.log("❌ Nota inválida");
      } else {
        const estudiante = new Estudiante(nota);
        console.log(`\n✅ Nota: ${nota.toFixed(2)}`);
        console.log(`📊 Estado: ${estudiante.obtenerEstado()}\n`);
      }

      this.mostrarMenu();
    });
  }

  private ejecutarAutenticacion(): void {
    console.log("\n=== SISTEMA DE AUTENTICACIÓN ===\n");
    
    this.rl.question("Usuario: ", (username: string) => {
      this.rl.question("Contraseña: ", (password: string) => {
        const usuario = this.usuarios.find(
          u => u.username === username && u.password === password
        );

        if (!usuario) {
          console.log("\n❌ Usuario o contraseña incorrectos\n");
        } else {
          console.log("\n✅ Login exitoso");
          console.log(`👤 Usuario: ${usuario.username}`);
          console.log(`🔑 Rol: ${usuario.obtenerNombreRol()}\n`);
        }

        this.mostrarMenu();
      });
    });
  }

  private cerrar(): void {
    this.rl.close();
  }
}

const menu = new MenuPrincipal();
menu.iniciar();