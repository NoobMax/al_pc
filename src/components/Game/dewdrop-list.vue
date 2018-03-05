<template>
  <li class="dewdrop-content__item" :class="{'is-even': status % 2 === 1}">
    <div v-for="i in current" class="drwdrop-item__text">{{i}}</div>
  </li>
</template>
<script>
export default {
  props: {
    current: {
      type: Array,
      required: true,
      default: () => {}
    },
    status: {
      type: Number,
      default: 1
    }
  }
}
</script>

