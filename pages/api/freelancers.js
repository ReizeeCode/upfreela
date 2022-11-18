import nextConnect from 'next-connect'
import { post } from '../../src/controllers/freelancers'

const route = nextConnect()

route.post(post)

export default route