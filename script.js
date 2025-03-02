function convert() {
  const input = document.getElementById("numberInput").value;
  const number = parseFloat(input);

  if (isNaN(number)) {
    alert("Please enter a valid number.");
    return;
  }

  // Split the number into integer and fractional parts
  const [integerPart, fractionalPart] = String(number).split('.');

  // Convert integer part to binary
  const integerBinary = parseInt(integerPart, 10).toString(2);

  // Convert fractional part to binary
  let fractionalBinary = '';
  let fractional = parseFloat(`0.${fractionalPart || 0}`);
  while (fractional !== 0) {
    fractional *= 2;
    fractionalBinary += Math.floor(fractional);
    fractional -= Math.floor(fractional);
  }

  // Combine integer and fractional binary parts
  const combinedBinary = `${integerBinary}.${fractionalBinary}`;

  // Normalize the binary number
  const exponent = integerBinary.length - 1;
  const normalizedMantissa = `${integerBinary}${fractionalBinary}`.substring(1);

  // Single Precision (32-bit)
  const singleSign = '0'; // Assuming positive number
  const singleExponent = (127 + exponent).toString(2).padStart(8, '0');
  const singleMantissa = normalizedMantissa.padEnd(23, '0').substring(0, 23);

  const singlePrecision = `${singleSign} ${singleExponent} ${singleMantissa}`;
  const singleHex = parseInt(singlePrecision.replace(/\s/g, ''), 2).toString(16).toUpperCase();

  // Double Precision (64-bit)
  const doubleSign = '0'; // Assuming positive number
  const doubleExponent = (1023 + exponent).toString(2).padStart(11, '0');
  const doubleMantissa = normalizedMantissa.padEnd(52, '0').substring(0, 52);

  const doublePrecision = `${doubleSign} ${doubleExponent} ${doubleMantissa}`;
  const doubleHex = BigInt(`0b${doublePrecision.replace(/\s/g, '')}`).toString(16).toUpperCase();

  // Display results in table format
  const output = `
    <table border="1">
      <tr>
        <th>Step</th>
        <th>Value</th>
      </tr>
      <tr>
        <td>Input</td>
        <td>${number}</td>
      </tr>
      <tr>
        <td>Binary Representation</td>
        <td>${combinedBinary}</td>
      </tr>
      <tr>
        <td>Normalized Form</td>
        <td>1.${normalizedMantissa} x 2^${exponent}</td>
      </tr>
      <tr>
        <td>Single Precision</td>
        <td>${singlePrecision}<br>Hex: ${singleHex}</td>
      </tr>
      <tr>
        <td>Double Precision</td>
        <td>${doublePrecision}<br>Hex: ${doubleHex}</td>
      </tr>
    </table>
  `;

  document.getElementById("output").innerHTML = output;
}
