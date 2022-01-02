import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name = localStorage.getItem('name');
  
  myid = localStorage.getItem('user_id');
  mobile = false;
  constructor(private sharedService  :SharedService) { }

  ngOnInit(): void {
    console.log(window.innerWidth);
    if ( window.innerWidth > 991) {
      this.mobile = false;
    }else{
      this.mobile = true;
    }

    this.getPosts();
  }

  postcontent = "";
  posts = [];

  comment = "";
  comm = [];


  createPost(){
    var data = {
      nameposter : localStorage.getItem('name'),
      idposter : localStorage.getItem('user_id'),
      content : this.postcontent
    }

    if(this.postcontent != ""){
      this.sharedService.createPost(data).subscribe((data : any) => {
        this.posts = [];
        this.getPosts();
        this.postcontent = "";
      },
      (err : HttpErrorResponse) => {
        console.log(err);
      })
    }
  }

  getPosts(){
    this.sharedService.getAllPosts(this.myid).subscribe((data : any) => {
      this.posts = data;
      for(let i = 0; i<data.length; i++){
        this.comm.push(false);
      }
      console.log(data);
    },
    (err : HttpErrorResponse) => {
      console.log(err);
    })
  }

  likePost(idpost : string, idposter : string){
    var data = {
      idliker : localStorage.getItem('user_id'),
      idposter : idposter,
      idpost : idpost,
      myname : localStorage.getItem('name')
    }
console.log(data);
    this.sharedService.likePost(data).subscribe((data : any) => {
      this.posts.forEach((post) => {
        if(post.idpost == idpost){
          post.likes.push(this.myid);
        }
      });
    },
    (err : HttpErrorResponse) => {
      console.log(err);
    })
  }

  commentPost(idpost : string, idposter : string){
    var data = {
      idcommenter : localStorage.getItem('user_id'),
      idposter : idposter,
      idpost : idpost,
      myname : localStorage.getItem('name'),
      comment : this.comment
    }

    this.sharedService.commentPost(data).subscribe((data : any) => {
      this.comment = "";
      this.posts = [];
      this.comm = [];
      this.getPosts();
    },
    (err : HttpErrorResponse) => {
      console.log(err);
    })
  }

  lovePost(idpost : string, idposter : string){
    var data = {
      idlover : localStorage.getItem('user_id'),
      idposter : idposter,
      idpost : idpost,
      myname : localStorage.getItem('name')
    }

    this.sharedService.lovePost(data).subscribe((data : any) => {
      this.posts.forEach((post) => {
        if(post.idpost == idpost){
          post.loves.push(this.myid);
        }
      });
    },
    (err : HttpErrorResponse) => {
      console.log(err);
    })
  }

  unLovePost(idpost : string, idposter : string){
    var data = {
      idlover : localStorage.getItem('user_id'),
      idposter : idposter,
      idpost : idpost,
      myname : localStorage.getItem('name')
    }

    this.sharedService.unLovePost(data).subscribe((data : any) => {
      this.posts.forEach((post) => {
        if(post.idpost == idpost){
          post.loves.splice(post.loves.indexOf(this.myid), 1);
        }
      });
    },
    (err : HttpErrorResponse) => {
      console.log(err);
    })
  }

  unLikePost(idpost : string, idposter : string){
    var data = {
      idliker : localStorage.getItem('user_id'),
      idposter : idposter,
      idpost : idpost,
      myname : localStorage.getItem('name')
    }

    this.sharedService.unLikePost(data).subscribe((data : any) => {
      this.posts.forEach((post) => {
        if(post.idpost == idpost){
          post.likes.splice(post.likes.indexOf(this.myid), 1);
        }
      });
    },
    (err : HttpErrorResponse) => {
      console.log(err);
    })
  }

  


}
