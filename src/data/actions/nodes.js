import * as types from '../constants/ActionTypes'

export function addNode( text ) {
    return { type: types.ADD_NODE, text }
}

export function deleteNode( id ) {
    return { type: types.DELETE_NODE, id }
}

export function editNode( id, text ) {
    return { type: types.EDIT_NODE, id, text }
}

export function completeNode( id ) {
    return { type: types.COMPLETE_NODE, id }
}

export function completeAll() {
    return { type: types.COMPLETE_ALL }
}

export function clearCompleted() {
    return { type: types.CLEAR_COMPLETED }
}
