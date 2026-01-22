import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  history: defineTable({
    url: v.string(),
    title: v.string(),
    thumbnail: v.string()
  })
});