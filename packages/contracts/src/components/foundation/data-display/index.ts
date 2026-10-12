import type { ComponentContract } from "../../../types";
import { cardContract } from "./card";
import { avatarContract } from "./avatar";
import { avatarGroupContract } from "./avatar-group";
import { tagContract } from "./tag";
import { listItemContract } from "./list-item";
import { descriptionListContract } from "./description-list";
import { tableContract } from "./table";
import { dataGridContract } from "./data-grid";
import { accordionContract } from "./accordion";
import { carouselContract } from "./carousel";
import { timelineContract } from "./timeline";
import { statContract } from "./stat";
import { chartContract } from "./chart";
import { sparklineContract } from "./sparkline";
import { treeViewContract } from "./tree-view";
import { qrCodeContract } from "./qr-code";

export const dataDisplayContracts: readonly ComponentContract[] = [
  cardContract,
  avatarContract,
  avatarGroupContract,
  tagContract,
  listItemContract,
  descriptionListContract,
  tableContract,
  dataGridContract,
  accordionContract,
  carouselContract,
  timelineContract,
  statContract,
  chartContract,
  sparklineContract,
  treeViewContract,
  qrCodeContract
];
