<template>
<section>
    <div class="review-preview-header flex">
        <img :src="review.by.imgUrl" alt="" class="host-img">
        <div class="review-preview-text-container">
            <h4>{{review.by.fullname}}</h4>
            <h5>{{review.date}}</h5>
        </div>

    </div>
    <span>{{ review.txt }}</span>
  </section>
</template>

<script>
export default {
  name: "reviewPreview",
  props: {
    review: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style>
</style>