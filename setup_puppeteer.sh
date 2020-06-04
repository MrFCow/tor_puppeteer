#!/bin/bash
sudo apt-get update
sudo apt-get install -y libgbm-dev
#sudo apt install chromium-browser #WSL only
CHROME_SANDBOX=$(find ~+ -maxdepth 10 -type f -name chrome_sandbox)
echo $CHROME_SANDBOX

sudo chown root:root $CHROME_SANDBOX
sudo chmod 4755 $CHROME_SANDBOX
ls $CHROME_SANDBOX -la

export CHROME_DEVEL_SANDBOX=$CHROME_SANDBOX