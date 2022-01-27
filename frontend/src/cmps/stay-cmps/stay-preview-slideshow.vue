<template>
  <section class="preview-slideshow">
    <div class="block">
      <el-carousel
        trigger="click"
        height="262.250px"
        width="362px"
        :autoplay="false"
        :loop="false"
      >
        <el-carousel-item v-for="image in imgs" :key="image">
          <img :src="image" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </section>
</template>

<script>
export default {
  name: "stayPreviewSlideshow",
  props: {
    imgs: {
      type: Array,
      default: {},
    },
  },
};
</script>
