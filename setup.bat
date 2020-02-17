@ECHO OFF

REM Install client dependencies
call npm install grpc google-protobuf @grpc/proto-loader
REM Remove modules (virtual environment folder)
del modules
REM Install virtualenv
python -m pip install virtualenv --user
REM Initialize modules as virtual environment
python -mvenv modules
REM Activate virtual environment
call modules/Scripts/activate.bat
REM Install all dependencies
call python -m pip install -r requirements.txt
REM Deactivate virtual environment
deactivate
