<template>
    <div>
        <el-row>
            <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="../../public/img/1.jpg" class="image">
                    <div style="padding: 14px;">
                        <span v-model="g_name"></span>
                        <div class="bottom clearfix">
                            <time class="time">{{ currentDate }}</time>
                            <el-button type="text" class="button" @click="toJoin()">操作按钮</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                g_name:'',
                g_desc:'',
                g_lowprice:'',
                currentDate: new Date()
            };
        },
        created(){
            const _this=this
            axios.get("http://localhost:8181/book/findAll/0/3").then(function (resp) {
                console.log(resp)
                _this.tableData = resp.data.content;
                _this.pageSize = resp.data.size;
                _this.total=resp.data.totalElements;
            })

        },
        methods:{
            toJoin(){

            }
        },

    }
</script>

<style>
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
        width: 100%;
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
</style>