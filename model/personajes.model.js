import mongoose from "mongoose";

const personajeSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: true
    },
    dificultad: {
        type: String,
        required: true
    },
    habilidades: {
        pasiva: { type: String, required: true },
        q: { type: String, required: true },
        w: { type: String, required: true },
        e: { type: String, required: true },
        r: { type: String, required: true }
    }
});

const persoaje = mongoose.model("Personaje", personajeSchema);

export default persoaje