#!/bin/bash

#salon programm

PSQL="psql --username=freecodecamp --dbname=salon -t -c"

echo -e "\n~~~~~ MY SALON ~~~~~\n"

# display menu function
SERVICE_MENU(){
  # display input error
  if [[ $1 ]]; then
    echo -e "\n$1"

    else
    echo -e "Welcome to My Salon, how can I help you?\n\nChoose a service by its number."
  fi

  # get services with query
  SERVICES=$($PSQL "select * from services order by service_id")
  echo "$SERVICES" | while read id dush service; do
    echo "$id) $service"
  done
  read SERVICE_ID_SELECTED
  if [[ ! $SERVICE_ID_SELECTED =~ [0-9]+$ ]]; then
    # if the input is not a number run again
    SERVICE_MENU "Choose a valid service BY ITS NUMBER."

    else
      NEW_APPOINTMENT $SERVICE_ID_SELECTED
  fi
}

# create new appointment
NEW_APPOINTMENT(){
  # get phone number
  echo -e "\nWhat's your phone number?"
  read CUSTOMER_PHONE

  # check the phone input and query the phone
  if [[ ! $CUSTOMER_PHONE ]]; then
    NEW_APPOINTMENT

    else
      # check if customer is in customers db
      IS_CUSTOMER=$($PSQL "select name from customers where phone = '$CUSTOMER_PHONE'")
  fi

  # check if the customer is in customers else ask for name and add
  if [[ -z $IS_CUSTOMER ]]; then
    echo -e "\nI don't have a record for that phone number, what's your name?"
    read CUSTOMER_NAME

    if [[ ! $CUSTOMER_NAME ]]; then
      MAIN

      else
        ADD_CUSTOMER=$($PSQL "insert into customers(phone, name) values('$CUSTOMER_PHONE', '$CUSTOMER_NAME')")
    fi
  fi

  # check if customer is in customers db
  IS_CUSTOMER=$($PSQL "select name from customers where phone = '$CUSTOMER_PHONE'")

  if [[ -z $IS_CUSTOMER ]]; then
    MAIN

    else
      SERVICE_NAME=$($PSQL "select name from services where service_id = $1")
      echo "What time would you like your $SERVICE_NAME, $IS_CUSTOMER?" | sed -E 's/ +/ /g'
      read SERVICE_TIME

      if [[ ! $SERVICE_TIME ]]; then
        echo -e "\nInvalid time, please try again"
        NEW_APPOINTMENT

        else
          CUSTOMER_ID=$($PSQL "select customer_id from customers where phone = '$CUSTOMER_PHONE'")
          INSERT_APPOINTMENT=$($PSQL "insert into appointments(customer_id, service_id, time) values($CUSTOMER_ID, $1, '$SERVICE_TIME')")

          if [[ -z $INSERT_APPOINTMENT ]]; then
            MAIN
            else
              echo -e "\nI have put you down for a $SERVICE_NAME at $SERVICE_TIME, $CUSTOMER_NAME." | sed -E 's/ +/ /g'
          fi
      fi
  fi   
}

# main programm
MAIN(){
  SERVICE_MENU
}

MAIN
