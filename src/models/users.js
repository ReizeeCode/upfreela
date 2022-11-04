import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'O campo "nome" é obrigatório']
    },
    email: {
        type: String,
        required: [true, 'O campo "nome" é obrigatório']
    },
    password: {
        type: String,
        required: [true, 'O campo "nome" é obrigatório']
    },
})

export default mongoose.models.users || mongoose.model('users', schema)