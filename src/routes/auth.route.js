import { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'

const router = Router()

router.post('/', AuthController.login)

export default router