import { defineContract } from "../../../define";

export const onboardingCarouselContract = defineContract({
  id: "onboarding-carousel",
  name: "OnboardingCarousel",
  layer: "business",
  category: "identity",
  priority: "P2",
  description: "First-run value screens with progress"
});
