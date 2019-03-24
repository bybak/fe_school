<template>
  <div id="oneFilm">

    <h1 class="text-light">Movie collection of User</h1>

    <b-card no-body class="overflow-hidden" bg-variant="dark" text-variant="light">
      <b-row no-gutters>
        <b-col md="2">
          <img src="../../pictures/pic/1.jpg" class="card-img" alt="Card image">
        </b-col>
        <b-col md="10">
          <b-card-body>
            <div class="d-flex justify-content-between align-items-center">
              <h4 class="m-0">Back to the Future</h4>
              <b-button size="sm" variant="primary" v-b-tooltip.hover title="Copy to my collection"><i class="fas fa-copy"></i></b-button>
            </div>
            <b-card-text>

              <hr class="mt-2 mb-1">
              <div :key="index" v-for="(item, index) in items">
                <b-form-row>
                  <b-col lg="2">
                    <span class="font-weight-bold">{{item.field}}</span>
                  </b-col>
                  <b-col lg="10">
                    <span>{{item.value}}</span>
                  </b-col>
                </b-form-row>
                <!--<hr class="mt-1 mb-1">-->
              </div>
            </b-card-text>

            <b-card-text class="text-white-50">
              Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.
            </b-card-text>

            <b-form-row class="text-white-50 mt-3 mb-0">

              <b-col lg="4" cols="12">
                <b-form-row>
                  <b-col lg="3" cols="3">
                    <i class="fas fa-film fa-3x"></i>
                  </b-col>
                  <b-col lg="9" cols="9">
                    <div>Kinopoisk:</div>
                    <div>8.6</div>
                  </b-col>
                </b-form-row>
              </b-col>

              <b-col lg="4" cols="12">
                <b-form-row>
                  <b-col lg="3" cols="3">
                    <i class="fab fa-imdb fa-3x"></i>
                  </b-col>
                  <b-col lg="9" cols="9">
                    <div>IMDb:</div>
                    <div>8.5</div>
                  </b-col>
                </b-form-row>
              </b-col>

              <b-col lg="4" cols="12">
                <b-form-row>
                  <b-col lg="6" cols="6">

                    <fa-rating
                            :item-size="25"
                            :glyph="StarIcon"
                            inactive-color="#59616a"
                            active-color="#F6F7F9"
                            :border-width="0"
                            text-class="custom-text"
                            :show-rating="false"
                    ></fa-rating>

                  </b-col>
                  <b-col lg="6" cols="6">
                    <div>Site rating:</div>
                    <div>5.0</div>
                  </b-col>
                </b-form-row>
              </b-col>

            </b-form-row>

          </b-card-body>
        </b-col>
      </b-row>
    </b-card>

    <p style="background-color: #f6f7f9"></p>

    <b-card no-body class="overflow-hidden mt-3" bg-variant="dark" text-variant="light">
      <b-card-body>
        <h5>Comments</h5>

        <b-form-textarea
                id="textarea"
                v-model="text"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
                size="sm"
        />
        <b-button size="sm" variant="primary" class="mt-2">Publish</b-button>

        <hr class="bg-secondary">

        <b-form-row>
          <b-col lg="1" cols="3">
            <img class="rounded" src="../../pictures/pic/2.jpg" alt="Card image" style="border-radius: 3px; max-height: 120px; max-width: 100%">
          </b-col>
          <b-col lg="11" cols="9">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <span class="font-weight-bold">User Name </span><small class="text-white-50">[ 01.01.2019 ]</small>
              </div>
              <div>
                <b-button variant="outline-success" size="sm" class="border-dark" @click="setCardMode()"><i class="fas fa-thumbs-up"></i> 500</b-button>
                <b-button variant="outline-danger" size="sm" class="border-dark" @click="setTableMode()"><i class="fas fa-thumbs-down"></i> 33</b-button>
              </div>
            </div>
            <hr class="mt-2 mb-2">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at sagittis enim. Sed maximus, justo a dapibus rhoncus, tellus velit ullamcorper metus, sit amet imperdiet metus libero sit amet nisl. Etiam quis lectus sed nisl interdum suscipit. Pellentesque auctor sodales leo, sed ultrices mi. Donec maximus interdum nibh, non iaculis tellus bibendum in. Integer ultricies mi ut erat vulputate, in rutrum felis sodales. Pellentesque cursus feugiat sapien, id condimentum orci faucibus et. Cras rhoncus elit velit, quis euismod lectus scelerisque in. Aenean vel metus a lectus sagittis cursus sed ac massa.
            </p>
          </b-col>
        </b-form-row>

        <hr class="bg-secondary">

        <b-form-row>
          <b-col lg="1" cols="3">
            <img class="rounded" src="../../pictures/pic/1.jpg" alt="Card image" style="border-radius: 3px; max-height: 120px; max-width: 100%">
          </b-col>
          <b-col lg="11" cols="9">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <span class="font-weight-bold">User Name </span><small class="text-white-50">[ 01.01.2019 ]</small>
              </div>
              <div>
                <b-button variant="outline-success" size="sm" class="border-dark" @click="setCardMode()"><i class="fas fa-thumbs-up"></i> 500</b-button>
                <b-button variant="outline-danger" size="sm" class="border-dark" @click="setTableMode()"><i class="fas fa-thumbs-down"></i> 33</b-button>
              </div>
            </div>
            <hr class="mt-2 mb-2">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at sagittis enim. Sed maximus, justo a dapibus rhoncus, tellus velit ullamcorper metus, sit amet imperdiet metus libero sit amet nisl. Etiam quis lectus sed nisl interdum suscipit. Pellentesque auctor sodales leo, sed ultrices mi. Donec maximus interdum nibh, non iaculis tellus bibendum in. Integer ultricies mi ut erat vulputate, in rutrum felis sodales. Pellentesque cursus feugiat sapien, id condimentum orci faucibus et. Cras rhoncus elit velit, quis euismod lectus scelerisque in. Aenean vel metus a lectus sagittis cursus sed ac massa.
            </p>
          </b-col>
        </b-form-row>


      </b-card-body>
    </b-card>

  </div>
</template>

<script>
import Star from 'vue-rate-it/glyphs/star';

export default {
    name: 'oneFilm',
    created(){
        this.StarIcon = Star
    },
    data() {
        return {
            StarIcon: '',
            fields: [],
            items: [
                { field: 'Year', value: '1985' },
                { field: 'Genres', value: 'Adventure | Comedy | Sci-Fi' },
                { field: 'Actors', value: 'Actors' },
            ]
        }
    }
}
</script>

<style>
</style>
