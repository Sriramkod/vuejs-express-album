<template>
  <div class="list row">
    <div class="col-md-8">
       <div class="row">
        <div class="column">&nbsp;</div>
        </div>
      <div class="row">
        <div class="column">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <div class="column">&nbsp;</div>
        <div class="column">&nbsp;</div>
        <div class="column">
        <input type="text" class="form-control w3-input w3-border w3-round" placeholder="Search by title"
          v-model="title" required/>
          <p>{{ message || 'Enter the song name to search'}}</p>
        </div>
        <div class="column">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <div class="column">
          <button class="w3-btn w3-blue" type="button"
            @click="searchTitle"
          >
            Search
          </button>
          <br><br><br>
          <button class="w3-btn w3-blue" type="button" id="loads"
            @click="getSongs" style="display:none"
          >
            Load Songs of this Album
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

      <img src="../assets/headericon.png" class="w3-bar-item w3-circle w3-hide-small" style="width:80px">
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
      <div v-if="currentAlbum" class="w3-card w3-yellow">
        <h4>Song Details</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentAlbum.title }}
        </div>
        <div>
          <label><strong>About the Song:</strong></label> {{ currentAlbum.description }}
        </div>
        <center>

<br>

        <router-link :to="'/viewsong/' + currentAlbum.id" class="w3-button w3-red">Edit</router-link>

        </center>
        <br>
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
      if (this.title === '' || this.title === null || this.title.value === 0) {
        this.message = 'Please enter text in text box above to search for a song'
        document.getElementById('loads').style.display = 'none'
      } else {
        AlbumService.findByTitleSong(this.title)
          .then(response => {
            this.albums = response.data
            console.log(response.data)
            if (this.albums.length === 0) { document.getElementById('loads').style.display = 'block' } else { document.getElementById('loads').style.display = 'none' }
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
    getSongs () {
      AlbumService.findSongsByAlbumId(this.$route.params.id)
        .then(response => {
          this.albums = response.data
          this.currentTutorial = response.data
          console.log(response.data)
          document.getElementById('loads').style.display = 'none'
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
