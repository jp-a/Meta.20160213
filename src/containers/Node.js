import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createHistory, useBasename } from 'history';
import { browserHistory, Router, History, Route, IndexRoute, Link } from 'react-router';

import View from 'react-flexbox';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

import FlatButton from 'material-ui/lib/flat-button';

import ContentEditable from 'react-contenteditable';

import * as NodesActions from '../data/actions/nodes'

import _ from 'lodash';

export default class Node extends Component {
    constructor( props ) {
        super( props );
        this.state = {};
        this.editNode = _.debounce( this.editNode, 500 );
    }

    handleChange( event ) {
        console.log( 'handleChange(', this.state.node._id, ' | ', this.state.text, ')' );
        this.editNode( this.state.node._id, event.target.value );

    }

    editNode( id, text ) {
        this.props.actions.editNode( id, text );
    }

    handleClick() {
        console.log( 'handleClick(', this.state.node._id, ')' );
    }

    handleDelete() {
        console.log( 'handleDelete(', this.state.node._id, ')' );
        this.props.actions.deleteNode( this.state.node._id );
        this.state.node = undefined;
    }

    render() {
        const { id } = this.props.params;
        this.state.id = id;
        const { nodes } = this.props;
        const node = _.where( nodes, { _id: id } )[ 0 ];
        this.state.node = node;
        if( this.state.node ) this.state.text = this.state.node.text;

        console.log( 'render node ', id, node );

        return (
            <div style={ {  padding: '0px 50px 50px' } }>
                { this.state.node &&
                <Card>
                    <CardMedia
                        overlay={<CardTitle title={ node.text } />}
                    >
                        <img src={ node.text }/>
                    </CardMedia>
                    <CardTitle title='' subtitle={ node._rev }/>
                    <CardText>
                        <ContentEditable
                            html={ this.state.text } // innerHTML of the editable div
                            disabled={ false }       // use true to disable edition
                            onChange={ this.handleChange.bind( this ) } // handle innerHTML change
                        />
                    </CardText>
                    <CardActions>
                        <FlatButton onClick={ this.handleDelete.bind( this ) }> delete </FlatButton>
                    </CardActions>
                </Card>
                }
            </div>

        )
    }
}

Node.propTypes = {
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
)( Node )
