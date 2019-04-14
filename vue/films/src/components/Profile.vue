<template>
  <div id="profile">

    <h2 class="text-light">Profile: {{friends}}</h2>

    <b-card no-body class="overflow-hidden" bg-variant="dark" text-variant="light">
      <b-row no-gutters>
        <b-col md="2" class="avatarContainer">
          <img :src="user.avatar" class="card-img" alt="Card image">

          <b-button size="sm" v-b-tooltip.hover title="Change avatar" class="changeAvatarButton btn-file">

            <i class="fas fa-pencil-alt"></i>
            <input type="file" id="file" ref="file" @change="changeAvatar">

          </b-button>


        </b-col>
        <b-col md="10">
          <b-card-body>
            <div class="d-flex justify-content-between align-items-center">
              <h4 class="m-0">{{user.name}}</h4>
              <b-button size="sm" v-b-tooltip.hover title="Edit profile"><i class="fas fa-pencil-alt"></i></b-button>
            </div>
            <b-card-text>
              <hr class="mt-2 mb-2">
              Email: {{user.email}}
              <br>
              Unique ID: {{user.id}}
            </b-card-text>

            <b-form-row class="text-white-50">

              <b-col lg="4" cols="12" class="mb-3">
                <b-form-row>
                  <b-col lg="3" cols="3">
                    <i class="fas fa-comment-alt fa-3x"></i>
                  </b-col>
                  <b-col lg="9" cols="9">
                    <div>Comments:</div>
                    <div>137</div>
                  </b-col>
                </b-form-row>
              </b-col>

              <b-col lg="4" cols="12" class="mb-3">
                <b-form-row>
                  <b-col lg="3" cols="3">
                    <i class="fas fa-film fa-3x"></i>
                  </b-col>
                  <b-col lg="9" cols="9">
                    <div>Films:</div>
                    <div>5</div>
                  </b-col>
                </b-form-row>
              </b-col>

              <b-col lg="4" cols="12">
                <b-form-row>
                  <b-col lg="3" cols="3">
                    <i class="fas fa-users fa-3x"></i>
                  </b-col>
                  <b-col lg="9" cols="9">
                    <div>Friends:</div>
                    <div>71</div>
                  </b-col>
                </b-form-row>
              </b-col>

            </b-form-row>

          </b-card-body>
        </b-col>
      </b-row>
    </b-card>

    <b-card class="mt-3" bg-variant="dark" text-variant="light">

      <b-row>
        <b-col lg="3" cols="12" class="mb-4">
          <b-button :pressed.sync="friendTab" @click="selectTab('friend')" block class="text-left">Friends</b-button>
          <b-button :pressed.sync="requestTab" @click="selectTab('request')" block class="d-flex justify-content-between align-items-center">Requests <b-badge variant="light">4</b-badge></b-button>
        </b-col>
        <b-col lg="9" sm="12">

          <div v-if="friendTab">

            <h5>Friends <small class="text-white-50">( 71 )</small></h5>

            <b-row v-for="friend in friends">
              <b-col lg="1" cols="3">
                <img class="rounded" :src="friend.avatar" alt="Card image" style="border-radius: 3px; max-height: 80px;">
              </b-col>
              <b-col lg="11" cols="9">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <div><span class="font-weight-bold">{{friend.name}}</span></div>
                    <div><span class="text-white-50">From: 01.01.2019</span></div>
                    <b-button variant="outline-primary" size="sm" @click="goToUserCollection(friend.id)">Go to the collection</b-button>
                  </div>
                  <a v-b-tooltip.hover title="Remove from friends" href="#"><i class="fas fa-times text-danger"></i></a>
                </div>
              </b-col>
            </b-row>

            <hr>

            <b-row>
              <b-col lg="1" cols="3">
                <img class="rounded" src="../../pictures/pic/2.jpg" alt="Card image" style="border-radius: 3px; max-height: 80px;">
              </b-col>
              <b-col lg="11" cols="9">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <div><span class="font-weight-bold">User Name</span></div>
                    <div><span class="text-white-50">From: 01.01.2019</span></div>
                    <a></a>
                    <b-button variant="outline-primary" size="sm">Go to the collection</b-button>
                  </div>
                  <div>
                    <a v-b-tooltip.hover title="Remove from friends" href="#"><i class="fas fa-times text-danger"></i></a>
                  </div>
                </div>
              </b-col>
            </b-row>

          </div>

          <div v-if="requestTab">

            <h5>Requests</h5>
            <b-form-row>
              <b-col lg="9" cols="8">
                <b-input-group size="sm" prepend="" class="mb-3">
                  <b-form-input placeholder="Send request. Input unique ID here"/>
                  <b-input-group-append>
                    <b-button><i class="fas fa-paper-plane"></i></b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-col>

              <b-col lg="3" cols="4">
                <div class="mb-3 text-right">
                  <b-button-group size="sm">
                    <b-button class="border-dark" v-b-tooltip.hover title="Incoming"><i class="fas fa-sign-in-alt"></i></b-button>
                    <b-button class="border-dark" v-b-tooltip.hover title="Requests"><i class="fas fa-sign-out-alt"></i></b-button>
                  </b-button-group>
                </div>
              </b-col>
            </b-form-row>

            <b-row>
              <b-col lg="1" cols="3">
                <img class="rounded" src="../../pictures/pic/1.jpg" alt="Card image" style="border-radius: 3px; max-height: 80px;">
              </b-col>
              <b-col lg="11" cols="9">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <div><span class="font-weight-bold">User Name</span></div>
                    <div><span class="text-white-50">01.01.2019</span></div>
                    <b-button-group size="sm">
                      <b-button variant="outline-success">Approve</b-button>
                      <b-button variant="outline-danger">Decline</b-button>
                    </b-button-group>
                  </div>
                  <div>
                    <i class="fas fa-sign-in-alt text-white-50"></i>
                  </div>
                </div>
              </b-col>
            </b-row>

            <hr>

            <b-row>
              <b-col lg="1" cols="3">
                <img class="rounded" src="../../pictures/pic/2.jpg" alt="Card image" style="border-radius: 3px; max-height: 80px;">
              </b-col>
              <b-col lg="11" cols="9">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <div><span class="font-weight-bold">User Name</span></div>
                    <div><span class="text-white-50">01.01.2019</span></div>
                    <b-button disabled size="sm" variant="outline-info">You have send friend request. Your request is waiting for approval</b-button>
                  </div>
                  <div>
                    <i class="fas fa-sign-out-alt text-white-50"></i>
                  </div>
                </div>
              </b-col>
            </b-row>
            
          </div>

        </b-col>
      </b-row>

    </b-card>

  </div>
