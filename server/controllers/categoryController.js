const {Category, SubCategory} = require('../models/models')
const ApiError = require('../error/ApiError')

class CategoryController {
    async create(req, res, next){
        const {category_name} = req.body
        const candidate = await Category.findOne({ where: { category_name } })
        if (candidate) {
            return next(ApiError.badRequest('Категория с таким именем уже существует.'))
        }
        const category = await Category.create({category_name})
        return res.json(category)
    }

    async getAll(req, res){
        const categories = await Category.findAll()
        return res.json(categories)
    }

    async createSubCategory(req, res, next){
        const {sub_category_name, categoryId} = req.body
        const candidate = await SubCategory.findOne({ where: { sub_category_name } })
        if (candidate) {
            return next(ApiError.badRequest('Подкатегория с таким именем уже существует.'))
        }
        const subCategory = await SubCategory.create({sub_category_name, categoryId})
        return res.json(subCategory)
    }

    async getAllSubCategory(req, res){
        const subCategory = await SubCategory.findAll()
        return res.json(subCategory)
    }
}

module.exports = new CategoryController()