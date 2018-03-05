<template>
  <div class='history__result-area'>
    <table>
      <tr>
        <th :colspan="item.colspan" v-for="(item, index) in (type ? skeleton.historyArea.th.slice(0, 3) : skeleton.historyArea.th)" :style="`width:${item.width}`" :key="index">
          <numberStylePicker v-if="item.title === 'number-area'" :resultStyle.sync="resultStyle"></numberStylePicker>
          <template v-else-if="item.title === 'marksix-result'">开奖号码</template>
          <template v-else>{{ item.title }}</template>
        </th>
      </tr>

      <tr v-for="(result, index) in results" :key="index">
        <template v-for="item in (type ? skeleton.historyArea.td.slice(0, 3) : skeleton.historyArea.td)">
          <td v-if="item.name === 'openTime'" :key="item.name">{{ transTimeToDate(result.openTime) }}</td>

          <td v-else-if="item.name === 'round'" :key="item.name">{{ result.round }}期</td>

          <td v-else-if="item.name === 'number-area'" :key="item.name">
            <template v-for="(obj, idx) in genNumberData(result)">
              <span v-if="resultStyle === 'number'" :class="handleNumberClass(obj)" :key="idx"> {{ obj.number }} </span>
              <span v-else-if="resultStyle === 'bigSmall'" :class="handleNumberClass(obj)" :key="idx"> {{ obj.bigSmall }} </span>
              <span v-else-if="resultStyle === 'oddEven'" :class="handleNumberClass(obj)" :key="idx"> {{ obj.oddEven }} </span>
            </template>
          </td>

          <td v-else-if="item.name === 'marksix-result'" :key="item.name">
            <template v-for="(obj, idx) in genNumberData(result)">
              <span v-if="idx === 6" id="plus" :key=""> + </span>
              <span :class="handleMarksixClass(obj)" :key=""> {{obj.number}} </span>
            </template>
          </td>

          <td v-else-if="item.name === 'sum'" :key="item.name">{{ sum(result.number) }}</td>
          <template v-else-if="item.name === 'summary'">
            <td :sytle="`width:${item.width}`" v-for="data in summary(result)" :key=""> {{ data }} </td>
          </template>
          <template v-else-if="item.name === 'cqSummary'">
            <td :sytle="`width:${item.width}`" v-for="data in cqSummary(result)" :key=""> {{ data }} </td>
          </template>
          <template v-else-if="item.name === 'champSum'">
            <td :sytle="`width:${item.width}`" v-for="data in champSum(result.number)" :key=""> {{ data }} </td>
          </template>
          <template v-else-if="item.name === 'pcddSummary'" v-for="data in summary(result)">
            <td :sytle="`width:${item.width}`" v-if="Number.isInteger(data)" :key=""><span :class="handlePcddSummaryClass(data)">{{ data }}</span></td>
            <td :style="`width:${item.width}`" v-else :key="">{{ data }}</td>
          </template>
          <template v-else-if="item.name === 'dragonTiger'">
            <td :sytle="`width:${item.width}`" v-for="dt in dragonTiger(result.number)" :key=""> {{ dt }} </td>
          </template>
          <template v-else-if="item.name === 'zodiac'">
            <td :sytle="`width:${item.width}`" v-for="dt in zodiac(result)" :key=""> {{ dt }} </td>
          </template>
          <td v-else-if="item.name === 'singleDragonTiger'" :key="item.name">{{ singleDragonTiger(result.number) }}</td>

          <td v-else-if="item.name === 'tailBigSmall'" :key="item.name">{{ tailBigSmall(result.number) }}</td>

          <td v-else :key="item.name"> {{ item.name }}</td>
        </template>
      </tr>
    </table>
  </div>
</template>

<script>
import { timestampToDate } from '@/api/convert-date-and-timestamp'
import numberStylePicker from './result-area-number-style-picker'
import lunarCalendar from 'lunar-calendar'
import { setBallColor } from '@/utils'

