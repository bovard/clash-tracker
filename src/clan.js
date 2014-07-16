/** @jsx React.DOM */

var Clan = React.createClass({
    render: function() {
        return (
            <div className="clan">
                <h2 className="clanName">
                    {this.props.name}
                </h2>
                <h3 className="clanAdmins">
                    {this.props.admins.join(', ')}
                </h3>
            </div>
            );
    }
});

var ClanList = React.createClass({
    render: function() {
        var clanNodes = this.props.clans.map(function (clan) {
            return (
                <Clan name={clan.name} admins={clan.admins}>
                </Clan>
                );
        });
        return (
            <div className="clanList">
                {clanNodes}
            </div>
        );
    }
});

var ClanForm = React.createClass({
    handleSubmit: function() {
        console.log("DOING THE THING");
        var name = this.refs.name.getDOMNode().value.trim();
        if (!name) {
            return false;
        }
        this.props.onClanSubmit({name: name});
        this.refs.name.getDOMNode().value = '';
        return false;
    },
    render: function() {
        return (
            <form className="clanForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Clan name" ref="name" />
                <input type="submit" value="Post" />
            </form>
            );

    }
});

var Well = ReactBootstrap.Well;


var ClanBox = React.createClass({
    getInitialState: function() {
        return {clans: []};
    },
    loadClansFromServer: function() {
        var url = '/clans/';
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
    componentWillMount: function() {
        this.loadClansFromServer();
        setInterval(this.loadClansFromServer, this.props.pollInterval);
    },
    handleClanSubmit: function(clan) {
        var url = '/clan/' + clan.name;
        console.log("posting to ", url);
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'POST',
            data: clan,
            success: function(data) {
                this.setState({clans: this.state.clans.concat([data])});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <Well>
                <div className="clanBox">
                    <ClanList clans={this.state.clans} />
                    <ClanForm onClanSubmit={this.handleClanSubmit} />
                </div>
            </Well>
        );
    }
});

var clans = [
    {name: 'A clan', admins: ['a@b.com', 'c@d.com']},
    {name: 'B clan', admins: ['e@f.com', 'c@d.com']},
    {name: 'C clan', admins: ['e@f.com']}
];

React.renderComponent(
    <ClanBox pollInterval={2000} />,
    document.getElementById('content')
);


var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var DropdownButton = ReactBootstrap.DropdownButton;
var MenuItem = ReactBootstrap.MenuItem;

var navbarInstance = (
    <Navbar>
      <Nav>
        <NavItem key={1} href="#">Link</NavItem>
        <NavItem key={2} href="#">Link</NavItem>
        <DropdownButton key={3} title="Dropdown">
          <MenuItem key="1">Action</MenuItem>
          <MenuItem key="2">Another action</MenuItem>
          <MenuItem key="3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem key="4">Separated link</MenuItem>
        </DropdownButton>
      </Nav>
    </Navbar>
  );

React.renderComponent(navbarInstance,  document.getElementById('tab'));
