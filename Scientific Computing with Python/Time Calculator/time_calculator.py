def add_time(sTime, duration, sDay = ""):
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  clockFormat = sTime.split(" ")[1]
  sHours = sTime.split(":")[0]
  sMinutes = sTime.split(":")[1].split(" ")[0]
  dHours = duration.split(":")[0]
  dMinutes = duration.split(":")[1]
  addMinutes = int(sMinutes) + int(dMinutes)
  new_time = ""
#format to 24 ##########################################
  if clockFormat == "PM":
    tfFormat = int(sHours) + 12
  elif clockFormat == "AM":
    tfFormat = int(sHours)
#add minutes ###########################################
  if int(addMinutes) >= 60:
    tfFormat += 1
    addMinutes -= 60
#total hours in 24 format ##############################
  tfFormat += int(dHours)
#format the minutes ####################################
  if addMinutes <= 9:
    addMinutes = "0" + str(addMinutes)
  elif addMinutes >= 10:
    addMinutes = str(addMinutes)
#days and hours left ###################################
  days = tfFormat // 24
  hoursLeft = tfFormat % 24
#day format ############################################
  if sDay != "":
    sDay = sDay.capitalize()
    if sDay in daysOfWeek:
      sDay = ", " + daysOfWeek[(daysOfWeek.index(sDay) + days) % 7]
    else:
      sDay = ""
#24 to 12 hour format ##################################
  if hoursLeft >= 1 and hoursLeft <= 11:
    clockFormat = "AM"
  elif hoursLeft >= 12 and hoursLeft <= 23:
    if hoursLeft >= 13:
      hoursLeft -= 12
    clockFormat = "PM"
  elif hoursLeft == 0:
    hoursLeft = 12
    clockFormat = "AM"
#today #################################################
  if days == 0:
    new_time = str(hoursLeft) + ":" + str(addMinutes) + " " + clockFormat + sDay
# next day #############################################
  if days == 1:
    new_time = str(hoursLeft) + ":" + str(addMinutes) + " " + clockFormat + sDay + " (next day)"
# many days ###########################################
  if days >= 2:
    new_time = str(hoursLeft) + ":" + str(addMinutes) + " " + clockFormat + sDay + " (" + str(days) + " days later)"
#return the result ####################################
  return new_time