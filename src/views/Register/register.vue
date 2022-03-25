<template>
	<div class="login">

		<div class="box-card">

			<div class="header-title">
				疫情返乡人员管理系统注册
			</div>
			<el-form :inline="true" :model="registerForm" ref="registerForm" :rules="rules" class="demo-form-inline">
				<el-form-item prop="username" class="form-item">
					<el-input class="form" v-model="registerForm.username" placeholder="用户名,2-16个字符组成"
						prefix-icon='el-icon-user' />
				</el-form-item>
				<el-form-item prop="email" class="form-item">
					<el-input class="form" v-model="registerForm.email" placeholder="请输入邮箱"
						prefix-icon='el-icon-message' />
				</el-form-item>
				<el-form-item prop="activeCode" class="form-item activeForm">
					<el-input class="form" v-model="registerForm.activeCode" placeholder="请输入激活码"
						prefix-icon='el-icon-circle-check'>
						<el-button slot="append" v-if="activeCodeText != ''" style="width: 100px; border-radius: 0px 20px 20px 0;"
							@click='getActiveCode'>{{activeCodeText}}</el-button>
						<el-button slot="append" v-else style="width: 100px; border-radius: 0px 20px 20px 0;"
								>{{timer + 's'}}</el-button>
					</el-input>
				</el-form-item>


				<div class="bottom-wrap">
					<el-button class="btn" :round='true' @click="register('registerForm')">注册</el-button>
					<span class="tip" @click="toLogin">已有账号，点击此处登录</span>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				timer: 60,
				time: null,
				isChecked: false,
				activeCodeText: '',
				registerForm: {
					username: '',
					email: '',
					activeCode: '',
				},
				rules: {
					username: [{
						required: true,
						message: '用户名不能为空',
						trigger: 'blur'
					}, ],
					email: [{
						required: true,
						message: '密码不能为空',
						trigger: 'blur'
					}, ],
					activeCode: [{
						required: true,
						message: '激活码不能为空',
						trigger: 'blur'
					}, ]
				}
			}
		},
		created(){
			this.activeCodeText = '发送激活码'
			if(this.time){
				clearInterval(this.time);
			}
		},
		beforeDestroy() {
			if(this.time){
				clearInterval(this.time);
			}
			
		},
		methods: {
			changeRole(e) {},
			register(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log('校验成功')
						const username = this.registerForm.username;
						const email = this.registerForm.email;
						const code = this.registerForm.activeCode;
						this.UserRegister(username, email, code);

					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},
			toLogin() {
				this.$router.push({
					name: 'login'
				})
			},
			//获取激活码
			async getActiveCode() {
				if (this.registerForm.username === '' || this.registerForm.email === '') {
					this.$message.error('请输入用户名或邮箱')
					return;
				}

				if (!(this.activeCodeText == '发送激活码' || this.activeCodeText == '再次发送')) {
					console.log(this.activeCodeText);
					return;
				}
				const username = this.registerForm.username;
				const email = this.registerForm.email;
				console.log(username, email);

				this.activeCodeText = '';
				
				if(this.time){
					clearInterval(this.time);
				}
					
				this.time = setInterval(() => {
					
					// console.log(timer);
					this.timer --;
					if (this.timer === 0) {
						clearInterval(this.time)
						this.activeCodeText = '再次发送'
					}
				}, 1000)

				const res = await this.$http.get(`/user/customer/regist/getCode?username=${username}&email=${email}`);
				console.log(res);
				const code = res.data.code;
				console.log(code);


				if(code === 0){
					this.$message.success('激活码已发送')
					this.isChecked = true;
				}else{
					this.$message.error('发送失败')
				}
			},
			//用户注册
			async UserRegister(username, email, code) {
				if(!this.isChecked){
					this.$message.error('未发送验证码');
					return;
				}
				const res = await this.$http.get(
					`/user/customer/regist?username=${username}&email=${email}&code=${code}`)
				if (res.data.code === 0) {
					console.log(res.data.data.userInfo)
					const userInfo = res.data.data.userInfo;
					let info = JSON.stringify(userInfo);
					localStorage.setItem('info', info);
					const token = this.$md5(`${userInfo.nickname}${userInfo.role}`);

					//保存用户信息
					localStorage.setItem('token', token);

					console.log(localStorage.getItem('info'))
					this.$message.success('注册成功,3秒后自动登录')

					let time = setTimeout(() => {
						this.$router.push({
							name: 'userHome'
						});
						clearTimeout(time)
					}, 3000)

				} else {
					this.$message.error(res.data.msg);
				}
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
	}

	.box-card {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 320px;
		height: 380px;
		border-radius: 16px;

		background-color: rgba(255, 255, 255, 1);

		box-sizing: border-box;
		padding: 30px 20px;
	}

	.box-card .header-title {
		font-size: 20px;
		text-align: center;
		color: #000000;
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

	/deep/ .activeForm .el-input__inner {
		height: 40px;
		border-radius: 20px 0px 0px 20px;
		width: 100%;
	}

	.bottom-wrap .btn {
		width: 100%;
		height: 40px;
		background-color: aqua;
		margin-bottom: 12px;
	}

	.bottom-wrap .tip {
		float: right;
		font-size: 12px;
		cursor: pointer;
	}
</style>
