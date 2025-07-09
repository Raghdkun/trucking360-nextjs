[06:35:03.675] Running build in Washington, D.C., USA (East) – iad1
[06:35:03.676] Build machine configuration: 2 cores, 8 GB
[06:35:03.696] Cloning github.com/Raghdkun/trucking360-nextjs (Branch: main, Commit: bcf22af)
[06:35:03.879] Previous build caches not available
[06:35:07.222] Cloning completed: 3.525s
[06:35:07.759] Running "vercel build"
[06:35:08.200] Vercel CLI 44.2.13
[06:35:08.505] Installing dependencies...
[06:35:21.302] 
[06:35:21.303] added 356 packages in 13s
[06:35:21.303] 
[06:35:21.304] 141 packages are looking for funding
[06:35:21.304]   run `npm fund` for details
[06:35:21.348] Detected Next.js version: 15.3.4
[06:35:21.351] Running "npm run build"
[06:35:21.455] 
[06:35:21.456] > trucking360-nextjs@0.1.0 build
[06:35:21.456] > next build
[06:35:21.456] 
[06:35:22.037] Attention: Next.js now collects completely anonymous telemetry regarding usage.
[06:35:22.039] This information is used to shape Next.js' roadmap and prioritize features.
[06:35:22.039] You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
[06:35:22.040] https://nextjs.org/telemetry
[06:35:22.040] 
[06:35:22.135]    ▲ Next.js 15.3.4
[06:35:22.136] 
[06:35:22.158]    Creating an optimized production build ...
[06:35:36.310]  ✓ Compiled successfully in 11.0s
[06:35:36.315]    Linting and checking validity of types ...
[06:35:41.109] 
[06:35:41.109] Failed to compile.
[06:35:41.109] 
[06:35:41.109] ./src/app/pricing/page.tsx
[06:35:41.109] 395:88  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[06:35:41.109] 
[06:35:41.109] ./src/components/Hero.tsx
[06:35:41.110] 16:9  Warning: The 'typedStrings' array makes the dependencies of useEffect Hook (at line 49) change on every render. Move it inside the useEffect callback. Alternatively, wrap the initialization of 'typedStrings' in its own useMemo() Hook.  react-hooks/exhaustive-deps
[06:35:41.110] 
[06:35:41.110] info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[06:35:41.143] Error: Command "npm run build" exited with 1
[06:35:41.347] 
[06:35:44.333] Exiting build container