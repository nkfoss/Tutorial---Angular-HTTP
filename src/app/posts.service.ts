import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Post } from './post.model';

//=====================================================================================

@Injectable({ providedIn: 'root' })
export class PostsService {

    errorSubject = new Subject<string>();

    //========================================================

    constructor(private http: HttpClient) { }

    //========================================================

    createAndStorePost(title: string, content: string) {
        // Send Http request
        const postData: Post = { title: title, content: content }
        this.http
            .post<{ name: string }>(  // POST can take three arguments

                'https://angular-firebase-practic-4e35f.firebaseio.com/posts.json',
                // 1. The url you find for your realtime database + /posts.json. This second part is necessary to send post requests.
                // This data will end up in a folder called 'posts'.

                postData,
                // 2. The actual data... ie the request body. 
                // The Angular HTTP client will turn this from a JS object into a JSON object.

                {
                    observe: 'response' // This returns the response as a JS object, instead of just returning the response data/body.
                }
                // 3. A JS object to modifiy headers, observes, params, etc.
            )
            .subscribe(response => {
                console.log(response)
                // console.log(response.body)   // alternatively, we can log the response body (which is what we normally get)
            }, error => {
                this.errorSubject.next(error.message)
            })
    }

    // Before we pass our response to the component, we transform the response data in a certain way. We want to put all the posts into an array...
    // We pipe/map the data... fur each key (which corresponds to a post). 
    // The spread operator '...' will pull out all key/value pairs of that object (in our case, the title and content KV pairs)
    // We also append an ID field, which holds the unique identifier provided by FireBase. This handy if we want to delete a single post.
    fetchPosts() {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty') // since HttpParams objects are immutable, we append/reassign.
        searchParams = searchParams.append('bandit', 'maa') // since we have multiple KV pairs, we repeat this step again.
        // Alternatively, we can define our params when we make the GET request

        return this.http
            .get<{ [key: string]: Post }>( // Here, we specify the type of object contained in the response body. A key (that can be INTERPRETTED as a string) with an object that we can use the Post interface with.
                'https://angular-firebase-practic-4e35f.firebaseio.com/posts.json',
                {
                    headers: new HttpHeaders({ "CustomHeader": "blah blah blah" }), // We can add headers like this
                    params: searchParams
                    // params: new HttpParams().set('print', 'pretty')    // we can either define params now, or earlier.

                    // responseType: 'JSON'   // this can't be used here, since we already declared what ype we were expecting for the body.
                    // Though it is acceptable to get rid of the type declaration, and just use 'json'. It will do the same thing.
                }
            )
            .pipe(map(responseData => {    // So we expect the data to be a key (that can be interpretted as string)
                const postsArray: Post[] = [];                                    // and the value is an object we can use the 'Post' interfac for
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        postsArray.push({ ...responseData[key], id: key })
                    }
                }
                return postsArray;
            }),
                catchError(errorRes => {
                    /// some code...blah blah
                    // This doesn't actually do anything useful here, but it is an idea of what we COULD do.
                    // We use the rxjs operator catchError, and then we do some stuff with it.
                    // Afterwards, we re-wrap the error in an Observable using throwError.
                    return throwError(errorRes)
                })
            )
    }

    deletePosts() {
        return this.http
            .delete(
                'https://angular-firebase-practic-4e35f.firebaseio.com/posts.json',
                {
                    observe: 'events',
                    responseType: 'text' // This tells Angular how to handle the body of the repsonse. In this case, we're telling Angular to treat it like text.
                    // Though, we could also handle like JSON, which might be more useful sometimes.
                })
            .pipe(
                tap(event => {   // tap allows us to execut some code on the response without altering it or disturbing our subscribe function

                    console.log(event);
                    // You'll notice two outputs in the console with this. The first is an object with type:0. 
                    // The second looks more familiar and also has a type:4. 

                    if (event.type === HttpEventType.Response) {  // in our case, type 4
                        console.log(event.body)
                    }

                    if (event.type === HttpEventType.Sent) {  // type: 0
                        // Do something other than log the body (because the sent event won't have a body.)
                    }
                })
            )
    }
}