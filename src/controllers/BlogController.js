import Controller from './Controller';
import Blog from '../models/BlogModel';
import BlogService from '../services/BlogService';
import Category from '../models/CategoryModel';
import CategoryService from '../services/CategoryService';

const blogService = new BlogService(new Blog().getInstance());

const categoryService = new CategoryService(new Category().getModel());

class BlogController extends Controller {
  constructor(service) {
    super(service);
    this.insertblog = this.insertblog.bind(this);
    this.updateblog = this.updateblog.bind(this);
    this.deleteblog = this.deleteblog.bind(this);
    this.getblog = this.getblog.bind(this);
    this.getAllblog = this.getAllblog.bind(this);

    this.getblogbycatid = this.getblogbycatid.bind(this);

  }

  async insertblog(req, res) {
    var data = req.body
    var userid = req.user.userID
    let category = await categoryService.get(req.body.categoryid)
    const response = await this.service.insertblog(data, userid, category);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }

  async updateblog(req, res) {
    var blogid = req.params.id
    var data = req.body
    var userid = req.user.userID
    const response = await this.service.updateblog(blogid, data, userid);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }

  async deleteblog(req, res) {
    var blogid = req.params.id
    var userid = req.user.userID
    const response = await this.service.deleteblog(blogid, userid);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }

  async getblog(req, res) {
    var blogid = req.params.id
    var userid = req.user.userID
    const response = await this.service.getblog(blogid, userid);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }

  async getAllblog(req, res) {
    var userid = req.user.userID
    const response = await this.service.getAllblog( userid);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }

  async getblogbycatid(req, res) {
    var user = req.user.userID;
    var category = req.params.id;
    const response = await this.service.getblogbycatid(user, category);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }
}


export default new BlogController(blogService, categoryService);
