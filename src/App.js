import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

import DevTools from './containers/DevTools';
import TableView from './containers/TableView';
import ListView from './containers/ListView';
import GridView from './containers/GridView';

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
                <span>{ ( 1001 + index ).toString().substring( 1 ) }</span>
                <span>{ node.text }</span>
                <span>{ node._id }</span>
                <span>{ node._rev }</span>
                <span><button onClick={ this.handleClick.bind( this ) }> x</button></span>
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
                <h1>Meta</h1>
                <h2>{ syncState.text }</h2>
                <RaisedButton primary={ true } onClick={ this.handleClick.bind( this ) } label='Add'/>
                &nbsp;
                <FlatButton onClick={ this.handlePurge.bind( this ) }>Purge</FlatButton>

                { /*< TableView/> */ }

                 { /* <GridView /> */ }

                <ListView />

                { /*
                <ul>
                    { nodes.map( ( node, index ) =>
                        <Node key={ node._id } index={ index } node={ node } { ...actions }/>
                    ) }
                </ul> */ }

                <DevTools/>
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
