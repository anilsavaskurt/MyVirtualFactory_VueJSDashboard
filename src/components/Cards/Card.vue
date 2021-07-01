<template>
  <div class="card">
    <div class="card-image" v-if="$slots.image">
      <slot name="image"></slot>
    </div>
    <div class="card-header" v-if="$slots.header || title">
      <slot name="header">
        <h4 class="card-title text-warning font-weight-bold">{{title}}</h4>
        <p class="card-category text-info pt-3 font-weight-bold" v-if="subTitle">{{subTitle}}</p>
        <p class="card-category text-success pt-5 pr-5 font-weight-bold" style="position:absolute;right:0;top:0;" v-if="infoTitle">{{infoTitle}}</p>
      </slot>
    </div>
    <div class="card-body" v-if="$slots.default">
      <slot></slot>
    </div>
    <slot name="raw-content"></slot>
    <div class="card-footer" v-if="$slots.footer">
      <hr>
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "card",
  props: {
    title: String,
    subTitle: String,
    infoTitle: String
  }
};
</script>
<style>
</style>
