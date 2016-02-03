import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DevTools from './containers/DevTools';

import * as NodesActions from './data/actions/nodes'

class Node extends Component {
    handleClick() {
        console.log( 'deleteNode(', this.props.node._id, ')' );
        this.props.deleteNode( this.props.node._id );
    }

    render() {
        const { node, index } = this.props;

        return (
            <li>
                <button onClick={ this.handleClick.bind( this ) }> x</button>
                &nbsp;
                { ( 1001 + index ).toString().substring( 1 ) } : { node.text } ( { node._id } ) ( { node._rev } )
                &nbsp;

            </li>
        )
    }
}

class App extends Component {
    handleClick() {
        for ( var i = 0; i < 1; i++ ) {
            console.log( 'addNode()' );
            this.props.actions.addNode( 'Node ' + ( this.props.nodes.length + 1 + i ) );
        }
    }

    handlePurge() {
        console.log( 'purgeNodes()' );
        this.props.nodes.map( ( node, index ) => {
            console.log( 'remove', node._id );
            this.props.actions.deleteNode( node._id );
        } )
    }

    render() {
        const { nodes, actions, syncState } = this.props;

        return (
            <div>
                <h1>Hello, world!!!</h1>
                <h2>{ syncState.text }</h2>
                <button onClick={ this.handleClick.bind( this ) }>Add</button>
                &nbsp;
                <button onClick={ this.handlePurge.bind( this ) }>Purge</button>

                <ul>
                    { nodes.map( ( node, index ) =>
                        <Node key={ node._id } index={ index } node={ node } { ...actions }/>
                    ) }
                </ul>

                <DevTools />
            </div>
        );
    }
}

App.propTypes = {
    nodes: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps( state ) {
    return {
        nodes: state.nodes,
        syncState: state.syncState
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        actions: bindActionCreators( NodesActions, dispatch )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( App )
