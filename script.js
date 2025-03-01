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
  const singlePrecisionBits = singlePrecisionView.getUint32(0).toString(2).padStart(32, '0');

  const singleSign = singlePrecisionBits[0];
  const singleExponent = singlePrecisionBits.substring(1, 9);
  const singleMantissa = singlePrecisionBits.substring(9);

  // Double Precision (64-bit)
  const doublePrecisionArray = new Float64Array(1);
  doublePrecisionArray[0] = number;
  const doublePrecisionView = new DataView(doublePrecisionArray.buffer);
  const doublePrecisionBits = (
    (BigInt(doublePrecisionView.getUint32(0)) << 32n) |
    BigInt(doublePrecisionView.getUint32(4))
  ).toString(2).padStart(64, '0');

  const doubleSign = doublePrecisionBits[0];
  const doubleExponent = doublePrecisionBits.substring(1, 12);
  const doubleMantissa = doublePrecisionBits.substring(12);

  // Display results
  document.getElementById("singlePrecision").textContent =
    `The IEEE 754 Single precision is:\n= ${singleSign} ${singleExponent} ${singleMantissa}`;

  document.getElementById("doublePrecision").textContent =
    `The IEEE 754 Double precision is:\n= ${doubleSign} ${doubleExponent} ${doubleMantissa}`;
}
