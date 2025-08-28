<script setup lang="ts">
import { ref, onMounted } from "vue"
import TheHeader from "../components/TheHeader.vue"
import TheFooter from "../components/TheFooter.vue"
import HeroTitle from "../components/HeroTitle.vue"
import Navigation from "../components/Navigation.vue"
import SectionInstallation from "../sections/SectionInstallation.vue"
import SectionWhy from "../sections/SectionWhy.vue"
import SectionUsage from "../sections/SectionUsage.vue"
import SectionExamples from "../sections/SectionExamples.vue"
import SectionPlugins from "../sections/SectionPlugins.vue"
import ReducedMotionWarning from "../components/ReducedMotionWarning.vue"
import KickstartPromo from "../components/KickstartPromo.vue"

const prefersReducedMotion = ref(false)
onMounted(() => {
  prefersReducedMotion.value = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
})
</script>

<template>
  <TheHeader />
  <HeroTitle />
  <KickstartPromo />
  <div class="documentation">
    <Navigation />
    <ReducedMotionWarning v-if="prefersReducedMotion" />
    <SectionInstallation />
    <SectionUsage />
    <SectionExamples />
    <SectionPlugins />
    <SectionWhy />
  </div>
  <TheFooter />
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
