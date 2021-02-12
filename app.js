require("colors");

const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require("./helpers/inquirer");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const Tareas = require("./models/tareas");

//const { mostrarMenu, pausa } = require('./helpers/mensajes');

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();
  if (tareasDB) {
    tareas.crearListadoTareas(tareasDB);
  }

  do {
    opt = await inquirerMenu(); //imprimir menu
    switch (opt) {
      case "1": //crear tarea
        const desc = await leerInput("Descripcion: ");
        tareas.crearTarea(desc);
        break;
      case "2": //listar tarea
        tareas.listadoCompleto();
        break;
      case "3": //mostrar completados
        tareas.listarPendientesCompletadas(true);
        break;
      case "4": //mostrar pendientes
        tareas.listarPendientesCompletadas(false);
        break;
      case "5": //crear tarea
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        /* if (ids != 0){
            console.log(ids);
        }
 */        break;
      case "6": //borrar
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== '0'){
            const ok = confirmar('Esta seguro?');
            if (ok){
                tareas.borrarTarea(id);
                console.log("Tarea borrada");
            }
        }
        break;

      default:
        break;
    }

    guardarDB(tareas.listadoArr);
    await pausa();
  } while (opt !== "0");
};

main();
