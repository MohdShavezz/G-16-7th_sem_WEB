import express from 'express'
import { createAction, deleteAction, loginAction, updateAction } from '../controllers/user.js'
import { upload } from '../middlewares/upload.js'
import { authMiddleware } from '../middlewares/auth.js'

const router=express.Router()

router.post('/create',upload.single('image'),createAction)
router.post('/login',loginAction)
router.delete('/delete/:id',authMiddleware,deleteAction)
router.post('/update/:id',authMiddleware,upload.single('image'),updateAction)


export default router;