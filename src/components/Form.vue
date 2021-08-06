<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <form>
          <v-text-field
            v-model="amount"
            :error-messages="amountErrors"
            :counter="10"
            label="Сумма"
            required
            @input="$v.amount.$touch()"
            @blur="$v.amount.$touch()"
          ></v-text-field>
          <p class="commission">Коммиссия</p>
          <v-text-field
            v-model="address"
            :error-messages="addressErrors"
            label="Адрес"
            required
            @input="$v.address.$touch()"
            @blur="$v.address.$touch()"
          ></v-text-field>

          <v-btn class="mr-4" @click="submit"> Ввести </v-btn>
          <!-- <v-btn @click="clear"> clear </v-btn> -->
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    amount: { required, maxLength: maxLength(10) },
    address: { required },
  },
  name: "Form",

  data: () => ({
    amount: "",
    address: "",
  }),

  computed: {
    amountErrors() {
      const errors = [];
      if (!this.$v.amount.$dirty) return errors;
      !this.$v.amount.maxLength && errors.push("amount must be at most 10 characters long");
      !this.$v.amount.required && errors.push("Введите сумму");
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.address.$dirty) return errors;
      !this.$v.address.required && errors.push("Введите адрес");
      return errors;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.amount = "";
      this.address = "";
    },
  },
};
</script>
