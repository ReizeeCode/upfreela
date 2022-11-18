import * as yup from 'yup'

const initialValues = {
    nameFreelancer: '',
    cpfFreelancer: '',
    emailFreelancer: '',
    regiaoFreelancer: '',
    categoryFreelancer: '',
}

const validationSchema = yup.object().shape({
    nameFreelancer: yup.string()
        .required('Campo obrigatório'),

    emailFreelancer: yup.string()
        .email('Digite um e-mail válido')
        .required('Campo obrigatório'),
    
    cpfFreelancer: yup.string()
        .min(11, 'Mínimo de 11 caracteres')
        .max(14, 'Máximo de 14 caracteres')
        .required('Campo obrigatório'),
    
    regiaoFreelancer: yup.string()
        .required('Campo obrigatório'),
    
    categoryFreelancer: yup.string()
        .required('Campo obrigatório'),
    
    })

// exportando um objeto
export {
    initialValues,
    validationSchema,
}