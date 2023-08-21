#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"

# query with atomic number (AN) function
GET_WITH_AN(){
  Q=$($PSQL "select atomic_number, type, atomic_mass, melting_point_celsius, boiling_point_celsius, symbol, name from properties inner join elements using(atomic_number) inner join types using(type_id) where atomic_number = $1")
  if [[ -z $Q ]]; then
    echo "I could not find that element in the database."
    else
      PRINTER $Q
  fi
}

# query with symbol (S) function
GET_WITH_S(){
  Q=$($PSQL "select atomic_number, type, atomic_mass, melting_point_celsius, boiling_point_celsius, symbol, name from properties inner join elements using(atomic_number) inner join types using(type_id) where symbol = '$1'")
  if [[ -z $Q ]]; then
    echo "I could not find that element in the database."
    else
      PRINTER $Q
  fi
}

# query with name (N) function
GET_WITH_N(){
  Q=$($PSQL "select atomic_number, type, atomic_mass, melting_point_celsius, boiling_point_celsius, symbol, name from properties inner join elements using(atomic_number) inner join types using(type_id) where name = '$1'")
  if [[ -z $Q ]]; then
    echo "I could not find that element in the database."
    else
      PRINTER $Q
  fi
}

# get info function
PRINTER(){
  IFS='|'
  read -ra Q_ARRAY <<<"$1"
  echo "The element with atomic number ${Q_ARRAY[0]} is ${Q_ARRAY[6]} (${Q_ARRAY[5]}). It's a ${Q_ARRAY[1]}, with a mass of ${Q_ARRAY[2]} amu. ${Q_ARRAY[6]} has a melting point of ${Q_ARRAY[3]} celsius and a boiling point of ${Q_ARRAY[4]} celsius."
}

# check if argument is provided
MAIN(){
if [[ $1 ]]; then
  if [[ $1 =~ ^[0-9]+$ ]]; then
    GET_WITH_AN $1
  fi
  if [[ $1 =~ ^[a-zA-Z]+$ ]]; then
    if [[ ${#1} -le 2 ]]; then
      GET_WITH_S $1

      else
        GET_WITH_N $1
    fi
  fi

  else
    echo "Please provide an element as an argument."
fi
}

MAIN $1
