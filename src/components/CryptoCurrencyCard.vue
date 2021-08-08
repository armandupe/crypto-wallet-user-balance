<template>
  <v-container>
    <v-row class="currencies-list">
      <v-col v-for="card in cards" :key="card.id" cols="4">
        <v-card class="card-currency" :id="card.currencyTitle" elevation="2">
          <div class="d-flex flex-column pa-4">
            <div class="d-flex mb-3">
              <h2 class="currency-title mr-0 mr-md-2">{{ card.currencyTitle }}</h2>
              <span
                :id="card.currencyTitle"
                :data-commission="card.currencyCommissionTitle"
                class="currency-balance align-self-center text-h5 font-weight-bold"
                >{{ card.currencyBalance }}</span
              >
            </div>
            <div class="btn-add d-flex">
              <v-btn
                :id="card.currencyTitle"
                :data-commission-value="card.currencyCommissionTitle"
                :data-min-value="card.minValue"
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
      <v-col v-show="isFormShow" cols="12">
        <form class="form">
          <div class="row">
            <div class="col-6">
              <v-text-field class="form__input-value" v-model="amount" label="Сумма" required></v-text-field>
              <p class="input-value-error error--text" v-show="isInputValueErr"></p>
              <p class="commission"></p>
            </div>
            <div v-if="isAdd" class="col-6">
              <v-text-field v-model="address" label="Адрес" required></v-text-field>
            </div>
            <div class="col-12">
              <v-textarea label="Комментарий"></v-textarea>
            </div>
            <v-btn class="form__submit mr-4" @click="submit"> Ввести </v-btn>
            <v-btn @click="clear"> Закрыть </v-btn>
          </div>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CryptoCurrencyCard",

  data: () => ({
    amount: "",
    address: "",
    requisites: "",
    currencyAddMsg: "Ввод",
    currencyWithdrawalMsg: "Вывод",
    isFormShow: false,
    isInputValueErr: false,
    isAdd: false,
    isFiat: false,
    isCrypto: true,
    cards: [
      {
        currencyTitle: "BTS",
        currencyBalance: 0.001,
        currencyCommissionTitle: "5%",
        minValue: 0.001,
        id: 1,
      },
      {
        currencyTitle: "USD",
        currencyBalance: 100,
        currencyCommissionTitle: "5%",
        minValue: 100,
        id: 2,
      },
      {
        currencyTitle: "DOGE",
        currencyBalance: 0,
        currencyCommissionTitle: "0.5 DOGE",
        minValue: 5,
        id: 3,
      },
      {
        currencyTitle: "LTC",
        currencyBalance: 0,
        currencyCommissionTitle: "0.5 LTC",
        minValue: 1,
        id: 4,
      },
      {
        currencyTitle: "SHIB",
        currencyBalance: 0,
        currencyCommissionTitle: "10 SHIB",
        minValue: 500,
        id: 5,
      },
      {
        currencyTitle: "RUR",
        currencyBalance: 0,
        currencyCommissionTitle: "0%",
        minValue: 10000,
        id: 6,
      },
      {
        currencyTitle: "BNB",
        currencyBalance: 0,
        currencyCommissionTitle: "0.01 BNB",
        minValue: 0.15,
        id: 7,
      },
    ],
  }),
  methods: {
    // increaseCurrencyBalance(val) {
    //   this.$store.dispatch("increaseBalance", val);
    //   document.querySelector(".currency-balance").textContent = this.$store.getters.getBalance;
    // },

    submit() {
      const submitBtn = document.querySelector(".form__submit");
      const form = document.querySelector(".form");

      if (!form.checkValidity) {
        submitBtn.classList.add("v-btn--disabled");
        submitBtn.disabled = true;
      } else {
        submitBtn.classList.remove("v-btn--disabled");
        submitBtn.disabled = false;
      }
    },
    clear() {
      this.$v.$reset();
      this.amount = "";
      this.address = "";
      this.requisites = "";

      this.isFormShow = false;
    },
  },
  computed: {},
  mounted() {
    const showForm = () => {
      const btnsAdd = document.querySelectorAll(".currency-add");
      const form = document.querySelector(".form");
      const submit = document.querySelector(".form__submit");
      btnsAdd.forEach((btnAdd) => {
        btnAdd.addEventListener("click", (e) => {
          if (e.target.id === btnAdd.id) {
            const cards = document.querySelectorAll(".card-currency");
            cards.forEach((card) => {
              if (btnAdd.id === card.id) {
                card.classList.add("current-currency-card");
              } else {
                card.classList.remove("current-currency-card");
              }
            });

            this.isFormShow = true;
            form.id = e.target.id;
            submit.id = e.target.id;

            const allCommissions = document.querySelectorAll(".commission");
            allCommissions.forEach((el) => {
              el.textContent = `Коммиссия: ${e.target.dataset.commissionValue}`;
            });
          }
        });
      });
    };
    showForm();

    const validateInput = () => {
      const form = document.querySelector(".form");
      const inputValue = document.querySelector(".form__input-value input");
      const inputValueError = document.querySelector(".input-value-error");
      inputValue.addEventListener("input", (e) => {
        if (form.id === "BTS" && +e.target.value < 0.001) {
          this.isInputValueErr = true;
          inputValueError.textContent = `Минимальная сумма: 0.001 BTC`;
        } else if (form.id === "USD" && +e.target.value < 100) {
          this.isInputValueErr = true;
          inputValueError.textContent = `Минимальная сумма: 100 USD`;
        } else if (form.id === "DOGE" && +e.target.value < 5) {
          this.isInputValueErr = true;
          inputValueError.textContent = `Минимальная сумма: 5 DOGE`;
        } else if (form.id === "LTC" && +e.target.value < 1) {
          this.isInputValueErr = true;
          inputValueError.textContent = `Минимальная сумма: 1 LTC`;
        } else if (form.id === "SHIB" && +e.target.value < 500) {
          this.isInputValueErr = true;
          inputValueError.textContent = `Минимальная сумма: 500 SHIB`;
        } else if (form.id === "RUR" && +e.target.value < 10000) {
          this.isInputValueErr = true;
          inputValueError.textContent = `Минимальная сумма: 10000 RUR`;
        } else if (form.id === "BNB" && +e.target.value < 0.15) {
          this.isInputValueErr = true;
          inputValueError.textContent = `Минимальная сумма: 0.15 BNB`;
        } else {
          this.isInputValueErr = false;
        }
      });
    };
    validateInput();

    const addToBalance = () => {
      // const form = document.querySelector(".form");
      const inputValue = document.querySelector(".form__input-value input");
      const submit = document.querySelector(".form__submit");
      const allBalances = document.querySelectorAll(".currency-balance");
      inputValue.addEventListener("change", (e) => {
        const inputVal = e.target.value;

        submit.addEventListener("click", () => {
          allBalances.forEach((balance) => {
            if (balance.id === "BTS" && balance.id === submit.id) {
              let currentBalance = +balance.textContent;
              balance.textContent = currentBalance + +inputVal - (inputVal / 100) * 5;
            } else if (balance.id === "USD" && balance.id === submit.id) {
              let currentBalance = +balance.textContent;
              balance.textContent = currentBalance + +inputVal - (inputVal / 100) * 5;
            } else if (balance.id === "DOGE" && balance.id === submit.id) {
              let currentBalance = +balance.textContent;
              balance.textContent = currentBalance + +inputVal - 0.5;
            } else if (balance.id === "LTC" && balance.id === submit.id) {
              let currentBalance = +balance.textContent;
              balance.textContent = currentBalance + +inputVal - 0.5;
            } else if (balance.id === "SHIB" && balance.id === submit.id) {
              let currentBalance = +balance.textContent;
              balance.textContent = currentBalance + +inputVal - 10;
            } else if (balance.id === "RUR" && balance.id === submit.id) {
              let currentBalance = +balance.textContent;
              balance.textContent = currentBalance + +inputVal;
            } else if (balance.id === "BNB" && balance.id === submit.id) {
              let currentBalance = +balance.textContent;
              balance.textContent = currentBalance + +inputVal - 0.01;
            }
          });
        });
      });
    };
    addToBalance();
  },
};
</script>

<style lang="scss" scoped>
.currency-balance {
  color: #00897b;
}
.current-currency-card {
  outline: 1px solid #00897b;
}
</style>
