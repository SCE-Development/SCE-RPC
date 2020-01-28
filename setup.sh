#!/bin/bash

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
    python3 -m pip install -r ./requirements.txt
    # Deactivate virtual environment
    deactivate
}

install_rpc
