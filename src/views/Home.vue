<template>
  <div class="table-container">
    <div class="tab-header-fixed">PLANS</div>
    <div class="aside-scroll-wrapper" ref="awrapper">
      <div class="aside-content">
        <div
          class="aside-content-item"
          :class="item.name == 'Cost' || item.name == 'Profit' ? 'special' : ''"
          v-for="(item, index) in colData"
          :key="index"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="header-scroll-wrapper" ref="hwrapper">
      <div class="header-content">
        <div
          class="header-content-item"
          v-for="(item, index) in tableData"
          :key="index"
        >
          <div class="title-wrap" v-if="item.main_title || item.sub_title">
            <div class="duohang">{{ item.main_title }}</div>
            <div class="subTitle">{{ item.sub_title }}</div>
            <van-popover
              v-if="item.is_default == 0 && actions.length !== 0"
              v-model="showPopoverTab[index]"
              trigger="click"
              :actions="actions"
              @select="replaceSelect(index, $event)"
            >
              <template #reference>
                <img
                  class="edit-icon"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABKJJREFUWEftl0toHVUYx//f3GnSdGES6MJHDehG7cJCm6VtTF2kBkzmnNsObmyjfeTRLlUovitCETci1ldrwLqQIXPO3F4XVvFRS1e1FosWNyKCWPGBFSI2ztzzyQlzQ3I795kb6CLf5t47853z/fh/j3Mu4QY3usH5sAq43AytqIJhGD5CRK8COJ0kyR7f9/9rFnjFALXWY8aYE0TkpFAfJkmSbxZyRQAz4OYZiagYx/HOZiDbDhhF0aOlUul4qhwT0UvMvBfALa1AthVQKfUYgHcA2LRauINCiDcKhcJdpVLp8zIkgFNJkuxqRMm2AVaDKzdFFmRfX9/O/v7+uFbjtAVQa72Xmd8uKwdgSkr5ZmXgmZmZux3H+WyRkoW0cUrVIJcNGIbhPiJ6axHcT0T0uBAizAoaRdFGY8xFAB32veM4OzzPO70igBVwBsAvADYQUWIbQ0r5XmVgpZRVdjx9/luSJJt83/+17YCVcEQ0ycw3AXjZThQAhogO2SYpB1dK2XdPpL+v5nK57aOjo1bNqtZSipVS+wFYJWy3WpBJIYStQYRhOEVEry1K+ZNSyle01k8z84vWh5n/ATCUz+fP1TtZmgashAMwIaW0o2XB7KBm5uMAcunDDwA8nH6fA/CQlPKTenDzc7MRp7KP1voAM9uUzSuXBbfI12fm94noCjNvSNckRLRLCBE1GrdhwEo4x3HGPc+zKlU1rfXzAJ5iZjcthTEhxMlG4RpWMAzDcSI6VlaOmcfz+XxNOKXUDgAFO06IyJ4qhzzPs3s0ZXUVjKJo3BizAEdEB4QQJ2pFiaJoqzHmIwDrUr/DUsqjTZGlzjUBlVITACxceWzUhdNab2HmTwF0pzGOSikPtwJXM8WFQmGiVCotwAHYL6V8t45y9pQ4A2D9/OZEx4QQB1uFqwqotbZD9/Wyco3AhWF4JxGdBXBrCnfS87w9tv7aChiG4WYiOm8bgplNLpfb53nedK0gQRDclsvlzhLRHamfTq9TVS8BjUJfV4NKqRcAPJuqMLX4qMratFgsro/j+EsA96RrPu7s7BwZHh62A3nZlgX4BYABZr7W1dXVUytQEATdruva69PmlOTc7Ozs0O7du+1R1hZbAjg9Pb22u7v7LwBrAZyRUt5fLUqxWFwXx7G9Jt2XKncxjuNB3/f/bgtZ1phRSg0AsApaOyKlfC4rWBAEHWvWrDnFzEPp+++TJNnm+/7v7YS7rouVUrb2bA1ae0BKadO3xIIgyLmuGwCQqXI/GmO25fP5n9sNlwVoB+x2AHNJkvT6vv9vOajt1I6Ojs3GmLEyHIArRLRVCPHDSsAtAbRpc133KoAuAN8S0TO2+I0xW4jINsHNFRB/uq47MDIy8t1KwS0BVErZYreDtq4R0R+O4zw4Ojr6VV3nZTosdPHMzMyk4zhZtw37t/AygK8BXLCfvb29FwcHB6/Z2EqpbwDc2yLHJSnlplprFwCjKLrdGBMwcycRXSCieaCenp5LZZisjZRSFrSzRcA5KaUdaVWt7nWrXmCt9RFjzMZ6flnvHce5LISYP7Wq2bIBWwFrZs0qYDNqZfmuKrhcBf8HkYjmOEA7j44AAAAASUVORK5CYII="
                  alt=""
                />
              </template>
            </van-popover>
            
          </div>

          <van-popover
            v-if="!item.main_title && !item.sub_title"
            v-model="showPopover"
            trigger="click"
            :actions="actions"
            @select="visiableSelect"
            :offset="[-10, 10]"
          >
            <template #reference>
              <div class="add-wrap">
                <img
                  src="data:image/png;base64,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"
                  alt=""
                />
              </div>
            </template>
          </van-popover>
        </div>
      </div>
    </div>

    <div class="main-scroll-wrapper" ref="mwrapper">
      <div class="main-content">
        <div
          class="main-content-row-item"
          v-for="(item, index) in tableData"
          :key="index"
        >
          <div
            class="main-content-col-item"
            :class="[
              plan === '' ? 'special' : '',
              plan == 'null' ? 'hidden' : '',
            ]"
            v-for="(plan, index) in item.plan"
            :key="index"
          >
            {{ plan }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { Toast } from "vant";
import BScroll from "@better-scroll/core";
import Indicators from "@better-scroll/indicators";
import request from "./../api/request";
BScroll.use(Indicators);
export default {
  data() {
    return {
      resp: [],
      tableData: [],
      colData: [],
      showPopover: false,
      showPopoverTab: [],
      mapedtableData: [],
    };
  },
  created() {
    request({
      url: "/explore/hashrate_miner_compare",
      method: "get",
    }).then((res) => {
      console.log(res);
      this.resp = res;
      this.initData();
    });
  },
  mounted() {},
  computed: {
    actions() {
      const selectedData = this.mapedtableData.filter((item) => {
        item.text = item.main_title + " / " + item.sub_title;
        return this.tableData.every((cur) => cur.id != item.id);
      });
      console.log(selectedData);
      return selectedData;
    },
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    tableData: function () {
      this.$nextTick(() => {
        this.bsA.refresh();
        this.bs.refresh();
        this.bsH.refresh();
      });
    },
  },
  methods: {
    initData() {
      console.log(this.resp);
      this.colData = [
        { name: "Cost", field: "Cost" },
        ...this.resp.data.yAxis.Cost,
        { name: "Profit", field: "Profit" },
        ...this.resp.data.yAxis.Profit,
      ];
      const index = this.colData.findIndex((item) => item.name === "Profit");
      // 数据清洗
      this.mapedtableData = this.resp.data.xAxis.map((item) => {
        item.plan = Object.values(item.plan);
        item.plan.unshift("");
        item.plan.splice(index, 0, "");
        return item;
      });
      // 过滤默认
      const tableData = this.mapedtableData.filter((item) => {
        return item.is_default;
      });
      // 双向绑定的table
      const emptyCol = new Array(tableData[0].plan.length).fill("null");
      emptyCol[0] = "";
      emptyCol[index] = "";

      this.tableData = [...tableData, { plan: emptyCol }];

      this.$nextTick(this.initScroll);
    },

    initScroll() {
      this.bs = new BScroll(this.$refs.mwrapper, {
        scrollX: true,
        scrollY: true,
        bounce: false,
        probeType: 2,
        momentum: false,
      });
      this.bsH = new BScroll(this.$refs.hwrapper, {
        scrollX: true,
        bounce: false,
        probeType: 2,
        momentum: false,
        click: true,
      });
      this.bsA = new BScroll(this.$refs.awrapper, {
        scrollY: true,
        bounce: false,
        probeType: 2,
        momentum: false,
      });
      this.bs.on("scroll", ({ x, y }) => {
        console.log("scrolling-", y);
        this.bsH.scrollTo(x, 0, 0, undefined);
        this.bsA.scrollTo(0, y, 0, undefined);
      });
      this.bsH.on("scroll", ({ x }) => {
        this.bs.scrollTo(x, this.bs.y, 0, undefined);
      });
      this.bsA.on("scroll", ({ y }) => {
        this.bs.scrollTo(this.bs.x, y, 0, undefined);
      });
    },
    visiableSelect(action, index) {
      if (this.actions.length <= 1) {
        this.tableData.splice(
          this.tableData.length - 1,
          1,
          this.actions[index]
        );
      } else {
        this.tableData.splice(
          this.tableData.length - 1,
          0,
          this.actions[index]
        );
      }
    },
    replaceSelect(index, $event) {
      this.tableData.splice(
        index,
        1,
        this.actions.find((action) => action.id === $event.id)
      );
    },
  },
};
</script>
<style lang="less">
.van-popover__content .van-popover__action-text {
  // white-space: nowrap;
}
.table-container {
  height: 100%;
  padding-left: 90px;
  position: relative;
  .tab-header-fixed {
    border-bottom: 1px solid #eaeaea;
    position: absolute;
    background: #ffffff;
    box-shadow: 2px 0px 5px 0px rgba(0, 0, 0, 0.06);
    top: 0;
    left: 0;
    width: 90px;
    height: 86px;
    line-height: 86px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
  }
}
.header-scroll-wrapper,
.main-scroll-wrapper {
  position: relative;
  white-space: nowrap;
  overflow: hidden;
}
.header-scroll-wrapper {
  height: 86px;
  border-bottom: 1px solid #eaeaea;
}
.main-scroll-wrapper {
  height: calc(100% - 81px);
}
.header-content {
  display: inline-block;
  &-item {
    display: inline-block;
    width: calc((100vw - 90px) / 2.5);
    height: 86px;
    vertical-align: middle;
    box-sizing: border-box;
    padding: 10px;
  }
  .van-popover__wrapper {
    width: 100%;
    height: 100%;
  }
}
.main-content-row-item:nth-child(even) {
  background-color: #f4f8ff;
}
.main-content {
  display: inline-block;
  background-color: #fff;
  &-row-item {
    display: inline-block;
    .main-content-col-item {
      width: calc((100vw - 90px) / 2.5);
      box-sizing: border-box;
      border-bottom: 1px solid #eaeaea;
      border-right: 1px solid #eaeaea;
      height: 52px;
      white-space: normal;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      padding-left: 7px;
      text-align: left;
      display: flex;
      align-items: center;
      &.hidden {
        color: transparent;
        background-color: #fff;
      }
      &.special {
        background-color: #eaeaea;
        height: 30px;
        border-right: none;
      }
    }
  }
}

.aside-scroll-wrapper {
  position: absolute;
  left: 0;
  top: 86px;
  height: calc(100% - 81px);
  overflow: hidden;
  .aside-content {
    text-align: left;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #333333;
    font-weight: 500;
    color: #1e3a7a;
    text-shadow: 2px 0px 5px rgba(0, 0, 0, 0.06);
    background: #f1f1f4;
    .aside-content-item {
      &.special {
        border-right: none;
        background: #eaeaea;
        height: 30px;
      }
      padding-left: 7px;

      border-right: 1px solid #eaeaea;
      border-bottom: 1px solid #eaeaea;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      width: 90px;
      height: 52px;
    }
  }
}
.title-wrap {
  position: relative;
  background: #ffffff;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.05);
  border: 1px solid #3f7aff;
  box-sizing: border-box;
  border-radius: 4px;
  padding-left: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  height: 100%;
  .duohang {
    // width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    white-space: normal;
    word-break: break-word;
    /* autoprefixer: ignore next */
    -webkit-box-orient: vertical;
  }
  .subTitle {
    color: #666;
  }
  .van-popover__wrapper {
    width: initial;
    height: initial;
  }
  .edit-icon {
    position: absolute;
    display: block;
    width: 20px;
    height: 20px;
    right: 3px;
    bottom: 4px;
  }
}
.add-wrap {
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  border-right: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 20px;
    height: 20px;
    display: block;
  }
}
</style>
