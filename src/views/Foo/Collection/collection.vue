<template>
	<div id="collect">
		<div class="collect-item-wrap" v-if="collectData === []">
			<div class="collect-item" v-for="(item,index) in collectData" :key="index" @click="toDetail(index)">
				<el-image
				      style="width: 200px; height: 100px"
				      :src="item.thumb"
				      fit="fill"></el-image>
				<span>{{item.title}}</span>
			</div>
		</div>
		<div class="" v-else>
			暂无数据
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				collectData: []
			}
		},
		mounted(){
			this.getData()
		},
		methods: {
			async getData(){
				let id = JSON.parse(localStorage.getItem('info')).id;
				const res = await this.$http.get(`/knowledge/queryCollect?uid=${id}`);
				console.log(res)
				if(res.data.data != undefined){
					this.collectData = res.data.data.list;
				}
				
				console.log(this.collectData);
			},
			toDetail(index){
				let str = JSON.parse(localStorage.getItem('info')).role;
				if (str === 'admin') {
					this.$router.push({
						path: `/adminHome/dynamic/detail`,
						params: {
							id: this.collectData[index].id
						}
					})
				} else {
					this.$router.push({
						path: `/userHome/dynamic/detail`,
						params: {
							id: this.collectData[index].id
						}
					})
				}
			}
		}
	}
</script>

<style scoped="scoped">
	#collect{
		padding: 20px;
	}
	.collect-item-wrap{
		display: flex;
		flex-wrap: wrap;
	}
	.collect-item{
		padding: 0px 5px;
		margin-right: 20px;
		margin-bottom: 20px;
		height: 160px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		/* border: 1px solid ; */
		border-radius: 5px;
		background-color: #fff;
		text-align: center;
		cursor: pointer;
	}
	
</style>
