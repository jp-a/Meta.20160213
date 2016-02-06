import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

import FlatButton from 'material-ui/lib/flat-button';

import * as NodesActions from '../data/actions/nodes'

class TableView extends Component {
    handleDelete( nodeId, event ) {
        event.stopPropagation();
        console.log( 'deleteNode(', nodeId ,')' );
        this.props.actions.deleteNode( nodeId );
    }

    render() {
        const { nodes, actions, syncState } = this.props;

        return (
            <div style={ {  width: '50%' } }>
                <Table selectable={ true }
                       multiSelectable={ true }>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Index</TableHeaderColumn>
                            <TableHeaderColumn>Text</TableHeaderColumn>
                            <TableHeaderColumn>_id</TableHeaderColumn>
                            <TableHeaderColumn>_rev</TableHeaderColumn>
                            <TableHeaderColumn>delete</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody showRowHover={ true }>
                        { nodes.map( ( node, index ) =>
                            <TableRow key={ node._id }>
                                { /*<Node key={ node._id } index={ index } node={ node } { ...actions }/>*/ }
                                <TableRowColumn>{ ( 1001 + index ).toString().substring( 1 ) }</TableRowColumn>
                                <TableRowColumn>{ node.text }</TableRowColumn>
                                <TableRowColumn>{ node._id }</TableRowColumn>
                                <TableRowColumn>{ node._rev }</TableRowColumn>
                                <TableRowColumn><FlatButton onClick={ this.handleDelete.bind( this, node._id ) }> delete </FlatButton></TableRowColumn>
                            </TableRow>
                        ) }
                    </TableBody>
                </Table>
            </div>
        );
    }
}

TableView.propTypes = {
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
)( TableView )
