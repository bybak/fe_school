<template>
  <div id="oneFilm">

    <h1>Movie collection of User</h1>

    <b-form-row>
      <b-col lg="3">

        <div>
          <b-card
                  no-body
          >
            <img src="../../pictures/pic/1.jpg" class="card-img-top" alt="Card image">

            <b-card-body>
              <a href="#">Copy to my collection</a>
            </b-card-body>

          </b-card>
        </div>

      </b-col>
      <b-col lg="9">
        <h2>Back to the Future</h2>

        <b-list-group flush>
          <b-list-group-item v-for="item in items" class="d-flex justify-content-between align-items-center">
            <span>{{item.field}}</span>
            <span>{{item.value}}</span>
          </b-list-group-item>
        </b-list-group>

      </b-col>
    </b-form-row>

    <b-form-row class="mt-3">
      <b-col lg="9">
        <h2>Comments</h2>

        <b-form-textarea
                id="textarea"
                v-model="text"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
        />
        <b-button variant="outline-primary" class="mt-2">Publish</b-button>

        <hr>

        <b-card
                no-body
        >

          <b-card-body>
            <b-form-row>
              <b-col lg="2" class="text-center">
                <i class="fas fa-user fa-3x"></i>
              </b-col>
              <b-col lg="10">
                <span>User, 01.01.2019</span>
                <hr>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at sagittis enim. Sed maximus, justo a dapibus rhoncus, tellus velit ullamcorper metus, sit amet imperdiet metus libero sit amet nisl. Etiam quis lectus sed nisl interdum suscipit. Pellentesque auctor sodales leo, sed ultrices mi. Donec maximus interdum nibh, non iaculis tellus bibendum in. Integer ultricies mi ut erat vulputate, in rutrum felis sodales. Pellentesque cursus feugiat sapien, id condimentum orci faucibus et. Cras rhoncus elit velit, quis euismod lectus scelerisque in. Aenean vel metus a lectus sagittis cursus sed ac massa.
                </p>
              </b-col>
            </b-form-row>
          </b-card-body>

        </b-card>
      </b-col>
    </b-form-row>

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
