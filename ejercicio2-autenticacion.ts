import * as readline from "readline";

class SistemaAutenticacion {
  private rl: readline.Interface;
  private usuarios: Map<string, { password: string; rol: number }>;
  private usuarioIngresado: string = "";

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    this.usuarios = new Map([
      ["admin", { password: "admin123", rol: 1 }],
      ["cliente1", { password: "cliente123", rol: 2 }],
      ["invitado", { password: "invitado123", rol: 3 }],
      ["juan", { password: "1234", rol: 2 }],
      ["maria", { password: "5678", rol: 1 }]
    ]);
  }

  iniciar(): void {
    console.log("=== SISTEMA DE AUTENTICACIÓN ===\n");
    this.pedirUsuario();
  }

  private pedirUsuario(): void {
    this.rl.question("Ingrese usuario: ", (usuario: string) => {
      this.usuarioIngresado = usuario;
      this.pedirPassword();
    });
  }

  private pedirPassword(): void {
    this.rl.question("Ingrese contraseña: ", (password: string) => {
      this.validarCredenciales(this.usuarioIngresado, password);
      this.cerrar();
    });
  }

  private validarCredenciales(usuario: string, password: string): void {
    const datosUsuario = this.usuarios.get(usuario);

    if (!datosUsuario) {
      console.log("\n❌ Usuario incorrecto\n");
      return;
    }

    if (datosUsuario.password !== password) {
      console.log("\n❌ Contraseña incorrecta\n");
      return;
    }

    this.mostrarRol(usuario, datosUsuario.rol);
  }

  private mostrarRol(usuario: string, rol: number): void {
    let nombreRol: string;

    switch (rol) {
      case 1:
        nombreRol = "Administrador";
        break;
      case 2:
        nombreRol = "Cliente";
        break;
      case 3:
        nombreRol = "Invitado";
        break;
      default:
        nombreRol = "Desconocido";
    }

    console.log("\n✅ Login exitoso");
    console.log("┌────────────────────────────────┐");
    console.log(`│  Usuario: ${usuario.padEnd(20)}│`);
    console.log(`│  Rol: ${nombreRol.padEnd(24)}│`);
    console.log("└────────────────────────────────┘\n");
  }

  private cerrar(): void {
    this.rl.close();
  }
}

const app = new SistemaAutenticacion();
app.iniciar();