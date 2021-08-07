<template>
  <v-container>
    <v-row class="currencies-list">
      <v-col v-for="card in cards" :key="card.id" cols="4">
        <v-card elevation="2">
          <div class="d-flex flex-column pa-4">
            <div class="d-flex mb-3">
              <h2 class="currency-title mr-0 mr-md-2">{{ card.currencyTitle }}</h2>
              <span :id="card.currencyTitle" class="currency-balance align-self-center text-h5 font-weight-bold">{{
                card.currencyBalance
              }}</span>
            </div>
            <div class="btn-add d-flex">
              <v-btn :id="card.currencyTitle" color="primary" class="currency-add mr-0 mr-md-2" elevation="2">{{
                currencyAddMsg
              }}</v-btn>
              <v-btn class="currency-withdrawal" elevation="2">{{ currencyWithdrawalMsg }}</v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col v-for="form in forms" :key="form.id" cols="12">
        <form class="form d-none" :id="form.id">
          <div class="row">
            <div class="col-6">
              <v-text-field
                class="form__input-value"
                v-model="amount"
                :error-messages="amountErrors"
                :counter="10"
                label="Сумма"
                required
                @input="$v.amount.$touch()"
                @blur="$v.amount.$touch()"
              ></v-text-field>
              <p class="commission">Коммиссия: {{ form.currencyCommissionTitle }}</p>
            </div>

            <div v-if="form.id !== 'USD' || (form.id !== 'RUR' && isCrypto)" class="col-6">
              <v-text-field
                v-model="address"
                :error-messages="addressErrors"
                label="Адрес"
                required
                @input="$v.address.$touch()"
                @blur="$v.address.$touch()"
              ></v-text-field>
            </div>
            <div v-if="form.id === 'USD' || (form.id === 'RUR' && isFiat)" class="col-6">
              <v-text-field
                class="form__requisites"
                v-model="requisites"
                :error-messages="requisitesErrors"
                label="Реквизиты"
                required
                @input="$v.requisites.$touch()"
                @blur="$v.requisites.$touch()"
              ></v-text-field>
            </div>
            <div class="col-12">
              <v-textarea label="Комментарий"></v-textarea>
            </div>
            <v-btn :id="form.id" class="form__submit mr-4" @click="submit"> Ввести </v-btn>
            <v-btn @click="clear"> Закрыть </v-btn>
          </div>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, numeric, minValue } from "vuelidate/lib/validators";

