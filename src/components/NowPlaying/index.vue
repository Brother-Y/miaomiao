<template>
  <div class="movie_body" ref="movie_body">
      <Loading v-if="isLoading"/>
      <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
      <ul>
          <li class="pullDown">{{pullDomMsg}}</li>
          <li v-for='item in movieList' :key="item.id">
              <div class="pic-show" @tap="handleToDetail(item.id)"><img :src="item.img | setWH('128.180')" alt="dd"></div>
              <div class="info_list">
                  <h2 @tap="handleToDetail(item.id)">{{item.nm}} <img v-if="item.version" src="@/assets/3D.svg"></h2>
                  <p>观众评<span class="grade">{{item.sc}}</span></p>
                  <p>主演：{{item.star}}</p>
                  <p>{{item.showst}}</p>
              </div>
              <div class="btn_mall">
                  购票
              </div>
          </li>
      </ul>
      </Scroller>
  </div>
</template>

<script>


export default {
    name:'NowPlaying',
    data(){
        return {
            movieList : [],
            pullDomMsg : '',
            isLoading : true,
            prevCityId : -1
        }
    },
    activated(){
        let cityId = this.$store.state.city.id;
        if(this.prevCityId === cityId) {return;}
        this.isLoading = true;
        this.axios.get('/api/movieOnInfoList?cityId='+cityId).then(res=>{
            let msg = res.data.msg;
            if (msg == 'ok'){
                this.movieList=res.data.data.movieList;
                this.isLoading = false;
                this.prevCityId = cityId;
                // this.$nextTick(()=>{
                //     let scroll = new BScroll(this.$refs.movie_body,{
                //         tap:true,
                //         probeType:1
                //     });
                //     scroll.on('scroll',(pos)=>{
                //         this.pullDomMsg = '正在更新中';
                //         if(pos.y > 30){
                //             this.pullDomMsg = '正在更新中';
                //         }
                //     });
                //     scroll.on('touchEnd',(pos)=>{
                //         // console.log('touchend')
                //         if(pos.y > 30){
                //             this.axios.get('/api/movieOnInfoList?cityId=11').then(res=>{
                //                 let msg = res.data.msg;
                //                 if (msg == 'ok'){
                //                     this.pullDomMsg = '更新成功';
                //                     setTimeout(()=>{
                //                         this.movieList=res.data.data.movieList;
                //                         this.pullDomMsg = '';
                //                     },1000)
                //                 }
                //             });
                //         }
                //     });                   
                // });

            }
        })
    },
    methods:{
        handleToDetail(movieId){
            this.$router.push('/movie/detail/1/'+movieId)
        },
        handleToScroll(pos){
            this.pullDomMsg = '正在更新中';
            if(pos.y > 30){
                this.pullDomMsg = '正在更新中';
            }    
        },
        handleToTouchEnd(pos){
                // console.log('touchend')
                if(pos.y > 30){
                    this.axios.get('/api/movieOnInfoList?cityId=11').then(res=>{
                        let msg = res.data.msg;
                        if (msg == 'ok'){
                            this.pullDomMsg = '更新成功';
                            setTimeout(()=>{
                                this.movieList=res.data.data.movieList;
                                this.pullDomMsg = '';
                            },1000)
                        }
                    });
                }
        }
    }
}
</script>

<style scoped>
.movie_body{flex: 1;overflow: auto;}
.movie_body ul{margin: 0 12px;overflow: hidden;}
.movie_body ul li{margin-top: 12px;display: flex;align-items: center;border-bottom: 1px solid #e6e6e6;padding-bottom: 10px;}
.movie_body .pic_show{width: 64px;height: 90px;}
.movie_body .pic_show img{width: 100%;}
.movie_body .info_list{margin-left: 10px;flex: 1;position: relative;}
.movie_body .info_list h2{font-size: 17px;line-height: 24px; width: 150px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.movie_body .info_list p{font-size: 13px;color: #666;line-height: 22px;width: 150px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.movie_body .info_list p .grade{font-weight: 700;color: #faaf00;font-size: 15px;}
.movie_body .info_list .img{width: 50px;position: absolute;right: 10px;top: 5px;}
.movie_body .btn_mall, .movie_body .btn_pre{width: 47px;height: 27px;line-height: 28px;text-align: center;background-color: #f03d37;color: #fff;border-radius: 4px;font-size: 12px;cursor: pointer;}
.movie_body .btn_pre{background: #3c9fe6;}
.info_list h2 img{ width: 80px;height: 20px;}
.movie_body .pullDown{padding: 0;margin: 0;border: none} 
</style>