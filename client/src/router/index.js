import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import AddAlbum from '@/components/AddAlbum'
import AlbumList from '@/components/AlbumList'
import Album from '@/components/Album'
import AlbumSong from '@/components/AlbumSong'
import AddSong from '@/components/AddSong'
import Song from '@/components/Song'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/add/:id',
      name: 'add',
      component: AddAlbum
    }, {
      path: '/albums',
      name: 'albums',
      component: AlbumList
    },
    {
      path: '/albums/:id',
      name: 'album-details',
      component: Album
    },
    {
      path: '/songs/:id',
      name: 'album-specific-song-details',
      component: AlbumSong
    },
    {
      path: '/addsong/:id',
      name: 'album-add-song',
      component: AddSong
    },
    {
      path: '/viewsong/:id',
      name: 'song-details',
      component: Song
    }
  ]
})
