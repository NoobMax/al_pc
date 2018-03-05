<template>
<div class="home-wrapper__content animated fadeIn">
  <div class="home-wrapper__title">
    <h4>下注记录</h4>
  </div>
<div class="betting">
  <div class="betting-content">
    <ul class='clearfix betting-content-ul'>                
        <li v-for="(title, index) in title" :class="{bettingli:true,bettingliactive:defalutactive == title.type}" @click="navClick(title)">                  
          {{title.name}}
        </li>
    </ul>

    <div class='all' v-show="defalutactive=='all'" style='width:1025px;'>      
        <h4 class='hasClosedTitle'>全部游戏&nbsp;已结</h4>
        <el-table
           @row-click="redirectYijie"
          :data="allHasClose"
          stripe
          >

          <el-table-column
          label="交易日期"
          align="center"
          :formatter="formatTime">
          </el-table-column>

          <el-table-column
          label="注单笔数"
          align="center"
          prop="id">
          </el-table-column>

          <el-table-column
          label="下注金额"
          align="center"
          prop="money">
          </el-table-column>

          <el-table-column
          label="输赢金额"
          align="center"
          prop="win">
          </el-table-column>

          <el-table-column
          label="退水金额"
          align="center"
          prop="backwater">
          </el-table-column>        
        </el-table>
   
        <h4>全部游戏&nbsp;未结</h4>
        <el-table
        @row-click="redirectWeijie"
        :data="allUnSettlement"
        stripe
        >
          <el-table-column
          label="交易日期"
          align="center"
          :formatter="formatTime1">
          </el-table-column>

          <el-table-column
          label="注单笔数"
          align="center"
          prop="id">
          </el-table-column>

          <el-table-column
          label="下注金额"
          align="center"
          prop="money">
          </el-table-column>

          <el-table-column
          label="可赢金额"
          align="center"
          prop="win">
          </el-table-column>

          <el-table-column
          label="退水金额"
          align="center"
          prop="backwater">
          </el-table-column>  
              
        </el-table>
    </div>


    <div class='yijie' v-show="defalutactive=='yijie'" style='width:1025px;'>
        <el-table
          :data="yijie"
          stripe          
          >

          <el-table-column
          label="游戏彩种"
          align="center"
          prop="games">
          </el-table-column>

          <el-table-column
          label="下注时间"
          sortable
          prop="createdTime"
          width="180"
          align="center"
          :formatter="formatTime">
          </el-table-column>

          <el-table-column
          label="下注号码/赔率"
          sortable
          prop="rate"
          width="240"
          align="center"
          :formatter="formatter1">
          </el-table-column>       

          <el-table-column
          label="下注金额"
          align="center"
          prop="money">
          </el-table-column>       

          <el-table-column
          label="订单号"
          align="center"
          prop="id">
          </el-table-column>

          <el-table-column
          label="期数"
          align="center"
          prop="round">
          </el-table-column>   

          <el-table-column
          label="输赢结果"
          align="center"
          prop="trueWin">
          </el-table-column>        
        </el-table>

        <div class="page"> 
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChangeYijie"
            :current-page="currentPage2"
            :page-sizes="[10, 20, 30]"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="allnumb2">
          </el-pagination> 
        </div>

    </div>

    <div class='weijie' v-show="defalutactive=='weijie'" style='width:1025px;'>
        <el-table           
          :data="weijie"
          stripe
          >

          <el-table-column
          label="游戏彩种"
          align="center"
          prop="games">
          </el-table-column>

          <el-table-column
          label="下注时间"
          sortable
          prop="createdTime"
          width="180"
          align="center"
          :formatter="formatTime">
          </el-table-column>

          <el-table-column
          label="下注号码/赔率"
          sortable
          prop="rate"
          width="240"
          align="center"
          tooltip
          :formatter="formatter1">
          </el-table-column>         

          <el-table-column
          label="下注金额"
          align="center"
          prop="money">
          </el-table-column>   

          <el-table-column
          label="订单号"
          align="center"
          prop="id">
          </el-table-column>

          <el-table-column
          label="期数"
          align="center"
          prop="round">
          </el-table-column>        
        </el-table>

        <div class="page"> 
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChangeWeijie"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30]"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="allnumb">
          </el-pagination> 
        </div>

    </div>
  </div>
 </div>
 </div>
