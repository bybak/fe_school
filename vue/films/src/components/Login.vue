<template>

    <div>

      <b-alert
              variant="danger"
              dismissible
              fade
              :show="showDismissibleAlert"
              @dismissed="showDismissibleAlert=0"
              id = "login_register_alert"
      >
        {{alertMessage}}
      </b-alert>

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
                  v-model="email"
                  type="text"
                  placeholder="email"
                  aria-describedby="inputFormatterHelp"

          />

          <label for="login_password" class="mt-3">Password</label>
          <b-form-input
                  id="login_password"
                  v-model="password"
                  type="text"
                  placeholder="password"
                  aria-describedby="inputFormatterHelp"

          />
        </div>

        <div id="registerForm" v-if="showRegister">

          <label for="register_email">Email</label>
          <b-form-input
                  id="register_email"
                  v-model="email"
                  type="text"
                  placeholder="email"
                  aria-describedby="inputFormatterHelp"

          />

          <label for="register_name" class="mt-3">Name</label>
          <b-form-input
                  id="register_name"
                  v-model="name"
                  type="text"
                  placeholder="name"
                  aria-describedby="inputFormatterHelp"

          />
          <label for="register_password1" class="mt-3">Password</label>
          <b-form-input
                  id="register_password1"
                  v-model="password"
                  type="text"
                  placeholder="password"
                  aria-describedby="inputFormatterHelp"

          />

          <label for="register_password2" class="mt-3">Confirm password</label>
          <b-form-input
                  id="register_password2"
                  v-model="confirmPassword"
                  type="text"
                  placeholder="confirm password"
                  aria-describedby="inputFormatterHelp"

          />

        </div>

        <div class="mt-3">
          <b-button v-if="showLogin" variant="outline-primary" @click="switchPanel()">Register</b-button>
          <b-button v-if="showRegister" variant="outline-primary" @click="switchPanel()">Login</b-button>

          <b-button v-if="showLogin" class="float-right" variant="primary" @click="login()">Login</b-button>
          <b-button v-if="showRegister" class="float-right" variant="primary" @click="register()">Register</b-button>
        </div>

      </b-modal>
    </div>
</template>

<script>
    import databaseService from '../lib/databaseService';

    export default {
      name: 'login',
      data() {
          return {
              showModal: false,
              showLogin: true,
              showRegister: false,
              modalTitle: 'Login',
              email: '',
              password: '',
              name: '',
              confirmPassword: '',
              showDismissibleAlert: 0,
              alertMessage: ''
          }
      },
      mounted() {

      },
      methods: {
          register() {
              if (this.password !== this.confirmPassword) {
                  this.showAlert({code: '00', message: 'Passwords should be the same'});
                  return;
              }

              let app = this;
              this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                  function (user) {

                      let userObject = {
                          id: user.user.uid,
                          name: app.name,
                          email: app.email
                      };

                      app.$store.commit('setUser', userObject);
                      databaseService.registerUser(userObject);

                      app.hide();
                  },
                  function (error) {
                    app.showAlert(error);
                  }
              );
          },
          login() {
              let app = this;
              this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                  function (user) {

                      databaseService.getUserById(user.user.uid).then((data) => {
                          app.$store.commit('setUser', data);
                          app.hide();
                      });

                  },
                  function (error) {
                      app.showAlert(error);
                  }
              );
          },
          showAlert(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              this.alertMessage = '[' + errorCode + '] ' + errorMessage;
              this.showDismissibleAlert = 3;
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
  #login_register_alert {
    position: absolute;
    bottom: 10px;
    left: 10px;
    z-index: 9999;
  }
</style>
