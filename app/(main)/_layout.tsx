import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Slot } from 'expo-router';
import React from 'react';



const HomeLayout = () => {
  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
    unsavedChangesWarning: false,
  });


  return (
    <ConvexProvider client={convex}>
      <Slot/>
    </ConvexProvider>
  );
}

export default HomeLayout;
