import Controller from './Controller';
import Category from '../models/CategoryModel';
import CategoryService from '../services/CategoryService';

const categoryService = new CategoryService(new Category().getInstance());

class CategoryController extends Controller {
    constructor(service) {
        super(service);
        this.insertcategory = this.insertcategory.bind(this);
        this.getcategory = this.getcategory.bind(this);
        this.updatecategory = this.updatecategory.bind(this);
        this.deletecategory = this.deletecategory.bind(this);
    }
    //curd
    async insertcategory(req, res) {
           var Categoryname = req.body.Categoryname
           var userid = req.user.userID
        const response = await this.service.insertcategory(Categoryname , userid);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(response.statusCode).send(response);
    }
    async getcategory(req, res) {
        var userid =req.user.userID
        const response = await this.service.getcategory(userid);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(response.statusCode).send(response);
    }
    async updatecategory(req, res) {
        let categoryname = req.body.Categoryname
        let catid = req.params.id
        let userid = req.user.userID
        const response = await this.service.updatecategory(categoryname, catid, userid);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(response.statusCode).send(response);
    }
    async deletecategory(req, res) {
           var id = req.params.id
           var userid = req.user.userID
        const response = await this.service.deletecategory( id ,userid);
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(response.statusCode).send(response);
    }
}



export default new CategoryController(categoryService);
