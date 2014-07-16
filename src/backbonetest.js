/**
 * @jsx React.DOM
 */

var Backbone = require('backbone');
var React = require('react');

var RouterMixin = {
    componentWillMount : function() {
        this.callback = (function() {
            this.forceUpdate();
        }).bind(this);

        this.props.router.on("route", this.callback);
    },
    componentWillUnmount : function() {
        this.props.router.off("route", this.callback);
    }
};

var FooComponent = React.createClass({
    mixins : [RouterMixin],
    handle : function() {
        this.props.router.navigate("bar", {
            trigger : true
        });
    },
    render : function() {
        var className = "animate-leave animate-leave-active";

        if (this.props.router.current == "foo") {
            className = "animate-enter animate-enter-active";
        }

        return (
            <div className={className}>
            in foo,
                <a onClick={this.handle}>go to bar</a>
            </div>
            );
    }
});

var BarComponent = React.createClass({
    mixins : [RouterMixin],
    handle : function() {
        this.props.router.navigate("foo", {
            trigger : true
        });
    },
    render : function() {
        var className = "animate-leave animate-leave-active";

        if (this.props.router.current == "bar") {
            className = "animate-enter animate-enter-active";
        }

        return (
            <div className={className}>
            in bar,
                <a onClick={this.handle}>go to foo</a>
            </div>
            );
    }
});

var InterfaceComponent = React.createClass({
    mixins : [RouterMixin],
    render : function() {
        var router = this.props.router;
        return (
            <div>
                <FooComponent router={router} />
                <BarComponent router={router} />
            </div>
            );
    }
});

var Router = Backbone.Router.extend({
    routes : {
        "foo" : "foo",
        "bar" : "bar"
    },
    foo : function() {
        this.current = "foo";
    },
    bar : function() {
        this.current = "bar";
    }
});

var router = new Router();

React.renderComponent(
    <InterfaceComponent router={router} />,
    document.body
);


Backbone.$ = $;
Backbone.history.start();
