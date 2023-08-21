#!/bin/bash

# init global variables
PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"
RAN_NUM=$((1 + $RANDOM % 1000))

DEFAULT_IFS=$IFS

# start the game
START_GAME(){
  echo "Guess the secret number between 1 and 1000:"
  NUMBER=-1

  while [[ $RAN_NUM -ne $NUMBER ]]; do
    read NUMBER

    if [[ $NUMBER =~ ^[0-9]+$ ]]; then
      ((SCORE++))

      if [[ $NUMBER -gt $RAN_NUM ]]; then
        echo "It's lower than that, guess again:"

        elif [[ $NUMBER -lt $RAN_NUM ]]; then
        echo "It's higher than that, guess again:"

        else
          OLD_SCORE=$($PSQL "select best_score from number_guess where username = '$1'")

          if [[ $SCORE -lt $OLD_SCORE || $OLD_SCORE -eq 0 ]]; then
            UPDATE=$($PSQL "update number_guess set games_played = games_played + 1, best_score = $SCORE where username = '$1'")

            else
              UPDATE=$($PSQL "update number_guess set games_played = games_played + 1 where username = '$1'")
          fi

        echo "You guessed it in $SCORE tries. The secret number was $RAN_NUM. Nice job!"
      fi

      else
        echo "That is not an integer, guess again:"
    fi
  done

}

# check player in database
LOGIN_PLAYER(){
  PLAYER=$($PSQL "select * from number_guess where username = '$1'")
  IFS='|'
  read -ra QUERY_ARRAY <<<"$PLAYER"

  IFS=$DEFAULT_IFS

  echo "Welcome back, ${QUERY_ARRAY[0]}! You have played ${QUERY_ARRAY[1]} games, and your best game took ${QUERY_ARRAY[2]} guesses."
}

# start game function
LOGIN_GAME(){
  echo "Enter your username:"
  IFS= read -r -p "" USERNAME
  
  IFS=$DEFAULT_IFS
  
  PLAYER=$($PSQL "select * from number_guess where username = '$USERNAME'")
  
  if [[ -z $PLAYER ]]; then
    # sign up the player
    SIGNUP=$($PSQL "insert into number_guess(username) values('$USERNAME')")
    echo "Welcome, $USERNAME! It looks like this is your first time here."

    else
    # login
      LOGIN_PLAYER $USERNAME
  fi
  
  START_GAME $USERNAME
}

# main programm
MAIN(){
  LOGIN_GAME
}

MAIN
