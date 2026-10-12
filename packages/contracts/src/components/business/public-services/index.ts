import type { ComponentContract } from "../../../types";
import { serviceRequestCardContract } from "./service-request-card";
import { caseStatusCardContract } from "./case-status-card";
import { documentRequirementListContract } from "./document-requirement-list";
import { appointmentSlotPickerContract } from "./appointment-slot-picker";
import { appointmentSummaryContract } from "./appointment-summary";
import { publicNoticeCardContract } from "./public-notice-card";

export const publicServicesContracts: readonly ComponentContract[] = [
  serviceRequestCardContract,
  caseStatusCardContract,
  documentRequirementListContract,
  appointmentSlotPickerContract,
  appointmentSummaryContract,
  publicNoticeCardContract
];
