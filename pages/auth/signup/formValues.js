import * as yup from 'yup'

const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConf: '',
}

const validationSchema = yup.object().shape({
    name: yup.string()
        .required('Campo obrigatório'),

    email: yup.string()
        .email('Digite um e-mail válido')
        .required('Campo obrigatório'),
    
    password: yup.string()
        .min(6, 'Mínimo de 6 caracteres')
        .required('Campo obrigatório'),
    
    passwordConf: yup.string()
        .required('Campo obrigatório')
        .oneOf([yup.ref('password'), null], 'As senhas precisam ser iguais') //a propriedade oneOf ajuda a comparar se determinado campo é igual a outro
})

// exportando um objeto
export {
    initialValues,
    validationSchema,
}