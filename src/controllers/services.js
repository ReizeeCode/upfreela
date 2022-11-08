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
            // gera um numero randomico 
            const random = Math.floor(Math.random() * 99999999) + 1
            
            // retorna a extensao do arquivo (.png ou .jpeg)
            const extension = path.extname(file.name)

            const filename = `${timestamp}_${random}${extension}`

            const oldpath = path.join(__dirname, `../../../${file.path}`)
            const newpath = path.join(__dirname, `../../../${form.uploadDir}/${filename}`)

            // isso vai para o banco de dados
            filesToSave.push({
                name: filename,
                path: newpath,
            })

            // renomeia o arquivo e muda o local
            fs.rename(oldpath, newpath, (error) => {
                if (error){
                    console.log('error: '+ error)
                    return res.status(201).json({ success: true })
                }
            })
        })

        const {
            title,
            service,
            description,
            name,
            email,
            phone,
            userId,
            image
        } = fields

        const db_service = new ServicesModel({
            title,
            service,
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

        const register = await db_service.save()

        if (register) {
            res.status(201).json({ success: true })
        } else {
            res.status(500).json({ success: false })
        }
    })
}

export {
    post,
}