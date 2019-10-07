<template>
  <div>
    # {{ content.id }} - {{ content.quantity }} L de {{ content.from }}
  </div>
</template>

<script>
export default {
  name: 'MilkDeliveryShortLabel',
  props: {
    content: Object
  }
}
</script>
