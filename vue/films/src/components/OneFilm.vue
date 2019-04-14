<template>
  <div id="oneFilm">

    <h1 class="text-light">Movie collection of User</h1>

    <b-card no-body class="overflow-hidden" bg-variant="dark" text-variant="light">
      <b-row no-gutters>
        <b-col md="2">
          <img :src="film.poster" class="card-img" alt="Card image">
        </b-col>
        <b-col md="10">
          <b-card-body>
            <div class="d-flex justify-content-between align-items-center">
              <h4 class="m-0">{{film.title}}</h4>
              <b-button size="sm" variant="primary" v-b-tooltip.hover title="Copy to my collection"><i class="fas fa-copy"></i></b-button>
            </div>
            <b-card-text>

              <hr class="mt-2 mb-1">
              <div>
                <b-form-row>
                  <b-col lg="2">
                    <span class="font-weight-bold">Year</span>
                  </b-col>
                  <b-col lg="10">
                    <span>{{film.year}}</span>
                  </b-col>
                </b-form-row>

                <b-form-row>
                  <b-col lg="2">
                    <span class="font-weight-bold">Genre</span>
                  </b-col>
                  <b-col lg="10">
                    <span>{{film.genre}}</span>
                  </b-col>
                </b-form-row>

              </div>
            </b-card-text>

            <b-card-text class="text-white-50">
              {{film.text}}
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
                            v-model="film.rating"
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
                v-model="comment"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
                size="sm"
        />
        <b-button size="sm" variant="primary" class="mt-2" @click="addComment">Publish</b-button>

        <!-- COMMENTS -->
        <div v-for="comment in commentsArray">
          <b-card no-body bg-variant="dark" text-variant="light" class="mt-2 shadow-sm">
            <b-form-row>
              <b-col lg="1" cols="3">
                <img class="rounded" :src="comment.user.avatar" alt="Card image" style="border-radius: 3px; max-height: 120px; max-width: 100%">
              </b-col>
              <b-col lg="11" cols="9" class="p-2">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <span class="font-weight-bold">{{comment.user.name}} </span><small class="text-white-50">[ {{comment.date}} ]</small>
                  </div>
                  <div>
                    <b-button variant="outline-success" size="sm" class="border-dark" @click="setCardMode()"><i class="fas fa-thumbs-up"></i> {{comment.like}}</b-button>
                    <b-button variant="outline-danger" size="sm" class="border-dark" @click="setTableMode()"><i class="fas fa-thumbs-down"></i> {{comment.dislike}}</b-button>
                  </div>
                </div>
                <p>
                    {{comment.comment}}
                </p>
              </b-col>
            </b-form-row>
          </b-card>
        </div>

      </b-card-body>
    </b-card>

  </div>
</template>

<script>
import Star from 'vue-rate-it/glyphs/star';
import databaseService from '../lib/databaseService';
import dayjs from 'dayjs';

export default {
    name: 'oneFilm',
    props: ['id'],
    created() {

        this.StarIcon = Star;

        databaseService.getOneFilm(this.id).then(data => {
            this.film = data;
        });

    },
    mounted() {
        this.subscribeDynamicComments();
    },
    methods: {
        addComment() {
            const user = this.$store.getters.getUser;

            let commentObject = {
                filmId: this.id,
                userId: user.id,
                comment: this.comment,
                date: dayjs().format('DD/MM/YYYY'),
                like: 0,
                dislike: 0,
            };

            databaseService.addComment(commentObject);

        },
        subscribeDynamicComments() {
            databaseService.getDynamicComments(this.id, this.getDynamicComments);
        },
        getDynamicComments: function(comments) {
            console.log(comments);
            this.commentsArray = comments;
        }
    },

    computed: {
    },

    data() {
        return {
            StarIcon: '',
            film: '',
            comment: '',
            commentsArray: []
        }
    }
}
</script>

<style>
</style>
