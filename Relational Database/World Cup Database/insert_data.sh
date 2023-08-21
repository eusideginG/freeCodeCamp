#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.

# check if the team name exist, if not add it to the database
find_and_add() {
  if [[ -z $($PSQL "select name from teams where name = '$1';") ]]; then
    INSERT_TEAM_NAMES=$($PSQL "insert into teams(name) values('$1');")
    if [[ $INSERT_TEAM_NAMES == "INSERT 0 1" ]]; then
      echo succesful insert of team named: $1
    fi
  fi
}

TRUNCATE_TABLES=$($PSQL "truncate teams, games restart identity;")

while IFS=',' read -r year round winner opponent winner_goals opponent_goals; do
  # skip the 1st line from csv file
  if [[ $year != "year" ]]; then
    # check if the data exist
    find_and_add "$winner"
    find_and_add "$opponent"

    # get team_id from team table
    WINNER_ID=$($PSQL "select team_id from teams where name='$winner'")
    OPPONENT_ID=$($PSQL "select team_id from teams where name='$opponent'")

    # insert data in games table
    echo $($PSQL "insert into games(year, round, winner_id, opponent_id, winner_goals, opponent_goals)
    values($year, '$round', $WINNER_ID, $OPPONENT_ID, $winner_goals, $opponent_goals)")
  fi
done < ./games.csv
