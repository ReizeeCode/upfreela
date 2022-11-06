import bcrypt from 'bcrypt'

/* A função abaixo faz a seguinte operação de criptografia da seguinte forma: 
   Recebe uma senha (pwd)
   Gera o hash
   Retorna o hash gerado
   Após isso salvamos no banco de dados */

const crypto = async pwd => {
    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash(pwd, salt)

    return password
}

const compare = (pwd, hash) => {
    const result = bcrypt.compare(pwd, hash)

    return result //true or false
}

export {
    crypto,
    compare,
}