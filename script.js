function formatNumberWithSixDecimalPlaces(number) {
  if (Number.isInteger(number)) {
    return number.toFixed(6);
  } else {
    const parts = number.toString().split('.');
    if (parts[1] && parts[1].length < 6) {
      parts[1] = parts[1] + '0'.repeat(6 - parts[1].length);
    } else {
      return number.toFixed(6);
    }
    return parts.join('.');
  }
}

function dmsToDecimal(degrees, minutes, seconds, direction) {
  let decimal =
    parseInt(degrees) + parseFloat(minutes) / 60 + parseFloat(seconds) / 3600;

  if (direction === 'S' || direction === 'W') {
    decimal = -decimal;
  }

  return decimal;
}

function convertDmsToDecimal(dmsCoordinate) {
  var dmsPattern = /(\d+)°(\d+)?'?\s*([\d.]+)?"?\s*([NSEW])$/i;
  var finalResult = [];
  for (let i = 0; i < 2; i++) {
    var matches = dmsCoordinate[i].match(dmsPattern);
    if (matches) {
      var degrees = matches[1];
      var minutes = matches[2] || 0;
      var seconds = matches[3] || 0;
      var direction = matches[4].toUpperCase();
      var result = formatNumberWithSixDecimalPlaces(
        dmsToDecimal(degrees, minutes, seconds, direction)
      );
      console.log(result);
      finalResult.push(result);
    } else {
      return null;
    }
  }
  return finalResult;
}

const submitButton = document.getElementById('submitButton');
const text = document.getElementById('input-text');
const outputList = document.getElementById('outputList');
var outputItem;

text.addEventListener('input', (e) => {
  if (e.currentTarget.value === '') {
    outputList.innerHTML = '';
  }
});

submitButton.addEventListener('click', () => {
  let textInput = text.value;
  if (textInput !== '') {
    while (outputList.firstChild) {
      outputList.removeChild(outputList.firstChild);
    }
    let textSplit = textInput.split('\n');
    console.log('textSplit', textSplit);
    for (let i = 0; i < textSplit.length; i++) {
      let latLongSplit = textSplit[i].split(' ');
      let decimalResult = convertDmsToDecimal(latLongSplit);
      outputItem = document.createElement('li');
      outputItem.textContent = `${decimalResult}`;
      outputList.appendChild(outputItem);
      console.log('outputItem', outputItem);
    }
  }
});

// 11°48'59.2"E 78°53'03.5"N
// 13°42'59.2"E 71°52'03.5"N
// 10°48'50.2"E 71°53'13.5"N
// 12°40'50.2"E 57°50'13.5"N
// 13°42'59.2"E 71°52'03.5"N
// 10°48'50.2"E 71°53'13.5"N
