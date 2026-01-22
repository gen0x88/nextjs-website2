import type { NextConfig } from 'next';
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  output: 'export',
  // basePath: process.env.PAGES_BASE_PATH,
  basePath: "/nextjs-website2",
  assetPrefix: "/nextjs-website2/",
};

export default withFlowbiteReact(nextConfig);