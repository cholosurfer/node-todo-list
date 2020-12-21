const { argv } = require('./config/yargs');
const tarea =  require('./tarea/tarea');
const colors = require('colors');

let comando = argv._[0];

switch( comando ) {

    case 'crear':
        let nuevaTarea = tarea.crear( argv.descripcion );
        console.log(colors.blue(`Se añadió la tarea: ${ colors.white(nuevaTarea.descripcion) }`));
    break;

    case 'listar':
        let listado = tarea.getListado( argv.completado );

        if( listado.length ) {

            console.log('======================='.green);
            console.log('== Tareas pendientes =='.green);
            console.log('======================='.green);

            for( let tarea of listado ) {
                console.log(tarea.descripcion);
                console.log('Estado: ', tarea.completado);
                console.log('======================='.green);

            }
        
        } else {

            console.log('No hay tareas pendientes.'.red);

        }

    break;

    case 'actualizar':
        let actualizarTarea = tarea.actualizar( argv.descripcion, argv.completado );
        console.log(actualizarTarea);
    break;

    case 'borrar':
        let borrarTarea = tarea.borrar( argv.descripcion );
        console.log(borrarTarea);
    break;

    default:
        console.log('Comando no es reconocido');

}