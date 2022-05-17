<script setup>
import { ref, onMounted } from "vue"
import autoAnimate from "../../../../src"

const example = ref()

onMounted(() => {
  example.value.querySelectorAll(".formkit-outer").forEach((el) => {
    autoAnimate(el)
  })
})
</script>

<template>
  <div class="example" ref="example">
    <FormKit type="form" :submit-attrs="{ inputClass: 'button' }">
      <FormKit
        type="text"
        label="Username"
        help="Pick a new username."
        validation="required|length:5,15|matches:/[0-9]/"
        validation-visibility="dirty"
        :validation-messages="{
          matches: 'Must include at least one number',
        }"
      />
      <FormKit
        type="password"
        label="Password"
        name="password"
        help="Pick a new password."
        validation="required|length:5,15|matches:/[0-9]/"
        validation-visibility="dirty"
        :validation-messages="{
          matches: 'Must include at least one number',
        }"
      />
      <FormKit
        type="password"
        name="password_confirm"
        label="Confirm password"
        help="Pick a new password."
        validation="required|confirm"
        validation-label="password confirmation"
        validation-visibility="dirty"
        :validation-messages="{
          matches: 'Must include at least one number',
        }"
      />
    </FormKit>
  </div>
</template>

<style scoped>
.example {
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);
  padding: 2em;
  display: block;
  border-radius: 0.5em;
  width: 100%;
  box-sizing: border-box;
  max-width: 24.375em;
}

.example::v-deep button {
  margin-bottom: 0;
}

.example::v-deep .formkit-outer[data-type="submit"] {
  margin-bottom: 0;
}

.example::v-deep input {
  width: 100%;
  box-sizing: border-box;
}
</style>
