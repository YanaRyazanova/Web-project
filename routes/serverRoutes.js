import {Router} from 'express'
import {getAll} from '../controllers/serverControllers.js'

const router = Router()

router.get('/api/smth', getAll)

export default router