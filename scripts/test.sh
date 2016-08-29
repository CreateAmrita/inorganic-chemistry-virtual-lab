#!/bin/bash

# This script tests if the services required by the lab are running properly.

# To use the script, type:

# sh scripts/test.sh

# create the output file

touch test_results.txt

# check the status of required services:

status=$(service apache2 status)

if [ $? -eq 0 ]
then
	output="test successful!"
else
	output="test failed!"
fi

# write the result to the outpt file

echo -e $output  >> test_results.txt
