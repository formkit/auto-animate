<script setup lang="ts">
import CodeExample from "../components/CodeExample.vue"
import AsideTip from "../components/AsideTip.vue"
import dropdown from "../examples/dropdown"
import config from "../examples/config"
import {
  vueDirectiveMain,
  vueDirectiveApp,
  vueComposable,
} from "../examples/vue"
import { angularDirectiveMain, angularDirectiveApp } from "../examples/angular"
import { solidPrimitive, solidDirective } from "../examples/solid"
import reactHook from "../examples/react"
import preactHook from "../examples/preact"
import disabledExamples from "../examples/disable"
import ActualReactApp from "../examples/react/ActualReactApp.vue"
import ActualPreactApp from "../examples/preact/ActualPreactApp.vue"
import ActualSolidApp from "../examples/solid/ActualSolidApp.vue"
import ActualDropdown from "../examples/dropdown/ActualDropdown.vue"
import svelteAction from "../examples/svelte"
import qwikHook from "../examples/qwik"
import ActualSvelteApp from "../examples/svelte/ActualSvelteApp.vue"
import ActualVueApp from "../examples/vue/ActualVueApp.vue"
import ActualVueAppHook from "../examples/vue/ActualVueAppHook.vue"
import ActualAngularApp from "../examples/angular/ActualAngularApp.vue"
import ActualDisable from "../examples/disable/ActualDisable.vue"
import IconReact from "../components/IconReact.vue"
import IconPreact from "../components/IconPreact.vue"
import IconVue from "../components/IconVue.vue"
import IconAngular from "../components/IconAngular.vue"
import IconSvelte from "../components/IconSvelte.vue"
import IconSolid from "../components/IconSolid.vue"
import IconQwik from "../components/IconQwik.vue"
</script>
<template>
  <section id="usage">
    <h2>Usage</h2>
    <p>
      AutoAnimate is fundamentally a single function —
      <code>autoAnimate</code> — that accepts a parent element. Automatic
      animations will be applied to the parent element and its immediate
      children. Animations are specifically triggered when one of three events
      occurs:
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
      Too easy! A gentle, smooth shift without adding any transition classes or
      custom CSS. This is a notable upgrade for end users with minimal developer
      effort required. <a href="#examples">Checkout the examples</a>
      to see other use cases.
    </p>

    <h3>Tips for success</h3>
    <ul>
      <li>
        It’s still ok to use other kinds of transitions. For example, if you are
        making stylistic changes with just CSS (such as a hover effect), then
        use standard CSS transitions for these kinds of styling tweaks.
      </li>
      <li>
        Animations are only triggered when immediate children of the parent
        element (the one you passed to <code>autoAnimate</code>) are added,
        removed, or moved.
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
    <AsideTip
      >AutoAnimate respects a user’s <code>prefers-reduced-motion</code> setting
      and will automatic disable if the user has indicated they want reduced
      motion. Checkout the
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion"
        >MDN docs for more information</a
      >
      on this media feature.
    </AsideTip>
    <h3>Configuration</h3>
    <p>
      AutoAnimate is intended to be used with <em>zero-configuration</em>. We
      believe the default configuration falls in line with the project’s
      objective:
      <em class="important"
        >AutoAnimate’s goal is to substantially improve an application’s
        user-experience without impacting the developer’s implementation time or
        performance budget.</em
      >
      That said, some minor configuration options are available. AutoAnimate
      allows you to pass a second argument to <code>autoAnimate</code> with the
      following options:
    </p>
    <CodeExample :examples="config" title="config" />
    <p>
      If your project’s specific requirements make it necessary to dramatically
      change the default animations, then you should
      <a href="#plugins">check out the plugins documentation</a>. Next, checkout
      the usage documentation for your framework.
    </p>
    <ul class="framework-jumplinks">
      <li>
        <a href="#usage-react"
          ><span>React</span>
          <IconReact />
        </a>
      </li>
      <li>
        <a href="#usage-vue"><span>Vue</span><IconVue /></a>
      </li>
      <li>
        <a href="#usage-preact"><span>Preact</span><IconPreact /></a>
      </li>
      <li>
        <a href="#usage-solid"><span>Solid</span><IconSolid /></a>
      </li>
      <li>
        <a href="#usage-svelte"><span>Svelte</span><IconSvelte /></a>
      </li>
      <li>
        <a href="#usage-angular"><span>Angular</span><IconAngular /></a>
      </li>
      <!-- <li>
        <a href="#usage-qwik"><span>Qwik</span><IconQwik /></a>
      </li> -->
    </ul>
    <h2 id="usage-react">React hook</h2>
    <p>
      React users can use the hook <code>useAutoAnimate</code> by importing it
      from <code>@formkit/auto-animate/react</code>. This hook returns a ref to
      apply to the parent element, as well as a function to
      <a href="#usage-disable">enable or disable</a> animations.
    </p>
    <CodeExample :examples="reactHook" title="App" />
    <ActualReactApp />
    <h2 id="usage-vue">Vue directive</h2>
    <p>
      Vue users can globally register the
      <code>v-auto-animate</code> directive. This makes adding transitions and
      animations as easy as applying an attribute. Import the Vue plugin from
      <code>@formkit/auto-animate/vue</code> and register it with your Vue app:
    </p>
    <CodeExample :examples="vueDirectiveMain" title="main" />
    <p>
      Once you’ve registered the plugin, it can be applied anywhere in your
      application by adding the <code>v-auto-animate</code> directive to the
      parent element:
    </p>
    <CodeExample :examples="vueDirectiveApp" title="App" />
    <ActualVueApp />
    <AsideTip>
      Please bare in mind that value passed to <code>:key</code> should be a
      unique value, otherwise animation might not work as expected.
    </AsideTip>
    <AsideTip>
      Vue users can pass options by directly setting the directive’s value
      <code>&lt;ul v-auto-animate="{ duration: 100 }"&gt;</code>
    </AsideTip>

    <h3 id="usage-vue-composable">Vue composable</h3>
    <p>
      As an alternative to the <code>v-auto-animate</code> directive, Vue devs
      can use the <code>useAutoAnimate</code> composable. This composable
      supports all the same great features, but also provides a mechanism to
      <a href="usage-disable">enable and disable</a> animations.
    </p>
    <p>
      Import the composable from <code>@formkit/auto-animate/vue</code>, and
      call it in <code>script setup</code> to create a
      <a
        href="https://vuejs.org/guide/essentials/template-refs.html#template-refs"
        target="_blank"
        rel="noopener noreferrer"
        >template ref</a
      >. Use the <code>ref</code> attribute on your parent element to store it
      in the template ref:
    </p>
    <CodeExample :examples="vueComposable" title="App" />
    <ActualVueAppHook />
    <AsideTip>
      Vue users can pass options directly to the composable: <br />
      <code>useAutoAnimate({ duration: 100 })</code>
    </AsideTip>

    <h2 id="usage-preact">Preact hook</h2>
    <p>
      Preact users can use the hook <code>useAutoAnimate</code> by importing it
      from <code>@formkit/auto-animate/preact</code>. This hook returns a ref to
      apply to the parent element, as well as a function to
      <a href="#usage-disable">enable or disable</a> animations.
    </p>
    <CodeExample :examples="preactHook" title="App" />
    <ActualPreactApp />

    <h2 id="usage-solid">Solid Primitive</h2>
    <p>
      Solid users can use the function <code>createAutoAnimate</code> by
      importing it from <code>@formkit/auto-animate/solid</code>. This hook
      returns a ref to apply to the parent element, as well as a function to
      <a href="#usage-disable">enable or disable</a> animations.
    </p>
    <CodeExample :examples="solidPrimitive" title="App" />
    <ActualSolidApp />

    <h3 id="usage-solid-directive">Solid Directive</h3>
    <p>
      Solid users can also use the directive <code>autoAnimate</code> by
      importing it from <code>@formkit/auto-animate/solid</code>.
    </p>
    <CodeExample :examples="solidDirective" title="App" />

    <h2 id="usage-svelte">Svelte action</h2>
    <p>
      The root <code>autoAnimate</code> function can be directly used as a
      Svelte action. Just import <code>autoAnimate</code> and use it as a
      directive on the parent element.
    </p>
    <CodeExample :examples="svelteAction" title="App" />
    <ActualSvelteApp />
    <AsideTip>
      Svelte users can pass options by directly setting the action’s value
      <code
        >&lt;ul use:autoAnimate=&#123;&#123; duration: 1000
        &#125;&#125;&gt;</code
      >
    </AsideTip>

    <h2 id="usage-angular">Angular directive</h2>
    <p>
      Angular users can globally register the
      <code>auto-animate</code> directive. This makes adding transitions and
      animations as easy as applying an attribute. Import the AutoAnimateModule
      from <code>@formkit/auto-animate/angular</code> and register it with your
      Angular app:
    </p>
    <CodeExample :examples="angularDirectiveMain" title="App" />
    <p>
      Once you’ve registered the plugin, it can be applied anywhere in your
      application by adding the <code>auto-animate</code> directive to the
      parent element:
    </p>
    <CodeExample :examples="angularDirectiveApp" title="App" />
    <ActualAngularApp />
    <AsideTip>
      Angular users can pass options by directly setting the options input
      <code>&lt;ul auto-animate [options]="{ duration: 100 }"&gt;</code>
    </AsideTip>

    <!-- <h2 id="usage-qwik">Qwik hook</h2>
    <p>
      Qwik users can use the hook <code>useAutoAnimate</code> by importing it
      from <code>@formkit/auto-animate/qwik</code>. This hook returns a ref to
      apply to the parent element, as well as a function to
      <a href="#usage-disable">enable or disable</a> animations.
    </p>
    <CodeExample :examples="qwikHook" title="App" /> -->

    <h2 id="usage-disable">Disable animations</h2>
    <p>
      Occasionally it may be necessary to temporarily disable animations and
      then re-enable them later on. The <code>autoAnimate</code> function
      returns an animation controller with <code>enable()</code> and
      <code>disable()</code> methods for this purpose, and the Vue and React
      hooks (<code>useAutoAnimate</code>) return a tuple with the second value
      being an enable/disable function that accepts a boolean to enable or
      disable animations.
    </p>
    <CodeExample :examples="disabledExamples" title="Juggle" />
    <ActualDisable />
  </section>
</template>
