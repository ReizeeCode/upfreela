import nextConnect from 'next-connect'
import { remove } from '../../../src/controllers/services'

const route = nextConnect()

route.delete(remove)

export default route

export const config = {
    api: {
      bodyParser: true
    }
  
  }