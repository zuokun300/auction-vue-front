<template>
<!-- 登录页面 -->
  <div>
    <Row class="container">
      <i-col span="13" offset="2" class="login-img-box">
        <img src="../../public/img/sale.jpg" alt="">
      </i-col>
      <i-col span="7" class="login-box">
        <div class="login-container">
          <div class="login-header">
            <p>欢迎登录</p>
          </div>
          <div class="form-box">
            <Form ref="formInline" :model="formData" :rules="ruleInline">
              <FormItem prop="username">
                  <i-input type="text" v-model="formData.uPhone" clearable size="large" placeholder="用户名">
                      <Icon type="person" slot="prepend"></Icon>
                  </i-input>
              </FormItem>
              <FormItem prop="password">
                  <i-input type="password" v-model="formData.uPass" clearable size="large" placeholder="密码">
                      <Icon type="ios-locked-outline" slot="prepend"> </Icon>
                  </i-input>
              </FormItem>
              <FormItem>
                  <Button type="error" size="large" @click="handleSubmit('formInline')" long>登录</Button>
              </FormItem>
          </Form>
          </div>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
    import {mapMutations} from  'vuex'
export default {
  name: 'Login',
  data () {
    return {
      formData: {
        uPhone: '',
        uPass: ''
      },
      ruleInline: {
        uPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        uPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 2, message: '密码不能少于6位', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(['SET_USER_LOGIN_INFO','changeLogin']),
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {

            //登录的方法，axios发送请求
                const _this=this
                axios.post("http://localhost:8181/doLogin",_this.formData).then(res => {
                    console.log(res);
                    console.log(res.headers.authorization);
                    _this.userToken = 'Bearer ' + res.headers.authorization;
                    console.log(_this.userToken);
                    // 将用户token保存到vuex中
                    _this.changeLogin( {Authorization: _this.userToken} );
                    _this.$router.push('/home');
                    alert('登陆成功');
                    console.log(localStorage)
                }).catch(error => {
                    alert('账号或密码错误');
                    console.log(error);
                });
        } else {
            console.log("错误到了")
          this.alert('请填写正确的用户名或密码');
        }
      });
    }
  },
};
</script>

<style scoped>
.container {
  margin-top: 30px;
  height: 485px;
  background-color: #fff;
}
.login-img-box {
  height: 485px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-img-box>img {
  width: 68%;
}
.login-box {
  height: 485px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-container {
  width: 80%;
  height: 280px;
  border: #ED3F14 solid 1px;
}
.login-header {
  height: 50px;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  letter-spacing: 5px;
  color: #fff;
  background-color: #ED3F14;
}
.form-box {
  width: 80%;
  margin: 30px auto;
}
</style>
