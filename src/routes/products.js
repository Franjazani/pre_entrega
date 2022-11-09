import { checkAdmin } from '../middlewares/auth';
import express from "express";
import ProductsController from "../controllers/product.js";

const router = express.Router();

router.get('/', checkAdmin, async (req, res)=>{
   res.render('form')
});

router.get('/:id', checkAdmin, async (req, res, next)=>{
    try{
        const {id} = req.params 

        const prodPorId = await ProductsController.getById(id)
        res.json({
            msg: prodPorId
        })
    }catch(err){
        next(err);
    }    
 });

router.post('/', checkAdmin, async (req, res, next)=>{
    try{
        const dataCargada = req.body
        const producto = ProductsController.save(dataCargada)
        console.log('se agrego '+producto.precio+' '+ producto.nombre)
        res.redirect('/')
    }catch(err){
        next(err);
    } 
});

router.put('/:id', checkAdmin, async (req, res, next) =>{
    const {id} = req.params
    const body = req.body
    try {
        let data = await ProductsController.updateById(id, body)

        res.json(data);

    } catch (err) {
        next(err);
    }
});

router.delete('/:id', checkAdmin, async (req, res, next) =>{
    try {
        const {id} = req.params
        await ProductsController.deleteById(id)

        res.json({ message: 'Producto eliminado' })

    } catch (err) {
        next(err)
    }
})

module.exports = router;