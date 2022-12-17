import {renderPictures} from './add-picture.js';
import {renderFileUpload} from './create-post.js';
import {getData} from './api.js';

getData(renderPictures);
renderFileUpload();
