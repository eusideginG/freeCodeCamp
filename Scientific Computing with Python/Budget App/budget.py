class Category:
#initialize ################################
  def __init__(self, name):
    self.name = name
    self.ledger = list()
#class print ###############################
  def __str__(self):
    item_list = ""
    title = self.name.center(30, "*") + "\n"
    for category in self.ledger:
      item_list +=  f'{category["description"][0:23]:<23}' + f'{category["amount"]:>7.2f}' + "\n"
    total = "Total: " + str(self.get_balance())
    budget_object = title + item_list + total
    return budget_object.format()
#deposit method ############################
  def deposit(self, amount, description = ""):
    self.ledger.append({"amount": amount, "description": description})
#withdraw method ###########################
  def withdraw(self, amount, description = ""):
    if self.check_funds(amount):
      self.ledger.append({"amount": -amount, "description": description})
      return True
    return False
#get balance method ########################
  def get_balance(self):
    balance = 0
    for amount in self.ledger:
      balance += amount["amount"]
    return balance
#trancfer method ###########################
  def transfer(self, amount, category):
    if self.check_funds(amount):
      self.withdraw(amount, "Transfer to " + category.name)
      category.deposit(amount, "Transfer from " + self.name)
      return True
    return False
#check funds method ########################
  def check_funds(self, amount):
    if amount > self.get_balance():
      return False
    else:
      return True
########################################################################
def create_spend_chart(categories):
#setup #####################################
  title = "Percentage spent by category\n"
  bar_chart = ""
  names = []
  total_spending = 0
  spending_per_category = []
  percent = []
  for category in categories:
    names.append(category.name)
    temp_withdraw = 0
    for entry in category.ledger:
      if entry["amount"] < 0:
        temp_withdraw += entry["amount"]
    spending_per_category.append(temp_withdraw)
    total_spending += temp_withdraw
#result and rounding ######################
  for spending in spending_per_category:
    percent.append(round((spending * 100) / total_spending))
  print(percent)
#printing #################################
  bar_chart += title
#percent (o) printing #####################
  for i in range(100,-10,-10):
    bar_chart += str(i).rjust(3) + "| "
    for category in percent:
      if category < i:
        bar_chart += "   "
      if category >= i:
        bar_chart += "o  "
    bar_chart += "\n"
  bar_chart += "    "
#horizondal line printing ##################
  for category in percent:
    if category != percent[-1]:
      bar_chart += "---"
    elif category == percent[-1]:
      bar_chart += "----"
  bar_chart += "\n"
  maxLength = 0
#find the max length of the categories name#
  for name in names:
    if len(name) > maxLength:
      maxLength = len(name)
#print category names ######################
  for i in range(maxLength):
    bar_chart += "     "
    for name in names:
      if len(name) > i:
        bar_chart += name[i] + "  "
      elif len(name) <= i:
        bar_chart += "   "
    if i < maxLength - 1:
      bar_chart += "\n"
#return ####################################
  return bar_chart