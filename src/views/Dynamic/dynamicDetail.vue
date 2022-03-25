<template>
	<div id="counsel-detail">
		<div class="line line-color">
			防疫动态
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
					<div class="icon-wrap" @click="collectionHandle">
						<i class="el-icon-star-off icon-item" v-if="!iscollection"></i>
						<i class="el-icon-star-on icon-item" v-else></i>
						<span>点击收藏</span>
					</div>
				</div>
			</div>
		</div>
		<div class="line text-wrap">
			<div class="text" v-bind:class="{activeText : isContent === index }" v-for="(item,index) in ['文章内容','评论']"
				@click="changeText(index)">
				{{item}}
			</div>
		</div>
		<div class="content-wrap">
			<div class="content" v-if="isContent === 0">
				{{info.content}} 内容
			</div>
			<div class="discuss-wrap" v-else>
				<div class="discuss-title">
					评论
				</div>
				<div class="my-discuss">
					<div class="item-left">
						<el-image style="width: 60px; height: 60px; border-radius: 50%;" :src="foo.avatar" fit="fill">
						</el-image>
					</div>
					<div class="item-right">
						<div class="discuss-name">
							{{foo.nickname}}
						</div>
						<div class="discuss-content">
							<el-input type="textarea" :rows="3" style="width: 600px;" placeholder="请输入内容"
								v-model="foo.content">
							</el-input>
							<el-button type="primary" style="margin-left: 30px;" @click="publish">发表</el-button>
						</div>
					</div>
				</div>
				<div class="hot-discuss-title discuss-title">
					热门评论 <i class="el-icon-magic-stick"></i>
				</div>
				<div class="discuss-item" v-for="(item,index) in discussArr" :key="index">
					<div class="item-left">
						<el-image style="width: 60px; height: 60px; border-radius: 50%;" :src="item.avatar" fit="fill">
						</el-image>
					</div>
					<div class="item-right">
						<div class="discuss-name">
							<!-- {{item.nickname}} -->
							zhangsan
						</div>
						<div class="discuss-content">
							<!-- {{item.content}} -->
							{{item}}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				info: '',
				isContent: 0,
				iscollection: '',
				discussArr: [],
				foo: null,
			}
		},
		async mounted() {
			//获取自己的信息
			const foo = JSON.parse(localStorage.getItem('info'));
			this.foo = {
				avatar: foo.avatar,
				uid: foo.id,
				username: foo.username,
				nickname: foo.nickname,
				content: '',
			}
			const uid = foo.id;
			let id = this.$route.params.id;
			console.log(uid, id);
			const res = await this.$http.get(`/knowledge/query?uid=${uid}&kid=${id}`);
			console.log(res);
			this.info = res.data.data.info;
			this.iscollection = res.data.data.hasCollect === 0 ? false : true;
			this.discussArr = res.data.data.discuss;
			console.log(this.iscollection);
		},
		methods: {
			changeText(index) {
				console.log(index);
				this.isContent = index;
			},
			//点击收藏 或者取消收藏
			async collectionHandle() {
				let kid = this.$route.params.id;
				let uid = JSON.parse(localStorage.getItem('info')).id;
				//收藏 取消收藏
				if (this.iscollection) {
					const res = await this.$http.get(`/knowledge/customer/uncollect?uid=${uid}&kid=${kid}`);
					console.log(res);
				} else { //点击收藏
					const res = await this.$http.get(`/knowledge/customer/collect?uid=${uid}&kid=${kid}`);
					console.log(res);
				}
				this.iscollection = !this.iscollection;

			},
			//发表评论
			async publish() {
				if (this.foo.content === '') {
					this.$message.error({
						offset: 200,
						message: '评论内容不能为空'
					})
					return;
				}
				console.log(this.foo);
				let kid = localStorage.getItem('kid')
				const res = await this.$http.get(`/knowledge/customer/discuss?id=${this.foo.uid}&
				uid=${this.foo.id}&kid=${kid}&content=${this.foo.content}`)
				console.log(res);
				if(res.data.code === 0){
					this.$message.success(res.data.msg);
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
		font-size: 22px;
		padding: 10px;
		height: 50px;
		box-sizing: border-box;
		border-bottom: 3px solid #E5EDF0;
	}

	.desc-content {
		box-sizing: border-box;
		padding: 8px;
		height: 210px;
		border-bottom: 3px solid #E5EDF0;
	}

	.desc-content-title {
		font-size: 16px;
		color: #000;
		margin-bottom: 5px;
	}

	.desc-content-main {
		text-indent: 2em;
	}

	.desc-author {
		padding: 10px;
		display: flex;
		justify-content: space-between;
		border-bottom: 3px solid #E5EDF0;
	}

	.desc-footer {
		box-sizing: border-box;
		height: 40px;
		padding: 10px;
		color: #000;
		cursor: pointer;
		float: right;
		font-size: 14px;
	}

	.desc-footer::after {
		content: '';
		display: block;
		height: 0;
		clear: both;
	}

	.content-wrap {
		min-height: 600px;
		width: 960px;
		margin: 0 auto;
		box-sizing: border-box;
		border-left: 50px solid #E5EDF0;
		border-right: 50px solid #E5EDF0;
	}

	.activeText {
		color: yellow;
	}

	.text-wrap {
		display: flex;
	}

	.text {
		margin-right: 20px;
		cursor: pointer;
	}

	.icon-item {
		font-size: 20px;
		margin-right: 5px;
		color: red;
	}


	.discuss-wrap {
		padding: 20px;
		width: 100%;
		height: 100%;
		/* border: 1px solid #ccc; */
		box-sizing: border-box;
		/* overflow: hidden; */
	}

	.discuss-item {
		height: 80px;
		padding: 10px;
		width: 100%;
		box-sizing: border-box;
		border: 1px solid #ccc;
		border-bottom: none;
		display: flex;
	}

	.item-right {
		margin-left: 10px;
	}

	.discuss-name {
		box-sizing: border-box;
		height: 30px;
		/* border: 1px solid; */
		line-height: 30px;
	}

	.discuss-content {
		height: 30px;
		line-height: 30px;
		box-sizing: border-box;
	}

	.discuss-title {
		font-size: 20px;
		margin-bottom: 20px;
	}

	.my-discuss {
		display: flex;
		margin-bottom: 80px
	}
</style>
