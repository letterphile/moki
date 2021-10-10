import math
import random
import datetime

import pytz


timezone  = pytz.timezone('UTC')

class Task:

    def __init__(self,name,expected_time_complete,status,deadline=None,parent=None,fixed=False,session_done=0,recurring=False,freeze=False):

        self.name = name
        self.expected_time_complete = expected_time_complete
        self.status = status
        self.scheduled_sessions=0
        self.deadline=deadline
        self.parent=parent
        self.fixed=fixed
        self.session_done=session_done
        self.recurring = recurring
        self.freeze = freeze

    def __repr__(self):
        return self.name;

    def compute_least_time_division(self):
        
        expected_time_complete_in_minutes = self.expected_time_complete*60

        if(self.expected_time_complete<0):
            self.least_time_division = 15
        else:
            self.least_time_division = (15+(5*(self.expected_time_complete-1)))
           
        
        if(self.least_time_division>120):
            self.least_time_division = 120
        
        return self.least_time_division

    def compute_sessions(self):

        self.total_sessions=0
        expected_time_complete_in_minutes = self.expected_time_complete*60
        self.remainder = expected_time_complete_in_minutes%self.least_time_division
        

        if(self.remainder>0):
     
            self.total_sessions=1
            
        
        self.total_sessions=self.total_sessions+math.trunc(expected_time_complete_in_minutes/self.least_time_division)

        return self.total_sessions


    def __eq__(self, other):

        if (isinstance(other, Task)):

            return self.name == other.name

        return False  



class TaskTime:

    def __init__(self,task,time):
        self.task = task
        self.time = time

    def __repr__(self):
        return str(f"{self.task.name} {self.time.strftime('%d/%m/%Y, %H:%M')}")

class Scheduler:

    def __init__(self,tasks,fixed_tasks):

        self.tasks=tasks
        self.fixed_tasks = fixed_tasks
        self.out_dead_line = []
    

    def compute_totalnumberof_session(self):

        self.totalnumberof_sessions = 0
        self.task_time_sequence = []
        for task in self.tasks:
            self.totalnumberof_sessions+=task.total_sessions
        return self.totalnumberof_sessions

    def create_sequence(self):
        tasks_copy = self.tasks
        self.total_sessions_list = [task.total_sessions for task in tasks_copy]
        self.highest_session_number = max(self.total_sessions_list)
        self.sequence = []
        i=0
        while(i<self.totalnumberof_sessions):

            task=tasks_copy[i%(len(tasks_copy))]
            if(task.scheduled_sessions>=task.total_sessions):
                tasks_copy.remove(task)
            else:
                self.sequence.append(task)
                task.scheduled_sessions+=1
                i+=1


        return self.sequence


    def create_sequence2(self):

        if(self.total_sessions_list.count(self.highest_session_number)<=1):

            total_sessions_list_copy = self.total_sessions_list
            total_sessions_list_copy.remove(self.highest_session_number)
            second_highest_number = max(total_sessions_list_copy)
            difference = self.highest_session_number-second_highest_number
            sequence_copy = self.sequence[::-1]
            
            
            # print("sequence",self.sequence)
            last_task = sequence_copy[0]
            sequence_tail =  []
            i=0
            for task in sequence_copy:
                if(last_task==task):

                    sequence_tail.append(task)
                    i+=1
                    continue 
                
                break
            sequence_head = self.sequence[:len(self.sequence)-i]
            # print("sequence tail",sequence_tail)
            # print("sequence head",sequence_head)
            
            while(len(sequence_tail)>0):
                rand_location = random.randint(1,len(sequence_head)-2)

                sequence_head.insert(rand_location,last_task)
                sequence_tail.pop()
            
            self.sequence = sequence_head

            # print("new_sequence_head",sequence_head)
            
            # print("lenght of sequencehead",len(sequence_head))


    def calculate_time(self):
        last_time = datetime.datetime.now().replace(tzinfo=timezone)
        last_time = last_time.replace(tzinfo=timezone.utc)
        self.task_time_sequence = []
        for task in self.sequence:
            #this is the line were I bind a task with time
             
            task_time_object = TaskTime(task,last_time)
            self.task_time_sequence.append(task_time_object)
            time_change = datetime.timedelta(minutes=task.least_time_division) 
            new_time = last_time+time_change
            last_time = new_time
    

    def taskChecker(self,task,start_time):
        time_change = datetime.timedelta(minutes=task.least_time_division) 
        end_time = start_time+time_change

        for fixed_task in self.fixed_tasks:
            
            start_time_fixed_task = fixed_task.time
            time_change_fixed_task = datetime.timedelta(minutes=fixed_task.task.least_time_division)
            end_time_fixed_task = start_time_fixed_task + time_change_fixed_task
            # print("start time fixed task",start_time_fixed_task)
            # print("end time fixed task",end_time_fixed_task)
            if(start_time_fixed_task<=start_time and start_time<=end_time_fixed_task):
                #self.fixed_tasks.remove(fixed_task)
                break
            elif(start_time_fixed_task>=start_time and start_time_fixed_task<=end_time):
                #self.fixed_tasks.remove(fixed_task)
                break
            
            else:
                pass
        if(start_time_fixed_task<=start_time and start_time<=end_time_fixed_task):
           
            #add one minute 
            one_minute=datetime.timedelta(minutes=1)
            start_time = end_time_fixed_task+one_minute #new start_time for task
            self.taskChecker(task,start_time)
        elif(start_time_fixed_task>=start_time and start_time_fixed_task<=end_time):
           
            one_minute=datetime.timedelta(minutes=1)
            end_time1 = start_time_fixed_task-one_minute
            time_difference = end_time1-start_time 
            time_difference_minutes = time_difference.total_seconds() / 60
            temp_task = Task(task.name,task.expected_time_complete,"status",task.deadline,task)
            temp_task.least_time_division = time_difference_minutes
            if(temp_task.least_time_division<0):
                print("temp_task",temp_task.least_time_division)
            task_time_object = TaskTime(temp_task,start_time)
            self.task_time_sequence.append(task_time_object)
            #creating the end half of task
            start_time2 = end_time_fixed_task+one_minute
            time_difference = end_time-start_time_fixed_task #faulty code
            time_difference_minutes = time_difference.total_seconds() / 60
            
            temp_task2 = Task(task.name,task.expected_time_complete,"status",task.deadline,task)
            temp_task2.least_time_division = task.least_time_division-temp_task.least_time_division
            if(temp_task2.least_time_division<0):
                print("temp_task2",temp_task2.least_time_division)
            self.taskChecker(temp_task2,start_time2)
        else:
            
            task_time_object = TaskTime(task,start_time)
            
            self.task_time_sequence.append(task_time_object)
            time_change = datetime.timedelta(minutes=task.least_time_division) 
            new_time = start_time+time_change
            if(task.deadline and new_time>=task.deadline):
                self.out_dead_line.append(task)
            self.last_time = new_time
            return
    
    def calculate_time2(self):
        self.task_time_sequence = []

        self.last_time = datetime.datetime.now().replace(tzinfo=timezone)
        
        
        for task in self.sequence:
            #this is the line were I bind a task with time
            self.taskChecker(task,self.last_time)
            
    
    def deadline_in(self):
        
        for task in self.out_dead_line:
            if (task.parent != None):
                try:
                    self.sequence.remove(task)
                    
                except ValueError as e:
                    pass
                self.sequence.insert(0,task)
            else:
                try:

                    self.sequence.remove(task.parent)
                except ValueError as e:
                    pass
                self.sequence.insert(0,task)

            self.out_dead_line.remove(task)
      
    
        
    def add_fixed_sort(self):
        for fixed in self.fixed_tasks:
            if(fixed.time.date()==datetime.datetime.today().date()):
                self.task_time_sequence.append(fixed)

        self.task_time_sequence.sort(key=lambda x: x.time)   


