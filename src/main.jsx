/** @jsx React.DOM */
var React = require('react');

var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Well = require('react-bootstrap').Well;
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;
var PageHeader = require('react-bootstrap').PageHeader;


var ClanBox = require('./ClanBox');


var App = React.createClass({
    componentWillMount : function() {
        this.setState({tab: 1});
    },
    componentWillUnmount : function() {
    },
    handleSelect: function(selectedKey) {
        this.setState({tab: selectedKey});
    },
    render : function() {
        return (
            <div>
                <PageHeader>
                    Clash Tracker <small>For all your clan data needs</small>
                </PageHeader>
                <TabbedArea activeKey={this.state.tab} onSelect={this.handleSelect}>
                    <TabPane key={1} tab="Clan">
                        <Well>
                            <ClanBox />
                        </Well>
                    </TabPane>
                    <TabPane key={2} tab="Tab 2">TabPane 2 content</TabPane>
                </TabbedArea>
            </div>
        );
    }
});


React.renderComponent(<App/>,  document.getElementById('content'));
