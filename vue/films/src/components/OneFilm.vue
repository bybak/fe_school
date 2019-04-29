<template>
  <div id="oneFilm">

    <h1 class="text-light" v-if="myFilm">My film</h1>
    <h1 class="text-light" v-if="!myFilm">{{filmOwner.name}}'s film</h1>

    <b-card no-body class="overflow-hidden" bg-variant="dark" text-variant="light" v-if="film">
      <b-row no-gutters>
        <b-col md="2">
          <img :src="film.poster" class="card-img" alt="Card image">
        </b-col>
        <b-col md="10">
          <b-card-body>
            <div class="d-flex justify-content-between align-items-center">
              <h4 class="m-0">{{film.title}}</h4>
                <b-button size="sm" variant="primary" v-b-tooltip.hover title="Copy to my collection" v-if="!myFilm" @click="copyFilm"><i class="fas fa-copy"></i></b-button>
                <div v-if="myFilm">
                    <b-button size="sm" v-b-tooltip.hover title="Edit film" @click="editFilm"><i class="fas fa-pencil-alt"></i></b-button>
                    <b-button class="ml-1" size="sm" variant="danger" v-b-tooltip.hover title="Delete film" @click="deleteFilm"><i class="fas fa-times" style="padding-left: 2px;padding-right: 2px;"></i></b-button>
                </div>
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
                    <span>{{formatGenresForFilm(film.genre)}}</span>
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
                              @rating-selected="setRating(film.rating, id)"
                              :read-only="checkForUserRating(film)"
                      ></fa-rating>

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
                class="commentArea"
        />
        <b-button size="sm" variant="primary" class="mt-2" @click="addComment">Publish</b-button>

        <!-- COMMENTS -->

          <paginate
                  name="comments"
                  :list="commentsArray"
                  :per="3"
                  class="paginate-list"
          >

                <div v-for="(comment, index) in paginated('comments')" :key="index">
                  <b-card no-body bg-variant="dark" text-variant="light" class="mt-2 shadow-sm">
                    <b-form-row>
                      <b-col lg="1" cols="3">
                        <img v-if="comment.user.avatar" class="rounded" :src="comment.user.avatar" alt="Card image" style="border-radius: 3px; max-height: 120px; max-width: 100%">
                        <div v-else class="rounded d-flex justify-content-center align-items-center emptyAvatar">
                            <b-spinner variant="light"></b-spinner>
                        </div>
                      </b-col>
                      <b-col lg="11" cols="9" class="p-2">
                        <div class="d-flex justify-content-between align-items-center">
                          <div>
                            <span class="font-weight-bold">{{comment.user.name}} </span><small class="text-white-50">[ {{comment.date}} ]</small>
                          </div>
                          <div v-if="comment.user.id !== user.id">
                              <div v-if="!checkLikeForUser(comment)">
                                    <b-button variant="outline-success" size="sm" class="border-dark" @click="likeDislikeComment(comment.id, 'like')"><i class="fas fa-thumbs-up"></i> {{comment.like.length}}</b-button>
                                    <b-button variant="outline-danger" size="sm" class="border-dark" @click="likeDislikeComment(comment.id, 'dislike')"><i class="fas fa-thumbs-down"></i> {{comment.dislike.length}}</b-button>
                              </div>
                              <div v-else>
                                  <b-button variant="outline-success" size="sm" class="border-dark" disabled><i class="fas fa-thumbs-up"></i> {{comment.like.length}}</b-button>
                                  <b-button variant="outline-danger" size="sm" class="border-dark" disabled><i class="fas fa-thumbs-down"></i> {{comment.dislike.length}}</b-button>
                              </div>
                          </div>
                            <div v-else>
                                <b-button variant="outline-danger" size="sm" class="border-dark" @click="deleteComment(comment.id)"><i class="fas fa-times"></i></b-button>
                            </div>
                        </div>
                        <p>
                            {{comment.comment}}
                        </p>
                      </b-col>
                    </b-form-row>
                  </b-card>
                </div>

          </paginate>

          <b-container class="pagination-container mt-3">
              <paginate-links
                      for="comments"
                      class="pagination"
                      :show-step-links="true"
                      :limit="3"
                      v-if="commentsArray.length > 3"
              ></paginate-links>
          </b-container>

      </b-card-body>
    </b-card>

      <add-film ref="addFilm"></add-film>

  </div>
