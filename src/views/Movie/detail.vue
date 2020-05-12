<template>
  <div id="detailContrainer" class="slide-enter-active">
      <Header title="影片详情">
          <i class="iconfont icon-icon_right_arrow" @touchstart="handleToBack"></i>
      </Header>
      <Loading v-if="isLoading"/>
          <!-- <div id="content" class="contentDatail">
              <div class="detail_list">
                  <div class="detail_list_bg"></div>
                  <div class="detail_list_filter"></div>
                  <div class="detail_list_content">
                      <div class="detail_list_img">
                          <img src="" alt="">
                      </div>
                      <div class="detail_list_info">
                          <h2>无名之辈</h2>
                          <p>A Cool Fish</p>
                          <p>9.2</p>
                          <p>剧情，喜剧，犯罪</p>
                          <p>中国大陆 / 108分钟</p>
                          <p>2018-11-16大陆上映</p>
                      </div>
                  </div>
              </div>
              <div class="detail_intro">
                  <p>一个佛陀在旅途中，碰到一个不喜欢他的人。连续好几天，好长一段路，那人用尽各种方法污蔑他。最后，佛陀转身问那人："若有人送你一份礼物，但你拒绝接受，那么这份礼物属于谁呢？"那人回答："属于原本送礼的那个人。"佛陀笑着说："没错。若我不接受你的谩骂，那你就是在骂自己？"那人摸摸鼻子走了。

哲理启示：只要心灵健康，别人怎么想都影响不了我们，若我们一味地在乎别人的想法或说法，就会失去自主权。</p>
              </div>
              <div class="detail_player swiper-container">
                  <ul class="swiper-wrapper">
                      <li class="swiper-slide">
                          <div>
                              <img src="" alt="">
                          </div>
                          <p>陈建斌</p>
                          <p>马先勇</p>
                      </li>
                  </ul>
              </div>
          </div> -->
          <div v-else id="content" class="contentDatail">
              <div class="detail_list">
                  <div class="detail_list_bg" :style="{'background-image':'url('+detailMovie.img.replace(/w\.h/,'148.208')+')'}"></div>
                  <div class="detail_list_filter"></div>
                  <div class="detail_list_content">
                      <div class="detail_list_img">
                          <img :src="detailMovie.img | setWH('148.208')" alt="">
                      </div>
                      <div class="detail_list_info">
                          <h2>{{detailMovie.nm}}</h2>
                          <p>{{detailMovie.enm}}</p>
                          <p>{{detailMovie.scoreLabel}}</p>
                          <p>{{detailMovie.cat}}</p>
                          <p>{{detailMovie.src}} / {{detailMovie.dur}}分钟</p>
                          <p>{{detailMovie.pubDesc}}</p>
                      </div>
                  </div>
              </div>
              <div class="detail_intro">
                  <p>{{detailMovie.dra}}</p>
              </div>
              <div class="detail_player swiper-container" ref="detail_player">
                  <ul class="swiper-wrapper">
                      <li v-for="(item,index) in detailMovie.photos" :key="index" class="swiper-slide">
                          <div>
                              <img :src="item | setWH('140.127')" alt="">
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
  </div>
</template>

<script>
import Header from'@/components/Header';
export default {
    name:'datail',
    data(){
        return{
            detailMovie:{},
            isLoading:true
        }
    },
    components:{
        Header
    },
    props:['movieId'],
    methods:{
        handleToBack(){
            this.$router.back();
        }
    },
    mounted(){
        this.axios.get('/api/detailmovie?movieId='+this.movieId).then((res) => {
            let msg =res.data.msg;
            if(msg === 'ok'){
                this.detailMovie = res.data.data.detailMovie;
                this.isLoading=false;
                this.$nextTick(()=>{
                    new Swiper(this.$refs.detail_player,{
                        slidesPerView:'auto',
                        freeMode:true,
                        freeModeSticky:true
                    });
                })
            }
        }).catch((err) => {
            
        });
    }
}
</script>

<style scoped>
#detailContrainer{position: absolute;left: 0;top: 0;z-index: 100;width: 100%;min-height: 100%;background: white}
#content.contentDatail{display: block;margin-bottom: 0;}
#content .detail_list{height: 200px;width: 100%;position: relative;overflow: hidden;}
.detail_list .detail_list_bg{width: 100%;height: 100%;background: url() 0 40%;filter: blur(20px);background-size:cover;position: absolute;left: 0;top: 0;}
.detail_list .detail_list_filter{width: 100%;height: 100%;position: absolute;background-color: #40454d;opacity: .55;position: absolute;left: 0;top: 0;z-index: 1;}
.detail_list .detail_list_content{display: flex;width: 100%;height: 100%;position: absolute;left: 0;top: 0;z-index: 2;}
.detail_list .detail_list_img{width: 108px;height: 150px;border: 1px solid #f0f2f3;margin: 20px;}
.detail_list .detail_list_img img{width: 100%;height: 100%;}
.detail_list .detail_list_info{margin-top: 20px;}
.detail_list .detail_list_info h2{font-size: 20px;color: white;font-weight: normal;line-height: 40px;}
.detail_list .detail_list_info p{color: white;line-height: 20px;font-size: 14px;color: #ccc;}
.slide-enter-active{animation: .3s slideMovie;}
@keyframes slideMovie{
    0%{transform: translateX(100%);}
    100%{transform: translateX(0);}
}
 #content .detail_intro{padding: 10px;}
 #content .detail_player{margin: 20px;}
.detail_player .swiper-slide{width: 70px;margin-right: 20px;text-align: center;font-size: 14px;}
.detail_player .swiper-slide img{width: 100%;margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){color: #999;}
</style>