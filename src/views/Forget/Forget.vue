<template>
	<div class="login">

		<div class="box-card">

			<div class="header-title">
				忘记密码
			</div>
			<el-form :inline="true" :model="forgetForm" ref="forgetForm" :rules="rules" class="demo-form-inline">
				<el-form-item prop="username" class="form-item">
					<el-input class="form" v-model="forgetForm.username" placeholder="请输入用户名"
						prefix-icon='el-icon-user' />
				</el-form-item>
				<el-form-item prop="email" class="form-item">
					<el-input class="form" v-model="forgetForm.email" placeholder="请输入邮箱"
						prefix-icon='el-icon-message' />
				</el-form-item>
				<el-button class="btn" :round='true' @click="forget('forgetForm')">确定</el-button>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				forgetForm: {
					username: '',
					email: '',
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
					},],
				}
			}
		},
		methods: {
			changeRole(e) {},
			forget(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						const username = this.forgetForm.username;
						const email = this.forgetForm.email;
						this.forgetPassword(username,email);
					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},
			toLogin(){
				this.$router.push({name: 'login'})
			},
			async forgetPassword(username,eamil){
				const res = await this.$http.get(`/user/customer/forget?username=${username}&email=${eamil}`);
				console.log(res);
				if(res.data.code === 0){
					this.$message.success({
						duration: 2000,
						message: '重置成功，新的密码已发送到您的邮箱'
					})
					let time = setTimeout(()=>{
						this.$router.push({name: 'login'});
						clearTimeout(time)
					},2000)
					
				}else{
					this.$message.error('重置失败')
					
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
		width: 280px;
		height: 340px;
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

	.btn {
		margin-top: 40px;
		width: 100%;
		height: 40px;
		background-color: aqua;
		margin-bottom: 12px;
	}

	
</style>
