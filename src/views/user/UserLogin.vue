<template>
  <div id="user">
    <a-row style="display: flex; align-items: center">
      <a-col :span="12">
        <div class="picture">
          <img src="@/assets/bg.svg" alt="image" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="form">
          <a-space direction="vertical">
            <div class="title">登录</div>
            <a-form
              layout="horizontal"
              :model="form"
              :auto-label-width="true"
              :style="{ width: '400px' }"
              @submit="handleSubmit"
              size="large"
            >
              <a-form-item field="name" label="账号">
                <a-input
                  v-model.trim="form.userAccount"
                  placeholder="请输入账号"
                />
              </a-form-item>
              <a-form-item field="post" label="密码">
                <a-input-password
                  v-model.trim="form.userPassword"
                  placeholder="请输入密码"
                  allow-clear
                />
              </a-form-item>
              <a-form-item no-style>
                <a-button
                  style="margin-top: 10px"
                  type="primary"
                  html-type="submit"
                  :loading="btnLoading"
                  long
                  >登录
                </a-button>
              </a-form-item>
              <a-form-item no-style>
                <a-button
                  @click="goRegister"
                  style="margin-top: 5px"
                  type="outline"
                  long
                  >注册
                </a-button>
              </a-form-item>
            </a-form>
          </a-space>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { BaseResponse_long_, UserControllerService } from "@/api";
import { useRouter } from "vue-router";
import message from "@arco-design/web-vue/es/message";

const router = useRouter();
// 按钮加载动画
const btnLoading = ref(false);

const form = reactive({
  userAccount: "",
  userPassword: "",
});
// 表单提交
const handleSubmit = async () => {
  btnLoading.value = true;
  // 登录请求
  try {
    const res: BaseResponse_long_ =
      await UserControllerService.userLoginUsingPost({
        ...form,
      });
    // 成功
    if (res?.code === 0) {
      message.success("登录成功");
      btnLoading.value = false;
      // 跳转到主页
      setTimeout(() => {
        window.location.href = "/main/home";
      }, 1000);
    } else {
      message.error("登录失败，" + res?.message);
      btnLoading.value = false;
    }
  } catch (e) {
    console.log(e);
    btnLoading.value = false;
  }
};

const goRegister = () => {
  router.push({
    path: "/user/register",
  });
};
</script>

<style scoped>
#user {
}

#user .picture {
  width: 90%;
  text-align: center;
}

#user .picture img {
  width: 100%;
  height: 100%;
}

#user .form {
  display: flex;
  margin-top: -10%;
  margin-left: 10%;
}

#user .form .title {
  text-align: center;
  font-weight: 700;
  font-size: 30px;
  border-bottom: 2px solid #6d6a6a;
  margin-bottom: 10px;
  padding: 10px;
}
</style>