</template>

<script>
    import databaseService from '../lib/databaseService';
export default {
    name: 'profile',
  data() {
      return {
          tabIndex: 0,
          friendTab: true,
          requestTab: false,
//          user: {},
          userName: '',
          userId: '',
//          friends: [],
          friendsCount: 0
      }
  },
  computed: {
      user: (app = this) => {
          let currentUser = app.$store.getters.getUser;

          console.log('USER ID');
          console.log(currentUser.id);

//          if (currentUser.id) {
//              const friends = databaseService.getFriendsForUser(currentUser.id).then((data) => {
//                  console.log("PROFILE friends");
//                  console.log(data);
//
//                  app.friends  = data;
//
//              });
//
//
//          }

//
          return currentUser;
      },
      logged: (app = this) => {
          return app.$store.getters.logged;
      },
      friends() {

          if (this.user.id) {
              let friends = [];
              return databaseService.getFriendsForUser(this.user.id).then(data => {

                  console.log("///////////");
                  console.log(data);
                  console.log("///////////");

                  return data;
              });



          }
          else {
              return [];
          }
      }
  },
  mounted() {



//      console.log("PROFILE");
//      console.log(user);

      this.userName = this.user.displayName;
      this.userId = this.user.uid;
  },
  methods: {
      goToUserCollection(friendId) {
          this.$router.push({name: 'films', params: {id: friendId}});
      },
      selectTab(type) {
        if (type === 'friend') {
            this.friendTab = true;
            this.requestTab = false;
        }
        else {
            this.friendTab = false;
            this.requestTab = true;
        }
      },
      changeAvatar() {
          let file = this.$refs.file.files[0];

          let newImageName = this.generateToken();
          let ext = '';

          if (file.type === 'image/jpeg') {
              ext = '.jpg';
          }
          else {
              ext = '.jpg';
          }
          newImageName = newImageName + ext;

          let app = this;
          const StorageRef = this.$firebase.storage().ref().child('avatars/' + newImageName);
          StorageRef.put(file).then(function(snapshot) {

              app.$firebase.storage().ref().child('avatars/' + newImageName).getDownloadURL().then(function(url) {

                  databaseService.updateUserAvatar(app.user.id, url);
                  console.log(snapshot);
                  console.log('Uploaded a blob or file!');

              });

          });
      },
      generateToken() {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var token = '';
        for(var i = 0; i < 15; i++) {
            token += chars[Math.floor(Math.random() * chars.length)];
        }
        return token;
    }
  }
}
</script>

<style>
  hr {
    background-color: rgba(41, 50, 60, 0.05);
  }
  .avatarContainer {
    position: relative;
  }
  .changeAvatarButton {
    position: absolute;
    bottom: 10px;
    left: 10px;
  }

  .btn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    background: white;
    cursor: inherit;
    display: block;
  }

</style>
