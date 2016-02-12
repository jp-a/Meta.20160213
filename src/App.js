import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'

import View from 'react-flexbox';

import Nodes from './containers/Nodes';

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import FlatButton from 'material-ui/lib/flat-button';

import RaisedButton from 'material-ui/lib/raised-button';

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
                <span>{ ( 1001 + index ).toString().substring( 1 ) }</span>
                <span> | { node.text }</span>
                <span> | { node._id }</span>
                <span> | { node._rev }</span>
                <span> <button onClick={ this.handleClick.bind( this ) }> x</button></span>
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

    handleTouchTap() {
        alert( 'onTouchTap triggered on the title component' );
    }

    render() {
        const { nodes, actions, syncState } = this.props;

        return (
            <div>
                <AppBar
                    title='Meta'
                    onTitleTouchTap={ this.handleTouchTap.bind( this ) }
                    iconElementLeft={
                    <div>
                        <RaisedButton primary={ true } onClick={ this.handleClick.bind( this ) } label='Add'/>
                        <FlatButton onClick={ this.handlePurge.bind( this ) }>Purge</FlatButton>
                    </div>
                    }
                />

                <span>{ syncState.text }</span>

                <View auto row>
                    <View column width='30%'>
                        <Nodes />
                    </View>

                    <View column width='60%'>
                        { this.props.children }
                    </View>
                </View>

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
