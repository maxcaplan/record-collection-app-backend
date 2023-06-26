FROM denoland/deno:ubuntu-1.34.1

# The port that your application listens to.
EXPOSE 2007

WORKDIR /app

# Prefer not to run as root.
USER deno

## Add the wait script to the image
COPY --from=ghcr.io/ufoscout/docker-compose-wait:latest /wait /wait

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .
RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts

CMD /wait && deno run --allow-net --allow-read --allow-env main.ts
