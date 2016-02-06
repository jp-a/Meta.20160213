import {
    ADD_NODE,
    INSERT_NODE,
    DELETE_NODE,
    EDIT_NODE,
    UPDATE_NODE,
    COMPLETE_NODE,
    COMPLETE_ALL,
    CLEAR_COMPLETED
} from '../constants/ActionTypes'

const initialState = [];

export default function nodes( state = initialState, action ) {
    switch ( action.type ) {
        case ADD_NODE:
            return [
                {
                    _id: id(),
                    ct: new Date(),
                    completed: false,
                    text: action.text
                },
                ...state
            ];

        case INSERT_NODE:
            if( Array.isArray( action.node ) ) {
                return action.node.concat ( [
                    ...state
                ] );
            } else {
                return [
                    action.node,
                    ...state
                ];
            }

        case DELETE_NODE:
            return state.filter( node =>
                node._id !== action.id
            );

        case EDIT_NODE:
            return state.map( node =>
                node._id === action.id ?
                    Object.assign( {}, node, { text: action.text } ) :
                    node
            );

        case UPDATE_NODE:
            return state.map( node =>
                node._id === action.node._id ?
                    action.node :
                    node
            );

        case COMPLETE_NODE:
            return state.map( node =>
                node._id === action.id ?
                    Object.assign( {}, node, { completed: !node.completed } ) :
                    node
            );

        case COMPLETE_ALL:
            const areAllMarked = state.every( node => node.completed );
            return state.map( node => Object.assign( {}, node, {
                completed: !areAllMarked
            } ) );

        case CLEAR_COMPLETED:
            return state.filter( node => node.completed === false );

        default:
            return state
    }
}

function id() {
    return Math.random().toString( 36 ).substring( 7 );
}