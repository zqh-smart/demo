<template>
	<div id="foo">
		<div class="foo-top">
			<div class="info-left">
				<el-image style="border-radius: 50%; height: 100px; width: 100px;margin-bottom: 10px;" fit="fill"
					:src="infoForm.url" :preview-src-list="avatarArr"></el-image>
				<div class="nickname-text" style="margin-bottom: 30px;">
					{{infoForm.nickname}}
				</div>

				<div class="role-text ">
					{{role}}
				</div>
			</div>
			<div class="info-right">
				<el-form :model="infoForm" ref="infoForm" :rules="rules" label-position="left" label-width="60px"
					class="infoForm">
					<el-form-item label="用户名" class="form-item" prop="username" label-width="70px">
						<el-input v-model="infoForm.username" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" class="form-item" prop="email" label-width="70px">
						<el-input v-model="infoForm.email" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="昵称" class="form-item" prop="nickname" label-width="70px">
						<el-input v-model="infoForm.nickname" :disabled="isDisabled"></el-input>
					</el-form-item>
					<el-form-item v-show="isDisabled" label="密码" class="form-item" prop="password" label-width="70px">
						<el-input v-model="infoForm.password" type="password" :disabled="isDisabled" show-password>
						</el-input>
					</el-form-item>
					<el-form-item v-show="!isDisabled" label="新密码" class="form-item" label-width="70px">
						<el-input v-model="infoForm.Newpassword" type="password" :disabled="isDisabled" show-password>
						</el-input>
					</el-form-item>
					<el-form-item v-show="!isDisabled" label="确定密码" class="form-item" label-width="100px">
						<el-input v-model="infoForm.Rpassword" type="password" :disabled="isDisabled" show-password>
						</el-input>
					</el-form-item>
					<el-form-item label="更改头像" class="form-item" label-width="70px">
						<el-upload :disabled="isDisabled" class="avatar-uploader" action="#" :http-request="addAvatar"
							:show-file-list="false">
							<el-image v-if="avatarUrl" :src="avatarUrl" class="avatar" style="width: 80px; height: 80px"
								fit="fill"></el-image>
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item class="save-btn">

						<el-button @click="save('infoForm')"
							style="background-color: #4f7d94; color: #fff; padding:8px 40px;">{{changeText}}</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<el-container class='foo-main'>
			<el-aside width="300px">
				<el-menu :default-active="defaultActive" class="foo-nav" :router="true" background-color=" #e5edf0"
					text-color="#000" active-text-color="#f6a480" @select="changeTitle">
					<el-menu-item index="/adminHome/center/warnMessage" style="border-bottom: none" class="item">预警消息
					</el-menu-item>
					<el-menu-item index="/adminHome/center/collection" class="item">我的收藏</el-menu-item>
					<el-menu-item index="/adminHome/center/apply" style="border-bottom: 1px solid #fff;" class="item">
						返乡申请</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main style="padding: 0;">
				<div class="main-title">
					{{title}}
				</div>
				<router-view />
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				avatarUrl: '',
				changeText: '修改基本信息',
				avatarArr: [],
				title: '预警消息',
				defaultActive: '/adminHome/center/warnMessage',
				currentPath: '',
				role: '普通用户',
				isDisabled: true,
				infoForm: {
					id: '',
					url: '',
					Newpassword: '',
					username: '',
					nickname: '',
					password: '',
					Rpassword: '',
					email: ''
				},
				rules: {
					username: [{
						required: true,
						message: '名字不能为空',
						trigger: 'blur'
					}, ],
					password: [{
						required: true,
						message: '密码不能为空',
						trigger: 'blur'
					}],
					nickname: [{
						required: true,
						message: '昵称不能为空',
						trigger: 'blur'
					}, ],
					email: [{
						required: true,
						message: '邮箱不能为空',
						trigger: 'blur'
					}, ],
				}
			}
		},
		mounted() {
			console.log(this.$route.path);
			if (this.$route.path != '/adminHome/center/warnMessage') {
				this.$router.replace({
					name: 'warnMessageAdmin'
				})
			}
			this.initInfoForm();
		},
		methods: {
			async addAvatar(data) {
				console.log(data)
				let file = data.file
				console.log(file);
				 let formData = new window.FormData();
				formData.append('file', file);
				const res = await this.$http.post(`/file/uploadPicture`, formData, {
					hearders: {
						'Content-Type': 'multipart/form-data' //注意这里
					}
				});
				console.log(res);
				this.avatarUrl = res.data.data.picture;
			},
			initInfoForm() {
				let info = JSON.parse(localStorage.getItem('info'))
				this.infoForm.id = info.id;
				this.infoForm.url = info.avatar;
				this.infoForm.nickname = info.nickname;
				this.infoForm.username = info.username;
				this.infoForm.email = info.email;
				this.infoForm.password = info.password;
				this.role = info.role === 'customer' ? '普通用户' : '管理员';
				this.avatarArr.push(this.infoForm.url);
				console.log(this.avatarArr);
			},
			save(formName) {
				if (this.isDisabled) {
					this.isDisabled = !this.isDisabled;
					this.infoForm.Newpassword = this.infoForm.Rpassword = '';
					this.changeText = '保存'
					console.log(1);
					return;
				}

				console.log(2);
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
						if (!reg.test(this.infoForm.email)) {
							this.$message.error('邮箱格式不正确');
						} else if (this.infoForm.Newpassword != this.infoForm.Rpassword) {
							this.$message.error('两次密码不正确')
						} else {
							this.infoForm.url = this.avatarUrl;
							if(this.infoForm.Newpassword != ''){
								this.infoForm.password = this.infoForm.Newpassword;
							}
							console.log(this.infoForm.password,'password');
							const res = await this.$http.post(`/user/update`, {
								id: this.infoForm.id,
								username: this.infoForm.username,
								password: this.infoForm.password,
								nickname: this.infoForm.nickname,
								avatar: this.infoForm.url
							});
							console.log(res);
							//更新浏览器缓存
							if (localStorage.getItem('info') != undefined) {
								let email = JSON.parse(localStorage.getItem('info')).email;
								localStorage.removeItem('info');
								const userInfo = await res.data.data.userInfo;
								userInfo.email = email;
								let info = JSON.stringify(userInfo);
								localStorage.setItem('info', info);
								console.log(localStorage.getItem('info'));
							}
							
							
							
							this.$message.success(res.data.msg);
							this.changeText = '修改基本信息'
							this.isDisabled = !this.isDisabled;
						}


					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			changeTitle(key, path) {
				if (key === '/adminHome/center/warnMessage') {
					this.title = '预警消息'
				} else if (key === '/adminHome/center/collection') {
					this.title = '我的收藏'
				} else {
					this.title = '返乡申请'
				}
			}
		}
	}
