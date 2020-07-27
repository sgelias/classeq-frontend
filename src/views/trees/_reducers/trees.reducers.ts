import { treesConstants } from './trees.constants';
import { treesServices as ts } from '../components/_trees.services';
import { CreatedTrees } from '../../../_helpers/url-providers';


const initialState: CreatedTrees = {
    /*  */
}


const trees = (state = initialState, action: any) => {
    switch(action.type) {

        case treesConstants.UPDATE_LIST:
            return {

            }

    }
}

//https://www.youtube.com/watch?v=fZojNH1OplI
