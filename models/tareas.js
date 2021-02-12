const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id=''){
    if (this._listado[id]){
      delete this._listado[id];
    }
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);

    this._listado[tarea.id] = tarea;
  }

  crearListadoTareas(tareas = []) {
    // se crea cuando la aplicacion inicia
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  listadoCompleto() {
    this.listadoArr.forEach((tarea, i) => {
        const index = `${i + 1}`.green;
        const { desc, completadoEn } = tarea;
        const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
        console.log(index+" "+desc + " :: " +estado);
      

    });
  }

  listarPendientesCompletadas(completadas=true){
    let tareas = (completadas) 
            ? this.listadoArr.filter(tarea=>tarea.completadoEn != null)
            : this.listadoArr.filter(tarea=>tarea.completadoEn == null)

    tareas.forEach((tarea, i) => {
      const index = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = (completadas) ? completadoEn.green : 'Pendiente'.red;
      console.log(index+" "+desc + " :: " +estado);
    

  });
  }

  toggleCompletadas(ids=[]){
    ids.forEach(id=>{
      const tarea = this._listado[id];
      if (!tarea.completadoEn){
        tarea.completadoEn = new Date().toISOString();
      }
    })

    this.listadoArr.forEach(tarea=>{
      if (!ids.includes(tarea.id)){
        const tareaAux = this._listado[tarea.id];
        tareaAux.completadoEn = null;
      }
    });
  }

}

module.exports = Tareas;
