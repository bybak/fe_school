<template>
    <b-modal
            v-model="showModal"
            id="loginModal"
            :title="modalTitle"
            content-class="bg-dark text-light"
            hide-footer
            hide-header
            size="lg"
    >
        <b-form-row>
            <b-col lg="3">
                <div class="posterContainer">
                    <img class="rounded" :src="poster" alt="Card image" style="border-radius: 3px; max-width: 100%">
                    <div class="changePosterButton">
                        <b-button variant="primary" size="sm" v-b-tooltip.hover title="Change poster" @click="$refs.file.click()">
                            <i class="fas fa-pencil-alt"></i>
                        </b-button>
                        <input type="file" class="fileInput" ref="file" @change="changePoster">
                    </div>
                </div>
            </b-col>
            <b-col lg="9" class="pl-3">
                <div class="d-flex justify-content-between">
                    <h3 v-if="!id">Add new film</h3>
                    <h3 v-else>Update film</h3>
                    <div>
                        <b-button variant="secondary" size="sm" @click="hide">Cancel</b-button>
                        <b-button variant="primary" size="sm" class="ml-2" @click="save">Save</b-button>
                    </div>
                </div>
                <hr class="m-0">
                <b-row class="my-2">
                    <b-col lg="3" class="d-flex align-items-center">
                        <label class="m-0" for="addFilmTitle">Title:</label>
                    </b-col>
                    <b-col lg="9">
                        <b-form-input v-model="title" placeholder="title" class="input" size="sm" id="addFilmTitle" type="text"></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="my-2">
                    <b-col lg="3" class="d-flex align-items-center">
                        <label class="m-0" for="addFilmYear">Year:</label>
                    </b-col>
                    <b-col lg="9">
                        <b-form-input v-model="year" placeholder="year" class="input" size="sm" id="addFilmYear" type="number"></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="my-2">
                    <b-col lg="3">
                        <label class="m-0">Genre:</label>
                    </b-col>
                    <b-col lg="9">
                        <b-row no-gutters v-for="(oneGenre, index) in genresArray">
                            <b-col lg="11">
                                <b-form-select v-model="oneGenre.selected" :options="oneGenre.genres" size="sm" class="input"></b-form-select>
                            </b-col>
                            <b-col lg="1">
                                <b-button block variant="outline-danger" size="sm" class="border border-dark" @click="removeFromGenreToList(index)"><i class="fas fa-minus"></i></b-button>
                            </b-col>
                        </b-row>

                        <div class="text-right">
                            <b-row no-gutters>
                                <b-col lg="11">
                                </b-col>
                                <b-col lg="1">
                                    <b-button block variant="outline-primary" size="sm" class="border border-dark" @click="addGenreToList"><i class="fas fa-plus"></i></b-button>
                                </b-col>
                            </b-row>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="my-2">
                    <b-col lg="3">
                        <label class="m-0" for="addFilmText">Text:</label>
                    </b-col>
                    <b-col lg="9">
                        <b-form-textarea
                                v-model="text"
                                id="addFilmText"
                                size="sm"
                                placeholder="Enter something..."
                                rows="3"
                                class="input"
                        ></b-form-textarea>
                    </b-col>
                </b-row>
            </b-col>
        </b-form-row>
    </b-modal>
</template>

<script>
import databaseService from '../lib/databaseService';
export default {
    name: 'addFilm',
    data() {
        return {
            showModal: false,
            modalTitle: 'Add film',
            genres: [],
            genresArray: [],
            selected: null,
            poster: '',
            title: '',
            year: '',
            text: '',
            id: ''
        }
    },
    mounted() {
        databaseService.getGenres().then(data => {
            this.genres =  data;
        });
    },
    methods: {
        changePoster(event) {
            var files = event.target.files || event.dataTransfer.files;
            if (!files.length)
                return;

            this.poster = files[0];
            var reader = new FileReader();

            let app = this;
            reader.onload = (e) => {
                app.poster = e.target.result;
            };
            reader.readAsDataURL(files[0]);
        },
        save() {

        },
        init(film) {
            this.genresArray = [];
            this.poster = film.poster;
            this.title = film.title;
            this.year = film.year;
            this.text = film.text;
            this.id = film.id;
            this.user = film.user;

            film.genre.forEach((oneGenre) => {
                this.genresArray.push({selected: oneGenre, genres: this.genres});
            });

            this.show();
        },
        show() {
            this.showModal = true;
        },
        hide() {
            this.showModal = false;
        },
        addGenreToList() {
            this.genresArray.push({selected: '', genres: this.genres});
        },
        removeFromGenreToList(index) {
            if (this.genresArray.length !== 1) {
                this.genresArray.splice(index, 1);
            }
        }
    }
}
</script>

<style scoped>
    .input {
        background-color: #59616a;
        color: white;
        border-color: #29323c;
    }
    .input::placeholder {
        color: white;
    }
    .posterContainer {
        position: relative;
    }
    .changePosterButton {
        position: absolute;
        bottom: 10px;
        left: 10px;
    }
</style>
