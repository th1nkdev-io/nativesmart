import type { ComponentContract } from "../../../types";
import { modalContract } from "./modal";
import { alertDialogContract } from "./alert-dialog";
import { drawerContract } from "./drawer";
import { bottomSheetContract } from "./bottom-sheet";
import { actionSheetContract } from "./action-sheet";
import { popoverContract } from "./popover";
import { tooltipContract } from "./tooltip";
import { menuContract } from "./menu";
import { contextMenuContract } from "./context-menu";
import { commandPaletteContract } from "./command-palette";
import { imageViewerContract } from "./image-viewer";

export const overlaysContracts: readonly ComponentContract[] = [
  modalContract,
  alertDialogContract,
  drawerContract,
  bottomSheetContract,
  actionSheetContract,
  popoverContract,
  tooltipContract,
  menuContract,
  contextMenuContract,
  commandPaletteContract,
  imageViewerContract
];
