# Printing using LPD with gRPC and Protocol Buffers
We made use of 
[Protocol Buffers](https://developers.google.com/protocol-buffers) and 
[Remote Procedure Calls (RPCs)](https://techterms.com/definition/rpc) to send 
print requests from our website to the two printers in SCE. The two 
technologies allowed us to connect our website written in JavaScript to a 
printer server written in Python.

Since Google Cloud printing is 
[going out of service](https://support.google.com/chrome/a/answer/9633006), 
we are developing a new method of printing. Using the LPD protocol, we no 
longer need to rely on other services to host our printing page.

### Client
The printer RPC is called from `printClient.js`. An example of the function 
is invoked below:

```js
var client = new print_proto.Printer('localhost:50051',
        grpc.credentials.createInsecure());

client.PrintPage({
        copies: 1, destination: "HP-LaserJet-p2015dn", options: {
            "sides": "one-sided",
            "page-ranges": "NA"
        }
    }, function (err, response) {
        if (err) console.log(err);
        console.log('Message:', response.message);
    });
```
We first define the client to be of the Printer service type. As mentioned 
above, the `Printer` service contains the RPC `PrintPage`, which is 
implemented in the `printing_server.py` file.

We then invoke the `PrintPage` RPC from the `.js` file, sending a 
`PrintRequest` protobuf to the RPC.


### Server
Our server side `PrintServicer` is written in Python. 

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

## Our Printers
The two printers currently found in SCE are both 
[HP LaserJet 
P2015DN](https://www.amazon.com/HP-CB368A-ABU-LaserJet-P2015DN/dp/B000JEDWTI).

### Protos Used
Inside of `print.proto`, we can see the `PrintRequest` protobuf defined below:
```proto
message PrintRequest{
    uint32 copies = 1;
    string destination = 2;
    map<string, string> options = 3;
}
```
The first field of `PrintRequest` is `copies`, which specifies the number of 
times we will print the file. The `destination` field holds the name of the 
printer we will print to. Because we have two printers, the value of 
`destination` is one of two constants. Finally, the `options` field holds a 
map of key value pairs, both of type `string`. This is to specify any 
additional options that can be sent via the LPD printing protocol. To read 
more about the possible options, see this 
[manual](https://www.cups.org/doc/man-lp.html#COMMON_JOB_OPTIONS) 
for the `lp` command.

```proto
message PrintResponse{
    string message = 1;
}
```
The only field of `PrintRequest` is `message` which either contains a 
confirmation or an error if the print job finished.

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

## Difficulties Encountered

### Using IPP Protocol
Initially, we tried using the IPP protocol to print. 
However, the printer was too old so it was unable to 
use the protocol. When we tried printing a file using IPP, the 
unformatted raw pdf of the file was printed.

### Finding the Correct Protocol
We soon realized that the printers were manufactured in 2006, and still used 
LPD (Line Printer Daemon Protocol).

### Establishing a Connection to the Printer
We were unable to connect to the printers through the school's wifi. We later 
saw that the printers had an ethernet cable connected to them. We found the IP 
address by printing out the network configuration page and established a 
successful connection through ethernet.

### Referencing the Existing system
We attempted to look at the old working printing page for
clues. However, the old code consisted of tens, possibly 
hundreds, of thousands of lines that were undocumented. 
It was difficult to follow the code since it was all over
the place and repetitive. The repository of the existing system can be found 
[here](https://github.com/SCE-Development/Printer/)

## Helpful links
[gRPC in Python](https://www.semantics3.com/blog/a-simplified-guide-to-grpc-in-python-6c4e25f0c506/)

[HP p2015dn Manual](http://www.hp.com/ctg/Manual/c00623611.pdf)

[LP Command Manual Page](https://www.cups.org/doc/man-lp.html)
