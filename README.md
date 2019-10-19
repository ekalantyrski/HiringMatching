match.py is the python code to match applicants

The rest is all the server code to get rankings from clubs and applicants.
Rankings are stored in two mysql tables.

match.py is an implementation of a modified gale-shapley matching algorithm. Instead of a "man" being matched with one "woman", they can be matched with a variable amount of "women", described by the input parameters.

First is a table called apps with fields id VARCHAR(100), ranking text, share tinyint(1)
Second table is called clubs with fields position VARCHAR(100), ranking text

Copyright Eric Kalantyrski 2019
