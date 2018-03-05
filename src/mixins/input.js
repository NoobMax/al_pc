export default {
  methods: {
    keypress (evt) {
      if ((evt.which !== 8 && evt.which !== 0 && evt.which < 48) || evt.which > 57 || !/^[0-9]\d*$/.test(evt.key)) {
        evt.preventDefault()
      }
    }
  }
}
