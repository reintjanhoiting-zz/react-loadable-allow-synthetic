import * as React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import Login from './modules/login/login.async.component';
import Dashboard from './modules/dashboard/dashboard.component';

class App extends React.Component<undefined, undefined>{
    public render() {
        return <Router>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
                <Route exact path="/" component={Dashboard} />
                <Route path="/login" component={Login} />
            </div>
        </Router>
    }
}

export default App;