</template>

<script>
import api from '@/api'
import store2 from 'store2'
export default {
  data () {
    return {
      title: [
        {name: '历史总汇', type: 'all'},
        {name: '未结记录', type: 'weijie'},
        {name: '今日已结', type: 'yijie'}
      ],
      allnumb: 0, // 当前彩种所有开奖结果历史条数
      currentPage: 1, // 当前页码
      allnumb2: 0, // 当前彩种所有开奖结果历史条数
      currentPage2: 1, // 当前页码
      allHasClose: [],
      allUnSettlement: [],
      weijie: [],
      yijie: []
    }
  },
  created () {
    if (store2.session.get('user-info').username === '游客') {
      if (!this.$route.query.type) {
        this.$router.push({path: '/home/betting', query: {type: 'weijie'}})
      }
      this.title = this.title.filter((v, k) => {
        return v.type !== 'all'
      })
    } else {
      if (!this.$route.query.type) {
        this.$router.push({path: '/home/betting', query: {type: 'all'}})
      }
    }
    this.getTotalData()
    this.getYijie(1, 10)
    this.getWeijie(1, 10)
  },
  computed: {
    defalutactive () {
      return this.$route.query.type
    }
  },
  methods: {
    navClick (item) {
      this.$router.replace({path: '/home/betting', query: {type: item.type}})
    },
    formatter1 (k, v) {
      return `${k.smallBall}/ ${k.rate}`
    },
    formatTime1 (k, v) {
      return new Date(k.createdTime * 1000).toLocaleString()
    },
    formatTime (k, v) {
      return new Date(k.createdTime * 1000).toLocaleString()
    },
    redirectYijie (data) {
      let newDate = data.createdTime
      this.getYijie(1, 10, newDate)
      this.$router.push({path: '/home/betting', query: {type: 'yijie', time: newDate}})
    },
    redirectWeijie (data) {
      let newDate = data.createdTime
      this.$router.push({path: '/home/betting', query: {type: 'weijie', time: newDate}})
    },
    handleSizeChange (val) {
      this.getYijie(val, 10)
      this.getWeijie(val, 10)
    },
    handleCurrentChangeYijie (val) {
      this.getYijie(val, 10)
    },
    handleCurrentChangeWeijie (val) {
      this.getWeijie(val, 10)
    },
    getWeijie (page, number, date) {
      let pamrams = {
        pageNo: page,
        pageSize: number,
        createdTime: date
      }
      api.findlotteyBill(pamrams).then(data => {
        this.weijie = data.data.response
        this.allnumb = data.data.total
      })
    },
    getYijie (page, number, date) {
      let pamrams = {
        pageNo: page,
        pageSize: number,
        createdTime: date
      }
      api.todayend(pamrams).then(data => {
        this.yijie = data.data.response
        this.allnumb2 = data.data.total
      })
    },
    getTotalData () {
      api.summary().then(data => {
        let result = data.data.response
        if (result) {
          this.allHasClose = result.filter((v, i, r) => {
            return v.status === '1'
          })
          this.allUnSettlement = result.filter((v, i, r) => {
            return v.status === '0'
          })
        }
      })
    }
  },
  watch: {
    '$route' () {
      if (this.$route.query.type === 'all') {
        this.getTotalData()
      } else if (this.$route.query.type === 'yijie') {
        this.getYijie(this.$route.query.pages, 10, this.$route.query.time)
      } else if (this.$route.query.type === 'weijie') {
        this.getWeijie(this.$route.query.pages, 10, this.$route.query.time)
      } else {
        if (store2.session.get('user-info').username === '游客') {
          this.$router.push({path: '/home/betting', query: {type: 'weijie'}})
        } else {
          this.$router.push({path: '/home/betting', query: {type: 'all'}})
        }
      }
    }
  }

}
</script>