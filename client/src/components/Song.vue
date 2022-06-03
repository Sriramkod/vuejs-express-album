<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4>Songs </h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentTutorial.title"
        />
      </div>
      <div class="form-group">
        <label for="description">About Song</label>
        <input type="text" class="form-control" id="description"
          v-model="currentTutorial.description"
        />
      </div>
    </form>

    <button class="badge badge-danger mr-2"
      @click="deleteTutorial"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateTutorial"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Click on a Song to view...</p>
  </div>
</template>

<script>
import AlbumService from '../services/AlbumService'

export default {
  name: 'tutorial',
  data () {
    return {
      currentTutorial: null,
      message: ''
    }
  },
  methods: {
    getTutorial (id) {
      AlbumService.getSong(id)
        .then(response => {
          this.currentTutorial = response.data
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },

    updatePublished (status) {
      var data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status
      }

      AlbumService.update(this.currentTutorial.id, data)
        .then(response => {
          this.currentTutorial.published = status
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },

    updateTutorial () {
      AlbumService.updateSong(this.currentTutorial.id, this.currentTutorial)
        .then(response => {
          console.log(response.data)
          this.message = 'The song was updated successfully!'
        })
        .catch(e => {
          console.log(e)
        })
    },

    deleteTutorial () {
      AlbumService.deleteSong(this.currentTutorial.id)
        .then(response => {
          console.log(response.data)
          this.$router.push({ name: 'albums' })
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mounted () {
    this.message = ''
    this.getTutorial(this.$route.params.id)
  }
}
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
