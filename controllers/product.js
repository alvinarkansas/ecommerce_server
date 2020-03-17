const { Product } = require('../models')

class ProductController {
    static add(req, res, next) {
        console.log('> > > >', req.body, '< < < <');

        Product.create({
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        })
            .then(newProduct => {
                res.status(201).json(newProduct)
            })
            .catch(err => {
                next(err)
            })
    }

    static findAll(req, res, next) {
        Product.findAll()
            .then(products => {
                res.status(200).json(products)
            })
            .catch(err => {
                next(err)
            })
    }

    static findOne(req, res, next) {
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(product => {
                if (product) {
                    res.status(200).json(product)
                } else {
                    next({
                        status: 404,
                        message: 'Product not found'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req, res, next) {
        Product.update({
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }, {
            where: {
                id: req.params.id
            },
            returning: true
        })
            .then(updatedProduct => {
                console.log('--- Updated Successfully ---', updatedProduct[1][0]);
                res.status(200).json(updatedProduct[1][0])
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ProductController