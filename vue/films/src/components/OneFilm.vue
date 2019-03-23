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
              <div v-for="item in items">
                <b-form-row>
                  <b-col lg="2">
                    <span class="font-weight-bold">{{item.field}}</span>
                  </b-col>
                  <b-col lg="10">
                    <span>{{item.value}}</span>
                  </b-col>
                </b-form-row>
                <hr class="mt-1 mb-1">
              </div>
            </b-card-text>

            <b-card-text class="text-white-50">
              Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.
            </b-card-text>

          </b-card-body>
        </b-col>
      </b-row>
    </b-card>

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
          <b-col lg="1">
            <img class="rounded" src="../../pictures/pic/2.jpg" alt="Card image" style="border-radius: 3px; max-height: 120px;">
          </b-col>
          <b-col lg="11">
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
          <b-col lg="1">
            <img class="rounded" src="../../pictures/pic/1.jpg" alt="Card image" style="border-radius: 3px; max-height: 120px;">
          </b-col>
          <b-col lg="11">
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
export default {
    name: 'oneFilm',
    data() {
        return {
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
