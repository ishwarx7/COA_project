function convert() {
  const input = document.getElementById("numberInput").value;
  const number = parseFloat(input);

  if (isNaN(number)) {
    alert("Please enter a valid number.");
    return;
  }

  // Single Precision (32-bit)
  const singlePrecisionArray = new Float32Array(1);
  singlePrecisionArray[0] = number;
  const singlePrecisionView = new DataView(singlePrecisionArray.buffer);
  const singlePrecisionHex = Array.from(new Uint8Array(singlePrecisionArray.buffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();

  // Double Precision (64-bit)
  const doublePrecisionArray = new Float64Array(1);
  doublePrecisionArray[0] = number;
  const doublePrecisionView = new DataView(doublePrecisionArray.buffer);
  const doublePrecisionHex = Array.from(new Uint8Array(doublePrecisionArray.buffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();

  // Display results
  document.getElementById("singlePrecision").textContent = singlePrecisionHex;
  document.getElementById("doublePrecision").textContent = doublePrecisionHex;
}
