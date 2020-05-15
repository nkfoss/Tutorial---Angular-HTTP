import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';


@Injectable({providedIn: 'root'})
export class PostsService {

    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string) {
    // Send Http request
    const postData: Post = {title: title, content: content}
    this.http
    .post<{ name: string }>(  // takes two arguments...

      'https://angular-firebase-practic-4e35f.firebaseio.com/posts.json',
      // 1. The url you find for your realtime database + /posts.json. This second part is necessary to send post requests.
      // This data will end up in a folder called 'posts'.

      postData 
      // 2. The actual data... ie the request body. 
      // The Angular HTTP client will turn this from a JS object into a JSON object.
    )
    .subscribe(responseData => { // You must subscribe to the observable that wraps the request, otherwise Angular will never send the request.
      console.log(responseData);
    });

    } 

    fetchPosts() {

    }
}