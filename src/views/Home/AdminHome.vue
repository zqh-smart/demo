<template>
	<div id="AdminHome">
		<div class="navwrap">
			<el-menu :default-active="activeRoute" class="header-nav" :router="true" background-color="#4f7d94"
				text-color="#fff" active-text-color="#ffd04b" @select="changeRecord">
				<el-menu-item index="/adminHome/about" class="item">首页</el-menu-item>
				<el-menu-item index="/adminHome/counsel" class="item">疫情资讯</el-menu-item>
				<el-menu-item index="/adminHome/policy" class="item">抗议政策</el-menu-item>
				<el-menu-item index="/adminHome/dynamic" class="item">防疫动态</el-menu-item>
				<el-menu-item index="/adminHome/center" class="item">个人中心</el-menu-item>
				<el-menu-item index="/admin/background" class="item">后台管理</el-menu-item>
			</el-menu>
		</div>
		
		<el-carousel height="220px" class="carousel" v-show="activeRoute === '/adminHome/about' ||
		activeRoute === '/adminHome/counsel' || activeRoute ===  '/adminHome/policy' || activeRoute === '/adminHome/dynamic'
		
		">
			<el-carousel-item v-for="(item,index) in bannerLists" :key="index">
				<el-image :src="item.image" fit="fill"></el-image>
			</el-carousel-item>
		</el-carousel>
		
		<router-view />


		<div class="bottom" v-if="currentPath != `/adminHome/center`">
			<div class="bottom-line">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				defaultActive: '/adminHome/about',
				currentPath: '',
				bannerLists: null
			}
		},
		computed: {
			activeRoute() {
				console.log(this.$route.path);
				if (this.$route.path.indexOf('/adminHome/counsel/detail') != -1) {
					return '/adminHome/counsel'
				} else if (this.$route.path.indexOf('/adminHome/policy/detail') != -1) {
					return "/adminHome/policy"
				} else if (this.$route.path.indexOf('/adminHome/dynamic/detail') != -1) {
					return "/adminHome/dynamic"
				} else if (this.$route.path === '/adminHome/center/warnMessage' ||
					this.$route.path === '/adminHome/center/collection' ||
					this.$route.path === '/adminHome/center/apply') {
					return '/adminHome/center';
				} else {
					return this.$route.path;
				}
			}
		},
		created() {
			console.log(1);
		},
		mounted() {
			// this.record()
			this.currentPath = this.defaultActive;
			this.getBanner()
		},
		methods: {
			//记录当前路由
			changeRecord(path) {
				this.currentPath = path;
			},

			//获取轮播图数据
			async getBanner() {
				const res = await this.$http.get(`/banner/queryAll?page=1&size=3`)
				const {
					code,
					data
				} = res.data;
				console.log(res)
				this.bannerLists = data.list;
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
		background-color: #4f7d94;
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

	.bottom {
		width: 1300px;
		margin: 0 auto;
		margin-top: 35px;
		margin-bottom: 20px;
		height: 60px;

	}

	.bottom-line {
		width: 100%;
		height: 40px;
		background-color: #4f7d94;
		position: relative;
	}

	.bottom-line::after {
		content: '';
		display: inline-block;
		height: 2px;
		width: 1200px;

		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
	}
</style>
