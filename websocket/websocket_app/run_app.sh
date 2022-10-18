#!/bin/bash


if [[ "$DEPLOY" = "TRUE" ]]; then
    echo "RUNNING DEPLOY"
    uvicorn main:app --host 0.0.0.0 --port 8000 --workers 3
else
    echo "RUNNING TEST"
    uvicorn main:app --host 0.0.0.0 --port 8000 --workers 1 --reload
fi
