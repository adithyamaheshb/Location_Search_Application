import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../../actions/auth'

const HomePage = ({ isAuthenticated, logout }) => (
            <div className="container">
                <div className="row">
                    <h1>HomePage</h1>
                    {/*{isAuthenticated ?
                    (<button onClick={() => logout()}>Logout</button>) :
                    (<Link to="/login">Login</Link>)}<br />*/}
                    <h1><Link to="/new">About</Link><br /></h1>
                    <h1><Link to="/search">Click here to go to Location Search Application</Link></h1>
                </div>
            </div>
        );

HomePage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token
    };
}

export default connect(mapStateToProps, { logout })(HomePage);
