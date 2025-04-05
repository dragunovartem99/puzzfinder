import { ref } from "vue";
import type { Ref } from "vue";
import type { Puzzle } from "../types";

export const results: Ref<Puzzle[]> = ref([]);
