<template>
  <div id="films">

    <h1 class="text-light">Movie collection of User</h1>

    <b-card no-body class="mb-2 p-3" bg-variant="dark" text-variant="light">
      <b-form-row>
        <b-col cols="12" lg="4" class="pb-1 pt-1">

          <b-form-select v-model="selected" size="sm">
            <option :value="null">Sorting</option>
          </b-form-select>

        </b-col>

        <b-col cols="12" lg="4" class="pb-1 pt-1">
          <b-input-group size="sm">
            <b-form-input />

            <b-dropdown size="sm" text="Search type"  slot="append">
              <b-dropdown-item>Title</b-dropdown-item>
              <b-dropdown-item>Genre</b-dropdown-item>
            </b-dropdown>
          </b-input-group>
        </b-col>

        <b-col cols="12" lg="4" class="text-right pb-1 pt-1">

          <b-button size="sm" class="mr-2"><i class="fas fa-star"></i></b-button>

          <b-button-group size="sm">
              <b-button  @click="setBigCardMode()"><i class="fas fa-th-large"></i></b-button>
              <b-button  @click="setCardMode()"><i class="fas fa-th"></i></b-button>
              <b-button  @click="setTableMode()"><i class="fas fa-bars"></i></b-button>
            </b-button-group>
        </b-col>
      </b-form-row>
    </b-card>

    <b-form-row v-if="bigCardView">
      <b-col lg="3" cols="12" md="6" v-for="film in films">
        <router-link to="/film" tag="card">
          <b-card no-body
                  class="mb-2 text-left"
                  bg-variant="dark"
                  text-variant="light"
          >
            <div>
              <div class="rounded" style='padding-top: 150%; background-color: #e2d1c3;background-size:100% 100%;' :style="{'background-image': 'url(' + film.poster + ')'}">
              </div>
            </div>
            <b-card-text class="m-2">
              <h6>{{film.title}}</h6>
              <div>
                <small class="text-white-50">{{film.year}}, {{film.genre}}</small>
              </div>
            </b-card-text>
          </b-card>
        </router-link>
      </b-col>
    </b-form-row>

    <b-form-row v-if="cardView">
      <b-col lg="4" sm="12" md="6" v-for="film in films">

        <b-card
                class="mb-2 text-left"
                bg-variant="dark"
                text-variant="light"
        >
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="mb-0">{{film.title}}</h5>
            <span class="text-white-50">{{film.year}}</span>
          </div>
          <hr class="mt-2 mb-2">
          <b-form-row>
            <b-col lg="4" md="2" class="text-center">
              <img :src="film.poster" alt="Card image" style="border-radius: 3px; max-height: 140px;">
            </b-col>
            <b-col lg="8" md="10" class="d-flex align-items-start flex-column">
              <div class="mb-auto w-100">
                <span>{{film.genre}}</span>
              </div>
              <b-button to="/film" size="sm" class="mt-2">More</b-button>
            </b-col>
          </b-form-row>
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
export default {
    name: 'films',
    data() {
        return {
            selected: null,
            bigCardView: true,
            cardView: false,
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
                { title: 'Back to the Future', poster: require('../../pictures/pic/1.jpg'), year: '1985', genre: 'Adventure | Comedy | Sci-Fi' },
                { title: 'The Godfather', poster: require('../../pictures/pic/2.jpg'), year: '1972', genre: 'Crime | Drama' },
                { title: 'Blade Runner 2049', poster: require('../../pictures/pic/3.jpg'), year: '2017', genre: 'Drama | Mystery | Sci-Fi' },
            ]
        }
    },
    methods: {
        setBigCardMode() {
            this.bigCardView = true;
            this.tableView = false;
            this.cardView = false;
        },
        setCardMode() {
            this.tableView = false;
            this.cardView = true;
            this.bigCardView = false;
        },
        setTableMode() {
            this.tableView = true;
            this.cardView = false;
            this.bigCardView = false;
        }
    }
}
</script>

<style>
</style>
