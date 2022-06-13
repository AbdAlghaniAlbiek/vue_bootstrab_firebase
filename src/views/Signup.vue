<template>
    <div class="container">
        <form class="mt-5">
            <div class="mt-3">
                <label for="name" class="form-label">Name:</label>
                <input type="name" id="name" class="form-control" v-model="user.name">
            </div>
            

            <div class="mt-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" id="email" class="form-control" v-model="user.email">
            </div>
            
            <div class="mt-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" id="password" class="form-control" v-model="user.password">
            </div>

            
            <div class="d-flex justify-content-center mt-3">
                <button @submit.prevent="registerUser" class="btn btn-primary" type="submit">Submit</button>
            </div>
      </form>
    </div>
</template>

<script>
import firebase from '../firebase';



export default {
    data() {
        return {
            user: {
                name: '',
                email: '',
                userId: '',
                password: ''
            },
            ref: firebase.firestore().collection('user')
        }
    },
    name:'Signup',
    methods: {
        registerUser(){
            firebase.auth()
                .createUserWithEmailAndPassword(this.user.email, this.uesr.password)
                .then(dataUser => {
                    this.ref.add({
                        name: this.user.name,
                        email: this.user.email,
                        uid: dataUser.user.uid
                    })

                    localStorage.setItem('uidUser', dataUser.user.uid);

                    this.$router.push({name: 'Home'})
                })
                .catch(() => {

                })
        }
    },
}
</script>