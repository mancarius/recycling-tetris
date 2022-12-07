import State from "@type/state.interface";
import Mutations from "@enum/Mutations";
import { MutationTree } from "vuex";
import { CoreState } from "@type/core.type";

const mutations: MutationTree<State["core"]> = {
  /**
   * Set device screen type
   *
   * @param state
   * @param {DeviceScreen} payload
   */
  [Mutations.CORE_SET_DEVICE_SCREEN](state, payload: CoreState["deviceScreen"]): void {
    state.deviceScreen = payload;
  },
};

export default mutations;
