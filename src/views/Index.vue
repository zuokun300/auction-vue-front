<template>
    <div>
        <div class="line">
        </div>

        <div>
            <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="1">首页</el-menu-item>
            <el-submenu index="2">
                <template slot="title" >个人中心</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2" >选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            </el-menu>
        </div>
        <div>
            <div>

                <div class="containerOut">
                    <el-row >
                        <!--v-for="(o, index) in pageRequest.pageSize" :key="o" :offset="index > 0 ? 2 : 0"-->
                            <el-col :span="4"  v-for="item in tableData.slice(0,3)" >

                                    <el-card :body-style="{ padding: '20px' ,margin:'20px' }">
                                        <img :src="item.gimg" height="200" width="200"  >
                                        <div style="padding: 14px;">
                                            <div class="bottom clearfix">
                                                <h2>{{item.gname}}</h2>
                                                <h3 style="color: red">{{item.glowPrice}}</h3>
                                                <time class="time">{{ currentDate }}</time>
                                                <el-button type="text" class="button" @click="toJoin()">操作按钮</el-button>
                                            </div>
                                        </div>
                                    </el-card>

                            </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"  v-for="item in tableData.slice(3,6)" >

                                <el-card :body-style="{ padding: '0px' }">
                                    <img :src="item.gimg" height="200" width="200"  >
                                    <div style="padding: 14px;">
                                        <div class="bottom clearfix">
                                            <h2>{{item.gname}}</h2>
                                            <h3 style="color: red">{{item.glowPrice}}</h3>
                                            <time class="time">{{ currentDate }}</time>
                                            <el-button type="text" class="button" @click="toJoin()">操作按钮</el-button>
                                        </div>
                                    </div>
                                </el-card>

                        </el-col>
                    </el-row>
                </div>


            </div>
            <div>
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :page-size="pageRequest.pageSize"
                        :total="total"
                        @current-change="page"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import goods from '../components/Goods'
    export default {

        components:{
            goods,
        },
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',

                //测试数据，从后端查出来的东西
                currentDate: new Date(),

                //分页的数据
                total:'',
                //pageNum当前页，pageSize每页条数
                pageRequest:{pageNum:1,pageSize:6},
                tableData: [{

                }
                ]


            };
        },
        //初始化方法加载第一页
        created(){
            const _this=this
            axios.post("http://localhost:8181/goods/findPage",_this.pageRequest).then(function (resp) {
                console.log(resp)
                _this.tableData = resp.data.content;
                _this.pageRequest.pageSize = resp.data.pageSize;
                _this.total=resp.data.totalSize;
            })

        },

        //在挂载开始之前调用
        // beforeMount(){
        //     var tableData1 =this.tableData.filter()
        // },

        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },

            //点击页码
            page(currentPage){
                const _this=this
                _this.pageRequest.pageNum=currentPage
                axios.post('http://localhost:8181/goods/findPage/',_this.pageRequest).then(function (resp) {
                    console.log(resp)
                    _this.tableData = resp.data.content;
                    _this.pageRequest.pageSize = resp.data.pageSize;
                    _this.total=resp.data.totalSize;
                })
            }
        }
    }
</script>

<style scoped>
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        /*width: 100%;*/
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .containerOut{
        background-color: #2fa0ec;
        width: 1920px;
        height: 800px;
    }
    .containerIn{
        background-color: yellow;
        width: 400px;
        height: 400px;
    }
    .containerMid{
        background-color: #ec25a6;
        width: 960px;
        height: 400px;
    }


</style>