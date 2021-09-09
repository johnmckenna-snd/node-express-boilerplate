#bin/bash

export $(cat .env.development | xargs -0)
