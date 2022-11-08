import * as yup from 'yup'

const initialValues = {
    title: '',
    service: '',
    description: '',
    email: '',
    name: '',
    phone: '',
    files: [], // isso é um array de imagens
}

const validationSchema = yup.object().shape({
    title: yup.string()
      .min(6, 'Escreva um título com uma quantidade maior de caracteres')
      .max(100, 'Escreva um título com uma quantidade menor de caracteres')
      .required('Campo obrigatório'),

    service: yup.string()
      .required('Campo obrigatório'),

    description: yup.string()
      .min(30, 'Escreva um título com mais de 30 caracteres')
      .required('Campo obrigatório'),

    email: yup.string()
      .email('Digite um e-mail válido')
      .required('Campo obrigatório'),

    name: yup.string()
      .required('Campo obrigatório'),

    phone: yup.number()
      .typeError("Digite um número")
      .required('Campo obrigatório'),

    files: yup.array()
      .min(1, 'Envie pelo menos uma foto')
      .required('Campo obrigatório'),
})

//Exportando um objeto
export {
    initialValues,
    validationSchema,
}