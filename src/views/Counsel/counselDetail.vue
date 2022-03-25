<template>
	<div id="counsel-detail">
		<div class="line line-color" >
			疫情资讯
		</div>
		<div class="desc-wrap">
			<el-image style="width: 400px; height: 320px" :src="info.thumb" fit="fill"></el-image>
			<div class="desc-right">
				<div class="desc-title">
					{{info.title}}
				</div>
				<div class="desc-content">
					<div class="desc-content-title">
						简介:
					</div>
					<div class="desc-content-main">
						{{info.intro}}
					</div>
				</div>
				<div class="desc-footer">
					<i class="el-icon-magic-stick" style="margin-right: 4px;"></i>{{info.hot}}
				</div>
			</div>
		</div>
		<div class="line">
			文章内容
		</div>
		<div class="content-wrap">
			<div class="content">
				{{info.content}}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				checked: '',
			}
		},
		async created() {
			console.log(this.$route.params);
			let id = this.$route.params.id;
			const res = await this.$http.get(`/news/query?id=${id}`);
			console.log(res);
			this.info = res.data.data.info;
		},
		methods: {

		}
	}
</script>

<style scoped="scoped">
	#counsel-detail{
		margin-top: 60px;
	}
	.line {
		width: 960px;
		margin: 0 auto;
		height: 36px;
		line-height: 36px;
		margin-bottom: 20px;
		background-color: #4f7d94;
		color: #fff;
		padding-left: 20px;
	}
	.line-color{
		background-color: #E5EDF0;
		color: #000;
	}
	.desc-wrap{
		font-size: 13px;
		color: #a5acb3;
		width: 960px;
		margin: 0 auto;
		margin-bottom: 40px;
		display: flex;
		justify-content: space-between;
	}
	.desc-right{
		box-sizing: border-box;
		border: 10px solid #E5EDF0;
		width: 400px;
		height: 320px;
	}
	.desc-title{
		color: #000;
		font-size: 20px;
		padding: 10px;
		border-bottom: 3px solid #E5EDF0;
		height: 50px;
		box-sizing: border-box;
	}
	.desc-content{
		padding: 8px;
		height: 200px;
		box-sizing: border-box;
		border-bottom: 3px solid #E5EDF0;
	}
	.desc-content-title{
		font-size: 16px;
		color: #000;
		margin-bottom: 5px;
	}
	.desc-content-main{
		text-indent: 2em;
	}
	.desc-footer{
		padding: 10px;
		height: 40px;
		color: #000;
		cursor: pointer;
		font-size: 18px;
		line-height: 30px;
		float: right;
	}
	.desc-footer::after{
		content: '';
		display: block;
		height: 0;
		clear: both;
	}
	.content-wrap{
		height: 600px;
		width: 960px;
		margin: 0 auto;
		box-sizing: border-box;
		border-left: 50px solid #E5EDF0;
		border-right: 50px solid #E5EDF0;
	}
</style>
