const uuid = require('uuid')
const path = require('path')
const { Product, ProductInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class ProductController {
    async create(req, res, next) {
        try {
            const { name, description, price, categoryId, subCategoryId, info } = req.body
            const { img } = req.files

            const candidate = await Product.findOne({ where: { name } })
            if (candidate) {
                return next(ApiError.badRequest('Продукт с таким именем уже существует.'))
            }

            let filename = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', filename))


            const product = await Product.create({ name, description, price, categoryId, subCategoryId, img: filename })

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                });
            }

            return res.json(product)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async getAll(req, res) {
        let { categoryId, subCategoryId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products;
        if (!categoryId && !subCategoryId) {
            products = await Product.findAndCountAll({ limit, offset })
        }
        if (categoryId && !subCategoryId) {
            products = await Product.findAndCountAll({ where: { categoryId, limit, offset } })
        }
        if (!categoryId && subCategoryId) {
            products = await Product.findAndCountAll({ where: { subCategoryId, limit, offset } })
        }
        if (categoryId && subCategoryId) {
            products = await Product.findAndCountAll({ where: { categoryId, subCategoryId, limit, offset } })
        }

        return res.json(products)

    }

    async getById(req, res) {
        const { id } = req.params
        const product = await Product.findOne(
            {
                where: { id },
                include: [{ model: ProductInfo, as: 'info' }]
            },
        )

        return res.json(product)
    }
}

module.exports = new ProductController()