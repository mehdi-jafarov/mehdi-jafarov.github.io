import onnx
import os

model = onnx.load("sba_sk_logreg.onnx")
print("ONNX model loaded successfully")

model = onnx.load("sba_sk_logreg.onnx")
print("Inputs:")
for inp in model.graph.input:
    print(inp.name, inp.type)
print("\nOutputs:")
for out in model.graph.output:
    print(out.name, out.type)
