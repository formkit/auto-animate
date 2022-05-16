<script setup lang="ts">
import TheHeader from "../components/TheHeader.vue"
import HeroTitle from "../components/HeroTitle.vue"
import Navigation from "../components/Navigation.vue"
import SectionInstallation from "../sections/SectionInstallation.vue"
import SectionWhy from "../sections/SectionWhy.vue"
import SectionUsage from "../sections/SectionUsage.vue"
import SectionExamples from "../sections/SectionExamples.vue"
import SectionPlugins from "../sections/SectionPlugins.vue"
</script>

<template>
  <TheHeader />
  <HeroTitle />
  <div class="documentation">
    <Navigation />
    <SectionInstallation />
    <SectionUsage />
    <SectionExamples />
    <SectionPlugins />
    <SectionWhy />
  </div>
</template>

<style scoped>
.documentation {
  position: relative;
}

@media (min-width: 42em) {
  .documentation {
    padding-left: 12em;
  }
}

@media (min-width: 50em) {
  .documentation {
    padding-left: 18em;
  }
}

@media (min-width: 60em) {
  .documentation {
    margin-top: 6em;
  }
}
</style>
