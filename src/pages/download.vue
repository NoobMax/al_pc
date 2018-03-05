<template>
  <div class="download-container">
      <tutorial-dialog :type="type" :visible="open"  @close="close"/>   
      <div class="mobile-page">
        <div class="mobile-content">
          <div class="top clearfix">
            <div class="left-img f-l"></div>
            <div class="right-txt f-l" style='margin-top: 20px;'></div>
            <div class="iosc" @click="openTutorial('ios')">苹果APP教程</div>
            <div class="adridc"  @click="openTutorial('and')">安卓APP教程</div>          
          </div>      

          <div class="bottom">
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple clearfix">
                    <span class="ico ico-ios f-l"></span>
                    <div class="info f-l">
                      <h2>苹果下载</h2>
                      <h3>完美支持iphonex  8 7s 7 6s 6 5s 等<br>iphone系列</h3>
                      <h4> 扫描二维码下载</h4>
                    </div>
                  </div>
                </el-col>

                <el-col :span="12">
                  <div class="grid-content bg-purple-light clearfix">
                    <span class="ico ico-android f-l"></span>
                    <div class="info f-l">
                      <h2>安卓下载</h2>
                      <h3>完美支持三星 华为 小米 oppo 等<br>系列安桌手机</h3>
                      <h4> 扫描二维码下载</h4>
                    </div>                
                  </div>
                </el-col>               
              </el-row>

              <div class="grid-content bg-purple wechat-code">
                <div></div>
              </div> 
          </div>
          
        </div>      
      </div>       
  </div>
</template>


<script>
import tutorialDialog from '@/components/tutorial-dialog'
export default {
  components: {
    tutorialDialog
  },
  data () {
    return {
      open: false,
      type: 'ios'
    }
  },
  methods: {
    openTutorial (type) {
      this.open = true
      this.type = type
    },
    close () {
      this.open = false
    }
  }
}
</script>