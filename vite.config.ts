import process from "node:process";
import { defineConfig } from "vitest/config";

export default defineConfig({
  base: process.env.DEPLOY_BASE || "/Lernw-rter/",

  test: {
    environment: "node",
    globals: true
  }
});
