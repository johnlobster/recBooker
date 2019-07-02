# recBooker Sessions

App for making bookings of city recreational facilities, administrating facilities and summarizing bookings for each facility

### Developers

* Michael Sender
* Filmon Habtu
* Rob Ross
* John Webster

### Modules used

* cookie-parser
* cookie-session

### Cookies

Cookies are small (4k bytes) objects, containing name/value pairs that are automatically sent to the (originating) server and returned every time a request is made. They are in the http header and so are encrypted when access is made using https. Heroku uses it's router to send and receive all http requests as https so there is no need for us to use https settings or create our own keys.

The module cookie-parser is express middleware that intercepts the incoming request and parses it, (similar to to a definitions such as `app.use(express.json());` in `server.js`). Server routes can then read or change cookies using `req.cookie.<cookie name>`. `cookie-parser` must be set (`app.use`) before static and application routes (e.g. `app.get`) as express checks middleware in order of definition.

### Session cookies

Session cookies are sent to the browser in the http header, with an `httpOnly` setting that prevents the browser from reading it and storing with other cookie information. This is implemented in all modern browsers.

The session cookie is defined when the user logs in and expires when the user logs out. This means code in the routes to set and delete the session cookie. A cookie can be set with a zero expiry time which tells the browser to delete it when exiting. Browsers have a "continue where left off" function which is usually enabled, so there is no way to guarantee that it will be deleted (i.e. expired) by the browser. The session cookie should therefore have an expiry date.

`cookie-session` is a piece of express middleware that parses and decrypts the session cookie. It enables the server to set up, amongst other things
* cookie name
* cookie expiry date
* httpOnly

The cookie can be accessed as `req.session`. It is possible to set several fields such as userId, userName. However it is not possible to store a lot of information due to the 4K cookie size limit. In this case an id can be set and the session data looked up in a separate database

Usually session cookies expire when the server stops/restarts.

If the client makes a request that requires a session (i.e. logged in user) then the route code must check that a session exists and send a failure to the client if it doesn't, and the client must then take action such as redirecting to login page with an appropriate error message.

### Security

Session cookies could be used by hackers to emulate a user without logging in and access private data. `cookie-session` therefore bundles up the session information and signs it with a "secret" key, which is further encrypted when sent over https. When `cookie-session` reads a cookie sent by the client it is able to decrypt and check that this session cookie originated from that server.
An example of session cookie
```
recBookerSession: 'eyJ1c2VyTmFtZSI6Im1lIiwidXNlcklkIjozfQ==',
  'recBookerSession.sig': '8v5s4q7u-ZGFN3p-TGKoGYEY-i8' }
```

### Client side

With handlebars re-rendering the web page every time the user moves around the website, the browser has to remember its user name to know that the user is logged in and print it in banners etc. The page's javascript will be re-read every time so the information cannot be stored as a javascript variable. This could be done by
* creating a separate cookie that the browser can read and is not encrypted
* sending user name in every `app.render` using session data.
* sessionStorage in the browser

I chose to use sessionStorage
