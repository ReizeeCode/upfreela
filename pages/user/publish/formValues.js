import * as yup from 'yup'

const initialValues = {
    title: '',
    category: '',
    qntDias: '',
    description: '',
    email: '',
    name: '',
    phone: '',
    logradouro: '',
    cep: '',
    regiao: '',
    files: [], // isso é um array de imagens
    datePublish: new Date(),
}

const validationSchema = yup.object().shape({
    title: yup.string()
      .min(10, 'O campo Título do anúncio deve conter no mínimo 10 caracteres')
      .max(70, 'O campo Título do anúncio deve conter no máximo 70 caracteres')
      .required('Campo obrigatório'),

    category: yup.string()
      .required('Campo obrigatório'),

    qntDias: yup.number()
      .typeError("Digite um número")
      .required('Campo obrigatório'),

    description: yup.string()
      .min(30, 'O campo Descrição  do anúncio deve conter no mínimo 30 caracteres')
      .required('Campo obrigatório'),

    email: yup.string()
      .email('Digite um E-mail válido')
      .required('Campo obrigatório'),

    name: yup.string()
      .min(2, 'O campo Nome deve conter no mínimo 2 caracteres')
      .required('Campo obrigatório'),

    phone: yup.number()
      .typeError("Digite um número")
      .required('Campo obrigatório'),

    logradouro: yup.string()
      .min(5, 'O campo Logradouro deve conter no mínimo 5 caracteres.')
      .required('Campo obrigatório'),

    cep: yup.number()
      .typeError("Digite um número")
      .required('Campo obrigatório'),

    regiao: yup.string()
      .required('Campo obrigatório'),

    files: yup.array()
      .min(1, 'Envie pelo menos uma foto')
      .required('Campo obrigatório'),
      
    datePublish: yup.date(),
})

//Exportando um objeto
export {
    initialValues,
    validationSchema,
}