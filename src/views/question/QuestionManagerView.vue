<template>
  <div id="manager">
    <h2>管理题目</h2>
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total: total,
      }"
    >
      <template #optional="{ record }">
        <a-space>
          <a-button @click="doUpdate(record)" type="primary">修改</a-button>
          <a-button @click="doDelete(record)" status="danger">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  BaseResponse_boolean_,
  BaseResponse_Page_QuestionVO_,
  QuestionControllerService,
  QuestionQueryRequest,
  QuestionVO,
} from "@/api";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const router = useRouter();

// 数据总数
const total = ref<number>(0);
// 分页数据
const dataList = ref<Array<QuestionVO>>([]);
// 查询参数
const searchParams = ref<QuestionQueryRequest>({
  pageSize: 10,
  current: 1,
});
const loadData = async () => {
  const res: BaseResponse_Page_QuestionVO_ =
    await QuestionControllerService.listQuestionVoByPageUsingPost(
      searchParams.value
    );
  if (res.code === 0) {
    // 将获取到的数据赋值给 dataList 用于页面渲染
    dataList.value = res.data?.records || [];
    total.value = parseInt(res.data?.total as any) || 0;
  } else {
    message.error("数据加载失败，" + res.message);
  }
};

/**
 * dom渲染完毕后请求数据
 */
onMounted(() => {
  // 初始化数据
  loadData();
});

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "答案",
    dataIndex: "answer",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptNum",
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
  },
  {
    title: "用户id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

/**
 * 修改题目
 */
const doUpdate = (record: QuestionVO) => {
  router.push({
    path: "/main/question/update",
    query: {
      id: record.id,
    },
  });
};
/**
 * 删除题目
 */
const doDelete = async (record: QuestionVO) => {
  // 发送删除请求
  const res: BaseResponse_boolean_ =
    await QuestionControllerService.deleteQuestionUsingPost({ id: record.id });
  if (res.code === 0) {
    message.success("删除成功");
    // todo 更新数据
    await loadData();
  } else {
    message.error("删除失败，" + res.message);
  }
};
</script>
<style scoped>
#manager {
}
</style>
