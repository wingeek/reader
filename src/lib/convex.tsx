import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { StrictMode } from 'react';
import ReaderApp from '../components/ReaderApp';

// Create a singleton Convex client
const convex = new ConvexReactClient(import.meta.env.PUBLIC_CONVEX_URL!);

export default function AppWithConvex() {
  return (
    <StrictMode>
      <ConvexProvider client={convex}>
        <ReaderApp />
      </ConvexProvider>
    </StrictMode>
  );
}
