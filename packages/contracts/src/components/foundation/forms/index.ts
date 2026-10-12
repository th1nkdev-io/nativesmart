import type { ComponentContract } from "../../../types";
import { inputContract } from "./input";
import { formFieldContract } from "./form-field";
import { textareaContract } from "./textarea";
import { passwordInputContract } from "./password-input";
import { searchInputContract } from "./search-input";
import { numberInputContract } from "./number-input";
import { maskedInputContract } from "./masked-input";
import { pinInputContract } from "./pin-input";
import { selectContract } from "./select";
import { comboboxContract } from "./combobox";
import { multiSelectContract } from "./multi-select";
import { checkboxContract } from "./checkbox";
import { checkboxGroupContract } from "./checkbox-group";
import { radioGroupContract } from "./radio-group";
import { switchContract } from "./switch";
import { sliderContract } from "./slider";
import { datePickerContract } from "./date-picker";
import { dateRangePickerContract } from "./date-range-picker";
import { timePickerContract } from "./time-picker";
import { calendarContract } from "./calendar";
import { fileUploadContract } from "./file-upload";
import { ratingInputContract } from "./rating-input";
import { tagInputContract } from "./tag-input";
import { fieldsetContract } from "./fieldset";
import { formContract } from "./form";

export const formsContracts: readonly ComponentContract[] = [
  inputContract,
  formFieldContract,
  textareaContract,
  passwordInputContract,
  searchInputContract,
  numberInputContract,
  maskedInputContract,
  pinInputContract,
  selectContract,
  comboboxContract,
  multiSelectContract,
  checkboxContract,
  checkboxGroupContract,
  radioGroupContract,
  switchContract,
  sliderContract,
  datePickerContract,
  dateRangePickerContract,
  timePickerContract,
  calendarContract,
  fileUploadContract,
  ratingInputContract,
  tagInputContract,
  fieldsetContract,
  formContract
];
