import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createHistory, useBasename } from 'history';
import { browserHistory, Router, History, Route, IndexRoute, Link } from 'react-router';


import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

import FlatButton from 'material-ui/lib/flat-button';

import ReactQuill from 'react-quill';
import AlloyEditor from 'alloyeditor';

import * as NodesActions from '../data/actions/nodes'

import Meta from './Meta';

const iconButtonElement = (
    <IconButton
        touch={ true }
        tooltipPosition="bottom-left"
    >
        <MoreVertIcon color={ Colors.grey400 }/>
    </IconButton>
);

const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
    </IconMenu>
);

class Item extends Component {
    handleClick() {
        console.log( 'handleClick()' );
        this.props.handleClick( this.props.node );
    }

    handleDelete() {
        console.log( 'handleDelete(', this.props.node._id, ')' );
        this.props.deleteNode( this.props.node._id );
    }

    render() {
        const { node, index } = this.props;

        return (
            <div>
                <ListItem onClick={ this.handleClick.bind( this ) }
                          leftAvatar={ <Avatar src="http://placehold.it/50x50.jpg/000" /> }
                          rightIconButton={
                    <IconMenu iconButtonElement={ iconButtonElement }>
                        <MenuItem onClick={ this.handleDelete.bind( this ) }>Delete</MenuItem>
                    </IconMenu>
                }
                          primaryText={ node.text }
                          secondaryText={
                    <p>
                        <span style={{color: Colors.darkBlack}}>{ ( 1001 + index ).toString().substring( 1 ) } | { node._id } | { node._rev }</span><br/>
                    </p>
                }
                          secondaryTextLines={ 2 }
                />
                <Divider inset={ true }/>
            </div>

        )
    }
}

export default class Nodes extends Component {
    constructor( props ) {
        super( props );
        this.handleClick = this.handleClick.bind( this );
    }

    handleClick( node ) {
        console.log( 'Nodes:handleClick(', node._id, ')' );
        //this.setState( { selection: node } );
        //this.context.router.transitionTo( '/node/' + node._id );
        browserHistory.push( '/node/' + node._id );

    }

    handleDelete( nodeId, event ) {
        event.stopPropagation();
        console.log( 'deleteNode(', nodeId, ')' );
        this.props.actions.deleteNode( nodeId );
    }

    render() {
        const { nodes, actions, syncState } = this.props;

        return (
            <div style={ {  width: '100%' } }>
                <List>
                    { nodes.map( ( node, index ) =>
                        <Item handleClick={ this.handleClick } key={ node._id } index={ index }
                              node={ node } { ...actions }/>
                    ) }
                </List>
            </div>
        );
    }
}

Nodes.propTypes = {
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
)( Nodes )
