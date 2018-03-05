export default {
  filters: {
    formatOdds (val) {
      const arr = val.split('.')[1]
      return arr.length > 2 ? parseFloat(val) : val
    }
  }
}
