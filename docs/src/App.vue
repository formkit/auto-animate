<script setup lang="ts">
import { RouterView } from "vue-router"
import TheHeader from "./components/TheHeader.vue"
</script>

<template>
  <div class="site-wide-announcement" ref="announcement">
    <div class="container">
      <div class="announcement-content">
        <p>
          <strong>Introducing KickStart</strong> —  AI generated FormKit forms
          in seconds. Generate from a screenshot, edit with drag-and-drop or
          conversational AI, copy & paste as components or schema!<br />
          <a
            class="button button--pro-outline"
            href="https://kickstart.formkit.com"
          >
            Try for free
            <span class="formkit-icon"
              ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  fill="currentColor"
                  d="M440.6 273.4c4.7-4.5 7.4-10.8 7.4-17.4s-2.7-12.8-7.4-17.4l-176-168c-9.6-9.2-24.8-8.8-33.9.8s-8.8 24.8.8 33.9L364.1 232H24c-13.3 0-24 10.7-24 24s10.7 24 24 24h340.1L231.4 406.6c-9.6 9.2-9.9 24.3-.8 33.9s24.3 9.9 33.9.8l176-168z"
                ></path></svg
            ></span>
          </a>
        </p>
      </div>
    </div>
  </div>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.site-wide-announcement {
  position: relative;
  padding: 1em;
  text-align: center;
  font-size: 0.9em;
  line-height: 1.5;
  border-bottom: 1px solid var(--ui-border-light);
  overflow: clip;

  .dark & {
    border-bottom-color: var(--dark-ll);
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 800px;
    margin: 0 auto;
  }

  p {
    margin: 0;
    text-wrap: balance;
    font-size: 0.85rem;

    @media screen and (min-width: 768px) {
      font-size: 0.95rem;
    }
  }

  a {
    font-size: 0.85rem;
    padding: 0.33rem 1.15rem;
    margin-top: 1em;
    display: inline-flex;

    .formkit-icon {
      display: inline-block;
      margin-left: 0em;
      margin-right: 0.25em;
      width: 0.9em;
    }
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100dvw;
    z-index: -1;

    .dark & {
      mix-blend-mode: overlay;
    }
  }

  &::before {
    top: 0;
    left: 0;
    width: 33%;
    height: 100%;
    background: linear-gradient(90deg, rgb(218, 231, 245), transparent);

    .dark & {
      background: linear-gradient(90deg, rgb(101, 196, 233), transparent);
    }
  }
  &::after {
    top: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(-90deg, rgb(247, 211, 249), transparent);

    .dark & {
      background: linear-gradient(-90deg, rgb(255, 108, 255), transparent);
    }
  }
}
</style>
