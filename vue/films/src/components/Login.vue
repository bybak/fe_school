<template>
    <b-modal
            v-model="showModal"
            id="loginModal"
            :title="modalTitle"

            content-class="bg-dark text-light"

            hide-footer
            hide-header
    >

      <div id="loginForm" v-if="showLogin">
        <label for="login_email">Email</label>
        <b-form-input
                id="login_email"
                v-model="loginEmail"
                type="text"
                placeholder="Enter your name"
                aria-describedby="inputFormatterHelp"
                :formatter="format"
        />

        <label for="login_password" class="mt-3">Password</label>
        <b-form-input
                id="login_password"
                v-model="loginPassword"
                type="text"
                placeholder="Enter your name"
                aria-describedby="inputFormatterHelp"
                :formatter="format"
        />
      </div>

      <div id="registerForm" v-if="showRegister">

        <label for="register_email">Email</label>
        <b-form-input
                id="register_email"
                v-model="registerEmail"
                type="text"
                placeholder="Enter your name"
                aria-describedby="inputFormatterHelp"
                :formatter="format"
        />

        <label for="register_name" class="mt-3">Name</label>
        <b-form-input
                id="register_name"
                v-model="registerName"
                type="text"
                placeholder="Enter your name"
                aria-describedby="inputFormatterHelp"
                :formatter="format"
        />
        <label for="register_password1" class="mt-3">Password</label>
        <b-form-input
                id="register_password1"
                v-model="registerPassword1"
                type="text"
                placeholder="Enter your name"
                aria-describedby="inputFormatterHelp"
                :formatter="format"
        />

        <label for="register_password2" class="mt-3">Password</label>
        <b-form-input
                id="register_password2"
                v-model="registerPassword2"
                type="text"
                placeholder="Enter your name"
                aria-describedby="inputFormatterHelp"
                :formatter="format"
        />

      </div>

      <div class="mt-3">
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
          modalTitle: 'Login',
          loginEmail: '',
          loginPassword: '',
          registerEmail: '',
          registerName: '',
          registerPassword1: '',
          registerPassword2: ''
      }
  },
  methods: {
      format() {
        return true;
      },
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
