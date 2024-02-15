<template>
  <div class="tempo-promo">
    <a
      href="https://tempo.formkit.com/?utm_source=auto_animate_tempo_promo&utm_medium=web"
      target="_blank"
      class="tempo-promo__cta"
    />

    <span class="announcement-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <path
          fill="currentColor"
          d="M544 32c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V64c0-17.7 14.3-32 32-32zM64 190.3L480 64V448L348.9 408.2C338.2 449.5 300.7 480 256 480c-53 0-96-43-96-96c0-11 1.9-21.7 5.3-31.5L64 321.7C63.1 338.6 49.1 352 32 352c-17.7 0-32-14.3-32-32V192c0-17.7 14.3-32 32-32c17.1 0 31.1 13.4 32 30.3zm239 203.9l-91.6-27.8c-2.1 5.4-3.3 11.4-3.3 17.6c0 26.5 21.5 48 48 48c23 0 42.2-16.2 46.9-37.8z"
        />
      </svg>
    </span>

    <div class="tempo-promo__image" aria-label="Tempo"></div>
    <div class="tempo-promo__content">
      <h2 class="tempo-promo__title">
        The easiest way to work with dates in JavaScript
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"
          />
        </svg>
      </h2>
      <p class="tempo-promo__description">
        Tempo is a new open-source library by FormKit that makes working with
        dates — including complex operations across timezones — a breeze. It’s
        lightweight, fast, and easy to use.
      </p>
    </div>
  </div>
</template>

<style scoped>
.tempo-promo {
  background: #5c1f8d;
  border: 1px solid #b376e6;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  margin-bottom: 2em;
  box-shadow: none;
  transition: all 0.2s ease;
  overflow: hidden;
  cursor: pointer;
}
.tempo-promo::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 2;
  filter: brightness(80%) contrast(100%);
  mix-blend-mode: overlay;
  background-size: cover;
  background-image: radial-gradient(
      circle at 50% 40%,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.25)
    ),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 10000 10000' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
.tempo-promo:hover {
  transform: translateY(-0.25rem);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  filter: brightness(120%);
}
[data-dark-mode="true"] .tempo-promo {
  background: #38085f;
  border: 1px solid #450a75;
}
@media (min-width: 768px) {
  .tempo-promo {
    flex-direction: row;
  }
}
@media (min-width: 960px) {
  .tempo-promo {
    margin-bottom: -2em;
  }
}

.announcement-icon {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.5rem;
  background: #fff;
  color: #5c1f8d;
  border-radius: 50%;
  font-size: 2rem;
  width: 1rem;
  height: 1rem;
}
.announcement-icon svg {
  display: block;
  width: 100%;
  height: 100%;
}

.tempo-promo__cta {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
}

.tempo-promo__image {
  width: 100%;
  max-width: 10rem;
  aspect-ratio: 523/191;
  mix-blend-mode: lighten;
  position: relative;
  z-index: 1;
  background: url("/img/tempo.png") no-repeat center center;
  background-size: contain;
}

.tempo-promo__content {
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
}
@media (min-width: 768px) {
  .tempo-promo__content {
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: 2rem;
  }
}

.tempo-promo__title {
  margin-top: 0.25rem;
  margin-bottom: 0.1rem;
  padding-top: 0;
  font-size: 1.25rem;
  color: #fff;
  letter-spacing: -0.05rem;
}
@media (min-width: 768px) {
  .tempo-promo {
    font-size: 1.33rem;
  }
}

.tempo-promo__title svg {
  width: 0.75em;
  height: 0.75em;
  margin-left: 0.25em;
}

.tempo-promo__description {
  opacity: 0.66;
  font-size: 0.85rem;
}
.tempo-promo__content p:last-child {
  margin-bottom: 0;
}
</style>
