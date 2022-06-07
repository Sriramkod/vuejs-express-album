<template>
<div>
     <br>
<div class="w3-card-4">
  <center>
       <div  class="w3-container w3-blue" style="width: 65%;">

 <h4> Create a new Album</h4>
       </div>
       <br>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label class="error w3-text-blue" for="title">Title</label>
        <input
          type="text"
          class="form-control w3-input w3-border w3-sand" style="width: 150%;"
          id="title"
          required
          v-model="album.title"
          name="title"
        />
      </div>
<br>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
           class="form-control w3-input w3-border w3-sand" style="width: 150%;"
          id="description"
          required
          v-model="album.description"
          name="description" rows="4" cols="50"
        ></textarea>
      </div>
<br>
      <button @click="saveAlbum" class="w3-btn w3-blue">Submit</button>
    <br>
    </div>

    <div v-else>
      <h5>New Album Created Successfully....</h5>
      <button class="w3-btn w3-blue" @click="newAlbum">Create One more</button>
    </div>
    <br>
  </div>
  </center>
  </div>
</div>
</template>

<script>
import AlbumService from '../services/AlbumService'

export default {
  name: 'add-album',
  data () {
    return {
      album: {
        id: null,
        title: '',
        description: ''
      },
      submitted: false
    }
  },
  methods: {
    saveAlbum () {
      var data = {
        title: this.album.title,
        description: this.album.description,
        artist: this.$route.params.id
      }

      AlbumService.create(data)
        .then(response => {
          this.album.id = response.data.id
          console.log(response.data)
          this.submitted = true
        })
        .catch(e => {
          console.log(e)
        })
    },

    newAlbum () {
      this.submitted = false
      this.album = {}
    }
  }
}
</script>

<style>
@import "https://www.w3schools.com/w3css/4/w3.css";
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
