<template>
    <div class="htmleaf-container">
        <header class="htmleaf-header">
            <h1>霍比特拍卖 <span></span></h1>
        </header>
        <div class="login-wrap">
            <div class="login-html">
                <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Sign In</label>
                <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Sign Up</label>
                    <div class="login-form">
                        <el-form class="sign-in-htm" :model="ruleForm2">
                            <el-form-item class="group" prop="u_phone">
                                <label class="label">账号/手机号码</label>
                                <input v-model="ruleForm2.uPhone" type="text" class="input">
                            </el-form-item>
                            <el-form-item class="group" prop="u_pass">
                                <label  class="label">Password</label>
                                <input v-model="ruleForm2.uPass" type="password" class="input" data-type="password">
                            </el-form-item>
                            <div class="group">
                                <input id="check" type="checkbox" class="check" checked>
                                <label for="check"><span class="icon"></span> Keep me Signed in</label>
                            </div>
                            <el-form-item>
                                <el-button type="primary" @click="login('ruleForm2')">登录</el-button>
                                <el-button @click="resetForm('ruleForm2')">重置</el-button>
                            </el-form-item>
                            <div class="hr"></div>
                            <div class="foot-lnk">
                                <a href="#forgot">Forgot Password?</a>
                            </div>
                        </el-form>


                        <el-form class="sign-up-htm" :model="ruleForm" status-icon :rules="rules" >
                                <el-form-item class="group" prop="u_name" lable="昵称">
                                    <label  class="label">昵称</label>
                                    <el-input type="text" class="input" v-model="ruleForm.uPhone" prefix-icon="el-icon-user"></el-input>
                                </el-form-item>
                                <el-form-item class="group" prop="u_pass">
                                    <label  class="label">密码</label>
                                    <el-input v-model="ruleForm.uPass" type="password" class="input" data-type="password" prefix-icon="el-icon-lock"></el-input>
                                </el-form-item>
                                <el-form-item class="group" prop="pass">
                                    <label  class="label">确认密码</label>
                                    <el-input v-model="ruleForm.confirm" type="password" class="input" data-type="password"></el-input>
                                </el-form-item>
                                <el-form-item class="group" prop="u_phone">
                                    <label  class="label">手机号码</label>
                                    <el-input v-model="ruleForm.uPhone" type="text" class="input"></el-input>
                                </el-form-item>
                            <el-form-item class="group" label="性别" prop="u_gender">
                                <el-select v-model="ruleForm.uGender" placeholder="请选择性别">
                                    <el-option label="男性" value="男性"></el-option>
                                    <el-option label="女性" value="女性"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="register('ruleForm')">登录</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
            </div>
        </div>
        <!--<div class="related">-->
            <!--<h3>如果你喜欢这个插件，那么你可能也喜欢:</h3>-->
            <!--<a href="http://www.htmleaf.com/css3/ui-design/201507242291.html">-->
                <!--<img src="related/1.jpg" width="300" alt="带CSS3动画特效的时尚登录界面UI设计"/>-->
                <!--<h3>带CSS3动画特效的时尚登录界面UI设计</h3>-->
            <!--</a>-->
            <!--<a href="http://www.htmleaf.com/css3/ui-design/201507212272.html">-->
                <!--<img src="related/2.jpg" width="300" alt="带科幻风格的纯CSS3用户登录界面设计"/>-->
                <!--<h3>带科幻风格的纯CSS3用户登录界面设计</h3>-->
            <!--</a>-->
        <!--</div>-->
    </div>
</template>



<script>
    import { mapMutations } from 'vuex';
    export default {
        data() {
            var validateMobilePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('负责人手机号不可为空'));
                } else {
                    if (value !== '') {
                        var reg=/^1[3456789]\d{9}$/;
                        if(!reg.test(value)){
                            callback(new Error('请输入有效的手机号码'));
                        }
                    }
                    callback();
                }
            };
            return {
                ruleForm: {
                    uPhone: '',
                    uPass: '',
                    confirm: '',
                    uPhone: '',
                    uGender: '',
                },
                ruleForm2:{
                    uPhone: '',
                    uPass: '',
                },
                userToken:'',
                rules: {
                    uPhone: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    uPass: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    confirm: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    uPhone: [
                        { validator: validateMobilePhone, trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            //加载mutation中的方法
            ...mapMutations(['changeLogin']),

            //注册的方法
            register(formName) {
                const _this=this
                axios.post("http://localhost:8181/doRegister",this.ruleForm).then(function (resp) {
                    console.log(_this.ruleForm)
                    if (resp.data == 'success'){
                        _this.$alert('《'+_this.ruleForm.uPhone+'》注册成功', '注册成功', {
                            confirmButtonText: '确定',
                            callback: action => {
                                _this.$router.push('/')
                            }
                        });
                    }
                })

                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
                //
                //         alert('submit!');
                //     } else {
                //         console.log('error submit!!');
                //         return false;
                //     }
                // });
            },

            //登录的方法
            // login(formName){
            //     const _this=this
            //     axios.post("http://localhost:8181/doLogin",this.ruleForm2).then(res => {
            //         console.log(res);
            //         console.log(res.headers.authorization);
            //         _this.userToken = 'Bearer ' + res.headers.authorization;
            //         console.log(_this.userToken);
            //         // 将用户token保存到vuex中
            //         _this.changeLogin( {Authorization: _this.userToken} );
            //         _this.$router.push('/home');
            //         alert('登陆成功');
            //         console.log(localStorage)
            //     }).catch(error => {
            //         alert('账号或密码错误');
            //         console.log(error);
            //     });
            //
            // },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>
