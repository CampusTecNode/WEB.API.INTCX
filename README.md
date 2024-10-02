# INTEConnect

## .env File Configuration

1. Copy the `.env.example` file and rename it to `.env`.
2. Fill in the variable values with your credentials and configurations:
   - `PORT`: The port to serve the app
   - `JWT_SECRET`: Secret key to sign JWT tokens.
   - `JWT_EXPIRATION`: The time your JWT will be active.
   - `DB_PORT`: The port the database will listen
   - `NODE_ENV`: The build mode 
   - `DATABASE_URL`: database string connection