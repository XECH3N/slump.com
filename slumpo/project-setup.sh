# Create Next.js project with TypeScript
npx create-next-app@latest major-slump-website --typescript --tailwind --eslint

# Navigate to project directory
cd major-slump-website

# Install dependencies
npm install gsap framer-motion three @react-three/fiber @react-three/drei
npm install @radix-ui/react-dialog @radix-ui/react-navigation-menu
npm install -D @types/three

# Create project structure
mkdir -p src/components/{ui,navigation,sections,animations}
mkdir -p src/lib
mkdir -p src/styles
mkdir -p public/{fonts,audio,images}