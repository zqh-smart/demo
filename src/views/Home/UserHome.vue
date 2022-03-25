<template>
	<div id="UserHome">
		<div class="navwrap">
			<el-menu :default-active="activeRoute"  class="header-nav" :router="true" background-color="#4f7d94" text-color="#fff"
				active-text-color="#ffd04b" >
				<el-menu-item index="/userHome/about" class="item">首页</el-menu-item>
				<el-menu-item index="/userHome/counsel" class="item">疫情资讯</el-menu-item>
				<el-menu-item index="/userHome/policy" class="item">抗疫政策</el-menu-item>
				<el-menu-item index="/userHome/dynamic" class="item">防疫动态</el-menu-item>
				<el-menu-item index="/userHome/center" class="item">个人中心</el-menu-item>
			</el-menu>
			<div class="header-btn" @click="exit()">退出登录</div>
		</div>
		
		<el-carousel height="220px" class="carousel" v-show="activeRoute != '/userHome/center'">
			<el-carousel-item v-for="(item,index) in imgArr" :key="index">
				<el-image :src="item.image" fit="fill"></el-image>
			</el-carousel-item>
		</el-carousel>
		
		<router-view />
		
		
		<div class="bottom">
			<div class="bottom-line">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				imgArr: [],
			}
		},
		computed:{
			activeRoute(){
				console.log(this.$route.path);
				if(this.$route.path.indexOf('/userHome/counsel/detail') != -1){
					return '/userHome/counsel'
				}else if(this.$route.path.indexOf('/userHome/policy/detail') != -1){
					return "/userHome/policy"
				}else if(this.$route.path.indexOf('/userHome/dynamic/detail') != -1){
					return "/userHome/dynamic"
				}else if(this.$route.path === '/userHome/center/warnMessage' || 
						 this.$route.path === '/userHome/center/collection' ||
						 this.$route.path === '/userHome/center/apply'){
					return '/userHome/center';
				}else{
					return this.$route.path;
				}
			}
		},
		mounted(){
			this.getBanner()
		},
		methods:{
			async getBanner(){
				const res = await this.$http.get(`/banner/queryAll?page=1&size=3`)
				console.log(res);
				this.imgArr = res.data.data.list;
			},
			exit(){
				this.$router.push({name: 'login'})
			}
		}
	}
</script>

<style scoped="scoped">
	.navwrap {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 999;
		background-color:#4f7d94;
	}
	.header-btn{
		position: absolute;
		right: 20px;
		bottom: 8px;
		font-size: 14px;
		color: #000;
		padding: 0;
		cursor: pointer;
	}
	.header-btn:hover{
		color: red;
	}
	.navwrap .header-nav {
		width: 1200px;
		height: 42px;
		margin: 0 auto;
		display: flex;
		border: none;
	}

	.header-nav .item {
		flex: 1;
		line-height: 42px;
		height: 42px;
		text-align: center;
		border-bottom: none !important;
	}

	.carousel {
		margin: 0 auto;
		margin-top: 42px;
		width: 1200px;
		margin-bottom: 40px;
	}

	/deep/ .el-carousel__arrow {
		height: 100%;
		border-radius: 0;
		width: 42px;
	}

	/deep/ .el-carousel__arrow--left {
		left: 0
	}

	/deep/ .el-carousel__arrow--right {
		right: 0;
	}

	/deep/ .el-carousel__indicators li .el-carousel__button {
		border-radius: 50%;
		width: 10px;
		height: 10px;
	}

	/deep/ .is-active .el-carousel__button {
		background-color: #f40;
	}
	
	.bottom{
		width: 1300px;
		margin: 0 auto;
		margin-top: 35px;
		margin-bottom: 20px;
		height: 60px;
		
	}
	.bottom-line{
		width: 100%;
		height: 40px;
		background-color:#4f7d94;
		position: relative;
	}
	.bottom-line::after{
		content: '';
		display: inline-block;
		height: 2px;
		width: 1200px;
		
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: #fff;
	}
</style>
