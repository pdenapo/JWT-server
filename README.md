# JSON Web Token Auth Server

This is an express server that allows for user registertion and login via JSON web tokens (JWT). It has ready to use middleware to protect API/application routes. 

This code is meant to be a drop in service for those who want to implement JWT authentication quickly, so they can focus on their front-end development.

## Features
* Password hasing/salting with bcrypt
*  MongoDB database support
*  Server-side data validation
*  User registration/login


## Installation

### Dev:

```
npm install
```

Setup a .env file with the following values:

```
DATABASE (Your mongoDb credentials)
SECRET (A random secret string that's sent with your JSON token, make it long!)
```

Finally....

```
npm run dev
```

## Production

Add your environment variables as above but for your production server (e.g Heroku CLI/Dashboard)

Then run...

```
npm run build
```

finally...

```
npm run dev
```

## Why JWT?

* Personal and sensitive user data is never stored on the client, you simply send the token with each request.

* Speed! You don't have to validate the user by pulling their information from the database on every request.

* JSON web tokens are not limited to the same domain/application like other auth methods.

## Front-end Security considerations

When storing your token on the client (for persistent login), it's important that you research what method you are going to use.

Storing your token in local storage for example is a common method, but you have to consider that local storage is accessible by JavaScript and is therefore vulnerable to [Cross-site Scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks. It's important to make sure all your inputs are sanitised and there are no rogue 3rd party/CDN code running on your site.

Another method is to store the token in a cookie (note the cookie would be used to store your token, and not to authorise a user). Unfortunately, this method has a security flaw too ([CSRF attacks](https://en.wikipedia.org/wiki/Cross-site_request_forgery)). These attacks can be resolved [several ways](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet).

# Updates
I plan to keep this repo update as I get feedback from others. Please report any issues or feature requests.

