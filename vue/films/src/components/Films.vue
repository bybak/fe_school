<template>
  <div id="films">

    <h1 class="text-light" v-if="myCollection">My movie collection</h1>
    <h1 class="text-light" v-else>Movie collection of {{collectionOwner.name}}</h1>

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

                <b-form-input :placeholder="searchType" v-model="searchString" v-if="isSearchString"/>
                <b-form-select v-model="selectedGenres" :options="genres" v-if="!isSearchString" :select-size="1" @change="filterFilms()"></b-form-select>

                <b-dropdown size="sm" text="Search type" slot="append" no-caret>
                  <template slot="button-content">
                    <i class="fas fa-sliders-h"></i>
                  </template>
                  <b-dropdown-item @click="setSearchType('title')">Title</b-dropdown-item>
                  <b-dropdown-item @click="setSearchType('year')">Year</b-dropdown-item>
                  <b-dropdown-item @click="setSearchType('genre')">Genre</b-dropdown-item>
                </b-dropdown>

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

          <b-button size="sm" class="ml-2" @click="addFilm" v-if="myCollection"><i class="fas fa-plus"></i></b-button>

        </b-col>
      </b-form-row>
    </b-card>

    <div v-if="bigCardView && userHasFilms">

        <paginate
                name="filmsCards"
                :list="films"
                :per="4"
                class="form-row"
                tag="div"
        >

              <b-col lg="3" :key="film.id" cols="12" md="6" v-for="film in paginated('filmsCards')" v-if="film.show">
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
                        <h6 class="mb-0 text-elipse-oveflow">{{film.title}}</h6>

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
                                :read-only="checkForUserRating(film)"
                        ></fa-rating>

                      </div>
                      <div>
                        <div class="d-flex justify-content-between align-items-center">
                          <small class="text-white-50 small-genres text-elipse-oveflow">{{film.year}}, {{formatGenresForFilm(film.genre)}}</small>
                          <i class="fas fa-heart fa-sm like" :class="{active : film.favourite[user.id]}" @click="setToFavourite(film, film.favourite[user.id])"></i>
                        </div>
                      </div>
                    </b-card-text>
                  </b-card>
              </b-col>

        </paginate>

        <b-container class="pagination-container mt-3">
            <paginate-links
                    for="filmsCards"
                    class="pagination"
                    :show-step-links="true"
                    :limit="3"
                    :hide-single-page="true"
            ></paginate-links>
        </b-container>

    </div>

    <div v-if="tableView && userHasFilms">

        <paginate
                name="filmsCards"
                :list="films"
                :per="4"
                tag="div"
        >

            <b-form-row>
                <b-col lg="12" :key="film.id" cols="12" md="12" v-for="film in paginated('filmsCards')" v-if="film.show">
                    <b-card no-body
                            class="mb-2 text-left filmCard"
                            bg-variant="dark"
                            text-variant="light"
                            @mouseover="cardMouseOver(film.id)"
                            @mouseout="cardMouseOut"
                            :class="{'shadow': isHovered(film.id)}"
                            @click="goToFilm(film.id)"
                    >
                        <b-card-text class="">
                            <b-form-row>
                                <b-col lg="1" cols="2" md="1">
                                    <div class="rounded" style='padding-top: 150%; background-color: #313a43;background-size:100% 100%;' :style="{'background-image': 'url(' + film.poster + ')'}">
                                    </div>
                                </b-col>
                                <b-col lg="3" cols="3" md="3" class="d-flex align-items-center">
                                    <span class="ml-2 mb-0 text-elipse-oveflow">{{film.title}}</span>
                                </b-col>
                                <b-col lg="2" cols="1" md="2" class="d-flex align-items-center">
                                    <small class="text-elipse-oveflow">{{film.year}}</small>
                                </b-col>
                                <b-col lg="4" cols="3" md="4" class="d-flex align-items-center">
                                    <small class="text-elipse-oveflow">{{formatGenresForFilm(film.genre)}}</small>
                                </b-col>
                                <b-col lg="1" cols="2" md="1" class="d-flex justify-content-center align-items-center">
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
                                            :read-only="checkForUserRating(film)"
                                    ></fa-rating>
                                </b-col>
                                <b-col lg="1" cols="1" md="1" class="d-flex justify-content-center align-items-center">
                                    <i class="fas fa-heart fa-sm like" :class="{active : film.favourite[user.id]}" @click="setToFavourite(film, film.favourite[user.id])"></i>
                                </b-col>
                            </b-form-row>
                        </b-card-text>
                    </b-card>
                </b-col>
            </b-form-row>

        </paginate>

        <b-container class="pagination-container mt-3">
            <paginate-links
                    for="filmsCards"
                    class="pagination"
                    :show-step-links="true"
                    :limit="3"
                    :hide-single-page="true"
            ></paginate-links>
        </b-container>


    </div>

    <div v-if="!userHasFilms">
        <div v-if="!filmsLoaded">
            LOADING
        </div>
        <h3 class="pt-4 text-light" v-else>There are no films :(</h3>
    </div>

      <add-film ref="addFilm"></add-film>

  </div>
</template>

<script>
import Star from 'vue-rate-it/glyphs/star';
import databaseService from '../lib/databaseService';
import Lodash from 'lodash';
import addFilm from './addFilm';

export default {
    name: 'films',
    created(){
        this.StarIcon = Star
    },
    props: ['id'],
    components: {addFilm},
    data() {
        return {
            paginate: ['filmsCards'],
            StarIcon: '',
            selected: 'title',
            options: [
                { value: 'title', text: 'Title' },
                { value: 'year', text: 'Year' },
                { value: 'rating', text: 'Rating' },
            ],
            bigCardView: true,
            tableView: false,

            films: [],
            orderType: 'asc',
            ascButtonPressed: true,
            descButtonPressed: false,
            searchType: 'title',
            searchString: '',
            myCollection: false,
            favouriteButtonPressed: false,
            hoveredCard: null,
            user: {},
            allFilms: {},
            genres: [],
            selectedGenres: '',
            filmsLoaded: false,
            collectionOwner: {}
        }
    },
    mounted() {

        this.init();

    },
    computed: {
        userHasFilms() {
            if (this.films.length === 0) {
                return false;
            }

            return true;
        },
        isSearchString() {
            if (this.searchType === 'title' || this.searchType === 'year') {
                return true;
            }

            return false;
        }
    },
    watch: {
        selected() {
            this.sortFilms();
        },
        orderType() {
            this.sortFilms();
        },
        searchString() {
            this.filterFilms();
        },
        id() {
            this.init();
        }
    },
    methods: {
        init() {

            this.films = [];

            databaseService.getFilms(this.id, this.getFilms);
            databaseService.getGenres().then(data => {
                this.genres =  data;
            });

            this.user = this.$store.getters.getUser;
            if (this.user.id === this.id) {
                this.myCollection = true;
            } else {
                databaseService.getUserById(this.id).then((data) => {
                    this.collectionOwner = data;
                });
            }
        },
        formatGenresForFilm(genres) {
            return genres.join(' | ');
        },
        getFilms(films, changeType) {
            this.filmsLoaded = true;
            if (films.length > 1) {
                this.films = films;
            }
            else {
                const app = this;
                films.forEach(function (oneFilm, index) {
                    if (changeType === 'added') {
                        app.films.unshift(oneFilm);
                    }
                    if (changeType === 'removed') {
                        app.films = app.$lodash.reject(app.films, function(el) { return el.id === oneFilm.id; });
                    }
                    if (changeType === 'modified') {
                        app.films = app.$lodash.map(app.films, function(a) {
                            return a.id === oneFilm.id ? oneFilm : a;
                        });
                    }

                });
            }

            this.sortFilms();
            this.allFilms = this.films;
        },
        checkForUserRating(film) {
            return film.votedUsers.includes(this.user.id);
        },
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
        setToFavourite(film, currentState) {
            event.stopPropagation();
            databaseService.setFilmFavourite(film, this.user.id, !currentState);
        },
        setRating(rating, filmId) {
            event.stopPropagation();

            const app = this;
            const film = this.$lodash.find(this.films, function(object) {
                return app.$lodash.includes(object.id, filmId);
            });

            const ratingArray = film.ratingArray;
            const votedUsers = film.votedUsers;

            ratingArray.push(rating);
            votedUsers.push(this.user.id);

            databaseService.setFilmRating(filmId, ratingArray, votedUsers);
        },
        goToFilm(id) {
            this.$router.push({name: 'film', params: {userId: this.id, id: id}});
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
            this.$refs.addFilm.show();
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
            this.allFilms = this.$lodash.orderBy(this.allFilms, [this.selected], [this.orderType]);
        },

        filterFilms() {
            const app = this;
            let localFilmArray = [];
            this.allFilms.map(function(oneFilm) {

                let filterResult = false;
                if (app.isSearchString) {
                    const objValue = app.$lodash.toLower(oneFilm[app.searchType]);
                    const searchValue = app.$lodash.toLower(app.searchString);

                    filterResult = app.$lodash.includes(objValue, searchValue);
                } else {
                    if (app.selectedGenres !== '') {
                        filterResult = app.$lodash.includes(oneFilm.genre, app.selectedGenres);
                    } else {
                        filterResult = true;
                    }
                }

                if (app.favouriteButtonPressed) {
                    filterResult = filterResult && (oneFilm.favourite[app.user.id] === true);
                }

                if (!filterResult) {
                    oneFilm.show = false;
                }
                else {
                    oneFilm.show = true;
                    localFilmArray.push(oneFilm);
                }

            });

            this.films = localFilmArray;
        }

    }
}
</script>

<style scoped>
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

  .pagination-container {
      text-align: center;
  }

  .paginate-list {
      padding-left: 0;
  }

  /deep/ .pagination {
             display: inline-block;
         }

  /deep/ .pagination li {
             color: white;
             background-color: #59616a;
             float: left;
             text-decoration: none;
             border-radius: 5px;
             transition: background-color .3s;
             padding: 6px 0;
             margin: 0 4px;
         }

  /deep/ .pagination li > a {
             padding: 14px;
             cursor: pointer;
         }

  /deep/ .pagination li.active {
             background-color: #0b61fe;
             color: white;
             border-radius: 5px;
         }

  /deep/ .pagination li:hover:not(.active) {background-color: #727a84;}
    .text-elipse-oveflow {
        overflow:hidden;
        white-space:nowrap;
        text-overflow: ellipsis;
    }
    .small-genres {
        max-width: 90%;
    }
</style>
