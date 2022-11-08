import mongoose from 'mongoose'

// está separado pois é um array
const filesSchema = new mongoose.Schema({
    name: String,
    path: String,
})

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'O campo "título do anúncio" é obrigatório'],
    },
    service: {
        type: String,
        required: [true, 'O campo "serviço" é obrigatório'],
    },
    description: {
        type: String,
        required: [true, 'O campo "descrição" é obrigatório'],
    },
    user: {
        id: String,
        name: String,
        email: String,
        phone: String,
        image: String,
    },
    files: {
        type: [filesSchema],
        default: undefined, //obrigatório pelo mongoose
    }
})

export default mongoose.models.services || mongoose.model('services', schema)