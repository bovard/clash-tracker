/** @jsx React.DOM */
var React = require('react');

var Input = require('react-bootstrap').Input;
var Table = require('react-bootstrap').Table;

var MyClanMember = React.createClass({
    propTypes: {
        choices: React.PropTypes.array.isRequired
    },
    render: function() {

    }

});

var EnemyClanMember = React.createClass({

});

var ClanOrder = React.createClass({
    propTypes: {
        clan: React.PropTypes.object,
        number: React.PropTypes.number.isRequired
    },
    getInitialState: function() {
    },
    getRows: function() {
    },
    render: function() {

        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
            <Table>
        )

    }
});

module.exports = ClanOrder;
