function telephoneCheck(str) {
  const re = /^((1|1\s)?)((\d{10})|(\d{3})|(\(\d{3}\)))((-|\s)?)(\d{3})((-|\s)?)(\d{4})$/;
  if(re.test(str) === true)
    return true;
  else
    return false;
}
telephoneCheck("555-555-5555");