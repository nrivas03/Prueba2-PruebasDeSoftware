import { model } from 'mongoose';
import memberSchema from './member.schema';

const memberModel = model('Member', memberSchema);

export default memberModel;
