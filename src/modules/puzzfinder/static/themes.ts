import type { UI } from "@/shared";

import { OUTCOME_THEMES } from "./themes-outcomes";
import { TACTIC_THEMES } from "./themes-tactics";

export const THEMES: UI.OptionGroup[] = [...TACTIC_THEMES, ...OUTCOME_THEMES];
