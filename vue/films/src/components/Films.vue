<template>
  <div id="films">

    <h1 class="text-light" v-if="myCollection">My movie collection</h1>
    <h1 class="text-light" v-else>Movie collection of User</h1>

    <b-card no-body class="mb-2 p-3" id="toolbar" bg-variant="dark" text-variant="light">
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

                <b-button slot="append" @click="filterFilms()"><i class="fas fa-search"></i></b-button>
              </b-input-group>
            </b-col>
            <b-col cols="1" class="text-right">
              <b-button size="sm" :pressed.sync="favouriteButtonPressed" @click="filterFilms()"><i class="fas fa-heart"></i></b-button>
            </b-col>
          </b-form-row>
        </b-col>

        <b-col cols="12" lg="4" class="text-right pb-1 pt-1">

          <b-button-group size="sm">
            <b-button @click="setBigCardMode()" :pressed.sync="bigCardView"><i class="fas fa-th-large"></i></b-button>
            <b-button @click="setTableMode()" :pressed.sync="tableView"><i class="fas fa-bars"></i></b-button>
          </b-button-group>

          <b-button size="sm" class="ml-2" @click="addFilm"><i class="fas fa-plus"></i></b-button>

        </b-col>
      </b-form-row>
    </b-card>

    <b-form-row v-if="bigCardView && userHasFilms">
      <b-col lg="3" :key="film.id" cols="12" md="6" v-for="film in films">
          <b-card no-body
                  class="mb-2 text-left filmCard"
                  bg-variant="dark"
                  text-variant="light"
                  @mouseover="cardMouseOver(film.id)"
                  @mouseout="cardMouseOut"
                  :class="{'shadow': isHovered(film.id)}"
                  @click="goToFilm(film.id)"
          >
            <div>
              <div class="rounded" style='padding-top: 150%; background-color: #313a43;background-size:100% 100%;' :style="{'background-image': 'url(' + film.poster + ')'}">
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
                        v-model="film.rating"
                        @rating-selected="setRating(film.rating, film.id)"
                ></fa-rating>

              </div>
              <div>
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-white-50">{{film.year}}, {{film.genre}}</small>
                  <i class="fas fa-heart fa-sm like" :class="{active : film.favourite}" @click="setToFavourite(film.id, film.favourite)"></i>
                </div>
              </div>
            </b-card-text>
          </b-card>
      </b-col>
    </b-form-row>

    <b-form-row v-if="tableView && userHasFilms">
      <b-col>
        <b-table selectable dark hover :items="films" :fields="fields" class="rounded" @row-clicked="goToFilmFromTable">

          <template slot="poster" slot-scope="data">
            <img :src="data.item.poster" alt="Card image" style="border-radius: 3px; max-height: 70px;">
          </template>

          <template slot="rating" slot-scope="data">
            <fa-rating
                    :item-size="15"
                    :glyph="StarIcon"
                    inactive-color="#59616a"
                    active-color="#F6F7F9"
                    :border-width="0"
                    text-class="custom-text"
                    :show-rating="false"
                    v-model="data.item.rating"
                    @rating-selected="setRating(data.item.rating, data.item.id)"
            ></fa-rating>
          </template>

          <template slot="favourite" slot-scope="data" class="text-center">
            <i class="fas fa-heart fa-sm like" :class="{active : data.item.favourite}" @click="setToFavourite(data.item.id, data.item.favourite)"></i>
          </template>

        </b-table>
      </b-col>
    </b-form-row>

    <h1 v-if="!userHasFilms" class="pt-3 text-light">There are no films yet :(</h1>

  </div>
</template>

<script>
import Star from 'vue-rate-it/glyphs/star';

export default {
    name: 'films',
    created(){
        this.StarIcon = Star
    },
    props: ['id'],
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
                    thClass: "border-top-0",
                },
                title: {
                    label: 'Title',
                    thClass: "border-top-0",
                    tdClass: 'align-middle'
                },
                year: {
                    label: 'Year',
                    thClass: "border-top-0",
                    tdClass: 'align-middle'
                },
                genre: {
                    label: 'Genre',
                    thClass: "border-top-0",
                    tdClass: 'align-middle'
                },
                rating: {
                    label: 'Rating',
                    thClass: "border-top-0",
                    tdClass: 'align-middle'
                },
                favourite: {
                    label: 'Favourite',
                    thClass: "border-top-0 text-center",
                    tdClass: 'text-center align-middle'
                }
            },
            films: [],
            allFilms: [],
            orderType: 'asc',
            ascButtonPressed: true,
            descButtonPressed: false,
            searchType: 'title',
            searchString: '',
            myCollection: false,
            favouriteButtonPressed: false,
            hoveredCard: null,
        }
    },
    mounted() {

        let app = this;
        let films = [];
        let allFilms = [];

        this.$fireStore.collection("films").where("user", "==", this.id)
            .get()
            .then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {

                      let film = doc.data();
                      film.id = doc.id;

                      film.rating = 0;
                      if (doc.data().ratingArray.length !== 0) {
                          film.rating = app.$lodash.sum(doc.data().ratingArray) / doc.data().ratingArray.length;
                      }

                      films.push(film);
                      allFilms.push(film);
                  });

                  app.films = films;
                  app.allFilms = allFilms;


                  app.sortFilms();
            })
            .catch(function(error) {
            });

        const user = this.$store.getters.getUser;
        if (user.id === this.id) {
            this.myCollection = true;
        }

    },
    computed: {
        userHasFilms() {
            if (this.films.length === 0) {
                return false;
            }

            return true;
        },
    },
    watch: {
        selected() {
            this.sortFilms();
        },
        orderType() {
            this.sortFilms();
        }
    },
    methods: {
        cardMouseOver(id) {
            this.hoveredCard = id;
        },
        cardMouseOut() {
            this.hoveredCard = null;
        },
        isHovered(id) {
            return this.hoveredCard === id;
        },
        goToFilmFromTable(record, index) {
            this.goToFilm(record.id);
        },
        setToFavourite(filmId, currentState) {
            event.stopPropagation();

            const app = this;
            const film = this.$lodash.find(this.allFilms, function(object) {
                return app.$lodash.includes(object.id, filmId);
            });
            film.favourite = !currentState;

            this.$fireStore.collection("films").doc(filmId).update({
                favourite: !currentState,
            })
                .then(function() {
                })
                .catch(function(error) {
                    // The document probably doesn't exist.
                });
        },
        setRating(rating, filmId) {
            event.stopPropagation();

            const app = this;
            const film = this.$lodash.find(this.allFilms, function(object) {
                return app.$lodash.includes(object.id, filmId);
            });

            const ratingArray = film.ratingArray;

            ratingArray.push(rating);

            film.rating = app.$lodash.sum(ratingArray) / ratingArray.length;

            this.$fireStore.collection("films").doc(filmId).update({
                ratingArray: ratingArray,
            })
                .then(function() {
                })
                .catch(function(error) {
                    // The document probably doesn't exist.
                });

        },
        goToFilm(id) {
            this.$router.push({name: 'film', params: {id: id}});
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
        sortFilms() {
            this.films = this.$lodash.orderBy(this.films, [this.selected], [this.orderType]);
        },

        filterFilms() {
            const app = this;
            this.films = this.$lodash.filter(this.allFilms, function(object) {

                const objValue = app.$lodash.toLower(object[app.searchType]);
                const searchValue = app.$lodash.toLower(app.searchString);

                let filterResult = app.$lodash.includes(objValue, searchValue);

                if (app.favouriteButtonPressed) {
                    filterResult = filterResult && (object.favourite === true);
                }

                return filterResult;
            });
        }

    }
}
</script>

<style>
  .like {
    color: #59616a;
  }
  .like.active {
    color: #F6F7F9;
  }

  .filmCard {
    cursor: pointer;
  }
  #toolbar .active {
    background-color: #0b61fe !important;
    color: #F6F7F9 !important;
    border-color: #0b61fe !important;
  }
</style>
