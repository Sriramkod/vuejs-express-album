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
    <div class="col-md-6">
      <h4>List of Albums</h4>
      <ul class="w3-ul w3-card" style="width:80%">
        <li class="w3-blue"
          :class="{ active: index == currentIndex }"
          v-for="(album, index) in albums"
          :key="index"
          @click="setActiveAlbum(album, index)"
        >
          {{ album.title }}
        </li>
      </ul>
      <br>
      <br>
      <button  class="w3-button w3-red" @click="removeAllAlbums">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <center>
      <div v-if="currentAlbum" class="w3-card w3-yellow">
        <h4>About Album</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentAlbum.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentAlbum.description }}
        </div>
        <br>
        <center>
        <div class="row">
        <div class="column">&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <div class="column">&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <div class="column">
        <router-link :to="'/albums/' + currentAlbum.id"  class="w3-button w3-red">Edit</router-link>
        &nbsp;&nbsp;</div>
        <div class="column">
        <router-link :to="'/addsong/' + currentAlbum.id"  class="w3-button w3-blue">Add new Song</router-link>
        &nbsp;&nbsp;</div>
        <div class="column">
        <router-link :to="'/songs/' + currentAlbum.id"  class="w3-button w3-green">View Songs</router-link>
        </div>
        </div></center>
        <br><br>
      </div>

      <div v-else>
        <br />
        <p>Please click on a Album...</p>
      </div>
      </center>
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
    retrieveAlbums () {
      AlbumService.getAll()
        .then(response => {
          this.albums = response.data
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },

    refreshList () {
      this.retrieveAlbums()
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
