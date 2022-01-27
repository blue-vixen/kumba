<template>
  <section>
    <div class="stay-description gray-box-shadow">
      <h2 class="description-header">Stay description</h2>
      <h4 class="stay-description-text">{{ stay.description }}</h4>
      <div id="ameneties"></div>
    </div>

    <section class="stay-amenities">
      <h2 class="amenities-header">Amenities</h2>
      <ul class="amenities-list clean-list flex">
        <li
          v-for="(amenity, idx) in stay.amenities"
          :key="idx"
          class="amenity-list clean-list"
        >
          <div class="amenity-container flex">
            <span class="material-icons-outlined"> {{ amenity.logo }} </span>
            <h5>
              {{ amenity.name }}
            </h5>
          </div>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
export default {
  name: "stayDescription",
  props: {
    stay: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style>
</style>