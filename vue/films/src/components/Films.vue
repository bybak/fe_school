<template>
  <div id="films">

    <b-form-row>
      <b-col lg="4" sm="12">

        <b-card
                title="Card Title"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                style=""
                class="mb-2"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>

          <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>

      </b-col>
    </b-form-row>

  </div>
</template>

<script>
export default {
    name: 'films'
}
</script>

<style>
</style>
