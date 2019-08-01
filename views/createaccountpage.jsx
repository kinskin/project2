var React = require("react");

class CreateAccount extends React.Component {
  render() {
    let urlLogin = '/findfood';
    let urlSignUp = '/findfood/signup';
    return (
      <html>
        <head />
        <body>
            <h1>Sign Up</h1>
            <form method="POST" action={urlSignUp}>
                <h2>Enter username</h2>
                <input type="text" name="username"/>
                <h2>Enter profile name</h2>
                <input type="text" name="profile_name"/>
                <h2>Enter password</h2>
                <input type="password" name="password"/>
                <br />
                <input type="submit"/>
            </form>
            <a href={urlLogin}>Login</a>
        </body>
      </html>
    );
  }
}

module.exports = CreateAccount;