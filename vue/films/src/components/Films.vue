<template>
  <div id="films">

    <h1 class="text-light">Movie collection of User</h1>

    <b-card no-body class="mb-2 p-3" bg-variant="dark" text-variant="light">
      <b-form-row>
        <b-col cols="12" lg="4" class="pb-1 pt-1">

          <b-input-group size="sm" slot="append">
            <b-form-select v-model="selected" :options="options" size="sm"></b-form-select>

            <b-button slot="append" size="sm" @click="setOrderType('asc')" :pressed.sync="ascButtonPressed"><i class="fas fa-sort-amount-up"></i></b-button>
            <b-button slot="append" size="sm" @click="setOrderType('desc')" :pressed.sync="descButtonPressed"><i class="fas fa-sort-amount-down"></i></b-button>
          </b-input-group>

        </b-col>

        <b-col cols="12" lg="4" class="pb-1 pt-1">
          <b-form-row>
            <b-col cols="11">
              <b-input-group size="sm">
                <b-form-input :placeholder="searchType" v-model="searchString"/>

                <b-dropdown size="sm" text="Search type" slot="append" no-caret>
                  <template slot="button-content">
                    <i class="fas fa-sliders-h"></i>
                  </template>
                  <b-dropdown-item @click="setSearchType('title')">Title</b-dropdown-item>
                  <b-dropdown-item @click="setSearchType('year')">Year</b-dropdown-item>
                </b-dropdown>

                <b-button slot="append" @click="search"><i class="fas fa-search"></i></b-button>
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
      <b-col lg="3" :key="film.id" cols="12" md="6" v-for="film in films">
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
            selected: 'title',
            options: [
                { value: 'title', text: 'Title' },
                { value: 'year', text: 'Year' },
                { value: 'rating', text: 'Rating' },
            ],
            bigCardView: true,
            tableView: false,
            fields: {
                poster: {
                    label: 'Poster',
                    thClass: "border-top-0"
                },
                title: {
                    label: 'Title',
                    thClass: "border-top-0"
                },
                year: {
                    label: 'Year',
                    thClass: "border-top-0"
                },
                genre: {
                    label: 'Genre',
                    thClass: "border-top-0"
                }
            },
            films: [],
            orderType: 'asc',
            ascButtonPressed: true,
            descButtonPressed: false,
            searchType: 'title',
            searchString: ''
        }
    },
    mounted() {

        let app = this;
        this.$fireStore.collection("films").orderBy(this.selected, this.orderType)
            .get()
            .then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {

                      let film = doc.data();
                      film.id = doc.id;

                      app.films.push(film);
                  });
            })
            .catch(function(error) {
            });

    },
    computed: {
    },
    watch: {
        selected() {
            this.getFilms();
        },
        orderType() {
            this.getFilms();
        }
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

        },
        setOrderType(orderType) {
            this.orderType = orderType;

            if (orderType === 'asc') {
                this.ascButtonPressed = true;
                this.descButtonPressed = false;
            }

            if (orderType === 'desc') {
                this.ascButtonPressed = false;
                this.descButtonPressed = true;
            }
        },
        setSearchType(searchType) {
            this.searchType = searchType;
        },
        search() {
            this.getFilms();
        },
        getFilms() {
            let films = [];
            let app = this;

            let getFilmsFunction = '';
            if (this.searchString === '') {
                getFilmsFunction = this.$fireStore.collection("films").orderBy(this.selected, this.orderType);
            }
            else {
                getFilmsFunction = this.$fireStore.collection("films").where(this.searchType, "==", this.searchString).orderBy(this.selected, this.orderType);
            }

//            console.log(getFilmsFunction);

            getFilmsFunction
                .get()
                .then(function (querySnapshot) {

                    console.log("!!!!!!");

                    querySnapshot.forEach(function (doc) {

                        let film = doc.data();
                        film.id = doc.id;
                        films.push(film);

                    });

                    console.log(films);
                    app.films = films;
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        test() {
            console.log('test');
        }
    }
}
</script>

<style>
</style>
