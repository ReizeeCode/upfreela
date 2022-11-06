import UsersModel from '../../models/users'
import dbConnect from '../../utils/dbConnect'
import { compare } from '../../utils/password'

const post = async (req, res) => {
    // pegar os dados que o usuário digitou
    const {
        email,
        password,
    } = req.body

    // conectar com banco de dados
    await dbConnect()

    // buscar o usuário pelo email (senha é um hash)
    const user = await UsersModel.findOne({ email })
    
    if (!user) { // se nao achar o usuario
        return res.status(401).json({ 
            success: false,
            message: 'invalid' 
        })
    }

    // senha está correta? 
    // primeiro param: senha que o user digitou, segunda param: senha que esta no banco de dados
    const passIsCorrect = compare(password, user.password) 

    if (passIsCorrect) {
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    }

    // se o user nao acertar a senha
    return res.status(401).json({ 
        success: false, 
        message: 'invalid'
    })

}

export {
    post,
}