<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentTutorial.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentTutorial.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentTutorial.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

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
    <p>Click on a Album to view...</p>
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
      AlbumService.get(id)
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
      AlbumService.update(this.currentTutorial.id, this.currentTutorial)
        .then(response => {
          console.log(response.data)
          var datasong = {
            album: this.currentTutorial.id,
            title: this.currentTutorial.title,
            description: this.currentTutorial.description
          }
          AlbumService.createSong(datasong)
            .then(response => {
              this.album.id = response.data.id
              console.log(response.data)
            })
            .catch(e => {
              console.log(e)
            })
          this.message = 'The album was updated successfully!'
        })
        .catch(e => {
          console.log(e)
        })
    },

    deleteTutorial () {
      AlbumService.delete(this.currentTutorial.id)
        .then(response => {
          console.log(response.data)
          this.$router.push({ name: 'tutorials' })
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
