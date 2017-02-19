Uses Next.js: https://zeit.co/blog/next which is an amazing framework for rendering JS on the server. However, it's too opinionated on CSS-in-JS which didn't suit my needs.

This starter will let you render client-specific JS/CSS (SASS) while still having the power of Next.js on the server.

It'll watch for JS/SASS changes and livereload the changes. Just like it should!

# Install
Run `npm install` and then `npm run dev` and that's it. Client-side assets live in assets/ and all gets bundled into static/ as per Next.js convention.