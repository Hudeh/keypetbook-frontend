import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ render: Component, isLoading, isAuthenticated, ...rest }) => {
  return (
    <Route
      render={(props) => {
        if (isLoading) {
          return <div>Loading....</div>;
        } else if (!isAuthenticated) {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          );
        } else {
          return <Component {...props} />;
        }
      }}
      {...rest}
    />
  );
};


const mapStateToProps = state =>({
 isLoading: state.auth.isLoading,
 isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);
