/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    /** Per-request CSP nonce for inline scripts */
    nonce: string;
  }
}
