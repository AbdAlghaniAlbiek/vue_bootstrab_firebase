<template>
  <div>
      <nav class="navbar navbar-expand-lg navbar-light">
          <div class="container-fluid">
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsupportedcontent" aria-controls="navbars">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarsupportedcontent">
                  <ul class="navbar-nav me-auto mb-lg-0">
                      <li class="nav-item">
                          <router-link to="/" class="nav-link active" aria-current="page">Home</router-link>
                      </li>
                      <li class="nav-item" v-if="!user">
                          <router-link to="/about" class="nav-link">about</router-link>
                      </li>
                      <li class="nav-item" v-if="user">
                          <router-link to="/products" class="nav-link">products</router-link>
                      </li>
                      <li class="nav-item" v-if="user">
                          <router-link to="/myproducts" class="nav-link">my products</router-link>
                      </li>
                      <li class="nav-item" v-if="!user">
                          <router-link to="/signin" class="nav-link">signin</router-link>
                      </li>
                      <li class="nav-item" v-if="!user">
                          <router-link to="/signup" class="nav-link">signup</router-link>
                      </li>
                      <li class="nav-item" v-if="user">
                          <a href="#" class="nav-link" style="cursor: pointer" v-on:click="logout">logout</a>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
  </div>
</template>

<script>
import firebase from '../firebase'

export default {
    data() {
        return {
            user: null
        }
    },
    name: "NavBar",
    created() {
        firebase.auth()
            .onAuthStateChanged(user => {
                if(user)
                    this.user = user;
                else
                    this.user = null;
            });
    },
    methods: {
        logout() {
            firebase.auth()
                .signOut()
                .then(() => {
                    localStorage.removeItem('uiduser')
                    this.$router.push({name: 'Signin'});
                });
        }
    },
}
</script>

<style scoped>
nav {
    background: #58be60;
}
</style>