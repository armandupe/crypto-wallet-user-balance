<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/logo.svg')"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <CryptoCurrencyCard />
    </v-main>
  </v-app>
</template>

<script>
import CryptoCurrencyCard from "./components/CryptoCurrencyCard";

export default {
  name: "App",

  components: {
    CryptoCurrencyCard,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
html,
body {
  height: 100vh;
}
</style>
