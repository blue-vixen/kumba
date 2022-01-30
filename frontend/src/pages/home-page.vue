<template>
    <section class="home-page main-layout2">
        <section class="main-hero full">
            <h1>Not sure where to go? Perfect.</h1>
            <button class="gray-box-shadow clickable" @click="goExplore">
                <h3>I'm flexible</h3>
            </button>
        </section>
        <h1 class="dest-header">Popular Destinations</h1>
        <section class="dest-container">
            <div class="gallery-container">
                <section class="dest-gallery">
                    <router-link v-for="destination in destinations" :key="destination.name" :to="`/explore?destination=${destination.name}`">
                        <img :src="require(`../assets/images/${destination.imgUrl}`)" />
                        <h3>{{ destination.name }}</h3>
                    </router-link>
                </section>
            </div>
        </section>
        <h1 class="tr-header">Top Rated</h1>
        <section class="toprated-container">
            <section class="top-rated-gallery">
                <router-link v-for="stay in topRated" :key="stay.id" :to="`/stay/${stay.id}`">
                    <img :src="require(`../assets/images/${stay.imgUrl}`)" />
                    <h3>{{ stay.name }}</h3>
                </router-link>
            </section>
        </section>
        <section class="host-container full">
            <section class="host">
                <h1>Become a host!</h1>

                <button class="clickable" @click="goHost">
                    <h3>Learn more</h3>
                </button>
            </section>
        </section>
    </section>
</template>

<script>
export default {
    data() {
        return {
            destinations: [
                { name: "New York", imgUrl: "NY2.jpg" },
                { name: "Santorini", imgUrl: "SAN4.jpg" },
                { name: "Tel Aviv", imgUrl: "NY2.jpg" },
                { name: "Paris", imgUrl: "paris.jpg" },
            ],
            topRated: [
                { name: "Neve Tsedek area - Cosy and sunny", id: "61b21619dcbbeca56b4e124e", imgUrl: "tr1.jpg" },
                { name: "Magnifique Appart, Paris, France", id: "61b215f3dcbbeca56b4e0549", imgUrl: "tr2.jpeg" },
                { name: "Lava Cave suite, Greece", id: "61b21585dcbbeca56b4dd121", imgUrl: "tr4.jpg" },
                { name: "Sky The Lodge, Santorini", id: "61b2155ddcbbeca56b4dbe47", imgUrl: "tr3.jpeg" },
            ],
        };
    },
    created() {
        const page = "homePage";
        this.$store.commit({ type: "setCurrPage", page });
    },
    methods: {
        goExplore() {
            this.$router.push("/explore").catch(() => {});
        },
        goHost() {
            this.$router.push("/host").catch(() => {});
        },
    },
};
</script>

<style>
</style>