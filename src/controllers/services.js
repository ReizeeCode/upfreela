import fs from "fs";
import path from "path";
import formidable from "formidable-serverless";
import ServicesModel from "../models/services";
import FrelancersModel from "../models/freelancer";
import nodeMailer from "nodemailer";
import dbConnect from "../utils/dbConnect";

const post = async (req, res) => {
  await dbConnect();

  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: "public/uploads",
    keepExtensions: true,
  });

  const transporter = nodeMailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ce26ba1a1ac918",
      pass: "1c22ae4c0ad24a",
    },
  });

  form.parse(req, async (error, fields, data) => {
    if (error) {
      return res.status(500).json({ success: true });
    }

    // desestruturação
    const { files } = data;

    // verifica se files é um array
    const filesToRename =
      files instanceof Array
        ? files // define files para filesToRename
        : [files]; //se for objeto, coloca dentro de um array
    // isso é uma garantia para que sempre seja um array

    const filesToSave = [];

    filesToRename.forEach((file) => {
      const timestamp = Date.now();
      // gera um número randomico
      const random = Math.floor(Math.random() * 99999999) + 1;
      const extension = path.extname(file.name); //retorna a extensão do arquivo .jpg ou .png

      const filename = `${timestamp}_${random}${extension}`;

      const oldpath = path.join(__dirname, `../../../../../${file.path}`);
      const newpath = path.join(
        __dirname,
        `../../../../../${form.uploadDir}/${filename}`
      );

      // isso vai para o banco de dados
      filesToSave.push({
        name: filename,
        path: newpath,
        size: file.size,
      });

      // renomeia o arquivo e muda o local
      fs.rename(oldpath, newpath, (error) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ success: true });
        }
      });
    });

    const {
      title,
      category,
      qntDias,
      description,
      name,
      email,
      phone,
      logradouro,
      cep,
      regiao,
      userId,
      image,
      datePublish,
    } = fields;

    const service = new ServicesModel({
      title,
      category,
      qntDias,
      description,
      logradouro,
      cep,
      regiao,
      user: {
        id: userId,
        name,
        email,
        phone,
        image,
      },
      files: filesToSave,
      datePublish,
    });

    const register = await service.save();

    //Procura todos os freelancer que estão na região do serviço que acabou de ser registrado
    const freelancers = await FrelancersModel.find({
      categoryFreelancer: category,
      regiaoFreelancer: regiao,
    });

    //Enviando email para todos os freelancers encontrados na query acima
    freelancers.forEach(async (freelancer) => {
      const info = await transporter.sendMail({
        from: email,
        to: freelancer.emailFreelancer,
        subject: service.title,
        text: "Novo Serviço Solicitado",
        html: `<b>Descrição: ${service.description}</b>`,
      });

      console.log(`Mensagem Enviada: ${info.messageId}`);
    });

    if (register) {
      res.status(201).json({ success: true });
    } else {
      res.status(500).json({ success: false });
    }
  });
};

const update = async (req, res) => {
  await dbConnect();

  const { id } = req.query;

  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: "public/uploads",
    keepExtensions: true,
  });

  form.parse(req, async (error, fields, data) => {
    if (error) {
      return res.status(500).json({ success: false });
    }

    const { files } = data;

    const filesToSave = files instanceof Array ? files : [files];

    const {
      title,
      category,
      qntDias,
      description,
      name,
      email,
      phone,
      logradouro,
      cep,
      regiao,
      userId,
      image,
      datePublish,
    } = fields;

    // Criando o objeto com os campos atualizados
    const serviceUpdated = {
      title,
      category,
      qntDias,
      description,
      logradouro,
      cep,
      regiao,
      user: {
        id: userId,
        name,
        email,
        phone,
        image,
      },
      files: filesToSave,
      datePublish,
    };

    try {
      await ServicesModel.updateOne({ _id: id }, serviceUpdated);

      return res.status(201).json({ success: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  });
};

const remove = async (req, res) => {
  await dbConnect();

  const id = req.body.id;

  const deleted = await ServicesModel.findOneAndRemove({ _id: id });

  if (deleted) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(500).json({ success: false });
  }
};

export { post, remove, update };
