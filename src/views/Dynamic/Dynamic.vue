<template>
	<div id="Dynamic">
		<div class="title-line">
			<div class="line">
				防疫动态
			</div>
			<div class="right-search clearfix">
				<el-input class="input" placeholder="请输入内容" v-model="title">
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
				</el-input>
				<el-button type="warning" class="btn" @click="searchTilte()">搜索</el-button>
			</div>
		</div>
		<div class="content-wrap">
			<div class="content-item" v-for="(item,index) in contentArr" :key="index" @click="toDetail(index)">
				<el-image class="img" :src="item.thumb" fit="fill"></el-image>
				<div class="img-footer">
					<div class="collect-item">
						<i class="el-icon-star-off icon"></i>
						<span>{{item.collectNum}}</span>
					</div>
					<div class="discuss-item">
						<i class="el-icon-chat-dot-square icon"></i>
						<span>{{item.discussNum}}</span>
					</div>
				</div>
				<div class="text">
					{{item.title}}
				</div>
			</div>
		</div>
		
		<el-pagination
		class="pager"
		  :page-size="9"
		  :pager-count="7"
		  @current-change = 'changeData'
		  :current-page = 'currentPage'
		  layout="prev, pager, next"
		  :total="totalData">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				imgArr: [],
				contentArr:[],
				totalData: 0,
				currentPage: 1,
				title: ''
			}
		},
		mounted(){
			this.getDataAll()
		},
		methods: {
			async getDataAll(){
				const res = await this.$http.get(`/knowledge/queryAll?page=1&size=9`);
				console.log(res);
				this.totalData = res.data.data.total;
				console.log(this.totalData);
				this.contentArr = res.data.data.list;
			},
			//改变页码 更新数据
			async changeData(index){
				this.currentPage = index;
				const res = await this.$http.get(`/knowledge/queryAll?page=${this.currentPage}&size=9`);
				console.log(res);
				this.contentArr = res.data.data.list;
			},
			//搜索标题
			async searchTilte(){
				console.log(this.title);
				const res = await this.$http.get(`/knowledge/queryTitle?title=${this.title}`);
				console.log(res);
				this.contentArr = res.data.data.list;
			},
			toDetail(index){
				let str = JSON.parse(localStorage.getItem('info')).role;
				if (str === 'admin') {
					this.$router.push({
						path: `/adminHome/dynamic/detail/${this.contentArr[index].id}`,
					})
				} else {
					this.$router.push({
						path: `/userHome/dynamic/detail/${this.contentArr[index].id}`,
					})
				}

			}
		}
	
	}
</script>

<style scoped="scoped">
	.carousel {
		margin-top: 42px;
		width: 1200px;
		margin: 0 auto;
		margin-bottom: 40px;
	}
	
	.title-line {
		margin: 0 auto;
		width: 1200px;
	}

	.line {
		height: 36px;
		line-height: 36px;
		margin-bottom: 20px;
		background-color: #4f7d94;
		color: #fff;
		padding-left: 20px;
	}

	.right-search {
		float: right;
		margin-bottom: 30px;
	}

	.input {
		width: 200px;
	}

	/deep/ .el-input__inner {
		height: 30px;
	}

	/deep/ .el-input__icon {
		line-height: 30px;
	}

	.btn {
		margin-left: 20px;
		padding: 0px 30px;
		line-height: 28px;
	}

	.content-wrap {
		width: 1200px;
		margin: 0 auto;
		margin-top: 80px;
		display: flex;
		/* justify-content: space-between; */
		flex-wrap: wrap;
		text-align: center;
	}

	.content-item {
		/* flex: 1; */
		margin-right: 60px;
		margin-bottom: 40px;
		position: relative;
		cursor: pointer;
	}
	.content-item:nth-child(3n + 3){
		margin-right: 0;
	}

	.img {
		width: 360px;
		height: 180px;
		margin-bottom: 14px;
		border-radius: 10px;
	}
	
	.img-footer {
		position: absolute;
		bottom: 30px;
		height: 30px;
		width: 360px;
		background-color: #4f7d94;
		opacity: 0.4;
		border-radius: 10px;
		z-index: 10px;
	}
	.collect-item{
		position: absolute;
		left: 20px;
		height: 30px;
		width: 40px;
		line-height: 30px;
		font-size: 16px;
		color: #fff;
	}
	.icon{
		margin-right: 5px;
	}
	.discuss-item{
		position: absolute;
		right: 20px;
		height: 30px;
		width: 40px;
		line-height: 30px;
		font-size: 16px;
		color: #fff;
	}
	
	.pager{
		width: 960px;
		margin: 0 auto;
		text-align: center;
	}
</style>