export default {
  name: "CryptoCurrencyCard",
  mixins: [validationMixin],
  validations: {
    amount: { required, numeric, minValue: minValue(10) },
    address: { required },
    requisites: { required },
  },

  data: () => ({
    amount: "",
    address: "",
    requisites: "",
    currencyAddMsg: "Ввод",
    currencyWithdrawalMsg: "Вывод",
    // isFormShow: false,
    isFiat: false,
    isCrypto: true,
    cards: [
      {
        currencyTitle: "BTS",
        currencyBalance: 0.001,
        minValue: 0.001,
        id: 1,
      },
      {
        currencyTitle: "USD",
        currencyBalance: 100,
        minValue: 100,
        id: 2,
      },
      {
        currencyTitle: "DOGE",
        currencyBalance: 0,
        minValue: 5,
        id: 3,
      },
      {
        currencyTitle: "LTC",
        currencyBalance: 0,
        minValue: 1,
        id: 4,
      },
      {
        currencyTitle: "SHIB",
        currencyBalance: 0,
        minValue: 500,
        id: 5,
      },
      {
        currencyTitle: "RUR",
        currencyBalance: 0,
        minValue: 10000,
        id: 6,
      },
      {
        currencyTitle: "BNB",
        currencyBalance: 0,
        minValue: 0.15,
        id: 7,
      },
    ],
    forms: [
      { id: "BTS", currencyCommissionTitle: "5%" },
      { id: "USD", currencyCommissionTitle: "5%" },
      { id: "DOGE", currencyCommissionTitle: "0.5 DOGE" },
      { id: "LTC", currencyCommissionTitle: "0.5 LTC" },
      { id: "SHIB", currencyCommissionTitle: "10 SHIB" },
      { id: "RUR", currencyCommissionTitle: "0%" },
      { id: "BNB", currencyCommissionTitle: "0.01 BND" },
    ],
  }),
  methods: {
    // increaseCurrencyBalance(val) {
    //   this.$store.dispatch("increaseBalance", val);
    //   document.querySelector(".currency-balance").textContent = this.$store.getters.getBalance;
    // },

    submit() {
      this.$v.$touch();
      // const submitBtns = document.querySelectorAll(".form__submit");

      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        // submitBtns.forEach((btn) => {
        //   btn.classList.add("v-btn--disabled");
        //   btn.disabled = true;
        // });
      } else {
        this.submitStatus = "PENDING";

        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
    clear() {
      this.$v.$reset();
      this.amount = "";
      this.address = "";
      this.requisites = "";

      const forms = document.querySelectorAll(".form");
      forms.forEach((form) => {
        form.classList.add("d-none");
      });
    },
  },
  computed: {
    amountErrors() {
      const errors = [];
      if (!this.$v.amount.$dirty) return errors;
      !this.$v.amount.minValue && errors.push(`Минимальная сумма ${this.minValue}`);
      !this.$v.amount.required && errors.push("Введите сумму");
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.address.$dirty) return errors;
      !this.$v.address.required && errors.push("Введите адрес");
      return errors;
    },
    requisitesErrors() {
      const errors = [];
      if (!this.$v.requisites.$dirty) return errors;
      !this.$v.requisites.required && errors.push("Введите реквизиты");
      return errors;
    },
  },
  mounted() {
    const btnsAdd = document.querySelectorAll(".currency-add");
    const forms = document.querySelectorAll(".form");
    btnsAdd.forEach((btnAdd) => {
      btnAdd.addEventListener("click", (e) => {
        // console.log(e.target);
        if (e.target.id === btnAdd.id) {
          forms.forEach((form) => {
            if (btnAdd.id === form.id) {
              // this.isFormShow = true;
              // const allRequisites = document.querySelectorAll(".form__requisites");
              // allRequisites.forEach((el) => {
              console.log(form.id);
              if (form.id === "USD" || form.id === "RUR") {
                // el.classList.remove("d-none");
                this.isFiat = true;
                this.isCrypto = false;
              } else {
                this.isCrypto = true;
              }
              // });

              form.classList.toggle("d-none");
            }
          });
        }
      });
    });

    const formInputValues = document.querySelectorAll(".form__input-value");
    const submitBtns = document.querySelectorAll(".form__submit");
    console.log(formInputValues);
    formInputValues.forEach((input) => {
      input.addEventListener("change", () => {
        if (input.classList.contains("error--text")) {
          submitBtns.forEach((btn) => {
            btn.classList.add("v-btn--disabled");
            btn.disabled = true;
          });
        } else {
          submitBtns.forEach((btn) => {
            btn.classList.remove("v-btn--disabled");
            btn.disabled = false;
          });
        }
      });
    });

    const allInputs = document.querySelectorAll(".form__input-value input");
    const allSubmits = document.querySelectorAll(".form__submit");
    const allBalances = document.querySelectorAll(".currency-balance");
    allInputs.forEach((input) => {
      input.addEventListener("change", (e) => {
        // console.log(`${e.target.id}; value= ${e.target.value}`);
        const inputVal = e.target.value;

        allSubmits.forEach((submit) => {
          submit.addEventListener("click", () => {
            allBalances.forEach((balance) => {
              if (balance.id === submit.id) {
                this.forms.forEach((el) => {
                  if (el.id === submit.id) {
                    let currentBalance = +balance.textContent;
                    let valueWithCommission = 0;
                    switch (el.currencyCommissionTitle) {
                      case "5%":
                        valueWithCommission = +inputVal - (inputVal / 100) * 5;
                        balance.textContent = currentBalance + valueWithCommission;
                        break;
                      case "0.5 DOGE":
                        valueWithCommission = +inputVal - 0.5;
                        balance.textContent = currentBalance + valueWithCommission;
                        break;
                      case "0.5 LTC":
                        valueWithCommission = +inputVal - 0.5;
                        balance.textContent = currentBalance + valueWithCommission;
                        break;
                      case "10 SHIB":
                        valueWithCommission = +inputVal - 10;
                        balance.textContent = currentBalance + valueWithCommission;
                        break;
                      case "0%":
                        balance.textContent = currentBalance + +inputVal;
                        break;
                      case "0.01 BND":
                        valueWithCommission = +inputVal - 0.01;
                        balance.textContent = currentBalance + valueWithCommission;
                        break;
                    }
                  }
                });
              }
            });
          });
        });
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.currency-balance {
  color: #00897b;
}
</style>
