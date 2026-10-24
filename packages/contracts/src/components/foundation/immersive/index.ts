import type { ComponentContract } from "../../../types";
import { scene3dContract } from "./scene-3d";
import { modelViewerContract } from "./model-viewer";
import { tiltCardContract } from "./tilt-card";
import { parallaxLayersContract } from "./parallax-layers";
import { flipCardContract } from "./flip-card";
import { product360Contract } from "./product-360";
import { globe3dContract } from "./globe-3d";
import { arViewerContract } from "./ar-viewer";

export const immersiveContracts: readonly ComponentContract[] = [
  scene3dContract,
  modelViewerContract,
  tiltCardContract,
  parallaxLayersContract,
  flipCardContract,
  product360Contract,
  globe3dContract,
  arViewerContract
];
