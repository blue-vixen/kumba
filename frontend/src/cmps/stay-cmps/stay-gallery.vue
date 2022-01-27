<template>
   <section class="stay-gallery">
      <img
        v-for="(img, idx) in stay.imgUrls"
        :key="idx"
        class="img-container clean-list"
        :src="img"
        alt=""
      />
    </section>
</template>

<script>
export default {
name: "stayGallery",
  props: {
    stay: {
      type: Object,
      default: {},
    },
  },
}
</script>

<style>

</style>