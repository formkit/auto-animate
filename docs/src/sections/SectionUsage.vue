<script setup lang="ts">
import CodeExample from "../components/CodeExample.vue"
import AsideTip from "../components/AsideTip.vue"
import dropdown from "../examples/dropdown"
import config from "../examples/config"
import { vueDirectiveMain, vueDirectiveApp } from "../examples/vue"
import reactHook from "../examples/react"
import ActualReactApp from "../examples/react/ActualReactApp.vue"
import ActualDropdown from "../examples/dropdown/ActualDropdown.vue"
import svelteAction from "../examples/svelte"
import ActualSvelteApp from "../examples/svelte/ActualSvelteApp.vue"
import ActualVueApp from "../examples/vue/ActualVueApp.vue"
</script>
<template>
  <section id="usage">
    <h2>Usage</h2>
    <p>
      AutoAnimate is fundamentally a single function —
      <code>autoAnimate</code> — that accepts a parent element. Automatic
      animations will be applied to the parent element and its immediate children.
      Animations are specifically triggered when one of three events occurs:
    </p>
    <ul>
      <li>A child is <strong>added</strong> in the DOM.</li>
      <li>A child is <strong>removed</strong> in the DOM.</li>
      <li>A child is <strong>moved</strong> in the DOM.</li>
    </ul>
    <p>
      Let’s see what this looks like in practice. For now we'll use the
      <code>autoAnimate</code> function directly. React and Vue users — you’ll
      get some additional syntactic sugar later on — but for now let's learn the
      fundamentals:
    </p>
    <CodeExample :examples="dropdown" title="Dropdown" />
    <ActualDropdown />
    <p>
      Too easy! A gentle, smooth shift without adding any
      transition classes or custom CSS. This is a notable upgrade for end users
      with minimal developer effort required. <a href="#examples">Checkout the examples</a>
      to see other use cases.
    </p>

    <h3>Tips for success</h3>
    <ul>
      <li>
        It’s still ok to use other kinds of transitions. For example, if you are
        making stylistic changes with just CSS (such as a hover effect), then use
        standard CSS transitions for these kinds of styling tweaks.
      </li>
      <li>
        Animations are only triggered when immediate children of the parent element (the
        one you passed to <code>autoAnimate</code>) are added, removed, or
        moved.
      </li>
      <li>
        The parent element will automatically receive
        <code>position: relative</code> if it is statically positioned. Keep
        this in mind when writing your styles.
      </li>
      <li>
        Sometimes flexbox layouts don’t resize their children immediately. A
        child with a <code>flex-grow: 1</code> property waits for the
        surrounding content before snapping to its full width. AutoAnimate
        doesn’t work well in these cases, but if you give the element a more
        explicit width it should work like a charm.
      </li>
    </ul>
    <h3>Configuration</h3>
    <p>
      AutoAnimate is intended to be used with <em>zero-configuration</em>. We believe the
      default configuration falls in line with the project’s objective:
      <em class="important"
        >AutoAnimate’s goal is to substantially improve an application’s user-experience
        without impacting the developer’s implementation time or performance budget.</em
      >
      That said, some minor configuration options are available. AutoAnimate allows you to pass
      a second argument to <code>autoAnimate</code> with the following options:
    </p>
    <CodeExample :examples="config" title="config" />
    <p>
      If your project’s specific requirements make it necessary to dramatically change the default
      animations, then you should <a href="#plugins">check out the plugins documentation</a>.
    </p>

    <h2 id="usage-react">React hook</h2>
    <p>
      React users can use the hook <code>useAutoAnimate</code> by importing it from
      <code>@formkit/auto-animate/react</code>. This hook returns a ref to
      apply to the parent element:
    </p>
    <CodeExample :examples="reactHook" title="App" />
    <ActualReactApp />

    <h2 id="usage-vue">Vue directive</h2>
    <p>
      Vue users can globally register the
      <code>v-auto-animate</code> directive. This makes adding
      transitions and animations as easy as applying an attribute.
      Import the Vue plugin from <code>@formkit/auto-animate/vue</code> and
      register it with your Vue app:
    </p>
    <CodeExample :examples="vueDirectiveMain" title="main" />
    <p>
      Once you’ve registered the plugin, it can be applied anywhere in your
      application by adding the <code>v-auto-animate</code> directive to the parent element:
    </p>
    <CodeExample :examples="vueDirectiveApp" title="App" />
    <ActualVueApp />
    <AsideTip>
      Vue users can pass options by directly setting the directive’s value
      <code>&lt;ul v-auto-animate="{ duration: 100 }"&gt;</code>
    </AsideTip>

    <h2 id="usage-svelte">Svelte Action</h2>
    <p>
      Since the function signature of <code>autoAnimate</code> is the compatible with Svelte action,
      Svelte users can use it directly with <code>use:autoAnimate</code> directive.
    </p>
    <CodeExample :examples="svelteAction" title="App" />
    <ActualSvelteApp />
    <AsideTip>
      Svelte users can pass options by directly setting the directive’s value
      <code>&lt;ul use:autoAnimate="{&#123; duration: 1000 &#125;}"&gt;</code>
    </AsideTip>
  </section>
</template>
