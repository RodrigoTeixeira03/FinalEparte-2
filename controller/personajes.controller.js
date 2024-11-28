import mongoose from "mongoose";
import Personaje from "../model/personajes.model.js"; 
export const getAllPersonajes = async (req, res) => {
    console.log('Solicitando todos los registros de personajes...');
    try {
        const personajes = await Personaje.find({}, { __v: 0 });
        if (personajes.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron registros de personajes.'
            });
        }
        return res.status(200).json({
            personajes
        });
    } catch (error) {
        console.error('Error al obtener los registros de personajes:', error);
        return res.status(500).json({
            msg: 'Hubo un problema al obtener los registros de personajes. Intente nuevamente más tarde.'
        });
    }
}

export const getIDPersonaje = async (req, res) => {
    console.log('Solicitando personaje por ID:', req.params.id);
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'El ID proporcionado no es válido.'
            });
        }

        const personaje = await Personaje.findById(id);
        if (!personaje) {
            return res.status(404).json({
                msg: 'Registro de personaje no encontrado.'
            });
        }
        return res.status(200).json({
            personaje
        });
    } catch (error) {
        console.error('Error al obtener el personaje por ID:', error);
        return res.status(500).json({
            msg: 'Ocurrió un error al obtener el registro de personaje.'
        });
    }
}

export const postPersonaje = async (req, res) => {
    console.log('Intentando agregar un nuevo registro de personaje...');
    const body = req.body;
    const personaje = new Personaje(body);
    try {
        const validationError = personaje.validateSync();
        if (validationError) {
            const errorMessages = Object.values(validationError.errors).map(error => error.message);
            return res.status(400).json({
                error: errorMessages
            });
        }
        await personaje.save();
        return res.status(201).json({
            personaje
        });
    } catch (error) {
        console.error('Error al guardar el nuevo registro de personaje:', error);
        return res.status(500).json({
            msg: 'Hubo un problema al guardar el registro de personaje. Intente nuevamente más tarde.'
        });
    }
}

export const putPersonaje = async (req, res) => {
    console.log('Intentando actualizar el registro de personaje con ID:', req.params.id);
    const id = req.params.id;
    const body = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'El ID proporcionado no es válido.'
            });
        }
        const personaje = await Personaje.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!personaje) {
            return res.status(404).json({
                msg: 'Registro de personaje no encontrado.'
            });
        }

        return res.status(200).json({
            personaje
        });
    } catch (error) {
        console.error('Error al actualizar el registro de personaje:', error);
        return res.status(500).json({
            msg: 'Hubo un problema al actualizar el registro de personaje. Intente nuevamente más tarde.'
        });
    }
}

export const deletePersonaje = async (req, res) => {
    console.log('Intentando eliminar el registro de personaje con ID:', req.params.id);
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'El ID proporcionado no es válido.'
            });
        }
        const personaje = await Personaje.findByIdAndDelete(id);
        if (!personaje) {
            return res.status(404).json({
                msg: 'Registro de personaje no encontrado.'
            });
        }
        return res.status(200).json({
            msg: 'Registro de personaje eliminado exitosamente.',
        });
    } catch (error) {
        console.error('Error al eliminar el registro de personaje:', error);
        return res.status(500).json({
            msg: 'Hubo un problema al eliminar el registro de personaje. Intente nuevamente más tarde.'
        });
    }
}
