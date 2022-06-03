<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="w3-container">
      <h4>List of Songs </h4>
      <ul class="w3-ul w3-card" style="width:200%">
        <li class="w3-bar"
          :class="{ active: index == currentIndex }"
          v-for="(album, index) in albums"
          :key="index"
          @click="setActiveAlbum(album, index)"
        >
          {{ album.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllAlbums">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentAlbum">
        <h4>Song</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentAlbum.title }}
        </div>
        <div>
          <label><strong>About the Song:</strong></label> {{ currentAlbum.description }}
        </div>

        <div>
        <router-link :to="'/viewsong/' + currentAlbum.id" class="badge badge-warning">Edit this Song</router-link>
        </div>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Album...</p>
      </div>
    </div>
  </div>
</template>

<script>
import AlbumService from '../services/AlbumService'

export default {
  name: 'albums-list',
  data () {
    return {
      albums: [],
      currentAlbum: null,
      currentIndex: -1,
      title: ''
    }
  },
  methods: {
    getTutorial (id) {
      AlbumService.findSongsByAlbumId(id)
        .then(response => {
          this.albums = response.data
          this.currentTutorial = response.data
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },

    refreshList () {
      this.currentAlbum = null
      this.currentIndex = -1
    },

    setActiveAlbum (album, index) {
      this.currentAlbum = album
      this.currentIndex = index
    },

    removeAllAlbums () {
      AlbumService.deleteAll()
        .then(response => {
          console.log(response.data)
          this.refreshList()
        })
        .catch(e => {
          console.log(e)
        })
    },

    searchTitle () {
      AlbumService.findByTitle(this.title)
        .then(response => {
          this.albums = response.data
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mounted () {
    this.getTutorial(this.$route.params.id)
    this.retrieveAlbums()
  }
}
</script>

<style>
@import "https://www.w3schools.com/w3css/4/w3.css";
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
