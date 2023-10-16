import { model } from 'mongoose';
import clubSchema from './club.schema';

const clubModel = model('Club', clubSchema);

export default clubModel;