</template>

<script>
import Star from 'vue-rate-it/glyphs/star';
import databaseService from '../lib/databaseService';
import dayjs from 'dayjs';
import addFilm from './addFilm';

export default {
    name: 'oneFilm',
    props: ['userId', 'id'],
    components: {addFilm},
    created() {

        this.StarIcon = Star;
        databaseService.getOneFilm(this.id, this.getFilm);

    },
    mounted() {
        this.user = this.$store.getters.getUser;
        databaseService.getDynamicComments(this.id, this.getDynamicComments);

        if (this.user.id === this.userId) {
            this.myFilm = true;
        } else {
            databaseService.getUserById(this.userId).then((data) => {
                this.filmOwner = data;
            });
        }

    },
    methods: {
        getFilm(film) {
            this.film = film;
        },
        editFilm() {
            let film = this.film;
            film.id = this.id;
            this.$refs.addFilm.init(this.film);
        },
        deleteFilm() {
            this.$router.push({name: 'films', params: {id: this.userId}});
            databaseService.deleteFilm(this.id);
        },
        copyFilm() {
            databaseService.copyFilm(this.film, this.user);
        },
        checkForUserRating(film) {
            return film.votedUsers.includes(this.user.id);
        },
        setRating(rating, filmId) {
            const film = this.film;

            const ratingArray = film.ratingArray;
            const votedUsers = film.votedUsers;

            ratingArray.push(rating);
            votedUsers.push(this.user.id);

            databaseService.setFilmRating(filmId, ratingArray, votedUsers);
        },
        formatGenresForFilm(genres) {
            return genres.join(' | ');
        },
        checkLikeForUser(commentObject) {
            return commentObject.like.includes(this.user.id) || commentObject.dislike.includes(this.user.id);
        },
        likeDislikeComment(commentId, type) {
            databaseService.likeDislikeComment(commentId, this.user.id, type);
        },
        deleteComment(commentId) {
            databaseService.deleteComment(commentId);
        },
        addComment() {
            let commentObject = {
                filmId: this.id,
                userId: this.user.id,
                comment: this.comment,
                date: dayjs().format('DD/MM/YYYY'),
                like: [],
                dislike: [],
            };

            databaseService.addComment(commentObject);
            this.comment = '';
        },
        getDynamicComments: function(comments, type) {

            if (comments.length > 1) {
                this.commentsArray = this.$lodash.orderBy(comments, ['date'], ['desc']);
                return;
            }

            const app = this;
            comments.forEach(function (oneComment, index) {
                if (type === 'added') {
                    app.commentsArray.unshift(oneComment);
                }
                if (type === 'removed') {
                    app.commentsArray = app.$lodash.reject(app.commentsArray, function(el) { return el.id === oneComment.id; });
                }
                if (type === 'modified') {
                    app.commentsArray = app.$lodash.map(app.commentsArray, function(a) {
                        return a.id === oneComment.id ? oneComment : a;
                    });
                }
            });

        }
    },

    computed: {
    },

    data() {
        return {
            StarIcon: '',
            film: '',
            comment: '',
            commentsArray: [],
            paginate: ['comments'],
            myFilm: false,
            filmOwner: {}
        }
    }
}
</script>

<style scoped>

    .commentArea {
        background-color: #59616a;
        color: white;
        border-color: #29323c;
    }

    .commentArea::placeholder {
        color: white;
    }

    .emptyAvatar {
        width: 65px;
        height: 90px;
        background-color: #485563;
    }

    .pagination-container {
        text-align: center;
    }

    .paginate-list {
        padding: 0;
        margin: 0;
        width: 100%;
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

</style>
