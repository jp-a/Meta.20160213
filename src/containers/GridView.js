import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as NodesActions from '../data/actions/nodes'

import AbsoluteGrid from 'react-absolute-grid';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

class Item extends Component {
    static propTypes = {
        item: PropTypes.object,
        index: PropTypes.number,
        itemsLength: PropTypes.number
    };

    handleDelete( event ) {
        event.stopPropagation();
        console.log( 'deleteNode(', this.props.item._id ,')' );
        this.props.deleteNode( this.props.item._id );
    }

    render() {
        const { item, index, itemsLength, zoom } = this.props;
        return (
            <Card>
                {/*<CardHeader
                        title={ item._id }
                        subtitle={ item._rev }
                        avatar="http://lorempixel.com/100/100/nature/"

                    />*/}
                <CardMedia
                    overlay={<CardTitle title={ item._id } />}
                >
                    <img src="http://lorempixel.com/600/337/nature/"/>
                </CardMedia>
                { ( zoom > 2.4 ) && <CardTitle title={ item._id } subtitle={ item._rev }/> }
                <CardText>
                    { item.text }
                </CardText>
                { ( zoom > 1 ) && <CardActions>
                    <FlatButton onClick={ this.handleDelete.bind( this ) }> delete </FlatButton>
                </CardActions> }
            </Card>
        );
    }
}

class GridView extends Component {
    constructor() {
        super();
        // Debouncing!
        //this.onZoom = _.debounce( this.onZoom, 150 );
        //this.onFilter = _.debounce( this.onFilter, 150 );
        this.state = {
            zoom: 3,
            search: ''
        };
    }

    onZoom = ( event ) => {
        const zoom = parseFloat( event.target.value );
        this.setState( { zoom: zoom } );
    };

    onFilter = ( event ) => {
        const search = event.target.value;
        this.setState( { search: search } );
    };

    handleDelete( nodeId, event ) {
        event.stopPropagation();
        console.log( 'deleteNode(', nodeId, ')' );
        this.props.actions.deleteNode( nodeId );
    }

    render() {
        const { nodes, actions, syncState } = this.props;

        return (
            <div style={ {  width: '50%' } }>
                <input placeholder="Filter eg: node" onChange={ this.onFilter }
                       value={ this.state.search } type="text"/>
                <input onChange={ this.onZoom } type="range" min="0.5" max="9" step="0.1"
                       defaultValue={ this.state.zoom }/>
                <span>{ this.state.zoom }</span>


                { /* <AbsoluteGrid
                    items={ nodes }
                    displayObject={ ( <Item zoom={ this.state.zoom } { ...actions }/> ) }
                    keyProp="_id"
                    zoom={ this.state.zoom }
                    dragEnabled={ true }
                    responsive={ true }
                    verticalMargin={ 200 }
                /> */ }

                { nodes.map( ( node, index ) =>
                    <Item key={ node._id } item={ node } zoom={ this.state.zoom } { ...actions }/>
                ) }


            </div>
        );
    }
}

GridView.propTypes = {
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
)( GridView )
