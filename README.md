This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

npm commands are left as is from the bootstrap:

```bash
npm run dev
# or
yarn dev
# or start, build, lint
```

It would be a Next 13 only project except for now the gallery route necessitates it being a hybrid 12/13

- Framer Motion is the right library for the route transitions but as of the time I am building this, there's a conflict with framer motion's AnimatePresence and Next 13's router.
- Follow the issue here: [https://github.com/vercel/next.js/issues/49279#issuecomment-1541939624](https://github.com/vercel/next.js/issues/49279#issuecomment-1541939624)
- There's a branch called slideshow-explore that has a lot of work attempting to get this into Next13 but when the issue is fixed on their end I think the best way to upgrade to 13 completely is to just port over what in 12 currently, and adjust for the app vs pages directory. All the slideshow logic should be the same.