# time1 = int(input())
# time2 = int(input())
# time3 = int(input())
# time4 = int(input())
# time5 = int(input())

# task_object1 = Task("A",time1,"status",datetime.datetime.combine(datetime.datetime(2021, 9, 27),datetime.time(16, 0)))
# task_object1.compute_least_time_division()
# print(task_object1.compute_sessions())
# task_object2 = Task("B",time2,"status",datetime.datetime.combine(datetime.datetime(2021, 9, 26),datetime.time(16, 0)))
# task_object2.compute_least_time_division()
# print(task_object2.compute_sessions())
# task_object3 = Task("C",time3,"status")
# task_object3.compute_least_time_division()
# print(task_object3.compute_sessions())
# task_object4 = Task("D",time4,"status")
# task_object4.compute_least_time_division()
# print(task_object4.compute_sessions())
# task_object5 = Task("E",time5,"status")
# task_object5.compute_least_time_division()
# print(task_object5.compute_sessions())

# fixed_task_one  = Task("F1",90,"status")
# fixed_task_one.compute_least_time_division()

# fixed_task_two = Task("F2",90,"status")
# fixed_task_two.compute_least_time_division()
# fixed_task_three  = Task("F3",90,"status")
# fixed_task_three.compute_least_time_division()

# fixed_task_four  = Task("F4",90,"status")
# fixed_task_four.compute_least_time_division()
# fixed_task_four.least_time_division = 470

# fixed_task_time_one = TaskTime(fixed_task_one,datetime.datetime.combine(datetime.date.today(),datetime.time(17,0)))

# fixed_task_time_two = TaskTime(fixed_task_two,datetime.datetime.combine(datetime.date.today(),datetime.time(20, 0)))

# fixed_task_time_three = TaskTime(fixed_task_three,datetime.datetime.combine(datetime.datetime(2021, 9, 23),datetime.time(23, 0)))

# fixed_task_time_four = TaskTime(fixed_task_four,datetime.datetime.combine(datetime.datetime(2021, 9, 24),datetime.time(2, 0)))

# schedule_object = Scheduler([task_object1,task_object2,task_object3,task_object4,task_object5],[fixed_task_time_one,fixed_task_time_two,fixed_task_time_three,fixed_task_time_four])
# schedule_object.compute_totalnumberof_session()
# schedule_object.create_sequence()
# (schedule_object.totalnumberof_sessions)


# schedule_object.create_sequence2()




# print(schedule_object.sequence)

# schedule_object.calculate_time2()


# schedule_object.calculate_time2()

# print("new task sequence")
# for task in schedule_object.task_time_sequence:
#     print(task,task.task.parent)

# print("new out of deadline")
# for task in schedule_object.out_dead_line:
#     print(task)