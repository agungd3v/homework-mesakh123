FROM node:18-alpine AS deps
RUN apk --no-cache add curl
RUN apk add busybox
RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN rm -rf .next

COPY package.json package-lock.json ./
RUN  npm install

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run postbuild
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV development
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/elastic-apm-node.js ./elastic-apm-node.js

USER root

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
