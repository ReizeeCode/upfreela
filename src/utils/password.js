import bcrypt from 'bcrypt'

/* A função abaixo faz a seguite operação de criptografia da seguinte forma: 
   Recebe uma senha (pwd)
   Gera o hash
   Retorna o hash gerado
   Após isso salvamos no banco de dados */

const crypto = async pwd => {
    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash(pwd, salt)

    return password
}

export {
    crypto,
}