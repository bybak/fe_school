<template>
  <div id="profile">

    <h2 class="text-light">Profile</h2>

    <b-card no-body class="overflow-hidden" bg-variant="dark" text-variant="light">
      <b-row no-gutters>
        <b-col md="2" class="avatarContainer">
          <img src="../../pictures/pic/1.jpg" class="card-img" alt="Card image">
          <b-button size="sm" v-b-tooltip.hover title="Change avatar" class="changeAvatarButton"><i class="fas fa-pencil-alt"></i></b-button>
        </b-col>
        <b-col md="10">
          <b-card-body>
            <div class="d-flex justify-content-between align-items-center">
              <h4 class="m-0">User name</h4>
              <b-button size="sm" v-b-tooltip.hover title="Edit profile"><i class="fas fa-pencil-alt"></i></b-button>
            </div>
            <b-card-text>
              <hr class="mt-2 mb-2">
              Unique ID: 1234567890
            </b-card-text>

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

            <h5>Friends</h5>
            <b-row>
              <b-col lg="1" cols="3">
                <img class="rounded" src="../../pictures/pic/1.jpg" alt="Card image" style="border-radius: 3px; max-height: 80px;">
              </b-col>
              <b-col lg="11" cols="9">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <div><span class="font-weight-bold">User Name</span></div>
                    <div><span class="text-white-50">From: 01.01.2019</span></div>
                    <b-button variant="primary" size="sm">Go to the collection</b-button>
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
                    <b-button variant="primary" size="sm">Go to the collection</b-button>
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
                    <b-button class="border-dark" @click="setCardMode()" v-b-tooltip.hover title="Incoming"><i class="fas fa-sign-in-alt"></i></b-button>
                    <b-button class="border-dark" @click="setTableMode()" v-b-tooltip.hover title="Requests"><i class="fas fa-sign-out-alt"></i></b-button>
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
                      <b-button variant="success" class="border-dark" @click="setCardMode()">Approve</b-button>
                      <b-button variant="danger" class="border-dark" @click="setTableMode()">Decline</b-button>
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
                    <b-button disabled size="sm" variant="info">You have send friend request. Your request is waiting for approval</b-button>
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
export default {
  name: 'profile',
  data() {
      return {
          tabIndex: 0,
          friendTab: true,
          requestTab: false
      }
  },
  methods: {
      selectTab(type) {
        if (type === 'friend') {
            this.friendTab = true;
            this.requestTab = false;
        }
        else {
            this.friendTab = false;
            this.requestTab = true;
        }
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
</style>
