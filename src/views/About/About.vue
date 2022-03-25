<template>
	<div id="about">
		<div class="content" v-for="(item,index) in content" :key='index'>
			<div class="content-title">
				<div class="recommend">
					{{titleArr[index]}}
				</div>
				<div>
					{{item.text}}
				</div>
			</div>
			<div class="content-img">
				<div class="img-box" v-for="(item1,index1) in item" @click="toDetail(item1,index)">
					<el-image :src="item1.thumb" fit="fill" class='item-img'></el-image>
					<div class="img-text">
						{{item1.title}}
					</div>
				</div>
			</div>
			<div class="content-bottom">
				查看更多》
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				titleArr: ['疫情资讯推荐', '疫情政策展示', '疫情动态'],
				content: [],
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			//获取数据
			async getData() {
				const res1 = await this.$http.get(`/news/queryAll?page=1&size=3`);
				const res2 = await this.$http.get(`/policy/queryAll?page=1&size=3`);
				const res3 = await this.$http.get(`/knowledge/queryAll?page=1&size=3`);
				this.content.push(res1.data.data.list);
				this.content.push(res2.data.data.list);
				this.content.push(res3.data.data.list);
			},
			toDetail(value, index) {
				console.log(index)
				let str = JSON.parse(localStorage.getItem('info')).role;
				if (index === 0) {
					if (str === 'admin') {
						this.$router.push({
							path: `/adminHome/counsel/detail/${value.id}`,
						})
					} else {
						this.$router.push({
							path: `/userHome/counsel/detail/${value.id}`,
						})
					}
				} else if (index === 1) {
					if (str === 'admin') {
						this.$router.push({
							path: `/adminHome/policy/detail/${value.id}`,
						})
					} else {
						this.$router.push({
							path: `/userHome/policy/detail/${value.id}`,
						})
					}
				} else if (index === 2) {
					if (str === 'admin') {
						this.$router.push({
							path: `/adminHome/dynamic/detail/${value.id}`,

						})
					} else {
						this.$router.push({
							path: `/userHome/dynamic/detail/${value.id}`,

						})
					}
				}
			},

		}
	}
</script>

<style scoped="scoped">
	.carousel {
		margin: 0 auto;
		margin-top: 42px;
		width: 1200px;
		margin-bottom: 40px;
	}

	.content {
		margin-bottom: 40px;
	}

	.content-title {
		width: 120px;
		text-align: center;
		margin: 0 auto;
		color: green;
	}

	.recommend {
		font-size: 20px;
		margin-bottom: 8px;
	}

	.content-img {
		width: 1200px;
		margin: 0 auto;
		/* text-align: center; */
		margin-top: 20px;
		display: flex;
		/* justify-content: space-between; */
	}

	.content-img .img-box {
		width: 360px;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-right: 60px;
		cursor: pointer;
	}

	.item-img {
		width: 360px;
		height: 180px;
		border-radius: 10px;
		margin-bottom: 8px;
	}

	.img-text {
		font-size: 13px;
	}

	.content-bottom {
		width: 120px;
		text-align: center;
		margin: 0 auto;
		margin-top: 26px;
		font-size: 14px;
		color: orange;
	}
</style>
