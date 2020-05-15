import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Post } from './post.model';

//=====================================================================================

@Injectable({ providedIn: 'root' })
export class PostsService {

    errorSubject = new Subject<string>();

    //===========================================================

    constructor(private http: HttpClient) { }

    //============================================================

    createAndStorePost(title: string, content: string) {
        // Send Http request
        const postData: Post = { title: title, content: content }
        this.http
            .post<{ name: string }>(  // takes two arguments...

                'https://angular-firebase-practic-4e35f.firebaseio.com/posts.json',
                // 1. The url you find for your realtime database + /posts.json. This second part is necessary to send post requests.
                // This data will end up in a folder called 'posts'.

                postData
                // 2. The actual data... ie the request body. 
                // The Angular HTTP client will turn this from a JS object into a JSON object.
            )
            .subscribe(responseData => {
                console.log(responseData)
            }, error => {
                this.errorSubject.next(error.message)
            })
    }

    // Before we pass our response to the component, we transform the response data in a certain way. We want to put all the posts into an array...
    // We pipe/map the data... fur each key (which corresponds to a post). 
    // The spread operator '...' will pull out all key/value pairs of that object (in our case, the title and content KV pairs)
    // We also append an ID field, which holds the unique identifier provided by FireBase. This handy if we want to delete a single post.
    fetchPosts() {
        return this.http
            .get<{ [key: string]: Post }>( // Here, we specify the type of object contained in the response body. A key (that can be INTERPRETTED as a string) with an object that we can use the Post interface with.
                'https://angular-firebase-practic-4e35f.firebaseio.com/posts.json' // only one arg for GET requests
            )
            .pipe(map(responseData => {    // So we expect the data to be a key (that can be interpretted as string)
                const postsArray: Post[] = [];                                    // and the value is an object we can use the 'Post' interfac for
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        postsArray.push({ ...responseData[key], id: key })
                    }
                }
                return postsArray;
            })
    )}

    deletePosts() {
        return this.http
        .delete( 'https://angular-firebase-practic-4e35f.firebaseio.com/posts.json')
    }
}