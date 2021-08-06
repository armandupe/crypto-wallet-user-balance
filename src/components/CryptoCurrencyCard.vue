<template>
  <v-container>
    <v-row class="currencies-list">
      <v-col v-for="card in cards" :key="card.id" cols="4">
        <v-card elevation="2">
          <div class="d-flex flex-column pa-4">
            <div class="d-flex mb-3">
              <h2 class="currency-title mr-0 mr-md-2">{{ card.currencyTitle }}</h2>
              <span class="currency-balance align-self-center text-h5 font-weight-bold">{{
                card.currencyBalance
              }}</span>
            </div>
            <div class="btn-add d-flex">
              <v-btn
                :id="card.id"
                @click="increaseCurrencyBalance(10)"
                color="primary"
                class="currency-add mr-0 mr-md-2"
                elevation="2"
                >{{ currencyAddMsg }}</v-btn
              >
              <v-btn class="currency-withdrawal" elevation="2">{{ currencyWithdrawalMsg }}</v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <Form />
  </v-container>
</template>

<script>
import Form from "./Form";

export default {
  name: "CryptoCurrencyCard",
  components: {
    Form,
  },

  data: () => ({
    currencyAddMsg: "Ввод",
    currencyWithdrawalMsg: "Вывод",
    cards: [
      {
        currencyTitle: "BTS",
        currencyBalance: 0.001,
        id: 1,
      },
      {
        currencyTitle: "USD",
        currencyBalance: 100,
        id: 2,
      },
      {
        currencyTitle: "DOGE",
        currencyBalance: 0,
        id: 3,
      },
      {
        currencyTitle: "LTC",
        currencyBalance: 0,
        id: 4,
      },
      {
        currencyTitle: "SHIB",
        currencyBalance: 0,
        id: 5,
      },
      {
        currencyTitle: "RUB",
        currencyBalance: 0,
        id: 6,
      },
      {
        currencyTitle: "BNB",
        currencyBalance: 0,
        id: 7,
      },
    ],
  }),
  methods: {
    increaseCurrencyBalance(val) {
      this.$store.dispatch("increaseBalance", val);
      document.querySelector(".currency-balance").textContent = this.$store.getters.getBalance;
    },
  },
  mounted() {
    // const currenciesList = document.querySelector(".currencies-list");
    // const btnsList = document.querySelectorAll(".btn-add");
    // btnsList.forEach((btn) =>
    //   btn.addEventListener("click", (e) => {
    //     if (e.target) {
    //       const allBalances = document.querySelectorAll(".currency-balance");
    //       allBalances.forEach((currentBalance) => {
    //         currentBalance.textContent = this.$store.getters.getBalance;
    //       });
    //     }
    //   }),
    // );
    // currenciesList.addEventListener("click", (e) => {
    //   console.log(e);
    //   if (e.target) {
    //     // this.increaseCurrencyBalance(10);
    //     document.querySelector(".currency-balance").textContent = 10;
    //   }
    // });
  },
};
</script>

<style lang="scss" scoped>
.currency-balance {
  color: #00897b;
}
</style>
