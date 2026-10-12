import type { ComponentContract } from "../../../types";
import { cameraCaptureContract } from "./camera-capture";
import { qrCodeScannerContract } from "./qr-code-scanner";
import { documentScannerContract } from "./document-scanner";
import { signaturePadContract } from "./signature-pad";
import { mapViewContract } from "./map-view";
import { videoPlayerContract } from "./video-player";

export const mediaContracts: readonly ComponentContract[] = [
  cameraCaptureContract,
  qrCodeScannerContract,
  documentScannerContract,
  signaturePadContract,
  mapViewContract,
  videoPlayerContract
];
