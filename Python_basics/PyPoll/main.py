import csv

#Intention here is to gather all the necessary stats needed in one pass through the dataset
#Also this should run on any dataset although the output will only be the top four candidates

total_votes = 0             
candidates_dict = {}        #Will hold each candidates name and tally of their total votes here
candidates_list = []        #List of lists that will organize candidates and vote totals, dicts are unordered

with open('election_data.csv', newline='') as election_data_file:
    election_data_dict = csv.DictReader(election_data_file)

    for row in election_data_dict:
        total_votes += 1                             #Tally our total votes as we iterate through the data
    
        if row['Candidate'] not in candidates_dict:  #Record the candidates name upon first occurence in 
            candidates_dict[row['Candidate']] = 0    #the data, the next "if" statement will record their first vote
    
        if row['Candidate'] in candidates_dict:      #If they've already been added to our dict, add one vote to their tally
            candidates_dict[row['Candidate']] = candidates_dict[row['Candidate']] + 1
  
    candidates = []                                #regardless of how many candidates are in the data, this will
    votes = []                                     #give us a list of tuples, candidates paired with their vote total
    for k, v in candidates_dict.items():           #ordered from most votes to least votes
        candidates.append(k)
        votes.append(v)

    candidates_list = list(zip(votes, candidates))
    candidates_list.sort(reverse=True)

with open('py_poll.txt', 'w') as py_poll_txt:
    py_poll_txt.write(f"Election Results\n\
-------------------------\n\
Total Votes: {total_votes}\n\
-------------------------\n\
{candidates_list[0][1]}: {format(float(candidates_list[0][0] / total_votes * 100), '.3f')}% ({candidates_list[0][0]})\n\
{candidates_list[1][1]}: {format(float(candidates_list[1][0] / total_votes * 100), '.3f')}% ({candidates_list[1][0]})\n\
{candidates_list[2][1]}: {format(float(candidates_list[2][0] / total_votes * 100), '.3f')}% ({candidates_list[2][0]})\n\
{candidates_list[3][1]}: {format(float(candidates_list[3][0] / total_votes * 100), '.3f')}% ({candidates_list[3][0]})\n\
-------------------------\n\
Winner: {candidates_list[0][1]}\n\
-------------------------")

#print our results to the terminal in the desire format
print(f"Election Results\n\
-------------------------\n\
Total Votes: {total_votes}\n\
-------------------------\n\
{candidates_list[0][1]}: {format(float(candidates_list[0][0] / total_votes * 100), '.3f')}% ({candidates_list[0][0]})\n\
{candidates_list[1][1]}: {format(float(candidates_list[1][0] / total_votes * 100), '.3f')}% ({candidates_list[1][0]})\n\
{candidates_list[2][1]}: {format(float(candidates_list[2][0] / total_votes * 100), '.3f')}% ({candidates_list[2][0]})\n\
{candidates_list[3][1]}: {format(float(candidates_list[3][0] / total_votes * 100), '.3f')}% ({candidates_list[3][0]})\n\
-------------------------\n\
Winner: {candidates_list[0][1]}\n\
-------------------------")