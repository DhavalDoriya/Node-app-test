import Controller from './Controller';
import IEData from '../models/IEDataModel';
import IEDataService from '../services/IEDataService';
import Category from '../models/CategoryModel';
import CategoryService from '../services/CategoryService';

const ieDataService = new IEDataService(new IEData().getInstance());

const categoryService = new CategoryService(new Category().getModel());


console.log(categoryService);

class IEDataController extends Controller {
  constructor(service) {
    super(service);
    this.insertIEData = this.insertIEData.bind(this);
    this.updateIEData = this.updateIEData.bind(this);
    this.deleteIEData = this.deleteIEData.bind(this);
    this.getIEData = this.getIEData.bind(this);
    this.getAllIEData = this.getAllIEData.bind(this);
    this.getIEDatabycatid = this.getIEDatabycatid.bind(this);


    this.fliter = this.fliter.bind(this);

  }


  





  async insertIEData(req, res) {
    var data = req.body
    var userid = req.user.userID
    let category = await categoryService.get(req.body.categoryid)
  
    
    const response = await this.service.insertIEData(data, userid, category);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }

  async fliter(req, res) {
    var date = req.params.month
    const response = await this.service.fliter(date);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }















  async updateIEData(req, res) {
    var IEDataid = req.params.id
    var data = req.body
    var userid = req.user.userID
    const response = await this.service.updateIEData(IEDataid, data, userid);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }

  async deleteIEData(req, res) {
    var IEDataid = req.params.id
    var userid = req.user.userID
    const response = await this.service.deleteIEData(IEDataid, userid);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }

  async getIEData(req, res) { 
    var IEDataid = req.params.id
    var userid = req.user.userID
    const response = await this.service.getIEData(IEDataid, userid);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }

  async getAllIEData(req, res) {
    var userid = req.user.userID
    console.log(userid)
    const response = await this.service.getAllIEData( userid);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }

  async getIEDatabycatid(req, res) {
    var user = req.user.userID;
    var category = req.params.id;
    const response = await this.service.getIEDatabycatid(user, category);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(response.statusCode).send(response);
  }
}


export default new IEDataController(ieDataService,categoryService) ;
