<script setup>
import HomepageDemo from "../examples/first-demo/ActualDemo.vue"
import jestReact from "../examples/jest-react"
import jestReactHook from "../examples/jest-react-hook"
import CodeExample from "../components/CodeExample.vue"
import AsideTip from "../components/AsideTip.vue"
</script>

<template>
  <section id="jest">
    <h2>Jest</h2>
    <p>
      Jest users may face some errors when using Auto Animate with React,
      because we are using some features which we cannot mock on our own.
      But it's easy to solve it yourself, and we suggest you mock the
      autoAnimate functions and the hook.
    </p>
    <p>
      To do that with Jest, you just need to create a folder that replicates
      the module's folder structure and mock functions:
    </p>
    <h3>If you are using the normal approach:</h3>
    <CodeExample title="react.js" :examples="jestReact"></CodeExample>
    <h3>Using React Hook:</h3>
    <CodeExample title="react.js" :examples="jestReactHook"></CodeExample>
    <AsideTip>
      Your Jest config should includes the path of your mock, on this example
      it looks like this: <br />
      <code>modulePaths: ["&ltrootDir>/jest"]</code>
    </AsideTip>
  </section>
</template>
