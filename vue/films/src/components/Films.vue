<template>
  <div id="films">

    <h1 class="text-light">Movie collection of User</h1>

    <b-card no-body class="mb-2 p-3" bg-variant="dark" text-variant="light">
      <b-form-row>
        <b-col cols="12" lg="11">

          <b-form-row>
            <b-col lg="2">
              <b-form-select v-model="selected" size="sm">
                <option :value="null">Sorting</option>
              </b-form-select>
            </b-col>

            <b-col lg="1">
              <b-button size="sm"><i class="fas fa-star"></i></b-button>
            </b-col>

            <b-col lg="3">
              <b-input-group size="sm">
                <b-form-input />

                <b-dropdown size="sm" text="Search type"  slot="append">
                  <b-dropdown-item>Title</b-dropdown-item>
                  <b-dropdown-item>Genre</b-dropdown-item>
                </b-dropdown>
              </b-input-group>
            </b-col>
          </b-form-row>

        </b-col>
        <b-col cols="12" lg="1" class="text-right">
          <b-button-group size="sm">
            <b-button  @click="setCardMode()"><i class="fas fa-grip-horizontal"></i></b-button>
            <b-button  @click="setTableMode()"><i class="fas fa-bars"></i></b-button>
          </b-button-group>
        </b-col>
      </b-form-row>
    </b-card>

    <b-form-row v-if="cardView">
      <b-col lg="4" sm="12" md="6" v-for="film in films">

        <b-card
                class="mb-2 text-left"
                bg-variant="dark"
                text-variant="light"
        >
          <h5>{{film.title}}</h5>
          <hr class="mt-2 mb-2">
          <b-form-row>
            <b-col lg="4" md="2" class="text-center">
              <img :src="film.poster" alt="Card image" style="border-radius: 3px; max-height: 140px;">
            </b-col>
            <b-col lg="8" md="10" class="d-flex align-items-start flex-column">
              <div class="mb-auto w-100">
                <span>Year: {{film.year}}</span>
                <br/>
                <span>Genres: {{film.genre}}</span>
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
            cardView: true,
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
