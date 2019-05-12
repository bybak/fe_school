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
            </div>
            <input type="file" class="fileInput" ref="file" @change="refreshAvatarOnPage">

		</b-col>
		<b-col md="10">
		  <b-card-body>
			<div class="d-flex justify-content-between align-items-center">
                <h4 v-if="!editMode" class="m-0">{{this.user.name}}</h4>
                <b-form-input v-else size="sm" v-model="userName" class="w-50" placeholder="Enter your name"></b-form-input>

                <b-button v-if="!editMode" size="sm" variant="primary" v-b-tooltip.hover title="Edit profile" @click="toggleEditMode"><i class="fas fa-pencil-alt"></i></b-button>
                <b-button v-else size="sm" variant="primary" v-b-tooltip.hover title="Edit profile" @click="toggleEditMode">Save</b-button>
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
				  <b-col lg="9" cols="9" class="pl-3">
					<div>Comments:</div>
					<div>{{commentsCount}}</div>
				  </b-col>
				</b-form-row>
			  </b-col>

			  <b-col lg="4" cols="12" class="mb-3">
				<b-form-row>
				  <b-col lg="3" cols="3">
					<i class="fas fa-film fa-3x"></i>
				  </b-col>
				  <b-col lg="9" cols="9" class="pl-3">
					<div>Films:</div>
					<div>{{filmsCount}}</div>
				  </b-col>
				</b-form-row>
			  </b-col>

			  <b-col lg="4" cols="12">
				<b-form-row>
				  <b-col lg="3" cols="3">
					<i class="fas fa-users fa-3x"></i>
				  </b-col>
				  <b-col lg="9" cols="9" class="pl-3">
					<div>Friends:</div>
					<div>{{friendsCount}}</div>
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
						<img v-if="friend.user.avatar" class="rounded" :src="friend.user.avatar" alt="Card image" style="border-radius: 3px; height: 112px; max-width: 100%">
                          <div v-else class="rounded d-flex justify-content-center align-items-center emptyAvatar">
                              <b-spinner variant="light"></b-spinner>
                          </div>
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
			<b-form-row id="requestsHeader">
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
                            <b-button :pressed.sync="filterRequest.all" v-b-tooltip.hover title="All" @click="setRequestFilter('all')">All</b-button>
                            <b-button :pressed.sync="filterRequest.in" v-b-tooltip.hover title="Incoming" @click="setRequestFilter('in')"><i class="fas fa-sign-in-alt"></i></b-button>
                            <b-button :pressed.sync="filterRequest.out" v-b-tooltip.hover title="Outgoing" @click="setRequestFilter('out')"><i class="fas fa-sign-out-alt"></i></b-button>
                        </b-button-group>
                    </div>
                </b-col>
			</b-form-row>

            <b-form-row>
                <b-col lg="12" v-for="request in requests">

                    <b-card no-body bg-variant="dark" text-variant="light" class="mt-2 shadow-sm" v-if="request.type === 'in' && (filterRequest.all || filterRequest.in)">
                        <b-form-row>
                            <b-col lg="2" cols="3">
                                <img v-if="request.user.avatar" class="rounded" :src="request.user.avatar" alt="Card image" style="max-height: 120px; width: 81px">
                                <div v-else class="rounded d-flex justify-content-center align-items-center emptyAvatar">
                                    <b-spinner variant="light"></b-spinner>
                                </div>
                            </b-col>
                            <b-col lg="10" cols="9" class="p-2">
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

                    <b-card no-body bg-variant="dark" text-variant="light" class="mt-2 shadow-sm" v-if="request.type === 'out' && (filterRequest.all || filterRequest.out)">
                        <b-form-row>
                            <b-col lg="2" cols="3">
                                <img v-if="request.user.avatar" class="rounded" :src="request.user.avatar" alt="Card image" style="max-height: 120px; width: 81px">
                                <div v-else class="rounded d-flex justify-content-center align-items-center emptyAvatar">
                                    <b-spinner variant="light"></b-spinner>
                                </div>
                            </b-col>
                            <b-col lg="10" cols="9" class="p-2">
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
            imageUploading: false,
            filmsCount: '',
            commentsCount: '',
            filterRequest: {
                all: true,
                in: false,
                out: false
            }
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
		databaseService.getUserFilmsCount(this.user.id, this.setUserFilmsCount);
		databaseService.getUserCommentsCount(this.user.id, this.setUserCommentsCount);

	},
	methods: {
        setRequestFilter(type) {
            this.filterRequest = {
                all: false,
                in: false,
                out: false
            };
            this.filterRequest[type] = true;
        },
        toggleEditMode() {
            if (this.editMode) {
                this.changeAvatar();
                this.updateUser();
            }
            this.editMode = !this.editMode;
        },
        setUserFilmsCount(count) {
            this.filmsCount = count;
        },
        setUserCommentsCount(count) {
            this.commentsCount = count;
        },
        updateUser() {
            if (this.user.name !== this.userName) {
                this.user.name = this.userName;
                databaseService.updateUser(this.user);
            }
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
            if (this.requestUserId === '') {
                this.$dangerToast('ID cannot be empty');
                return false;
            }
            databaseService.sendRequest(this.user.id, this.requestUserId);
            this.requestUserId = '';
        },
		getRequests(requests, changeType) {
            if (requests.length > 1) {
                this.requests = requests;
            }
            else {
                const app = this;
                requests.forEach(function (oneRequest) {
                    if (changeType === 'added') {
                        app.requests.unshift(oneRequest);
                    }
                    if (changeType === 'removed') {
                        app.requests = app.$lodash.reject(app.requests, function(el) { return el.id === oneRequest.id; });
                    }
                    if (changeType === 'modified') {
                        app.requests = app.$lodash.map(app.requests, function(a) {
                            return a.id === oneRequest.id ? oneRequest : a;
                        });
                    }

                });
            }
		},
		getFriends(friends, changeType) {
            if (friends.length > 1) {
                this.friends = friends;
            }
            else {
                const app = this;
                friends.forEach(function (oneFriend) {
                    if (changeType === 'added') {
                        app.friends.unshift(oneFriend);
                    }
                    if (changeType === 'removed') {
                        app.friends = app.$lodash.reject(app.friends, function(el) { return el.id === oneFriend.id; });
                    }
                    if (changeType === 'modified') {
                        app.friends = app.$lodash.map(app.friends, function(a) {
                            return a.id === oneFriend.id ? oneFriend : a;
                        });
                    }

                });
            }
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
		changeAvatar() {
			let file = this.avatarFile;

			if (file) {
                this.imageUploading = true;
                let newImageName = databaseService.generateToken();
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
                StorageRef.on('state_changed', function (snapshot) {
                    app.counterProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                }, function () {
                }, function () {
                    app.$firebase.storage().ref().child('avatars/' + newImageName).getDownloadURL().then(function (downloadURL) {
                        app.user.avatar = downloadURL;
                        databaseService.updateUserAvatar(app.user.id, downloadURL);
                        setTimeout(function () {
                            app.imageUploading = false;
                        }, 1000);
                    });
                });
            }
		},
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

    #requestsHeader .active {
        background-color: #0b61fe !important;
        color: #F6F7F9 !important;
        border-color: #0b61fe !important;
    }
    .emptyAvatar {
        width: 65px;
        height: 90px;
        background-color: #485563;
    }
</style>
