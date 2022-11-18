import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    nameFreelancer: {
        type: String,
        required: [true, 'O campo "Nome" é obrigatório']
    },
    cpfFreelancer: {
        type: String,
        required: [true, 'O campo "CPF" é obrigatório']
    },
    emailFreelancer: {
        type: String,
        required: [true, 'O campo "E-mail" é obrigatório']
    },
    regiaoFreelancer: {
        type: String,
        required: [true, 'O campo "Região" é obrigatório']
    },
    categoryFreelancer: {
        type: String,
        required: [true, 'O campo "Região" é obrigatório']
    },

})

export default mongoose.models.freelancer || mongoose.model('freelancer', schema)