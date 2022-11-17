import UsersModel from '../models/users'
import dbConnect from '../utils/dbConnect'
import { crypto } from '../utils/password'

const get = async (req, res) => {
    await dbConnect()
    const users = await UsersModel.find() 
    res.status(200).json({ success: true, users })
}

const post = async (req, res) => {
    //Passos: pegar os dados que vem no req, conectar no banco, criptografar a senha, salvar os dados e responder 'sucesso'
    const{
        name,
        cpf,
        email,
        password,
        // typeUser,
    } = req.body

    await dbConnect()

    const passwordCrypto = await crypto(password)

    const user = new UsersModel({
        name,
        cpf,
        email,
        password: passwordCrypto,
        // typeUser,
    })

    user.save()

    res.status(201).json({ success: true })
}

export {
    get,
    post,
}