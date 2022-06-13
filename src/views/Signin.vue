<template>
  <div class="container">
        <form class="mt-5" @submit.prevent="loginUser">
            <label for="email" class="form-label">Email:</label>
            <input type="email" id="email" class="form-control" v-model="user.email">

            <div class="mt-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" id="password" class="form-control" v-model="user.password">
            </div>
            
            <div class="alert alert-danger" v-if="messagError">{{ messageError }}</div>
            <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-primary" type="submit">Login</button>
            </div>
        </form>
  </div>
</template>

<script>
import firebase from "../firebase";

export default {
    name: "Signin",
    data() {
        return {
            user: {
                email: "",
                password: ""
            },
            messageError: ""
        }
    },
    methods: {
        loginUser(){
            firebase.auth()
                .signInEmailAndPassword(this.user.email, this.user.password)
                .then(dataUser => {
                    localStorage.setItem('uiduser', dataUser.user.uid);
                    
                    this.$router.push({
                        name: 'Home'
                    })
                })
                .catch(() => {
                    this.messageError = 'Invalid email and password';
                })
        }
    },
}
</script>