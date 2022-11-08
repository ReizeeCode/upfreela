import nextConnect from 'next-connect'
import { post } from '../../src/controllers/services'

const route = nextConnect()

route.post(post)

export default route

// desativa o bodyParser para essa rota
export const config = {
    api: {
        bodyParser: false
    }
}