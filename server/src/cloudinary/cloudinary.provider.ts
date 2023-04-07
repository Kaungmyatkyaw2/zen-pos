import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): any => {
    return v2.config({
      cloud_name: 'dmlsbf29a',
      api_key: '617972891445283',
      api_secret: 'xM7rWPgOqFqeBsoKn9J_7Z8uvXM',
    });
  },
};
