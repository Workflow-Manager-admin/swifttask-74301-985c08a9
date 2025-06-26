#!/bin/bash
cd /home/kavia/workspace/code-generation/swifttask-74301-985c08a9/todo_backend_api_workspace/todo_backend_api
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

