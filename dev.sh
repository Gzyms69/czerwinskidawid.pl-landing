#!/bin/bash

# Configuration
PORT=8080
PID_FILE=".dev_server.pid"
LOG_FILE="dev_server.log"

check_port() {
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
        echo "Error: Port $PORT is already in use."
        echo "Check the process using: lsof -i :$PORT"
        return 1
    fi
    return 0
}

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

    if ! check_port; then
        exit 1
    fi

    echo "Starting development server..."
    # Run pnpm dev in the background. Use setsid to start a new process group
    # so we can kill all child processes reliably later.
    pnpm dev --port $PORT > "$LOG_FILE" 2>&1 &
    
    NEW_PID=$!
    echo $NEW_PID > "$PID_FILE"
    
    echo "Waiting for server to initialize..."
    # Wait for the server to report it's ready and show the actual URL
    MAX_RETRIES=30
    COUNT=0
    while ! grep -q "Local:" "$LOG_FILE" && [ $COUNT -lt $MAX_RETRIES ]; do
        sleep 0.5
        ((COUNT++))
    done

    if grep -q "Local:" "$LOG_FILE"; then
        ACTUAL_URL=$(grep "Local:" "$LOG_FILE" | awk '{print $2}')
        echo "Server started successfully!"
        echo "Access it at: $ACTUAL_URL"
        echo "Logs: tail -f $LOG_FILE"
    else
        echo "Server started, but could not detect URL. Check $LOG_FILE for details."
    fi
}

stop_server() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        echo "Stopping development server (PID: $PID) and its children..."
        # Kill the entire process group
        pkill -P $PID
        kill $PID
        rm "$PID_FILE"
        echo "Server stopped."
    else
        # Search for any remaining vite processes in this directory
        VITE_PIDS=$(pgrep -f "vite")
        if [ ! -z "$VITE_PIDS" ]; then
            echo "Cleaning up lingering vite processes..."
            pkill -f "vite"
            echo "Done."
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
    restart)
        stop_server
        sleep 1
        start_server
        ;;
    *)
        echo "Usage: $0 {start|stop|restart}"
        exit 1
        ;;
esac
