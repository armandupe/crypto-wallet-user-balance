<template>
  <v-container>
    <v-row class="currencies-list">
      <v-col v-for="card in cards" :key="card.id" sm="4" cols="12">
        <v-card class="card-currency" :id="card.currencyTitle" elevation="2">
          <div class="d-flex flex-column pa-4">
            <div class="d-flex mb-3">
              <h2 class="currency-title mr-2">{{ card.currencyTitle }}</h2>
              <span
                :id="card.currencyTitle"
                :data-commission="card.currencyCommissionTitle"
                class="
                  currency-balance
                  align-self-center
                  text-h5
                  font-weight-bold
                "
                >{{ card.currencyBalance }}</span
              >
            </div>
            <div class="btn-add flex-wrap d-flex">
              <v-btn
                :id="card.currencyTitle"
                :data-commission-value="card.currencyCommissionTitle"
                :data-min-value="card.minValue"
                color="primary"
                class="currency-add mb-2 mr-2"
                @click="showForm"
                elevation="2"
                >{{ currencyAddMsg }}</v-btn
              >
              <v-btn
                class="currency-withdrawal"
                :id="card.currencyTitle"
                :data-commission-value="card.currencyCommissionTitle"
                @click="showForm"
                elevation="2"
                >{{ currencyWithdrawalMsg }}</v-btn
              >
            </div>
            <div class="d-flex justify-center">
              <v-img
                class="img-currency"
                contain
                max-height="60"
                max-width="60"
                :src="require(`../assets/${card.currencyTitle}.svg`)"
              ></v-img>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-alert
          v-if="isErrorShow"
          dense
          elevation="6"
          prominent
          type="error"
          >{{ errorWithdrawalMsg }}</v-alert
        >
      </v-col>
      <v-col v-show="isFormAddShow" cols="12">
        <form class="form-add form mb-15">
          <v-row>
            <v-col cols="12">
              <v-text-field
                solo
                class="form-add__input-value"
                @input="validateInput"
                v-model="amount"
                label="Сумма"
                required
              ></v-text-field>
              <v-alert
                class="input-value-error mb-0"
                v-show="isInputValueErr"
                dense
                elevation="6"
                prominent
                type="error"
              ></v-alert>
            </v-col>
            <v-col sm="3" cols="12">
              <v-alert
                color="orange"
                dense
                class="commission mb-0"
                elevation="3"
                type="warning"
              ></v-alert>
            </v-col>
            <v-col cols="12">
              <v-textarea
                rows="1"
                row-height="15"
                filled
                label="Комментарий"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-btn
                @click="addToBalance"
                class="form-add__submit form-btn mr-4"
              >
                Ввести
              </v-btn>
              <v-btn @click="closeForm"> Закрыть </v-btn>
            </v-col>
          </v-row>
        </form>
      </v-col>
      <v-col v-show="isFormWithdrawalShow" cols="12">
        <form class="form-withdrawal form mb-15">
          <v-row>
            <v-col cols="12">
              <v-text-field
                solo
                class="form-withdrawal__input-value"
                v-model="amount"
                label="Сумма"
                @input="validateInput"
                required
              ></v-text-field>
              <v-alert
                class="input-value-error mb-0"
                v-show="isInputValueErr"
                dense
                elevation="6"
                prominent
                type="error"
              ></v-alert>
            </v-col>
            <v-col sm="3" cols="12">
              <v-alert
                color="orange"
                dense
                class="commission mb-0"
                elevation="3"
                type="warning"
              ></v-alert>
            </v-col>
            <v-col v-if="isCrypto" cols="12">
              <v-text-field
                solo
                v-model="address"
                label="Адрес"
                required
              ></v-text-field>
            </v-col>
            <v-col v-if="isFiat" cols="12">
              <v-text-field
                solo
                v-model="requisites"
                label="Реквизиты"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                rows="1"
                row-height="15"
                filled
                label="Комментарий"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-btn
                @click="withdrawalFromBalance"
                class="form-withdrawal__submit form-btn mr-4"
              >
                Вывести
              </v-btn>
              <v-btn @click="closeForm"> Закрыть </v-btn>
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CryptoCurrencyCard",

  data: () => ({
    isErrorShow: false,
    errorWithdrawalMsg: "Нельзя вывести больше чем есть на балансе!",
    amount: "",
    address: "",
    requisites: "",
    currencyAddMsg: "Ввод",
    currencyWithdrawalMsg: "Вывод",
    isFormAddShow: false,
    isFormWithdrawalShow: false,
    isInputValueErr: false,
    isAdd: false,
    isFiat: false,
    isCrypto: true,
    dialog: false,
    cards: [
      {
        currencyTitle: "BTS",
        currencyBalance: 0,
        currencyCommissionTitle: "5%",
        minValue: 0.001,
        id: 1,
      },
      {
        currencyTitle: "USD",
        currencyBalance: 0,
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
    showForm(event) {
      const cards = document.querySelectorAll(".card-currency");
      const forms = document.querySelectorAll(".form");
      const submits = document.querySelectorAll(".form-btn");
      const allCommissions = document.querySelectorAll(".commission");

      if (event.currentTarget.classList.contains("currency-add")) {
        this.isFormAddShow = true;
        this.isFormWithdrawalShow = false;
      } else {
        this.isFormWithdrawalShow = true;
        this.isFormAddShow = false;
      }

      this.isErrorShow = false;

      cards.forEach((card) =>
        event.currentTarget.id === card.id
          ? card.classList.add("current-currency-card")
          : card.classList.remove("current-currency-card")
      );

      if (
        event.currentTarget.id === "USD" ||
        event.currentTarget.id === "RUR"
      ) {
        this.isFiat = true;
        this.isCrypto = false;
      } else {
        this.isFiat = false;
        this.isCrypto = true;
      }

      forms.forEach((form) => (form.id = event.currentTarget.id));

      submits.forEach((submit) => (submit.id = event.currentTarget.id));

      allCommissions.forEach(
        (el) =>
          (el.textContent = `Коммиссия: ${event.currentTarget.dataset.commissionValue}`)
      );
    },
    closeForm() {
      this.isFormAddShow = false;
      this.isFormWithdrawalShow = false;
      this.isErrorShow = false;
    },
    validateInput(inputValue) {
      const form = document.querySelector(".form-add");
      const inputValueError = document.querySelector(
        ".input-value-error .v-alert__content"
      );
      const submitBtn = document.querySelector(".form-add__submit");

      const regex = /^[0-9]*\.?[0-9]*$/;

      if (!inputValue.match(regex) || inputValue === "") {
        this.isInputValueErr = true;
        inputValueError.textContent = `Введите число!`;
        submitBtn.classList.add("v-btn--disabled");
        submitBtn.disabled = true;
      } else {
        this.isInputValueErr = false;
        if (form.id === "BTS" && +inputValue < 0.001) {
          this.isInputValueErr = true;
          inputValueError.textContent = `Минимальная сумма: 0.001 BTC`;
          submitBtn.classList.add("v-btn--disabled");
          submitBtn.disabled = true;
        } else if (form.id === "USD" && +inputValue < 100) {
          this.isInputValueErr = true;
          inputValueError.textContent = `Минимальная сумма: 100 USD`;
          submitBtn.classList.add("v-btn--disabled");
          submitBtn.disabled = true;
        } else if (form.id === "DOGE" && +inputValue < 5) {
          this.isInputValueErr = true;
          inputValueError.textContent = `Минимальная сумма: 5 DOGE`;
          submitBtn.classList.add("v-btn--disabled");
          submitBtn.disabled = true;
        } else if (form.id === "LTC" && +inputValue < 1) {
          this.isInputValueErr = true;
          inputValueError.textContent = `Минимальная сумма: 1 LTC`;
          submitBtn.classList.add("v-btn--disabled");
          submitBtn.disabled = true;
        } else if (form.id === "SHIB" && +inputValue < 500) {
          this.isInputValueErr = true;
          inputValueError.textContent = `Минимальная сумма: 500 SHIB`;
          submitBtn.classList.add("v-btn--disabled");
          submitBtn.disabled = true;
        } else if (form.id === "RUR" && +inputValue < 10000) {
          this.isInputValueErr = true;
          inputValueError.textContent = `Минимальная сумма: 10000 RUR`;
          submitBtn.classList.add("v-btn--disabled");
          submitBtn.disabled = true;
        } else if (form.id === "BNB" && +inputValue < 0.15) {
          this.isInputValueErr = true;
          inputValueError.textContent = `Минимальная сумма: 0.15 BNB`;
          submitBtn.classList.add("v-btn--disabled");
          submitBtn.disabled = true;
        } else {
          this.isInputValueErr = false;
          submitBtn.classList.remove("v-btn--disabled");
          submitBtn.disabled = false;
        }
      }
    },

    addToBalance(event) {
      const cards = document.querySelectorAll(".card-currency");
      const arrBalances = [];

      cards.forEach((card) => {
        if (card.classList.contains("current-currency-card")) {
          let balance = card.children[0].childNodes[0].childNodes[1];

          const input = document.querySelector(".form-add__input-value input");
          if (
            balance.id === "BTS" ||
            (balance.id === "USD" && balance.id === event.currentTarget.id)
          ) {
            balance.textContent = (
              +balance.textContent +
              +input.value -
              (input.value / 100) * 5
            ).toFixed(2);
          }

          if (
            balance.id === "DOGE" ||
            (balance.id === "LTC" && balance.id === event.currentTarget.id)
          ) {
            balance.textContent = (
              +balance.textContent +
              +input.value -
              0.5
            ).toFixed(2);
          }

          if (balance.id === "SHIB" && balance.id === event.currentTarget.id) {
            balance.textContent = (
              +balance.textContent +
              +input.value -
              10
            ).toFixed(2);
          }

          if (balance.id === "RUR" && balance.id === event.currentTarget.id) {
            balance.textContent = (+balance.textContent + +input.value).toFixed(
              2
            );
          }

          if (balance.id === "BNB" && balance.id === event.currentTarget.id) {
            balance.textContent = (
              +balance.textContent +
              +input.value -
              0.01
            ).toFixed(2);
          }
        }

        arrBalances.push(
          card.children[0].childNodes[0].childNodes[1].textContent
        );
      });

      const payload = {
        BTS: arrBalances[0],
        USD: arrBalances[1],
        DOGE: arrBalances[2],
        LTC: arrBalances[3],
        SHIB: arrBalances[4],
        RUR: arrBalances[5],
        BNB: arrBalances[6],
      };

      this.$store.dispatch("changeBalance", payload);
    },
    withdrawalFromBalance(event) {
      const cards = document.querySelectorAll(".card-currency");
      const arrBalances = [];

      cards.forEach((card) => {
        if (card.classList.contains("current-currency-card")) {
          let balance = card.children[0].childNodes[0].childNodes[1];
          const input = document.querySelector(".form-add__input-value input");

          if (
            balance.id === "BTS" ||
            (balance.id === "USD" && balance.id === event.currentTarget.id)
          ) {
            let currentBalance = +balance.textContent;
            let valueWithComission = +input.value - (input.value / 100) * 5;
            if (currentBalance > valueWithComission) {
              this.isErrorShow = false;
              let result = currentBalance - valueWithComission;
              balance.textContent = result.toFixed(2);
            } else {
              this.isErrorShow = true;
            }
          }

          if (
            balance.id === "DOGE" ||
            (balance.id === "LTC" && balance.id === event.currentTarget.id)
          ) {
            let currentBalance = +balance.textContent;
            let valueWithComission = +input.value - 0.5;
            if (currentBalance > valueWithComission) {
              this.isErrorShow = false;
              let result = currentBalance - valueWithComission;
              balance.textContent = result.toFixed(2);
            } else {
              this.isErrorShow = true;
            }
          }

          if (balance.id === "SHIB" && balance.id === event.currentTarget.id) {
            let currentBalance = +balance.textContent;
            let valueWithComission = +input.value - 10;
            if (currentBalance > valueWithComission) {
              this.isErrorShow = false;
              let result = currentBalance - valueWithComission;
              balance.textContent = result.toFixed(2);
            } else {
              this.isErrorShow = true;
            }
          }

          if (balance.id === "RUR" && balance.id === event.currentTarget.id) {
            let currentBalance = +balance.textContent;
            if (currentBalance > +input.value) {
              this.isErrorShow = false;
              let result = currentBalance - +input.value;
              balance.textContent = result.toFixed(2);
            } else {
              this.isErrorShow = true;
            }
          }

          if (balance.id === "BNB" && balance.id === event.currentTarget.id) {
            let currentBalance = +balance.textContent;
            let valueWithComission = +input.value - 0.01;
            if (currentBalance > valueWithComission) {
              this.isErrorShow = false;
              let result = currentBalance - valueWithComission;
              balance.textContent = result.toFixed(2);
            } else {
              this.isErrorShow = true;
            }
          }
        }
        arrBalances.push(
          card.children[0].childNodes[0].childNodes[1].textContent
        );
      });

      const payload = {
        BTS: arrBalances[0],
        USD: arrBalances[1],
        DOGE: arrBalances[2],
        LTC: arrBalances[3],
        SHIB: arrBalances[4],
        RUR: arrBalances[5],
        BNB: arrBalances[6],
      };

      this.$store.dispatch("changeBalance", payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.container::v-deep {
  max-width: 920px;
}
.img-currency {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
.currency-balance {
  color: #00897b;
}
.current-currency-card {
  outline: 3px solid #1779da;
}
</style>
