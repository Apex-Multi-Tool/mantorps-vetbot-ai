curl -X POST http://your-ollama-server/v1/chat/completions \
-H "Content-Type: application/json" \
-d '{
    "model": "gemma:3b",
    "messages": [
        {"role": "system", "content": "You are a helpful customer support assistant."},
        {"role": "user", "content": "Your customer question here"}
    ]
}'
