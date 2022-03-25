<template>
	<el-container id='background'>
	  <el-header class='header'>
			<div class="header-title">
				疫情返乡人员管理系统
			</div>
			<div class="header-btn" @click="exit()">退出登录</div>
	  </el-header>
	  <el-container >
	    <el-aside width="180px" style='min-height: 680px;'>
				 <el-menu
			      :default-active="$route.path"
			      background-color="#4f7d94"
			      text-color="#fff"
				  active-text-color='#38f'
				  :router="true"
				  style="height: 100%;"
			      >
			      <el-menu-item index="/admin/background/about">
			        <i class="el-icon-s-home"></i>
			        <span slot="title">首页</span>
			      </el-menu-item>
			      <el-menu-item index="/admin/background/user">
			        <i class="el-icon-user"></i>
			        <span slot="title">用户管理</span>
			      </el-menu-item>
				  <el-menu-item index="/admin/background/counsel">
				    <i class="el-icon-document"></i>
				    <span slot="title">资讯管理</span>
				  </el-menu-item>
				  <el-menu-item index="/admin/background/policy">
				    <i class="el-icon-s-management"></i>
				    <span slot="title">政策管理</span>
				  </el-menu-item>
				  <el-menu-item index="/admin/background/knowledge">
				    <i class="el-icon-reading"></i>
				    <span slot="title">知识管理</span>
				  </el-menu-item>
				  <el-menu-item index="/admin/background/return">
				    <i class="el-icon-s-flag"></i>
				    <span slot="title">返乡管理</span>
				  </el-menu-item>
				  <el-menu-item index="/admin/background/waring">
				    <i class="el-icon-warning"></i>
				    <span slot="title">预警管理</span>
				  </el-menu-item>
				  <el-menu-item index="/admin/background/banner">
				    <i class="el-icon-warning"></i>
				    <span slot="title">轮播图管理</span>
				  </el-menu-item>
			    </el-menu>
		</el-aside>
	    <el-main>
			<router-view></router-view>
		</el-main>
	  </el-container>
	</el-container>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			exit(){
				this.$router.push({name: 'login'})
			}
		}
	}
</script>

<style scoped="scoped">
	.header{
		height: 50px;
		text-align: center;
		line-height: 50px;
		background-color: #E5EDF0;
		position: relative;
	}
	.header-title{
		font-size: 22px;
		color: #4F7D94;
	}
	.header-btn{
		position: absolute;
		right: 20px;
		bottom: -5px;
		font-size: 14px;
		color: #999;
		padding: 0;
		cursor: pointer;
	}
	.header-btn:hover{
		color: red;
	}
</style>
