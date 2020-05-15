import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators'

import { Post } from './post.model';
import { PostsService } from './posts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//========================================================================

export class AppComponent implements OnInit, OnDestroy {
  
  loadedPosts: Post[] = [];
  isFetching = false; // This is only used for displaying the loading indicator

  error = null;
  private errorSub: Subscription;

  //==========================================================================//

  constructor(private http: HttpClient, private postsService: PostsService) { }

  ngOnInit() {
    this.onFetchPosts();
    this.errorSub = this.postsService.errorSubject.subscribe( errorMessage => {
      this.error = errorMessage
    })
  }

  ngOnDestroy() { this.errorSub.unsubscribe() }

  //===========================================================================//

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content)
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
        this.isFetching = false;
        this.error = error.message;
        console.log(error)
    })
  }

  onClearPosts() {
    this.postsService.deletePosts().subscribe( () => { // There's no response data to handle, but we still want to do something
      this.loadedPosts = []; // We just reset the array, instead of having to fetch an empty array to refresh the display
    })
  }

  onClearError() {
    this.error = null;

  }


}
