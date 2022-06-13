<template>
  <div class="container">
    <h1 class="text-center">My products</h1>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add New Product</button>

    <div class="row gap-2 mt-3">
      <div class="card" style="width: 18rem" v-for="item in myProducts" :key="item.key">
        <img :src="item.image" alt="../assets/logo.png" class="card-img-top">
        <h5 class="card-title">{{ item.name }}</h5>
        <h5 class="card-title">{{ item.price }}</h5>
        <p class="card-text">{{ item.description }}</p>
        <a href="#" class="btn btn-primary">Buy</a>
        <button class="btn btn-warning ms-1" data-bs-target="#update" @click="getData(item.name, item.price, item.description, item.image, item.key)">Update</button>
        <button class="btn btn-danger ms-1" @click="deleteProduct(item.key)">Delete</button>
      </div>
    </div>

    <!-- Add new  product -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLable" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLable"> Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
          </div>
          <div class="modal-body">
            <!-- form start here -->
            <form @submit.prevent="addProduct">
                <input type="text" class="form-control mt-2" placeholder="Name" aria-label="default input example" v-model="product.name">
                <input type="number" class="form-control mt-2" placeholder="Price" aria-label="default input example" v-model="product.price">
                <input type="file" accept=".jpg,.png" class="form-control mt-2" placeholder="Image" aria-label="default input example" @change="previewImage">
                <textarea class="form-control mt-2" rows="3" placeholder="Description" v-model="product.description"></textarea>
                
                <div class="alert alert-success" v-if="messageSuccess">{{ messagSuccess }}</div>

                <progress id="js-progressbar" class="uk-progress" :value="uploadValue" max="100"></progress>
                <div class="alert alert-success" v-if="uploadValue === 100">Uploaded successfully</div>

                <button type="submit" class="btn btn-success mt-2">Add</button>
            </form>
            <!-- form end here -->
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- update product -->
    <div class="modal fade" id="update" tabindex="-1" aria-labelledby="update" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="update"> Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
          </div>
          <div class="modal-body">
            <!-- form start here -->
            <form @submit.prevent="update">
                <input type="text" class="form-control mt-2" placeholder="Name" aria-label="default input example" v-model="dataProduct.name">
                <input type="number" class="form-control mt-2" placeholder="Price" aria-label="default input example" v-model="dataProduct.price">
                <input type="text" class="form-control mt-2" placeholder="Image" aria-label="default input example" v-model="dataProduct.Image">
                <textarea class="form-control mt-2" rows="3" placeholder="Description" v-model="dataProduct.description"></textarea>
                
                <div class="alert alert-success" v-if="messageUpdate">{{ messageUpdate }}</div>

                <button type="submit" class="btn btn-success mt-2">Update</button>
            </form>
            <!-- form end here -->
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import firebase from '../firebase';

export default {
    name:'Myproducts',
    data() {
      return {
        product: {
          name: '',
          price: 0,
          image: '',
          description: '',
          uid: localStorage.getItem('uiduser')
        },
        dataProduct: {
          name: '',
          price: 0,
          image: '',
          description: '',
          key: ''
        },
        ref: firebase.firestore().collection('products'),
        messageSuccess: '',
        messageUpdate: '',
        myProducts: [],
        uploadValue: 0,
        picture: null,
        imageData: null,
        imageName: ''
      }
      
    },
    methods: {
      async addProduct() {
        // upload image start here
        this.picture = null;
        const storageRef = firebase.storage().ref('images/').put(this.image);
        storageRef.on(`state_changed`, snapshot => {
        this.uploadValue = (snapshot.butesTransferred/snapshot.totalBytes)*100;
        },
        error => console.log(error.message),
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownURL().then(url =>{
            this.product.image = url;

            this.ref.add(this.product).then(() => {
              this.messageSuccess = 'Added new product';
            }).then(() => {
              this.product.name = '';
              this.product.price = '';
              this.product.image = '';
              this.product.description = '';
            })
          });
        });
        // upload image end here

        this.product.image = this.picture;

      },
      getData(name, price, description, image, key){
        this.dataProduct.name = name;
        this.dataProduct.price = price;
        this.dataProduct.description = description;
        this.dataProduct.image = image;
        this.dataProduct.key = key;
      },
      update() {
        this.ref.doc(this.dataProduct.key).update({
          name: this.dataProduct.name,
          price: this.dataProduct.price,
          description: this.dataProduct.description,
          image: this.dataProduct.image,
        })
        .then(() => this.messageUpdate = 'This product is updated')
      },
      deleteProduct(key) {
        this.ref.doc(key).delete();
      },
      previewImage(event) {
        this.uploadValue = 0;
        this.picture = null;
        this.imageData = event.target.files[0];
        this.imageName = event.target.files[0].name; 
      }
    },
    created() {
      this.ref.onSnapshot(query => {
        this.myProducts = [];

        query.forEach(p => {
          if(localStorage.getItem('uidUser') === p.data().uid){
            this.myProducts.push({
              key: p.id,
              name: p.data().name,
              price: p.data().price,
              description: p.data().description,
              image: p.data().image
            });
          }
        });  
      })
    },
}
</script>