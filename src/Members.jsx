/** @jsx React.DOM */
var React = require('react');

var Input = require('react-bootstrap').Input;
var urls = require('./urls');

var SelectTest = React.createClass({
    getInitialState: function() {
        return {value: 6};
    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },
    componentWillMount: function() {
        this.loadClansFromServer();
    },
    loadClansFromServer: function() {
        var url = urls.myClans;
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
                this.setState({clans: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        var options = [<option value="noClan">You don't have a clan!</option>];
        if (this.state.clans) {
            options = [];
            for (var i = 0; i < this.state.clans.length; i++) {
                var clan = this.state.clans[i];
                options.push(<option value={clan.key}>{clan.name}</option>)
            }
        }

        var value = this.state.value;
        return (
            <div>
                <h3>Add/Remove Members</h3>
                <select value={value} onChange={this.handleChange}>
                    {options}
                </select>
            </div>
        );
    }
})

module.exports = SelectTest;
