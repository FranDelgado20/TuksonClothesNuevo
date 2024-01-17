import * as yup from 'yup'

export const errorRegister = yup.object().shape({
    fullName: yup.string().required('Este campo es OBLIGATORIO'),
    
    email: yup.string().required('Este campo es OBLIGATORIO').email('Formato incorrecto: debe contener @'),
    pass: yup.string().required('Este campo es OBLIGATORIO'),
    rPass: yup.string().required('Este campo es OBLIGATORIO'),
    numberPhone: yup.string()
    .matches(/^\+54\d{3}\d{7}$/, 'Formato Incorrecto').required('Este campo es OBLIGATORIO'),
})

export const errorLogin = yup.object().shape({
    email: yup.string().required('Este campo es OBLIGATORIO').email('Formato incorrecto: debe contener @'),
    pass: yup.string().required('Este campo es OBLIGATORIO'),

})
export const errorAccountEdit = yup.object().shape({
    numberPhone: yup.string()
    .matches(/^\+54\d{3}\d{7}$/, 'Formato Incorrecto'),
    // domicile: yup.string().required('Este campo es OBLIGATORIO'),
    // zip: yup.string().required('Este campo es OBLIGATORIO'),
    // city: yup.string().required('Este campo es OBLIGATORIO'),
})
export const errorCreateProduct = yup.object().shape({
    name: yup.string().required('Este campo es OBLIGATORIO'),
    price: yup.number().required('Este campo es OBLIGATORIO').positive('El precio debe ser un valor positivo'),
    model: yup.string().required('Este campo es OBLIGATORIO'),
    idProd: yup.string().required('Este campo es OBLIGATORIO'),
    size: yup.string().required('Este campo es OBLIGATORIO'),
    stock: yup.number().required('Este campo es OBLIGATORIO').positive('El stock debe ser un valor positivo'),
})