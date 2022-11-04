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
      .required('Campo requerido'),

    service: yup.string()
      .required('Campo requerido'),

    description: yup.string()
      .min(30, 'Escreva um título com mais de 30 caracteres')
      .required('Campo requerido'),

    email: yup.string()
      .email('Digite um e-mail válido')
      .required('Campo requerido'),

    name: yup.string()
      .required('Campo requerido'),

      phone: yup.number()
      .typeError("Digite um número")
      .required('Campo requerido'),

    files: yup.array()
      .min(1, 'Envie pelo menos uma foto')
      .required('Campo requerido'),
})

//Exportando um objeto
export {
    initialValues,
    validationSchema,
}