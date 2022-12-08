import express, {Request, Response, NextFunction} from 'express'
const router = express.Router()

import usersService from '../services/users.services'

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await usersService.getAllUsers())
    } catch(err) {
        console.log("There was an error fetching all the users!")
    }
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    try {
        res.json(await usersService.getUser(+id))
    } catch(err) {
        console.log(`There was an error fetching the user with id: ${id}`)
    }
})

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await usersService.createUser(req.body)
        res.json(result)
    } catch (err) {
        console.log(`there was an error creating a new user! error: ${err}`)
        next(err)
    }
})

module.exports = router