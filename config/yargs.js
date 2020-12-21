const descripcion = {
    demand: true,
    desc: 'Descripción de la tarea por hacer',
    alias: 'd'
};

const completado = {
    desc: 'Marca como completada/pendiente la tarea',
    alias: 'c'
};

const argv = require('yargs')
    .command('crear','Crear tarea por hacer', { descripcion } )
    .command('actualizar','Actualizar una tarea', { descripcion, completado } )
    .command('listar','Listar tareas', { completado } )
    .command('borrar','Borrar una tarea', { descripcion } )
    .help()
    .argv;

module.exports = {
    argv
};