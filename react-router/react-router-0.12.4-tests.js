/* @flow */

var React = require('react');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Redirect = Router.Redirect;

var Inbox = React.createClass({
  render() { return <div>Inbox</div>; }
});
var Calendar = React.createClass({
  render() { return <div>Calendar</div>; }
});
var Dashboard = React.createClass({
  render() { return <div>Dashboard</div>; }
});

var App = React.createClass({
  render: function () {
    return (
      <div>
        <header>
          <ul>
            <li><Link to="app" rel="external">Dashboard</Link></li>
            <li><Link to="inbox">Inbox</Link></li>
            <li><Link to="calendar">Calendar</Link></li>
          </ul>
          Logged in as Jane
        </header>

        {/* this is the important part */}
        <RouteHandler/>
      </div>
    );
  }
});

var routes: ReactElement = (
  <Route name="app" path="/" handler={App}>
    <Route name="inbox" handler={Inbox}/>
    <Route name="calendar" handler={Calendar} ignoreScrollBehavior/>
    <DefaultRoute handler={Dashboard}/>
    <Redirect from="profile/me" to="about-user" params={{userId: "1"}} />
  </Route>
);

function callback(Handler, state: ReactRouterRunState) {
  React.render(<Handler/>, document.body);
}

Router.run(routes, callback);

var HistoryLocation: ReactRouterLocation = Router.HistoryLocation;

var router: ReactRouter = Router.create({
  routes: routes,
  location: Router.HistoryLocation
});
router.run(callback);

