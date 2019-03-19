<template>
    <b-modal v-model="showModal" id="loginModal" :title="modalTitle">

      <div id="loginForm" v-if="showLogin">
        <label for="inputFormatter">Email</label>
        <b-form-input
                id="inputFormatter"
                v-model="text1"
                type="text"
                placeholder="Enter your name"
                aria-describedby="inputFormatterHelp"
                :formatter="format"
        />

        <label for="inputFormatter" class="mt-3">Password</label>
        <b-form-input
                id="inputFormatter"
                v-model="text1"
                type="text"
                placeholder="Enter your name"
                aria-describedby="inputFormatterHelp"
                :formatter="format"
        />
      </div>

      <div id="registerForm" v-if="showRegister">

        <label for="inputFormatter">Email</label>
        <b-form-input
                id="inputFormatter"
                v-model="text1"
                type="text"
                placeholder="Enter your name"
                aria-describedby="inputFormatterHelp"
                :formatter="format"
        />

        <label for="inputFormatter" class="mt-3">Name</label>
        <b-form-input
                id="inputFormatter"
                v-model="text1"
                type="text"
                placeholder="Enter your name"
                aria-describedby="inputFormatterHelp"
                :formatter="format"
        />
        <label for="inputFormatter" class="mt-3">Password</label>
        <b-form-input
                id="inputFormatter"
                v-model="text1"
                type="text"
                placeholder="Enter your name"
                aria-describedby="inputFormatterHelp"
                :formatter="format"
        />

        <label for="inputFormatter" class="mt-3">Password</label>
        <b-form-input
                id="inputFormatter"
                v-model="text1"
                type="text"
                placeholder="Enter your name"
                aria-describedby="inputFormatterHelp"
                :formatter="format"
        />

      </div>

      <div slot="modal-footer" class="w-100">
        <b-button v-if="showLogin" variant="outline-primary" @click="switchPanel()">Register</b-button>
        <b-button v-if="showRegister" variant="outline-primary" @click="switchPanel()">Login</b-button>
        <b-button v-if="showLogin" class="float-right" variant="primary">Login</b-button>
        <b-button v-if="showRegister" class="float-right" variant="primary">Register</b-button>
      </div>

    </b-modal>
</template>

<script>
export default {
  name: 'login',
  data() {
      return {
          showModal: false,
          showLogin: true,
          showRegister: false,
          modalTitle: 'Login'
      }
  },
  methods: {
      show() {
          this.showModal = true;
      },
      hide() {
          this.showModal = false;
      },
      switchPanel() {
          this.showLogin = !this.showLogin;
          this.showRegister = !this.showRegister;

          if (this.modalTitle === 'Login') {
              this.modalTitle = 'Register';
              return;
          }

          this.modalTitle = 'Login';
      }
  }
}
</script>

<style>
</style>
