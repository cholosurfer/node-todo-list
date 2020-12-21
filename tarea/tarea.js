const fs = require('fs');

let listadoTareas = [];

const guardarTarea = () => {

    let data = JSON.stringify( listadoTareas );

    fs.writeFile('db/data.json', data, (err) => {

        if (err) 
            throw new Error('La tarea no se pudo guardar', err);

    });

};

const cargarTareas = () => {

    try {

        listadoTareas = require('../db/data.json');

    } catch (error) {

        listadoTareas = [];

    }

};

const getListado = ( completado = null ) => {

    cargarTareas();

    if( listadoTareas.length ) {

        if( completado ) {
            
            let listadoPorEstado = listadoTareas.filter( tarea => tarea.completado === (completado === 'true') ? true : false );
            
            return listadoPorEstado;
            
        } else {

            return listadoTareas;
        
        }

    } else {

        return [];

    }

};

const crear = ( descripcion ) => {

    cargarTareas();

    let tarea = {
        descripcion,
        completado: false
    }; 

    listadoTareas.push( tarea );
    guardarTarea();
    return tarea;

};

const actualizar = ( descripcion, completado = true ) => {

    cargarTareas();

    let index = listadoTareas.findIndex( tarea => tarea.descripcion === descripcion ); // retorna -1 si no lo encuentra

    if( index >= 0 ) {

        listadoTareas[index].completado = (completado === 'true') ? true : false;
        guardarTarea();
        return `Tarea ${listadoTareas[index].descripcion} actualizada.`;

    } else {

        return false;

    }

};

const borrar = ( descripcion ) => {

    cargarTareas();

    let listadoActualizado = listadoTareas.filter( tarea => tarea.descripcion !== descripcion );

    if( listadoTareas.length !== listadoActualizado.length ) {

        listadoTareas = listadoActualizado;
        guardarTarea();
        return true;

    } else {

        return false;

    }

};

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
};