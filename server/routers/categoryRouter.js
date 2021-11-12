const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), categoryController.create)
router.get('/', categoryController.getAll)

router.post('/subcategory', checkRole('ADMIN'), categoryController.createSubCategory)
router.get('/subcategory', categoryController.getAllSubCategory)

module.exports = router