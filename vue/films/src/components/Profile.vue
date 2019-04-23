<template>
  <div id="profile">

	<h2 class="text-light">Profile</h2>

	<b-card no-body class="overflow-hidden" bg-variant="dark" text-variant="light">
	  <b-row no-gutters>
		<b-col md="2" class="avatarContainer">
            <img :src="userAvatar" class="card-img" alt="Card image">
            <b-progress v-if="imageUploading" :value="counterProgress" :max="maxProgress" height="5px" animated class="imageUploadProgress w-100"></b-progress>

            <div class="changeAvatarButton">
                <b-button size="sm" v-if="editMode" v-b-tooltip.hover title="Change avatar" @click="$refs.file.click()">
                    <i class="fas fa-pencil-alt"></i>
                </b-button>
                <b-button size="sm" v-if="editMode" v-b-tooltip.hover title="Apply" class="ml-1" @click="changeAvatar">
                    <i class="fas fa-check"></i>
                </b-button>
            </div>
            <input type="file" class="fileInput" ref="file" @change="refreshAvatarOnPage">

		</b-col>
		<b-col md="10">
		  <b-card-body>
			<div class="d-flex justify-content-between align-items-center">
                <h4 v-if="!editMode" class="m-0">{{this.user.name}}</h4>
                <b-form-input v-else size="sm" v-model="userName" class="w-50" placeholder="Enter your name"></b-form-input>

                <b-button size="sm" v-b-tooltip.hover title="Edit profile" @click="toggleEditMode"><i class="fas fa-pencil-alt"></i></b-button>
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
		  <b-button :pressed.sync="friendTab" @click="selectTab('friend')" block class="d-flex justify-content-between align-items-center">Friends <b-badge variant="light">{{friendsCount}}</b-badge></b-button>
		  <b-button :pressed.sync="requestTab" @click="selectTab('request')" block class="d-flex justify-content-between align-items-center">Requests <b-badge variant="light">{{requestCount}}</b-badge></b-button>
		</b-col>
		<b-col lg="9" sm="12">

		  <div v-if="friendTab">

			<h5>Friends</h5>

			<b-form-row>

				<b-col lg="6"  v-for="friend in friends">
				  <b-card no-body bg-variant="dark" text-variant="light" class="mt-2 shadow-sm">
					<b-form-row>
					  <b-col lg="3" cols="3">
						<img class="rounded" :src="friend.user.avatar" alt="Card image" style="border-radius: 3px; max-height: 100%; max-width: 100%">
					  </b-col>
					  <b-col lg="9" cols="9" class="p-2">
						<div class="d-flex justify-content-between align-items-center">
						  <div>
							<span class="font-weight-bold">{{friend.user.name}}</span>
						  </div>
						  <div>
							<b-button v-b-tooltip.hover title="Remove from friends" variant="outline-danger" size="sm" class="border-dark" @click="deleteFriend(friend.user.id)"><i class="fas fa-times"></i></b-button>
						  </div>
						</div>

						<div><span class="text-white-50">From: {{friend.since}}</span></div>
						<b-button variant="outline-primary" size="sm" @click="goToUserCollection(friend.user.id)">Go to the collection</b-button>

					  </b-col>
					</b-form-row>
				  </b-card>
				</b-col>

			</b-form-row>


		  </div>

		  <div v-if="requestTab">

			<h5>Requests</h5>
			<b-form-row>
                <b-col lg="9" cols="8">
                    <b-input-group size="sm" prepend="" class="mb-3">
                        <b-form-input v-model="requestUserId" placeholder="Send request. Input unique ID here"/>
                        <b-input-group-append>
                            <b-button @click="sendRequest"><i class="fas fa-paper-plane"></i></b-button>
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

            <b-form-row>
                <b-col lg="6" v-for="request in requests">

                    <b-card no-body bg-variant="dark" text-variant="light" class="mt-2 shadow-sm" v-if="request.type === 'in'">
                        <b-form-row>
                            <b-col lg="3" cols="3">
                                <img class="rounded" :src="request.user.avatar" alt="Card image" style="max-height: 120px; max-width: 100%">
                            </b-col>
                            <b-col lg="9" cols="9" class="p-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <span class="font-weight-bold">{{request.user.name}}</span>
                                    </div>
                                    <div>
                                        <i class="fas fa-sign-in-alt text-white-50 mr-2"></i>
                                    </div>
                                </div>

                                <div><span class="text-white-50">{{request.date}}</span></div>
                                <b-button-group size="sm">
                                    <b-button variant="outline-success" @click="acceptFriend(request.user.id)">Approve</b-button>
                                    <b-button variant="outline-danger" @click="declineFriend(request.user.id)">Decline</b-button>
                                </b-button-group>
                            </b-col>
                        </b-form-row>
                    </b-card>

                    <b-card no-body bg-variant="dark" text-variant="light" class="mt-2 shadow-sm" v-if="request.type === 'out'">
                        <b-form-row>
                            <b-col lg="3" cols="3">
                                <img class="rounded" :src="request.user.avatar" alt="Card image" style="max-height: 120px; max-width: 100%">
                            </b-col>
                            <b-col lg="9" cols="9" class="p-2">
                                <div class="d-flex justify-content-between align-items-center mr-2">
                                    <div>
                                        <span class="font-weight-bold">{{request.user.name}}</span>
                                    </div>
                                    <div>
                                        <i class="fas fa-sign-out-alt text-white-50"></i>
                                    </div>
                                </div>

                                <div><span class="text-white-50">{{request.date}}</span></div>
                                <b-button disabled size="sm" variant="outline-info">You have send friend request. Your request is waiting for approval</b-button>

                            </b-col>
                        </b-form-row>
                    </b-card>

                </b-col>
            </b-form-row>

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
			user: {},
			friends: [],
			requests: [],
            editMode: false,
            requestUserId: '',
            userName: '',
            userAvatar: '',
            avatarFile: '',
            maxProgress: 100,
            counterProgress: 0,
            imageUploading: false
		}
	},
	computed: {
		friendsCount() {
			return this.friends.length;
		},
		requestCount() {
			return this.requests.length;
		}
	},
	created() {

		this.user = this.$store.getters.getUser;
        this.userName = this.user.name;
        this.userAvatar = this.user.avatar;

		databaseService.getFriendsForUser(this.user.id, this.getFriends);
		databaseService.getRequests(this.user.id, this.getRequests);

	},
	methods: {
        toggleEditMode() {
            this.editMode = !this.editMode;
        },
        declineFriend(friendId) {
            databaseService.deleteFriendRequest(this.user.id, friendId);
        },
	    deleteFriend(friendId) {
            databaseService.deleteFromFriends(this.user.id, friendId);
        },
	    acceptFriend(friendId) {
            databaseService.acceptFriend(this.user.id, friendId);
        },
	    sendRequest() {
            databaseService.sendRequest(this.user.id, this.requestUserId);
        },
		getRequests(requests) {
			this.requests = requests;
		},
		getFriends(friends) {
			this.friends = friends;
		},
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
		refreshAvatarOnPage(event) {
            var files = event.target.files || event.dataTransfer.files;
            if (!files.length)
                return;

            this.avatarFile = files[0];
            var reader = new FileReader();

            let app = this;
            reader.onload = (e) => {
                app.userAvatar = e.target.result;
            };
            reader.readAsDataURL(files[0]);
        },
		changeAvatar(event) {
            this.imageUploading = true;
			let file = this.avatarFile;

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
			const StorageRef = this.$firebase.storage().ref().child('avatars/' + newImageName).put(file);
            StorageRef.on('state_changed', function(snapshot){
                app.counterProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }, function(error) {
            }, function() {
                app.$firebase.storage().ref().child('avatars/' + newImageName).getDownloadURL().then(function(downloadURL) {
                    databaseService.updateUserAvatar(app.user.id, downloadURL);
                    setTimeout(function () {
                        app.imageUploading = false;
                    }, 1000);
                });
            });
//			StorageRef.put(file).then(function(snapshot) {
//
//				app.$firebase.storage().ref().child('avatars/' + newImageName).getDownloadURL().then(function(url) {
//
//					databaseService.updateUserAvatar(app.user.id, url);
//					console.log(snapshot);
//					console.log('Uploaded a blob or file!');
//
//				});
//
//			});
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
    .fileInput {
        display: none;
    }
    .imageUploadProgress {
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
