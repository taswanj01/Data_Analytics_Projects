import csv

month_count = 0       # Total of entries, therefore total months
total_pl = 0          # Total of the P & L
pl_list = []          # List of P & L's
month_list = []       # List of months with year
pl_diff_list = []     # List of the changes in P & L between each month

with open("budget_data.csv", newline='') as budget_data_file:
    budget_data_dict = csv.DictReader(budget_data_file)
  
    for row in budget_data_dict:
        month_count += 1                                  #count of total months in the data
        total_pl = total_pl + int(row['Profit/Losses'])   #total P & L
        pl_list.append(int(row['Profit/Losses']))         #create list of each P & L
        month_list.append(row['Date'])                    #create list of each month

    i = len(pl_list) - 1                               #Calculate the changes between each month
    while i > 0:                                       #and enter into a list
        pl_diff_list.append(pl_list[i] - pl_list[i - 1])
        i -= 1
    pl_diff_list.reverse()

# #Write our text file showing our desired results
with open('py_bank.txt', 'w') as py_bank_txt:
    py_bank_txt.write(f"Financial Analysis\n\
-----------------------------\n\
Total Months: {month_count}\n\
Total: ${total_pl}\n\
Average  Change: ${round(sum(pl_diff_list) / len(pl_diff_list), 2)}\n\
Greatest Increase in Profits: {month_list[pl_diff_list.index(max(pl_diff_list)) + 1]} (${max(pl_diff_list)})\n\
Greatest Decrease in Profits: {month_list[pl_diff_list.index(min(pl_diff_list)) + 1]} (${min(pl_diff_list)})")

#Print our desired results to the terminal
print(f"Financial Analysis\n\
-----------------------------\n\
Total Months: {month_count}\n\
Total: ${total_pl}\n\
Average  Change: ${round(sum(pl_diff_list) / len(pl_diff_list), 2)}\n\
Greatest Increase in Profits: {month_list[pl_diff_list.index(max(pl_diff_list)) + 1]} (${max(pl_diff_list)})\n\
Greatest Decrease in Profits: {month_list[pl_diff_list.index(min(pl_diff_list)) + 1]} (${min(pl_diff_list)})")