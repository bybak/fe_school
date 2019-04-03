<template>
  <div id="films">

    <h1 class="text-light">Movie collection of User</h1>

    <b-card no-body class="mb-2 p-3" bg-variant="dark" text-variant="light">
      <b-form-row>
        <b-col cols="12" lg="4" class="pb-1 pt-1">

          <b-dropdown id="dropdown-1" size="sm" text="Sorting" variant="light" class="w-100 text-left">
            <b-dropdown-item><i class="fas fa-sort-amount-up"></i> Rating</b-dropdown-item>
            <b-dropdown-item><i class="fas fa-sort-amount-down"></i> Rating</b-dropdown-item>
            <b-dropdown-item><i class="fas fa-sort-amount-up"></i> Year</b-dropdown-item>
            <b-dropdown-item><i class="fas fa-sort-amount-down"></i> Year</b-dropdown-item>
            <b-dropdown-item><i class="fas fa-sort-amount-up"></i> Title</b-dropdown-item>
            <b-dropdown-item><i class="fas fa-sort-amount-down"></i> Title</b-dropdown-item>
          </b-dropdown>

        </b-col>

        <b-col cols="12" lg="4" class="pb-1 pt-1">
          <b-form-row>
            <b-col cols="11">
              <b-input-group size="sm">
                <b-form-input />

                <b-dropdown size="sm" text="Search type" slot="append" no-caret>
                  <template slot="button-content">
                    <i class="fas fa-sliders-h"></i>
                  </template>
                  <b-dropdown-item>Title</b-dropdown-item>
                  <b-dropdown-item>Genre</b-dropdown-item>
                </b-dropdown>

                <b-button slot="append"><i class="fas fa-search"></i></b-button>
              </b-input-group>
            </b-col>
            <b-col cols="1" class="text-right">
              <b-button size="sm"><i class="fas fa-star"></i></b-button>
            </b-col>
          </b-form-row>
        </b-col>

        <b-col cols="12" lg="4" class="text-right pb-1 pt-1">

          <b-button-group size="sm">
            <b-button  @click="setBigCardMode()"><i class="fas fa-th-large"></i></b-button>
            <b-button  @click="setTableMode()"><i class="fas fa-bars"></i></b-button>
          </b-button-group>

          <b-button size="sm" class="ml-2" @click="addFilm"><i class="fas fa-plus"></i></b-button>

        </b-col>
      </b-form-row>
    </b-card>

    <b-form-row v-if="bigCardView">
      <b-col lg="3" :key="film.id" cols="12" md="6" v-for="film in boards">
          <b-card no-body
                  class="mb-2 text-left"
                  bg-variant="dark"
                  text-variant="light"
                  @click="goToFilm(film.id)"
          >
            <div>
              <div class="rounded" style='padding-top: 150%; background-color: #e2d1c3;background-size:100% 100%;' :style="{'background-image': 'url(' + film.poster + ')'}">
              </div>
            </div>
            <b-card-text class="m-2">
              <div class="d-flex justify-content-between align-items-center">
                <h6 class="mb-0">{{film.title}}</h6>

                <fa-rating
                        :item-size="15"
                        :glyph="StarIcon"
                        inactive-color="#59616a"
                        active-color="#F6F7F9"
                        :border-width="0"
                        text-class="custom-text"
                        :show-rating="false"
                ></fa-rating>

              </div>
              <div>
                <small class="text-white-50">{{film.year}}, {{film.genre}}</small>
              </div>
            </b-card-text>
          </b-card>
      </b-col>
    </b-form-row>

    <b-form-row v-if="tableView">
      <b-col>
        <b-table dark hover :items="films" :fields="fields" class="rounded">
          <template slot="poster" slot-scope="data">
            <img :src="data.item.poster" alt="Card image" style="border-radius: 3px; max-height: 70px;">
          </template>
        </b-table>
      </b-col>
    </b-form-row>

  </div>
</template>

<script>
import Star from 'vue-rate-it/glyphs/star';

export default {
    name: 'films',
    created(){
        this.StarIcon = Star
    },
    data() {
        return {
            StarIcon: '',
            selected: null,
            bigCardView: true,
            tableView: false,
            fields: {
                poster: {
                    label: 'Poster',
                    thClass: "border-top-0"
                },
                title: {
                    label: 'Title',
                    sortable: true,
                    thClass: "border-top-0"
                },
                year: {
                    label: 'Year',
                    sortable: true,
                    thClass: "border-top-0"
                },
                genre: {
                    label: 'Genre',
                    sortable: false,
                    thClass: "border-top-0"
                }
            },
            films: [
                { id: 1, title: 'Back to the Future', poster: require('../../pictures/pic/1.jpg'), year: '1985', genre: 'Adventure | Comedy | Sci-Fi' },
                { id: 2, title: 'The Godfather', poster: require('../../pictures/pic/2.jpg'), year: '1972', genre: 'Crime | Drama' },
                { id: 3, title: 'Blade Runner 2049', poster: require('../../pictures/pic/3.jpg'), year: '2017', genre: 'Drama | Mystery | Sci-Fi' },
            ],
            boards: []
        }
    },
    mounted() {

        let app = this;
        this.$fireStore.collection("films")
            .get()
            .then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                      app.boards.push({
                          id: doc.id,
                          title: doc.data().title,
                          year: doc.data().year,
                          poster: doc.data().poster,
                          genre: doc.data().genre,
                          text: doc.data().text
                      });
                  });
            })
            .catch(function(error) {
            });

    },
    methods: {
        goToFilm(id) {
            this.$router.push({name: 'film', params: {id: id}})
        },
        setBigCardMode() {
            this.bigCardView = true;
            this.tableView = false;
        },
        setTableMode() {
            this.tableView = true;
            this.bigCardView = false;
        },
        addFilm() {

        }
    }
}
</script>

<style>
</style>
