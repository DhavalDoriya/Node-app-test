import Controller from '../controllers/BlogController';
import auth from '../middleware/auth.middleware'

export default (router) => {
   
    router.post(`/api/blog`, auth,Controller.insertblog);

    router.get(`/api/blog`,auth, Controller.getAllblog);

    router.get(`/api/blog/category/:id`,auth, Controller.getblogbycatid);

    router.get(`/api/blog/:id`,auth, Controller.getblog);
    router.put(`/api/blog/:id`, auth,Controller.updateblog);
    router.delete(`/api/blog/:id`,auth, Controller.deleteblog);
};
