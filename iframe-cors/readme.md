How to run this project?

1. start domain_A on a server
2. To test iframe GET request: start domain_B
3. To test iframe POST request: start domain_C_server


Workflow:

* domain_A: original client side code to send the request with iframe
* domain_B: use `window.name` property to transfer data back to domain_A
* domain_C: nodejs server to receive POST request from domain_
