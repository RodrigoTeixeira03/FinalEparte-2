import mongoose from "mongoose";
import Ejemplo from "../model/ejemplo.model.js";

export const getAllEjemplo = async (req, res) => {
    console.log('Solicitando todos los registros de ejemplo...');
    try {
        const ejemplos = await Ejemplo.find({}, { __v: 0 });
        if (ejemplos.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron registros de ejemplo.'
            });
        }
        return res.status(200).json({
            ejemplos
        });
    } catch (error) {
        console.error('Error al obtener los registros de ejemplo:', error);
        return res.status(500).json({
            msg: 'Hubo un problema al obtener los registros de ejemplo. Intente nuevamente más tarde.'
        });
    }
}

export const getIDEjemplo = async (req, res) => {
    console.log('Solicitando ejemplo por ID:', req.params.id);
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'El ID proporcionado no es válido.'
            });
        }

        const ejemplo = await Ejemplo.findById(id);
        if (!ejemplo) {
            return res.status(404).json({
                msg: 'Registro de ejemplo no encontrado.'
            });
        }
        return res.status(200).json({
            ejemplo
        });
    } catch (error) {
        console.error('Error al obtener el ejemplo por ID:', error);
        return res.status(500).json({
            msg: 'Ocurrió un error al obtener el registro de ejemplo.'
        });
    }
}

export const postEjemplo = async (req, res) => {
    console.log('Intentando agregar un nuevo registro de ejemplo...');
    const body = req.body;
    const ejemplo = new Ejemplo(body);
    try {
        const validationError = ejemplo.validateSync();
        if (validationError) {
            const errorMessages = Object.values(validationError.errors).map(error => error.message);
            return res.status(400).json({
                error: errorMessages
            });
        }
        await ejemplo.save();
        return res.status(201).json({
            ejemplo
        });
    } catch (error) {
        console.error('Error al guardar el nuevo registro de ejemplo:', error);
        return res.status(500).json({
            msg: 'Hubo un problema al guardar el registro de ejemplo. Intente nuevamente más tarde.'
        });
    }
}

export const putEjemplo = async (req, res) => {
    console.log('Intentando actualizar el registro de ejemplo con ID:', req.params.id);
    const id = req.params.id;
    const body = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'El ID proporcionado no es válido.'
            });
        }
        const ejemplo = await Ejemplo.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!ejemplo) {
            return res.status(404).json({
                msg: 'Registro de ejemplo no encontrado.'
            });
        }

        return res.status(200).json({
            ejemplo
        });
    } catch (error) {
        console.error('Error al actualizar el registro de ejemplo:', error);
        return res.status(500).json({
            msg: 'Hubo un problema al actualizar el registro de ejemplo. Intente nuevamente más tarde.'
        });
    }
}

export const deleteEjemplo = async (req, res) => {
    console.log('Intentando eliminar el registro de ejemplo con ID:', req.params.id);
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'El ID proporcionado no es válido.'
            });
        }
        const ejemplo = await Ejemplo.findByIdAndDelete(id);
        if (!ejemplo) {
            return res.status(404).json({
                msg: 'Registro de ejemplo no encontrado.'
            });
        }
        return res.status(200).json({
            msg: 'Registro de ejemplo eliminado exitosamente.',
        });
    } catch (error) {
        console.error('Error al eliminar el registro de ejemplo:', error);
        return res.status(500).json({
            msg: 'Hubo un problema al eliminar el registro de ejemplo. Intente nuevamente más tarde.'
        });
    }
}
