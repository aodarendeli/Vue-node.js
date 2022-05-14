import express from 'express'
import mongoose from 'mongoose'
import Model from '../db/posts.js'

const router = express.Router()

router.get('/', async (req,res) => {
    // res.json({message: 'bu bir get isteği'})
    try{
        const allPosts = await Model.find()
        res.json(allPosts)
    } catch(error) {
        console.log(error)
    }
    
})

router.get('/:id', async (req,res) => {
    // res.json({message: 'bu bir get isteği id ye göre'})
    try {
        const { id } = req.params 
        const post = await Model.findById(id)
        if (!post) return
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
    }
})

//gonderı olusturma
router.post('/', async (req,res) => {
    // res.json({message: 'bu bir post isteği'})
    try{
        const post = req.body
        const createdPost = await Model.create(post)
        res.status(201).json(createdPost)
    } catch(error) {
        console.log(error)
    }
})

router.put('/:id', async (req,res) => {
    // res.json({message: 'bu bir put isteği'})
    try {
        const { id } = req.params
        const { title, content, creator} = req.body
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send('post bulunamadı')

        const updatePost = {title, content, creator, _id: id}

        await Model.findByIdAndUpdate(id, updatePost, {new: true})
        
        res.json(updatePost)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:id', async (req,res) => {
    // res.json({message: 'bu bir delete isteği'})
    try {
        const { id } = req.params
        await Model.findByIdAndRemove(id)
        res.json({ message: 'Post silindi '})
    } catch (error) {
        console.log(error)
    }
})

export default router
