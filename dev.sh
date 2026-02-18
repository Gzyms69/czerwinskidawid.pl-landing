#!/bin/bash

# Configuration
PORT=8080
PID_FILE=".dev_server.pid"

start_server() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if ps -p $PID > /dev/null; then
            echo "Development server is already running (PID: $PID)"
            return
        else
            rm "$PID_FILE"
        fi
    fi

    echo "Starting development server on port $PORT..."
    # Run npm run dev in the background and redirect output to a log file
    npm run dev -- --port $PORT > dev_server.log 2>&1 &
    
    # Save the PID
    echo $! > "$PID_FILE"
    
    echo "Server started in background. Log: dev_server.log"
    echo "Access it at http://localhost:$PORT"
}

stop_server() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        echo "Stopping development server (PID: $PID)..."
        kill $PID
        rm "$PID_FILE"
        echo "Server stopped."
    else
        # Fallback: find any vite process related to this project
        PIDS=$(pgrep -f "vite")
        if [ ! -z "$PIDS" ]; then
            echo "Found vite processes, stopping..."
            pkill -f "vite"
            echo "Stopped."
        else
            echo "No development server found running."
        fi
    fi
}

case "$1" in
    start)
        start_server
        ;;
    stop)
        stop_server
        ;;
    *)
        echo "Usage: $0 {start|stop}"
        exit 1
        ;;
esac
