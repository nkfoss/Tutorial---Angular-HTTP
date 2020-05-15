import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  loadedPosts: Post[] = [];
  isFetching = false; // This is only used for displaying the loading indicator
  error = null;

  constructor(private http: HttpClient, private postsService: PostsService) { }

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content)
    .subscribe(responseData => { // You must subscribe to the observable that wraps the request, otherwise Angular will never send the request.
      console.log(responseData);
  });
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
        this.error = error.message;
        console.log(error)
    })
  }

  onClearPosts() {
    this.postsService.deletePosts().subscribe( () => { // There's no response data to handle, but we still want to do something
      this.loadedPosts = []; // We just reset the array, instead of having to fetch an empty array to refresh the display
    })
  }


}
