import { CoreState } from "@type/core.type";
import { DeviceScreen } from "@enum/DeviceScreen.enum";


const state = (): CoreState => ({
  deviceScreen: DeviceScreen.desktop
});

export default state;
