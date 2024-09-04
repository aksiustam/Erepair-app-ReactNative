import { useCallback, useMemo, useState } from "react";
import { useCameraDevices } from "react-native-vision-camera";

export function usePreferredCameraDevice() {
  const [preferredDeviceId, setPreferredDeviceId] = useState(
    "camera.preferredDeviceId"
  );

  const set = useCallback(
    (device) => {
      setPreferredDeviceId(device.id);
    },
    [setPreferredDeviceId]
  );

  const devices = useCameraDevices();
  const device = useMemo(
    () => devices.find((d) => d.id === preferredDeviceId),
    [devices, preferredDeviceId]
  );

  return [device, set];
}
