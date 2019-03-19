<template>
  <div id="films">

    <h1>Movie collection of User</h1>

    <b-card no-body class="mb-2 p-3">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-start">

          <div class="mr-2">
            <b-form-select v-model="selected" size="sm">
              <option :value="null">Sorting</option>
            </b-form-select>
          </div>

          <div class="mr-2">
            <b-button variant="outline-primary" size="sm"><i class="fas fa-star"></i></b-button>
          </div>

          <div>
            <b-input-group size="sm">
              <b-form-input />

              <b-dropdown size="sm" text="Search type" variant="outline-primary" slot="append">
                <b-dropdown-item>Title</b-dropdown-item>
                <b-dropdown-item>Genre</b-dropdown-item>
              </b-dropdown>
            </b-input-group>
          </div>

        </div>
        <div>
          <b-button-group size="sm">
            <b-button variant="outline-primary" @click="setCardMode()"><i class="fas fa-grip-horizontal"></i></b-button>
            <b-button variant="outline-primary" @click="setTableMode()"><i class="fas fa-bars"></i></b-button>
          </b-button-group>
        </div>
      </div>
    </b-card>

    <b-form-row v-if="cardView">
      <b-col lg="4" sm="12" v-for="film in films">

        <b-card
                :title="film.title"
                class="mb-2 text-left"
        >
          <hr class="m-2">
          <b-form-row>
            <b-col lg="4" class="text-center">
              <img :src="film.poster" alt="Card image" style="border-radius: 3px; max-height: 140px;">
            </b-col>
            <b-col lg="8" class="d-flex align-items-start flex-column">
              <div class="mb-auto w-100">
                <span>Year: </span>
                <small>{{film.year}}</small>
                <br/>
                <span>Genres: </span>
                <small>{{film.genre}}</small>
              </div>
              <b-button to="/film" size="sm" variant="outline-primary" class="mt-2">More</b-button>
            </b-col>
          </b-form-row>
        </b-card>

      </b-col>

    </b-form-row>

    <b-form-row v-if="tableView">
      <b-col>
        <b-table hover :items="films" :fields="fields">
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
            cardView: true,
            tableView: false,
            fields: {
                poster: {
                    label: 'Poster',
                },
                title: {
                    label: 'Title',
                    sortable: true
                },
                year: {
                    label: 'Year',
                    sortable: true
                },
                genre: {
                    label: 'Genre',
                    sortable: false
                }
            },
            films: [
                { title: 'Back to the Future', poster: require('../../pictures/pic/1.jpg'), year: '1985', genre: 'Adventure | Comedy | Sci-Fi' },
                { title: 'The Godfather', poster: require('../../pictures/pic/2.jpg'), year: '1972', genre: 'Crime | Drama' },
                { title: 'Blade Runner 2049', poster: require('../../pictures/pic/3.jpg'), year: '2017', genre: 'Drama | Mystery | Sci-Fi | Thriller' },
            ]
        }
    },
    methods: {
        setCardMode() {
            this.tableView = false;
            this.cardView = true;
        },
        setTableMode() {
            this.tableView = true;
            this.cardView = false;
        }
    }
}
</script>

<style>
</style>
