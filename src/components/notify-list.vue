<template>
    <li class="cp-notify__item">
      <div class="cp-notify__item-media">
        
      </div>
      <div class="cp-notify__item-body">
        <div class="cp-notify__body-date">
          <p>发布日期: 2018-01-19 14: 28</p> 
        </div>
        <div class="cp-notify__body-caption">
         <span>{{current.content}}</span> 
        </div>
      </div>
    </li>
</template>
<script>
export default {
  props: {
    current: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

