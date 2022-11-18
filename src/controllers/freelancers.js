import FreelancersModel from '../models/freelancer'
import dbConnect from '../utils/dbConnect'

const post = async (req, res) => {
    //Passos: pegar os dados que vem no req, conectar no banco, salvar os dados e responder 'sucesso'
    const   {
        nameFreelancer,
        cpfFreelancer,
        emailFreelancer,
        regiaoFreelancer,
        categoryFreelancer,
    } = req.body

    await dbConnect()

    const user = new FreelancersModel({
        nameFreelancer,
        cpfFreelancer,
        emailFreelancer,
        regiaoFreelancer,
        categoryFreelancer,
    })

    user.save()

    res.status(201).json({ success: true })
}

export {
    post,
}