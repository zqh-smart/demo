<template>
	<div id="counsel-detail">
		<div class="line line-color">
			抗疫政策
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
				<div class="desc-author">
					<div class="author-name">
						{{info.author}}
					</div>
					<div class="auhtor-date">
						{{info.publishTime}}
					</div>
				</div>
				<div class="desc-footer">
					<div class="left-markRead">
						<div class="isread" @click="read()">
							<i class="el-icon-check" v-show="isRead"></i>
						</div>
						<span>标记已读</span>
					</div>
					<div class="right-number">
						<span>已读人数：{{info.markReader}}</span>
					</div>

					
				</div>
			</div>
		</div>
		<div class="line">
			文章内容
		</div>
		<div class="content-wrap">
			<div class="content">

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				info: '',
				isRead: false,
			}
		},
		async mounted() {
			const uid = JSON.parse(localStorage.getItem('info')).id;
			console.log(uid,'uid')
			let id = this.$route.params.id;
			const res = await this.$http.get(`/policy/query?uid=${uid}&pid=${id}`);

			console.log(res);
			this.info = res.data.data.info;
			if (res.data.data.hasReader === 1) {
				this.isRead = true;
			}
		},
		methods: {
			async read() {
				if (!this.isRead) {
					const uid = JSON.parse(localStorage.getItem('info')).id;
					const pid = this.$route.params.id;
					const res = await this.$http.get(`/policy/reader?uid=${uid}&pid=${pid}`)
					console.log(res);
					this.isRead = true;
					if (res.data.code === 0) {
						this.$message.success(res.data.msg);
					}
				}
			}
		}
	}
</script>

<style scoped="scoped">
	#counsel-detail {
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

	.line-color {
		background-color: #E5EDF0;
		color: #000;
	}

	.desc-wrap {
		font-size: 13px;
		color: #a5acb3;
		width: 960px;
		margin: 0 auto;
		margin-bottom: 40px;
		display: flex;
		justify-content: space-between;
	}

	.desc-right {
		box-sizing: border-box;
		border: 10px solid #E5EDF0;
		width: 400px;
		height: 320px;
	}

	.desc-title {
		color: #000;
		font-size: 20px;
		padding: 10px;
		border-bottom: 3px solid #E5EDF0;
	}

	.desc-content {
		padding: 8px;
		height: 160px;
		/* min-height: 160px; */
		border-bottom: 3px solid #E5EDF0;
	}

	.desc-content-title {
		font-size: 16px;
		color: #000;
		margin-bottom: 5px;
	}
	.desc-content-main{
		text-indent: 2em;
	}
	.desc-author {
		padding: 10px;
		display: flex;
		justify-content: space-between;
		border-bottom: 3px solid #E5EDF0;
	}

	.desc-footer {
		padding: 10px 20px;
		color: #000;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		
	}

	.content-wrap {
		height: 600px;
		width: 960px;
		margin: 0 auto;
		box-sizing: border-box;
		border-left: 50px solid #E5EDF0;
		border-right: 50px solid #E5EDF0;
	}

	.isread {
		height: 20px;
		width: 20px;
		border: 1px solid #000;
		font-size: 18px;
		color: #38f;
		display: inline-block;
		margin-right: 5px;
	}
</style>
