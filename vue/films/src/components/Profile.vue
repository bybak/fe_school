<template>
  <div id="profile">

    <h2 class="text-light">Profile</h2>

    <b-form-row>
      <b-col lg="3">

          <b-card class="text-center">
            <i class="fas fa-user fa-5x"></i>

            <br>
            <a href="#">Change avatar</a>

          </b-card>

      </b-col>
      <b-col lg="9">

        <div>
          <span class="font-weight-bold">Name: </span><span class="mr-2">User</span><i class="fas fa-pencil-alt"></i>
        </div>
        <div>
          <span class="font-weight-bold">Unique ID: </span><span class="mr-2">1234567890</span>
        </div>

        <b-list-group flush>
          <b-list-group-item v-for="item in items" class="d-flex justify-content-between align-items-center">
            <span>{{item.field}}</span>
            <span>{{item.value}}</span>
          </b-list-group-item>
        </b-list-group>

      </b-col>
    </b-form-row>

    <b-form-row class="mt-3">
      <b-col lg="6">
        <b-card
                style=""
                class="mb-2"
        >
          <b-card-title>
            Friends <small> (They can view your collection)</small>
          </b-card-title>
          <b-card-text>
            <b-list-group flush>

              <b-list-group-item class="d-flex justify-content-between align-items-center">
                <div class="text-center">
                  <i class="fas fa-user fa-3x"></i>
                  <br>
                  Your friend name
                </div>
                <div>
                  <b-button-group vertical>
                    <b-button variant="primary">View user's collection</b-button>
                    <b-button variant="danger">Remove from friends</b-button>
                  </b-button-group>
                </div>
              </b-list-group-item>

              <b-list-group-item class="d-flex justify-content-between align-items-center">
                <div class="text-center">
                  <i class="fas fa-user fa-3x"></i>
                  <br>
                  Your friend name
                </div>
                <div>
                  <b-button-group vertical>
                    <b-button variant="primary">View user's collection</b-button>
                    <b-button variant="danger">Remove from friends</b-button>
                  </b-button-group>
                </div>
              </b-list-group-item>

            </b-list-group>
          </b-card-text>

        </b-card>
      </b-col>
      <b-col lg="6">

        <b-card
                style=""
                class="mb-2"
        >
          <b-card-title>
            Friend Requests
          </b-card-title>
          <b-card-text>

            <h5>Request</h5>
            <b-input-group prepend="" class="mt-3">
              <b-form-input placeholder="Input unique ID here"/>
              <b-input-group-append>
                <b-button variant="outline-primary">Send request</b-button>
              </b-input-group-append>
            </b-input-group>

            <b-list-group flush class="mt-3">

              <b-list-group-item class="d-flex justify-content-between align-items-center">
                <div class="text-center">
                  <i class="fas fa-user fa-3x"></i>
                  <br>
                  Your friend name
                </div>
                <div class="text-center">
                  You got friend request
                  <br>
                  <b-button-group vertical>
                    <b-button variant="success">Approve</b-button>
                    <b-button variant="danger">Decline</b-button>
                  </b-button-group>
                </div>
              </b-list-group-item>

              <b-list-group-item class="d-flex justify-content-between align-items-center">
                <div class="text-center">
                  <i class="fas fa-user fa-3x"></i>
                  <br>
                  Your friend name
                </div>
                <div>
                  <span>You have send friend request</span>
                  <br>
                  <span>Your request is waiting for approval</span>
                </div>
              </b-list-group-item>

            </b-list-group>


          </b-card-text>
        </b-card>

      </b-col>
    </b-form-row>

  </div>
</template>

<script>
export default {
  name: 'profile',
  data() {
      return {

      }
  },
  methods: {

  }
}
</script>

<style>
</style>
