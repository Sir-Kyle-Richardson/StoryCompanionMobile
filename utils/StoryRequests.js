import { 
    postRequestWithFormData,
} from './HelperFunctions.js';
import Utilities from './Utilities.js';

export default class StoryRequests extends Utilities {
    getStories = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'story/view', {}).then(res => res);
    }

    createStory = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'story/creation', {}).then(res => res);
    }

    editStory = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'story/edit', {}).then(res => res);
    }

    deleteStory = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'story/delete', {}).then(res => res);
    }
}