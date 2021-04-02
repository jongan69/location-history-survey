import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import Popup from './Popup.js';
import Foreground from './Foreground.js';


function Options() {
    return (
        <Router>
            <div style={styles.container}>
                <div style={styles.nav_bar}>
                    <h1>Welcome to the Location History Survey</h1>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">About</Link>
                            </li>
                            <li>
                                <Link to="/popup">Survey</Link>
                            </li>
                            <li>
                                <Link to="/foreground">Results</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <Switch>
                    <Route exact path="/popup">
                        <Popup />
                    </Route>
                    <Route exact path="/foreground">
                        <Foreground />
                    </Route>
                    <Route exact path="/"  component={() => { 
                        var link = document.createElement('a');
                        link.href = 'https://github.com/jongan69/location-history-survey';
                        document.body.appendChild(link);
                        link.click();
                        return null;
                        }}>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    nav_bar: {
        width: 'fit-content',
        marginBottom: '50px'
    }
}

export default Options;