<template>
<div class="home-wrapper__content animated fadeIn">
    <div class="home-wrapper__title history-title">
        <h4>开奖走势</h4>
        <el-date-picker 
        v-model="requestDate"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期查詢"
        :picker-options="datePickerOptions">
      </el-date-picker>
    </div>
  <div class='history'>
    
   <!--  <div class='history__title'>
      <h5>开奖走势</h5>
      
    </div> -->

    <div class='history__lottery-picker'>
        <a href="#" @click.prevent="routeSwitch(lottery)" :class="lottery.name === activeId ? 'router-link-active' : ''" v-for="(lottery, index) in lotterySource"
                     :key="index"
                     :to="{name: 'history', query: {page: 1, id: lottery.name}}"
                     >
          {{lottery.title}}
        </a>
    </div>

    <resultArea v-if="showResultArea"
      :skeleton="lotterySkeleton"
      :results="lotteryResult">
    </resultArea>

    <div v-if="showResultArea" class='history__page-control'>
      <el-pagination
        @current-change="handleCurrentPageChange"
        :current-page="currentPage"
        :page-size="20"
        layout="total, prev, pager, next, jumper"
        :total="numberOfResults">
      </el-pagination>
    </div>
  </div>
</div>
</template>

<script>

import { DateToTimestamp } from '@/api/convert-date-and-timestamp'
import lotterySource from '@/config/history.conf'
import resultArea from './result-area'
import api from '@/api'

export default {
  components: { resultArea },
  data () {
    return {
      datePickerOptions: {
        disabledDate (time) {
          const pickedTime = time.getTime()
          const now = Date.now()
          if (pickedTime < now) {
            return pickedTime < now - (7 * 24 * 60 * 60 * 1000)
          } else {
            return pickedTime > now
          }
        }
      },
      requestDate: '',
      showResultArea: false,
      lotterySource,
      lotteryResult: {},
      numberOfResults: 0,
      activeId: 'pk10'
    }
  },
  watch: {
    activeLottery () {
      this.showResultArea = false
    }
  },
  computed: {
    activeLottery () {
      this.requestNewData(lotterySource[this.$route.query.id || 'pk10'], this.currentPage)
      return this.$route.query.id || 'pk10'
    },
    lotterySkeleton () {
      return this.lotterySource[this.$route.query.id || 'pk10']
    },
    currentPage () {
      return parseInt(this.$route.query.page)
    }
  },
  methods: {
    routeSwitch (item) {
      this.activeId = item.name
      this.$router.replace({
        name: 'history',
        query: {page: 1, id: item.name}
      })
    },
    requestNewData (
      lottery = lotterySource[this.$route.query.id],
      page = this.currentPage,
      openTime = DateToTimestamp(this.requestDate)
      ) {
      api.getHistoryResult({pageNo: page, pageSize: 20, lotteryGamesId: lottery.id, openTime: openTime})
        .then(result => {
          this.lotteryResult = result.data.response
          this.numberOfResults = result.data.total
          this.showResultArea = true
        })
    },
    handleCurrentPageChange (val = 1) {
      this.$router.replace({
        name: 'history',
        query: {page: val, id: this.$route.query.id}
      })
    }
  },
  mounted () {
    this.activeId = this.$route.query.id || 'pk10'
  }
}
</script>