</script>

<style scoped="scoped">
	#foo {
		margin: 0 auto;
		width: 1200px;
		margin-top: 42px;
		background-color: #e5edf0;
	}

	.foo-top {
		height: 400px;
		/* background-color: #f40; */
		display: flex;

	}

	.foo-top .info-left {
		width: 450px;
		padding: 30px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.role-text {
		padding: 6px 24px;
		color: #fff;
		font-size: 14px;
		background-color: #4f7d94;
	}

	.foo-top .info-right {
		position: relative;
	}

	.foo-top .info-right .infoForm {
		display: flex;
		padding: 50px;
		flex-wrap: wrap;
		box-sizing: border-box;
		/* justify-content: space-around; */
	}

	.form-item {
		margin-right: 100px;
	}

	.save-btn {
		position: absolute;
		bottom: 20px;
		right: 200px;
	}

	.foo-main {
		border-top: 1px solid #fff;
		width: 1200px;
		height: 400px;
		margin: 0 auto;
	}

	.foo-nav {
		text-align: center;
		height: 100%;
		border-right: 1px solid #fff;
	}

	.foo-nav .item {
		border-top: 1px solid #fff;
	}

	.main-title {
		padding: 20px 60px;
		color: #f6a480;
		border-bottom: 1px solid #fff;
	}

	.avatar-uploader {
		height: 80px;
		width: 80px;
		border: 1px solid #ccc;
		text-align: center;
		line-height: 80px;
	}
</style>
