import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvitationService } from '../../../services/invitation.service';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name = "";
  id = "";
  myid = localStorage.getItem('user_id');
  myfriends = [];
  allmyfriends = [];
  friends = [];
  allfriends = [];
  myprofile = false;
  status = "";
  mobile = false;
  constructor(private sharedService  :SharedService, private route : ActivatedRoute, private invitationService : InvitationService) { }

  ngOnInit(): void {
    console.log(window.innerWidth);
    if ( window.innerWidth > 991) {
      this.mobile = false;
    }else{
      this.mobile = true;
    }
    
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
    });
    if(this.id == null){
      window.location.replace('/in/profile/' + this.myid);
    }    
    if(this.id == localStorage.getItem('user_id')){
      this.myprofile = true;
      this.name = localStorage.getItem('name');
      this.getMyFriends();
      this.getPosts();
    }else{
      this.myprofile = false;
      this.getName();
      this.getStatus();
      this.getFriends();
      this.getPosts();
    }
    
  }

  getStatus(){
    var data = {
      myid : localStorage.getItem('user_id'),
      hisid : this.id
    }

    this.sharedService.getStatus(data).subscribe((data : any) => {
      this.status = data.status;
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  getMyFriends(){
    this.sharedService.getMyFriends(this.id).subscribe((data : any) => {
      this.allmyfriends = data;
      if(data.length >= 4){
        this.myfriends.push(this.allmyfriends[0]);
        this.myfriends.push(this.allmyfriends[1]);
        this.myfriends.push(this.allmyfriends[2]);
        this.myfriends.push(this.allmyfriends[3]);
      }else{
        this.myfriends = data;
      }
      console.log(data);
    },
    (err : HttpErrorResponse) => {
      console.log(err);
    });
  }

  getName(){
    this.sharedService.getName(this.id).subscribe((data : any) => {
      this.name = data.name;
    },
    (err : HttpErrorResponse) => {
      console.log(err);
    })
  }

  getFriends(){
    var data = {
      myid : localStorage.getItem('user_id'),
      hisid : this.id
    }

    this.sharedService.getFriends(data).subscribe((res : any) => {
      this.allfriends = res;
      if(res.length >= 4){
        this.friends.push(this.allfriends[0]);
        this.friends.push(this.allfriends[1]);
        this.friends.push(this.allfriends[2]);
        this.friends.push(this.allfriends[3]);
      }else{
        this.friends = res;
      }
      console.log(res);
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    })
  }


  postcontent = "";
  posts = [];
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
    this.sharedService.getPosts(this.id).subscribe((data : any) => {
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

  likePost(id : string){
    var data = {
      idliker : localStorage.getItem('user_id'),
      idposter : this.id,
      idpost : id,
      myname : localStorage.getItem('name')
    }

    this.sharedService.likePost(data).subscribe((data : any) => {
      this.posts.forEach((post) => {
        if(post._id == id){
          post.likes.push(this.myid);
        }
      });
    },
    (err : HttpErrorResponse) => {
      console.log(err);
    })
  }

  commentPost(id : string){
    var data = {
      idcommenter : localStorage.getItem('user_id'),
      idposter : this.id,
      idpost : id,
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

  lovePost(id : string){
    var data = {
      idlover : localStorage.getItem('user_id'),
      idposter : this.id,
      idpost : id,
      myname : localStorage.getItem('name')
    }

    this.sharedService.lovePost(data).subscribe((data : any) => {
      this.posts.forEach((post) => {
        if(post._id == id){
          post.loves.push(this.myid);
        }
      });
    },
    (err : HttpErrorResponse) => {
      console.log(err);
    })
  }

  unLovePost(id : string){
    var data = {
      idlover : localStorage.getItem('user_id'),
      idposter : this.id,
      idpost : id,
      myname : localStorage.getItem('name')
    }

    this.sharedService.unLovePost(data).subscribe((data : any) => {
      this.posts.forEach((post) => {
        if(post._id == id){
          post.loves.splice(post.loves.indexOf(this.myid), 1);
        }
      });
    },
    (err : HttpErrorResponse) => {
      console.log(err);
    })
  }

  unLikePost(id : string){
    var data = {
      idliker : localStorage.getItem('user_id'),
      idposter : this.id,
      idpost : id,
      myname : localStorage.getItem('name')
    }

    this.sharedService.unLikePost(data).subscribe((data : any) => {
      this.posts.forEach((post) => {
        if(post._id == id){
          post.likes.splice(post.likes.indexOf(this.myid), 1);
        }
      });
    },
    (err : HttpErrorResponse) => {
      console.log(err);
    })
  }

  comment = "";
  comm = [];
  sendInvitation(id : string, hisname : string){
    var data = {
      id : localStorage.getItem('user_id'),
      friendid : id,
      myname : localStorage.getItem('name'),
      hisname : hisname
    };
    this.invitationService.sendInvitation(data).subscribe((data : any) => {
      console.log(data);
      this.allfriends.forEach((user) => {
        if(user.id == id){
          user.status = "pending";
        }
      });
      this.friends.forEach((user) => {
        if(user.id == id){
          user.status = "pending";
        }
      });
    },
    (err : HttpErrorResponse)=>{
    console.log(err);
    });
  }

  cancelInvitation(id : string){
    var data = {
      id : localStorage.getItem('user_id'),
      friendid : id
    };
    this.invitationService.cancelInvitation(data).subscribe((data : any) => {
      console.log(data);
      this.allfriends.forEach((user) => {
        if(user.id == id){
          user.status = "user";
        }
      });
      this.friends.forEach((user) => {
        if(user.id == id){
          user.status = "user";
        }
      });
    },
    (err : HttpErrorResponse)=>{
    console.log(err);
    });
  }

  deleteInvitation(id : string){
    var data = {
      id : localStorage.getItem('user_id'),
      friendid : id
    };
    this.invitationService.deleteInvitation(data).subscribe((data : any) => {
      console.log(data);
      this.allfriends.forEach((user) => {
        if(user.id == id){
          user.status = "user";
        }
      });
      this.friends.forEach((user) => {
        if(user.id == id){
          user.status = "user";
        }
      });
    },
    (err : HttpErrorResponse)=>{
    console.log(err);
    });
  }

  acceptInvitation(id : string, hisname : string){
    var data = {
      id : localStorage.getItem('user_id'),
      myname : localStorage.getItem('name'),
      friendid : id,
      hisname : hisname
    };
    this.invitationService.acceptInvitation(data).subscribe((data : any) => {
      console.log(data);
      this.allfriends.forEach((user) => {
        if(user.id == id){
          user.status = "friend";
        }
      });
      this.friends.forEach((user) => {
        if(user.id == id){
          user.status = "friend";
        }
      });
    },
    (err : HttpErrorResponse)=>{
    console.log(err);
    });
  }

}
