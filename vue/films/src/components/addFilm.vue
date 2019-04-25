<template>
    <b-modal
            v-model="showModal"
            id="loginModal"
            :title="modalTitle"
            content-class="bg-dark text-light"
            hide-footer
            hide-header
]           size="lg"
    >
        <b-form-row>
            <b-col lg="3">
                <img class="rounded" :src="noPoster" alt="Card image" style="border-radius: 3px; max-width: 100%">
            </b-col>
            <b-col lg="9">
                <b-container>
                    <h3>Add new film</h3>
                    <hr>
                    <b-row class="my-2">
                        <b-col lg="3" class="d-flex align-items-center">
                            <label class="m-0" for="addFilmTitle">Title:</label>
                        </b-col>
                        <b-col lg="9" class="p-0">
                            <b-form-input placeholder="title" class="input" size="sm" id="addFilmTitle" type="text"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="my-2">
                        <b-col lg="3" class="d-flex align-items-center">
                            <label class="m-0" for="addFilmYear">Year:</label>
                        </b-col>
                        <b-col lg="9" class="p-0">
                            <b-form-input placeholder="year" class="input" size="sm" id="addFilmYear" type="number"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="my-2">
                        <b-col lg="3">
                            <label class="m-0">Genre:</label>
                        </b-col>
                        <b-col lg="9" class="p-0">
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
                        <b-col lg="9" class="p-0">
                            <b-form-textarea
                                    id="addFilmText"
                                    size="sm"
                                    v-model="text"
                                    placeholder="Enter something..."
                                    rows="3"
                                    class="input"
                            ></b-form-textarea>
                        </b-col>
                    </b-row>
                </b-container>
            </b-col>
        </b-form-row>
        <hr>
        <div class="text-right">
            <b-button variant="secondary" size="sm">Cancel</b-button>
            <b-button variant="primary" size="sm" class="ml-2">Save</b-button>
        </div>
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
            noPoster: 'https://firebasestorage.googleapis.com/v0/b/films-2c182.appspot.com/o/posters%2Fposter_none.png?alt=media&token=94d71653-1616-4b6f-9f61-0558aa06f1ce',
            genres: [],
            genresArray: [],
            selected: null
        }
    },
    mounted() {
        databaseService.getGenres().then(data => {
            this.genres =  data;
            this.genresArray.push({selected: '', genres: this.genres});
        });

    },
    methods: {
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
</style>
