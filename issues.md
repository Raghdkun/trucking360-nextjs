[13:19:55.052] Running build in Washington, D.C., USA (East) – iad1
[13:19:55.052] Build machine configuration: 2 cores, 8 GB
[13:19:55.070] Cloning github.com/Raghdkun/trucking360-nextjs (Branch: main, Commit: deb5a33)
[13:19:55.103] Skipping build cache, deployment was triggered without cache.
[13:19:58.489] Cloning completed: 3.419s
[13:19:59.077] Running "vercel build"
[13:19:59.523] Vercel CLI 44.2.13
[13:20:00.135] Installing dependencies...
[13:20:13.296] 
[13:20:13.297] added 356 packages in 13s
[13:20:13.298] 
[13:20:13.298] 141 packages are looking for funding
[13:20:13.298]   run `npm fund` for details
[13:20:13.353] Detected Next.js version: 15.3.4
[13:20:13.358] Running "npm run build"
[13:20:13.469] 
[13:20:13.470] > trucking360-nextjs@0.1.0 build
[13:20:13.470] > next build
[13:20:13.471] 
[13:20:14.064] Attention: Next.js now collects completely anonymous telemetry regarding usage.
[13:20:14.065] This information is used to shape Next.js' roadmap and prioritize features.
[13:20:14.066] You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
[13:20:14.066] https://nextjs.org/telemetry
[13:20:14.066] 
[13:20:14.166]    ▲ Next.js 15.3.4
[13:20:14.166] 
[13:20:14.194]    Creating an optimized production build ...
[13:20:29.403]  ✓ Compiled successfully in 11.0s
[13:20:29.409]    Linting and checking validity of types ...
[13:20:34.588] 
[13:20:34.588] Failed to compile.
[13:20:34.588] 
[13:20:34.588] ./src/app/pricing/page.tsx
[13:20:34.588] 88:13  Error: Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free.  @typescript-eslint/ban-ts-comment
[13:20:34.589] 203:57  Error: Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free.  @typescript-eslint/ban-ts-comment
[13:20:34.589] 395:88  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[13:20:34.589] 
[13:20:34.589] ./src/app/why-trucking-360/page.tsx
[13:20:34.589] 157:17  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element
[13:20:34.589] 206:17  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element
[13:20:34.589] 227:17  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element
[13:20:34.590] 261:13  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element
[13:20:34.590] 274:13  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element
[13:20:34.590] 
[13:20:34.590] ./src/components/Hero.tsx
[13:20:34.590] 16:9  Warning: The 'typedStrings' array makes the dependencies of useEffect Hook (at line 49) change on every render. Move it inside the useEffect callback. Alternatively, wrap the initialization of 'typedStrings' in its own useMemo() Hook.  react-hooks/exhaustive-deps
[13:20:34.590] 
[13:20:34.591] info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[13:20:34.626] Error: Command "npm run build" exited with 1
[13:20:34.858] 
[13:20:38.169] Exiting build container