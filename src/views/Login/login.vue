<template>
	<div class="login">

		<div class="box-card">

			<div class="header-title">
				疫情返乡人员管理系统登录
			</div>
			<el-form :inline="true" :model="loginForm" ref="loginForm" :rules="rules" class="demo-form-inline">
				<el-form-item prop="username" class="form-item">
					<el-input class="form" v-model="loginForm.username" placeholder="请输入用户名"
						prefix-icon='el-icon-user' />
				</el-form-item>
				<el-form-item prop="password" class="form-item">
					<el-input class="form" v-model="loginForm.password" show-password placeholder="请输入密码"
						prefix-icon='el-icon-lock' />
				</el-form-item>
				<div class="forget" @click="toForget">
					忘记密码
				</div>

				<el-form-item class="radio-wrap" label="角色">
					<el-radio-group v-model="loginForm.role" @change="changeRole">
						<el-radio label="admin">管理员</el-radio>
						<el-radio label="user">用户</el-radio>
					</el-radio-group>
				</el-form-item>
				<div class="bottom-wrap">
					<el-button class="btn" :round='true' @click="login('loginForm')">登录</el-button>
					<span class="tip" @click="toRegister">没有账号，注册新账号</span>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loginForm: {
					username: '',
					password: '',
					role: 'admin'
				},
				rules: {
					username: [{
						required: true,
						message: '用户名不能为空',
						trigger: 'blur'
					}, ],
					password: [{
						required: true,
						message: '密码不能为空',
						trigger: 'blur'
					}, ]
				}
			}
		},
		mounted(){
			console.log(localStorage.getItem('info'))
			localStorage.removeItem("record");
			localStorage.removeItem('adminRecord')
			localStorage.removeItem('token');
			localStorage.removeItem('info');
		},
		methods: {
			changeRole(e) {},
			login(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {

						const username = this.loginForm.username;
						const password = this.$md5(this.loginForm.password);
						if (this.loginForm.role === 'admin') {
							console.log(this.loginForm.role)
							this.adminLogin(username, password);
						} else {
							this.userLogin(username, password)
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},
			async adminLogin(username, password) {
				const res = await this.$http.get(`/user/admin/login?username=${username}&password=${password}`);
				console.log(res);
				//登录成功之后的操作
				const code = res.data.code;
				console.log(code);
				
				if(code == 0){
					const userInfo = res.data.data.userInfo;
					console.log(userInfo);
					const token = this.$md5( `${userInfo.nickname}${userInfo.role}`);
					//保存用户信息
					localStorage.setItem('token',token);
					localStorage.setItem('info',JSON.stringify(userInfo));
					// return;
					this.$router.push({name: 'adminHome'})
					this.$message.success({
						message: '登录成功',
						duration: 1000
					})
				}else{
					let msg = res.data.msg;
					console.log(msg);
					this.$message.error(msg);
				}
			},
			async userLogin(username, password) {
				const res = await this.$http.get(`/user/customer/login?username=${username}&password=${password}`);
				// console.log(res);
				//登录成功之后的操作
				console.log(res);
				const code = res.data.code;
				if(code === 0){
					const userInfo = res.data.data.userInfo;
					let info = JSON.stringify(userInfo);
					localStorage.setItem('info',info);
					const token = this.$md5( `${userInfo.nickname}${userInfo.role}`);

					//保存用户信息
					localStorage.setItem('token',token);
					// return;
					this.$message.success({
						message: '登录成功',
						duration: 1000
					})
					this.$router.push({name: 'userHome'})
				}else{
					let msg = res.data.msg;
					this.$message.error(msg);
				}
			},
			toRegister(){
				console.log(1);
				this.$router.push({name: 'register'})
			},
			toForget(){
				this.$router.push({name: 'forget'})
			}
		}
	}
</script>

<style scoped="scoped">
	.login {
		height: 100%;
		background-image: url(../../assets/img/login.jpg);
		background-size: 100% 100%;
		position: relative;
		color: #4F7D94;
	}

	.box-card {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 320px;
		height: 380px;
		border-radius: 16px;

		background-color: rgba(255, 255, 255, 0.4);

		box-sizing: border-box;
		padding: 30px 20px;
	}

	.box-card .header-title {
		font-size: 20px;
		text-align: center;
		color: #4F7D94;
		margin-bottom: 50px;
	}

	.bottom-wrap {
		width: 100%;
	}

	.form-item {
		width: 100%;
		margin-bottom: 20px;
	}

	/deep/ .form-item .el-form-item__content {
		width: 100%;
	}

	/deep/ .form-item .el-input__inner {
		height: 40px;
		border-radius: 20px;
		width: 100%;
	}

	.forget {
		float: right;
		font-size: 12px;
		cursor: pointer;
	}

	.radio-wrap {
		margin-top: 20px;
		margin-bottom: 10px;
	}

	.bottom-wrap .btn {
		width: 100%;
		height: 40px;
		background-color: #4F7D94;
		margin-bottom: 12px;
		border: none;
		color: #fff;
	}

	.bottom-wrap .tip {
		float: right;
		font-size: 12px;
		cursor: pointer;
	}
</style>
