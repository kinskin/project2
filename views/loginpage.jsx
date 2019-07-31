var React = require("react");

class Login extends React.Component {
  render() {
    let urlLogin = '/findfood/login';
    let urlSignUp = '/findfood/signup';
    return (
      <html>
        <head />
        <body>
            <h1>Login Page</h1>
            <form method="POST" action={urlLogin}>
                <h2>Enter username</h2>
                <input type="text" name="username"/>
                <h2>Enter password</h2>
                <input type="password" name="password"/>
                <br />
                <input type="submit"/>
            </form>
            <a href={urlSignUp}>Sign-up</a>
        </body>
      </html>
    );
  }
}

module.exports = Login;