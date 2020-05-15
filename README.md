### Anaotmy of an HTTP request
The URL is the most important part (which is the API endpoint). Using a RESTful API, the verb is also important. The request headers are also important. Some defaultt headers are usually appended for you, but you can also append your own headers.

For some HTTP verbs, you can also add a body (which is the core data of the request). POST/PATCH requests would have this.

### Firebase 
An entire backend solution that gives us a database and REST API. A Google account is required.

### Sending Requests
Notice, requests are only set by NG when you subscribe to the observable that wraps the request.

### Request <Types>
We are not talking about the type as in 'GET' or 'DELETE'... but the type of object we are sending or receiving in the body.
In our example, we use the Post interface to indicate what we are working with in the body of the response. This allows for autocompletion
in writing the code, and its a good practice.


