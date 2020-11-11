import {Repository, model} from '@appolo/typeorm';
import {define, singleton} from '@appolo/inject';
import {Tag} from '../models/tag';

@define()
@singleton()
export class TagService {

    @model(Tag) private readonly tagRepository: Repository<Tag>

    async findAll(): Promise<Tag[]> {
        return await this.tagRepository.find();
    }

}
