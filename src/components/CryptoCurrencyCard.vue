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
            <div class="btn-add flex-wrap d-flex">
              <v-btn
                :id="card.currencyTitle"
                :data-commission-value="card.currencyCommissionTitle"
                :data-min-value="card.minValue"
                color="primary"
                class="currency-add mb-2 mr-0 mr-sm-2"
                elevation="2"
                >{{ currencyAddMsg }}</v-btn
              >
              <v-btn
                class="currency-withdrawal"
                :id="card.currencyTitle"
                :data-commission-value="card.currencyCommissionTitle"
                elevation="2"
                >{{ currencyWithdrawalMsg }}</v-btn
              >
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col v-show="isFormAddShow" cols="12">
        <form class="form-add mb-15">
          <div class="row">
            <div class="col-12">
              <v-text-field solo class="form-add__input-value" v-model="amount" label="Сумма" required></v-text-field>
              <p class="input-value-error error--text" v-show="isInputValueErr"></p>
              <p class="commission"></p>
            </div>
            <div class="col-12">
              <v-textarea filled label="Комментарий"></v-textarea>
            </div>
            <v-btn class="form-add__submit mr-4"> Ввести </v-btn>
            <v-btn @click="closeForm"> Закрыть </v-btn>
          </div>
        </form>
      </v-col>
      <v-col v-show="isFormWithdrawalShow" cols="12">
        <form class="form-withdrawal mb-15">
          <div class="row">
            <div class="col-12">
              <v-text-field
                solo
                class="form-withdrawal__input-value"
                v-model="amount"
                label="Сумма"
                required
              ></v-text-field>
              <p class="withdrawal-value-error error--text" v-show="isWithdrawalValueErr"></p>
              <p class="commission"></p>
            </div>
            <div v-if="isCrypto" class="col-12">
              <v-text-field solo v-model="address" label="Адрес" required></v-text-field>
            </div>
            <div v-if="isFiat" class="col-12">
              <v-text-field solo v-model="requisites" label="Реквизиты" required></v-text-field>
            </div>
            <div class="col-12">
              <v-textarea filled label="Комментарий"></v-textarea>
            </div>
            <v-btn class="form-withdrawal__submit mr-4"> Вывести </v-btn>
            <v-btn @click="closeForm"> Закрыть </v-btn>
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
    isFormAddShow: false,
    isFormWithdrawalShow: false,
    isWithdrawalValueErr: false,
    isInputValueErr: false,
    isAdd: false,
    isFiat: false,
    isCrypto: true,
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
    closeForm() {
      this.isFormAddShow = false;
      this.isFormWithdrawalShow = false;
    },
  },
  computed: {},
  mounted() {
    const showFormAdd = () => {
      const btnsAdd = document.querySelectorAll(".currency-add");
      const form = document.querySelector(".form-add");
      const submit = document.querySelector(".form-add__submit");
      btnsAdd.forEach((btnAdd) => {
        btnAdd.addEventListener("click", (e) => {
          if (e.currentTarget.id === btnAdd.id) {
            const cards = document.querySelectorAll(".card-currency");
            cards.forEach((card) => {
              if (btnAdd.id === card.id) {
                card.classList.add("current-currency-card");
              } else {
                card.classList.remove("current-currency-card");
              }
            });

            this.isFormAddShow = true;
            this.isFormWithdrawalShow = false;
            form.id = e.currentTarget.id;
            submit.id = e.currentTarget.id;

            const allCommissions = document.querySelectorAll(".commission");
            allCommissions.forEach((el) => {
              el.textContent = `Коммиссия: ${e.currentTarget.dataset.commissionValue}`;
            });
          }
        });
      });
    };
    showFormAdd();

    const showFormWithdrawal = () => {
      const btnsWithdrawal = document.querySelectorAll(".currency-withdrawal");
      const form = document.querySelector(".form-withdrawal");
      const submit = document.querySelector(".form-withdrawal__submit");
      btnsWithdrawal.forEach((btnWithdrawal) => {
        btnWithdrawal.addEventListener("click", (e) => {
          if (e.currentTarget.id === btnWithdrawal.id) {
            const cards = document.querySelectorAll(".card-currency");
            cards.forEach((card) => {
              if (btnWithdrawal.id === card.id) {
                card.classList.add("current-currency-card");
              } else {
                card.classList.remove("current-currency-card");
              }
            });

            if (e.currentTarget.id === "USD" || e.currentTarget.id === "RUR") {
              this.isFiat = true;
              this.isCrypto = false;
            } else {
              this.isFiat = false;
              this.isCrypto = true;
            }

            this.isFormWithdrawalShow = true;
            this.isFormAddShow = false;
            form.id = e.currentTarget.id;
            submit.id = e.currentTarget.id;

            const allCommissions = document.querySelectorAll(".commission");
            allCommissions.forEach((el) => {
              el.textContent = `Коммиссия: ${e.currentTarget.dataset.commissionValue}`;
            });
          }
        });
      });
    };
    showFormWithdrawal();

    const validateInput = () => {
      const form = document.querySelector(".form-add");
      const input = document.querySelector(".form-add__input-value input");
      const inputValueError = document.querySelector(".input-value-error");
      const submitBtn = document.querySelector(".form-add__submit");

      input.addEventListener("input", (e) => {
        const regex = /^[0-9]*\.?[0-9]*$/; // принимает только числа и точку

        if ((form.id === "BTS" && +e.target.value < 0.001) || !e.target.value.match(regex)) {
          this.isInputValueErr = true;
          inputValueError.textContent = `Минимальная сумма: 0.001 BTC`;
          submitBtn.classList.add("v-btn--disabled");
          submitBtn.disabled = true;
        } else if ((form.id === "USD" && +e.target.value < 100) || !e.target.value.match(regex)) {
          this.isInputValueErr = true;
          inputValueError.textContent = `Минимальная сумма: 100 USD`;
          submitBtn.classList.add("v-btn--disabled");
          submitBtn.disabled = true;
        } else if ((form.id === "DOGE" && +e.target.value < 5) || !e.target.value.match(regex)) {
          this.isInputValueErr = true;
          inputValueError.textContent = `Минимальная сумма: 5 DOGE`;
          submitBtn.classList.add("v-btn--disabled");
          submitBtn.disabled = true;
        } else if ((form.id === "LTC" && +e.target.value < 1) || !e.target.value.match(regex)) {
          this.isInputValueErr = true;
          inputValueError.textContent = `Минимальная сумма: 1 LTC`;
          submitBtn.classList.add("v-btn--disabled");
          submitBtn.disabled = true;
        } else if ((form.id === "SHIB" && +e.target.value < 500) || !e.target.value.match(regex)) {
          this.isInputValueErr = true;
          inputValueError.textContent = `Минимальная сумма: 500 SHIB`;
          submitBtn.classList.add("v-btn--disabled");
          submitBtn.disabled = true;
        } else if ((form.id === "RUR" && +e.target.value < 10000) || !e.target.value.match(regex)) {
          this.isInputValueErr = true;
          inputValueError.textContent = `Минимальная сумма: 10000 RUR`;
          submitBtn.classList.add("v-btn--disabled");
          submitBtn.disabled = true;
        } else if ((form.id === "BNB" && +e.target.value < 0.15) || !e.target.value.match(regex)) {
          this.isInputValueErr = true;
          inputValueError.textContent = `Минимальная сумма: 0.15 BNB`;
          submitBtn.classList.add("v-btn--disabled");
          submitBtn.disabled = true;
        } else {
          this.isInputValueErr = false;
          submitBtn.classList.remove("v-btn--disabled");
          submitBtn.disabled = false;
        }
      });
    };
    validateInput();

    const addToBalance = () => {
      const input = document.querySelector(".form-add__input-value input");
      const submit = document.querySelector(".form-add__submit");

      submit.addEventListener("click", () => {
        let payload = {
          BTS: 0,
          USD: 0,
          DOGE: 0,
          LTC: 0,
          SHIB: 0,
          RUR: 0,
          BNB: 0,
        };
        const balanceBTS = document.querySelector(".currency-balance#BTS");
        const balanceUSD = document.querySelector(".currency-balance#USD");
        const balanceDOGE = document.querySelector(".currency-balance#DOGE");
        const balanceLTC = document.querySelector(".currency-balance#LTC");
        const balanceSHIB = document.querySelector(".currency-balance#SHIB");
        const balanceRUR = document.querySelector(".currency-balance#RUR");
        const balanceBNB = document.querySelector(".currency-balance#BNB");

        if (balanceBTS.id === "BTS" && balanceBTS.id === submit.id) {
          let currentBalance = +balanceBTS.textContent;
          let result = currentBalance + +input.value - (input.value / 100) * 5;
          balanceBTS.textContent = result.toFixed(4);
        }
        payload.BTS = balanceBTS.textContent;
        if (balanceUSD.id === "USD" && balanceUSD.id === submit.id) {
          let currentBalance = +balanceUSD.textContent;
          let result = currentBalance + +input.value - (input.value / 100) * 5;
          balanceUSD.textContent = result.toFixed(4);
        }
        payload.USD = balanceUSD.textContent;
        if (balanceDOGE.id === "DOGE" && balanceDOGE.id === submit.id) {
          let currentBalance = +balanceDOGE.textContent;
          let result = currentBalance + +input.value - 0.5;
          balanceDOGE.textContent = result.toFixed(4);
        }
        payload.DOGE = balanceDOGE.textContent;
        if (balanceLTC.id === "LTC" && balanceLTC.id === submit.id) {
          let currentBalance = +balanceLTC.textContent;
          let result = currentBalance + +input.value - 0.5;
          balanceLTC.textContent = result.toFixed(4);
        }
        payload.LTC = balanceLTC.textContent;
        if (balanceSHIB.id === "SHIB" && balanceSHIB.id === submit.id) {
          let currentBalance = +balanceSHIB.textContent;
          let result = currentBalance + +input.value - 10;
          balanceSHIB.textContent = result.toFixed(4);
        }
        payload.SHIB = balanceSHIB.textContent;
        if (balanceRUR.id === "RUR" && balanceRUR.id === submit.id) {
          let currentBalance = +balanceRUR.textContent;
          let result = currentBalance + +input.value;
          balanceRUR.textContent = result.toFixed(4);
        }
        payload.RUR = balanceRUR.textContent;
        if (balanceBNB.id === "BNB" && balanceBNB.id === submit.id) {
          let currentBalance = +balanceBNB.textContent;
          let result = currentBalance + +input.value - 0.01;
          balanceBNB.textContent = result.toFixed(4);
        }
        payload.BNB = balanceBNB.textContent;

        this.$store.dispatch("increaseBalance", payload);
      });
    };
    addToBalance();

    const withdrawalFromBalance = () => {
      const input = document.querySelector(".form-withdrawal__input-value input");
      const submit = document.querySelector(".form-withdrawal__submit");
      const allBalances = document.querySelectorAll(".currency-balance");

      submit.addEventListener("click", () => {
        allBalances.forEach((balance) => {
          if (balance.id === "BTS" && balance.id === submit.id) {
            let currentBalance = +balance.textContent;
            let valueWithComission = +input.value - (input.value / 100) * 5;
            if (currentBalance > valueWithComission) {
              let result = currentBalance - valueWithComission;
              balance.textContent = result.toFixed(4);
            } else {
              alert("Нельзя вывести больше чем есть на балансе!");
            }
          } else if (balance.id === "USD" && balance.id === submit.id) {
            let currentBalance = +balance.textContent;
            let valueWithComission = +input.value - (input.value / 100) * 5;
            if (currentBalance > valueWithComission) {
              let result = currentBalance - valueWithComission;
              balance.textContent = result.toFixed(4);
            } else {
              alert("Нельзя вывести больше чем есть на балансе!");
            }
          } else if (balance.id === "DOGE" && balance.id === submit.id) {
            let currentBalance = +balance.textContent;
            let valueWithComission = +input.value - 0.5;
            if (currentBalance > valueWithComission) {
              let result = currentBalance - valueWithComission;
              balance.textContent = result.toFixed(4);
            } else {
              alert("Нельзя вывести больше чем есть на балансе!");
            }
          } else if (balance.id === "LTC" && balance.id === submit.id) {
            let currentBalance = +balance.textContent;
            let valueWithComission = +input.value - 0.5;
            if (currentBalance > valueWithComission) {
              let result = currentBalance - valueWithComission;
              balance.textContent = result.toFixed(4);
            } else {
              alert("Нельзя вывести больше чем есть на балансе!");
            }
          } else if (balance.id === "SHIB" && balance.id === submit.id) {
            let currentBalance = +balance.textContent;
            let valueWithComission = +input.value - 10;
            if (currentBalance > valueWithComission) {
              let result = currentBalance - valueWithComission;
              balance.textContent = result.toFixed(4);
            } else {
              alert("Нельзя вывести больше чем есть на балансе!");
            }
          } else if (balance.id === "RUR" && balance.id === submit.id) {
            let currentBalance = +balance.textContent;
            if (currentBalance > +input.value) {
              let result = currentBalance - +input.value;
              balance.textContent = result.toFixed(4);
            } else {
              alert("Нельзя вывести больше чем есть на балансе!");
            }
          } else if (balance.id === "BNB" && balance.id === submit.id) {
            let currentBalance = +balance.textContent;
            let valueWithComission = +input.value - 0.01;
            if (currentBalance > valueWithComission) {
              let result = currentBalance - valueWithComission;
              balance.textContent = result.toFixed(4);
            } else {
              alert("Нельзя вывести больше чем есть на балансе!");
            }
          }
        });
      });
    };
    withdrawalFromBalance();
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
