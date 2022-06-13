<template>
  <div class="container">
    <div class="row">
      <div class="card" style="width: 18rem" v-for="item in products" :key="item.key">
        <img :src="item.image" alt="../assets/logo.png" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">{{ item.name }}</h5>
          <h5 class="card-title">{{ item.price }}</h5>
          <p class="card-text">{{ item.description }}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '../firebase';

export default {
  name: 'Products',
  data() {
    return {
      products: [],
      ref: firebase.firestore().collection('products')
    }
  },
  created() {
    this.ref.onSnapshot(query => {
      this.products = [];

      query.forEach(doc => {
        this.products.push({
          key: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          image: doc.data().image
        });
      });
    })
  },
}
</script>

<style>

</style>