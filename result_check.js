var i = 0;

function checkResult() {
  i += 1;
  postMessage(i);
  setTimeout("checkResult()",800);
}

checkResult();