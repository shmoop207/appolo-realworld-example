import {get, controller} from '@appolo/route';
import {inject} from '@appolo/inject';

import {Tag} from '../models/tag';
import {TagService} from '../service/tagService';

@controller('tags')
export class TagController {

    @inject() private tagService: TagService;

    @get("/")
    async findAll() {
        let tags =  await this.tagService.findAll();

        return {tags}
    }

}
