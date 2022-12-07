import { CoreState } from "@/@types/core.type";
import { DeviceScreen } from "@/utils/enums/DeviceScreen.enum";


const state = (): CoreState => ({
  deviceScreen: DeviceScreen.desktop
});

export default state;
