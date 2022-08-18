<template>
  <div>
    
  </div>
</template>

<script>
import api from '@/api/article'
export default {
  name: 'fetchData',

  data() {
    return {
      list: [],
      edit: {
        total: 0,
        current: 1,
        size: 20
      },
      query: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await api.goSearch(this.query, this.current, this.size)
      this.list = data.card
      this.edit.total = data.total
    } 
  }
}
</script>

<style lang="scss" scoped>

</style>