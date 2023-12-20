<template>
  <div class="addQuestion">
    <h2>{{ title }}</h2>
    <a-form :model="form" auto-label-width label-align="left" size="large">
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag v-model="form.tags" placeholder="请输入标签" allow-clear />
      </a-form-item>
      <a-form-item field="content" label="题目内容">
        <MdEditor
          :value="form.content"
          :handle-change="onContentChange"
          mode="split"
        />
      </a-form-item>
      <a-form-item field="answer" label="答案">
        <MdEditor
          :value="form.answer"
          :handle-change="onAnswerChange"
          mode="split"
        />
      </a-form-item>

      <a-form-item label="判题配置" :merge-props="false">
        <a-space direction="vertical" style="min-width: 480px">
          <a-form-item label="时间限制" field="judgeConfig.timeLimit">
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              placeholder="请输入时间限制"
              mode="button"
              size="large"
            />
          </a-form-item>
          <a-form-item label="内存限制" field="judgeConfig.memoryLimit">
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              placeholder="请输入内存限制"
              mode="button"
              size="large"
            />
          </a-form-item>
          <a-form-item label="堆栈限制" field="judgeConfig.stackLimit">
            <a-input-number
              v-model="form.judgeConfig.stackLimit"
              placeholder="请输入堆栈限制"
              mode="button"
              size="large"
            />
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item
        label="判题用例配置"
        :merge-props="false"
        :content-flex="false"
      >
        <a-form-item
          v-for="(judgeCaseItem, index) of form.judgeCase"
          :label="`判题用例-${index}`"
          :key="index"
        >
          <a-space direction="vertical" style="min-width: 480px">
            <a-form-item
              :field="`form.judgeCase[${index}].input`"
              :label="`输入用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.input"
                placeholder="请输入判题输入用例"
              />
            </a-form-item>
            <a-form-item
              :field="`form.judgeCase[${index}].output`"
              :label="`输出用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.output"
                placeholder="请输入判题输出用例"
              />
            </a-form-item>
          </a-space>
          <a-button
            status="danger"
            @click="handleDelete(index)"
            :style="{ marginLeft: '10px' }"
            >删除
          </a-button>
        </a-form-item>
        <div>
          <a-button status="success" type="outline" @click="handleAdd"
            >新增判题用例
          </a-button>
        </div>
      </a-form-item>
      <a-form-item>
        <a-button style="margin: 50px 0 20px 0" type="primary" @click="doSubmit"
          >{{ title }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import MdEditor from "@/components/mdeditor/MdEditor.vue";
import {
  BaseResponse_boolean_,
  BaseResponse_long_,
  BaseResponse_Question_,
  QuestionControllerService,
} from "@/api";
import message from "@arco-design/web-vue/es/message";
import { RouteLocation, useRoute } from "vue-router";

const route: RouteLocation = useRoute();
const questionInfo = ref();
const updatePage = ref(false);

const title = computed(() => {
  return updatePage.value ? "更新题目" : "创建题目";
});
// 初始值
const form = ref({
  answer: "暴力破解",
  content: "题目内容",
  judgeCase: [
    {
      input: "1 2",
      output: "3 4",
    },
  ],
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
  tags: ["栈", "简单"],
  title: "A + B",
});
onMounted(() => {
  const id: any = route.query.id;
  if (id) {
    console.log("发送请求");
    // 获取当前题目信息
    loadData(id);
    updatePage.value = true;
  }
});

/**
 * 获取当前题目信息
 */
const loadData = async (id: number) => {
  const res: BaseResponse_Question_ =
    await QuestionControllerService.getQuestionByIdUsingGet(id);
  if (res.code === 0) {
    // 将获取到的题目信息赋值给表单变量用于渲染
    questionInfo.value = res.data;
    form.value = questionInfo.value;
    if (!form.value.judgeCase) {
      form.value.judgeCase = [];
    } else {
      // json转数组
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any);
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = {
        memoryLimit: 1000,
        stackLimit: 1000,
        timeLimit: 1000,
      };
    } else {
      // json转对象
      form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
    }
    if (form.value.tags) {
      // json转数组
      form.value.tags = JSON.parse(form.value.tags as any);
    }
  } else {
    message.error(`获取题号为：${id} 的题目信息失败，` + res.message);
  }
};

// 新增判题用例
const handleAdd = () => {
  if (form.value.judgeCase) {
    form.value.judgeCase.push({
      input: "",
      output: " ",
    });
  }
};
// 删除判题用例
const handleDelete = (index: number) => {
  if (form.value.judgeCase) {
    form.value.judgeCase.splice(index, 1);
  }
};

/**
 * 提交表单内容
 */
const doSubmit = async () => {
  // 更新
  if (updatePage.value) {
    const res: BaseResponse_boolean_ =
      await QuestionControllerService.updateQuestionUsingPost(form.value);
    if (res.code === 0) {
      message.success("更新题目成功");
    } else {
      message.error("更新失败，" + res.message);
    }
  } else {
    // 创建
    const res: BaseResponse_long_ =
      await QuestionControllerService.addQuestionUsingPost(form.value);
    if (res.code === 0) {
      message.success("创建题目成功");
    } else {
      message.error("创建失败，" + res.message);
    }
  }
};
/**
 * 获取题目内容
 */
const onContentChange = (value: string) => {
  form.value.content = value;
};

/**
 * 获取答案内容
 */
const onAnswerChange = (value: string) => {
  form.value.answer = value;
};
</script>
<style scoped>
.addQuestion {
  width: 80%;
  margin: 0 auto;
}
</style>
