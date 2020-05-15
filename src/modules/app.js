import server from "@/utils/server";
import Vue from "vue";

const app = {
  namespaced: true,
  state: {
    roundList: [],
  },
  mutations: {
    setRoundList(state, payload) {
      state.roundList = payload.data;
    },
  },
  actions: {
    async getRoundList(context) {
      try {
        const msg = await server.get(`api/dna-selection/v1/periods`);
        if (msg.data.code === 0) {
          context.commit({
            type: "setRoundList",
            data: msg.data.data,
          });
        }
        return msg.data;
      } catch (e) {
        Vue.prototype.$message.info("Network Error");
      }
    },
    async getRoundDataById(context, params) {
      try {
        const res = await server.get(
          `api/dna-selection/v1/period/info`,
          params
        );
        return res.data;
      } catch (e) {
        Vue.prototype.$message.info("Network Error");
      }
    },
  },
};

export default app;
