import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Alert } from "react-native";

export const getLinks = query({
  handler: async (context) => {
      const links = context.db.query('history').order('desc').collect();
    return links;
  }
})

export const addLink = mutation({
  args: { url: v.string(), videoTitle: v.string(), thumbnail: v.string() },
  handler: async (context, args) => {
    const existingLnks = context.db.query('history').order('desc').collect();

    if ((await existingLnks).some(link => link.url === args.url)) {
      console.log("Link já existe no histórico.");
      return null;
    }

    const link = await context.db.insert("history", {
      url: args.url, 
      title: args.videoTitle,
      thumbnail: args.thumbnail 
    });

    return link;
  }
}) 
