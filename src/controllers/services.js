import fs from 'fs'
import path from 'path'
import formidable from 'formidable-serverless'
import ServicesModel from '../models/services'
import dbConnect from '../utils/dbConnect'

const post = async (req, res) => {
    await dbConnect()

    const form = new formidable.IncomingForm({
        multiples: true,
        uploadDir: 'public/uploads',
        keepExtensions: true,
    })

    form.parse(req, async (error, fields, data) => {
        if (error) {
            return res.status(500).json({ success: true })
        }

        // desestruturação
        const { files } = data

       // verifica se files é um array
       const filesToRename = files instanceof Array
       ? files // define files para filesToRename
       : [files] //se for objeto, coloca dentro de um array 
       // isso é uma garantia para que sempre seja um array

        const filesToSave = []

        filesToRename.forEach(file => {
            const timestamp = Date.now()
            // gera um número randomico
            const random = Math.floor(Math.random() * 99999999) + 1
            const extension = path.extname(file.name) //retorna a extensão do arquivo .jpg ou .png

            const filename = `${timestamp}_${random}${extension}`
            
            const oldpath = path.join(__dirname, `../../../../${file.path}`)
            const newpath = path.join(__dirname, `../../../../${form.uploadDir}/${filename}`)

            // isso vai para o banco de dados
            filesToSave.push({
                name: filename,
                path: newpath,
            })

            // renomeia o arquivo e muda o local
            fs.rename(oldpath, newpath, (error) => {
                if (error) {
                    console.log(error)
                    return res.status(500).json({ success: true })
                }
            })
        })

        const {
            title,
            category,
            description,
            name,
            email,
            phone,
            userId,
            image,
        } = fields

        const service = new ServicesModel({
            title,
            category,
            description,
            user: {
                id: userId,
                name,
                email,
                phone,
                image,
            },
            files: filesToSave,
        })

        const register = await service.save()

        if (register) {
            res.status(201).json({ success: true })
        } else {
            res.status(500).json({ success: false })
        }
    })
}

export {
    post
}