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
            <b-button variant="outline-primary"><i class="fas fa-grip-horizontal"></i></b-button>
            <b-button variant="outline-primary"><i class="fas fa-bars"></i></b-button>
          </b-button-group>
        </div>
      </div>
    </b-card>

    <b-form-row>
      <b-col lg="4" sm="12">

        <b-card
                title="Back to the Future"
                class="mb-2 text-left"
        >
          <hr class="m-2">
          <b-form-row>
            <b-col lg="4" class="text-center">
              <img src="../../pictures/pic/1.jpg"  alt="Card image" style="border-radius: 3px; max-height: 140px;">
            </b-col>
            <b-col lg="8" class="d-flex align-items-start flex-column">
              <div class="mb-auto w-100">
                <span>Year: </span>
                <small>1985</small>
                <br/>
                <span>Genres: </span>
                <small>Adventure | Comedy | Sci-Fi</small>
              </div>
              <b-button to="/film" size="sm" variant="outline-primary" class="mt-2">More</b-button>
            </b-col>
          </b-form-row>
        </b-card>

      </b-col>
    </b-form-row>

  </div>
</template>

<script>
export default {
    name: 'films',
    data() {
        return {
            selected: null
        }
    }
}
</script>

<style>
</style>
