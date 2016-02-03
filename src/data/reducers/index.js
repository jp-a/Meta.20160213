import { combineReducers } from 'redux'
import nodes from './nodes'
import syncState from './syncState'

export default combineReducers( {
    nodes, syncState
} );
