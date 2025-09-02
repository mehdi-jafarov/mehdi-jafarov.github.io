const form = document.getElementById("prediction-form");
const statusEl = document.getElementById("status");
let session;

// Load ONNX model
(async () => {
  try {
    session = await ort.InferenceSession.create("../models/sba-sk-logreg.onnx");
    console.log("ONNX model loaded");
  } catch (err) {
    console.error("Failed to load ONNX model:", err);
    statusEl.innerText = "Load Failed";
  }
})();

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Parse input numbers and remove any $ or commas
  const loanAmt = parseFloat(document.getElementById("loanAmt").value.replace(/[$,]/g,""));
  const sbaPortion = parseFloat(document.getElementById("sbaPortion").value.replace(/[$,]/g,""));
  const realEstate = parseInt(document.getElementById("realEstate").value);

  if (isNaN(loanAmt) || isNaN(sbaPortion) || ![0,1].includes(realEstate) || loanAmt === 0) {
    statusEl.innerText = "Invalid Values";
    return;
  }

  // Compute Portion and recession
  const portion = sbaPortion / loanAmt;
  const recession = 0.0;

  // DEBUG: log inputs
  console.log("=== DEBUG INPUTS ===");
  console.log("Loan Amount:", loanAmt);
  console.log("SBA Portion:", sbaPortion);
  console.log("RealEstate:", realEstate);
  console.log("Portion:", portion);
  console.log("Recession:", recession);

  // Prepare input tensor
  const feeds = {
    float_input: new ort.Tensor("float32", Float32Array.from([realEstate, portion, recession]), [1,3])
  };

  try {
    const results = await session.run(feeds);
    const outputKey = Object.keys(results)[0];
    const label = Number(results[outputKey].data[0]); // Read class label directly
    console.log("Predicted class label:", label);

    // Only show Approved or Denied
    statusEl.innerText = label === 0 ? "Approved" : "Denied";
  } catch (err) {
    console.error("ONNX inference error:", err);
    statusEl.innerText = "Inference failed";
  }
});