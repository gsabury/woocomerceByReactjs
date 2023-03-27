import CATEGORIES_ACTION_TYPES from './categories.types';

import { createAction } from '../../routes/utils/reducer/reducer.utils';

export const setCategories = (categories) => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);