export default {
  props: {
    resultDefaultStyle: {},
    skeleton: {},
    results: {},
    type: {
      type: Boolean,
      default: false
    }
  },
  components: {
    numberStylePicker
  },
  data () {
    return {
      lotterygamesIndex: {},
      resultStyle: 'number'
    }
  },
  beforeUpdate () {
  },
  methods: {
    handleMarksixClass (obj) {
      return [
        this.resultStyle,
        this.skeleton.numberStyle,
        setBallColor(obj.number)
      ]
    },
    handleNumberClass (obj) {
      let cls
      switch (this.resultStyle) {
        case 'number': cls = `num-${obj.number}`; break
        case 'bigSmall': cls = obj.bigSmall === '大' ? 'big' : 'small'; break
        case 'oddEven': cls = obj.oddEven === '双' ? 'even' : 'odd'; break
      }
      return [
        this.resultStyle,
        this.skeleton.numberStyle,
        cls
      ]
    },
    handlePcddSummaryClass (data) {
      if (Number.isInteger(data)) {
        return ['pcdd', `num-${data}`]
      }
    },
    transTimeToDate (timestamp) {
      let date = timestampToDate(timestamp)
      return date
    },
    genNumberData (result) {
      let numberData = []
      let benchmark = this.skeleton.benchmark
      result.number.split(',').forEach(num => {
        let obj = {}
        obj.number = num
        obj.bigSmall = num > benchmark ? '大' : '小'
        obj.oddEven = num % 2 === 0 ? '双' : '单'
        numberData.push(obj)
      })
      return numberData
    },
    sum (numbers) {
      let sum = 0
      numbers.split(',').forEach(num => {
        sum += parseInt(num)
      })
      return sum
    },
    summary (result) {
      let benchmark = this.skeleton.summaryBenchmark
      let sum = this.sum(result.number)
      let oddEven = sum % 2 === 0 ? '双' : '单'
      let bigSmall = sum > benchmark ? '大' : '小'
      return [sum, oddEven, bigSmall]
    },
    cqSummary (result) {
      let benchmark = this.skeleton.summaryBenchmark
      let sum = this.sum(result.number)
      let oddEven = sum % 2 === 0 ? '双' : '单'
      let bigSmall = sum > benchmark ? '大' : '小'
      bigSmall = sum === benchmark ? '和' : bigSmall
      return [sum, oddEven, bigSmall]
    },
    champSum (numbers) {
      let nums = numbers.split(',')
      let champion = parseInt(nums.shift())
      let runnerUp = parseInt(nums.shift())
      let sum = champion + runnerUp
      let oddEven = sum % 2 === 0 ? '双' : '单'
      let bigSmall = sum > 10 ? '大' : '小'
      return [sum, oddEven, bigSmall]
    },
    tailBigSmall (numbers) {
      let sum = this.sum(numbers)
      let tail = sum.toString().substr(-1)
      let tailBigSmall = parseInt(tail) > 4 ? '尾大' : '尾小'
      return tailBigSmall
    },
    singleDragonTiger (numbers) {
      let nums = numbers.split(',')
      let firstNumber = parseInt(nums.shift())
      let lastNumber = parseInt(nums.pop())
      let dt = firstNumber > lastNumber ? '龙' : '虎'
      return dt
    },
    dragonTiger (numbers) {
      let nums = numbers.split(',')
      let dts = []
      while (nums.length >= 2) {
        let firstNumber = parseInt(nums.shift())
        let lastNumber = parseInt(nums.pop())
        let dt = firstNumber > lastNumber ? '龙' : '虎'
        dts.push(dt)
      }
      return dts
    },
    zodiac (result) {
      const zodiacReference = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
      const YMD = timestampToDate(result.openTime).split(' ')[0].split('-')
      const year = YMD[0]; const month = YMD[1]; const day = YMD[2]
      const zodiac = lunarCalendar.solarToLunar(year, month, day).zodiac
      const firstZodiac = zodiacReference.indexOf(zodiac)
      const zos = []
      result.number.split(',').forEach(num => {
        let index = (parseInt(num) + firstZodiac - 1) % zodiacReference.length
        zos.push(zodiacReference[index])
      })
      return zos
    }
  }
}
</script>
