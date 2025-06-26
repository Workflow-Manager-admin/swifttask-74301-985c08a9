#!/bin/bash
cd /home/kavia/workspace/code-generation/swifttask-74301-985c08a9/todo_frontend_remix_workspace/todo_frontend_remix
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

