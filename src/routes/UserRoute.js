import Controller from '../controllers/UserController';
import auth from '../middleware/auth.middleware'

export default (router) => {
    // router.post(`/api/user/login`,auth, Controller.getAll);
    router.post(`/api/user/signup`, Controller.signup);
    router.post(`/api/user/login`, Controller.login);

    router.put(`/api/user/:id`, auth ,Controller.update);
    
    // router.delete(`/api/user/:id`,auth, Controller.delete);


    // router.get(`/api/user`, auth ,Controller.getAll);
    // router.post(`/api/user`, Controller.insert);
    // router.get(`/api/user/:id`, auth ,Controller.get);
 
};
