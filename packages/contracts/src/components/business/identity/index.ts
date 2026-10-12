import type { ComponentContract } from "../../../types";
import { phoneNumberInputContract } from "./phone-number-input";
import { countrySelectorContract } from "./country-selector";
import { languageSelectorContract } from "./language-selector";
import { otpInputContract } from "./otp-input";
import { pinCodeInputContract } from "./pin-code-input";
import { numericKeypadContract } from "./numeric-keypad";
import { biometricPromptContract } from "./biometric-prompt";
import { passwordStrengthMeterContract } from "./password-strength-meter";
import { consentCheckboxContract } from "./consent-checkbox";
import { kycDocumentUploadContract } from "./kyc-document-upload";
import { selfieCaptureContract } from "./selfie-capture";
import { kycStatusCardContract } from "./kyc-status-card";
import { onboardingCarouselContract } from "./onboarding-carousel";
import { profileHeaderContract } from "./profile-header";

export const identityContracts: readonly ComponentContract[] = [
  phoneNumberInputContract,
  countrySelectorContract,
  languageSelectorContract,
  otpInputContract,
  pinCodeInputContract,
  numericKeypadContract,
  biometricPromptContract,
  passwordStrengthMeterContract,
  consentCheckboxContract,
  kycDocumentUploadContract,
  selfieCaptureContract,
  kycStatusCardContract,
  onboardingCarouselContract,
  profileHeaderContract
];
