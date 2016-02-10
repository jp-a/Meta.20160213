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

import ReactQuill from 'react-quill';
import AlloyEditor from 'alloyeditor';

import * as NodesActions from '../data/actions/nodes'

import _ from 'lodash';

export default class Node extends Component {
    handleClick() {
        console.log( 'handleClick(', this.props.node._id, ')' );
    }

    handleDelete() {
        console.log( 'handleDelete(', this.props.node._id, ')' );
        this.props.deleteNode( this.props.node._id );
    }

    render() {
        const { id } = this.props.params;

        const { nodes } = this.props;
        const node = _.where( nodes, { _id: id } )[ 0 ];
        console.log( 'render node ', id, node );

        return (
            <div style={ {  padding: '0px 50px 50px' } }>
                { node &&
                <Card>
                    <CardMedia
                        overlay={<CardTitle title={ node.text } />}
                    >
                        <img src="http://placehold.it/50x50.jpg/000"/>
                    </CardMedia>
                    <CardTitle title={ node.text } subtitle={ node._rev }/>
                    <CardText>
                        { node.text }
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
