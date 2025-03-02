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

  // Double Precision (64-bit)
  const doubleSign = '0'; // Assuming positive number
  const doubleExponent = (1023 + exponent).toString(2).padStart(11, '0');
  const doubleMantissa = normalizedMantissa.padEnd(52, '0').substring(0, 52);

  const doublePrecision = `${doubleSign} ${doubleExponent} ${doubleMantissa}`;

  // Display results in the desired format
  const output = `
    <h3>Single Precision (32-bit):</h3>
    <p>${singlePrecision}</p>
    <h3>Double Precision (64-bit):</h3>
    <p>${doublePrecision}</p>
  `;

  document.getElementById("output").innerHTML = output;
}

// Add event listener to the button
document.getElementById("convertButton").addEventListener("click", convert);
