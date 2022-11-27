import mongoose from "mongoose";

// está separado pois é um array
const filesSchema = new mongoose.Schema({
  name: String,
  path: String,
  size: Number,
});

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'O campo "Título do anúncio" é obrigatório.'],
  },
  category: {
    type: String,
    required: [true, 'O campo "Categoria" é obrigatório.'],
  },
  qntDias: {
    type: String,
    required: [true, 'O campo "Quantidade de dias" é obrigatório.'],
  },
  description: {
    type: String,
    required: [true, 'O campo "Descrição" é obrigatório.'],
  },
  logradouro: {
    type: String,
    required: [true, 'O campo "Logradouro" é obrigatório.'],
  },
  cep: {
    type: String,
    required: [true, 'O campo "CEP" é obrigatório.'],
  },
  regiao: {
    type: String,
    required: [true, 'O campo "Região" é obrigatório.'],
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
  },

  datePublish: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.services || mongoose.model("services", schema);
