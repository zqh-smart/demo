import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)


import Login from '../views/Login/login.vue'
import AdminHome from '../views/Home/AdminHome.vue'
import UserHome from '../views/Home/UserHome.vue'

const router = new Router({
	routes: [{
			path: '/',
			redirect: '/login'
		},
		{
			name: 'login',
			path: '/login',
			component: Login
		},
		{
			name: 'register',
			path: '/register',
			component: () => import('../views/Register/register.vue')
		},
		{
			name: 'forget',
			path: '/forget',
			component: () => import('../views/Forget/Forget.vue')
		},
		{
			name: 'adminHome',
			path: '/adminHome',
			redirect: '/adminHome/about',
			component: AdminHome,
			children: [{
					path: '/adminHome/about',
					name: 'adminHomeAbout',
					component: () => import("../views/About/About.vue"),
					meta: {
						title: "首页"
					}
				},
				{
					path: '/adminHome/counsel',
					name: 'adminHomeCounsel',
					component: () => import("../views/Counsel/Counsel.vue"),
					meta: {
						title: "疫情咨询"
					}
				},
				{
					path: '/adminHome/counsel/detail/:id',
					name: 'adminHomeCounselDetail',
					component: () => import("../views/Counsel/counselDetail.vue"),
					meta: {
						title: "咨询详情"
					}
				},
				{
					path: '/adminHome/policy',
					name: 'adminHomePolicy',
					component: () => import("../views/Policy/Policy.vue"),
					meta: {
						title: "疫情政策"
					}
				},
				{
					path: '/adminHome/policy/detail/:id',
					name: 'adminHomePolicyDetail',
					component: () => import("../views/Policy/policyDetail.vue"),
					meta: {
						title: "政策详情"
					}
				},
				{
					path: '/adminHome/dynamic',
					name: 'adminHomeDynamic',
					component: () => import("../views/Dynamic/Dynamic.vue"),
					meta: {
						title: "疫情动态"
					}
				},
				{
					path: '/adminHome/dynamic/detail/:id',
					name: 'adminHomeDynamicDetail',
					component: () => import("../views/Dynamic/dynamicDetail.vue"),
					meta: {
						title: "动态详情"
					}
				},
				{
					path: '/adminHome/center',
					name: 'adminHomeCenter',
					redirect: '/adminHome/center/warnMessage',
					component: () => import("../views/Foo/AdminFoo.vue"),
					meta: {
						title: "个人中心"
					},
					children: [{
							path: '/adminHome/center/warnMessage',
							name: 'warnMessageAdmin',
							component: () => import("../views/Foo/Message/message.vue"),
							meta: {
								title: "预警消息"
							}
						},
						{
							path: '/adminHome/center/collection',
							name: 'collectionAdmin',
							component: () => import("../views/Foo/Collection/collection.vue"),
							meta: {
								title: "我的收藏"
							}
						},
						{
							path: '/adminHome/center/apply',
							name: 'applyAdmin',
							component: () => import("../views/Foo/Apply/apply.vue"),
							meta: {
								title: "返乡申请"
							}
						},
					]
				},
			]
		},
		{
			name: 'adminBackground',
			path: '/admin/background',
			redirect: '/admin/background/about',
			component: () => import('../views/Background/background.vue'),
			children: [{
					path: '/admin/background/about',
					component: () => import("../views/Background/about/about.vue"),
					meta: {
						title: "首页"
					}
				},
				{
					path: '/admin/background/counsel',
					component: () => import("../views/Background/counselAdmin/counselAdmin.vue"),
					meta: {
						title: "资讯管理"
					}
				},
				{
					path: '/admin/background/knowledge',
					component: () => import("../views/Background/knowledgeAdmin/knowledgeAdmin.vue"),
					meta: {
						title: "知识管理"
					}
				},
				{
					path: '/admin/background/policy',
					component: () => import("../views/Background/policyAdmin/policyAdmin.vue"),
					meta: {
						title: "政策管理"
					}
				},
				{
					path: '/admin/background/return',
					component: () => import("../views/Background/returnAdmin/returnAdmin.vue"),
					meta: {
						title: "返乡申请管理"
					}
				},
				{
					path: '/admin/background/user',
					component: () => import("../views/Background/userAdmin/userAdmin.vue"),
					meta: {
						title: "用户管理"
					}
				},
				{
					path: '/admin/background/waring',
					component: () => import("../views/Background/waringAdmin/waringAdmin.vue"),
					meta: {
						title: "预警管理"
					}
				},
				{
					path: '/admin/background/banner',
					component: () => import("../views/Background/banner/banner.vue"),
					meta: {
						title: "轮播图管理"
					}
				},
			]
		},
		{
			name: 'userHome',
			path: '/userHome',
			redirect: '/userHome/about',
			component: UserHome,
			children: [{
					path: '/userHome/about',
					name: 'userHomeAbout',
					component: () => import("../views/About/About.vue"),
					meta: {
						title: "首页"
					}
				},
				{
					path: '/userHome/counsel',
					name: 'userHomeCounsel',
					component: () => import("../views/Counsel/Counsel.vue"),
					meta: {
						title: "疫情咨询"
					}
				},
				{
					path: '/userHome/counsel/detail/:id',
					name: 'userHomeCounselDetail',
					component: () => import("../views/Counsel/counselDetail.vue"),
					meta: {
						title: "疫情咨询详情"
					}
				},
				{
					path: '/userHome/policy/',
					name: 'userHomePolicy',
					component: () => import("../views/Policy/Policy.vue"),
					meta: {
						title: "疫情政策"
					}
				},
				{
					path: '/userHome/policy/detail/:id',
					name: 'userHomePolicyDetail',
					component: () => import("../views/Policy/policyDetail.vue"),
					meta: {
						title: "疫情政策详情"
					}
				},
				{
					path: '/userHome/dynamic',
					name: 'userHomeDynamic',
					component: () => import("../views/Dynamic/Dynamic.vue"),
					meta: {
						title: "疫情动态"
					}
				},
				{
					path: '/userHome/dynamic/detail/:id',
					name: 'userHomeDynamicDetail',
					component: () => import("../views/Dynamic/dynamicDetail.vue"),
					meta: {
						title: "疫情动态详情"
					}
				},
				{
					path: '/userHome/center',
					name: 'userHomeCenter',
					redirect: '/userHome/center/warnMessage',
					component: () => import("../views/Foo/Foo.vue"),
					meta: {
						title: "个人中心"
					},
					children: [{
							path: '/userHome/center/warnMessage',
							name: 'warnMessage',
							component: () => import("../views/Foo/Message/message.vue"),
							meta: {
								title: "预警消息"
							}
						},
						{
							path: '/userHome/center/collection',
							name: 'collection',
							component: () => import("../views/Foo/Collection/collection.vue"),
							meta: {
								title: "我的收藏"
							}
						},
						{
							path: '/userHome/center/apply',
							name: 'apply',
							component: () => import("../views/Foo/Apply/apply.vue"),
							meta: {
								title: "返乡申请"
							}
						},
					]
				},
			]
		},
	],
	mode: 'history'
})

router.beforeEach((to, from, next) => {
	if (to.path === '/login' || to.path === '/register' || to.path === '/forget') {
		next();
	} else {
		const token = localStorage.getItem('token');
		console.log(token);
		if (!token) {
			router.push({
				name: 'login'
			});
			return;
		}
		next()
	}
})


export default router
