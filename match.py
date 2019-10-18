def match(clubs: dict, apps: dict):
    # create set of clubs not matched
    clubs_not_full = set()
    clubs_full = set()
    for club in clubs:
        values = clubs[club]
        clubs_not_full.add(Club(club, values[0], values[1]))

    # create set of applicants
    applicants = {}
    for applicant in apps:
        values = apps[applicant]
        applicants[applicant] = Applicant(applicant, values)

    iterations = 0
    while (len(clubs_not_full) != 0 and iterations < 10000):
        club = clubs_not_full.pop()
        choices = club.get_choices()
        last_asked = club.get_last_asked()
        last_asked = 0
        while(not club.is_full() and last_asked < len(choices)):
            choice = choices[last_asked]
            if(choice in applicants):
                applicant = applicants[choice]

                if applicant.prefers_match(club):
                    # if applicant prefers club, update matching
                    club_matched = applicant.get_matched()
                    if club_matched is not None:
                        # applicant has a club already
                        # remove applicant from club, and update applicant with new club
                        club_matched.remove_match(applicant)
                        applicant.set_matched(club)
                        club.add_match(applicant)

                        if(club_matched in clubs_full):
                            clubs_full.remove(club_matched)
                            clubs_not_full.add(club_matched)

                    else:
                        #applicant has no club, so match applicant and club
                        applicant.set_matched(club)
                        club.add_match(applicant)




                # if club is full, add it into the full_clubs
                if(club.is_full()):
                    clubs_full.add(club)
            last_asked += 1

        club.set_last_asked(last_asked-1)
        if(not club.is_full()):
            clubs_not_full.add(club)

        iterations+=1

    for club in clubs_full:
        club_applicants = club.get_applicants()
        for applicant in club_applicants:
            print(club.get_identity() + ": " + applicant.get_identity())
    print("NOT FULL")
    for club in clubs_not_full:
        club_applicants = club.get_applicants()
        if(len(club_applicants) == 0):
            print(club.get_identity() + ": No match")
        for applicant in club_applicants:
            print(club.get_identity() + ": " + applicant.get_identity())

class Club:
    def __init__(self, identity, capacity, choices: list):
        self._last_asked = -1
        self._capacity = capacity
        self._applicants = []
        self._identity = identity
        self._choices = choices

    def get_choices(self) -> list:
        return self._choices

    def get_capacity(self) -> int:
        return self._capacity

    def is_full(self) -> bool:
        return self._capacity == len(self._applicants)

    def get_applicants(self) -> list:
        return self._applicants

    def get_identity(self) -> str:
        return self._identity

    def get_last_asked(self) -> int:
        return self._last_asked

    def set_last_asked(self, last_asked) -> None:
        self._last_asked = last_asked

    def remove_match(self, match) -> None:
        self._applicants.remove(match)

    def add_match(self, match) -> None:
        self._applicants.append(match)

    def __eq__(self, other):
        return self.get_identity() == other.get_identity()

    def __hash__(self):
        return hash(self.get_identity())

    def __str__(self):
        return self._identity


class Applicant:
    def __init__(self, identity, choices):
        self._matched = None
        self._identity = identity
        self._choices = choices

    def set_matched(self, matched: Club) -> None:
        self._matched = matched

    def get_matched(self) -> Club:
        return self._matched

    def get_identity(self) -> str:
        return self._identity

    def __eq__(self, other):
        return self.get_identity() == other.get_identity()

    def __hash__(self):
        return hash(self.get_identity())

    def prefers_match(self, match: Club) -> bool:
        if match.get_identity() in self._choices:
            if self.get_matched() is None:
                return True
            else:
                curr_rank = self._choices.index(self.get_matched().get_identity())
                new_rank = self._choices.index(match.get_identity())
                if(new_rank < curr_rank):
                    return True
                else:
                    return False
        else:
            return False

    def __str__(self):
        return self.get_identity()


if(__name__ == "__main__"):


    # csv file with club_position,number of positions available,applicants_id's from first to last
    clubs_file = open("clubs.csv", "r")
    # csv file with applicant_id,club_position ranked from first to last
    apps_file = open("apps.csv", "r")

    clubs = {}
    for line in clubs_file:
        els = line.split(",")
        choices = []
        for x in els[2:]:
            choices.append(x.replace('\n', ""))
        clubs[els[0]] = [int(els[1]), choices]
    clubs_file.close()

    applicants = {}
    for line in apps_file:
        els = line.split(",")
        choices = []
        for x in els[1:-1]:
            choices.append(x.replace('\n', ""))
        applicants[els[0]] = choices

    apps_file.close()

    pass
    match(clubs, applicants)





