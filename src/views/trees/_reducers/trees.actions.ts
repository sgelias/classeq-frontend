import { v4 as uuid } from 'uuid/interfaces';

import { treesServices as ts } from '../components/_trees.services';
import { CreatedTrees } from '../../../_helpers/url-providers';


const updateTreesList = (project_pk: uuid, record: CreatedTrees) => {
    return () => ts.update(project_pk, record);
};


export const treesActions = {
    updateTreesList,
};
