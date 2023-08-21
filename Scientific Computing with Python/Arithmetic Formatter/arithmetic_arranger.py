import re
def arithmetic_arranger(list, printResult = False):
  line1 = ""
  line2 = ""
  line3 = ""
  line4 = ""
  #Situations that will return an error: ########################################
  if len(list) >= 6:
    return "Error: Too many problems."
  for item in list:
    if len(re.findall("\D", str(item.split(" ")[0]))) > 0 or len(re.findall("\D", str(item.split(" ")[2]))) > 0:
      return "Error: Numbers must only contain digits."
    if len(str(item.split(" ")[0])) > 4 or len(str(item.split(" ")[2])) > 4:
      return "Error: Numbers cannot be more than four digits."
    if item.split(" ")[1] != "-" and item.split(" ")[1] != "+":
      return "Error: Operator must be '+' or '-'."
#results ########################################################################
    if item.split(" ")[1] == "+":
      result = str(int(item.split(" ")[0]) + int(item.split(" ")[2]))
    elif item.split(" ")[1] == "-":
      result = str(int(item.split(" ")[0]) - int(item.split(" ")[2]))
#align and arrange ##############################################################
    maxItem = max(len(str(item.split(" ")[0])), len(str(item.split(" ")[2]))) + 2
    if item != list[-1]:
      line1 += str(item.split(" ")[0]).rjust(maxItem) + "    "
      line2 += item.split(" ")[1] + str(item.split(" ")[2]).rjust(maxItem - 1) + "    "
      line3 += "".rjust(maxItem, "-") + "    "
      line4 += result.rjust(maxItem) + "    "
    else:
      line1 += str(item.split(" ")[0]).rjust(maxItem)
      line2 += item.split(" ")[1] + str(item.split(" ")[2]).rjust(maxItem - 1)
      line3 += "".rjust(maxItem, "-")
      line4 += result.rjust(maxItem)
#final return ###################################################################
  if printResult:
    return line1 + "\n" + line2 + "\n" + line3 + "\n" + line4
  else:
    return line1 + "\n" + line2 + "\n" + line3