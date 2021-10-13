from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
try:
    from app.moki_core import *
except:
    from moki_core import *
origins = [
    "http://localhost:3006"
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TaskSchema(BaseModel):
    name: str
    etc: float
    status:str
    deadline:datetime.datetime = None
    session_done:int
    hours_left:float
    hours_done:float
    freeze:bool = False

class TaskTimeSchema(BaseModel):
    task:TaskSchema
    time:datetime.datetime
    recurring:bool
    ltd:int
class ScheduleSchema(BaseModel):
    tasks: List[TaskSchema]
    fixed_tasks:List[TaskTimeSchema]



@app.post("/schedule")
async def create_schedule(schedule: ScheduleSchema):
    print(schedule)
    tasks = []
    
    for task in schedule.tasks:
        
        task_object = Task(task.name,task.hours_left,task.status,task.deadline,session_done=task.session_done)
        task_object.compute_least_time_division()
        task_object.compute_sessions()
        tasks.append(task_object)

    tasks.sort(key=lambda x: x.session_done) 
    
    fixed_time_tasks = []
    if len(schedule.fixed_tasks)<2:
        return {"message":"Atleast 2 fixed tasks required"}
    for fixed_task in schedule.fixed_tasks:
        recurring=False
        if(fixed_task.recurring):
            recurring=True
        fixed_task_object = Task(fixed_task.task.name,fixed_task.task.etc,fixed_task.task.status,fixed_task.task.deadline,session_done=fixed_task.task.session_done,fixed=True,recurring=recurring)
        fixed_task_object.least_time_division = fixed_task.ltd
        if(fixed_task.recurring):
            for i in range(0,365):
                fixed_time_tasks.append(TaskTime(fixed_task_object,fixed_task.time+datetime.timedelta(days=i)))
        else:
            fixed_time_tasks.append(TaskTime(fixed_task_object,fixed_task.time))
    schedule_object = Scheduler(tasks,fixed_time_tasks)
    schedule_object.compute_totalnumberof_session()
    schedule_object.create_sequence()
    schedule_object.calculate_time2()
    schedule_object.deadline_in()
    schedule_object.calculate_time2()
    schedule_object.add_fixed_sort()
    print(schedule_object.task_time_sequence)
    tasklist = []
    for tasktime in schedule_object.task_time_sequence:
        if(tasktime.time.date() == datetime.datetime.today().date()):
            tasklist.append(tasktime)
        else:
            break
    return tasklist


@app.post("/schedule/tasks")
async def doc_task(schedule: ScheduleSchema):
    print(schedule)
    tasks = []
    
    for task in schedule.tasks:
        
        task_object = Task(task.name,task.hours_left,task.status,task.deadline,session_done=task.session_done,freeze=task.freeze)
        task_object.compute_least_time_division()
        task_object.compute_sessions()
        tasks.append(task_object)

    tasks.sort(key=lambda x: x.session_done) 
    
    fixed_time_tasks = []
    if len(schedule.fixed_tasks)<2:
        return {"message":"Atleast 2 fixed tasks required"}
    for fixed_task in schedule.fixed_tasks:
        recurring=False
        if(fixed_task.recurring):
            recurring=True
        fixed_task_object = Task(fixed_task.task.name,fixed_task.task.etc,fixed_task.task.status,fixed_task.task.deadline,session_done=fixed_task.task.session_done,fixed=True,recurring=recurring)
        fixed_task_object.least_time_division = fixed_task.ltd
        if(fixed_task.recurring):
            for i in range(0,365):
                fixed_time_tasks.append(TaskTime(fixed_task_object,fixed_task.time+datetime.timedelta(days=i)))
        else:
            fixed_time_tasks.append(TaskTime(fixed_task_object,fixed_task.time))
    schedule_object = Scheduler(tasks,fixed_time_tasks)
    schedule_object.compute_totalnumberof_session()
    schedule_object.create_sequence()
    schedule_object.calculate_time2()
    schedule_object.deadline_in()
    schedule_object.calculate_time2()
    schedule_object.add_fixed_sort()
    tasks_copy = schedule.tasks
    reverse_seq = schedule_object.task_time_sequence[::-1]
    new_task_list  = []
    for selected_task in tasks_copy:
        for task in reverse_seq:
            if(task.task.name==selected_task.name):
                break
        new_task_list.append(task)
                

    print(new_task_list)
    return new_task_list

@app.get("/")
async def root():
    return {"message": "Hello World"}
