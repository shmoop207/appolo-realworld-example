import {get, controller,IRequest,IResponse} from '@appolo/route';
import {inject} from '@appolo/inject';


@controller()
export class IndexController {


    @get("*")
    async index(req:IRequest,res:IResponse) {

        res.render("./public/index.html")

    }

}
