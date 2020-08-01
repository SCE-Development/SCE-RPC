#!/bin/bash

function create_config() {
    # copy config.example.js to config.js
    cp client/config/config.example.js client/config/config.js
}

function install_rpc(){
    # Install client dependencies
    npm install
    # Remove modules (virtual environment folder)
    rm -R modules &> /dev/null
    # Pip install virtualenv
    python3 -m pip install virtualenv --user
    # Initialize modules folder as a "virtual environment"
    python3 -m virtualenv -p `which python3` modules
    # Activate virtual environment
    source modules/bin/activate
    # Install all requirements within requirements.txt file
    sudo python3 -m pip install -r ./requirements.txt
    # Deactivate virtual environment
    deactivate
}

create_config
install_rpc
