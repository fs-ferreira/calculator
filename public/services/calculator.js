function calc(prevNumber, currentNumber, operator) {
  let equation;
  let result;
  switch (operator) {
    case "+":
      equation = `${prevNumber} + ${currentNumber}`;
      result = prevNumber + currentNumber;
      postData(equation, result);
      return result;
      break;
    case "-":
      equation = `${prevNumber} - ${currentNumber}`;
      result = prevNumber - currentNumber;
      postData(equation, result);
      return result;
      break;
    case "*":
      equation = `${prevNumber} * ${currentNumber}`;
      result = prevNumber * currentNumber;
      postData(equation, result);
      return result;
      break;
    case "/":
      equation = `${prevNumber} / ${currentNumber}`;
      result = prevNumber / currentNumber;
      postData(equation, result);
      return result;
      break;
  }
}

async function postData(equation, result) {
  var request = new XMLHttpRequest();

  var params = {
    request: equation,
    result: result,
    created: new Date(),
    createdBy: "Felipe Ferreira",
  };

  request.open("POST", "http://localhost:4000/requests", true);

  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  request.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      console.warn("Requisição feita com sucesso!");
    }
  };
  request.send(JSON.stringify(params));
}
