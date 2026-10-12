import type { ComponentContract } from "../../../types";
import { textContract } from "./text";
import { headingContract } from "./heading";
import { linkContract } from "./link";
import { labelContract } from "./label";
import { listContract } from "./list";
import { codeContract } from "./code";
import { kbdContract } from "./kbd";
import { iconContract } from "./icon";
import { imageContract } from "./image";

export const typographyContracts: readonly ComponentContract[] = [
  textContract,
  headingContract,
  linkContract,
  labelContract,
  listContract,
  codeContract,
  kbdContract,
  iconContract,
  imageContract
];
