#!/bin/bash

# Set a longer timeout for migrations
export PRISMA_MIGRATE_TIMEOUT=60

# Try migration multiple times
max_attempts=3
attempt=1

while [ $attempt -le $max_attempts ]; do
    echo "Attempting database migration (attempt $attempt of $max_attempts)..."
    
    npx prisma migrate deploy
    
    if [ $? -eq 0 ]; then
        echo "Migration successful!"
        exit 0
    fi
    
    echo "Migration attempt $attempt failed. Waiting 5 seconds before retry..."
    sleep 5
    attempt=$((attempt + 1))
done

echo "All migration attempts failed."
exit 1
