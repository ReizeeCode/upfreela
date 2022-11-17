import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'O campo "Nome" é obrigatório']
    },
    cpf: {
        type: String,
        required: [true, 'O campo "CPF" é obrigatório']
    },
    email: {
        type: String,
        required: [true, 'O campo "E-mail" é obrigatório']
    },
    password: {
        type: String,
        required: [true, 'O campo "Senha" é obrigatório']
    },
    // typeUser: {
    //     type: String,
    //     required: [true, 'O campo "Tipo de usuário" é obrigatório']
    // },
})

export default mongoose.models.users || mongoose.model('users', schema)