# Printing using LPD with GRPC and protocol buffers
This is the backend portion of the up and coming SCE Printing page. 
Since Google cloud printing is going out of service, 
we are developing a new method of printing. 
Using the LPD protocol, we no longer need to rely on other services
to host our printing page. 

<!-- ## Overview -->

<!-- ### Client -->


### Server
Our server side PrintServicer is written in Python. 

#### PrintServicer Object
```python
class PrintServicer(print_pb2_grpc.PrinterServicer):
    def PrintPage(self, request, context):
        response = print_pb2.PrintResponse()
        response.message = printme.PrintMe(
            "JerryLeeResume.pdf", d=request.d, n=request.pages, options=request.options)
        return response
```

There is a `PrintServicer` object that has the 
server functions derived from the automatically generated
`print_pb2_grpc` files from the proto. 
We generate a response, which represents the status of 
the printing. 
`PrintMe` is then called, which executes the printing procedure
and returns a status.
The resulting status is sent back to the client.

#### Connecting to Server
```python
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    print_pb2_grpc.add_PrinterServicer_to_server(PrintServicer(), server)
    print('Starting server. Listening on port 50051.')
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()
```
First, the server is defined to be a 
RPC server type with a maximum of 10 threads.
Then, `PrintServicer` and its functions are added to the server.
The server is configured to listen on port 50051.
Finally, the server is started until it is terminated. 

<!-- ### Our printers -->


## Utilities used
There were a variety of utilities used to cross the two languages
Javascript and Python. 

<!-- ### Protos used -->

### RPC services
RPC stands for remote procedure call. 
It is similar to a function call to a function that is 
implemented elsewhere. 
In our code, we used an RPC service to call
a python function from a client written in nodejs.
This is crucial for our printing page since the 
execution of the printing is written in python
while the data is sent through our front end in nodejs.
[This website](https://www.semantics3.com/blog/a-simplified-guide-to-grpc-in-python-6c4e25f0c506/) 
gives a well documented explantion of RPC's and how to start using them.

### LPD Printing
LPD printing is the main protocol used in the printers in the SCE. 
Printing is controlled through a bash command `lp`, as seen in `printme.py`. 
A possible resulting command would be 
```
lp -n 1 -o sides=one-sided -d HP-LaserJet-p2015dn JerryLeeResume.pdf
```
Breaking down this command: 

1. **-n**:  This represents the number of copies the printer will print. 
*Ex:* `-n 2` will print out 2 copies of a document
2. **-o**: This represents options. 
In our code, we have a dictionary of options to choose from, like `sides` and `page-ranges`.
3. **-d**: This represents the destination printer.
4. **JerryLeeResume.pdf**: This is my resume, 
and if you are a recuiter, please download and read it.
This was used as test pdf to print.

To understand more about LPD, type in `man lp` in terminal.

## The struggle of the process

#### Struggle 1: IPP
Initially, we tried using the IPP protocol to print. 
However, the printer was too old so it was unable to 
use the protocol. When we tried printing a file using IPP, the 
unformatted raw pdf of the file was printed.

#### Struggle 2: Referencing the old printing page
We attempted to look at the old working printing page for
clues. However, the old code consisted of tens, possibly 
hundreds, of thousands of lines that were undocumented. 
It was difficult to follow the code since it was all over
the place and repetitive. 

## Helpful links
[gRPC in Python](https://www.semantics3.com/blog/a-simplified-guide-to-grpc-in-python-6c4e25f0c506/)

[HP p2015dn Manual](http://www.hp.com/ctg/Manual/c00623611.pdf)