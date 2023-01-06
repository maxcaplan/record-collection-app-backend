FROM denoland/deno:ubuntu-1.29.1

# The port that your application listens to.
EXPOSE 8080

WORKDIR /api

# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .
RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts

COPY --chown=deno wait-for-it.sh wait-for-it.sh 
RUN chmod +x wait-for-it.sh

CMD ["./wait-for-it.sh", "mongo:27017", "--", "deno", "run", "--allow-net", "--allow-read", "--allow-env", "main.ts"]