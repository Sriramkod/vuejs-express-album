<template>

<div class="list row">

    <div class="col-md-10">
      <div class="row">
        <div class="column">&nbsp;</div>
        </div>
      <div class="row w3-card-4">
        <div class="column">
        <input type="text" class="form-control w3-input w3-border w3-round" placeholder="Search by title"
          v-model="title"/>
        </div>
        <div class="column">
          <button class="w3-btn w3-green w3-round" type="button"
            @click="searchArt"
          >
            Search
          </button>
        </div>
<div class="column">
        <input type="text" class="form-control w3-input w3-border w3-round" placeholder="Search by artist"
          v-model="artist"/>
        </div>
        <div class="column">
          <button class="w3-btn w3-red w3-round" type="button"
            @click="searchTitle"
          >
            Search Artist
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <ul class="w3-ul w3-card-4">
         <li class="w3-bar" :class="{ active: index == currentIndex }"
          v-for="(album, index) in albums"
          :key="index"
          @click="setActiveAlbum(album, index)"
        >
      <!-- <span onclick="this.parentElement.style.display='none'" class="w3-bar-item w3-button w3-white w3-xlarge w3-right">×</span> -->

      <img src="../assets/albumimg.png" class="w3-bar-item w3-circle w3-hide-small" style="width:80px">
      <div class="w3-bar-item">
        <span class="w3-large">{{ album.title }}</span><br>
      </div>
    </li>
      </ul>
      <br>
      <br>
    </div>
    <div class="col-md-6">
      <center>
      <div v-if="currentAlbum" class="w3-card w3-aqua">
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
        <router-link :to="'/addsong/' + currentAlbum.id"  class="w3-button w3-green">Add new Song</router-link>
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
      title: '',
      artist: ''
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
      AlbumService.findAllByArtist(this.artist)
        .then(response => {
          this.albums = response.data
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },
    searchArt () {
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
