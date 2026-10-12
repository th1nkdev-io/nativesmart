import type { ComponentContract } from "../types";
import { layoutContracts } from "./foundation/layout";
import { typographyContracts } from "./foundation/typography";
import { actionsContracts } from "./foundation/actions";
import { formsContracts } from "./foundation/forms";
import { feedbackContracts } from "./foundation/feedback";
import { overlaysContracts } from "./foundation/overlays";
import { navigationContracts } from "./foundation/navigation";
import { dataDisplayContracts } from "./foundation/data-display";
import { mediaContracts } from "./foundation/media";
import { utilitiesContracts } from "./foundation/utilities";
import { identityContracts } from "./business/identity";
import { paymentsContracts } from "./business/payments";
import { connectivityContracts } from "./business/connectivity";
import { commerceContracts } from "./business/commerce";
import { deliveryContracts } from "./business/delivery";
import { saasContracts } from "./business/saas";
import { publicServicesContracts } from "./business/public-services";

export const foundationContracts: readonly ComponentContract[] = [
  ...layoutContracts,
  ...typographyContracts,
  ...actionsContracts,
  ...formsContracts,
  ...feedbackContracts,
  ...overlaysContracts,
  ...navigationContracts,
  ...dataDisplayContracts,
  ...mediaContracts,
  ...utilitiesContracts
];

export const businessContracts: readonly ComponentContract[] = [
  ...identityContracts,
  ...paymentsContracts,
  ...connectivityContracts,
  ...commerceContracts,
  ...deliveryContracts,
  ...saasContracts,
  ...publicServicesContracts
];

export const componentContracts: readonly ComponentContract[] = [
  ...foundationContracts,
  ...businessContracts
];
